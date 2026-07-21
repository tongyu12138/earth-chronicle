const { creatures, getCreatureById } = require('../../data/creatures')
const { DIMENSIONS } = require('../../data/quiz-profiles')
const { getPaleoType } = require('../../data/paleo-types')
const { getPeriodById } = require('../../data/periods')
const { getCreatureKnowledge } = require('../../data/creature-knowledge/index')
const { getMediaById } = require('../../data/media-catalog')
const { dimensionLabels, questions } = require('../../data/quiz')
const { similarity } = require('../../utils/quiz-engine')
const { calculatePaleoCode } = require('../../utils/paleo-type-engine')
const { getQuizResult, requestQuizReset } = require('../../utils/storage')
const { buildUrl, navigateToPage, reLaunchPage, switchTabPage } = require('../../utils/router')

function entertainmentScore(value) {
  const score = Math.round(Number(value))
  return Number.isFinite(score) ? Math.max(0, Math.min(100, score)) : 0
}

function matchLevel(score) {
  if (score >= 91) return { label: '核心匹配', note: '多组选择与这条生存路线接近' }
  if (score >= 82) return { label: '高相似', note: '关键选择与这条生存路线接近' }
  return { label: '中等相似', note: '部分选择与这条生存路线接近' }
}

function nearestCreatures(creature) {
  return creatures
    .filter((item) => item.quizEligible && item.personalityProfile && item.id !== creature.id)
    .map((item) => ({ item, score: similarity(creature.personalityProfile, item.personalityProfile) }))
    .sort((left, right) => right.score - left.score || left.item.id.localeCompare(right.item.id))
    .slice(0, 2)
    .map((entry) => entry.item)
}

const DIMENSION_GROUPS = [
  { key: 'exploration', label: '探索方式', dimensions: ['curiosity', 'strategy', 'speed', 'independence'] },
  { key: 'risk', label: '风险策略', dimensions: ['boldness', 'patience', 'adaptability', 'defense'] },
  { key: 'social', label: '协作方式', dimensions: ['sociability', 'independence'] },
  { key: 'environment', label: '环境亲和', dimensions: ['aquaticAffinity', 'terrestrialAffinity', 'aerialAffinity', 'coldAffinity'] }
]

function dimensionGroups(profile) {
  return DIMENSION_GROUPS.map((group) => {
    const value = Math.round(group.dimensions.reduce((sum, key) => sum + Number(profile[key] || 0), 0) / group.dimensions.length * 100)
    const strongest = group.dimensions.slice().sort((left, right) => Number(profile[right] || 0) - Number(profile[left] || 0))[0]
    return { key: group.key, label: group.label, value, note: dimensionLabels[strongest] }
  })
}

function strongestSharedDimensions(primary, candidate) {
  return DIMENSIONS.map((key) => ({
    key,
    score: (primary.personalityProfile[key] + candidate.personalityProfile[key]) / 2 - Math.abs(primary.personalityProfile[key] - candidate.personalityProfile[key])
  })).sort((left, right) => right.score - left.score).slice(0, 2)
}

function biggestDifference(primary, candidate) {
  return DIMENSIONS.map((key) => ({ key, delta: candidate.personalityProfile[key] - primary.personalityProfile[key] }))
    .sort((left, right) => Math.abs(right.delta) - Math.abs(left.delta))[0]
}

function decorateSimilar(primary, items) {
  return items.map((item) => {
    const shared = strongestSharedDimensions(primary, item).map((part) => dimensionLabels[part.key]).join('、')
    const difference = biggestDifference(primary, item)
    const typeCode = item.paleoTypeCode || calculatePaleoCode(item.personalityProfile)
    return {
      id: item.id,
      nameCn: item.nameCn,
      mediaId: item.mediaId,
      typeCode,
      shared: `共同：${shared}`,
      difference: `区别：${item.nameCn}${dimensionLabels[difference.key]}${difference.delta >= 0 ? '更突出' : '更克制'}`
    }
  })
}

function decorateTopChoice(item, saved) {
  if (item.selectedOptionText) return item
  const question = questions.find((candidate) => candidate.id === item.questionId)
  const answerIndex = saved && Array.isArray(saved.answers) ? saved.answers[item.questionNumber - 1] : -1
  const selected = question && question.options[answerIndex]
  return Object.assign({}, item, {
    selectedOptionText: selected ? selected.text : '旧版本未保存这道题的选择原文',
    insight: item.insight || (selected ? selected.insight : '')
  })
}

function userEvidence(topChoices, sharedMode) {
  if (sharedMode) return '好友分享卡不会携带答题记录。完成测试后，这里会列出真正影响结果的题号和选择原文。'
  if (!topChoices.length) return '当前记录来自旧版本。重新完成测试后，这里会显示真实题号和选择原文。'
  return topChoices.slice(0, 3).map((item) => `第${item.questionNumber}题“${item.selectedOptionText}”`).join('；')
}

function legacyStrategy(primary) {
  return primary.survivalStrategy || primary.ecosystemJob || '现有资料尚不足以概括这条生存策略。'
}

function resultExplanation(primary, topChoices, sharedMode) {
  const curated = primary.matchExplanation || {}
  return {
    userEvidence: userEvidence(topChoices, sharedMode),
    creatureStrategy: curated.creatureStrategy || primary.creatureStrategy || legacyStrategy(primary),
    sharedMechanism: curated.sharedMechanism || primary.sharedMechanism || '这里比较的是可观察的做法，不是给古生物测量人的性格。',
    evidenceBoundary: curated.evidenceBoundary || primary.evidenceBoundary || primary.discovery
  }
}

function resultType(primary) {
  const code = primary.paleoTypeCode || calculatePaleoCode(primary.personalityProfile)
  return getPaleoType(code) || getPaleoType('OPSG')
}

function identityStyle(type) {
  return `background:linear-gradient(145deg,${type.softColor} 0%,${type.color} 180%);color:${type.foreground};border-color:${type.color}`
}

function scientificPreview(primary, knowledge, explanation) {
  const evidence = knowledge && knowledge.fossilEvidence && knowledge.fossilEvidence[0]
  const debate = knowledge && knowledge.debates && knowledge.debates[0]
  return {
    ecology: primary.ecosystemRoleSummary || (knowledge && knowledge.ecosystemRole) || primary.survivalStrategy,
    evidence: evidence ? `${evidence.evidenceType}：${evidence.whatItShows}` : '当前档案正在补充可直接核查的证据卡。',
    uncertainty: debate ? `${debate.question} ${debate.confidence}` : explanation.evidenceBoundary
  }
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
  data: {
    primary: null,
    paleoType: null,
    identityStyle: '',
    period: null,
    match: 0,
    matchLevel: null,
    showMatch: false,
    quadrants: [],
    explanation: null,
    sciencePreview: null,
    dimensionGroups: [],
    showCalculation: false,
    similar: [],
    topChoices: [],
    evidenceSources: [],
    sharedMode: false,
    posterGenerating: false
  },

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
    const similarCreatures = sharedMode || !Array.isArray(saved.similarIds)
      ? nearestCreatures(primary)
      : saved.similarIds.map(getCreatureById).filter(Boolean)
    const profile = sharedMode || !saved.profile ? primary.personalityProfile : saved.profile
    const topChoices = sharedMode || !Array.isArray(saved.topContributingQuestions)
      ? []
      : saved.topContributingQuestions.map((item) => decorateTopChoice(item, saved))
    const knowledge = getCreatureKnowledge(primary.id)
    const type = resultType(primary)
    const explanation = resultExplanation(primary, topChoices, sharedMode)
    const score = sharedMode ? 0 : entertainmentScore(saved.match)
    const strengths = primary.strengths || primary.resultStrengths || type.strengths

    this.setData({
      primary,
      paleoType: type,
      identityStyle: identityStyle(type),
      period: getPeriodById(primary.periodId),
      match: score,
      matchLevel: sharedMode ? { label: '分享结果', note: '完成测试可获得自己的匹配等级' } : matchLevel(score),
      showMatch: !sharedMode,
      quadrants: [
        { key: 'you', title: '你通常怎么做', text: primary.userPattern || '先从真实选择判断自己的行动习惯。' },
        { key: 'creature', title: '它真实怎么活', text: explanation.creatureStrategy },
        { key: 'strength', title: '你的优势', text: strengths.slice(0, 2).join('，') },
        { key: 'blind', title: '容易卡住的地方', text: primary.blindSpot || primary.resultCaution || type.blindSpot }
      ],
      explanation,
      sciencePreview: scientificPreview(primary, knowledge, explanation),
      dimensionGroups: dimensionGroups(profile),
      similar: decorateSimilar(primary, similarCreatures),
      topChoices,
      evidenceSources: knowledge ? (knowledge.sources || []).slice(0, 3) : [],
      sharedMode
    })
  },

  toggleCalculation() {
    this.setData({ showCalculation: !this.data.showCalculation })
  },

  openCreature(event) {
    const id = event.currentTarget.dataset.id
    if (id) navigateToPage(buildUrl('/pages/creature-detail/index', { id }), { toastTitle: '暂时无法打开古生物档案' })
  },

  openAtlas() {
    navigateToPage('/pages/creatures/index', { toastTitle: '暂时无法打开图鉴' })
  },

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
    const type = this.data.paleoType
    const context = wx.createCanvasContext('resultPoster', this)
    context.setFillStyle(type.softColor)
    context.fillRect(0, 0, 750, 1200)
    context.setFillStyle(type.color)
    context.fillRect(0, 0, 750, 26)
    context.setFillStyle(type.foreground)
    context.setFontSize(22)
    context.fillText('地球编年史 · 我的远古身份', 54, 74)
    context.setFontSize(90)
    context.fillText(type.code, 52, 178)
    context.setFontSize(38)
    context.fillText(type.nameCn, 56, 232)

    context.save()
    context.beginPath()
    context.arc(375, 480, 206, 0, Math.PI * 2)
    context.clip()
    if (imagePath) context.drawImage(imagePath, 130, 274, 490, 412)
    else {
      context.setFillStyle(type.color)
      context.fillRect(130, 274, 490, 412)
    }
    context.restore()
    context.setStrokeStyle(type.color)
    context.setLineWidth(10)
    context.beginPath()
    context.arc(375, 480, 211, 0, Math.PI * 2)
    context.stroke()

    context.setFillStyle(type.foreground)
    context.setTextAlign('center')
    context.setFontSize(54)
    context.fillText(primary.nameCn, 375, 744)
    context.setFontSize(26)
    const lineEnd = drawPosterLines(context, primary.oneLineIdentity || primary.punchline, 375, 792, 600, 38, 2)

    context.setTextAlign('left')
    const labels = type.axisLabels.slice(0, 4)
    labels.forEach((label, index) => {
      const column = index % 2
      const row = Math.floor(index / 2)
      const x = 54 + column * 328
      const y = lineEnd + 42 + row * 78
      context.setFillStyle('rgba(255,255,255,0.62)')
      context.fillRect(x, y, 300, 56)
      context.setFillStyle(type.foreground)
      context.setFontSize(23)
      context.fillText(`${index + 1}  ${label}`, x + 18, y + 36)
    })

    context.setFillStyle(type.foreground)
    context.setFontSize(19)
    drawPosterLines(context, '科普娱乐分类，不代表对已灭绝生物心理的科学测量。', 56, 1110, 638, 30, 2)
    context.setFontSize(21)
    context.fillText('微信小程序 · 地球编年史', 56, 1170)
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
    const type = this.data.paleoType
    return {
      title: primary ? `我的远古身份是${type.code}·${type.nameCn}｜${primary.nameCn}` : '测测你的远古身份',
      path: primary ? buildUrl('/pages/quiz-result/index', { id: primary.id }) : '/pages/quiz/index'
    }
  }
})
