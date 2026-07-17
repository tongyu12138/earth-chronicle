const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { imageManifest } = require('../data/image-manifest')
const { mediaCatalog, curatedMediaCatalog } = require('../data/media-catalog')

const args = process.argv.slice(2)
const inputFlag = args.indexOf('--input')
const write = args.includes('--write')
const inputPath = inputFlag >= 0 ? args[inputFlag + 1] : ''

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

const root = path.dirname(absoluteInput)
const knownInventory = new Map(imageManifest.map((item) => [item.id, item]))
const curatedIds = new Set(curatedMediaCatalog.map((item) => item.id))
const hashes = new Map()
const problems = []
const warnings = []

function resolveFile(file) {
  return file ? path.resolve(root, file) : ''
}

function checksum(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
}

function publicUrl(file, explicitUrl) {
  if (explicitUrl) return explicitUrl
  if (!file || !publicBaseUrl) return ''
  return `${publicBaseUrl}/${encodeURIComponent(path.basename(file))}`
}

const normalized = entries.map((entry, index) => {
  const inventory = knownInventory.get(entry.id)
  if (!inventory) problems.push(`Entry ${index + 1}: unknown media id ${entry.id}`)
  if (curatedIds.has(entry.id)) warnings.push(`${entry.id}: curated record exists; sync will not overwrite it`)
  const imageFile = resolveFile(entry.imageFile)
  const thumbnailFile = resolveFile(entry.thumbnailFile)
  ;[imageFile, thumbnailFile].filter(Boolean).forEach((file) => {
    if (!fs.existsSync(file)) problems.push(`${entry.id}: file not found ${file}`)
    else {
      if (inventory && !path.basename(file).toLowerCase().includes(inventory.ownerId.toLowerCase())) {
        problems.push(`${entry.id}: filename must contain ownerId ${inventory.ownerId}`)
      }
      const hash = checksum(file)
      if (hashes.has(hash)) problems.push(`${entry.id}: duplicate file content also used by ${hashes.get(hash)}`)
      hashes.set(hash, entry.id)
    }
  })
  ;['alt', 'credit', 'author', 'license', 'sourceUrl'].forEach((field) => {
    if (!String(entry[field] || '').trim()) problems.push(`${entry.id}: missing ${field}`)
  })
  const imageUrl = publicUrl(imageFile, entry.imageUrl)
  const thumbnailUrl = publicUrl(thumbnailFile || imageFile, entry.thumbnailUrl)
  if (!/^https:\/\//.test(imageUrl) || !/^https:\/\//.test(thumbnailUrl)) {
    problems.push(`${entry.id}: provide HTTPS URLs or publicBaseUrl`)
  }
  return {
    id: entry.id,
    ownerType: inventory ? inventory.ownerType : entry.ownerType || '',
    ownerId: inventory ? inventory.ownerId : entry.ownerId || '',
    thumbnailUrl,
    imageUrl,
    galleryUrls: Array.isArray(entry.galleryUrls) ? entry.galleryUrls : [],
    alt: entry.alt || '', credit: entry.credit || '', author: entry.author || '',
    license: entry.license || '', sourceUrl: entry.sourceUrl || '',
    isReconstruction: Boolean(entry.isReconstruction), status: 'ready'
  }
}).filter((item) => !curatedIds.has(item.id))

if (problems.length) fail(problems.join('\n'))
warnings.forEach((warning) => console.warn(`Warning: ${warning}`))

const sourcePath = path.resolve(__dirname, '../data/media-catalog.js')
const source = fs.readFileSync(sourcePath, 'utf8')
const replacement = `// MEDIA_SYNC_START\nconst syncedMediaCatalog = ${JSON.stringify(normalized, null, 2)}\n// MEDIA_SYNC_END`
const updated = source.replace(/\/\/ MEDIA_SYNC_START[\s\S]*?\/\/ MEDIA_SYNC_END/, replacement)
if (updated === source && normalized.length) fail('Managed media markers were not found')

const readyIds = new Set(mediaCatalog.map((item) => item.id).concat(normalized.map((item) => item.id)))
const missing = imageManifest.filter((item) => !readyIds.has(item.id))
console.log(`Validated media entries: ${normalized.length}`)
console.log(`Missing content media after sync: ${missing.length}`)
console.log(missing.map((item) => item.id).join('\n'))
if (write) {
  fs.writeFileSync(sourcePath, updated)
  console.log(`Updated ${sourcePath}`)
} else {
  console.log('Dry run only. Add --write to update data/media-catalog.js.')
}
