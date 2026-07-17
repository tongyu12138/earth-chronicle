const { events, eras } = require('../../data/events')

Page({
  data: {
    events,
    eras,
    eventCount: events.length
  },

  openEvent(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
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
    wx.switchTab({ url: '/pages/science/index' })
  },

  openQuiz() {
    wx.switchTab({ url: '/pages/quiz/index' })
  },

  onShareAppMessage() {
    return {
      title: '用一条时间轴看完地球45亿年',
      path: '/pages/timeline/index'
    }
  }
})
