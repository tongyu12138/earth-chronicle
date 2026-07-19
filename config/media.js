const MEDIA_BASE_URLS = {
  // 开发者工具中先运行：node scripts/serve-media.js
  develop: 'http://127.0.0.1:4173',
  // GitHub Pages 只承载本项目已审批并重新托管的开放授权媒体，不使用 GitHub Raw。
  trial: 'https://tongyu12138.github.io/earth-chronicle',
  release: 'https://tongyu12138.github.io/earth-chronicle'
}

function getEnvVersion() {
  try {
    const info = wx.getAccountInfoSync && wx.getAccountInfoSync()
    return info && info.miniProgram && info.miniProgram.envVersion
      ? info.miniProgram.envVersion
      : 'develop'
  } catch (error) {
    return 'develop'
  }
}

function getMediaBaseUrl() {
  return MEDIA_BASE_URLS[getEnvVersion()] || ''
}

function normalizeBaseUrl(value) {
  return String(value || '').replace(/\/$/, '')
}

function joinMediaUrl(baseUrl, relativePath) {
  const base = normalizeBaseUrl(baseUrl)
  const path = String(relativePath || '').replace(/^\/+/, '')
  return base && path ? `${base}/${path}` : ''
}

function getLocalMediaPath(value) {
  const url = typeof value === 'string' ? value.trim() : ''
  if (!url) return ''
  const localMatch = url.match(/^http:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\/(.+)$/i)
  if (localMatch) return localMatch[1].replace(/^\/+/, '')
  if (!/^[a-z]+:\/\//i.test(url) && !url.startsWith('/')) return url.replace(/^\/+/, '')
  return ''
}

function getMediaUrlCandidates(value) {
  const url = typeof value === 'string' ? value.trim() : ''
  if (!url) return []
  if (/^https:\/\//i.test(url) || (url.startsWith('/') && !url.startsWith('//'))) return [url]

  const relativePath = getLocalMediaPath(url)
  if (!relativePath) return [url]

  const envVersion = getEnvVersion()
  const candidates = [joinMediaUrl(MEDIA_BASE_URLS[envVersion], relativePath)]
  // 本地媒体服务关闭或电脑锁屏后，开发者工具自动回退到与正式版相同的 HTTPS 媒体。
  if (envVersion === 'develop') candidates.push(joinMediaUrl(MEDIA_BASE_URLS.release, relativePath))
  return candidates.filter((candidate, index, list) => candidate && list.indexOf(candidate) === index)
}

function resolveMediaUrl(value) {
  return getMediaUrlCandidates(value)[0] || ''
}

module.exports = { MEDIA_BASE_URLS, getEnvVersion, getMediaBaseUrl, getMediaUrlCandidates, resolveMediaUrl }
