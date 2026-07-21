const { DIMENSIONS } = require('../data/quiz-profiles')
const { questions, dimensionLabels } = require('../data/quiz')
const { calculatePaleoCode } = require('./paleo-type-engine')

const weights = {
  curiosity: 1.1, boldness: 1, sociability: 1, patience: 1, adaptability: 1.15, strategy: 1.15,
  speed: 0.9, defense: 0.95, independence: 0.9, sizePreference: 0.75, aquaticAffinity: 0.8,
  terrestrialAffinity: 0.8, aerialAffinity: 0.8, coldAffinity: 0.75
}

function getBounds() {
  const min = {}
  const max = {}
  DIMENSIONS.forEach((dimension) => {
    min[dimension] = 0
    max[dimension] = 0
  })
  questions.forEach((question) => {
    DIMENSIONS.forEach((dimension) => {
      const values = question.options.map((item) => item.scores[dimension] || 0)
      min[dimension] += Math.min.apply(null, values)
      max[dimension] += Math.max.apply(null, values)
    })
  })
  return { min, max }
}

const bounds = getBounds()

function getMoments() {
  const mean = {}
  const variance = {}
  DIMENSIONS.forEach((dimension) => {
    mean[dimension] = 0
    variance[dimension] = 0
  })
  questions.forEach((question) => {
    DIMENSIONS.forEach((dimension) => {
      const values = question.options.map((item) => item.scores[dimension] || 0)
      const localMean = values.reduce((sum, value) => sum + value, 0) / values.length
      const localVariance = values.reduce((sum, value) => sum + Math.pow(value - localMean, 2), 0) / values.length
      mean[dimension] += localMean
      variance[dimension] += localVariance
    })
  })
  return { mean, variance }
}

const moments = getMoments()

function validateAnswers(answers) {
  return Array.isArray(answers) && answers.length === questions.length && answers.every((answer, index) => {
    return Number.isInteger(answer) && answer >= 0 && answer < questions[index].options.length
  })
}

function scoreAnswers(answers) {
  const raw = {}
  DIMENSIONS.forEach((dimension) => { raw[dimension] = 0 })
  answers.forEach((answerIndex, questionIndex) => {
    const selected = questions[questionIndex] && questions[questionIndex].options[answerIndex]
    if (!selected) return
    Object.keys(selected.scores).forEach((dimension) => {
      if (raw[dimension] !== undefined) raw[dimension] += selected.scores[dimension]
    })
  })

  const normalized = {}
  DIMENSIONS.forEach((dimension) => {
    const standardDeviation = Math.sqrt(moments.variance[dimension])
    const value = standardDeviation ? 0.5 + (raw[dimension] - moments.mean[dimension]) / (4 * standardDeviation) : 0.5
    normalized[dimension] = Math.max(0, Math.min(1, value))
  })
  return { raw, normalized }
}

function similarity(userProfile, creatureProfile) {
  let distance = 0
  let totalWeight = 0
  DIMENSIONS.forEach((dimension) => {
    const weight = weights[dimension] || 1
    const delta = userProfile[dimension] - creatureProfile[dimension]
    distance += weight * delta * delta
    totalWeight += weight
  })
  return Math.max(0, 1 - Math.sqrt(distance / totalWeight))
}

function rankCreatures(answers, creatures) {
  if (!validateAnswers(answers)) throw new Error('Quiz answers are incomplete or invalid')
  const scored = scoreAnswers(answers)
  const allEligible = creatures.filter((creature) => creature.quizEligible && creature.personalityProfile)
  const paleoTypeCode = calculatePaleoCode(scored.normalized)
  const matchingType = allEligible.filter((creature) => creature.paleoTypeCode === paleoTypeCode)
  const eligible = matchingType.length ? matchingType : allEligible
  if (!eligible.length) throw new Error('No quiz-eligible profiles are available')
  const ranked = eligible.map((creature) => ({
    creature,
    similarity: similarity(scored.normalized, creature.personalityProfile)
  })).sort((left, right) => {
    if (right.similarity !== left.similarity) return right.similarity - left.similarity
    return left.creature.id.localeCompare(right.creature.id)
  })
  return { profile: scored.normalized, raw: scored.raw, paleoTypeCode, ranked }
}

function topTraits(profile, creatureProfile) {
  return DIMENSIONS.map((dimension) => ({
    key: dimension,
    label: dimensionLabels[dimension],
    closeness: 1 - Math.abs(profile[dimension] - creatureProfile[dimension]),
    value: profile[dimension]
  })).sort((left, right) => right.closeness - left.closeness).slice(0, 3)
}

function answerNarrative(answers) {
  const selectedInsights = []
  const dimensionContributions = []
  answers.forEach((answerIndex, questionIndex) => {
    const question = questions[questionIndex]
    const selected = question && question.options[answerIndex]
    if (!selected) return
    const contributions = Object.keys(selected.scores).filter((key) => DIMENSIONS.includes(key)).map((key) => ({
      key,
      label: dimensionLabels[key],
      value: selected.scores[key]
    }))
    const magnitude = contributions.reduce((sum, item) => sum + Math.abs(item.value) * (weights[item.key] || 1), 0)
    selectedInsights.push({
      questionId: question.id,
      questionNumber: questionIndex + 1,
      chapter: question.chapter,
      scene: question.scene,
      question: question.question,
      selectedOptionText: selected.text,
      insight: selected.insight
    })
    dimensionContributions.push({ questionId: question.id, questionNumber: questionIndex + 1, magnitude, contributions })
  })
  const topContributingQuestions = dimensionContributions.slice().sort((left, right) => {
    if (right.magnitude !== left.magnitude) return right.magnitude - left.magnitude
    return left.questionNumber - right.questionNumber
  }).slice(0, 3).map((item) => {
    const insight = selectedInsights.find((candidate) => candidate.questionId === item.questionId)
    return Object.assign({}, insight, { dimensionLabels: item.contributions.slice().sort((left, right) => Math.abs(right.value) - Math.abs(left.value)).slice(0, 2).map((part) => part.label) })
  })
  return { selectedInsights, dimensionContributions, topContributingQuestions }
}

function buildResult(answers, creatures) {
  const result = rankCreatures(answers, creatures)
  const top = result.ranked.slice(0, 3)
  const primary = top[0]
  const narrative = answerNarrative(answers)
  return {
    answers: answers.slice(),
    profile: result.profile,
    paleoTypeCode: result.paleoTypeCode,
    primaryId: primary.creature.id,
    similarIds: top.slice(1).map((item) => item.creature.id),
    match: Math.min(98, Math.round(55 + primary.similarity * 43)),
    traits: topTraits(result.profile, primary.creature.personalityProfile),
    selectedInsights: narrative.selectedInsights,
    topContributingQuestions: narrative.topContributingQuestions,
    dimensionContributions: narrative.dimensionContributions,
    createdAt: Date.now()
  }
}

function validateQuizData(creatures) {
  const problems = []
  if (questions.length !== 15) problems.push(`Expected 15 questions, received ${questions.length}`)
  questions.forEach((question, index) => {
    if (question.options.length !== 4) problems.push(`Question ${index + 1} does not have 4 options`)
  })
  creatures.filter((creature) => creature.quizEligible).forEach((creature) => {
    DIMENSIONS.forEach((dimension) => {
      if (typeof creature.personalityProfile[dimension] !== 'number') problems.push(`${creature.id} missing ${dimension}`)
    })
  })
  return problems
}

module.exports = { weights, bounds, moments, validateAnswers, scoreAnswers, similarity, rankCreatures, buildResult, answerNarrative, validateQuizData }
