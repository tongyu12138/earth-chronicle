const { quizMeta, questions } = require('../../data/quiz')
const { creatures } = require('../../data/creatures')
const { buildResult } = require('../../utils/quiz-engine')
const { getQuizProgress, saveQuizProgress, clearQuizProgress, saveQuizResult } = require('../../utils/storage')

function validPartial(progress) {
  return progress && Array.isArray(progress.answers) && Number.isInteger(progress.currentIndex) &&
    progress.currentIndex >= 0 && progress.currentIndex < questions.length &&
    progress.answers.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)
}

Page({
  data: {
    state: 'welcome',
    meta: quizMeta,
    total: questions.length,
    canResume: false,
    resumeText: '',
    currentIndex: 0,
    currentQuestion: null,
    questionNumber: 1,
    progressPercent: 0,
    answers: [],
    selectedIndex: -1
  },

  onLoad() {
    this.refreshResume()
  },

  onShow() {
    if (this.data.state === 'welcome') this.refreshResume()
  },

  refreshResume() {
    const progress = getQuizProgress()
    const canResume = validPartial(progress) && progress.answers.length > 0
    this._savedProgress = canResume ? progress : null
    this.setData({ canResume, resumeText: canResume ? `继续第 ${progress.currentIndex + 1} 题` : '' })
  },

  startNew() {
    clearQuizProgress()
    this.enterQuestion(0, [])
  },

  resumeQuiz() {
    if (!this._savedProgress) return this.startNew()
    this.enterQuestion(this._savedProgress.currentIndex, this._savedProgress.answers.slice())
  },

  enterQuestion(index, answers) {
    if (index < 0 || index >= questions.length) return
    this.setData({
      state: 'question',
      currentIndex: index,
      currentQuestion: questions[index],
      questionNumber: index + 1,
      progressPercent: Math.round(index / questions.length * 100),
      answers,
      selectedIndex: answers[index] === undefined ? -1 : answers[index]
    })
  },

  chooseOption(event) {
    if (this._timer || this.data.state !== 'question') return
    const optionIndex = Number(event.currentTarget.dataset.index)
    if (!Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex > 3) return
    const answers = this.data.answers.slice()
    answers[this.data.currentIndex] = optionIndex
    this.setData({ selectedIndex: optionIndex, answers })
    const nextIndex = this.data.currentIndex + 1
    saveQuizProgress({ answers, currentIndex: Math.min(nextIndex, questions.length - 1) })
    this._timer = setTimeout(() => {
      this._timer = null
      if (nextIndex < questions.length) this.enterQuestion(nextIndex, answers)
      else this.finishQuiz(answers)
    }, 240)
  },

  previousQuestion() {
    clearTimeout(this._timer)
    this._timer = null
    if (this.data.currentIndex <= 0) return
    const previousIndex = this.data.currentIndex - 1
    saveQuizProgress({ answers: this.data.answers, currentIndex: previousIndex })
    this.enterQuestion(previousIndex, this.data.answers.slice())
  },

  finishQuiz(answers) {
    try {
      const result = buildResult(answers, creatures)
      saveQuizResult(result)
      clearQuizProgress()
      this.setData({ state: 'analyzing', progressPercent: 100 })
      this._timer = setTimeout(() => {
        this._timer = null
        wx.redirectTo({ url: '/pages/quiz-result/index' })
      }, 1450)
    } catch (error) {
      wx.showToast({ title: '答案不完整，请重试', icon: 'none' })
      this.enterQuestion(Math.max(0, answers.length - 1), answers)
    }
  },

  backHome() {
    wx.switchTab({ url: '/pages/science/index' })
  },

  onUnload() {
    clearTimeout(this._timer)
  },

  onShareAppMessage() {
    return { title: '15题测出你的远古身份｜地球编年史', path: '/pages/quiz/index' }
  }
})
