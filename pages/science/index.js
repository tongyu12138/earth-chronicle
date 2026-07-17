const { periods } = require('../../data/periods')
const { eras } = require('../../data/eras')
const { events } = require('../../data/events')
const { creatures, getCreatureById } = require('../../data/creatures')
const { getRecent } = require('../../utils/storage')

function compactPeriod(period) {
  const representative = period.creatureIds.length ? getCreatureById(period.creatureIds[0]) : null
  return {
    id: period.id,
    name: period.name,
    englishName: period.englishName,
    range: period.range,
    tagline: period.tagline,
    color: period.color,
    accent: period.accent,
    icon: period.icon,
    thumbnail: period.thumbnail,
    imageAlt: period.imageAlt,
    representativeName: representative ? representative.nameCn : period.id === 'hadean' ? '尚无已确认生命' : period.eraId === 'human-history' ? '人类社会与技术' : '生态档案整理中',
    eventCount: period.eventIds.length
  }
}

Page({
  data: {
    eventCount: events.length,
    periodCount: periods.length,
    creatureCount: creatures.length,
    periodGroups: [],
    dailyCreature: null,
    continueItem: null,
    categories: [
      { id: 'periods', icon: '◌', name: '地质年代', copy: '29个时期与历史阶段' },
      { id: 'timeline', icon: '↧', name: '生命演化', copy: '保留61个事件的总览时间轴' },
      { id: 'creatures', icon: '✦', name: '古生物图鉴', copy: '跨越微生物到冰河巨兽' },
      { id: 'extinctions', icon: '⚠', name: '五次大灭绝', copy: '从环境危机理解生态重组' },
      { id: 'human', icon: '⌁', name: '人类演化', copy: '分枝演化、工具与文化网络' },
      { id: 'technology', icon: '⌘', name: '文明与科技', copy: '农业、工业、数字与人工智能' }
    ]
  },

  onLoad() {
    const periodGroups = eras.map((era) => ({
      id: era.id,
      name: era.name,
      englishName: era.englishName,
      range: era.range,
      color: era.color,
      periods: periods.filter((period) => period.eraId === era.id).map(compactPeriod)
    }))
    const dayIndex = Math.floor(Date.now() / 86400000) % creatures.length
    const dailyCreature = Object.assign({}, creatures[dayIndex], { initial: creatures[dayIndex].nameCn.charAt(0) })
    this.setData({ periodGroups, dailyCreature })
  },

  onShow() {
    const recent = getRecent()
    this.setData({ continueItem: recent.latest || null })
  },

  startJourney() {
    wx.pageScrollTo({ selector: '#period-explorer', duration: 500, offsetTop: 10 })
  },

  openPeriod(event) {
    const id = event.currentTarget.dataset.id
    if (!id) return wx.showToast({ title: '时期参数缺失', icon: 'none' })
    wx.navigateTo({ url: `/pages/period/index?id=${id}`, fail: () => wx.showToast({ title: '页面打开失败', icon: 'none' }) })
  },

  openCreature(event) {
    const id = event.currentTarget.dataset.id
    if (!id) return
    wx.navigateTo({ url: `/pages/creature-detail/index?id=${id}` })
  },

  handleDailyImageError() {
    const dailyCreature = Object.assign({}, this.data.dailyCreature, { image: '' })
    this.setData({ dailyCreature })
  },

  handlePeriodImageError(event) {
    const id = event.currentTarget.dataset.id
    const periodGroups = this.data.periodGroups.map((group) => Object.assign({}, group, {
      periods: group.periods.map((period) => period.id === id ? Object.assign({}, period, { thumbnail: '' }) : period)
    }))
    this.setData({ periodGroups })
  },

  openContinue() {
    const item = this.data.continueItem
    if (!item || !item.path) return
    wx.navigateTo({ url: item.path, fail: () => wx.showToast({ title: '阅读记录已失效', icon: 'none' }) })
  },

  openSearch() {
    wx.navigateTo({ url: '/pages/search/index' })
  },

  openCategory(event) {
    const id = event.currentTarget.dataset.id
    if (id === 'creatures') return wx.navigateTo({ url: '/pages/creatures/index' })
    if (id === 'timeline') return wx.navigateTo({ url: '/pages/timeline/index' })
    if (id === 'periods') return this.startJourney()
    if (id === 'human') return wx.navigateTo({ url: '/pages/period/index?id=early-homo' })
    if (id === 'technology') return wx.navigateTo({ url: '/pages/period/index?id=industrial-revolution' })
    if (id === 'extinctions') return wx.navigateTo({ url: '/pages/search/index?q=灭绝' })
  },

  onShareAppMessage() {
    return { title: '地球编年史｜从45.4亿年前到人工智能时代', path: '/pages/science/index' }
  }
})
