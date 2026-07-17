const { getEventById } = require('../../data/events')
const { recordView, isFavorite, toggleFavorite } = require('../../utils/storage')

Page({
  data: {
    event: null,
    isFavorite: false
  },

  onLoad(options) {
    const event = getEventById(options.id)

    if (!event) {
      wx.showToast({
        title: '没有找到这个事件',
        icon: 'none'
      })
      setTimeout(() => wx.navigateBack(), 800)
      return
    }

    this.setData({ event, isFavorite: isFavorite('event', event.id) })
    wx.setNavigationBarTitle({ title: event.title })
    recordView('event', event.id, event.title, `/pages/detail/index?id=${event.id}`)
  },

  toggleFavorite() {
    const event = this.data.event
    if (!event) return
    const active = toggleFavorite('event', event.id)
    this.setData({ isFavorite: active })
    wx.showToast({ title: active ? '已收藏事件' : '已取消收藏', icon: 'none' })
  },

  openPeriod() {
    const event = this.data.event
    if (!event || !event.periodId) return
    wx.navigateTo({ url: `/pages/period/index?id=${event.periodId}` })
  },

  copySource(event) {
    const url = event.currentTarget.dataset.url
    if (!url) return
    wx.setClipboardData({
      data: url,
      success() {
        wx.showToast({
          title: '来源链接已复制',
          icon: 'success'
        })
      }
    })
  },

  onShareAppMessage() {
    const event = this.data.event
    return {
      title: event ? `${event.title}｜地球编年史` : '地球编年史',
      path: event ? `/pages/detail/index?id=${event.id}` : '/pages/science/index'
    }
  }
})
