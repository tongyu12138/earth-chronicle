const TAB_ROUTES = ['/pages/science/index', '/pages/quiz/index']
const DEFAULT_THROTTLE_MS = 650

let lastNavigation = { key: '', at: 0 }

function currentRoutes() {
  try {
    return typeof getCurrentPages === 'function'
      ? getCurrentPages().map((page) => page.route || '').filter(Boolean)
      : []
  } catch (error) {
    return []
  }
}

function isDevelopment() {
  try {
    const info = wx.getAccountInfoSync && wx.getAccountInfoSync()
    return !info || !info.miniProgram || info.miniProgram.envVersion === 'develop'
  } catch (error) {
    return true
  }
}

function normalizePath(url) {
  const value = typeof url === 'string' ? url.trim() : ''
  if (!value) return ''
  return value.charAt(0) === '/' ? value : `/${value}`
}

function validateUrl(url) {
  const normalized = normalizePath(url)
  if (!normalized) return { valid: false, url: '', reason: '目标页面为空' }
  if (/\s|#/.test(normalized)) return { valid: false, url: normalized, reason: '目标页面格式不正确' }
  const path = normalized.split('?')[0]
  if (!/^\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)+$/.test(path)) {
    return { valid: false, url: normalized, reason: '目标页面路径不正确' }
  }
  return { valid: true, url: normalized, path }
}

function buildUrl(path, params) {
  const normalized = normalizePath(path)
  const query = Object.keys(params || {})
    .filter((key) => params[key] !== undefined && params[key] !== null && params[key] !== '')
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`)
    .join('&')
  return query ? `${normalized}?${query}` : normalized
}

function logFailure(method, url, error) {
  console.error('[Router]', {
    from: currentRoutes(),
    to: url,
    method,
    error
  })
}

function toastFailure(options, error) {
  const fallback = options.toastTitle || '暂时无法打开，请稍后重试'
  const errMsg = error && error.errMsg ? String(error.errMsg) : ''
  const title = isDevelopment() && errMsg
    ? errMsg.replace(/^\w+:fail\s*/i, '').slice(0, 28) || fallback
    : fallback
  wx.showToast({ title, icon: 'none', duration: 2200 })
}

function execute(method, rawUrl, options) {
  const config = options || {}
  const checked = validateUrl(rawUrl)
  if (!checked.valid) {
    const error = { errMsg: `${method}:fail ${checked.reason}` }
    logFailure(method, checked.url || rawUrl, error)
    toastFailure(config, error)
    if (typeof config.onFail === 'function') config.onFail(error)
    return false
  }

  const key = `${method}:${checked.url}`
  const now = Date.now()
  const throttleMs = config.throttle === false ? 0 : Number(config.throttleMs) || DEFAULT_THROTTLE_MS
  if (throttleMs && now - lastNavigation.at < throttleMs) {
    console.warn('[Router] rapid navigation ignored', { from: currentRoutes(), previous: lastNavigation.key, to: checked.url, method })
    return false
  }
  lastNavigation = { key, at: now }

  wx[method]({
    url: checked.url,
    success(result) {
      if (typeof config.onSuccess === 'function') config.onSuccess(result)
    },
    fail(error) {
      logFailure(method, checked.url, error)
      toastFailure(config, error)
      if (typeof config.onFail === 'function') config.onFail(error)
    }
  })
  return true
}

function navigateToPage(url, options) {
  const checked = validateUrl(url)
  if (checked.valid && TAB_ROUTES.includes(checked.path)) return switchTabPage(checked.path, options)
  return execute('navigateTo', url, options)
}

function redirectToPage(url, options) {
  const checked = validateUrl(url)
  if (checked.valid && TAB_ROUTES.includes(checked.path)) return switchTabPage(checked.path, options)
  return execute('redirectTo', url, options)
}

function switchTabPage(url, options) {
  const checked = validateUrl(url)
  if (!checked.valid || !TAB_ROUTES.includes(checked.path)) {
    const error = { errMsg: 'switchTab:fail 目标不是已注册的 Tab 页面' }
    logFailure('switchTab', checked.url || url, error)
    toastFailure(options || {}, error)
    return false
  }
  return execute('switchTab', checked.path, options)
}

function reLaunchPage(url, options) {
  const checked = validateUrl(url)
  if (checked.valid && TAB_ROUTES.includes(checked.path)) return switchTabPage(checked.path, options)
  return execute('reLaunch', url, options)
}

module.exports = {
  TAB_ROUTES,
  buildUrl,
  navigateToPage,
  redirectToPage,
  switchTabPage,
  reLaunchPage,
  validateUrl
}
