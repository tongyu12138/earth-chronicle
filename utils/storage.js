const KEYS = {
  recent: 'earthChronicle.recent',
  favorites: 'earthChronicle.favorites',
  quizProgress: 'earthChronicle.quizProgress',
  quizResult: 'earthChronicle.quizResult',
  quizReset: 'earthChronicle.quizReset',
  knowledgeBest: 'earthChronicle.knowledgeBest'
}

function safeGet(key, fallback) {
  try {
    const value = wx.getStorageSync(key)
    return value === '' || value === undefined || value === null ? fallback : value
  } catch (error) {
    return fallback
  }
}

function safeSet(key, value) {
  try {
    wx.setStorageSync(key, value)
    return true
  } catch (error) {
    wx.showToast({ title: '本地记录保存失败', icon: 'none' })
    return false
  }
}

function recordView(type, id, title, path) {
  if (!type || !id) return
  const recent = safeGet(KEYS.recent, {})
  recent[type] = { type, id, title: title || '', path: path || '', viewedAt: Date.now() }
  recent.latest = recent[type]
  safeSet(KEYS.recent, recent)
}

function getRecent() {
  const recent = safeGet(KEYS.recent, {})
  const legacyEventRoute = ['/pages', 'event', 'index'].join('/')
  Object.keys(recent || {}).forEach((key) => {
    const item = recent[key]
    if (item && typeof item.path === 'string' && item.path.indexOf(legacyEventRoute) === 0) {
      item.path = item.path.replace(legacyEventRoute, '/pages/detail/index')
    }
  })
  return recent
}

function getFavorites() {
  return safeGet(KEYS.favorites, { period: [], event: [], creature: [] })
}

function isFavorite(type, id) {
  const favorites = getFavorites()
  return Array.isArray(favorites[type]) && favorites[type].includes(id)
}

function toggleFavorite(type, id) {
  const favorites = getFavorites()
  if (!Array.isArray(favorites[type])) favorites[type] = []
  const index = favorites[type].indexOf(id)
  if (index >= 0) favorites[type].splice(index, 1)
  else favorites[type].push(id)
  safeSet(KEYS.favorites, favorites)
  return index < 0
}

function getQuizProgress() {
  return safeGet(KEYS.quizProgress, null)
}

function saveQuizProgress(progress) {
  return safeSet(KEYS.quizProgress, Object.assign({}, progress, { savedAt: Date.now() }))
}

function clearQuizProgress() {
  try { wx.removeStorageSync(KEYS.quizProgress) } catch (error) {}
}

function saveQuizResult(result) {
  return safeSet(KEYS.quizResult, result)
}

function getQuizResult() {
  return safeGet(KEYS.quizResult, null)
}

function requestQuizReset() {
  try {
    wx.removeStorageSync(KEYS.quizProgress)
    wx.removeStorageSync(KEYS.quizResult)
  } catch (error) {}
  return safeSet(KEYS.quizReset, true)
}

function consumeQuizReset() {
  const requested = Boolean(safeGet(KEYS.quizReset, false))
  if (requested) {
    try { wx.removeStorageSync(KEYS.quizReset) } catch (error) {}
  }
  return requested
}

function getKnowledgeBest() {
  return Number(safeGet(KEYS.knowledgeBest, 0)) || 0
}

function saveKnowledgeBest(score) {
  const next = Math.max(getKnowledgeBest(), Number(score) || 0)
  safeSet(KEYS.knowledgeBest, next)
  return next
}

module.exports = {
  KEYS, safeGet, safeSet, recordView, getRecent, getFavorites, isFavorite, toggleFavorite,
  getQuizProgress, saveQuizProgress, clearQuizProgress, saveQuizResult, getQuizResult,
  requestQuizReset, consumeQuizReset, getKnowledgeBest, saveKnowledgeBest
}
