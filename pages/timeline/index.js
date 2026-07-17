const { events, eras } = require('../../data/events')
const { buildUrl, navigateToPage, switchTabPage } = require('../../utils/router')

Page({
  data: {
    events,
    eras,
    eventCount: events.length
  },

  openEvent(event) {
    const id = event.currentTarget.dataset.id
    if (!id) return wx.showToast({ title: '事件参数缺失', icon: 'none' })
    navigateToPage(buildUrl('/pages/detail/index', { id }), { toastTitle: '暂时无法打开事件' })
  },

  jumpToEra(event) {
    const target = event.currentTarget.dataset.target
    wx.pageScrollTo({
      selector: `#event-${target}`,
      duration: 420,
      offsetTop: 86
    })
  },

  openPeriods() {
    switchTabPage('/pages/science/index')
  },

  openQuiz() {
    switchTabPage('/pages/quiz/index')
  },

  onShareAppMessage() {
    return {
      title: '用一条时间轴看完地球45亿年',
      path: '/pages/timeline/index'
    }
  }
})
