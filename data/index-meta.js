const indexMeta = {
  periodCount: 29,
  eventCount: 61,
  creatureCount: 110,
  heroMediaId: 'hero-earth-blue-marble'
}

const categories = [
  { id: 'timeline', icon: '↧', name: '生命演化', copy: '沿61个关键事件穿越深时间' },
  { id: 'creatures', icon: '✦', name: '古生物图鉴', copy: '筛选110种古老生命' },
  { id: 'extinctions', icon: '⚠', name: '五次大灭绝', copy: '理解危机后的生态重组' },
  { id: 'human', icon: '⌁', name: '人类演化', copy: '工具、迁徙与文化网络' }
]

const featuredEvents = [
  { id: 'earth-formation', title: '地球形成', displayTime: '约45.4亿年前', category: '行星形成', summary: '尘埃与岩石不断碰撞、吸积，年轻的地球逐渐成形。', mediaId: 'event-earth-formation', color: '#e6a15f' },
  { id: 'great-oxidation', title: '大氧化事件', displayTime: '约24亿年前开始', category: '行星转折', summary: '游离氧增加，永久改变了地球表面环境。', mediaId: 'event-great-oxidation', color: '#62c3ae' },
  { id: 'cambrian-explosion', title: '寒武纪生命大爆发', displayTime: '约5.388亿年前开始', category: '动物演化', summary: '动物体型、取食方式与生态关系迅速多样化。', mediaId: 'event-cambrian-explosion', color: '#7fcf8f' },
  { id: 'first-tetrapods', title: '脊椎动物走上陆地', displayTime: '约3.75亿年前', category: '动物登陆', summary: '肉鳍鱼类的一些结构逐渐适应浅水与陆地。', mediaId: 'event-first-tetrapods', color: '#7fcf8f' },
  { id: 'permian-extinction', title: '二叠纪末大灭绝', displayTime: '约2.519亿年前', category: '大灭绝', summary: '已知最严重的生物危机重组了海陆生态系统。', mediaId: 'event-permian-extinction', color: '#d16e4d' },
  { id: 'modern-ai', title: '现代人工智能走向大众', displayTime: '2022年至今', category: '正在发生', summary: '生成式AI开始参与写作、编程、图像与科学工作。', mediaId: 'event-modern-ai', color: '#7da8ef' }
]

const massExtinctions = [
  { id: 'ordovician', title: '奥陶纪末', time: '约4.438亿年前', copy: '冰期、海退与海洋环境变化共同施压。' },
  { id: 'devonian', title: '晚泥盆世', time: '约3.72亿—3.59亿年前', copy: '多阶段缺氧与气候变化重创海洋生态。' },
  { id: 'permian', title: '二叠纪末', time: '约2.519亿年前', copy: '火山活动、增温、酸化与缺氧形成连锁危机。' },
  { id: 'triassic', title: '三叠纪末', time: '约2.014亿年前', copy: '大规模火山活动与碳循环扰动改变生态格局。' },
  { id: 'paleocene', title: '白垩纪末', time: '约6600万年前', copy: '小行星撞击触发全球环境突变。' }
]

module.exports = { indexMeta, categories, featuredEvents, massExtinctions }
