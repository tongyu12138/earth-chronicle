Page({
  onLoad(options) {
    if (!options.id) {
      wx.showToast({ title: '事件参数缺失', icon: 'none' })
      return
    }
    wx.redirectTo({
      url: `/pages/detail/index?id=${options.id}`,
      fail: () => wx.showToast({ title: '事件档案打开失败', icon: 'none' })
    })
  }
})
