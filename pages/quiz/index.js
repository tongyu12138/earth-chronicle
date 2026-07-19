const { quizMeta, questions } = require('../../data/quiz')
const { quizProfiles } = require('../../data/quiz-profiles')
const { getPeriodById } = require('../../data/periods')
const { buildResult } = require('../../utils/quiz-engine')
const { getQuizProgress, saveQuizProgress, clearQuizProgress, saveQuizResult, consumeQuizReset } = require('../../utils/storage')
const { navigateToPage, redirectToPage, switchTabPage } = require('../../utils/router')

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
    currentPeriod: null,
    questionNumber: 1,
    progressPercent: 0,
    answers: [],
    selectedIndex: -1,
    reduceMotion: false,
    showFact: false,
    answerInsight: '',
    afterAnswerFact: '',
    showScienceDetail: false,
    chapterTitle: '',
    chapterPeriod: null,
    chapterMediaId: ''
  },

  onLoad() {
    this.refreshResume()
  },

  onShow() {
    if (consumeQuizReset()) {
      clearQuizProgress()
      this._savedProgress = null
      this.setData({ state: 'welcome', canResume: false, resumeText: '', currentIndex: 0, currentQuestion: null, questionNumber: 1, progressPercent: 0, answers: [], selectedIndex: -1, showFact: false })
      return
    }
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
    this.enterChapter(0, [])
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
      currentPeriod: getPeriodById(questions[index].periodId),
      questionNumber: index + 1,
      progressPercent: Math.round((index + 1) / questions.length * 100),
      answers,
      selectedIndex: answers[index] === undefined ? -1 : answers[index],
      showFact: false,
      showScienceDetail: false,
      answerInsight: '',
      afterAnswerFact: ''
    })
  },

  enterChapter(index, answers) {
    if (index < 0 || index >= questions.length) return
    const question = questions[index]
    this.setData({
      state: 'chapter',
      currentIndex: index,
      answers,
      chapterTitle: question.chapter,
      chapterPeriod: getPeriodById(question.periodId),
      chapterMediaId: question.sceneMediaId,
      progressPercent: Math.round(index / questions.length * 100)
    })
    clearTimeout(this._timer)
    this._timer = setTimeout(() => {
      this._timer = null
      this.enterQuestion(index, answers)
    }, this.data.reduceMotion ? 280 : 1150)
  },

  toggleMotion() {
    this.setData({ reduceMotion: !this.data.reduceMotion })
  },

  toggleScienceDetail() {
    this.setData({ showScienceDetail: !this.data.showScienceDetail })
  },

  openKnowledgeChallenge() {
    navigateToPage('/pages/knowledge-quiz/index', { toastTitle: '暂时无法打开知识挑战' })
  },

  chooseOption(event) {
    if (this._timer || this.data.state !== 'question') return
    const optionIndex = Number(event.currentTarget.dataset.index)
    if (!Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex > 3) return
    const answers = this.data.answers.slice()
    answers[this.data.currentIndex] = optionIndex
    const selected = this.data.currentQuestion.options[optionIndex]
    this.setData({ selectedIndex: optionIndex, answers, showFact: true, answerInsight: selected.insight, afterAnswerFact: this.data.currentQuestion.afterAnswerFact })
    saveQuizProgress({ answers, currentIndex: this.data.currentIndex })
  },

  continueAfterAnswer() {
    if (!this.data.showFact || this.data.selectedIndex < 0) return
    const answers = this.data.answers.slice()
    const nextIndex = this.data.currentIndex + 1
    saveQuizProgress({ answers, currentIndex: Math.min(nextIndex, questions.length - 1) })
    if (nextIndex < questions.length && nextIndex % 5 === 0) this.enterChapter(nextIndex, answers)
    else if (nextIndex < questions.length) this.enterQuestion(nextIndex, answers)
    else this.finishQuiz(answers)
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
      const result = buildResult(answers, quizProfiles)
      saveQuizResult(result)
      clearQuizProgress()
      this.setData({ state: 'analyzing', progressPercent: 100 })
      this._timer = setTimeout(() => {
        this._timer = null
        redirectToPage('/pages/quiz-result/index', { toastTitle: '暂时无法打开测试结果' })
      }, 1450)
    } catch (error) {
      wx.showToast({ title: '答案不完整，请重试', icon: 'none' })
      this.enterQuestion(Math.max(0, answers.length - 1), answers)
    }
  },

  backHome() {
    switchTabPage('/pages/science/index')
  },

  onUnload() {
    clearTimeout(this._timer)
  },

  onShareAppMessage() {
    return { title: '15题测出你的远古身份｜地球编年史', path: '/pages/quiz/index' }
  }
})
