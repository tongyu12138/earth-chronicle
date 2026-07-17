const { periods } = require('./periods')
const { creatures } = require('./creatures')
const { events } = require('./events')

const periodImages = periods.map((period) => ({
  id: `period-${period.id}`,
  ownerType: 'period',
  ownerId: period.id,
  suggestedFileName: `period-${period.id}-hero.webp`,
  scene: `${period.name}的代表环境、海陆格局与主要生命，以科学博物馆自然纪录片风格呈现`,
  ratio: '16:9',
  promptZh: `${period.name}环境科学复原，${period.tagline}，深色自然纪录片光线，准确时代植被与生物，不出现跨时代物种，不添加文字，16:9`,
  alt: period.imageAlt,
  suggestedSources: ['Wikimedia Commons', 'Natural History Museum', 'Smithsonian', '经专家复核的自有或AI艺术复原'],
  status: period.image ? 'ready' : 'needed',
  credit: period.imageCredit,
  license: period.imageLicense,
  sourceUrl: period.imageSourceUrl
}))

const creatureImages = creatures.map((creature) => ({
  id: `creature-${creature.id}`,
  ownerType: 'creature',
  ownerId: creature.id,
  suggestedFileName: `creature-${creature.id}.webp`,
  scene: `${creature.nameCn}在${creature.habitat}中的全身科学复原`,
  ratio: '4:3',
  promptZh: `${creature.nameCn}（${creature.scientificName}）科学复原，生活在${creature.habitat}，体型比例可信，避免与不同时代生物混搭，深色博物馆自然纪录片风格，不添加文字，4:3`,
  alt: creature.imageAlt,
  suggestedSources: ['Wikimedia Commons', 'Natural History Museum', 'Smithsonian', '经专家复核的自有或AI艺术复原'],
  status: creature.image ? 'ready' : 'needed',
  credit: creature.imageCredit,
  license: creature.imageLicense,
  sourceUrl: creature.imageSourceUrl
}))

const periodGalleryImages = periods.reduce((items, period) => items.concat(period.gallery.map((galleryItem) => ({
  id: `gallery-${galleryItem.id}`,
  ownerType: 'period-gallery',
  ownerId: period.id,
  suggestedFileName: `period-${period.id}-${galleryItem.kind === '环境复原' ? 'environment' : galleryItem.kind === '化石与地层' ? 'fossil' : 'map'}.webp`,
  scene: `${period.name}的${galleryItem.kind}科学图像`,
  ratio: '4:3',
  promptZh: `${period.name}${galleryItem.kind}，科学博物馆展陈风格，标本或环境时代准确，不混入跨时代生物，不添加文字，4:3`,
  alt: galleryItem.alt,
  suggestedSources: ['Wikimedia Commons', 'Natural History Museum', 'Smithsonian', 'International Commission on Stratigraphy'],
  status: galleryItem.src ? 'ready' : 'needed',
  credit: '', license: '', sourceUrl: ''
}))), [])

const eventImages = events.map((event) => ({
  id: `event-${event.id}`,
  ownerType: 'event',
  ownerId: event.id,
  suggestedFileName: `event-${event.id}.webp`,
  scene: `${event.title}的科学解释图或关键证据图`,
  ratio: '16:9',
  promptZh: `${event.title}科学叙事图，${event.summary}，时代与技术细节准确，自然纪录片或科学博物馆风格，不添加文字，16:9`,
  alt: event.imageAlt,
  suggestedSources: ['事件 sources 字段中的科研机构', 'Wikimedia Commons', '公共领域档案'],
  status: event.image ? 'ready' : 'needed',
  credit: event.imageCredit,
  license: event.imageLicense,
  sourceUrl: event.imageSourceUrl
}))

module.exports = {
  imageManifest: periodImages.concat(periodGalleryImages, eventImages, creatureImages),
  periodImages,
  periodGalleryImages,
  eventImages,
  creatureImages
}
