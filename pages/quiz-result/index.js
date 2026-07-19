const { creatures, getCreatureById } = require('../../data/creatures')
const { DIMENSIONS } = require('../../data/quiz-profiles')
const { getPeriodById } = require('../../data/periods')
const { getCreatureKnowledge } = require('../../data/creature-knowledge/index')
const { getMediaById } = require('../../data/media-catalog')
const { dimensionLabels, questions } = require('../../data/quiz')
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

const DIMENSION_GROUPS = [
  { key: 'exploration', label: '探索方式', dimensions: ['curiosity', 'strategy', 'speed', 'independence'] },
  { key: 'risk', label: '风险策略', dimensions: ['boldness', 'patience', 'adaptability', 'defense'] },
  { key: 'social', label: '社交模式', dimensions: ['sociability', 'sizePreference'] },
  { key: 'environment', label: '环境偏好', dimensions: ['aquaticAffinity', 'terrestrialAffinity', 'aerialAffinity', 'coldAffinity'] }
]

function dimensionGroups(profile) {
  return DIMENSION_GROUPS.map((group) => {
    const value = Math.round(group.dimensions.reduce((sum, key) => sum + Number(profile[key] || 0), 0) / group.dimensions.length * 100)
    const strongest = group.dimensions.slice().sort((left, right) => Number(profile[right] || 0) - Number(profile[left] || 0))[0]
    return { key: group.key, label: group.label, value, note: `${dimensionLabels[strongest]}更突出` }
  })
}

function comparisonNote(primary, candidate) {
  const shared = DIMENSIONS.map((key) => ({ key, score: (primary.personalityProfile[key] + candidate.personalityProfile[key]) / 2 - Math.abs(primary.personalityProfile[key] - candidate.personalityProfile[key]) }))
    .sort((left, right) => right.score - left.score).slice(0, 2).map((item) => dimensionLabels[item.key])
  const difference = DIMENSIONS.map((key) => ({ key, delta: candidate.personalityProfile[key] - primary.personalityProfile[key] }))
    .sort((left, right) => Math.abs(right.delta) - Math.abs(left.delta))[0]
  return `共同点：${shared.join('、')}接近。区别：${candidate.nameCn}的${dimensionLabels[difference.key]}${difference.delta >= 0 ? '更突出' : '更克制'}。`
}

function decorateSimilar(primary, items) {
  return items.map((item) => ({
    id: item.id,
    nameCn: item.nameCn,
    scientificName: item.scientificName,
    mediaId: item.mediaId,
    comparisonNote: comparisonNote(primary, item)
  }))
}

function decorateTopChoice(item, saved) {
  if (item.selectedOptionText) return item
  const question = questions.find((candidate) => candidate.id === item.questionId)
  const answerIndex = saved && Array.isArray(saved.answers) ? saved.answers[item.questionNumber - 1] : -1
  const selected = question && question.options[answerIndex]
  return Object.assign({}, item, {
    selectedOptionText: selected ? selected.text : '这道题的选择记录来自旧版本，请重新测试后查看完整原文。',
    insight: item.insight || (selected ? selected.insight : '')
  })
}

function wrapPosterText(context, value, maxWidth, maxLines) {
  const characters = Array.from(String(value || ''))
  const lines = []
  let line = ''
  characters.forEach((character) => {
    const candidate = `${line}${character}`
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line)
      line = character
    } else line = candidate
  })
  if (line) lines.push(line)
  if (lines.length > maxLines) {
    const clipped = lines.slice(0, maxLines)
    clipped[maxLines - 1] = `${clipped[maxLines - 1].replace(/[，。；、：,.!?！？]$/, '')}…`
    return clipped
  }
  return lines
}

function drawPosterLines(context, value, x, y, maxWidth, lineHeight, maxLines) {
  const lines = wrapPosterText(context, value, maxWidth, maxLines)
  lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight))
  return y + lines.length * lineHeight
}

Page({
  data: { primary: null, period: null, match: 0, showMatch: false, traits: [], dimensionGroups: [], profileBars: [], showFullProfile: false, similar: [], topChoices: [], impactSentence: '', evidence: [], evidenceSources: [], sharedMode: false, posterGenerating: false },

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
    const traits = (primary.resultStrengths || []).slice(0, 3).map((label, index) => ({ key: `strength-${index}`, label }))
    const similarCreatures = sharedMode || !Array.isArray(saved.similarIds) ? nearestCreatures(primary) : saved.similarIds.map(getCreatureById).filter(Boolean)
    const profile = sharedMode || !saved.profile ? primary.personalityProfile : saved.profile
    const profileBars = DIMENSIONS.map((key) => ({ key, label: dimensionLabels[key], value: Math.round(profile[key] * 100) })).sort((left, right) => right.value - left.value)
    const topChoices = sharedMode || !Array.isArray(saved.topContributingQuestions) ? [] : saved.topContributingQuestions.map((item) => decorateTopChoice(item, saved))
    const choiceNumbers = topChoices.map((item) => `第${item.questionNumber}题`)
    const knowledge = getCreatureKnowledge(primary.id)
    this.setData({
      primary,
      period: getPeriodById(primary.periodId),
      match: sharedMode ? 0 : entertainmentScore(saved.match),
      showMatch: !sharedMode,
      traits,
      dimensionGroups: dimensionGroups(profile),
      profileBars,
      similar: decorateSimilar(primary, similarCreatures),
      topChoices,
      impactSentence: choiceNumbers.length ? `下面是系统真正使用的选择证据：${choiceNumbers.join('、')}最能说明你为什么匹配到${primary.nameCn}。` : '',
      evidence: knowledge ? (knowledge.fossilEvidence || []).slice(0, 2) : [],
      evidenceSources: knowledge ? (knowledge.sources || []).slice(0, 3) : [],
      sharedMode
    })
  },

  toggleFullProfile() {
    this.setData({ showFullProfile: !this.data.showFullProfile })
  },

  openCreature(event) {
    const id = event.currentTarget.dataset.id
    if (id) navigateToPage(buildUrl('/pages/creature-detail/index', { id }), { toastTitle: '暂时无法打开古生物档案' })
  },

  openAtlas() { navigateToPage('/pages/creatures/index', { toastTitle: '暂时无法打开图鉴' }) },

  copySource(event) {
    const url = event.currentTarget.dataset.url
    if (url) wx.setClipboardData({ data: url })
  },

  generatePoster() {
    if (this.data.posterGenerating || !this.data.primary) return
    this.setData({ posterGenerating: true })
    wx.showLoading({ title: '正在生成海报', mask: true })
    const media = getMediaById(this.data.primary.mediaId)
    const urls = media ? [media.imageUrl, media.thumbnailUrl].filter((url, index, list) => url && list.indexOf(url) === index) : []
    this.loadPosterImage(urls, 0, (imagePath) => this.drawResultPoster(imagePath))
  },

  loadPosterImage(urls, index, complete) {
    if (index >= urls.length || !wx.getImageInfo) return complete('')
    wx.getImageInfo({
      src: urls[index],
      success: (result) => complete(result.path || urls[index]),
      fail: () => this.loadPosterImage(urls, index + 1, complete)
    })
  },

  drawResultPoster(imagePath) {
    const primary = this.data.primary
    const context = wx.createCanvasContext('resultPoster', this)
    const background = context.createLinearGradient(0, 0, 0, 1200)
    background.addColorStop(0, '#123239')
    background.addColorStop(0.48, '#07191f')
    background.addColorStop(1, '#061218')
    context.setFillStyle(background)
    context.fillRect(0, 0, 750, 1200)
    if (imagePath) {
      context.drawImage(imagePath, 0, 0, 750, 500)
      const veil = context.createLinearGradient(0, 180, 0, 520)
      veil.addColorStop(0, 'rgba(6,18,24,0.05)')
      veil.addColorStop(1, '#07191f')
      context.setFillStyle(veil)
      context.fillRect(0, 170, 750, 360)
    } else {
      context.setStrokeStyle('rgba(103,211,193,0.18)')
      context.setLineWidth(3)
      ;[110, 175, 240].forEach((radius) => {
        context.beginPath()
        context.arc(590, 180, radius, 0, Math.PI * 2)
        context.stroke()
      })
    }
    context.setFillStyle('#70d8c5')
    context.setFontSize(22)
    context.fillText('EARTH CHRONICLE · PALEO IDENTITY', 54, 64)
    context.setFillStyle('rgba(255,255,255,0.74)')
    context.setFontSize(24)
    context.fillText('我的远古身份', 54, 420)
    context.setFillStyle('#f3f6ef')
    context.setFontSize(76)
    context.fillText(primary.nameCn, 54, 505)
    context.setFillStyle('#e2bd78')
    context.setFontSize(30)
    context.fillText(primary.resultTitle, 56, 557)
    context.setFillStyle('#9db2b0')
    context.setFontSize(25)
    const nextY = drawPosterLines(context, primary.punchline, 56, 610, 638, 40, 3)
    context.setFillStyle('rgba(103,211,193,0.16)')
    context.fillRect(54, nextY + 24, 642, 2)
    context.setFillStyle('#72d4c2')
    context.setFontSize(20)
    context.fillText('三个核心能力', 56, nextY + 76)
    context.setFillStyle('#d9e4e1')
    context.setFontSize(26)
    let abilityY = nextY + 124
    ;(primary.resultStrengths || []).slice(0, 3).forEach((strength, index) => {
      context.setFillStyle('#d7b875')
      context.fillText(`0${index + 1}`, 58, abilityY)
      context.setFillStyle('#d9e4e1')
      abilityY = drawPosterLines(context, strength, 112, abilityY, 570, 38, 2) + 24
    })
    context.setFillStyle('rgba(255,255,255,0.055)')
    context.fillRect(54, 980, 642, 112)
    context.setFillStyle('#8ca19f')
    context.setFontSize(20)
    drawPosterLines(context, '本结果用于科普娱乐，不代表对已灭绝生物性格的科学测量。', 78, 1024, 594, 32, 2)
    context.setFillStyle('#6fd2c0')
    context.setFontSize(22)
    context.fillText('微信小程序 · 地球编年史', 54, 1150)
    context.draw(false, () => {
      wx.canvasToTempFilePath({
        canvasId: 'resultPoster',
        width: 750,
        height: 1200,
        destWidth: 1500,
        destHeight: 2400,
        fileType: 'jpg',
        quality: 0.92,
        success: (result) => {
          wx.hideLoading()
          this.setData({ posterGenerating: false })
          wx.previewImage({ current: result.tempFilePath, urls: [result.tempFilePath] })
        },
        fail: (error) => {
          console.error('[ResultPoster]', error)
          wx.hideLoading()
          this.setData({ posterGenerating: false })
          wx.showToast({ title: '海报生成失败，请重试', icon: 'none' })
        }
      }, this)
    })
  },

  retake() {
    requestQuizReset()
    switchTabPage('/pages/quiz/index', { throttle: false, toastTitle: '暂时无法重新测试' })
  },
  onShareAppMessage() {
    const primary = this.data.primary
    return { title: primary ? `我的远古身份是${primary.nameCn}｜你是哪一种？` : '测测你的远古身份', path: primary ? buildUrl('/pages/quiz-result/index', { id: primary.id }) : '/pages/quiz/index' }
  }
})
