const { creatures } = require('../data/creatures')
const { questions } = require('../data/quiz')
const { rankCreatures, validateQuizData } = require('../utils/quiz-engine')

const sampleSize = process.argv.includes('--large') ? 100000 : 5000
let seed = 20260718
const counts = {}

function randomOption() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  return seed >>> 30
}

for (let sample = 0; sample < sampleSize; sample += 1) {
  const answers = questions.map(randomOption)
  const winner = rankCreatures(answers, creatures).ranked[0].creature.id
  counts[winner] = (counts[winner] || 0) + 1
}

const rows = Object.keys(counts).map((id) => ({ id, count: counts[id] })).sort((left, right) => right.count - left.count)
const missing = creatures.filter((creature) => !counts[creature.id]).map((creature) => creature.id)
const maximum = rows[0]
const problems = validateQuizData(creatures)
const deterministicAnswers = questions.map((question, index) => (index * 3) % question.options.length)
const deterministicFirst = rankCreatures(deterministicAnswers, creatures).ranked[0].creature.id
const deterministicSecond = rankCreatures(deterministicAnswers, creatures).ranked[0].creature.id
if (deterministicFirst !== deterministicSecond) problems.push('Identical answers produced different results')

console.log(`Questions: ${questions.length}; options per question: ${questions.map((q) => q.options.length).join(',')}`)
console.log(`Creatures: ${creatures.length}; simulated answers: ${sampleSize}`)
console.log(`Observed first-place results: ${rows.length}; unobserved: ${missing.length}`)
console.log(`Largest share: ${maximum.id} ${maximum.count}/${sampleSize} (${(maximum.count / sampleSize * 100).toFixed(2)}%)`)
console.log(`Determinism check: ${deterministicFirst} === ${deterministicSecond}`)
console.log(`Top 10: ${rows.slice(0, 10).map((row) => `${row.id}:${row.count}`).join(', ')}`)
if (missing.length) console.log(`Unobserved IDs: ${missing.join(', ')}`)
if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
if (rows.length < 48 || maximum.count / sampleSize > 0.1) {
  console.error('Distribution acceptance target failed')
  process.exit(1)
}
console.log('Quiz distribution acceptance target passed')
