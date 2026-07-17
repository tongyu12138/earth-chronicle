function imageState(item) {
  return Boolean(item && item.image) ? 'ready' : 'missing'
}

function previewImages(items, current) {
  const urls = (items || []).map((item) => item.src || item.image || '').filter(Boolean)
  if (!urls.length) {
    wx.showToast({ title: '该图片仍是授权占位', icon: 'none' })
    return
  }
  try {
    wx.previewImage({
      current: current || urls[0],
      urls,
      fail(error) {
        console.error('[ImagePreview]', { current, urls, error })
        wx.showToast({ title: '暂时无法预览图片', icon: 'none' })
      }
    })
  } catch (error) {
    console.error('[ImagePreview]', { current, urls, error })
    wx.showToast({ title: '暂时无法预览图片', icon: 'none' })
  }
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
