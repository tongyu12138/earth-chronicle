const { eras } = require('../../data/eras')
const { periodSummaries } = require('../../data/period-summaries')
const { creatureSummaries } = require('../../data/creature-summaries')
const { indexMeta, categories, featuredEvents, massExtinctions } = require('../../data/index-meta')
const { getRecent } = require('../../utils/storage')
const { buildUrl, navigateToPage, switchTabPage } = require('../../utils/router')

function periodsForEra(eraId) {
  return periodSummaries.filter((period) => period.eraId === eraId)
}

Page({
  data: {
    meta: indexMeta,
    eras,
    categories,
    featuredEvents,
    massExtinctions,
    selectedEraId: eras[0].id,
    selectedEra: eras[0],
    visiblePeriods: periodsForEra(eras[0].id),
    dailyCreature: null,
    continueItem: null
  },

  onLoad() {
    const dayIndex = Math.floor(Date.now() / 86400000) % creatureSummaries.length
    this.setData({ dailyCreature: creatureSummaries[dayIndex] })
  },

  onShow() {
    const recent = getRecent()
    this.setData({ continueItem: recent.latest || null })
  },

  startJourney() {
    wx.pageScrollTo({ selector: '#era-explorer', duration: 500, offsetTop: 12 })
  },

  selectEra(event) {
    const id = event.currentTarget.dataset.id
    const selectedEra = eras.find((era) => era.id === id)
    if (!selectedEra || id === this.data.selectedEraId) return
    this.setData({ selectedEraId: id, selectedEra, visiblePeriods: periodsForEra(id) })
  },

  openPeriod(event) {
    const id = event.currentTarget.dataset.id
    if (!id) return wx.showToast({ title: '时期参数缺失', icon: 'none' })
    navigateToPage(buildUrl('/pages/period/index', { id }), { toastTitle: '暂时无法打开时期' })
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

  openContinue() {
    const item = this.data.continueItem
    if (!item || !item.path) return
    navigateToPage(item.path, { toastTitle: '这条阅读记录已失效' })
  },

  openSearch() {
    navigateToPage('/pages/search/index', { toastTitle: '暂时无法打开搜索' })
  },

  openTimeline() {
    navigateToPage('/pages/timeline/index', { toastTitle: '暂时无法打开时间轴' })
  },

  openAtlas() {
    navigateToPage('/pages/creatures/index', { toastTitle: '暂时无法打开图鉴' })
  },

  openQuiz() {
    switchTabPage('/pages/quiz/index')
  },

  openCategory(event) {
    const id = event.currentTarget.dataset.id
    if (id === 'timeline') return this.openTimeline()
    if (id === 'creatures') return this.openAtlas()
    if (id === 'human') return navigateToPage(buildUrl('/pages/period/index', { id: 'early-homo' }))
    if (id === 'extinctions') wx.pageScrollTo({ selector: '#mass-extinctions', duration: 420, offsetTop: 14 })
  },

  onShareAppMessage() {
    return { title: '地球编年史｜从45.4亿年前到人工智能时代', path: '/pages/science/index' }
  }
})
