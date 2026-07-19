const fs = require('fs')
const path = require('path')
const { periods } = require('../data/periods')
const { creatures } = require('../data/creatures')
const { events } = require('../data/events')
const { mediaCatalog } = require('../data/media-catalog')

const repoRoot = path.resolve(__dirname, '..')
const check = process.argv.includes('--check')
const readyIds = new Set(mediaCatalog.filter((item) => item.status === 'ready').map((item) => item.id))
const eventById = new Map(events.map((item) => [item.id, item]))
const creatureById = new Map(creatures.map((item) => [item.id, item]))

function moduleSource(name, value, exports) {
  return `// 此文件由 scripts/generate-summaries.js 生成，请勿手工维护重复字段。\nconst ${name} = ${JSON.stringify(value, null, 2)}\n\nmodule.exports = { ${exports || name} }\n`
}

const periodSummaries = periods.map((period) => {
  const representative = period.creatureIds.map((id) => creatureById.get(id)).find(Boolean)
  return {
    id: period.id,
    name: period.name,
    englishName: period.englishName,
    range: period.range,
    eraId: period.eraId,
    color: period.color,
    icon: period.icon,
    tagline: period.tagline,
    representativeName: representative ? representative.nameCn : (period.eraId === 'human-history' ? '人类社会与技术' : '尚无已确认生命'),
    eventCount: period.eventIds.length,
    mediaId: period.mediaId,
    mediaReady: readyIds.has(period.mediaId)
  }
})

const creatureSummaries = creatures.map((creature) => ({
  id: creature.id,
  nameCn: creature.nameCn,
  scientificName: creature.scientificName,
  livedWhen: creature.livedWhen,
  periodId: creature.periodId,
  group: creature.group,
  funIntro: creature.funIntro,
  mediaId: creature.mediaId,
  mediaReady: readyIds.has(creature.mediaId),
  quizEligible: Boolean(creature.quizEligible)
}))

const featuredIds = ['earth-formation', 'great-oxidation', 'cambrian-explosion', 'first-tetrapods', 'permian-extinction', 'modern-ai']
const extinctionIds = ['ordovician-extinction', 'late-devonian-extinction', 'permian-extinction', 'triassic-extinction', 'kpg-extinction']
const featuredEvents = featuredIds.map((id) => eventById.get(id)).filter(Boolean).map((event) => ({
  id: event.id,
  title: event.title,
  displayTime: event.displayTime,
  category: event.category,
  summary: event.summary,
  mediaId: event.mediaId,
  color: event.color,
  mediaReady: readyIds.has(event.mediaId)
}))
const massExtinctions = extinctionIds.map((id) => eventById.get(id)).filter(Boolean).map((event) => ({
  id: event.id,
  periodId: event.periodId,
  title: event.title.replace('大灭绝', '').replace('多阶段灭绝', ''),
  time: event.displayTime,
  copy: event.summary,
  mediaId: event.mediaId,
  mediaReady: readyIds.has(event.mediaId)
}))
const indexMeta = {
  periodCount: periods.length,
  eventCount: events.length,
  creatureCount: creatures.length,
  quizResultCount: creatures.filter((item) => item.quizEligible).length,
  heroMediaId: 'hero-earth-blue-marble'
}
const categories = [
  { id: 'timeline', icon: '↧', name: '生命演化', copy: `沿${events.length}个关键事件穿越深时间` },
  { id: 'creatures', icon: '✦', name: '古生物图鉴', copy: `筛选${creatures.length}种古老生命` },
  { id: 'extinctions', icon: '⚠', name: '五次大灭绝', copy: '理解危机后的生态重组' },
  { id: 'human', icon: '⌁', name: '人类演化', copy: '工具、迁徙与文化网络' }
]

const outputs = new Map([
  [path.resolve(repoRoot, 'data/period-summaries.js'), moduleSource('periodSummaries', periodSummaries)],
  [path.resolve(repoRoot, 'data/creature-summaries.js'), moduleSource('creatureSummaries', creatureSummaries)],
  [path.resolve(repoRoot, 'data/index-meta.js'), `// 此文件由 scripts/generate-summaries.js 生成，请勿手工维护重复字段。\nconst indexMeta = ${JSON.stringify(indexMeta, null, 2)}\n\nconst categories = ${JSON.stringify(categories, null, 2)}\n\nconst featuredEvents = ${JSON.stringify(featuredEvents, null, 2)}\n\nconst massExtinctions = ${JSON.stringify(massExtinctions, null, 2)}\n\nmodule.exports = { indexMeta, categories, featuredEvents, massExtinctions }\n`]
])

const stale = []
outputs.forEach((content, file) => {
  const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
  if (current === content) return
  if (check) stale.push(path.relative(repoRoot, file))
  else {
    fs.writeFileSync(file, content)
    console.log(`Generated ${path.relative(repoRoot, file)}`)
  }
})

if (stale.length) {
  console.error(`Generated summaries are stale:\n${stale.join('\n')}\nRun: node scripts/generate-summaries.js`)
  process.exit(1)
}
console.log(check ? 'Generated summaries are up to date' : 'Summary generation complete')
