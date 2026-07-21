const precambrian = require('./precambrian')
const paleozoic = require('./paleozoic')
const mesozoic = require('./mesozoic')
const cenozoic = require('./cenozoic')
const p0Reviewed = require('./p0-reviewed/index')
const { sources, sourceMap, getSources } = require('./sources')

const explicitEntries = [].concat(precambrian, paleozoic, mesozoic, cenozoic)
  .map((entry) => entry.contentOrigin ? entry : Object.assign({ contentOrigin: 'manual', reviewStatus: 'publish-ready' }, entry))
const entries = explicitEntries.concat(p0Reviewed)
const knowledgeMap = entries.reduce((map, entry) => {
  map[entry.id] = entry
  return map
}, {})

function getCreatureKnowledge(id) {
  const entry = knowledgeMap[id]
  if (!entry) return null
  return Object.assign({}, entry, { sources: getSources(entry.sourceIds) })
}

module.exports = { entries, knowledgeMap, sources, sourceMap, getSources, getCreatureKnowledge }
