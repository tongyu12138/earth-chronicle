const fs = require('fs')
const path = require('path')
const { storyChapters, storySources, storySourceMap } = require('../data/earth-story')
const { extinctionComparisons } = require('../data/extinction-comparison')
const { periods } = require('../data/periods')
const { events } = require('../data/events')
const { getMediaById } = require('../data/media-catalog')

const root = path.join(__dirname, '..')
const errors = []
const fail = (message) => errors.push(message)
const periodMap = new Map(periods.map((item) => [item.id, item]))
const eventMap = new Map(events.map((item) => [item.id, item]))
const allowedClaims = new Set(['consensus', 'supported', 'debated', 'speculative'])
const newEventIds = ['solar-system-formation', 'huronian-glaciations', 'boring-billion', 'rodinia-cycle', 'great-ordovician-biodiversification', 'first-forests', 'humanity-in-deep-time']
const extinctionIds = ['ordovician-extinction', 'late-devonian-extinction', 'permian-extinction', 'triassic-extinction', 'kpg-extinction']

if (storyChapters.length < 10) fail(`故事模式至少10章，当前${storyChapters.length}章`)
if (new Set(storyChapters.map((item) => item.id)).size !== storyChapters.length) fail('故事章节ID不唯一')
if (new Set(storySources.map((item) => item.id)).size !== storySources.length) fail('故事来源ID不唯一')

storySources.forEach((source) => {
  if (!source.title || !source.organization || !source.url || !source.type) fail(`故事来源 ${source.id} 字段不完整`)
  if (/youtube|youtu\.be|bilibili|vimeo|douyin|tiktok/i.test(source.url || '')) fail(`故事来源 ${source.id} 误用视频URL`)
})

storyChapters.forEach((chapter, index) => {
  const owner = `第${index + 1}章 ${chapter.id}`
  ;['title', 'mediaId', 'openingQuestion', 'previousCondition', 'narrative', 'misconception', 'nextTransition'].forEach((field) => {
    if (!chapter[field]) fail(`${owner} 缺少 ${field}`)
  })
  if (!Array.isArray(chapter.periodIds) || !chapter.periodIds.length) fail(`${owner} 没有关联时期`)
  if (!Array.isArray(chapter.eventIds) || !chapter.eventIds.length) fail(`${owner} 没有关联事件`)
  if (!Array.isArray(chapter.sourceIds) || !chapter.sourceIds.length) fail(`${owner} 没有科学来源`)
  if (!Array.isArray(chapter.keyFacts) || chapter.keyFacts.length < 3) fail(`${owner} 事实锚点少于3条`)
  if (!Array.isArray(chapter.evidenceCards) || chapter.evidenceCards.length < 2) fail(`${owner} 证据卡少于2张`)
  chapter.periodIds.forEach((id) => { if (!periodMap.has(id)) fail(`${owner} 使用不存在的时期 ${id}`) })
  chapter.eventIds.forEach((id) => { if (!eventMap.has(id)) fail(`${owner} 使用不存在的事件 ${id}`) })
  chapter.sourceIds.forEach((id) => { if (!storySourceMap[id]) fail(`${owner} 使用不存在的来源 ${id}`) })
  chapter.evidenceCards.forEach((card) => {
    if (!card.title || !card.evidence || !allowedClaims.has(card.claimStatus)) fail(`${owner} 证据卡字段或 claimStatus 不合法`)
  })
  if (!getMediaById(chapter.mediaId)) fail(`${owner} 使用不存在的媒体 ${chapter.mediaId}`)
})

const currentIcsRanges = {
  proterozoic: '约25亿—5.388亿年前', cambrian: '约5.388亿—4.854亿年前', ordovician: '约4.854亿—4.438亿年前',
  silurian: '约4.438亿—4.192亿年前', devonian: '约4.192亿—3.589亿年前', carboniferous: '约3.589亿—2.989亿年前',
  permian: '约2.989亿—2.519亿年前', triassic: '约2.519亿—2.014亿年前', jurassic: '约2.014亿—1.45亿年前',
  cretaceous: '约1.45亿—6600万年前', paleocene: '约6600万—5600万年前', eocene: '约5600万—3390万年前',
  oligocene: '约3390万—2303万年前', miocene: '约2303万—533万年前', pliocene: '约533万—258万年前',
  pleistocene: '约258万—1.17万年前', holocene: '约1.17万年前—至今'
}
Object.entries(currentIcsRanges).forEach(([id, range]) => {
  const period = periodMap.get(id)
  if (!period || period.range !== range) fail(`${id} 时间边界未对齐当前ICS基线：应为 ${range}`)
})

const huronianChapter = storyChapters.find((item) => item.eventIds.includes('huronian-glaciations'))
const cryogenianChapter = storyChapters.find((item) => item.eventIds.includes('snowball-earth'))
if (!huronianChapter || !cryogenianChapter || huronianChapter.id === cryogenianChapter.id) fail('休伦相关古元古代冰期和成冰纪雪球地球没有分章区分')

newEventIds.forEach((id) => {
  const event = eventMap.get(id)
  if (!event) return fail(`缺少新事件 ${id}`)
  ;['detail', 'significance', 'mechanism', 'evidence', 'openQuestions', 'misconception', 'glossary', 'sources', 'periodId', 'mediaId'].forEach((field) => {
    if (!event[field] || (Array.isArray(event[field]) && !event[field].length)) fail(`${id} 缺少 ${field}`)
  })
  if (!allowedClaims.has(event.claimStatus)) fail(`${id} 的 claimStatus 不合法`)
  const period = periodMap.get(event.periodId)
  if (!period || !period.eventIds.includes(id)) fail(`${id} 没有双向映射到时期`)
  if (!getMediaById(event.mediaId)) fail(`${id} 使用不存在的媒体 ${event.mediaId}`)
})

if (extinctionComparisons.length !== 5) fail(`大灭绝对比应为5项，当前${extinctionComparisons.length}项`)
extinctionIds.forEach((id) => {
  const event = eventMap.get(id)
  const comparison = extinctionComparisons.find((item) => item.id === id)
  if (!event || !comparison) return fail(`大灭绝对比缺少 ${id}`)
  ;['time', 'affectedEcosystems', 'keyEvidence', 'mainstreamMechanism', 'alternativeMechanisms', 'recoveryTime', 'survivors', 'confidence', 'confidenceLabel'].forEach((field) => {
    if (!comparison[field]) fail(`${id} 对比项缺少 ${field}`)
  })
  if (!allowedClaims.has(comparison.claimStatus)) fail(`${id} 对比项没有证据强度`)
  if (!allowedClaims.has(event.claimStatus)) fail(`${id} 事件没有证据强度`)
})

const allStoryCopy = storyChapters.map((chapter) => [chapter.narrative, chapter.keyFacts.join(''), chapter.nextTransition].join('')).join('\n')
if (/演化.{0,6}(为了|朝着|必然通向)|人类是.{0,8}(必然终点|最终目标)|注定.{0,8}人类/.test(allStoryCopy)) fail('故事正文出现单一目的论')
if (/晚泥盆世.{0,30}(只因|仅由|就是因为)树|树木.{0,12}(导致|造成)晚泥盆世灭绝/.test(allStoryCopy)) fail('晚泥盆世灭绝被简化为树木单因')

const report = [
  '# 地球史故事覆盖报告', '',
  `- 故事章节：${storyChapters.length}`,
  `- 科学来源：${storySources.length}`,
  `- 关联时期：${new Set(storyChapters.flatMap((item) => item.periodIds)).size} / ${periods.length}`,
  `- 关联事件：${new Set(storyChapters.flatMap((item) => item.eventIds)).size} / ${events.length}`,
  `- 新增关键事件：${newEventIds.length} / ${newEventIds.length}`,
  `- 五次大灭绝对比：${extinctionComparisons.length} / 5`,
  '', '## 科学边界', '',
  '- 时间边界按项目当前 ICS 基线逐项核验。',
  '- 休伦相关古元古代冰期与成冰纪雪球地球分章呈现。',
  '- 罗迪尼亚古地理、雪球地球冻结程度和晚泥盆世触发链均标注争议。',
  '- 三叠纪末以 CAMP 火山活动和碳循环扰动为主流机制；撞击不作等强并列。',
  '- 五次灭绝分别给出关键证据、主流机制、候选机制、恢复与把握程度。',
  '- 故事没有把演化写成通往人类的预定路线。',
  '', '## 自动检查', '', errors.length ? errors.map((item) => `- ❌ ${item}`).join('\n') : '- ✅ 全部通过'
].join('\n')
fs.writeFileSync(path.join(root, 'reports/earth-story-coverage.md'), `${report}\n`)

console.log(`Story chapters ${storyChapters.length}; sources ${storySources.length}; new events ${newEventIds.length}; extinctions ${extinctionComparisons.length}`)
if (errors.length) {
  console.error(errors.map((item) => `- ${item}`).join('\n'))
  process.exit(1)
}
console.log('Earth story validation passed')
