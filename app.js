const { switchTabPage } = require('./utils/router')

App({
  onLaunch() {
    if (wx.getUpdateManager) {
      const manager = wx.getUpdateManager()
      manager.onUpdateReady(() => manager.applyUpdate())
    }
  },
  onError(error) {
    console.error('[AppError]', error)
  },
  onUnhandledRejection(event) {
    console.error('[UnhandledRejection]', event && event.reason ? event.reason : event)
  },
  onPageNotFound(event) {
    console.error('[PageNotFound]', event)
    const current = typeof getCurrentPages === 'function' ? getCurrentPages() : []
    const alreadyHome = current.length && current[current.length - 1].route === 'pages/science/index'
    if (!alreadyHome) switchTabPage('/pages/science/index', { throttle: false, toastTitle: '页面不存在，已返回地球史' })
  },
  globalData: {
    appName: '地球编年史',
    version: '2.0.0'
  }
})
