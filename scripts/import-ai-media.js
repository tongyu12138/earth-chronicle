const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const { imageManifest } = require('../data/image-manifest')
const { readImageInfo, ensureDir, relativePosix } = require('./media-utils')

const repoRoot = path.resolve(__dirname, '..')
const recordsPath = path.resolve(repoRoot, 'media/ai-generations.json')
const args = process.argv.slice(2)

function value(flag) {
  const index = args.indexOf(flag)
  return index >= 0 ? args[index + 1] : ''
}

function fail(message) {
  console.error(message)
  process.exit(1)
}

function runSips(args) {
  const result = spawnSync('/usr/bin/sips', args, { encoding: 'utf8' })
  if (result.status !== 0) throw new Error((result.stderr || result.stdout || `sips exited ${result.status}`).trim())
}

function resizeJpeg(source, output, width, height, quality) {
  ensureDir(path.dirname(output))
  const sourceInfo = readImageInfo(source)
  const targetRatio = width / height
  const sourceRatio = sourceInfo.width / sourceInfo.height
  let resizeSource = source
  let cropFile = ''

  // sips --resampleHeightWidth changes the aspect ratio. Crop to the target
  // ratio first so generated animals are never silently stretched wider or
  // taller when the inventory requests 4:3 or 16:9 derivatives.
  if (Math.abs(sourceRatio - targetRatio) > 0.001) {
    const cropWidth = sourceRatio > targetRatio
      ? Math.round(sourceInfo.height * targetRatio)
      : sourceInfo.width
    const cropHeight = sourceRatio > targetRatio
      ? sourceInfo.height
      : Math.round(sourceInfo.width / targetRatio)
    cropFile = path.resolve(path.dirname(output), `.${path.basename(output)}.${process.pid}.crop.png`)
    runSips([
      '--cropToHeightWidth', String(cropHeight), String(cropWidth),
      source,
      '--out', cropFile
    ])
    resizeSource = cropFile
  }

  try {
    runSips([
      '--resampleHeightWidth', String(height), String(width),
      '--setProperty', 'format', 'jpeg',
      '--setProperty', 'formatOptions', String(quality),
      resizeSource,
      '--out', output
    ])
  } finally {
    if (cropFile && fs.existsSync(cropFile)) fs.unlinkSync(cropFile)
  }
  const info = readImageInfo(output)
  if (info.mime !== 'image/jpeg' || info.width !== width || info.height !== height) {
    throw new Error(`Unexpected output ${info.mime} ${info.width}×${info.height}`)
  }
  return info
}

const id = value('--id')
const source = path.resolve(value('--source') || '')
if (!id || !value('--source')) fail('Usage: node scripts/import-ai-media.js --id <media-id> --source <generated-image> [--review-note <text>]')
if (!fs.existsSync(source)) fail(`Generated source not found: ${source}`)

const inventory = imageManifest.find((item) => item.id === id)
if (!inventory) fail(`Media id is not in data/image-manifest.js: ${id}`)
const sourceInfo = readImageInfo(source)
if (!sourceInfo.width || !sourceInfo.height) fail(`Generated source is not a readable image: ${source}`)

const ratio = inventory.ratio === '16:9' ? '16:9' : (inventory.ratio === '1:1' ? '1:1' : '4:3')
const imageSize = ratio === '16:9'
  ? { width: 1600, height: 900 }
  : (ratio === '1:1' ? { width: 1600, height: 1600 } : { width: 1600, height: 1200 })
const thumbnailSize = ratio === '16:9'
  ? { width: 500, height: 281 }
  : (ratio === '1:1' ? { width: 500, height: 500 } : { width: 500, height: 375 })
const directory = path.resolve(repoRoot, 'media/public', inventory.ownerType, inventory.ownerId)
// A period owns three gallery records (environment, fossil and map). Using
// ownerId alone would make later imports overwrite earlier gallery images.
const outputStem = inventory.ownerType === 'period-gallery'
  ? inventory.id.replace(/^gallery-/, '')
  : inventory.ownerId
const imageFile = path.resolve(directory, `${outputStem}-ai-image.jpg`)
const thumbnailFile = path.resolve(directory, `${outputStem}-ai-thumbnail.jpg`)
const imageInfo = resizeJpeg(source, imageFile, imageSize.width, imageSize.height, 88)
const thumbnailInfo = resizeJpeg(source, thumbnailFile, thumbnailSize.width, thumbnailSize.height, 84)

const payload = fs.existsSync(recordsPath)
  ? JSON.parse(fs.readFileSync(recordsPath, 'utf8'))
  : { generatedAt: '', policy: 'Every record is a separately generated, project-owned AI reconstruction and requires visual/scientific review.', items: [] }
if (!Array.isArray(payload.items)) payload.items = []

const record = {
  id,
  ownerType: inventory.ownerType,
  ownerId: inventory.ownerId,
  ratio,
  imageFile: relativePosix(repoRoot, imageFile),
  thumbnailFile: relativePosix(repoRoot, thumbnailFile),
  imageWidth: imageInfo.width,
  imageHeight: imageInfo.height,
  imageBytes: imageInfo.bytes,
  imageSha256: imageInfo.sha256,
  thumbnailWidth: thumbnailInfo.width,
  thumbnailHeight: thumbnailInfo.height,
  thumbnailBytes: thumbnailInfo.bytes,
  thumbnailSha256: thumbnailInfo.sha256,
  originalWidth: sourceInfo.width,
  originalHeight: sourceInfo.height,
  originalBytes: sourceInfo.bytes,
  originalSha256: sourceInfo.sha256,
  provider: 'OpenAI image generation',
  generationMode: 'project-owned AI reconstruction',
  reviewStatus: 'visually-reviewed',
  reviewNote: value('--review-note') || '已检查时代、主体、生态背景、无文字水印与跨时代混搭；仍需在图注中声明软组织、颜色、姿态和环境细节具有推测性。'
}
const index = payload.items.findIndex((item) => item.id === id)
if (index >= 0) payload.items[index] = record
else payload.items.push(record)
payload.items.sort((left, right) => left.id.localeCompare(right.id))
payload.generatedAt = new Date().toISOString()
ensureDir(path.dirname(recordsPath))
fs.writeFileSync(recordsPath, `${JSON.stringify(payload, null, 2)}\n`)

console.log(`Imported ${id}: ${imageInfo.width}×${imageInfo.height} + ${thumbnailInfo.width}×${thumbnailInfo.height}`)
console.log(`${record.imageFile} (${imageInfo.bytes} bytes)`)
