const fs = require('fs')
const path = require('path')
const { imageManifest } = require('../data/image-manifest')
const { mediaCatalog, curatedMediaCatalog } = require('../data/media-catalog')
const { RASTER_MIMES, extensionForMime, readImageInfo, ensureDir, relativePosix } = require('./media-utils')

const args = process.argv.slice(2)
const inputFlag = args.indexOf('--input')
const write = args.includes('--write')
const inputPath = inputFlag >= 0 ? args[inputFlag + 1] : ''
const repoRoot = path.resolve(__dirname, '..')

function fail(message) {
  console.error(message)
  process.exit(1)
}

if (!inputPath) fail('Usage: node scripts/sync-media.js --input <media.json> [--write]')
const absoluteInput = path.resolve(inputPath)
if (!fs.existsSync(absoluteInput)) fail(`Input not found: ${absoluteInput}`)

let payload
try {
  payload = JSON.parse(fs.readFileSync(absoluteInput, 'utf8'))
} catch (error) {
  fail(`Invalid media JSON: ${error.message}`)
}

const entries = Array.isArray(payload) ? payload : payload.items
const publicBaseUrl = String((payload && payload.publicBaseUrl) || '').replace(/\/$/, '')
if (!Array.isArray(entries)) fail('Input must be an array or { items: [] }')

const inputRoot = path.dirname(absoluteInput)
const knownInventory = new Map(imageManifest.map((item) => [item.id, item]))
const curatedIds = new Set(curatedMediaCatalog.map((item) => item.id))
const existingById = new Map(mediaCatalog.map((item) => [item.id, item]))
const hashes = new Map()
const paths = new Map()
const problems = []
const warnings = []
const rows = []

function resolveFile(file) {
  if (!file) return ''
  return path.isAbsolute(file) ? file : path.resolve(inputRoot, file)
}

function normalizedPublicPath(file, explicitPath) {
  const value = String(explicitPath || '').replace(/^\/+/, '')
  if (value) return value.split(path.sep).join('/')
  if (!file) return ''
  const relative = relativePosix(repoRoot, file)
  if (relative.startsWith('../')) return ''
  return relative
}

function publicUrl(publicPath, explicitUrl) {
  if (explicitUrl) return String(explicitUrl)
  if (!publicPath) return ''
  return publicBaseUrl ? `${publicBaseUrl}/${publicPath.split('/').map(encodeURIComponent).join('/')}` : publicPath
}

function inspectFile(entry, role, file, publicPath) {
  if (!file) {
    problems.push(`${entry.id}: missing ${role}File`)
    return null
  }
  if (!fs.existsSync(file)) {
    problems.push(`${entry.id}: ${role} file not found ${file}`)
    return null
  }
  const inventory = knownInventory.get(entry.id)
  if (inventory && !path.basename(file).toLowerCase().includes(inventory.ownerId.toLowerCase())) {
    problems.push(`${entry.id}: ${role} filename must contain ownerId ${inventory.ownerId}`)
  }
  let info
  try {
    info = readImageInfo(file)
  } catch (error) {
    problems.push(`${entry.id}: cannot inspect ${role}: ${error.message}`)
    return null
  }
  if (!RASTER_MIMES.has(info.mime)) problems.push(`${entry.id}: unsupported or damaged ${role} MIME ${info.mime || 'unknown'}`)
  if (!info.width || !info.height) problems.push(`${entry.id}: ${role} has no readable pixel dimensions`)
  if (info.bytes < 1024) problems.push(`${entry.id}: ${role} is empty or suspiciously small (${info.bytes} bytes)`)
  const expectedExtension = extensionForMime(info.mime)
  const actualExtension = path.extname(file).toLowerCase()
  const jpegAliases = expectedExtension === '.jpg' && (actualExtension === '.jpeg' || actualExtension === '.jpg')
  if (expectedExtension && actualExtension !== expectedExtension && !jpegAliases) {
    problems.push(`${entry.id}: ${role} extension ${actualExtension} does not match ${info.mime}`)
  }
  const pathKey = String(publicPath || '').toLowerCase()
  if (pathKey) {
    if (paths.has(pathKey) && paths.get(pathKey) !== entry.id) problems.push(`${entry.id}: public filename collision with ${paths.get(pathKey)} at ${publicPath}`)
    paths.set(pathKey, entry.id)
  }
  const hashOwner = hashes.get(info.sha256)
  if (hashOwner && hashOwner.id !== entry.id) problems.push(`${entry.id}: duplicate image content also used by ${hashOwner.id} (${role}/${hashOwner.role})`)
  else hashes.set(info.sha256, { id: entry.id, role })
  return info
}

function checkDimensions(entry, inventory, image, thumbnail) {
  if (!image || !thumbnail) return
  if (thumbnail.width < 360 || thumbnail.width > 900) warnings.push(`${entry.id}: thumbnail width ${thumbnail.width}px is outside the recommended 480—720px range`)
  if (image.width < 900 || image.width > 2600) warnings.push(`${entry.id}: image width ${image.width}px is outside the recommended 1200—2400px range`)
  const expected = inventory && inventory.ratio === '16:9' ? 16 / 9 : 4 / 3
  const actual = image.width / image.height
  if (Math.abs(actual - expected) / expected > 0.42) warnings.push(`${entry.id}: source aspect ${actual.toFixed(2)} differs strongly from expected ${inventory.ratio}; set focalPoint and review crop`)
}

const normalized = entries.map((entry, index) => {
  const inventory = knownInventory.get(entry.id)
  if (!inventory) problems.push(`Entry ${index + 1}: unknown media id ${entry.id}`)
  if (curatedIds.has(entry.id)) warnings.push(`${entry.id}: curated record exists; sync will not overwrite it`)
  const existing = existingById.get(entry.id) || {}
  const imageFile = resolveFile(entry.imageFile)
  const thumbnailFile = resolveFile(entry.thumbnailFile || entry.imageFile)
  const imagePublicPath = normalizedPublicPath(imageFile, entry.imagePublicPath)
  const thumbnailPublicPath = normalizedPublicPath(thumbnailFile, entry.thumbnailPublicPath)
  const imageInfo = inspectFile(entry, 'image', imageFile, imagePublicPath)
  const thumbnailInfo = inspectFile(entry, 'thumbnail', thumbnailFile, thumbnailPublicPath)
  checkDimensions(entry, inventory, imageInfo, thumbnailInfo)

  const rightsFields = ['alt', 'caption', 'credit', 'author', 'license', 'sourceUrl', 'scientificAccuracyNote', 'mediaType']
  const rights = {}
  rightsFields.forEach((field) => {
    rights[field] = String(entry[field] || existing[field] || '').trim()
    if (!rights[field]) problems.push(`${entry.id}: missing ${field}; sync never guesses rights or scientific context`)
  })
  const isReconstruction = entry.isReconstruction === undefined ? Boolean(existing.isReconstruction) : Boolean(entry.isReconstruction)
  if (rights.mediaType === 'reconstruction' && !isReconstruction) problems.push(`${entry.id}: reconstruction must set isReconstruction=true`)

  const imageUrl = publicUrl(imagePublicPath, entry.imageUrl)
  const thumbnailUrl = publicUrl(thumbnailPublicPath, entry.thumbnailUrl)
  if (!imageUrl || !thumbnailUrl) problems.push(`${entry.id}: missing usable public path or URL`)

  const originalBytes = Number(entry.originalBytes) || 0
  rows.push({
    id: entry.id,
    sourceBytes: originalBytes,
    imageBytes: imageInfo ? imageInfo.bytes : 0,
    thumbnailBytes: thumbnailInfo ? thumbnailInfo.bytes : 0,
    imageSize: imageInfo ? `${imageInfo.width}×${imageInfo.height}` : 'invalid',
    thumbnailSize: thumbnailInfo ? `${thumbnailInfo.width}×${thumbnailInfo.height}` : 'invalid'
  })

  return {
    id: entry.id,
    ownerType: inventory ? inventory.ownerType : entry.ownerType || '',
    ownerId: inventory ? inventory.ownerId : entry.ownerId || '',
    thumbnailUrl,
    imageUrl,
    galleryUrls: Array.isArray(entry.galleryUrls) ? entry.galleryUrls : [],
    alt: rights.alt,
    caption: rights.caption,
    credit: rights.credit,
    author: rights.author,
    license: rights.license,
    sourceUrl: rights.sourceUrl,
    isReconstruction,
    mediaType: rights.mediaType,
    scientificAccuracyNote: rights.scientificAccuracyNote,
    focalPoint: String(entry.focalPoint || existing.focalPoint || '50% 50%'),
    priority: inventory ? inventory.priority : entry.priority || 'P2',
    requiredForRelease: inventory ? Boolean(inventory.requiredForRelease) : Boolean(entry.requiredForRelease),
    imageWidth: imageInfo ? imageInfo.width : 0,
    imageHeight: imageInfo ? imageInfo.height : 0,
    imageBytes: imageInfo ? imageInfo.bytes : 0,
    imageSha256: imageInfo ? imageInfo.sha256 : '',
    thumbnailWidth: thumbnailInfo ? thumbnailInfo.width : 0,
    thumbnailHeight: thumbnailInfo ? thumbnailInfo.height : 0,
    thumbnailBytes: thumbnailInfo ? thumbnailInfo.bytes : 0,
    thumbnailSha256: thumbnailInfo ? thumbnailInfo.sha256 : '',
    originalBytes,
    sourceInstitution: String(entry.sourceInstitution || existing.sourceInstitution || 'Wikimedia Commons'),
    hotlinkDomain: '',
    status: 'ready'
  }
}).filter((item) => !curatedIds.has(item.id))

warnings.forEach((warning) => console.warn(`Warning: ${warning}`))
if (problems.length) fail(problems.join('\n'))

const sourcePath = path.resolve(__dirname, '../data/media-catalog.js')
const source = fs.readFileSync(sourcePath, 'utf8')
const replacement = `// MEDIA_SYNC_START\nconst syncedMediaCatalog = ${JSON.stringify(normalized, null, 2)}\n// MEDIA_SYNC_END`
const updated = source.replace(/\/\/ MEDIA_SYNC_START[\s\S]*?\/\/ MEDIA_SYNC_END/, replacement)
if (updated === source && normalized.length) fail('Managed media markers were not found')

const readyIds = new Set(curatedMediaCatalog.map((item) => item.id).concat(normalized.map((item) => item.id)))
const missing = imageManifest.filter((item) => !readyIds.has(item.id))
const before = rows.reduce((sum, row) => sum + row.sourceBytes, 0)
const after = rows.reduce((sum, row) => sum + row.imageBytes + row.thumbnailBytes, 0)
const report = [
  '# 媒体同步报告', '',
  `- 生成时间：${new Date().toISOString()}`,
  `- 已验证条目：${normalized.length}`,
  `- 同步后缺失内容媒体：${missing.length}`,
  `- 原始文件标称总大小：${before} bytes`,
  `- 部署图与缩略图总大小：${after} bytes`, '',
  '| 媒体ID | 原始大小 | 详情图 | 缩略图 | 部署总大小 |',
  '| --- | ---: | --- | --- | ---: |',
  ...rows.map((row) => `| ${row.id} | ${row.sourceBytes || '未知'} | ${row.imageSize} | ${row.thumbnailSize} | ${row.imageBytes + row.thumbnailBytes} |`), '',
  '## 仍缺失媒体ID', '',
  missing.map((item) => `- ${item.id}`).join('\n') || '- 无'
].join('\n')

ensureDir(path.resolve(repoRoot, 'reports'))
fs.writeFileSync(path.resolve(repoRoot, 'reports/media-sync.md'), `${report}\n`)
console.log(`Validated media entries: ${normalized.length}`)
console.log(`Missing content media after sync: ${missing.length}`)
console.log(`Deployment bytes: ${after} (source reference bytes: ${before || 'unknown'})`)
if (write) {
  fs.writeFileSync(sourcePath, updated)
  console.log(`Updated ${sourcePath}`)
} else {
  console.log('Dry run only. Add --write to update data/media-catalog.js.')
}
