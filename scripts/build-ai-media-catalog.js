const fs = require('fs')
const path = require('path')
const { imageManifest } = require('../data/image-manifest')

const repoRoot = path.resolve(__dirname, '..')
const generationsPath = path.resolve(repoRoot, 'media/ai-generations.json')
const outputPath = path.resolve(repoRoot, 'data/ai-media-catalog.js')
const sourceUrl = 'https://github.com/tongyu12138/earth-chronicle/blob/main/docs/IMAGE_SOURCES.md#项目自有-ai-艺术复原'

if (!fs.existsSync(generationsPath)) {
  throw new Error(`Missing AI generation registry: ${generationsPath}`)
}

const payload = JSON.parse(fs.readFileSync(generationsPath, 'utf8'))
const inventoryById = new Map(imageManifest.map((item) => [item.id, item]))

function buildAiAlt(inventory) {
  const fallback = `${inventory.scene}艺术复原图`
  const base = String(inventory.alt || fallback)
    .replace(/占位/g, '')
    .replace(/项目自有AI/g, '项目自有 AI')
    .trim()

  return /项目自有\s*AI/i.test(base)
    ? base
    : `${base}，项目自有 AI 艺术复原`
}

const records = (payload.items || []).map((generated) => {
  const inventory = inventoryById.get(generated.id)
  if (!inventory) throw new Error(`AI record is not in image manifest: ${generated.id}`)
  if (generated.reviewStatus !== 'visually-reviewed') {
    throw new Error(`AI record has not passed visual review: ${generated.id}`)
  }

  return {
    id: generated.id,
    ownerType: generated.ownerType,
    ownerId: generated.ownerId,
    thumbnailUrl: generated.thumbnailFile,
    imageUrl: generated.imageFile,
    galleryUrls: [],
    alt: buildAiAlt(inventory),
    caption: `${inventory.scene}。项目自有 AI 艺术复原，不是历史照片或直接观测。`,
    credit: '地球编年史项目 · OpenAI 图像生成',
    author: '地球编年史项目',
    license: 'Project-owned AI-generated artwork',
    sourceUrl,
    isReconstruction: true,
    mediaType: 'reconstruction',
    scientificAccuracyNote: `${generated.reviewNote} AI 生成图中的颜色、软组织、人物面貌、姿态、构图和未被证据约束的环境细节仍具推测性，不能替代化石、文物、档案或观测影像。`,
    focalPoint: '50% 50%',
    priority: inventory.priority,
    requiredForRelease: Boolean(inventory.requiredForRelease),
    imageWidth: generated.imageWidth,
    imageHeight: generated.imageHeight,
    imageBytes: generated.imageBytes,
    imageSha256: generated.imageSha256,
    thumbnailWidth: generated.thumbnailWidth,
    thumbnailHeight: generated.thumbnailHeight,
    thumbnailBytes: generated.thumbnailBytes,
    thumbnailSha256: generated.thumbnailSha256,
    originalBytes: generated.originalBytes,
    originalSha256: generated.originalSha256,
    sourceInstitution: '项目自有 AI 艺术复原',
    hotlinkDomain: '',
    status: 'ready'
  }
}).sort((left, right) => left.id.localeCompare(right.id))

const rowFields = [
  'id', 'ownerType', 'ownerId', 'thumbnailUrl', 'imageUrl', 'alt', 'caption', 'scientificAccuracyNote',
  'priority', 'requiredForRelease', 'imageWidth', 'imageHeight', 'imageBytes', 'imageSha256',
  'thumbnailWidth', 'thumbnailHeight', 'thumbnailBytes', 'thumbnailSha256', 'originalBytes', 'originalSha256'
]
const rows = records.map((record) => rowFields.map((field) => record[field]))
const common = {
  galleryUrls: [],
  credit: '地球编年史项目 · OpenAI 图像生成',
  author: '地球编年史项目',
  license: 'Project-owned AI-generated artwork',
  sourceUrl,
  isReconstruction: true,
  mediaType: 'reconstruction',
  focalPoint: '50% 50%',
  sourceInstitution: '项目自有 AI 艺术复原',
  hotlinkDomain: '',
  status: 'ready'
}
const rowLines = rows.map((row) => JSON.stringify(row)).join(',\n')
const output = `// 由 scripts/build-ai-media-catalog.js 根据 media/ai-generations.json 生成。\n` +
  `// 为控制微信主包体积，共享字段与逐图字段分开存储；运行时只做无损结构还原，不生成任何科学文案。\n` +
  `const fields=${JSON.stringify(rowFields)}\n` +
  `const common=${JSON.stringify(common)}\n` +
  `const rows=[\n${rowLines}\n]\n` +
  `const aiMediaCatalog=rows.map((row)=>Object.assign({},common,row.reduce((record,value,index)=>{record[fields[index]]=value;return record},{})))\n\n` +
  `module.exports = { aiMediaCatalog }\n`

fs.writeFileSync(outputPath, output)
console.log(`Wrote ${records.length} reviewed AI media records to ${path.relative(repoRoot, outputPath)}`)
