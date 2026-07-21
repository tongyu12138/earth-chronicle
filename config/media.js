const DEFAULT_MEDIA_BASE_URL = 'https://tongyu12138.github.io/earth-chronicle'
const DEVELOP_MEDIA_OVERRIDE_STORAGE_KEY = 'earthChronicle.developMediaHttpsBaseUrl'

const MEDIA_BASE_URLS = {
  develop: DEFAULT_MEDIA_BASE_URL,
  trial: DEFAULT_MEDIA_BASE_URL,
  release: DEFAULT_MEDIA_BASE_URL
}

function getEnvVersion() {
  try {
    const info = typeof wx !== 'undefined' && wx.getAccountInfoSync ? wx.getAccountInfoSync() : null
    return info && info.miniProgram && info.miniProgram.envVersion
      ? info.miniProgram.envVersion
      : 'develop'
  } catch (error) {
    return 'develop'
  }
}

function normalizeBaseUrl(value) {
  return String(value || '').trim().replace(/\/+$/, '')
}

function isHttpsUrl(value) {
  return /^https:\/\/[^/]+/i.test(String(value || '').trim())
}

function getDevelopMediaOverride() {
  if (getEnvVersion() !== 'develop') return ''
  try {
    const value = typeof wx !== 'undefined' && wx.getStorageSync
      ? normalizeBaseUrl(wx.getStorageSync(DEVELOP_MEDIA_OVERRIDE_STORAGE_KEY))
      : ''
    return isHttpsUrl(value) ? value : ''
  } catch (error) {
    return ''
  }
}

function getMediaBaseUrl() {
  return getDevelopMediaOverride() || MEDIA_BASE_URLS[getEnvVersion()] || MEDIA_BASE_URLS.release
}

function joinMediaUrl(baseUrl, relativePath) {
  const base = normalizeBaseUrl(baseUrl)
  const path = String(relativePath || '').replace(/^\/+/, '')
  return isHttpsUrl(base) && path ? `${base}/${path}` : ''
}

function getMediaRelativePath(value) {
  const url = typeof value === 'string' ? value.trim() : ''
  if (!url) return ''
  const legacyLocalMatch = url.match(/^http:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\/(.+)$/i)
  if (legacyLocalMatch) return legacyLocalMatch[1].replace(/^\/+/, '')
  if (!/^[a-z]+:\/\//i.test(url) && !url.startsWith('/') && !url.startsWith('//')) return url.replace(/^\/+/, '')
  return ''
}

function uniqueHttps(values) {
  return values.filter((candidate, index, list) => isHttpsUrl(candidate) && list.indexOf(candidate) === index)
}

function getMediaUrlCandidates(value) {
  const url = typeof value === 'string' ? value.trim() : ''
  if (!url) return []
  if (isHttpsUrl(url)) return [url]
  if (url.startsWith('/') && !url.startsWith('//')) return [url]

  const relativePath = getMediaRelativePath(url)
  if (!relativePath) return []

  const envVersion = getEnvVersion()
  const bases = envVersion === 'develop'
    ? [getDevelopMediaOverride(), MEDIA_BASE_URLS.develop, MEDIA_BASE_URLS.release]
    : [MEDIA_BASE_URLS[envVersion], MEDIA_BASE_URLS.release]
  return uniqueHttps(bases.map((base) => joinMediaUrl(base, relativePath)))
}

function resolveMediaUrl(value) {
  return getMediaUrlCandidates(value)[0] || ''
}

module.exports = {
  DEFAULT_MEDIA_BASE_URL,
  DEVELOP_MEDIA_OVERRIDE_STORAGE_KEY,
  MEDIA_BASE_URLS,
  getEnvVersion,
  getMediaBaseUrl,
  getMediaUrlCandidates,
  isHttpsUrl,
  resolveMediaUrl
}
