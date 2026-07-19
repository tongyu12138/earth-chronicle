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

function resolveMediaUrl(value) {
  const url = typeof value === 'string' ? value.trim() : ''
  if (!url) return ''
  if (/^https:\/\//.test(url) || /^http:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\//.test(url) || /^\//.test(url)) return url
  const baseUrl = getMediaBaseUrl().replace(/\/$/, '')
  return baseUrl ? `${baseUrl}/${url.replace(/^\//, '')}` : ''
}

module.exports = { MEDIA_BASE_URLS, getEnvVersion, getMediaBaseUrl, resolveMediaUrl }
