const fs = require('fs')
const path = require('path')
const { creatures } = require('../data/creatures')
const { quizProfiles, DIMENSIONS } = require('../data/quiz-profiles')
const { questions } = require('../data/quiz')
const { rankCreatures, similarity, validateQuizData } = require('../utils/quiz-engine')

const sampleSize = process.argv.includes('--large') ? 100000 : 5000
let seed = 20260718
const counts = {}
const problems = validateQuizData(creatures)

function randomOption() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  return seed >>> 30
}

quizProfiles.forEach((profile) => {
  if (!profile.quizEligible) problems.push(`${profile.id} must be quizEligible`)
  DIMENSIONS.forEach((dimension) => {
    const value = profile.personalityProfile && profile.personalityProfile[dimension]
    if (typeof value !== 'number' || value < 0 || value > 1) problems.push(`${profile.id} has invalid ${dimension}`)
  })
  if (!Array.isArray(profile.matchReasons) || profile.matchReasons.length < 2) problems.push(`${profile.id} missing matchReasons`)
  if (!profile.resultSummary) problems.push(`${profile.id} missing resultSummary`)
  if (!Array.isArray(profile.resultStrengths) || profile.resultStrengths.length < 2) problems.push(`${profile.id} missing resultStrengths`)
  if (!profile.resultCaution) problems.push(`${profile.id} missing resultCaution`)
})

const eligibleIds = new Set(quizProfiles.map((profile) => profile.id))
creatures.forEach((creature) => {
  if (Boolean(creature.quizEligible) !== eligibleIds.has(creature.id)) problems.push(`${creature.id} quizEligible does not match quiz profile registry`)
})
if (quizProfiles.length < 55 || quizProfiles.length > 65) problems.push(`Expected about 60 formal results, received ${quizProfiles.length}`)

for (let sample = 0; sample < sampleSize; sample += 1) {
  const answers = questions.map(randomOption)
  const winner = rankCreatures(answers, quizProfiles).ranked[0].creature.id
  counts[winner] = (counts[winner] || 0) + 1
}

const rows = Object.keys(counts).map((id) => ({ id, count: counts[id] })).sort((left, right) => right.count - left.count)
const missing = quizProfiles.filter((profile) => !counts[profile.id]).map((profile) => profile.id)
const maximum = rows[0]
const deterministicAnswers = questions.map((question, index) => (index * 3) % question.options.length)
const deterministicFirst = rankCreatures(deterministicAnswers, quizProfiles).ranked[0].creature.id
const deterministicSecond = rankCreatures(deterministicAnswers, quizProfiles).ranked[0].creature.id
if (deterministicFirst !== deterministicSecond) problems.push('Identical answers produced different results')

const eligibleCreatures = creatures.filter((creature) => creature.quizEligible)
const coverage = {
  environment: {
    ocean: eligibleCreatures.some((item) => /海|水|湖|河|潮|湿地/.test(item.habitat)),
    land: eligibleCreatures.some((item) => /陆|森林|草原|地面|林地/.test(item.habitat)),
    air: eligibleCreatures.some((item) => /空|飞/.test(`${item.habitat}${item.survivalStrategy}`)),
    cold: eligibleCreatures.some((item) => /寒|冰/.test(`${item.habitat}${item.survivalStrategy}`))
  },
  group: {
    microorganisms: eligibleCreatures.some((item) => /微生物|细菌|古菌/.test(item.group)),
    invertebrates: eligibleCreatures.some((item) => /节肢|三叶|叶足|头足|多足/.test(item.group)),
    fish: eligibleCreatures.some((item) => /鱼|鲨|盾皮/.test(item.group)),
    synapsids: eligibleCreatures.some((item) => /合弓/.test(item.group)),
    dinosaurs: eligibleCreatures.some((item) => /恐龙/.test(item.group)),
    pterosaurs: eligibleCreatures.some((item) => /翼龙/.test(item.group)),
    marineReptiles: eligibleCreatures.some((item) => /海生爬行|鱼龙|上龙|有鳞类海生/.test(item.group)),
    mammals: eligibleCreatures.some((item) => /哺乳|鲸|犀类|犬科|猫科|人族/.test(item.group))
  },
  era: {
    precambrian: eligibleCreatures.some((item) => ['archean', 'proterozoic'].includes(item.periodId)),
    paleozoic: eligibleCreatures.some((item) => ['cambrian', 'ordovician', 'silurian', 'devonian', 'carboniferous', 'permian'].includes(item.periodId)),
    mesozoic: eligibleCreatures.some((item) => ['triassic', 'jurassic', 'cretaceous'].includes(item.periodId)),
    cenozoic: eligibleCreatures.some((item) => ['paleocene', 'eocene', 'oligocene', 'miocene', 'pliocene', 'pleistocene', 'holocene'].includes(item.periodId))
  }
}
Object.keys(coverage).forEach((section) => Object.keys(coverage[section]).forEach((key) => {
  if (!coverage[section][key]) problems.push(`Coverage missing: ${section}.${key}`)
}))

let stableSame = 0
let stableSimilarity = 0
let illogicalJumps = 0
const stabilitySamples = 1200
for (let index = 0; index < stabilitySamples; index += 1) {
  const answers = questions.map(randomOption)
  const adjusted = answers.slice()
  const questionIndex = index % questions.length
  adjusted[questionIndex] = (adjusted[questionIndex] + 1 + (index % 3)) % questions[questionIndex].options.length
  const first = rankCreatures(answers, quizProfiles).ranked[0].creature
  const second = rankCreatures(adjusted, quizProfiles).ranked[0].creature
  const nearby = similarity(first.personalityProfile, second.personalityProfile)
  if (first.id === second.id) stableSame += 1
  stableSimilarity += nearby
  if (nearby < 0.58) illogicalJumps += 1
}
const averageNeighborSimilarity = stableSimilarity / stabilitySamples
if (averageNeighborSimilarity < 0.82 || illogicalJumps / stabilitySamples > 0.02) problems.push('One-answer stability target failed')

const profileSource = fs.readFileSync(path.resolve(__dirname, '../data/quiz-profiles.js'), 'utf8')
const creatureSource = fs.readFileSync(path.resolve(__dirname, '../data/creatures.js'), 'utf8')
if (/hashUnit|Math\.random/.test(profileSource)) problems.push('quiz-profiles.js must not generate profiles from hashes or randomness')
if (/personalityProfile\s*=\s*buildProfile/.test(creatureSource)) problems.push('creatures.js still generates personality profiles automatically')

if (rows.length < 48) problems.push(`Only ${rows.length} profiles became first place; expected at least 48`)
if (maximum && maximum.count / sampleSize > 0.1) problems.push(`${maximum.id} exceeds the 10% dominance threshold`)

const reportRows = quizProfiles.map((profile) => {
  const count = counts[profile.id] || 0
  const creature = creatures.find((item) => item.id === profile.id)
  return `| ${profile.nameCn} | \`${profile.id}\` | ${creature ? creature.periodId : 'unknown'} | ${profile.archetype} | ${count} | ${(count / sampleSize * 100).toFixed(2)}% |`
})
const report = `# 古生物测试分布报告\n\n` +
  `- 固定种子：20260718\n- 模拟答案：${sampleSize} 组\n- 正式结果：${quizProfiles.length} 种\n- 成为第一名：${rows.length} 种\n- 最大单项占比：${maximum ? `${maximum.id} ${(maximum.count / sampleSize * 100).toFixed(2)}%` : '无'}\n` +
  `- 单题变化后结果不变：${(stableSame / stabilitySamples * 100).toFixed(2)}%\n- 单题变化前后结果平均画像相似度：${(averageNeighborSimilarity * 100).toFixed(2)}%\n- 明显跨越（相似度低于58%）：${illogicalJumps}/${stabilitySamples}\n\n` +
  `画像由人工选择的生态原型与题库样本簇共同校准。ID 哈希不参与正式画像；流行度不参与权重。该模型用于科普娱乐，不是对已灭绝动物心理的科学测量。\n\n` +
  `| 结果 | ID | 首要时期 | 原型 | 出现次数 | 占比 |\n| --- | --- | --- | --- | ---: | ---: |\n${reportRows.join('\n')}\n`
const reportDir = path.resolve(__dirname, '../reports')
fs.mkdirSync(reportDir, { recursive: true })
fs.writeFileSync(path.join(reportDir, 'quiz-distribution.md'), report)

console.log(`Questions: ${questions.length}; options per question: ${questions.map((q) => q.options.length).join(',')}`)
console.log(`Formal results: ${quizProfiles.length}; simulated answers: ${sampleSize}`)
console.log(`Observed first-place results: ${rows.length}; unobserved eligible: ${missing.length}`)
console.log(`Largest share: ${maximum.id} ${maximum.count}/${sampleSize} (${(maximum.count / sampleSize * 100).toFixed(2)}%)`)
console.log(`Determinism check: ${deterministicFirst} === ${deterministicSecond}`)
console.log(`One-answer stability: same ${(stableSame / stabilitySamples * 100).toFixed(2)}%; average similarity ${(averageNeighborSimilarity * 100).toFixed(2)}%; illogical jumps ${illogicalJumps}`)
console.log(`Coverage checks: ${JSON.stringify(coverage)}`)
console.log(`Report: reports/quiz-distribution.md`)
if (missing.length) console.log(`Unobserved eligible IDs: ${missing.join(', ')}`)
if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log('Quiz distribution acceptance target passed')
