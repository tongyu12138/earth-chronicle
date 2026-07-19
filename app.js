const { switchTabPage } = require('./utils/router')

App({
  onLaunch() {
    if (wx.getUpdateManager) {
      const manager = wx.getUpdateManager()
      manager.onUpdateReady(() => {
        wx.showModal({
          title: '新版本已准备好',
          content: '更新会重新启动小程序。建议先完成当前阅读或答题，再确认更新。',
          confirmText: '立即更新',
          cancelText: '稍后再说',
          success(result) {
            if (result.confirm) manager.applyUpdate()
          },
          fail(error) {
            console.error('[UpdatePrompt]', error)
          }
        })
      })
      manager.onUpdateFailed(() => {
        console.error('[UpdateFailed] 新版本下载失败')
        wx.showToast({ title: '新版本下载失败，请稍后重试', icon: 'none', duration: 2600 })
      })
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
    version: '3.0.0'
  }
})
