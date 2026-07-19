const { getMediaById } = require('../../data/media-catalog')
const { resolveMediaUrl } = require('../../config/media')

const loadedUrls = new Set()
const failedUrls = new Set()

const TYPE_LABELS = {
  reconstruction: '艺术复原',
  'fossil-photo': '化石照片',
  specimen: '标本照片',
  microscopy: '显微影像',
  map: '古地图',
  'science-diagram': '科学示意图',
  'historical-photo': '历史照片',
  illustration: '历史插图',
  landscape: '地质景观',
  'satellite-image': '卫星影像'
}

Component({
  properties: {
    mediaId: { type: String, value: '' },
    variant: { type: String, value: 'card' },
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
    showMeta: { type: Boolean, value: false },
    showSource: { type: Boolean, value: false },
    showReconstructionBadge: { type: Boolean, value: true },
    retryable: { type: Boolean, value: true },
    focalPoint: { type: String, value: '' },
    caption: { type: String, value: '' }
  },
  data: {
    state: 'missing',
    activeSrc: '',
    previewSrc: '',
    displayAlt: '图片资料待补充',
    displayCredit: '',
    displayLicense: '',
    displayAuthor: '',
    displayCaption: '',
    displayFocalPoint: '50% 50%',
    sourceUrl: '',
    mediaType: '',
    mediaTypeLabel: '',
    isReconstruction: false,
    fallbackSrc: '',
    ratioPadding: '56.25%'
  },
  observers: {
    'mediaId,variant,src,thumbnail,alt,credit,license,ratio,focalPoint,caption': function resolveWhenChanged() {
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
      const useLarge = this.properties.variant === 'hero' || this.properties.variant === 'full'
      const preferred = useLarge ? source : thumbnail
      const fallbackSrc = preferred === source ? thumbnail : source
      const activeSrc = failedUrls.has(preferred) && fallbackSrc ? fallbackSrc : preferred
      const state = activeSrc ? (loadedUrls.has(activeSrc) ? 'ready' : 'loading') : 'missing'
      const mediaType = (record && record.mediaType) || ''
      const displayAlt = record && record.status === 'ready' && record.alt
        ? record.alt
        : (this.properties.alt || (record && record.alt) || '图片资料待补充')
      this.setData({
        state,
        activeSrc,
        previewSrc: source || activeSrc,
        fallbackSrc: fallbackSrc && fallbackSrc !== activeSrc ? fallbackSrc : '',
        displayAlt,
        displayCredit: this.properties.credit || (record && record.credit) || '',
        displayLicense: this.properties.license || (record && record.license) || '',
        displayAuthor: (record && record.author) || '',
        displayCaption: this.properties.caption || (record && record.caption) || '',
        displayFocalPoint: this.properties.focalPoint || (record && record.focalPoint) || '50% 50%',
        sourceUrl: (record && record.sourceUrl) || '',
        mediaType,
        mediaTypeLabel: TYPE_LABELS[mediaType] || '',
        isReconstruction: Boolean(record && record.isReconstruction),
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
      if (this.data.activeSrc) failedUrls.add(this.data.activeSrc)
      if (this.data.fallbackSrc && this.data.fallbackSrc !== this.data.activeSrc && !failedUrls.has(this.data.fallbackSrc)) {
        this.setData({ state: loadedUrls.has(this.data.fallbackSrc) ? 'ready' : 'loading', activeSrc: this.data.fallbackSrc, fallbackSrc: '' })
        return
      }
      this.setData({ state: 'error', activeSrc: '' })
      this.triggerEvent('error', { mediaId: this.properties.mediaId, error })
    },
    retry() {
      if (!this.properties.retryable) return
      const record = this.properties.mediaId ? getMediaById(this.properties.mediaId) : null
      ;[(record && record.imageUrl), (record && record.thumbnailUrl), this.properties.src, this.properties.thumbnail].filter(Boolean).forEach((url) => failedUrls.delete(resolveMediaUrl(url)))
      this.resolveMedia()
    },
    copySource() {
      if (!this.data.sourceUrl) return
      wx.setClipboardData({
        data: this.data.sourceUrl,
        success: () => wx.showToast({ title: '来源链接已复制', icon: 'none' }),
        fail: (error) => console.error('[MediaSource]', { mediaId: this.properties.mediaId, error })
      })
    },
    previewImage() {
      if (!this.properties.previewable || this.data.state !== 'ready' || !this.data.previewSrc) return
      wx.previewImage({
        current: this.data.previewSrc,
        urls: [this.data.previewSrc],
        fail: (error) => {
          console.error('[MediaPreview]', { mediaId: this.properties.mediaId, error })
          if (this.data.activeSrc && this.data.previewSrc !== this.data.activeSrc) {
            wx.previewImage({ current: this.data.activeSrc, urls: [this.data.activeSrc], fail: () => wx.showToast({ title: '暂时无法预览图片', icon: 'none' }) })
          } else wx.showToast({ title: '暂时无法预览图片', icon: 'none' })
        }
      })
    }
  }
})
