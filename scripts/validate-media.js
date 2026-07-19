const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { imageManifest } = require('../data/image-manifest')
const { mediaCatalog } = require('../data/media-catalog')
const { MEDIA_BASE_URLS } = require('../config/media')
const { licenseAllowed, readImageInfo, ensureDir } = require('./media-utils')

const releaseMode = process.argv.includes('--release')
const repoRoot = path.resolve(__dirname, '..')
const reportPath = path.resolve(repoRoot, 'reports/media-coverage.md')
const problems = []
const releaseProblems = []
const warnings = []
const catalogIds = new Set()
const inventoryById = new Map(imageManifest.map((item) => [item.id, item]))
const hashes = new Map()
const localPathOwners = new Map()
const PROJECT_AI_CREDIT = '地球编年史项目 · OpenAI 图像生成'
const PROJECT_AI_LICENSE = 'Project-owned AI-generated artwork'
const PROJECT_AI_SOURCE = '项目自有 AI 艺术复原'

function isHttps(value) { return /^https:\/\//i.test(String(value || '')) }
function isRelative(value) { return Boolean(value) && !/^[a-z]+:\/\//i.test(value) && !String(value).startsWith('/') }
function hostname(value) {
  try { return new URL(value).hostname } catch (error) { return '' }
}
function increment(map, key) { map[key || '未标注'] = (map[key || '未标注'] || 0) + 1 }

function inspectLocal(item, field, url, dimensions) {
  if (!isRelative(url)) return
  const file = path.resolve(repoRoot, url)
  if (!file.startsWith(`${repoRoot}${path.sep}`)) {
    problems.push(`${item.id} ${field} escapes repository root`)
    return
  }
  if (!fs.existsSync(file)) {
    problems.push(`${item.id} ${field} local file does not exist: ${url}`)
    return
  }
  try {
    const info = readImageInfo(file)
    if (!info.mime || !info.width || !info.height) problems.push(`${item.id} ${field} is empty, damaged, or unsupported`)
    if (dimensions.width && Number(item[dimensions.width]) !== info.width) problems.push(`${item.id} ${dimensions.width} metadata mismatch (${item[dimensions.width]} !== ${info.width})`)
    if (dimensions.height && Number(item[dimensions.height]) !== info.height) problems.push(`${item.id} ${dimensions.height} metadata mismatch (${item[dimensions.height]} !== ${info.height})`)
    if (dimensions.bytes && Number(item[dimensions.bytes]) !== info.bytes) problems.push(`${item.id} ${dimensions.bytes} metadata mismatch (${item[dimensions.bytes]} !== ${info.bytes})`)
    if (dimensions.sha256 && String(item[dimensions.sha256] || '') !== info.sha256) problems.push(`${item.id} ${dimensions.sha256} metadata mismatch`)
    const owner = hashes.get(info.sha256)
    if (owner && owner.ownerId !== item.ownerId) problems.push(`${item.id} reuses identical image content assigned to ${owner.id}`)
    else hashes.set(info.sha256, { id: item.id, ownerId: item.ownerId })
  } catch (error) {
    problems.push(`${item.id} ${field} cannot be inspected: ${error.message}`)
  }
}

mediaCatalog.forEach((item) => {
  if (!item.id) problems.push('Media catalog contains an item without id')
  if (catalogIds.has(item.id)) problems.push(`Duplicate media catalog id: ${item.id}`)
  catalogIds.add(item.id)
  if (!['ready', 'missing'].includes(item.status)) problems.push(`${item.id} has invalid status: ${item.status}`)
  if (item.status !== 'ready') return

  const inventory = inventoryById.get(item.id)
  const requiredFields = ['ownerType', 'ownerId', 'imageUrl', 'thumbnailUrl', 'alt', 'caption', 'credit', 'author', 'license', 'sourceUrl', 'mediaType', 'scientificAccuracyNote']
  requiredFields.forEach((field) => {
    if (!String(item[field] || '').trim()) problems.push(`${item.id} ready item missing ${field}`)
  })
  if (!licenseAllowed(item.license)) problems.push(`${item.id} license is not allowed: ${item.license}`)
  if (!isHttps(item.sourceUrl)) problems.push(`${item.id} sourceUrl must use HTTPS`)
  if (item.mediaType === 'reconstruction' && !item.isReconstruction) problems.push(`${item.id} reconstruction is missing isReconstruction=true`)
  if (item.isReconstruction && item.mediaType !== 'reconstruction') warnings.push(`${item.id}: isReconstruction is true but mediaType is ${item.mediaType}`)
  if (item.mediaType === 'reconstruction' && /占位/.test(item.alt)) problems.push(`${item.id} reviewed reconstruction alt still says placeholder`)
  if (item.mediaType === 'reconstruction' && !/AI|人工智能/i.test(item.alt)) problems.push(`${item.id} reviewed reconstruction alt must identify AI-generated artwork`)
  if (!['P0', 'P1', 'P2'].includes(item.priority)) problems.push(`${item.id} has invalid priority ${item.priority}`)
  if (inventory && inventory.ownerId !== item.ownerId) problems.push(`${item.id} owner mismatch: ${inventory.ownerId} !== ${item.ownerId}`)
  if (/raw\.githubusercontent\.com|github\.com\/.*\/raw\//i.test(`${item.imageUrl} ${item.thumbnailUrl}`)) problems.push(`${item.id} must not use GitHub Raw`)

  ;['imageUrl', 'thumbnailUrl'].forEach((field) => {
    const value = item[field]
    if (!isHttps(value) && !isRelative(value)) problems.push(`${item.id} ${field} must be HTTPS or an approved local deployment path`)
    if (isRelative(value)) {
      const owner = localPathOwners.get(value)
      if (owner && owner !== item.id) problems.push(`${item.id} ${field} reuses local path assigned to ${owner}: ${value}`)
      else localPathOwners.set(value, item.id)
    }
    if (isHttps(value)) {
      const domain = hostname(value)
      if (domain && !item.hotlinkDomain) problems.push(`${item.id} third-party or absolute media URL must record hotlinkDomain`)
      if (item.hotlinkDomain && domain !== item.hotlinkDomain) problems.push(`${item.id} hotlinkDomain does not match ${domain}`)
    }
  })
  inspectLocal(item, 'imageUrl', item.imageUrl, { width: 'imageWidth', height: 'imageHeight', bytes: 'imageBytes', sha256: 'imageSha256' })
  inspectLocal(item, 'thumbnailUrl', item.thumbnailUrl, { width: 'thumbnailWidth', height: 'thumbnailHeight', bytes: 'thumbnailBytes', sha256: 'thumbnailSha256' })

  if (!Number(item.imageWidth) || !Number(item.imageHeight)) problems.push(`${item.id} missing image pixel dimensions`)
  if (!Number(item.thumbnailWidth) || !Number(item.thumbnailHeight)) problems.push(`${item.id} missing thumbnail pixel dimensions`)
  if (Number(item.imageWidth) < 900) warnings.push(`${item.id}: image width ${item.imageWidth}px is below the recommended detail size`)
  if (Number(item.thumbnailWidth) < 360 || Number(item.thumbnailWidth) > 900) warnings.push(`${item.id}: thumbnail width ${item.thumbnailWidth}px needs review`)

  if (releaseMode) {
    if (item.credit !== PROJECT_AI_CREDIT) releaseProblems.push(`${item.id} is not credited as project-owned AI artwork`)
    if (item.license !== PROJECT_AI_LICENSE) releaseProblems.push(`${item.id} does not use the project-owned AI artwork license`)
    if (item.sourceInstitution !== PROJECT_AI_SOURCE) releaseProblems.push(`${item.id} does not identify the project-owned AI source`)
    if (!item.isReconstruction || item.mediaType !== 'reconstruction') releaseProblems.push(`${item.id} is not marked as an AI reconstruction`)
    ;['imageUrl', 'thumbnailUrl'].forEach((field) => {
      if (!isRelative(item[field]) || !/^media\/public\//.test(item[field]) || !/-ai-(?:image|thumbnail)\.[a-z0-9]+$/i.test(item[field])) {
        releaseProblems.push(`${item.id} ${field} is not a project-owned AI media path`)
      }
    })
    if (Number(item.imageWidth) < 900 || Number(item.imageWidth) > 2600) releaseProblems.push(`${item.id} image width ${item.imageWidth}px is outside release range 900—2600px`)
    if (Number(item.thumbnailWidth) < 360 || Number(item.thumbnailWidth) > 900) releaseProblems.push(`${item.id} thumbnail width ${item.thumbnailWidth}px is outside release range 360—900px`)
    if (inventory && Number(item.imageWidth) && Number(item.imageHeight)) {
      const expectedRatio = inventory.ratio === '16:9' ? 16 / 9 : 4 / 3
      const actualRatio = Number(item.imageWidth) / Number(item.imageHeight)
      if (Math.abs(actualRatio - expectedRatio) / expectedRatio > 0.55) releaseProblems.push(`${item.id} aspect ratio ${actualRatio.toFixed(2)} is unsuitable for ${inventory.ratio}`)
    }
    const releaseBase = String(MEDIA_BASE_URLS.release || '').replace(/\/$/, '')
    ;['imageUrl', 'thumbnailUrl'].forEach((field) => {
      const finalUrl = isRelative(item[field]) && releaseBase ? `${releaseBase}/${item[field]}` : item[field]
      if (!isHttps(finalUrl)) releaseProblems.push(`${item.id} ${field} does not resolve to HTTPS in release`)
    })
  }
})

imageManifest.forEach((item) => {
  const record = mediaCatalog.find((media) => media.id === item.id)
  if (releaseMode && (!record || record.status !== 'ready')) releaseProblems.push(`${item.id}: release requires every content media slot to be ready`)
})

const ready = mediaCatalog.filter((item) => item.status === 'ready')
const readyContent = ready.filter((item) => inventoryById.has(item.id))
const missing = imageManifest.filter((item) => {
  const record = mediaCatalog.find((media) => media.id === item.id)
  return !record || record.status !== 'ready'
})
const priorities = ['P0', 'P1', 'P2'].map((priority) => {
  const items = imageManifest.filter((item) => item.priority === priority)
  const complete = items.filter((item) => readyContent.some((media) => media.id === item.id)).length
  return { priority, total: items.length, complete, percent: items.length ? complete / items.length * 100 : 100 }
})
const ownerStats = {}
const institutionStats = {}
const licenseStats = {}
const typeStats = {}
ready.forEach((item) => {
  increment(ownerStats, item.ownerType)
  increment(institutionStats, item.sourceInstitution || item.credit)
  increment(licenseStats, item.license)
  increment(typeStats, item.mediaType)
})
const ownerCoverage = ['period', 'event', 'creature'].map((ownerType) => {
  const items = imageManifest.filter((item) => item.ownerType === ownerType)
  const complete = items.filter((item) => readyContent.some((media) => media.id === item.id)).length
  return { ownerType, total: items.length, complete, percent: items.length ? complete / items.length * 100 : 100 }
})

function statRows(map) {
  const rows = Object.entries(map).sort((left, right) => right[1] - left[1])
  return rows.length ? rows.map(([key, value]) => `| ${key} | ${value} |`) : ['| 暂无 | 0 |']
}

const report = [
  '# 媒体覆盖率报告', '',
  `- 模式：${releaseMode ? 'release' : 'normal'}`,
  `- 已核验媒体：${ready.length}`,
  `- 项目自有 AI 复原：${ready.filter((item) => item.license === PROJECT_AI_LICENSE).length}`,
  `- 已核验内容媒体：${readyContent.length} / ${imageManifest.length}`,
  `- 缺失内容媒体：${missing.length}`, '',
  '## 优先级覆盖', '',
  '| 优先级 | 已完成 | 总数 | 完成率 |', '| --- | ---: | ---: | ---: |',
  ...priorities.map((item) => `| ${item.priority} | ${item.complete} | ${item.total} | ${item.percent.toFixed(1)}% |`), '',
  '## 内容类型覆盖', '',
  '| 所属类型 | 已完成 | 总数 | 完成率 |', '| --- | ---: | ---: | ---: |',
  ...ownerCoverage.map((item) => `| ${item.ownerType} | ${item.complete} | ${item.total} | ${item.percent.toFixed(1)}% |`), '',
  '## 全部已验证记录所属类型', '',
  '| 所属类型 | 数量 |', '| --- | ---: |', ...statRows(ownerStats), '',
  '## 来源机构', '',
  '| 来源 | 数量 |', '| --- | ---: |', ...statRows(institutionStats), '',
  '## 授权类型', '',
  '| 授权 | 数量 |', '| --- | ---: |', ...statRows(licenseStats), '',
  '## 图像类型', '',
  '| 类型 | 数量 |', '| --- | ---: |', ...statRows(typeStats), '',
  '## 仍缺失的媒体 ID', '',
  missing.map((item) => `- ${item.id}（${item.priority}）`).join('\n') || '- 无'
].join('\n')
ensureDir(path.dirname(reportPath))
fs.writeFileSync(reportPath, `${report}\n`)

console.log(`Verified ready media: ${ready.length}`)
console.log(`Ready content media: ${readyContent.length}/${imageManifest.length}; missing: ${missing.length}`)
priorities.forEach((item) => console.log(`${item.priority}: ${item.complete}/${item.total} (${item.percent.toFixed(1)}%)`))
console.log(`Report: ${path.relative(repoRoot, reportPath)}`)
warnings.forEach((warning) => console.warn(`Warning: ${warning}`))
if (problems.length || (releaseMode && releaseProblems.length)) {
  problems.concat(releaseMode ? releaseProblems : []).forEach((problem) => console.error(problem))
  process.exit(1)
}
if (!releaseMode && missing.some((item) => item.priority === 'P0')) console.warn('Warning: P0 media is still missing; --release will fail.')
console.log(`Media validation passed (${releaseMode ? 'release' : 'normal'} mode)`)
