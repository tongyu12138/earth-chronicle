const { extinctionComparisons } = require('../../data/extinction-comparison')
const { buildUrl, navigateToPage } = require('../../utils/router')

Component({
  data: {
    comparisons: extinctionComparisons,
    selectedId: extinctionComparisons[0].id,
    selected: extinctionComparisons[0]
  },
  methods: {
    selectEvent(event) {
      const id = event.currentTarget.dataset.id
      const selected = extinctionComparisons.find((item) => item.id === id)
      if (selected) this.setData({ selectedId: id, selected })
    },
    openEvent() {
      navigateToPage(buildUrl('/pages/detail/index', { id: this.data.selectedId }), { toastTitle: '暂时无法打开事件档案' })
    }
  }
})
