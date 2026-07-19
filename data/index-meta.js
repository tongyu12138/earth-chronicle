// 此文件由 scripts/generate-summaries.js 生成，请勿手工维护重复字段。
const indexMeta = {
  "periodCount": 29,
  "eventCount": 70,
  "creatureCount": 110,
  "quizResultCount": 60,
  "heroMediaId": "hero-earth-blue-marble"
}

const categories = [
  {
    "id": "timeline",
    "icon": "↧",
    "name": "生命演化",
    "copy": "沿70个关键事件穿越深时间"
  },
  {
    "id": "creatures",
    "icon": "✦",
    "name": "古生物图鉴",
    "copy": "筛选110种古老生命"
  },
  {
    "id": "extinctions",
    "icon": "⚠",
    "name": "五次大灭绝",
    "copy": "理解危机后的生态重组"
  },
  {
    "id": "human",
    "icon": "⌁",
    "name": "人类演化",
    "copy": "工具、迁徙与文化网络"
  }
]

const featuredEvents = [
  {
    "id": "earth-formation",
    "title": "地球形成",
    "displayTime": "约45.4亿年前",
    "category": "行星形成",
    "summary": "太阳周围的尘埃与岩石不断碰撞、吸积，年轻的地球逐渐成形。",
    "mediaId": "event-earth-formation",
    "color": "#e6a15f",
    "mediaReady": true
  },
  {
    "id": "great-oxidation",
    "title": "大氧化事件",
    "displayTime": "约24亿年前开始",
    "category": "行星转折",
    "summary": "大气中的游离氧显著增加，地球表面环境发生深刻改变。",
    "mediaId": "event-great-oxidation",
    "color": "#62c3ae",
    "mediaReady": true
  },
  {
    "id": "cambrian-explosion",
    "title": "寒武纪生命大爆发",
    "displayTime": "约5.388亿年前开始",
    "category": "动物演化",
    "summary": "较短的地质时期内，动物体型、取食方式与生态关系迅速多样化。",
    "mediaId": "event-cambrian-explosion",
    "color": "#7fcf8f",
    "mediaReady": true
  },
  {
    "id": "first-tetrapods",
    "title": "脊椎动物走上陆地",
    "displayTime": "约3.75亿年前",
    "category": "动物登陆",
    "summary": "一些肉鳍鱼类的鳍、呼吸和支撑结构逐渐适应浅水与陆地环境。",
    "mediaId": "event-first-tetrapods",
    "color": "#7fcf8f",
    "mediaReady": true
  },
  {
    "id": "permian-extinction",
    "title": "二叠纪末大灭绝",
    "displayTime": "约2.519亿年前",
    "category": "大灭绝",
    "summary": "地球已知最严重的生物灭绝事件重组了海洋和陆地生态系统。",
    "mediaId": "event-permian-extinction",
    "color": "#7fcf8f",
    "mediaReady": true
  },
  {
    "id": "modern-ai",
    "title": "现代人工智能走向大众",
    "displayTime": "公元2022年至今",
    "category": "正在发生",
    "summary": "生成式AI通过自然语言界面进入公众生活，开始参与写作、编程、图像与科学工作。",
    "mediaId": "event-modern-ai",
    "color": "#7da8ef",
    "mediaReady": true
  }
]

const massExtinctions = [
  {
    "id": "ordovician-extinction",
    "periodId": "ordovician",
    "title": "奥陶纪末",
    "time": "约4.438亿年前",
    "copy": "冰期、海退和海洋氧化还原结构变化分阶段冲击了以海洋为主的生态系统。",
    "mediaId": "event-ordovician-extinction",
    "mediaReady": true
  },
  {
    "id": "late-devonian-extinction",
    "periodId": "devonian",
    "title": "晚泥盆世",
    "time": "约3.72亿—3.59亿年前",
    "copy": "多次缺氧和有毒含硫水体扩展，长期削弱礁生态与海洋生物多样性。",
    "mediaId": "event-late-devonian-extinction",
    "mediaReady": true
  },
  {
    "id": "permian-extinction",
    "periodId": "permian",
    "title": "二叠纪末",
    "time": "约2.519亿年前",
    "copy": "地球已知最严重的生物灭绝事件重组了海洋和陆地生态系统。",
    "mediaId": "event-permian-extinction",
    "mediaReady": true
  },
  {
    "id": "triassic-extinction",
    "periodId": "triassic",
    "title": "三叠纪末",
    "time": "约2.014亿年前",
    "copy": "中央大西洋岩浆活动与碳循环突变引发增温、酸化和生态重组。",
    "mediaId": "event-triassic-extinction",
    "mediaReady": true
  },
  {
    "id": "kpg-extinction",
    "periodId": "paleocene",
    "title": "小行星撞击与恐龙灭绝",
    "time": "约6600万年前",
    "copy": "一颗大型小行星撞击地球，非鸟恐龙与众多物种消失。",
    "mediaId": "event-kpg-extinction",
    "mediaReady": true
  }
]

module.exports = { indexMeta, categories, featuredEvents, massExtinctions }
