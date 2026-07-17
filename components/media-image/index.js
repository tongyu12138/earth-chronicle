const { getMediaById } = require('../../data/media-catalog')
const { resolveMediaUrl } = require('../../config/media')

const loadedUrls = new Set()

Component({
  properties: {
    mediaId: { type: String, value: '' },
    src: { type: String, value: '' },
    thumbnail: { type: String, value: '' },
    mode: { type: String, value: 'aspectFill' },
    alt: { type: String, value: '' },
    ratio: { type: String, value: '16:9' },
    credit: { type: String, value: '' },
    license: { type: String, value: '' },
    placeholderTheme: { type: String, value: 'ocean' },
    lazyLoad: { type: Boolean, value: true },
    previewable: { type: Boolean, value: false },
    showMeta: { type: Boolean, value: false }
  },
  data: {
    state: 'missing',
    activeSrc: '',
    previewSrc: '',
    displayAlt: '图片资料待补充',
    displayCredit: '',
    displayLicense: '',
    sourceUrl: '',
    ratioPadding: '56.25%'
  },
  observers: {
    'mediaId,src,thumbnail,alt,credit,license,ratio': function resolveWhenChanged() {
      this.resolveMedia()
    }
  },
  lifetimes: {
    attached() {
      this.resolveMedia()
    }
  },
  methods: {
    resolveMedia() {
      const record = this.properties.mediaId ? getMediaById(this.properties.mediaId) : null
      const thumbnail = resolveMediaUrl(this.properties.thumbnail) || (record && record.thumbnailUrl) || ''
      const source = resolveMediaUrl(this.properties.src) || (record && record.imageUrl) || thumbnail
      const activeSrc = thumbnail || source
      const state = activeSrc ? (loadedUrls.has(activeSrc) ? 'ready' : 'loading') : 'missing'
      this.setData({
        state,
        activeSrc,
        previewSrc: source || activeSrc,
        displayAlt: this.properties.alt || (record && record.alt) || '图片资料待补充',
        displayCredit: this.properties.credit || (record && record.credit) || '',
        displayLicense: this.properties.license || (record && record.license) || '',
        sourceUrl: (record && record.sourceUrl) || '',
        ratioPadding: this.properties.ratio === '4:3' ? '75%' : (this.properties.ratio === '1:1' || this.properties.ratio === 'square' ? '100%' : '56.25%')
      })
    },
    handleLoad() {
      if (this.data.activeSrc) loadedUrls.add(this.data.activeSrc)
      this.setData({ state: 'ready' })
      this.triggerEvent('ready', { src: this.data.activeSrc, mediaId: this.properties.mediaId })
    },
    handleError(event) {
      const error = event && event.detail ? event.detail : event
      console.error('[MediaImage]', { mediaId: this.properties.mediaId, src: this.data.activeSrc, error })
      this.setData({ state: 'error', activeSrc: '' })
      this.triggerEvent('error', { mediaId: this.properties.mediaId, error })
    },
    previewImage() {
      if (!this.properties.previewable || this.data.state !== 'ready' || !this.data.previewSrc) return
      wx.previewImage({
        current: this.data.previewSrc,
        urls: [this.data.previewSrc],
        fail: (error) => {
          console.error('[MediaPreview]', { mediaId: this.properties.mediaId, error })
          wx.showToast({ title: '暂时无法预览图片', icon: 'none' })
        }
      })
    }
  }
})
