function imageState(item) {
  return Boolean(item && item.image) ? 'ready' : 'placeholder'
}

function previewImages(items, current) {
  const urls = (items || []).map((item) => item.src || item.image || '').filter(Boolean)
  if (!urls.length) {
    wx.showToast({ title: '该图片仍是授权占位', icon: 'none' })
    return
  }
  wx.previewImage({ current: current || urls[0], urls })
}

function compactImageMeta(item) {
  return {
    image: item.image || '',
    thumbnail: item.thumbnail || '',
    imageAlt: item.imageAlt || '科学插图',
    imageCredit: item.imageCredit || '',
    imageLicense: item.imageLicense || '',
    imageSourceUrl: item.imageSourceUrl || '',
    imageState: imageState(item)
  }
}

module.exports = { imageState, previewImages, compactImageMeta }
