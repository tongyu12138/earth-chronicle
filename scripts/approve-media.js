const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const { extensionForMime, requestBuffer, ensureDir, readImageInfo } = require('./media-utils')

const repoRoot = path.resolve(__dirname, '..')
const candidatePath = path.resolve(repoRoot, 'media/candidates.json')
const decisionPath = path.resolve(repoRoot, 'media/decisions.json')
const approvedPath = path.resolve(repoRoot, 'media/approved.json')
const publicRoot = path.resolve(repoRoot, 'media/public')
const writeCatalog = process.argv.includes('--write')
const refresh = process.argv.includes('--refresh')
const downloadDelay = Math.max(150, Number(process.env.MEDIA_DOWNLOAD_DELAY_MS) || 300)
let lastDownloadAt = 0
const hasCurl = spawnSync('curl', ['--version'], { stdio: 'ignore' }).status === 0

function fail(message) {
  console.error(message)
  process.exit(1)
}

if (!fs.existsSync(candidatePath)) fail('Missing media/candidates.json. Run discover-open-media.js first.')
if (!fs.existsSync(decisionPath)) fail('Missing media/decisions.json. Every approval must be explicit.')

const candidatesPayload = JSON.parse(fs.readFileSync(candidatePath, 'utf8'))
const decisionPayload = JSON.parse(fs.readFileSync(decisionPath, 'utf8'))
const groups = new Map((candidatesPayload.groups || []).map((group) => [group.mediaId, group]))
const decisions = decisionPayload.decisions || {}

function safeOwner(value) {
  const result = String(value || '').toLowerCase().replace(/[^a-z0-9._-]+/g, '-')
  if (!result || result.includes('..')) fail(`Unsafe owner path: ${value}`)
  return result
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function existingDownload(baseFile, options) {
  if (refresh) return ''
  const file = ['.jpg', '.png', '.webp'].map((extension) => `${baseFile}${extension}`).find((item) => fs.existsSync(item)) || ''
  if (!file) return ''
  const info = readImageInfo(file)
  if (options && options.maxWidth && info.width > options.maxWidth) return ''
  return file
}

async function fetchWithRetry(url, attempt) {
  try {
    const wait = Math.max(0, downloadDelay - (Date.now() - lastDownloadAt))
    if (wait) await delay(wait)
    lastDownloadAt = Date.now()
    return await requestBuffer(url)
  } catch (error) {
    const currentAttempt = attempt || 0
    if (currentAttempt >= 6 || ![429, 500, 502, 503, 504].includes(Number(error.status))) throw error
    const retryAfter = Number(error.headers && error.headers['retry-after'])
    const backoff = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : [35000, 60000, 90000, 120000, 150000, 180000][currentAttempt]
    console.warn(`[download] ${error.status}; retry in ${Math.ceil(backoff / 1000)}s`)
    await delay(backoff)
    return fetchWithRetry(url, currentAttempt + 1)
  }
}

async function fetchForFile(url, baseFile) {
  const wait = Math.max(0, downloadDelay - (Date.now() - lastDownloadAt))
  if (wait) await delay(wait)
  lastDownloadAt = Date.now()
  if (!hasCurl) return fetchWithRetry(url)
  const partial = `${baseFile}.partial`
  const result = spawnSync('curl', [
    '--fail', '--location', '--silent', '--show-error', '--compressed',
    '--retry', '6', '--retry-all-errors', '--retry-delay', '5', '--retry-max-time', '600',
    '--connect-timeout', '30', '--max-time', '180',
    '--user-agent', 'earth-chronicle-media-tools/1.0 (+https://github.com/tongyu12138/earth-chronicle; educational)',
    '--output', partial, '--write-out', '%{content_type}', url
  ], { encoding: 'utf8', maxBuffer: 1024 * 1024 })
  if (result.status !== 0) {
    if (fs.existsSync(partial)) fs.unlinkSync(partial)
    throw new Error(`curl download failed for ${url}: ${String(result.stderr || result.stdout || '').trim()}`)
  }
  const body = fs.readFileSync(partial)
  fs.unlinkSync(partial)
  return { body, headers: { 'content-type': String(result.stdout || '').trim() } }
}

async function download(url, baseFile, options) {
  const existing = existingDownload(baseFile, options)
  if (existing) return existing
  const response = await fetchForFile(url, baseFile)
  const contentType = String(response.headers['content-type'] || '').split(';')[0].trim().toLowerCase()
  const extension = extensionForMime(contentType)
  if (!extension) throw new Error(`Unsupported downloaded MIME ${contentType || 'unknown'} from ${url}`)
  const file = `${baseFile}${extension}`
  fs.writeFileSync(file, response.body)
  const info = readImageInfo(file)
  if (info.mime !== contentType && !(info.mime === 'image/jpeg' && contentType === 'image/jpg')) {
    throw new Error(`Downloaded MIME mismatch for ${file}: ${contentType} vs ${info.mime}`)
  }
  return file
}

async function approveOne(mediaId, decision) {
  if (decision.status !== 'approved') return null
  const group = groups.get(mediaId)
  if (!group) throw new Error(`${mediaId}: no discovery group`)
  const candidate = group.candidates.find((item) => item.id === decision.candidateId)
  if (!candidate) throw new Error(`${mediaId}: selected candidate does not exist: ${decision.candidateId}`)
  ;['mediaType', 'scientificAccuracyNote', 'alt', 'caption'].forEach((field) => {
    if (!String(decision[field] || '').trim()) throw new Error(`${mediaId}: approved decision missing ${field}`)
  })
  const isReconstruction = decision.mediaType === 'reconstruction' || Boolean(decision.isReconstruction)
  if (decision.mediaType === 'reconstruction' && !isReconstruction) throw new Error(`${mediaId}: reconstruction flag is required`)
  const directory = path.join(publicRoot, safeOwner(candidate.ownerType), safeOwner(candidate.ownerId))
  ensureDir(directory)
  const imageFile = await download(candidate.imageUrl, path.join(directory, `${safeOwner(candidate.ownerId)}-image`))
  const thumbnailFile = await download(candidate.thumbnailUrl, path.join(directory, `${safeOwner(candidate.ownerId)}-thumbnail`), { maxWidth: 900 })
  const imagePublicPath = path.relative(repoRoot, imageFile).split(path.sep).join('/')
  const thumbnailPublicPath = path.relative(repoRoot, thumbnailFile).split(path.sep).join('/')
  return {
    id: mediaId,
    imageFile: path.relative(path.dirname(approvedPath), imageFile).split(path.sep).join('/'),
    thumbnailFile: path.relative(path.dirname(approvedPath), thumbnailFile).split(path.sep).join('/'),
    imagePublicPath,
    thumbnailPublicPath,
    alt: decision.alt,
    caption: decision.caption,
    credit: decision.credit || candidate.credit || candidate.author,
    author: decision.author || candidate.author || candidate.credit,
    license: candidate.license,
    sourceUrl: candidate.filePageUrl,
    isReconstruction,
    mediaType: decision.mediaType,
    scientificAccuracyNote: decision.scientificAccuracyNote,
    focalPoint: decision.focalPoint || '50% 50%',
    originalBytes: Number(candidate.originalBytes) || 0,
    originalWidth: candidate.originalWidth,
    originalHeight: candidate.originalHeight,
    sourceInstitution: 'Wikimedia Commons',
    selectedCandidateId: candidate.id,
    selectedFileTitle: candidate.title,
    approvalNote: decision.approvalNote || ''
  }
}

async function main() {
  const approved = []
  const mediaIds = Object.keys(decisions).sort()
  for (let index = 0; index < mediaIds.length; index += 1) {
    const mediaId = mediaIds[index]
    if (decisions[mediaId].status !== 'approved') continue
    console.log(`[${approved.length + 1}] ${mediaId}`)
    const item = await approveOne(mediaId, decisions[mediaId])
    if (item) approved.push(item)
  }
  const payload = {
    generatedAt: new Date().toISOString(),
    publicBaseUrl: '',
    approvalPolicy: 'Only explicit approved decisions from media/decisions.json are included.',
    items: approved
  }
  fs.writeFileSync(approvedPath, `${JSON.stringify(payload, null, 2)}\n`)
  console.log(`Approved and downloaded: ${approved.length}`)
  console.log(`Written: ${approvedPath}`)
  const syncArgs = [path.resolve(__dirname, 'sync-media.js'), '--input', approvedPath]
  if (writeCatalog) syncArgs.push('--write')
  const result = spawnSync(process.execPath, syncArgs, { cwd: repoRoot, stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status || 1)
}

main().catch((error) => {
  console.error(error.stack || error.message)
  process.exit(1)
})
