const { getPaleoType } = require('../data/paleo-types')

function average(profile, keys) {
  return keys.reduce((sum, key) => sum + Number(profile[key] || 0), 0) / keys.length
}

function calculatePaleoCode(profile) {
  const explore = Number(profile.curiosity || 0)
  const observe = Number(profile.strategy || 0)
  const burst = Number(profile.speed || 0)
  const persist = Number(profile.patience || 0)
  const collective = Number(profile.sociability || 0)
  const solo = Number(profile.independence || 0)
  const reach = Number(profile.adaptability || 0)
  const guard = Number(profile.defense || 0)
  return `${explore >= observe ? 'E' : 'O'}${burst >= persist ? 'B' : 'P'}${collective >= solo ? 'C' : 'S'}${reach >= guard ? 'R' : 'G'}`
}

function environmentAffinity(profile) {
  const environments = [
    { key: 'aquatic', label: '水域', dimension: 'aquaticAffinity' },
    { key: 'terrestrial', label: '陆地', dimension: 'terrestrialAffinity' },
    { key: 'aerial', label: '高处与空域', dimension: 'aerialAffinity' },
    { key: 'cold', label: '寒冷环境', dimension: 'coldAffinity' }
  ].map((item) => Object.assign({}, item, { value: Number(profile[item.dimension] || 0) }))
  environments.sort((left, right) => right.value - left.value || left.key.localeCompare(right.key))
  return environments
}

function explainPaleoType(code) {
  const type = getPaleoType(code)
  if (!type) return null
  return {
    code: type.code,
    nameCn: type.nameCn,
    family: type.family,
    axisLabels: type.axisLabels.slice(),
    tagline: type.tagline
  }
}

module.exports = { calculatePaleoCode, environmentAffinity, explainPaleoType }
