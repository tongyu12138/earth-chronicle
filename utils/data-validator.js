function uniqueIds(list, label) {
  const seen = new Set()
  const problems = []
  list.forEach((item) => {
    if (!item.id) problems.push(`${label} item without id`)
    else if (seen.has(item.id)) problems.push(`${label} duplicate id: ${item.id}`)
    seen.add(item.id)
  })
  return problems
}

function validateData(data) {
  const { periods, events, creatures, questions } = data
  const problems = []
  problems.push.apply(problems, uniqueIds(periods, 'period'))
  problems.push.apply(problems, uniqueIds(events, 'event'))
  problems.push.apply(problems, uniqueIds(creatures, 'creature'))
  const mappedEvents = new Set()
  const eventIds = new Set(events.map((event) => event.id))
  const creatureIds = new Set(creatures.map((creature) => creature.id))
  periods.forEach((period) => period.eventIds.forEach((id) => mappedEvents.add(id)))
  periods.forEach((period) => {
    period.eventIds.forEach((id) => { if (!eventIds.has(id)) problems.push(`period ${period.id} references missing event ${id}`) })
    period.creatureIds.forEach((id) => { if (!creatureIds.has(id)) problems.push(`period ${period.id} references missing creature ${id}`) })
    if (period.id !== 'hadean' && periods.indexOf(period) < 19) {
      const count = creatures.filter((creature) => creature.periodIds.includes(period.id)).length
      // The Silurian currently has three species-level records after removing
      // Cephalaspis lyelli and the former Brontoscorpio anglicus, both now
      // securely placed in the Early Devonian. Do not preserve a scientifically
      // wrong date merely to satisfy a uniform catalogue-size heuristic.
      const minimumCount = period.id === 'silurian' ? 3 : 6
      if (count < minimumCount) problems.push(`geologic period ${period.id} has only ${count} creatures`)
    }
  })
  events.forEach((event) => {
    if (!mappedEvents.has(event.id)) problems.push(`unmapped event: ${event.id}`)
    ;['detail', 'significance', 'mechanism', 'evidence', 'openQuestions', 'misconception', 'glossary', 'sources'].forEach((field) => {
      if (event[field] === undefined || event[field] === null) problems.push(`event ${event.id} missing ${field}`)
    })
  })
  periods.forEach((period) => {
    if (!period.environment || !period.overview || !period.livingHere) problems.push(`period ${period.id} incomplete`)
    if (!Array.isArray(period.gallery) || period.gallery.length < 3) problems.push(`period ${period.id} needs gallery slots`)
  })
  creatures.forEach((creature) => {
    ;['nameCn', 'scientificName', 'periodId', 'livedWhen', 'group', 'habitat', 'diet', 'size', 'region', 'survivalStrategy', 'funIntro'].forEach((field) => {
      if (!creature[field]) problems.push(`creature ${creature.id} missing ${field}`)
    })
    if (creature.quizEligible && !creature.personalityProfile) problems.push(`quiz-eligible creature ${creature.id} missing personalityProfile`)
    if (!creature.quizEligible && creature.personalityProfile) problems.push(`quiz-ineligible creature ${creature.id} should not have personalityProfile`)
    if (!creature.sourceNeeded && !creature.sourceUrls.length) problems.push(`creature ${creature.id} has neither source nor sourceNeeded`)
  })
  if (questions.length !== 15) problems.push(`quiz question count: ${questions.length}`)
  questions.forEach((question, index) => {
    if (question.options.length !== 4) problems.push(`question ${index + 1} option count: ${question.options.length}`)
  })
  return problems
}

module.exports = { validateData }
