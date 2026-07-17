const { periods } = require('../../data/periods')
const { events } = require('../../data/events')
const { creatures } = require('../../data/creatures')
const { buildUrl, navigateToPage } = require('../../utils/router')

function includes(text, query) {
  return String(text || '').toLowerCase().includes(query)
}

Page({
  data: { query: '', periodResults: [], eventResults: [], creatureResults: [], total: 0, searched: false },

  onLoad(options) {
    if (options.q) {
      this.setData({ query: options.q })
      this.search(options.q)
    }
  },

  onInput(event) {
    const query = event.detail.value || ''
    this.setData({ query })
    clearTimeout(this._timer)
    this._timer = setTimeout(() => this.search(query), 120)
  },

  clearQuery() {
    clearTimeout(this._timer)
    this.setData({ query: '', periodResults: [], eventResults: [], creatureResults: [], total: 0, searched: false })
  },

  onSuggestion(event) {
    const query = event.currentTarget.dataset.value || ''
    this.setData({ query })
    this.search(query)
  },

  search(value) {
    const query = String(value || '').trim().toLowerCase()
    if (!query) return this.clearQuery()
    const periodResults = periods.filter((period) => includes([period.name, period.englishName, period.tagline, period.overview].join(' '), query)).slice(0, 20).map((period) => ({ id: period.id, name: period.name, meta: period.range, copy: period.tagline }))
    const eventResults = events.filter((item) => includes([item.title, item.category, item.summary, item.detail, item.periodName].join(' '), query)).slice(0, 20).map((item) => ({ id: item.id, name: item.title, meta: `${item.displayTime} · ${item.periodName}`, copy: item.summary }))
    const creatureResults = creatures.filter((creature) => includes([creature.nameCn, creature.scientificName, creature.group, creature.habitat, creature.diet].concat(creature.tags).join(' '), query)).slice(0, 24).map((creature) => ({ id: creature.id, name: creature.nameCn, latin: creature.scientificName, meta: `${creature.livedWhen} · ${creature.group}`, copy: creature.funIntro }))
    this.setData({ periodResults, eventResults, creatureResults, total: periodResults.length + eventResults.length + creatureResults.length, searched: true })
  },

  openResult(event) {
    const type = event.currentTarget.dataset.type
    const id = event.currentTarget.dataset.id
    if (!id) return
    const routes = { period: '/pages/period/index', event: '/pages/detail/index', creature: '/pages/creature-detail/index' }
    if (routes[type]) navigateToPage(buildUrl(routes[type], { id }), { toastTitle: '暂时无法打开搜索结果' })
  },

  onUnload() { clearTimeout(this._timer) }
})
