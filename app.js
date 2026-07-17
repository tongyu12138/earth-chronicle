App({
  onLaunch() {
    if (wx.getUpdateManager) {
      const manager = wx.getUpdateManager()
      manager.onUpdateReady(() => manager.applyUpdate())
    }
  },
  globalData: {
    appName: '地球编年史',
    version: '2.0.0'
  }
})
