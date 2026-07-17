const eras = [
  { id: 'precambrian', name: '前寒武纪', englishName: 'Precambrian', range: '约45.4亿—5.388亿年前', color: '#49b6a8', icon: '◉' },
  { id: 'paleozoic', name: '古生代', englishName: 'Paleozoic', range: '约5.388亿—2.519亿年前', color: '#77c88a', icon: '✦' },
  { id: 'mesozoic', name: '中生代', englishName: 'Mesozoic', range: '约2.519亿—6600万年前', color: '#d7ad52', icon: '◆' },
  { id: 'cenozoic', name: '新生代', englishName: 'Cenozoic', range: '约6600万年前—至今', color: '#86b6d8', icon: '❄' },
  { id: 'human-history', name: '人类历史', englishName: 'Human History', range: '约280万年前—至今', color: '#c78b68', icon: '⌁' }
]

function getEraById(id) {
  return eras.find((era) => era.id === id)
}

module.exports = { eras, getEraById }
