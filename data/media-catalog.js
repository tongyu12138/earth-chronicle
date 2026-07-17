const { resolveMediaUrl } = require('../config/media')

// 只有已核验来源、作者与许可的记录才能标记为 ready。
const curatedMediaCatalog = [
  {
    id: 'hero-earth-blue-marble',
    ownerType: 'app',
    ownerId: 'science-home',
    thumbnailUrl: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57723/globe_west_540.jpg',
    imageUrl: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57723/globe_west_2048.jpg',
    galleryUrls: [],
    alt: 'NASA 蓝色弹珠地球真彩色合成影像，西半球视角',
    credit: 'NASA Earth Observatory',
    author: 'Reto Stöckli；Robert Simmon',
    license: 'Public Domain (NASA)',
    sourceUrl: 'https://science.nasa.gov/earth/earth-observatory/the-blue-marble-2181/',
    isReconstruction: false,
    status: 'ready'
  }
]

// MEDIA_SYNC_START
const syncedMediaCatalog = []
// MEDIA_SYNC_END

const mediaCatalog = curatedMediaCatalog.concat(syncedMediaCatalog)

const mediaMap = mediaCatalog.reduce((map, item) => {
  map[item.id] = Object.freeze(Object.assign({}, item))
  return map
}, {})

function missingMedia(id, fallback) {
  return Object.assign({
    id: id || '',
    ownerType: '',
    ownerId: '',
    thumbnailUrl: '',
    imageUrl: '',
    galleryUrls: [],
    alt: '图片资料待补充',
    credit: '',
    author: '',
    license: '',
    sourceUrl: '',
    isReconstruction: false,
    status: 'missing'
  }, fallback || {})
}

function getMediaById(id, fallback) {
  const record = mediaMap[id]
  if (!record) return missingMedia(id, fallback)
  return Object.assign({}, record, {
    thumbnailUrl: resolveMediaUrl(record.thumbnailUrl),
    imageUrl: resolveMediaUrl(record.imageUrl),
    galleryUrls: (record.galleryUrls || []).map(resolveMediaUrl).filter(Boolean)
  })
}

module.exports = { curatedMediaCatalog, syncedMediaCatalog, mediaCatalog, getMediaById, missingMedia }
