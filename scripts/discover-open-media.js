const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { mediaQueries } = require('../data/media-queries')
const { cleanHtml, metadataValue, normalizeLicense, licenseAllowed, ensureDir, requestJson } = require('./media-utils')

const API = 'https://commons.wikimedia.org/w/api.php'
const args = process.argv.slice(2)
const onlyIndex = args.indexOf('--only')
const only = onlyIndex >= 0 ? args[onlyIndex + 1] : ''
const resume = args.includes('--resume')
const refreshSelected = args.includes('--refresh')
const limitIndex = args.indexOf('--limit')
const queryLimit = Math.max(2, Math.min(12, Number(limitIndex >= 0 ? args[limitIndex + 1] : 6) || 6))
const outputPath = path.resolve(__dirname, '../media/candidates.json')
const requestDelay = Math.max(700, Number(process.env.COMMONS_REQUEST_DELAY_MS) || 1100)
let lastRequestAt = 0
const allowedOriginalMimes = new Set(['image/jpeg', 'image/png', 'image/webp'])

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function candidateId(mediaId, title) {
  return `${mediaId}-${crypto.createHash('sha1').update(title).digest('hex').slice(0, 10)}`
}

function pageUrl(title) {
  return `https://commons.wikimedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_')).replace(/%3A/i, ':')}`
}

function smallerThumb(url, width) {
  if (!url) return ''
  if (/\/\d+px-[^/]+$/i.test(url)) return url.replace(/\/\d+px-([^/]+)$/i, `/${width}px-$1`)
  const match = url.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/([^/]+\/[^/]+)\/([^/]+)$/i)
  return match ? `${match[1]}/thumb/${match[2]}/${match[3]}/${width}px-${match[3]}` : url
}

async function fetchJson(url, attempts) {
  try {
    const wait = Math.max(0, requestDelay - (Date.now() - lastRequestAt))
    if (wait) await delay(wait)
    lastRequestAt = Date.now()
    return await requestJson(url, { headers: { 'user-agent': 'earth-chronicle-media-discovery/1.0 (educational project)' } })
  } catch (error) {
    const attempt = attempts || 0
    if (attempt < 3) {
      const retryAfter = Number(error.headers && error.headers['retry-after'])
      const backoff = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : [2500, 8000, 20000][attempt]
      console.warn(`[discover] request ${error.status || 'error'}; retry in ${Math.ceil(backoff / 1000)}s`)
      await delay(backoff)
      return fetchJson(url, attempt + 1)
    }
    throw error
  }
}

async function search(query) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    generator: 'search',
    gsrsearch: query,
    gsrnamespace: '6',
    gsrlimit: String(queryLimit),
    prop: 'imageinfo',
    iiprop: 'url|extmetadata|size|mime',
    iiurlwidth: '1600'
  })
  const payload = await fetchJson(`${API}?${params}`)
  return Object.values((payload.query && payload.query.pages) || {})
}

function normalizePage(media, page, query, queryIndex) {
  const info = page.imageinfo && page.imageinfo[0]
  if (!info) return null
  if (!allowedOriginalMimes.has(String(info.mime || '').toLowerCase())) return null
  const metadata = info.extmetadata || {}
  const license = normalizeLicense(metadataValue(metadata, 'LicenseShortName') || metadataValue(metadata, 'UsageTerms'))
  if (!licenseAllowed(license)) return null
  const full = info.thumburl || info.url || ''
  // Wikimedia 从 2026 年起只接受标准缩略图档位；500px 同时符合本项目列表图规格。
  const thumbnail = smallerThumb(full, 500) || full
  const description = metadataValue(metadata, 'ImageDescription') || metadataValue(metadata, 'ObjectName')
  const categories = metadataValue(metadata, 'Categories')
  return {
    id: candidateId(media.mediaId, page.title),
    mediaId: media.mediaId,
    ownerType: media.ownerType,
    ownerId: media.ownerId,
    label: media.label,
    query,
    queryIndex,
    title: page.title,
    filePageUrl: pageUrl(page.title),
    originalUrl: info.url || '',
    imageUrl: full,
    thumbnailUrl: thumbnail,
    originalMime: info.mime || '',
    originalWidth: Number(info.width) || 0,
    originalHeight: Number(info.height) || 0,
    originalBytes: Number(info.size) || 0,
    renderedWidth: Number(info.thumbwidth || info.width) || 0,
    renderedHeight: Number(info.thumbheight || info.height) || 0,
    author: metadataValue(metadata, 'Artist') || metadataValue(metadata, 'Credit'),
    credit: metadataValue(metadata, 'Credit') || metadataValue(metadata, 'Attribution'),
    license,
    licenseUrl: metadataValue(metadata, 'LicenseUrl'),
    description: cleanHtml(description).slice(0, 900),
    categories: cleanHtml(categories).slice(0, 1200),
    suggestedMediaTypes: media.suggestedMediaTypes,
    status: 'candidate'
  }
}

async function discoverOne(media) {
  const found = []
  const seen = new Set()
  for (let queryIndex = 0; queryIndex < media.queries.length; queryIndex += 1) {
    const query = media.queries[queryIndex]
    let pages = []
    try {
      pages = await search(query)
    } catch (error) {
      console.error(`[discover] ${media.mediaId} / ${query}: ${error.message}`)
      continue
    }
    pages.forEach((page) => {
      if (seen.has(page.title)) return
      const candidate = normalizePage(media, page, query, queryIndex)
      if (!candidate) return
      seen.add(page.title)
      found.push(candidate)
    })
  }
  return { mediaId: media.mediaId, label: media.label, priority: media.priority, requiredForRelease: media.requiredForRelease, candidates: found }
}

async function main() {
  const selected = only ? mediaQueries.filter((item) => item.mediaId === only) : mediaQueries
  if (!selected.length) throw new Error(`Unknown --only media id: ${only}`)
  let existingGroups = []
  if (resume && fs.existsSync(outputPath)) {
    try { existingGroups = JSON.parse(fs.readFileSync(outputPath, 'utf8')).groups || [] } catch (error) {}
  }
  existingGroups = existingGroups.map((group) => Object.assign({}, group, {
    candidates: (group.candidates || []).filter((candidate) => allowedOriginalMimes.has(String(candidate.originalMime || '').toLowerCase())).map((candidate) => Object.assign({}, candidate, {
      thumbnailUrl: smallerThumb(candidate.imageUrl || candidate.originalUrl, 500)
    }))
  }))
  const groupMap = new Map(existingGroups.map((group) => [group.mediaId, group]))
  function writeCheckpoint() {
    const groups = mediaQueries.map((item) => groupMap.get(item.mediaId)).filter(Boolean)
    const payload = {
      generatedAt: new Date().toISOString(),
      source: 'Wikimedia Commons API',
      notice: '候选不等于批准。必须在 media/decisions.json 中逐项选择后运行 approve-media.js。',
      queryCount: groups.length,
      candidateCount: groups.reduce((sum, group) => sum + group.candidates.length, 0),
      insufficientMediaIds: groups.filter((group) => !group.candidates.length).map((group) => group.mediaId),
      groups
    }
    ensureDir(path.dirname(outputPath))
    fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`)
    return payload
  }
  for (let index = 0; index < selected.length; index += 1) {
    const media = selected[index]
    const existing = groupMap.get(media.mediaId)
    if (resume && !refreshSelected && existing && existing.candidates && existing.candidates.length) {
      console.log(`[${index + 1}/${selected.length}] ${media.mediaId} (cached ${existing.candidates.length})`)
      continue
    }
    console.log(`[${index + 1}/${selected.length}] ${media.mediaId}`)
    groupMap.set(media.mediaId, await discoverOne(media))
    writeCheckpoint()
  }
  const payload = writeCheckpoint()
  console.log(`Candidates: ${payload.candidateCount}; insufficient: ${payload.insufficientMediaIds.length}`)
  console.log(`Written: ${outputPath}`)
}

main().catch((error) => {
  console.error(error.stack || error.message)
  process.exit(1)
})
