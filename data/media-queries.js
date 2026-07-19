const { periods } = require('./periods')
const { creatures } = require('./creatures')
const { featuredEvents, massExtinctions } = require('./index-meta')

const periodQueryOverrides = {
  hadean: ['Hadean Earth artist impression', 'early Earth magma ocean reconstruction'],
  archean: ['Archean Earth reconstruction', 'Archean stromatolite landscape'],
  proterozoic: ['Proterozoic geology fossil', 'Proterozoic Earth reconstruction'],
  cambrian: ['Cambrian life reconstruction', 'Burgess Shale Cambrian fossils'],
  ordovician: ['Ordovician life reconstruction', 'Ordovician fossils'],
  silurian: ['Silurian life reconstruction', 'Silurian fossils'],
  devonian: ['Devonian life reconstruction', 'Devonian fossil reef'],
  carboniferous: ['Carboniferous forest diorama', 'Carboniferous Stigmaria fossil'],
  permian: ['Permian life reconstruction', 'Permian fossils'],
  triassic: ['Triassic life reconstruction', 'Triassic fossils'],
  jurassic: ['Jurassic life reconstruction', 'Jurassic fossils'],
  cretaceous: ['Cretaceous life reconstruction', 'Cretaceous fossils'],
  paleocene: ['Paleocene life reconstruction', 'Paleocene fossils'],
  eocene: ['Eocene life reconstruction', 'Eocene fossils'],
  oligocene: ['Oligocene life reconstruction', 'Oligocene fossils'],
  miocene: ['Miocene life reconstruction', 'Miocene fossils'],
  pliocene: ['Pliocene life reconstruction', 'Pliocene fossils'],
  pleistocene: ['Pleistocene megafauna reconstruction', 'Pleistocene fossils'],
  holocene: ['Holocene landscape geology', 'Holocene sea level geology'],
  'early-homo': ['early Homo reconstruction', 'early Homo fossil'],
  'hunter-gatherer': ['prehistoric hunter gatherer reconstruction', 'Paleolithic cave art public domain'],
  'agricultural-revolution': ['Neolithic agriculture', 'Neolithic farming'],
  'first-civilizations': ['Uruk period tablet', 'Sumerian cuneiform tablet'],
  'classical-civilizations': ['Roman Forum archaeology', 'Parthenon Athens ruins'],
  'medieval-societies': ['medieval manuscript public domain', 'medieval city public domain'],
  'early-modern': ['early modern printing press public domain', 'Age of Discovery map public domain'],
  'industrial-revolution': ['Industrial Revolution factory public domain', 'steam engine public domain'],
  'modern-world': ['twentieth century Earth public domain', 'modern city public domain'],
  'digital-ai': ['artificial intelligence computer servers', 'digital network public domain']
}

const eventQueryOverrides = {
  'earth-formation': ['protoplanetary disk NASA illustration', 'early Solar System formation illustration'],
  'great-oxidation': ['banded iron formation', 'stromatolite oxygen'],
  'cambrian-explosion': ['Burgess Shale fossil', 'Cambrian life reconstruction'],
  'first-tetrapods': ['Tiktaalik fossil', 'tetrapod evolution fossil'],
  'permian-extinction': ['Permian extinction reconstruction', 'Permian Triassic boundary geology'],
  'ordovician-extinction': ['Late Ordovician glacial deposit', 'Hirnantian diamictite'],
  'late-devonian-extinction': ['Late Devonian extinction black shale', 'Late Devonian fossil reef extinction'],
  'triassic-extinction': ['end Triassic extinction CAMP volcanism', 'Triassic Jurassic boundary geology'],
  'kpg-extinction': ['Chicxulub impact reconstruction', 'Cretaceous Paleogene boundary geology'],
  'modern-ai': ['artificial intelligence computer servers', 'machine learning computer public domain']
}

const creatureQueryOverrides = {
  dunkleosteus: ['Dunkleosteus fossil museum', 'Dunkleosteus terrelli skull']
}

function queryItem(data) {
  return Object.freeze(Object.assign({
    priority: 'P0',
    requiredForRelease: true,
    limit: 8
  }, data))
}

const periodQueries = periods.map((period) => queryItem({
  mediaId: `period-${period.id}`,
  ownerType: 'period',
  ownerId: period.id,
  label: `${period.name}时期头图`,
  expectedRatio: '16:9',
  suggestedMediaTypes: ['reconstruction', 'fossil-photo', 'landscape', 'map', 'science-diagram'],
  queries: periodQueryOverrides[period.id] || [`${period.englishName} geology`, `${period.englishName} fossils`]
}))

const creatureQueries = creatures.filter((creature) => creature.quizEligible).map((creature) => queryItem({
  mediaId: `creature-${creature.id}`,
  ownerType: 'creature',
  ownerId: creature.id,
  label: `${creature.nameCn}（${creature.scientificName}）主图`,
  scientificName: creature.scientificName,
  expectedRatio: '4:3',
  suggestedMediaTypes: ['fossil-photo', 'specimen', 'reconstruction', 'microscopy'],
  queries: creatureQueryOverrides[creature.id] || [`${creature.scientificName} fossil`, creature.scientificName]
}))

const featuredIds = new Set(featuredEvents.map((event) => event.id))
const visualEvents = featuredEvents.concat(massExtinctions.filter((event) => !featuredIds.has(event.id)))
const eventQueries = visualEvents.map((event) => queryItem({
  mediaId: `event-${event.id}`,
  ownerType: 'event',
  ownerId: event.id,
  label: `${event.title}${featuredIds.has(event.id) ? '精选' : '灭绝专题'}事件图`,
  expectedRatio: '16:9',
  priority: featuredIds.has(event.id) ? 'P0' : 'P1',
  requiredForRelease: featuredIds.has(event.id),
  suggestedMediaTypes: ['fossil-photo', 'reconstruction', 'science-diagram', 'historical-photo'],
  queries: eventQueryOverrides[event.id] || [event.title]
}))

const mediaQueries = periodQueries.concat(creatureQueries, eventQueries)

module.exports = { mediaQueries, periodQueries, creatureQueries, eventQueries }
