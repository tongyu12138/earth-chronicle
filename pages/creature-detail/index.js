const { getCreatureById, DIMENSIONS } = require('../../data/creatures')
const { getPeriodById } = require('../../data/periods')
const { dimensionLabels } = require('../../data/quiz')
const { recordView, isFavorite, toggleFavorite } = require('../../utils/storage')
const { previewImages } = require('../../utils/image')

Page({
  data: { creature: null, period: null, profileBars: [], gallery: [], isFavorite: false, imageFailed: false },

  onLoad(options) {
    const creature = getCreatureById(options.id)
    if (!creature) {
      wx.showToast({ title: '没有找到这个古生物', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 700)
      return
    }
    const profileBars = DIMENSIONS.map((key) => ({ key, label: dimensionLabels[key], value: Math.round(creature.personalityProfile[key] * 100) }))
    const gallery = creature.gallery.length ? creature.gallery : [
      { id: 'reconstruction', src: '', kind: '全身艺术复原', status: 'needed' },
      { id: 'fossil', src: '', kind: '代表化石', status: 'needed' },
      { id: 'scale', src: '', kind: '体型比例', status: 'needed' }
    ]
    const displayCreature = Object.assign({}, creature, { initial: creature.nameCn.charAt(0) })
    this.setData({ creature: displayCreature, period: getPeriodById(creature.periodId), profileBars, gallery, isFavorite: isFavorite('creature', creature.id) })
    wx.setNavigationBarTitle({ title: creature.nameCn })
    recordView('creature', creature.id, creature.nameCn, `/pages/creature-detail/index?id=${creature.id}`)
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
    if (this.data.period) wx.navigateTo({ url: `/pages/period/index?id=${this.data.period.id}` })
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
    return { title: creature ? `${creature.nameCn}｜地球编年史古生物图鉴` : '古生物图鉴', path: creature ? `/pages/creature-detail/index?id=${creature.id}` : '/pages/creatures/index' }
  }
})
