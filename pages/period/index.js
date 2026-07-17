const { periods, getPeriodById } = require('../../data/periods')
const { events } = require('../../data/events')
const { getCreaturesByPeriod, getCreatureSummaries } = require('../../data/creatures')
const { recordView, isFavorite, toggleFavorite } = require('../../utils/storage')
const { previewImages } = require('../../utils/image')
const { buildUrl, navigateToPage, redirectToPage, switchTabPage } = require('../../utils/router')

const environmentLabels = {
  continents: '大陆与海陆', climate: '气候', oxygen: '氧气趋势', ocean: '海洋环境',
  tectonics: '火山与构造', ice: '冰期状态', modernDifference: '与现代的区别'
}

function compactEvent(item) {
  return {
    id: item.id, title: item.title, displayTime: item.displayTime, category: item.category,
    summary: item.summary, significance: item.significance, mediaId: item.mediaId, thumbnail: item.thumbnail, imageAlt: item.imageAlt,
    color: item.color
  }
}

Page({
  data: {
    period: null,
    environmentRows: [],
    periodEvents: [],
    periodCreatures: [],
    previousPeriod: null,
    nextPeriod: null,
    isFavorite: false,
    imageFailed: false
  },

  onLoad(options) {
    const period = getPeriodById(options.id)
    if (!period) {
      wx.showToast({ title: '没有找到这个时期', icon: 'none' })
      setTimeout(() => wx.navigateBack({ fail: () => switchTabPage('/pages/science/index', { throttle: false }) }), 700)
      return
    }
    const index = periods.findIndex((item) => item.id === period.id)
    const environmentRows = Object.keys(environmentLabels).map((key) => ({ key, label: environmentLabels[key], value: period.environment[key] }))
    const periodEvents = period.eventIds.map((id) => events.find((item) => item.id === id)).filter(Boolean).map(compactEvent)
    const periodCreatures = getCreatureSummaries(getCreaturesByPeriod(period.id).slice(0, 10))
    this.setData({
      period,
      environmentRows,
      periodEvents,
      periodCreatures,
      previousPeriod: index > 0 ? { id: periods[index - 1].id, name: periods[index - 1].name } : null,
      nextPeriod: index < periods.length - 1 ? { id: periods[index + 1].id, name: periods[index + 1].name } : null,
      isFavorite: isFavorite('period', period.id),
      lifeEmptyTitle: period.id === 'hadean' ? '尚无已确认的生命' : period.eraId === 'human-history' ? '本章聚焦人类社会' : '代表生物档案整理中',
      lifeEmptyCopy: period.id === 'hadean' ? '冥古宙没有可靠生命化石。保持空白比为了凑数量制造物种更科学。' : period.eraId === 'human-history' ? '人类历史阶段与地质时期并列用于导航；古生物图鉴不在每个文明阶段重复展示智人。' : '当前没有足够可靠的代表条目，后续应在专业复核后补充。'
    })
    wx.setNavigationBarTitle({ title: period.name })
    recordView('period', period.id, period.name, buildUrl('/pages/period/index', { id: period.id }))
  },

  handleImageError() {
    this.setData({ imageFailed: true })
  },

  handleEventImageError(event) {
    const id = event.currentTarget.dataset.id
    this.setData({ periodEvents: this.data.periodEvents.map((item) => item.id === id ? Object.assign({}, item, { thumbnail: '' }) : item) })
  },

  handleCreatureImageError(event) {
    const id = event.currentTarget.dataset.id
    this.setData({ periodCreatures: this.data.periodCreatures.map((item) => item.id === id ? Object.assign({}, item, { thumbnail: '' }) : item) })
  },

  openEvent(event) {
    const id = event.currentTarget.dataset.id
    if (!id) return wx.showToast({ title: '事件参数缺失', icon: 'none' })
    navigateToPage(buildUrl('/pages/detail/index', { id }), { toastTitle: '暂时无法打开事件' })
  },

  openCreature(event) {
    const id = event.currentTarget.dataset.id
    if (!id) return
    navigateToPage(buildUrl('/pages/creature-detail/index', { id }), { toastTitle: '暂时无法打开古生物档案' })
  },

  previewGallery(event) {
    const index = Number(event.currentTarget.dataset.index)
    const current = this.data.period.gallery[index]
    previewImages(this.data.period.gallery, current && current.src)
  },

  toggleFavorite() {
    const period = this.data.period
    if (!period) return
    const active = toggleFavorite('period', period.id)
    this.setData({ isFavorite: active })
    wx.showToast({ title: active ? '已收藏时期' : '已取消收藏', icon: 'none' })
  },

  openAdjacent(event) {
    const id = event.currentTarget.dataset.id
    if (!id) return
    redirectToPage(buildUrl('/pages/period/index', { id }), { toastTitle: '暂时无法切换时期' })
  },

  backToAll() {
    switchTabPage('/pages/science/index')
  },

  copySource(event) {
    const url = event.currentTarget.dataset.url
    if (!url) return
    wx.setClipboardData({ data: url })
  },

  onShareAppMessage() {
    const period = this.data.period
    return {
      title: period ? `${period.name}｜地球编年史` : '地球编年史',
      path: period ? buildUrl('/pages/period/index', { id: period.id }) : '/pages/science/index'
    }
  }
})
