const fs = require('fs')
const path = require('path')
const { mediaCatalog } = require('../data/media-catalog')
const {
  DEFAULT_MEDIA_BASE_URL,
  MEDIA_BASE_URLS,
  getMediaUrlCandidates,
  isHttpsUrl
} = require('../config/media')

const repoRoot = path.resolve(__dirname, '..')
const problems = []
const expectedBaseUrl = 'https://tongyu12138.github.io/earth-chronicle'

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8')
}

function walk(directory, extensions) {
  return fs.readdirSync(directory, { withFileTypes: true }).reduce((files, entry) => {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) return files.concat(walk(file, extensions))
    return extensions.includes(path.extname(entry.name)) ? files.concat(file) : files
  }, [])
}

function relative(file) {
  return path.relative(repoRoot, file).split(path.sep).join('/')
}

if (DEFAULT_MEDIA_BASE_URL !== expectedBaseUrl) problems.push(`default media origin must be ${expectedBaseUrl}`)
;['develop', 'trial', 'release'].forEach((envVersion) => {
  if (MEDIA_BASE_URLS[envVersion] !== expectedBaseUrl) problems.push(`${envVersion} media origin must default to ${expectedBaseUrl}`)
  if (!isHttpsUrl(MEDIA_BASE_URLS[envVersion])) problems.push(`${envVersion} media origin must use HTTPS`)
})

const relativeCandidates = getMediaUrlCandidates('media/public/__runtime-probe__.jpg')
const legacyLocalCandidates = getMediaUrlCandidates('http://127.0.0.1:4173/media/public/__runtime-probe__.jpg')
const insecureCandidates = getMediaUrlCandidates('http://example.com/insecure.jpg')
if (!relativeCandidates.length || relativeCandidates[0] !== `${expectedBaseUrl}/media/public/__runtime-probe__.jpg`) {
  problems.push('relative media path does not resolve to the production HTTPS origin')
}
if (!legacyLocalCandidates.length || legacyLocalCandidates.some((url) => !isHttpsUrl(url))) {
  problems.push('legacy loopback media path is not safely rewritten to HTTPS')
}
if (insecureCandidates.length) problems.push('ordinary HTTP URL entered the image candidate list')
if (relativeCandidates.concat(legacyLocalCandidates).some((url) => /^http:\/\//i.test(url))) {
  problems.push('HTTP URL entered a resolved image candidate list')
}

mediaCatalog.forEach((item) => {
  ;['imageUrl', 'thumbnailUrl'].forEach((field) => {
    if (/^http:\/\//i.test(String(item[field] || ''))) problems.push(`${item.id} ${field} uses ordinary HTTP`)
  })
})

const businessRoots = ['app.js', 'config', 'components', 'pages', 'utils']
const businessFiles = businessRoots.reduce((files, item) => {
  const target = path.join(repoRoot, item)
  return files.concat(fs.statSync(target).isDirectory() ? walk(target, ['.js', '.wxml']) : [target])
}, [])
businessFiles.forEach((file) => {
  const source = fs.readFileSync(file, 'utf8')
  ;['saveFile', 'removeSavedFile', 'createCanvasContext'].forEach((api) => {
    if (new RegExp(`wx\\.${api}\\s*\\(`).test(source)) problems.push(`${relative(file)} directly calls deprecated wx.${api}`)
  })
  if (/<image\b[^>]*\bsrc=["']http:\/\//i.test(source)) problems.push(`${relative(file)} renders an ordinary HTTP image URL`)
})

const posterScript = read('pages/quiz-result/index.js')
const posterTemplate = read('pages/quiz-result/index.wxml')
if (!/getMediaUrlCandidates/.test(posterScript) || !/posterMediaCandidates/.test(posterScript)) {
  problems.push('quiz-result poster media does not use getMediaUrlCandidates')
}
if (!/filter\(\(url, index, list\) => isHttpsUrl\(url\)/.test(posterScript)) {
  problems.push('quiz-result poster candidates are not explicitly restricted to HTTPS')
}
if (!/wx\.getImageInfo\(\{\s*src:\s*url,/s.test(posterScript)) {
  problems.push('quiz-result poster image loader does not consume the validated HTTPS candidate')
}
if (/wx\.createCanvasContext|canvasId\s*:/.test(posterScript)) problems.push('quiz-result still uses the legacy Canvas API')
if (!/createSelectorQuery\(\).*fields\(\{\s*node:\s*true,\s*size:\s*true\s*\}\)/s.test(posterScript)) {
  problems.push('quiz-result does not query a Canvas 2D node and size')
}
if (!/canvas\.getContext\(['"]2d['"]\)/.test(posterScript) || !/canvas\.createImage\(\)/.test(posterScript)) {
  problems.push('quiz-result does not use the Canvas 2D context and image interface')
}
if (!/wx\.canvasToTempFilePath\(\{\s*canvas,/s.test(posterScript)) problems.push('quiz-result export does not pass the Canvas 2D node')
if (!/<canvas\s+type="2d"\s+id="resultPoster"/.test(posterTemplate)) problems.push('quiz-result template is missing the Canvas 2D node')
if (/canvas-id=/.test(posterTemplate)) problems.push('quiz-result template still contains canvas-id')

const project = JSON.parse(read('project.config.json'))
if (project.libVersion !== '3.16.2') problems.push(`project.config.json libVersion must remain 3.16.2, received ${project.libVersion}`)

const mediaServer = read('scripts/serve-media.js')
if (!/require\(['"]https['"]\)/.test(mediaServer)) problems.push('optional media server does not use HTTPS')
if (/require\(['"]http['"]\)/.test(mediaServer)) problems.push('optional media server still imports the HTTP server')
if (!/MEDIA_HTTPS_CERT/.test(mediaServer) || !/MEDIA_HTTPS_KEY/.test(mediaServer)) problems.push('optional HTTPS media server does not require certificate configuration')

if (problems.length) {
  problems.forEach((problem) => console.error(problem))
  process.exit(1)
}

console.log(`Media runtime validation passed: ${mediaCatalog.length} catalog records, ${businessFiles.length} business files`)
console.log(`Default media origin: ${expectedBaseUrl}`)
console.log('Canvas 2D poster path and deprecated API checks passed')
