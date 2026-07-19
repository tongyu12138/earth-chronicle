const { events } = require('../../data/events')
const { periods, getPeriodById } = require('../../data/periods')
const { eras } = require('../../data/eras')
const { buildUrl, navigateToPage, switchTabPage } = require('../../utils/router')

const ERA_NAME_BY_ID = eras.reduce((map, era) => {
  map[era.id] = era.name
  return map
}, {})

const PERIOD_START_MA = {
  hadean: 4540, archean: 4000, proterozoic: 2500, cambrian: 538.8, ordovician: 485.4,
  silurian: 443.8, devonian: 419.2, carboniferous: 358.9, permian: 298.9, triassic: 251.9,
  jurassic: 201.4, cretaceous: 145, paleocene: 66, eocene: 56, oligocene: 33.9,
  miocene: 23.03, pliocene: 5.33, pleistocene: 2.58, holocene: 0.0117,
  'early-homo': 2.8, 'hunter-gatherer': 0.3, 'agricultural-revolution': 0.012,
  'first-civilizations': 0.006, 'classical-civilizations': 0.0028, 'medieval-societies': 0.0015,
  'early-modern': 0.000575, 'industrial-revolution': 0.000276, 'modern-world': 0.000112,
  'digital-ai': 0.000079
}

function periodOption(period) {
  return { id: period.id, name: period.name, eraId: period.eraId, color: period.color }
}

function decorate(items, mode) {
  let previous = null
  return items.map((item) => {
    const period = getPeriodById(item.periodId)
    const age = PERIOD_START_MA[item.periodId] || 0
    let deepGap = 18
    if (mode === 'deep' && previous && previous.periodId !== item.periodId) {
      const previousAge = PERIOD_START_MA[previous.periodId] || 0
      const distance = Math.abs(Math.log10(previousAge * 1000000 + 1) - Math.log10(age * 1000000 + 1))
      deepGap = Math.max(34, Math.min(190, Math.round(40 + distance * 74)))
    }
    // 时间线只需要卡片展示字段。不要把详情页的长文、来源与术语表等嵌套数据
    // 一并送入 setData；全量 70 条事件会显著增加逻辑层到视图层的传输与渲染负担。
    const result = {
      id: item.id,
      periodId: item.periodId,
      periodName: item.periodName,
      mediaId: item.mediaId,
      title: item.title,
      category: item.category,
      displayTime: item.displayTime,
      summary: item.summary,
      glow: item.glow,
      topEraId: period ? period.eraId : '',
      topEraName: period ? ERA_NAME_BY_ID[period.eraId] : item.era,
      periodColor: period ? period.color : item.color,
      isChapterStart: !previous || previous.periodId !== item.periodId,
      deepGap
    }
    previous = item
    return result
  })
}

Page({
  data: {
    events: [],
    eras: [{ id: 'all', name: '全部时代', color: '#65d4c1' }].concat(eras),
    periodOptions: [{ id: 'all', name: '全部时期', eraId: 'all', color: '#65d4c1' }].concat(periods.map(periodOption)),
    selectedEraId: 'all',
    selectedPeriodId: 'all',
    mode: 'chapter',
    eventCount: events.length,
    filteredCount: events.length
  },

  onLoad() {
    this.applyFilters()
  },

  applyFilters() {
    const eraId = this.data.selectedEraId
    const periodId = this.data.selectedPeriodId
    const filtered = events.filter((item) => {
      const period = getPeriodById(item.periodId)
      if (periodId !== 'all' && item.periodId !== periodId) return false
      return eraId === 'all' || (period && period.eraId === eraId)
    })
    this.setData({ events: decorate(filtered, this.data.mode), filteredCount: filtered.length })
  },

  selectEra(event) {
    const id = event.currentTarget.dataset.id || 'all'
    this.setData({ selectedEraId: id, selectedPeriodId: 'all' }, () => this.applyFilters())
  },

  selectPeriod(event) {
    const id = event.currentTarget.dataset.id || 'all'
    const period = id === 'all' ? null : getPeriodById(id)
    this.setData({ selectedPeriodId: id, selectedEraId: period ? period.eraId : this.data.selectedEraId }, () => this.applyFilters())
  },

  selectMode(event) {
    const mode = event.currentTarget.dataset.mode === 'deep' ? 'deep' : 'chapter'
    this.setData({ mode }, () => this.applyFilters())
  },

  openEvent(event) {
    const id = event.currentTarget.dataset.id
    if (!id) return wx.showToast({ title: '事件参数缺失', icon: 'none' })
    navigateToPage(buildUrl('/pages/detail/index', { id }), { toastTitle: '暂时无法打开事件' })
  },

  openPeriods() { switchTabPage('/pages/science/index') },
  openQuiz() { switchTabPage('/pages/quiz/index') },

  onShareAppMessage() {
    return { title: '用一条时间轴看完地球45亿年', path: '/pages/timeline/index' }
  }
})
