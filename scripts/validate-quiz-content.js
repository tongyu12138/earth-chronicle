const fs = require('fs')
const path = require('path')
const { questions: identityQuestions } = require('../data/quiz')
const { quizProfiles } = require('../data/quiz-profiles')
const { questions: knowledgeQuestions, categories } = require('../data/knowledge-quiz')
const { sourceMap } = require('../data/creature-knowledge/sources')

const root = path.join(__dirname, '..')
const errors = []
const expectedChapters = { '第一章：环境判断': 5, '第二章：生存策略': 5, '第三章：群体与迁徙': 5 }
const expectedKnowledge = { '前寒武纪': 10, '古生代': 15, '中生代': 15, '新生代': 10, '人类演化与文明': 10 }

function fail(message) { errors.push(message) }
function textLength(value) { return String(value || '').replace(/\s+/g, '').length }
function uniqueCount(items) { return new Set(items).size }
function grams(value) {
  const text = String(value || '').replace(/[^\u4e00-\u9fa5A-Za-z0-9]/g, '')
  const result = new Set()
  for (let index = 0; index < text.length - 2; index += 1) result.add(text.slice(index, index + 3))
  return result
}
function similarity(left, right) {
  const a = grams(left)
  const b = grams(right)
  let intersection = 0
  for (const item of a) if (b.has(item)) intersection += 1
  return intersection / Math.max(1, a.size + b.size - intersection)
}
function validateSourceIds(owner, sourceIds) {
  if (!Array.isArray(sourceIds) || !sourceIds.length) return fail(`${owner} 缺少来源`)
  sourceIds.forEach((id) => { if (!sourceMap[id]) fail(`${owner} 使用不存在的来源ID：${id}`) })
}

if (identityQuestions.length !== 15) fail(`身份测试应为15题，当前${identityQuestions.length}题`)
if (uniqueCount(identityQuestions.map((item) => item.id)) !== identityQuestions.length) fail('身份题ID不唯一')
if (uniqueCount(identityQuestions.map((item) => item.scene)) !== identityQuestions.length) fail('身份题远古场景不唯一')
Object.keys(expectedChapters).forEach((chapter) => {
  const count = identityQuestions.filter((question) => question.chapter === chapter).length
  if (count !== expectedChapters[chapter]) fail(`${chapter} 应为${expectedChapters[chapter]}题，当前${count}题`)
})
identityQuestions.forEach((question, index) => {
  const owner = `身份题${index + 1}（${question.id}）`
  if (!Array.isArray(question.options) || question.options.length !== 4) fail(`${owner} 不是4个选项`)
  ;['chapter', 'periodId', 'sceneMediaId', 'scene', 'plainScience', 'scienceContext', 'question', 'afterAnswerFact'].forEach((field) => {
    if (!question[field]) fail(`${owner} 缺少 ${field}`)
  })
  if (textLength(question.question) > 30) fail(`${owner} 题干超过30字，不利于快速理解`)
  if (textLength(question.plainScience) > 75) fail(`${owner} 默认科普超过75字，应把专业细节移入展开区`)
  validateSourceIds(owner, question.sourceIds)
  question.options.forEach((option, optionIndex) => {
    if (!option.text || !option.insight || !option.scores || !Object.keys(option.scores).length) fail(`${owner} 选项${optionIndex + 1}结构不完整`)
    if (textLength(option.text) > 32) fail(`${owner} 选项${optionIndex + 1}超过32字`)
    if (/[+＋-]\s*\d/.test(option.text) || /适应力|计分|分数/.test(option.insight)) fail(`${owner} 选项${optionIndex + 1}泄漏内部计分`)
  })
})

if (quizProfiles.length !== 60) fail(`正式结果应为60种，当前${quizProfiles.length}种`)
const resultFields = ['paleoTypeCode', 'resultTitle', 'oneLineIdentity', 'userPattern', 'creatureStrategy', 'sharedMechanism', 'strengths', 'blindSpot', 'stressResponse', 'modernAnalogy', 'survivalLesson', 'ecosystemRoleSummary', 'evidenceBoundary', 'comparisonNotes', 'curationStatus']
quizProfiles.forEach((profile) => {
  resultFields.forEach((field) => { if (!profile[field] || (Array.isArray(profile[field]) && !profile[field].length)) fail(`${profile.id} 缺少 ${field}`) })
  if (profile.curationStatus !== 'manual') fail(`${profile.id} 不是人工策展结果`)
  if (!Array.isArray(profile.strengths) || profile.strengths.length !== 3) fail(`${profile.id} 核心能力不是3条`)
  if (!profile.comparisonNotes || !profile.comparisonNotes.shared || !profile.comparisonNotes.difference) fail(`${profile.id} 相近结果说明不完整`)
  const visibleResultCopy = [profile.resultTitle, profile.oneLineIdentity, profile.userPattern, profile.creatureStrategy, profile.sharedMechanism, ...profile.strengths, profile.blindSpot, profile.stressResponse, profile.modernAnalogy, profile.survivalLesson, profile.ecosystemRoleSummary, profile.evidenceBoundary].join(' ')
  if (/第二层调节|建立起点|需要转向时调用|决策空间|行动说明书|压力窗口|生态镜子|投入方式|三步节奏|这一侧的资源|最可迁移/.test(visibleResultCopy)) fail(`${profile.id} 仍包含内部模型或抽象模板语言`)
  if (!profile.matchExplanation || !Object.prototype.hasOwnProperty.call(profile.matchExplanation, 'userEvidence') || !profile.matchExplanation.creatureStrategy || !profile.matchExplanation.sharedMechanism || !profile.matchExplanation.evidenceBoundary) fail(`${profile.id} 匹配解释没有按新语义结构组织`)
})
if (uniqueCount(quizProfiles.map((item) => item.resultTitle)) !== 60) fail('60种 resultTitle 不是100%唯一')
if (uniqueCount(quizProfiles.map((item) => item.oneLineIdentity)) !== 60) fail('60种 oneLineIdentity 不是100%唯一')
if (uniqueCount(quizProfiles.map((item) => item.creatureStrategy)) !== 60) fail('60种 creatureStrategy 不是100%唯一')

let maxSummarySimilarity = { score: 0, left: '', right: '' }
for (let left = 0; left < quizProfiles.length; left += 1) {
  for (let right = left + 1; right < quizProfiles.length; right += 1) {
    const leftCopy = [quizProfiles[left].resultTitle, quizProfiles[left].oneLineIdentity, quizProfiles[left].userPattern, quizProfiles[left].creatureStrategy, quizProfiles[left].sharedMechanism].join('')
    const rightCopy = [quizProfiles[right].resultTitle, quizProfiles[right].oneLineIdentity, quizProfiles[right].userPattern, quizProfiles[right].creatureStrategy, quizProfiles[right].sharedMechanism].join('')
    const score = similarity(leftCopy, rightCopy)
    if (score > maxSummarySimilarity.score) maxSummarySimilarity = { score, left: quizProfiles[left].id, right: quizProfiles[right].id }
  }
}
if (maxSummarySimilarity.score > 0.45) fail(`结果摘要最高三字组相似度 ${(maxSummarySimilarity.score * 100).toFixed(1)}%，超过45%：${maxSummarySimilarity.left}/${maxSummarySimilarity.right}`)

if (knowledgeQuestions.length < 60) fail(`知识挑战至少60题，当前${knowledgeQuestions.length}题`)
categories.forEach((category) => {
  const count = knowledgeQuestions.filter((question) => question.category === category).length
  if (count !== expectedKnowledge[category]) fail(`${category}知识题应为${expectedKnowledge[category]}题，当前${count}题`)
})
if (uniqueCount(knowledgeQuestions.map((item) => item.id)) !== knowledgeQuestions.length) fail('知识题ID不唯一')
if (uniqueCount(knowledgeQuestions.map((item) => item.question)) !== knowledgeQuestions.length) fail('知识题题干不唯一')
knowledgeQuestions.forEach((question, index) => {
  const owner = `知识题${index + 1}（${question.id}）`
  if (!question.question || !Array.isArray(question.options) || question.options.length !== 4) fail(`${owner} 题干或选项不完整`)
  if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex > 3) fail(`${owner} correctIndex 不合法`)
  if (textLength(question.explanation) < 15) fail(`${owner} 解释过短`)
  if (!question.periodId || !['easy', 'medium', 'hard'].includes(question.difficulty)) fail(`${owner} 时期或难度不合法`)
  validateSourceIds(owner, question.sourceIds)
})

const visibleFiles = ['pages/quiz/index.wxml', 'pages/quiz-result/index.wxml', 'pages/knowledge-quiz/index.wxml']
visibleFiles.forEach((relative) => {
  const content = fs.readFileSync(path.join(root, relative), 'utf8').replace(/<[^>]+>/g, ' ')
  if (/适应力\s*[+＋-]\s*\d|内部计分|原始分数/.test(content)) fail(`${relative} 用户可见文字泄漏内部计分`)
})
const resultWxml = fs.readFileSync(path.join(root, 'pages/quiz-result/index.wxml'), 'utf8')
const resultJs = fs.readFileSync(path.join(root, 'pages/quiz-result/index.js'), 'utf8')
const quizWxml = fs.readFileSync(path.join(root, 'pages/quiz/index.wxml'), 'utf8')
const quizJs = fs.readFileSync(path.join(root, 'pages/quiz/index.js'), 'utf8')
if (!resultWxml.includes('SCIENCE PREVIEW') || !resultWxml.includes('evidenceSources')) fail('结果页缺少科学预览与来源区')
if (!resultWxml.includes('bindtap="generatePoster"') || !resultJs.includes('canvasToTempFilePath')) fail('结果页缺少可生成的分享海报')
if (!resultJs.includes('topContributingQuestions') || !resultJs.includes('dimensionGroups')) fail('结果页缺少关键选择或四组倾向解释')
if (!resultWxml.includes('selectedOptionText') || !resultWxml.includes('你的真实选择') || !resultWxml.includes('古生物真实策略') || !resultWxml.includes('可类比共同机制')) fail('结果页没有直接展示选择原文与方向匹配链')
if (!quizWxml.includes('plainScience') || !quizWxml.includes('showScienceDetail')) fail('身份题没有把通俗解释与专业说明分层')
if (!quizWxml.includes('continueAfterAnswer') || !quizJs.includes('continueAfterAnswer')) fail('答题解释仍缺少用户主动继续按钮')
const interactiveQuizJs = [
  quizJs,
  fs.readFileSync(path.join(root, 'pages/knowledge-quiz/index.js'), 'utf8'),
  fs.readFileSync(path.join(root, 'pages/creature-detail/index.js'), 'utf8')
].join('\n')
if (/vibrateShort/.test(interactiveQuizJs)) fail('答题流程仍包含无必要震动')

const chapterLines = Object.keys(expectedChapters).map((chapter) => `- ${chapter}：${identityQuestions.filter((question) => question.chapter === chapter).length}题`)
const categoryLines = categories.map((category) => `- ${category}：${knowledgeQuestions.filter((question) => question.category === category).length}题`)
const report = [
  '# 测试内容质量报告', '',
  `- 身份题：${identityQuestions.length}`, `- 正式结果：${quizProfiles.length}`, `- 知识挑战题：${knowledgeQuestions.length}`,
  `- 唯一结果标题：${uniqueCount(quizProfiles.map((item) => item.resultTitle))}`, `- 唯一一句话结果：${uniqueCount(quizProfiles.map((item) => item.oneLineIdentity))}`,
  `- 结果摘要最高三字组相似度：${(maxSummarySimilarity.score * 100).toFixed(1)}%（${maxSummarySimilarity.left} / ${maxSummarySimilarity.right}）`,
  `- 内容错误：${errors.length}`, '', '## 身份测试章节', '', ...chapterLines,
  '', '## 知识挑战分布', '', ...categoryLines,
  '', '## 结果解释能力', '',
  '- 每次结果保存 selectedInsights、topContributingQuestions 与 dimensionContributions。',
  '- 用户界面只展示自然语言解释，不显示选项内部计分值。',
  '- 默认展示四组生存倾向，完整14维需用户主动展开。',
  '', '## 错误', '', errors.length ? errors.map((item) => `- ${item}`).join('\n') : '- 无'
].join('\n')
fs.writeFileSync(path.join(root, 'reports/quiz-content-quality.md'), `${report}\n`)

console.log(`Identity questions ${identityQuestions.length}; chapters ${Object.values(expectedChapters).join('/')}`)
console.log(`Results ${quizProfiles.length}; unique titles ${uniqueCount(quizProfiles.map((item) => item.resultTitle))}; max summary similarity ${(maxSummarySimilarity.score * 100).toFixed(1)}%`)
console.log(`Knowledge questions ${knowledgeQuestions.length}; distribution ${categories.map((category) => knowledgeQuestions.filter((item) => item.category === category).length).join('/')}`)
if (errors.length) {
  console.error(errors.map((item) => `- ${item}`).join('\n'))
  process.exit(1)
}
console.log('Quiz content validation passed')
