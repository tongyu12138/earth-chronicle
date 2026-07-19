const precambrian = require('./precambrian')
const paleozoic = require('./paleozoic')
const mesozoic = require('./mesozoic')
const cenozoic = require('./cenozoic')
const { sources, sourceMap, getSources } = require('./sources')

const entries = [].concat(precambrian, paleozoic, mesozoic, cenozoic)
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
