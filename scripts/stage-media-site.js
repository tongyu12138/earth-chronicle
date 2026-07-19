const fs = require('fs')
const path = require('path')
const { mediaCatalog } = require('../data/media-catalog')

const repoRoot = path.resolve(__dirname, '..')
const outputFlag = process.argv.indexOf('--output')
const outputRoot = path.resolve(repoRoot, outputFlag >= 0 && process.argv[outputFlag + 1] ? process.argv[outputFlag + 1] : '_site')
const publicRoot = path.resolve(repoRoot, 'media/public')
const assets = new Set()

mediaCatalog.filter((item) => item.status === 'ready').forEach((item) => {
  ;[item.imageUrl, item.thumbnailUrl].forEach((value) => {
    const relative = String(value || '').replace(/^\/+/, '')
    if (!relative.startsWith('media/public/')) throw new Error(`${item.id} does not use a local approved media path: ${value}`)
    const source = path.resolve(repoRoot, relative)
    if (!source.startsWith(`${publicRoot}${path.sep}`)) throw new Error(`${item.id} media path escapes media/public: ${value}`)
    if (!fs.existsSync(source) || !fs.statSync(source).isFile()) throw new Error(`${item.id} media file is missing: ${value}`)
    assets.add(relative)
  })
})

fs.rmSync(outputRoot, { recursive: true, force: true })
assets.forEach((relative) => {
  const source = path.resolve(repoRoot, relative)
  const target = path.resolve(outputRoot, relative)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.copyFileSync(source, target)
})
fs.writeFileSync(path.join(outputRoot, '.nojekyll'), '')

const totalBytes = [...assets].reduce((sum, relative) => sum + fs.statSync(path.resolve(repoRoot, relative)).size, 0)
console.log(`Staged ${assets.size} active AI media files (${(totalBytes / 1024 / 1024).toFixed(2)} MiB) in ${path.relative(repoRoot, outputRoot) || outputRoot}`)
