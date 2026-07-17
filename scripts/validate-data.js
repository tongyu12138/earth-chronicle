const { periods } = require('../data/periods')
const { events } = require('../data/events')
const { creatures } = require('../data/creatures')
const { questions } = require('../data/quiz')
const { imageManifest } = require('../data/image-manifest')
const { validateData } = require('../utils/data-validator')

const problems = validateData({ periods, events, creatures, questions })
console.log(`Periods: ${periods.length}; events: ${events.length}; creatures: ${creatures.length}; image manifest: ${imageManifest.length}`)
if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log('Data validation passed')
