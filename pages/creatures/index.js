const { creatures, getCreatureSummaries } = require('../../data/creatures')
const { periods } = require('../../data/periods')
const { getFavorites } = require('../../utils/storage')
const { buildUrl, navigateToPage } = require('../../utils/router')

const PAGE_SIZE = 18

function groupCategory(group) {
  if (/恐龙/.test(group)) return '恐龙'
  if (/哺乳|鲸|人族|灵长/.test(group)) return '哺乳动物'
  if (/海生爬行|鱼龙|上龙|有鳞/.test(group)) return '海生爬行动物'
  if (/鱼|鲨/.test(group)) return '鱼类'
  if (/节肢|三叶|蛛形|昆虫|多足/.test(group)) return '节肢动物'
  if (/翼龙|鸟/.test(group)) return '鸟类与翼龙'
  if (/微生物|细菌|古菌/.test(group)) return '微生物'
  if (/合弓/.test(group)) return '合弓动物'
  return '其他生命'
}

function dietCategory(diet) {
  if (/滤食/.test(diet)) return '滤食'
  if (/植食|光合作用/.test(diet)) return '植食'
  if (/杂食/.test(diet)) return '杂食'
  if (/肉|捕食|鱼类|动物|食腐|昆虫|头足/.test(diet)) return '肉食'
  return '其他'
}

function sizeCategory(size, tags) {
  const explicit = ['微小', '小型', '中型', '大型', '巨型'].find((label) => (tags || []).includes(label))
  if (explicit) return explicit
  if (/微米|微观/.test(size)) return '微小'
  if (/厘米|鼠类|乌鸦|火鸡|小型/.test(size)) return '小型'
  const meterRange = String(size).match(/(\d+(?:\.\d+)?)(?:\s*[—–-]\s*(\d+(?:\.\d+)?))?\s*米/)
  const maximumMeters = meterRange ? Number(meterRange[2] || meterRange[1]) : 0
  if (/巨|小汽车|犀牛|象级/.test(size) || maximumMeters >= 10) return '巨型'
  if (maximumMeters >= 3) return '大型'
  if (/约[5-9]|10米|3—|4—|牛大小|狮子大小|豹大小/.test(size)) return '大型'
  return '中型'
}

function compact(creature) {
  const summary = getCreatureSummaries([creature])[0]
  return Object.assign({}, summary, {
    initial: creature.nameCn.charAt(0),
    groupCategory: groupCategory(creature.group),
    sizeCategory: sizeCategory(creature.size, creature.tags)
  })
}

Page({
  data: {
    query: '',
    filter: { period: 'all', habitat: 'all', diet: 'all', group: 'all', size: 'all' },
    periodOptions: [],
    filterRows: [
      { key: 'habitat', label: '环境', options: ['all', '水域', '陆地', '天空'] },
      { key: 'diet', label: '食性', options: ['all', '肉食', '植食', '杂食', '滤食'] },
      { key: 'size', label: '体型', options: ['all', '微小', '小型', '中型', '大型', '巨型'] },
      { key: 'group', label: '类群', options: ['all', '微生物', '节肢动物', '鱼类', '合弓动物', '恐龙', '鸟类与翼龙', '海生爬行动物', '哺乳动物', '其他生命'] }
    ],
    visibleCreatures: [],
    resultCount: creatures.length,
    page: 1,
    hasMore: true,
    favoritesOnly: false
  },

  onLoad(options) {
    const periodOptions = [{ id: 'all', name: '全部时期' }].concat(periods.slice(1, 19).map((period) => ({ id: period.id, name: period.name })))
    const filter = Object.assign({}, this.data.filter)
    if (options.period && periods.some((period) => period.id === options.period)) filter.period = options.period
    this.setData({ periodOptions, filter })
    this.applyFilters()
  },

  onShow() {
    if (this.data.favoritesOnly) this.applyFilters()
  },

  onQueryInput(event) {
    this.setData({ query: event.detail.value || '', page: 1 })
    this.applyFilters()
  },

  selectFilter(event) {
    const kind = event.currentTarget.dataset.kind
    const value = event.currentTarget.dataset.value
    if (!kind || value === undefined) return
    const filter = Object.assign({}, this.data.filter, { [kind]: value })
    this.setData({ filter, page: 1 })
    this.applyFilters()
  },

  toggleFavorites() {
    this.setData({ favoritesOnly: !this.data.favoritesOnly, page: 1 })
    this.applyFilters()
  },

  resetFilters() {
    this.setData({ query: '', filter: { period: 'all', habitat: 'all', diet: 'all', group: 'all', size: 'all' }, page: 1, favoritesOnly: false })
    this.applyFilters()
  },

  applyFilters() {
    const query = this.data.query.trim().toLowerCase()
    const filter = this.data.filter
    const favoriteIds = this.data.favoritesOnly ? getFavorites().creature : []
    const matched = creatures.filter((creature) => {
      if (this.data.favoritesOnly && !favoriteIds.includes(creature.id)) return false
      if (filter.period !== 'all' && !creature.periodIds.includes(filter.period)) return false
      if (filter.habitat === '水域' && !/海|水|湖|河|潮|湿地/.test(creature.habitat)) return false
      if (filter.habitat === '陆地' && !/陆|森林|草原|林地|地面|山地|沙漠/.test(creature.habitat)) return false
      if (filter.habitat === '天空' && !/空|飞|树冠/.test(`${creature.habitat}${creature.survivalStrategy}`)) return false
      if (filter.diet !== 'all' && dietCategory(creature.diet) !== filter.diet) return false
      if (filter.size !== 'all' && sizeCategory(creature.size, creature.tags) !== filter.size) return false
      if (filter.group !== 'all' && groupCategory(creature.group) !== filter.group) return false
      if (query) {
        const text = [creature.nameCn, creature.scientificName, creature.group, creature.habitat, creature.diet].concat(creature.tags).join(' ').toLowerCase()
        if (!text.includes(query)) return false
      }
      return true
    })
    const page = this.data.page
    this._matched = matched
    this.setData({
      visibleCreatures: matched.slice(0, page * PAGE_SIZE).map(compact),
      resultCount: matched.length,
      hasMore: page * PAGE_SIZE < matched.length
    })
  },

  loadMore() {
    if (!this.data.hasMore) return
    this.setData({ page: this.data.page + 1 })
    this.applyFilters()
  },

  openCreature(event) {
    const id = event.currentTarget.dataset.id
    if (!id) return
    navigateToPage(buildUrl('/pages/creature-detail/index', { id }), { toastTitle: '暂时无法打开古生物档案' })
  },

  onShareAppMessage() {
    return { title: `古生物图鉴｜已收录${creatures.length}种远古生命`, path: '/pages/creatures/index' }
  }
})
