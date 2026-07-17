const { getCreatureById } = require('../../data/creatures')
const { DIMENSIONS } = require('../../data/quiz-profiles')
const { getPeriodById } = require('../../data/periods')
const { dimensionLabels } = require('../../data/quiz')
const { recordView, isFavorite, toggleFavorite } = require('../../utils/storage')
const { previewImages } = require('../../utils/image')
const { buildUrl, navigateToPage, switchTabPage } = require('../../utils/router')

Page({
  data: { creature: null, period: null, profileBars: [], gallery: [], isFavorite: false, imageFailed: false },

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
    const gallery = creature.gallery.length ? creature.gallery : [
      { id: 'reconstruction', mediaId: `${creature.mediaId}-reconstruction`, src: '', kind: '全身艺术复原', status: 'missing' },
      { id: 'fossil', mediaId: `${creature.mediaId}-fossil`, src: '', kind: '代表化石', status: 'missing' },
      { id: 'scale', mediaId: `${creature.mediaId}-scale`, src: '', kind: '体型比例', status: 'missing' }
    ]
    const displayCreature = Object.assign({}, creature, { initial: creature.nameCn.charAt(0) })
    this.setData({ creature: displayCreature, period: getPeriodById(creature.periodId), profileBars, gallery, isFavorite: isFavorite('creature', creature.id) })
    wx.setNavigationBarTitle({ title: creature.nameCn })
    recordView('creature', creature.id, creature.nameCn, buildUrl('/pages/creature-detail/index', { id: creature.id }))
  },

  handleImageError() { this.setData({ imageFailed: true }) },
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
  previewGallery(event) {
    const item = this.data.gallery[Number(event.currentTarget.dataset.index)]
    previewImages(this.data.gallery, item && item.src)
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
