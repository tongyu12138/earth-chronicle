const MEDIA_BASE_URLS = {
  develop: '',
  trial: '',
  release: ''
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
  if (/^https:\/\//.test(url) || /^\//.test(url)) return url
  const baseUrl = getMediaBaseUrl().replace(/\/$/, '')
  return baseUrl ? `${baseUrl}/${url.replace(/^\//, '')}` : ''
}

module.exports = { MEDIA_BASE_URLS, getEnvVersion, getMediaBaseUrl, resolveMediaUrl }
