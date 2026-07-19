const fs = require('fs')
const path = require('path')
const { creatures } = require('../data/creatures')
const { entries, sources, sourceMap } = require('../data/creature-knowledge/index')

const root = path.join(__dirname, '..')
const sampleIds = ['methanogen', 'dickinsonia', 'anomalocaris', 'dunkleosteus', 'lystrosaurus', 'archaeopteryx', 'tyrannosaurus', 'basilosaurus', 'woolly-mammoth', 'australopithecus']
const sampleMode = process.argv.includes('--sample')
const errors = []
const warnings = []
const knowledgeMap = entries.reduce((map, entry) => { map[entry.id] = entry; return map }, {})
const targets = sampleMode ? creatures.filter((item) => sampleIds.includes(item.id)) : creatures
const uiFiles = ['pages/creature-detail/index.wxml', 'pages/quiz-result/index.wxml', 'pages/quiz/index.wxml']

function fail(id, message) { errors.push(`${id}: ${message}`) }
function textLength(value) { return String(value || '').replace(/\s+/g, '').length }
function listLength(value) { return Array.isArray(value) ? value.length : 0 }
function hasUncertainty(entry) {
  return Boolean((entry.time && entry.time.precisionNote) || (entry.scale && entry.scale.uncertainty) || listLength(entry.debates))
}

for (const creature of targets) {
  const entry = knowledgeMap[creature.id]
  if (!entry) { fail(creature.id, '缺少知识数据'); continue }
  const isA = creature.quizEligible
  const minSources = isA ? 3 : 2
  const minFunctions = isA ? 4 : 3
  if (!['species', 'genus', 'clade', 'community', 'functional-group'].includes(entry.entryType)) fail(entry.id, 'entryType 不合法')
  const scientificWords = String(creature.scientificName || '').trim().split(/\s+/)
  const usesBinomialSpeciesName = scientificWords.length === 2 && /^[A-Z]/.test(scientificWords[0]) && /^[a-z]/.test(scientificWords[1])
  if (usesBinomialSpeciesName && !['community', 'functional-group'].includes(entry.entryType) && entry.entryType !== 'species') fail(entry.id, `双名法名称 ${creature.scientificName} 应标记为 species，而不是 ${entry.entryType}`)
  if (textLength(entry.quickSummary) < 80 || (isA && textLength(entry.quickSummary) > 140)) fail(entry.id, `quickSummary 长度 ${textLength(entry.quickSummary)}，A类应为80—140字`)
  if (textLength(entry.whyItMatters) < 80 || (isA && textLength(entry.whyItMatters) > 180)) fail(entry.id, `whyItMatters 长度 ${textLength(entry.whyItMatters)}，A类应为80—180字`)
  if (Object.keys(entry.lifeFunctions || {}).filter((key) => entry.lifeFunctions[key]).length < minFunctions) fail(entry.id, `lifeFunctions 少于 ${minFunctions} 项`)
  if (listLength(entry.anatomyHighlights) < (isA ? 3 : 2)) fail(entry.id, `${isA ? 'A' : 'B'}类 anatomyHighlights 不足`)
  if (listLength(entry.dayInTheLife) < (isA ? 3 : 2)) fail(entry.id, `${isA ? 'A' : 'B'}类 dayInTheLife 不足`)
  if (listLength(entry.fossilEvidence) < 2) fail(entry.id, '化石或地球化学证据少于2条')
  if (listLength(entry.debates) < 1) fail(entry.id, '缺少科学争议或不确定性')
  if (isA && listLength(entry.misconceptions) < 2) fail(entry.id, 'A类误解纠正少于2条')
  if (isA && listLength(entry.funFacts) < 3) fail(entry.id, 'A类趣味知识少于3条')
  if (isA && listLength(entry.glossary) < 3) fail(entry.id, 'A类术语少于3条')
  if (!isA && listLength(entry.misconceptions) + listLength(entry.funFacts) < 2) fail(entry.id, 'B类误解纠正与趣味知识合计少于2条')
  if (listLength(entry.knowledgeCheck) !== 3) fail(entry.id, '知识挑战必须正好3题')
  if (listLength(entry.sourceIds) < minSources) fail(entry.id, `来源少于 ${minSources} 项`)
  if (!hasUncertainty(entry)) fail(entry.id, '缺少不确定性说明')
  if (entry.entryType === 'functional-group' && entry.scale && (entry.scale.mass || entry.scale.height)) fail(entry.id, '功能群不应强制填写动物式体重或身高')
  const requiredTextSections = ['hook', 'quickSummary', 'whyItMatters', 'paleoenvironment', 'ecosystemRole']
  for (const section of requiredTextSections) if (!textLength(entry[section])) fail(entry.id, `章节为空：${section}`)
  const requiredCollectionSections = ['taxonomy', 'time', 'distribution', 'lifeFunctions', 'anatomyHighlights', 'ecologicalRelations', 'dayInTheLife', 'fossilEvidence', 'discoveryHistory', 'debates', 'misconceptions', 'funFacts', 'glossary', 'sourceIds']
  for (const section of requiredCollectionSections) {
    const value = entry[section]
    const size = Array.isArray(value) ? value.length : (value && typeof value === 'object' ? Object.keys(value).length : 0)
    if (!size) fail(entry.id, `章节为空：${section}`)
  }
  for (const sourceId of entry.sourceIds || []) {
    const source = sourceMap[sourceId]
    if (!source) { fail(entry.id, `来源ID不存在：${sourceId}`); continue }
    try {
      const parsed = new URL(source.url)
      if (parsed.protocol !== 'https:') fail(entry.id, `来源不是HTTPS：${source.url}`)
    } catch (error) { fail(entry.id, `来源URL无效：${source.url}`) }
  }
  for (const evidence of entry.fossilEvidence || []) {
    if (!evidence.whatItShows || !evidence.limitation || !evidence.evidenceType || !evidence.strength) fail(entry.id, '证据卡缺少“能说明/不能说明/类型/强度”')
  }
  for (const question of entry.knowledgeCheck || []) {
    if (!question.question || listLength(question.options) !== 4 || question.correctIndex < 0 || question.correctIndex > 3 || !question.explanation) fail(entry.id, '知识挑战题结构不完整')
  }
  if (/待补|占位|\b(?:lorem|todo)\b/i.test(JSON.stringify(entry))) fail(entry.id, '出现占位文字')
}

if (new Set(sources.map((item) => item.url)).size !== sources.length) errors.push('科学来源URL存在重复记录')
for (const source of sources) {
  if (!source.title || !source.organization || !source.type) errors.push(`${source.id}: 来源缺少标题、机构或类型`)
}

const paragraphOwners = new Map()
for (const entry of entries) {
  const strings = []
  function collect(value) {
    if (typeof value === 'string' && textLength(value) > 40) strings.push(value.replace(/\s+/g, ''))
    else if (Array.isArray(value)) value.forEach(collect)
    else if (value && typeof value === 'object') Object.keys(value).forEach((key) => key !== 'sourceIds' && collect(value[key]))
  }
  collect(entry)
  for (const paragraph of new Set(strings)) {
    const owners = paragraphOwners.get(paragraph) || []
    owners.push(entry.id)
    paragraphOwners.set(paragraph, owners)
  }
}
for (const [paragraph, owners] of paragraphOwners) {
  if (owners.length > 1) errors.push(`重复长段落（${owners.join('、')}）：${paragraph.slice(0, 42)}…`)
}

const discoveryOwners = new Map()
for (const creature of creatures) {
  const discovery = String(creature.discovery || '').replace(/\s+/g, '')
  if (textLength(discovery) < 40) fail(creature.id, '发现史说明少于40字')
  const owners = discoveryOwners.get(discovery) || []
  owners.push(creature.id)
  discoveryOwners.set(discovery, owners)
}
for (const [discovery, owners] of discoveryOwners) {
  if (discovery && owners.length > 1) errors.push(`重复发现史（${owners.join('、')}）：${discovery.slice(0, 42)}…`)
}

const forbiddenVisibleTerms = ['sourceNeeded', 'mediaId', 'quizEligible', 'personalityProfile', 'internal data']
for (const relative of uiFiles) {
  const content = fs.readFileSync(path.join(root, relative), 'utf8')
  const visibleText = content.replace(/<[^>]+>/g, ' ')
  for (const term of forbiddenVisibleTerms) if (visibleText.includes(term)) errors.push(`${relative}: 用户可见文字出现内部字段 ${term}`)
}

const aComplete = creatures.filter((item) => item.quizEligible && knowledgeMap[item.id]).length
const bComplete = creatures.filter((item) => !item.quizEligible && knowledgeMap[item.id]).length
const report = [
  '# 古生物知识内容覆盖报告', '',
  `- 模式：${sampleMode ? '10个代表条目样例验收' : '110个条目完整验收'}`,
  `- 知识条目：${entries.length} / ${creatures.length}`,
  `- A类完成：${aComplete} / ${creatures.filter((item) => item.quizEligible).length}`,
  `- B类完成：${bComplete} / ${creatures.filter((item) => !item.quizEligible).length}`,
  `- 来源记录：${sources.length}（唯一URL ${new Set(sources.map((item) => item.url)).size}）`,
  `- 重复长段落：${Array.from(paragraphOwners.values()).filter((owners) => owners.length > 1).length}`,
  `- 重复发现史：${Array.from(discoveryOwners.values()).filter((owners) => owners.length > 1).length}`,
  `- 错误：${errors.length}`,
  `- 提示：${warnings.length}`,
  '', '## 本轮检查条目', '',
  ...targets.map((item) => `- ${item.nameCn}（${item.id}）：${knowledgeMap[item.id] ? '通过结构检查' : '缺失'}`),
  '', '## 错误', '', errors.length ? errors.map((item) => `- ${item}`).join('\n') : '- 无',
  '', '## 说明', '',
  '- URL结构检查只排除无效或非HTTPS地址；最终发布前还需运行网络可达性与人工内容对应检查。',
  '- 艺术复原图与科学证据在详情页中分区显示。'
].join('\n')

fs.writeFileSync(path.join(root, 'reports/creature-content-coverage.md'), `${report}\n`)
console.log(`Creature knowledge: ${entries.length}/${creatures.length}; A ${aComplete}; B ${bComplete}; sources ${sources.length}`)
console.log(`Checked ${targets.length} entries in ${sampleMode ? 'sample' : 'full'} mode; duplicate long paragraphs ${Array.from(paragraphOwners.values()).filter((owners) => owners.length > 1).length}`)
if (errors.length) {
  console.error(errors.map((item) => `- ${item}`).join('\n'))
  process.exit(1)
}
console.log('Creature content validation passed')
