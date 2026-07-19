const { questions, categories } = require('../../data/knowledge-quiz')
const { getSources } = require('../../data/creature-knowledge/sources')
const { getPeriodById } = require('../../data/periods')
const { getKnowledgeBest, saveKnowledgeBest } = require('../../utils/storage')
const { switchTabPage } = require('../../utils/router')

function shuffled(items) {
  const result = items.slice()
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const value = result[index]
    result[index] = result[swapIndex]
    result[swapIndex] = value
  }
  return result
}

function buildRound() {
  return shuffled(categories.map((category) => shuffled(questions.filter((item) => item.category === category))[0]))
}

function decorateQuestion(question) {
  const sources = getSources(question.sourceIds)
  return Object.assign({}, question, {
    period: getPeriodById(question.periodId),
    sources,
    options: question.options.map((text, optionIndex) => ({ text, optionIndex, stateClass: '' }))
  })
}

Page({
  data: {
    state: 'welcome', bestScore: 0, currentIndex: 0, current: null, total: 5, score: 0,
    selectedIndex: -1, answered: false, isCorrect: false, progressPercent: 0, resultLabel: '', showTermHelp: false
  },

  onLoad() {
    this.setData({ bestScore: getKnowledgeBest() })
  },

  start() {
    this._round = buildRound()
    this.setData({ state: 'question', currentIndex: 0, score: 0, selectedIndex: -1, answered: false })
    this.showQuestion(0)
  },

  showQuestion(index) {
    const current = decorateQuestion(this._round[index])
    this.setData({ currentIndex: index, current, selectedIndex: -1, answered: false, isCorrect: false, showTermHelp: false, progressPercent: Math.round((index + 1) / this._round.length * 100) })
    wx.pageScrollTo({ scrollTop: 0, duration: 0 })
  },

  choose(event) {
    if (this.data.answered) return
    const selectedIndex = Number(event.currentTarget.dataset.index)
    const isCorrect = selectedIndex === this.data.current.correctIndex
    const options = this.data.current.options.map((option) => Object.assign({}, option, {
      stateClass: option.optionIndex === this.data.current.correctIndex ? 'correct' : (option.optionIndex === selectedIndex ? 'wrong' : 'muted')
    }))
    this.setData({ 'current.options': options, selectedIndex, answered: true, isCorrect, score: this.data.score + (isCorrect ? 1 : 0) })
  },

  toggleTermHelp() {
    this.setData({ showTermHelp: !this.data.showTermHelp })
  },

  next() {
    const nextIndex = this.data.currentIndex + 1
    if (nextIndex < this._round.length) return this.showQuestion(nextIndex)
    const score = this.data.score
    const bestScore = saveKnowledgeBest(score)
    const resultLabel = score === 5 ? '深时间讲解员' : score >= 3 ? '化石侦探' : '远古学徒'
    this.setData({ state: 'result', bestScore, resultLabel })
  },

  copySource(event) {
    const url = event.currentTarget.dataset.url
    if (url) wx.setClipboardData({ data: url })
  },

  backToQuiz() { switchTabPage('/pages/quiz/index') },

  onShareAppMessage() {
    return { title: `我在远古知识挑战答对了${this.data.score}/5｜地球编年史`, path: '/pages/knowledge-quiz/index' }
  }
})
