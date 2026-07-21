const { storyChapters, storySourceMap } = require('../../data/earth-story')
const { recordView } = require('../../utils/storage')
const { buildUrl, navigateToPage } = require('../../utils/router')

function decorateChapters() {
  return storyChapters.map((chapter, index) => ({
    ...chapter,
    number: String(index + 1).padStart(2, '0'),
    sourceCards: chapter.sourceIds.map((id) => storySourceMap[id]).filter(Boolean),
    evidenceCards: chapter.evidenceCards.map((card) => ({
      ...card,
      statusLabel: card.claimStatus === 'consensus' ? '强共识' : card.claimStatus === 'supported' ? '证据支持' : card.claimStatus === 'debated' ? '仍有争议' : '探索性解释'
    }))
  }))
}

Page({
  data: {
    chapters: decorateChapters(),
    activeId: storyChapters[0].id,
    completedCount: 0,
    progress: 0
  },

  onLoad() {
    recordView('story', 'earth-story', '15分钟看懂地球史', '/pages/story/index')
  },

  toggleChapter(event) {
    const id = event.currentTarget.dataset.id
    const index = storyChapters.findIndex((item) => item.id === id)
    const activeId = this.data.activeId === id ? '' : id
    const completedCount = activeId ? Math.max(this.data.completedCount, index) : Math.max(this.data.completedCount, index + 1)
    this.setData({ activeId, completedCount, progress: Math.round(completedCount / storyChapters.length * 100) })
  },

  openEvent(event) {
    const id = event.currentTarget.dataset.id
    if (id) navigateToPage(buildUrl('/pages/detail/index', { id }), { toastTitle: '暂时无法打开事件档案' })
  },

  openPeriod(event) {
    const id = event.currentTarget.dataset.id
    if (id) navigateToPage(buildUrl('/pages/period/index', { id }), { toastTitle: '暂时无法打开时期档案' })
  },

  copySource(event) {
    const url = event.currentTarget.dataset.url
    if (url) wx.setClipboardData({ data: url })
  },

  onShareAppMessage() {
    return { title: '15分钟看懂地球史｜从太阳系尘埃到人工智能', path: '/pages/story/index' }
  }
})
