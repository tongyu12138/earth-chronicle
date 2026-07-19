const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const { imageManifest } = require('../data/image-manifest')
const { readImageInfo, ensureDir, relativePosix } = require('./media-utils')

const repoRoot = path.resolve(__dirname, '..')
const approvedPath = path.resolve(repoRoot, 'media/approved.json')
const write = process.argv.slice(2).includes('--write')
const inventoryById = new Map(imageManifest.map((item) => [item.id, item]))

function fail(message) {
  console.error(message)
  process.exit(1)
}

function runSips(args) {
  const result = spawnSync('/usr/bin/sips', args, { encoding: 'utf8' })
  if (result.status !== 0) {
    throw new Error((result.stderr || result.stdout || `sips exited ${result.status}`).trim())
  }
}

function targetBox(ratioName, role) {
  const ratio = ratioName === '16:9' ? 16 / 9 : 4 / 3
  const width = role === 'thumbnail' ? 500 : 1600
  return { width, height: Math.round(width / ratio), ratio }
}

function fittedSize(source, target) {
  // Never enlarge scientific source pixels. Empty canvas is padding, not invented detail.
  const scale = Math.min(1, target.width / source.width, target.height / source.height)
  return {
    width: Math.max(1, Math.round(source.width * scale)),
    height: Math.max(1, Math.round(source.height * scale))
  }
}

function normalizeFile(file, target) {
  const source = readImageInfo(file)
  if (!source.width || !source.height) throw new Error('unreadable dimensions')
  if (source.width === target.width && source.height === target.height) {
    return { before: source, after: source, skipped: true }
  }

  const fitted = fittedSize(source, target)
  const extension = path.extname(file)
  const basename = path.basename(file, extension)
  const resized = path.join(path.dirname(file), `.${basename}.resized${extension}`)
  const normalized = path.join(path.dirname(file), `.${basename}.normalized${extension}`)

  try {
    const resizeArgs = ['--resampleHeightWidth', String(fitted.height), String(fitted.width)]
    if (source.mime === 'image/jpeg') resizeArgs.push('--setProperty', 'formatOptions', '88')
    resizeArgs.push(file, '--out', resized)
    runSips(resizeArgs)
    runSips([
      '--padToHeightWidth', String(target.height), String(target.width),
      '--padColor', '071217',
      resized,
      '--out', normalized
    ])
    const after = readImageInfo(normalized)
    if (after.mime !== source.mime) throw new Error(`MIME changed from ${source.mime} to ${after.mime}`)
    if (after.width !== target.width || after.height !== target.height) {
      throw new Error(`expected ${target.width}×${target.height}, received ${after.width}×${after.height}`)
    }
    fs.renameSync(normalized, file)
    return { before: source, after: readImageInfo(file), skipped: false, fitted }
  } finally {
    fs.rmSync(resized, { force: true })
    fs.rmSync(normalized, { force: true })
  }
}

if (!fs.existsSync(approvedPath)) fail(`Approved media manifest not found: ${approvedPath}`)
const approved = JSON.parse(fs.readFileSync(approvedPath, 'utf8'))
if (!approved || !Array.isArray(approved.items)) fail('media/approved.json must contain items[]')

const plans = []
const problems = []
approved.items.forEach((entry) => {
  const inventory = inventoryById.get(entry.id)
  if (!inventory) {
    problems.push(`${entry.id}: not present in data/image-manifest.js`)
    return
  }
  ;[
    ['image', entry.imageFile],
    ['thumbnail', entry.thumbnailFile]
  ].forEach(([role, relativeFile]) => {
    const file = path.resolve(repoRoot, 'media', relativeFile || '')
    if (!relativeFile || !fs.existsSync(file)) {
      problems.push(`${entry.id}: missing ${role} file ${relativeFile || '(empty)'}`)
      return
    }
    const source = readImageInfo(file)
    const target = targetBox(inventory.ratio, role)
    plans.push({ entry, inventory, role, file, source, target })
  })
})

if (problems.length) fail(problems.join('\n'))

const beforeBytes = plans.reduce((sum, item) => sum + item.source.bytes, 0)
const rows = []
let changed = 0
plans.forEach((plan, index) => {
  const sourceSize = `${plan.source.width}×${plan.source.height}`
  const targetSize = `${plan.target.width}×${plan.target.height}`
  if (!write) {
    rows.push({ id: plan.entry.id, role: plan.role, sourceSize, targetSize, bytes: plan.source.bytes, changed: sourceSize !== targetSize })
    return
  }
  try {
    const result = normalizeFile(plan.file, plan.target)
    if (!result.skipped) changed += 1
    rows.push({
      id: plan.entry.id,
      role: plan.role,
      sourceSize,
      targetSize,
      bytes: result.after.bytes,
      changed: !result.skipped,
      fitted: result.fitted ? `${result.fitted.width}×${result.fitted.height}` : targetSize
    })
    if ((index + 1) % 20 === 0 || index + 1 === plans.length) {
      console.log(`Normalized ${index + 1}/${plans.length}`)
    }
  } catch (error) {
    problems.push(`${plan.entry.id}/${plan.role}: ${error.message}`)
  }
})

if (problems.length) fail(problems.join('\n'))

const afterBytes = write
  ? rows.reduce((sum, item) => sum + item.bytes, 0)
  : beforeBytes
const report = [
  '# 媒体尺寸标准化报告', '',
  `- 生成时间：${new Date().toISOString()}`,
  `- 模式：${write ? '已写入' : '仅检查'}`,
  `- 文件数：${plans.length}`,
  `- 实际改写：${write ? changed : rows.filter((item) => item.changed).length}`,
  `- 处理前：${beforeBytes} bytes`,
  `- 处理后：${afterBytes} bytes`,
  '- 策略：主体等比缩小、不放大；4:3 或 16:9 深色留边；避免裁掉化石、标本和图例。', '',
  '| 媒体ID | 用途 | 原尺寸 | 内容适配尺寸 | 输出尺寸 | 输出大小 |',
  '| --- | --- | --- | --- | --- | ---: |',
  ...rows.map((item) => `| ${item.id} | ${item.role} | ${item.sourceSize} | ${item.fitted || '待处理'} | ${item.targetSize} | ${item.bytes} |`)
].join('\n')

ensureDir(path.resolve(repoRoot, 'reports'))
fs.writeFileSync(path.resolve(repoRoot, 'reports/media-normalization.md'), `${report}\n`)

console.log(`${write ? 'Normalized' : 'Planned'} media files: ${plans.length}`)
console.log(`Changed files: ${write ? changed : rows.filter((item) => item.changed).length}`)
console.log(`Bytes: ${beforeBytes} -> ${afterBytes}`)
console.log(`Report: ${relativePosix(repoRoot, path.resolve(repoRoot, 'reports/media-normalization.md'))}`)
if (!write) console.log('Dry run only. Add --write to normalize local deployment images.')
