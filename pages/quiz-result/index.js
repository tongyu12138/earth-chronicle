const { creatures, getCreatureById, DIMENSIONS } = require('../../data/creatures')
const { getPeriodById } = require('../../data/periods')
const { dimensionLabels } = require('../../data/quiz')
const { similarity } = require('../../utils/quiz-engine')
const { getQuizResult } = require('../../utils/storage')

function nearestCreatures(creature) {
  return creatures.filter((item) => item.id !== creature.id).map((item) => ({ item, score: similarity(creature.personalityProfile, item.personalityProfile) })).sort((left, right) => right.score - left.score).slice(0, 2).map((entry) => entry.item)
}

function profileTraits(creature) {
  return DIMENSIONS.map((key) => ({ key, label: dimensionLabels[key], value: Math.round(creature.personalityProfile[key] * 100) })).sort((left, right) => right.value - left.value).slice(0, 3)
}

Page({
  data: { primary: null, period: null, match: 0, traits: [], profileBars: [], similar: [], sharedMode: false, imageFailed: false },

  onLoad(options) {
    const saved = getQuizResult()
    const sharedCreature = options.id ? getCreatureById(options.id) : null
    const primary = sharedCreature || (saved && getCreatureById(saved.primaryId))
    if (!primary) {
      wx.showToast({ title: '请先完成测试', icon: 'none' })
      setTimeout(() => wx.reLaunch({ url: '/pages/quiz/index' }), 700)
      return
    }
    const sharedMode = Boolean(sharedCreature)
    const traits = sharedMode || !saved.traits ? profileTraits(primary) : saved.traits
    const similar = sharedMode || !Array.isArray(saved.similarIds) ? nearestCreatures(primary) : saved.similarIds.map(getCreatureById).filter(Boolean)
    const profile = sharedMode || !saved.profile ? primary.personalityProfile : saved.profile
    const profileBars = DIMENSIONS.map((key) => ({ key, label: dimensionLabels[key], value: Math.round(profile[key] * 100) })).sort((left, right) => right.value - left.value)
    this.setData({ primary: Object.assign({}, primary, { initial: primary.nameCn.charAt(0) }), period: getPeriodById(primary.periodId), match: sharedMode ? Number(options.match) || 92 : saved.match, traits, profileBars, similar, sharedMode })
  },

  openCreature(event) {
    const id = event.currentTarget.dataset.id
    if (id) wx.navigateTo({ url: `/pages/creature-detail/index?id=${id}` })
  },

  openAtlas() { wx.navigateTo({ url: '/pages/creatures/index' }) },
  handleImageError() { this.setData({ imageFailed: true }) },
  retake() { wx.reLaunch({ url: '/pages/quiz/index' }) },
  onShareAppMessage() {
    const primary = this.data.primary
    return { title: primary ? `我的远古身份是${primary.nameCn}｜你是哪一种？` : '测测你的远古身份', path: primary ? `/pages/quiz-result/index?id=${primary.id}&match=${this.data.match}` : '/pages/quiz/index' }
  }
})
