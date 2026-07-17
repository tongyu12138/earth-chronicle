const { imageManifest } = require('../data/image-manifest')
const { mediaCatalog } = require('../data/media-catalog')

const problems = []
const warnings = []
const allowedStatuses = new Set(['ready', 'missing'])
const approvedLicenses = /(public domain|cc0|cc by(?:-sa)?|授权|permission|nasa)/i
const catalogIds = new Set()

mediaCatalog.forEach((item) => {
  if (!item.id) problems.push('Media catalog contains an item without id')
  if (catalogIds.has(item.id)) problems.push(`Duplicate media catalog id: ${item.id}`)
  catalogIds.add(item.id)
  if (!allowedStatuses.has(item.status)) problems.push(`${item.id} has invalid status: ${item.status}`)
  if (item.status === 'ready') {
    ;['imageUrl', 'thumbnailUrl', 'alt', 'credit', 'author', 'license', 'sourceUrl'].forEach((field) => {
      if (!String(item[field] || '').trim()) problems.push(`${item.id} ready item missing ${field}`)
    })
    ;['imageUrl', 'thumbnailUrl', 'sourceUrl'].forEach((field) => {
      if (!/^https:\/\//.test(item[field] || '')) problems.push(`${item.id} ${field} must use https`)
    })
    if (!approvedLicenses.test(item.license || '')) problems.push(`${item.id} license is not in the approved set`)
    if (/raw\.githubusercontent\.com|github\.com\/.*\/raw\//i.test(`${item.imageUrl} ${item.thumbnailUrl}`)) {
      problems.push(`${item.id} must not use GitHub Raw as a production image service`)
    }
  }
})

const inventoryIds = new Set()
imageManifest.forEach((item) => {
  if (!item.id) problems.push('Image inventory contains an item without id')
  if (inventoryIds.has(item.id)) problems.push(`Duplicate image inventory id: ${item.id}`)
  inventoryIds.add(item.id)
  const record = mediaCatalog.find((media) => media.id === item.id)
  if (record && record.status === 'ready' && item.ownerId !== record.ownerId) {
    problems.push(`${item.id} owner mismatch: ${item.ownerId} !== ${record.ownerId}`)
  }
})

const ready = mediaCatalog.filter((item) => item.status === 'ready')
const missing = imageManifest.filter((item) => {
  const record = mediaCatalog.find((media) => media.id === item.id)
  return !record || record.status !== 'ready'
})
if (!ready.length) warnings.push('No verified ready media are currently connected')

console.log(`Verified ready media: ${ready.length}`)
console.log(`Required content media: ${imageManifest.length}; missing: ${missing.length}`)
console.log(`Ready IDs: ${ready.map((item) => item.id).join(', ') || 'none'}`)
if (warnings.length) warnings.forEach((warning) => console.warn(`Warning: ${warning}`))
if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log('Media validation passed')
