const { getCreatureById } = require('../../data/creatures')
const { DIMENSIONS } = require('../../data/quiz-profiles')
const { getPeriodById } = require('../../data/periods')
const { dimensionLabels } = require('../../data/quiz')
const { recordView, isFavorite, toggleFavorite } = require('../../utils/storage')
const { buildUrl, navigateToPage, switchTabPage } = require('../../utils/router')

Page({
  data: { creature: null, period: null, profileBars: [], gallery: [], isFavorite: false, heroMediaReady: false },

  onLoad(options) {
    const creature = getCreatureById(options.id)
    if (!creature) {
      wx.showToast({ title: '没有找到这个古生物', icon: 'none' })
      setTimeout(() => wx.navigateBack({ fail: () => switchTabPage('/pages/science/index', { throttle: false }) }), 700)
      return
    }
    const profileBars = creature.quizEligible && creature.personalityProfile
      ? DIMENSIONS.map((key) => ({ key, label: dimensionLabels[key], value: Math.round(creature.personalityProfile[key] * 100) }))
      : []
    // 主图已经承担经过审核的艺术复原展示。没有独立馆藏图时不再制造
    // “复原 / 化石 / 比例图待补”空卡片，避免把缺失媒体误呈现为内容。
    const gallery = creature.gallery.filter((item) => item && (item.src || item.mediaId))
    const displayCreature = Object.assign({}, creature, { initial: creature.nameCn.charAt(0) })
    this.setData({ creature: displayCreature, period: getPeriodById(creature.periodId), profileBars, gallery, isFavorite: isFavorite('creature', creature.id) })
    wx.setNavigationBarTitle({ title: creature.nameCn })
    recordView('creature', creature.id, creature.nameCn, buildUrl('/pages/creature-detail/index', { id: creature.id }))
  },

  handleHeroReady() { this.setData({ heroMediaReady: true }) },
  toggleFavorite() {
    const creature = this.data.creature
    if (!creature) return
    const active = toggleFavorite('creature', creature.id)
    this.setData({ isFavorite: active })
    wx.showToast({ title: active ? '已收藏古生物' : '已取消收藏', icon: 'none' })
  },
  openPeriod() {
    if (this.data.period) navigateToPage(buildUrl('/pages/period/index', { id: this.data.period.id }), { toastTitle: '暂时无法打开所属时期' })
  },
  copySource(event) {
    const url = event.currentTarget.dataset.url
    if (url) wx.setClipboardData({ data: url })
  },
  onShareAppMessage() {
    const creature = this.data.creature
    return { title: creature ? `${creature.nameCn}｜地球编年史古生物图鉴` : '古生物图鉴', path: creature ? buildUrl('/pages/creature-detail/index', { id: creature.id }) : '/pages/creatures/index' }
  }
})
