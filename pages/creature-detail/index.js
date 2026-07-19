const { getCreatureById } = require('../../data/creatures')
const { getCreatureKnowledge } = require('../../data/creature-knowledge/index')
const { getPeriodById } = require('../../data/periods')
const { recordView, isFavorite, toggleFavorite } = require('../../utils/storage')
const { buildUrl, navigateToPage, switchTabPage } = require('../../utils/router')

const lifeFunctionLabels = {
  feeding: '怎么吃', locomotion: '怎么移动', respirationOrMetabolism: '呼吸与代谢', senses: '怎样感知',
  defense: '如何防御', growth: '怎样长大', reproduction: '繁殖线索', socialBehavior: '群体关系'
}

const evidenceLevelLabels = { direct: '直接证据', inferred: '比较推断', debated: '存在争议' }
const certaintyLabels = { supported: '证据支持', plausible: '合理推演', speculative: '想象性场景' }
const taxonomyConfidenceLabels = { high: '分类较稳定', medium: '部分仍待修订', debated: '分类仍有争议' }

function toLifeFunctions(lifeFunctions) {
  return Object.keys(lifeFunctions || {}).map((key) => ({ key, label: lifeFunctionLabels[key] || key, text: lifeFunctions[key] })).filter((item) => item.text)
}

function decorateKnowledge(knowledge) {
  if (!knowledge) return null
  return Object.assign({}, knowledge, {
    taxonomyPath: knowledge.taxonomy && knowledge.taxonomy.displayPath ? knowledge.taxonomy.displayPath.join(' · ') : '',
    taxonomyConfidenceLabel: knowledge.taxonomy ? taxonomyConfidenceLabels[knowledge.taxonomy.confidence] : '',
    distributionRegions: knowledge.distribution && knowledge.distribution.regions ? knowledge.distribution.regions.join('、') : '',
    relationResources: knowledge.ecologicalRelations && knowledge.ecologicalRelations.preyOrResources ? knowledge.ecologicalRelations.preyOrResources.join('、') : '',
    relationPredators: knowledge.ecologicalRelations && knowledge.ecologicalRelations.predators ? knowledge.ecologicalRelations.predators.join('、') : '',
    relationCompetitors: knowledge.ecologicalRelations && knowledge.ecologicalRelations.competitors ? knowledge.ecologicalRelations.competitors.join('、') : '',
    relationPartners: knowledge.ecologicalRelations && knowledge.ecologicalRelations.partners ? knowledge.ecologicalRelations.partners.join('、') : '',
    lifeFunctionList: toLifeFunctions(knowledge.lifeFunctions),
    anatomyHighlights: (knowledge.anatomyHighlights || []).map((item) => Object.assign({}, item, { evidenceLabel: evidenceLevelLabels[item.evidenceLevel] || '证据待评估' })),
    dayInTheLife: (knowledge.dayInTheLife || []).map((item) => Object.assign({}, item, { certaintyLabel: certaintyLabels[item.certainty] || '谨慎解读' })),
    knowledgeCheck: (knowledge.knowledgeCheck || []).map((item, questionIndex) => Object.assign({}, item, {
      questionIndex,
      answered: false,
      selectedIndex: -1,
      options: item.options.map((text, optionIndex) => ({ text, optionIndex, stateClass: '' }))
    }))
  })
}

Page({
  data: {
    creature: null, period: null, knowledge: null, gallery: [], isFavorite: false, heroMediaReady: false,
    showLife: true, showEvidence: false, showDebates: false, showExtras: false, quizCorrect: 0, quizAnswered: 0
  },

  onLoad(options) {
    const creature = getCreatureById(options.id)
    if (!creature) {
      wx.showToast({ title: '没有找到这个古生物', icon: 'none' })
      setTimeout(() => wx.navigateBack({ fail: () => switchTabPage('/pages/science/index', { throttle: false }) }), 700)
      return
    }
    const gallery = creature.gallery.filter((item) => item && (item.src || item.mediaId))
    const displayCreature = Object.assign({}, creature, { initial: creature.nameCn.charAt(0) })
    this.setData({
      creature: displayCreature,
      period: getPeriodById(creature.periodId),
      knowledge: decorateKnowledge(getCreatureKnowledge(creature.id)),
      gallery,
      isFavorite: isFavorite('creature', creature.id)
    })
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

  toggleSection(event) {
    const key = event.currentTarget.dataset.key
    if (['showLife', 'showEvidence', 'showDebates', 'showExtras'].indexOf(key) < 0) return
    this.setData({ [key]: !this.data[key] })
  },

  jumpToSection(event) {
    const selector = `#${event.currentTarget.dataset.target}`
    wx.pageScrollTo({ selector, duration: 260 })
  },

  answerKnowledgeCheck(event) {
    const questionIndex = Number(event.currentTarget.dataset.question)
    const optionIndex = Number(event.currentTarget.dataset.option)
    const checks = this.data.knowledge.knowledgeCheck.slice()
    const question = checks[questionIndex]
    if (!question || question.answered) return
    question.answered = true
    question.selectedIndex = optionIndex
    question.options = question.options.map((option) => Object.assign({}, option, {
      stateClass: option.optionIndex === question.correctIndex ? 'correct' : (option.optionIndex === optionIndex ? 'wrong' : 'muted')
    }))
    const correct = optionIndex === question.correctIndex
    this.setData({
      'knowledge.knowledgeCheck': checks,
      quizAnswered: this.data.quizAnswered + 1,
      quizCorrect: this.data.quizCorrect + (correct ? 1 : 0)
    })
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
