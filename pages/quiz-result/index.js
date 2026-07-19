const { creatures, getCreatureById } = require('../../data/creatures')
const { DIMENSIONS } = require('../../data/quiz-profiles')
const { getPeriodById } = require('../../data/periods')
const { dimensionLabels } = require('../../data/quiz')
const { similarity } = require('../../utils/quiz-engine')
const { getQuizResult, requestQuizReset } = require('../../utils/storage')
const { buildUrl, navigateToPage, reLaunchPage, switchTabPage } = require('../../utils/router')

function entertainmentScore(value) {
  const score = Math.round(Number(value))
  return Number.isFinite(score) ? Math.max(0, Math.min(100, score)) : 0
}

function nearestCreatures(creature) {
  return creatures.filter((item) => item.quizEligible && item.personalityProfile && item.id !== creature.id).map((item) => ({ item, score: similarity(creature.personalityProfile, item.personalityProfile) })).sort((left, right) => right.score - left.score).slice(0, 2).map((entry) => entry.item)
}

function profileTraits(creature) {
  return DIMENSIONS.map((key) => ({ key, label: dimensionLabels[key], value: Math.round(creature.personalityProfile[key] * 100) })).sort((left, right) => right.value - left.value).slice(0, 3)
}

Page({
  data: { primary: null, period: null, match: 0, showMatch: false, traits: [], profileBars: [], similar: [], sharedMode: false },

  onLoad(options) {
    const saved = getQuizResult()
    const sharedCreature = options.id ? getCreatureById(options.id) : null
    const primary = sharedCreature || (saved && getCreatureById(saved.primaryId))
    if (!primary) {
      wx.showToast({ title: '请先完成测试', icon: 'none' })
      setTimeout(() => reLaunchPage('/pages/quiz/index', { throttle: false }), 700)
      return
    }
    const sharedMode = Boolean(sharedCreature)
    const traits = sharedMode || !saved.traits ? profileTraits(primary) : saved.traits
    const similar = sharedMode || !Array.isArray(saved.similarIds) ? nearestCreatures(primary) : saved.similarIds.map(getCreatureById).filter(Boolean)
    const profile = sharedMode || !saved.profile ? primary.personalityProfile : saved.profile
    const profileBars = DIMENSIONS.map((key) => ({ key, label: dimensionLabels[key], value: Math.round(profile[key] * 100) })).sort((left, right) => right.value - left.value)
    this.setData({ primary, period: getPeriodById(primary.periodId), match: sharedMode ? 0 : entertainmentScore(saved.match), showMatch: !sharedMode, traits, profileBars, similar, sharedMode })
  },

  openCreature(event) {
    const id = event.currentTarget.dataset.id
    if (id) navigateToPage(buildUrl('/pages/creature-detail/index', { id }), { toastTitle: '暂时无法打开古生物档案' })
  },

  openAtlas() { navigateToPage('/pages/creatures/index', { toastTitle: '暂时无法打开图鉴' }) },
  retake() {
    requestQuizReset()
    switchTabPage('/pages/quiz/index', { throttle: false, toastTitle: '暂时无法重新测试' })
  },
  onShareAppMessage() {
    const primary = this.data.primary
    return { title: primary ? `我的远古身份是${primary.nameCn}｜你是哪一种？` : '测测你的远古身份', path: primary ? buildUrl('/pages/quiz-result/index', { id: primary.id }) : '/pages/quiz/index' }
  }
})
