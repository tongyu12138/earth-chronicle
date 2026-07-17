const KEYS = {
  recent: 'earthChronicle.recent',
  favorites: 'earthChronicle.favorites',
  quizProgress: 'earthChronicle.quizProgress',
  quizResult: 'earthChronicle.quizResult'
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
  return safeGet(KEYS.recent, {})
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

module.exports = {
  KEYS, safeGet, safeSet, recordView, getRecent, getFavorites, isFavorite, toggleFavorite,
  getQuizProgress, saveQuizProgress, clearQuizProgress, saveQuizResult, getQuizResult
}
