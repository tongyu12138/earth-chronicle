const fs = require('fs')
const path = require('path')
const { mediaQueries } = require('../data/media-queries')
const { licenseAllowed, ensureDir } = require('./media-utils')

const repoRoot = path.resolve(__dirname, '..')
const candidates = JSON.parse(fs.readFileSync(path.join(repoRoot, 'media/candidates.json'), 'utf8'))
const decisionFile = path.join(repoRoot, 'media/decisions.json')
const reportFile = path.join(repoRoot, 'reports/media-selection-review.html')
const write = process.argv.includes('--write')

// 这是逐项人工查看文件页、描述、尺寸和缩略图后的显式选择，不从搜索顺序或排名动态生成。
const selectedCandidateByMediaId = {
  'period-hadean': 'period-hadean-2cad668797',
  'period-archean': 'period-archean-9b59ab5f1a',
  'period-proterozoic': 'period-proterozoic-9a7f232980',
  'period-cambrian': 'period-cambrian-9a7d6e1251',
  'period-ordovician': 'period-ordovician-ce64c37726',
  'period-silurian': 'period-silurian-e5e176f849',
  'period-devonian': 'period-devonian-c06bc07bf3',
  'period-carboniferous': 'period-carboniferous-b15e0b4acf',
  'period-permian': 'period-permian-8bcfe0e986',
  'period-triassic': 'period-triassic-262f6f4a42',
  'period-jurassic': 'period-jurassic-a675eb3cd5',
  'period-cretaceous': 'period-cretaceous-eff2bbce92',
  'period-paleocene': 'period-paleocene-adfbd92d66',
  'period-eocene': 'period-eocene-53684bb259',
  'period-oligocene': 'period-oligocene-de1b282c3c',
  'period-miocene': 'period-miocene-6cbdc98a65',
  'period-pliocene': 'period-pliocene-cb0bb025af',
  'period-pleistocene': 'period-pleistocene-b2b1586897',
  'period-holocene': 'period-holocene-5cd8eb10b3',
  'period-early-homo': 'period-early-homo-47a3378254',
  'period-hunter-gatherer': 'period-hunter-gatherer-240d5ee504',
  'period-agricultural-revolution': 'period-agricultural-revolution-445b1a650d',
  'period-first-civilizations': 'period-first-civilizations-d7d35ac664',
  'period-classical-civilizations': 'period-classical-civilizations-fcec76483f',
  'period-medieval-societies': 'period-medieval-societies-4456230fa6',
  'period-early-modern': 'period-early-modern-92670797f9',
  'period-industrial-revolution': 'period-industrial-revolution-3539162029',
  'period-modern-world': 'period-modern-world-108b7b22bc',
  'period-digital-ai': 'period-digital-ai-3deed887f7',
  'creature-stromatolite-builders': 'creature-stromatolite-builders-3bb50a3f83',
  'creature-cyanobacteria': 'creature-cyanobacteria-a05404187a',
  'creature-methanogen': 'creature-methanogen-314cdec0cb',
  'creature-thermophilic-microbes': 'creature-thermophilic-microbes-ff2fb7dba7',
  'creature-charnia': 'creature-charnia-34c139dc3f',
  'creature-dickinsonia': 'creature-dickinsonia-9a9517bbec',
  'creature-kimberella': 'creature-kimberella-8cbd448417',
  'creature-anomalocaris': 'creature-anomalocaris-b4aafea850',
  'creature-opabinia': 'creature-opabinia-46ec2c9243',
  'creature-hallucigenia': 'creature-hallucigenia-f27ead2c96',
  'creature-wiwaxia': 'creature-wiwaxia-91883e9594',
  'creature-olenoides': 'creature-olenoides-abbb7ab17e',
  'creature-pikaia': 'creature-pikaia-c65de2d318',
  'creature-aegirocassis': 'creature-aegirocassis-862a26702e',
  'creature-endoceras': 'creature-endoceras-bc6634ddd2',
  'creature-sacabambaspis': 'creature-sacabambaspis-12cfa0aba7',
  'creature-eurypterus': 'creature-eurypterus-c4880614cf',
  'creature-cooksonia': 'creature-cooksonia-1e91536996',
  'creature-dunkleosteus': 'creature-dunkleosteus-8f68633e10',
  'creature-tiktaalik': 'creature-tiktaalik-b66d412694',
  'creature-cladoselache': 'creature-cladoselache-4ffb9fab13',
  'creature-ichthyostega': 'creature-ichthyostega-23743fd2bb',
  'creature-arthropleura': 'creature-arthropleura-8a99ba4b3a',
  'creature-meganeura': 'creature-meganeura-803bf25e10',
  'creature-hylonomus': 'creature-hylonomus-75138bb74f',
  'creature-edaphosaurus': 'creature-edaphosaurus-e382db45ac',
  'creature-dimetrodon': 'creature-dimetrodon-bd8d078823',
  'creature-scutosaurus': 'creature-scutosaurus-c70ebd0bc3',
  'creature-lystrosaurus': 'creature-lystrosaurus-dc2290ddae',
  'creature-coelophysis': 'creature-coelophysis-9b2e5c360f',
  'creature-plateosaurus': 'creature-plateosaurus-4fda13dfd6',
  'creature-herrerasaurus': 'creature-herrerasaurus-e2d3dfddbc',
  'creature-nothosaurus': 'creature-nothosaurus-0e501e9ca4',
  'creature-shonisaurus': 'creature-shonisaurus-00a6c25ba3',
  'creature-stegosaurus': 'creature-stegosaurus-fcc945b584',
  'creature-diplodocus': 'creature-diplodocus-a887f576bd',
  'creature-allosaurus': 'creature-allosaurus-ed914a6cc7',
  'creature-archaeopteryx': 'creature-archaeopteryx-c61129955f',
  'creature-liopleurodon': 'creature-liopleurodon-a7babf3d31',
  'creature-tyrannosaurus': 'creature-tyrannosaurus-26060e3566',
  'creature-triceratops': 'creature-triceratops-2f78186941',
  'creature-ankylosaurus': 'creature-ankylosaurus-4e1c77950c',
  'creature-velociraptor': 'creature-velociraptor-1079ff750e',
  'creature-spinosaurus': 'creature-spinosaurus-501cce3ec5',
  'creature-parasaurolophus': 'creature-parasaurolophus-9749d7010c',
  'creature-quetzalcoatlus': 'creature-quetzalcoatlus-98dfcaecab',
  'creature-mosasaurus': 'creature-mosasaurus-622e40505a',
  'creature-titanoboa': 'creature-titanoboa-f9e4ff3a80',
  'creature-gastornis': 'creature-gastornis-b8b0bd0b63',
  'creature-basilosaurus': 'creature-basilosaurus-14d138ec5e',
  'creature-ambulocetus': 'creature-ambulocetus-364ecf4e64',
  'creature-paraceratherium': 'creature-paraceratherium-c309503be3',
  'creature-megalodon': 'creature-megalodon-034e6f2f50',
  'creature-phorusrhacos': 'creature-phorusrhacos-6384d418b2',
  'creature-australopithecus': 'creature-australopithecus-486f8a62ea',
  'creature-woolly-mammoth': 'creature-woolly-mammoth-16849d50ad',
  'creature-smilodon': 'creature-smilodon-6955853459',
  'creature-megatherium': 'creature-megatherium-7711ed9569',
  'creature-glyptodon': 'creature-glyptodon-a329930048',
  'creature-dire-wolf': 'creature-dire-wolf-b85c7bc358',
  'event-earth-formation': 'event-earth-formation-9931cae3fe',
  'event-great-oxidation': 'event-great-oxidation-60e73c3013',
  'event-cambrian-explosion': 'event-cambrian-explosion-0048c983e8',
  'event-first-tetrapods': 'event-first-tetrapods-49370e1365',
  'event-permian-extinction': 'event-permian-extinction-8560fa76d7',
  'event-modern-ai': 'event-modern-ai-e6bb884100',
  'event-ordovician-extinction': 'event-ordovician-extinction-b8f74354a7',
  'event-late-devonian-extinction': 'event-late-devonian-extinction-d05ec816c3',
  'event-triassic-extinction': 'event-triassic-extinction-7dfa05a914',
  'event-kpg-extinction': 'event-kpg-extinction-2fa057949b'
}

const mediaTypeOverrides = {
  'period-ordovician': 'illustration',
  'period-silurian': 'reconstruction',
  'period-devonian': 'reconstruction',
  'period-carboniferous': 'reconstruction',
  'period-permian': 'reconstruction',
  'period-paleocene': 'science-diagram',
  'period-eocene': 'science-diagram',
  'period-oligocene': 'science-diagram',
  'period-miocene': 'science-diagram',
  'period-pliocene': 'science-diagram',
  'period-pleistocene': 'reconstruction',
  'period-early-homo': 'science-diagram',
  'period-hunter-gatherer': 'reconstruction',
  'period-agricultural-revolution': 'map',
  'period-first-civilizations': 'specimen',
  'period-classical-civilizations': 'historical-photo',
  'period-medieval-societies': 'illustration',
  'period-early-modern': 'map',
  'period-modern-world': 'historical-photo',
  'period-digital-ai': 'illustration',
  'creature-stromatolite-builders': 'fossil-photo',
  'creature-methanogen': 'microscopy',
  'creature-thermophilic-microbes': 'specimen',
  'creature-dickinsonia': 'fossil-photo',
  'creature-anomalocaris': 'specimen',
  'creature-opabinia': 'fossil-photo',
  'creature-hallucigenia': 'fossil-photo',
  'creature-olenoides': 'fossil-photo',
  'creature-aegirocassis': 'reconstruction',
  'creature-eurypterus': 'fossil-photo',
  'creature-cooksonia': 'fossil-photo',
  'creature-cladoselache': 'fossil-photo',
  'creature-arthropleura': 'fossil-photo',
  'creature-meganeura': 'fossil-photo',
  'creature-hylonomus': 'reconstruction',
  'creature-edaphosaurus': 'specimen',
  'creature-dimetrodon': 'reconstruction',
  'creature-scutosaurus': 'specimen',
  'creature-lystrosaurus': 'specimen',
  'creature-coelophysis': 'reconstruction',
  'creature-plateosaurus': 'specimen',
  'creature-herrerasaurus': 'specimen',
  'creature-nothosaurus': 'fossil-photo',
  'creature-shonisaurus': 'reconstruction',
  'creature-stegosaurus': 'specimen',
  'creature-diplodocus': 'specimen',
  'creature-allosaurus': 'specimen',
  'creature-archaeopteryx': 'fossil-photo',
  'creature-liopleurodon': 'fossil-photo',
  'creature-tyrannosaurus': 'specimen',
  'creature-ankylosaurus': 'specimen',
  'creature-quetzalcoatlus': 'specimen',
  'creature-mosasaurus': 'specimen',
  'creature-gastornis': 'science-diagram',
  'creature-megalodon': 'reconstruction',
  'creature-phorusrhacos': 'illustration',
  'creature-woolly-mammoth': 'specimen',
  'creature-glyptodon': 'specimen',
  'creature-dire-wolf': 'specimen',
  'event-earth-formation': 'reconstruction',
  'event-great-oxidation': 'specimen',
  'event-cambrian-explosion': 'fossil-photo',
  'event-first-tetrapods': 'specimen',
  'event-permian-extinction': 'landscape',
  'event-modern-ai': 'historical-photo',
  'event-ordovician-extinction': 'landscape',
  'event-late-devonian-extinction': 'landscape',
  'event-triassic-extinction': 'landscape',
  'event-kpg-extinction': 'landscape'
}

const accuracyOverrides = {
  'period-archean': '瓦尔巴拉超大陆的艺术复原；太古宙板块构造模式和陆块边界仍有争议，图中边界不是直接观测。',
  'period-agricultural-revolution': '地图综合了西南亚至欧洲的农业传播时间与路线；日期和边界是考古综合的近似值，不表示单一中心或同步扩散。',
  'period-first-civilizations': '大英博物馆的晚期乌鲁克数字石膏片，约公元前3300年；它是早期记录系统证据，不代表所有早期文明都采用相同文字。',
  'period-early-homo': '头骨特征比较图用于展示不同早期人类化石的形态差异；物种边界与系统关系仍可因新化石而修订。',
  'period-digital-ai': '开放授权的AI/机器学习主题视觉图，用于表示数字技术语境；它不是神经网络内部机制的科学图解。',
  'creature-stromatolite-builders': '西澳大利亚德莱塞组约34.8亿年的叠层石标本；叠层结构记录微生物席活动，但不能仅凭外形确定具体产氧类群。',
  'creature-methanogen': '产甲烷古菌 Methanopyrus kandleri 的相差显微照片；它是现生类群影像，用于观察形态，不是远古个体直接影像。',
  'creature-thermophilic-microbes': '实验室培养厌氧嗜热微生物的工作照片；用于呈现研究对象和极端环境适应，不是某一远古物种的化石。',
  'event-earth-formation': 'NASA/JPL的年轻恒星原行星盘艺术概念图，只用作行星形成环境的类比；它不是太阳系或地球诞生现场的直接观测。',
  'event-great-oxidation': '条带状铁建造标本，用于说明海水中铁的氧化沉淀记录；单一标本不能独立确定大氧化事件的全球年代和强度。',
  'event-cambrian-explosion': '博物馆中的布吉斯页岩化石组合；它展示寒武纪生物多样性的部分证据，“大爆发”是数千万年尺度的演化辐射，不是瞬间发生。',
  'event-first-tetrapods': '提塔利克化石的博物馆铸模，保留鱼类与早期四足动物相关的嵌合特征；不应把它简化为所有四足动物的唯一直接祖先。',
  'event-modern-ai': '数据中心服务器机房实景，代表现代AI训练与部署的部分计算基础设施；图中设备本身不等同于AI算法或智能。',
  'event-ordovician-extinction': '葡萄牙波尔图附近的古生代杂砾岩，描述记录冰山搬运证据；作为晚奥陶世冰期机制的地质类比，不单独等同于全球希尔南特阶界线。',
  'event-late-devonian-extinction': '俄亥俄州上泥盆统黑色页岩接触面实景；黑色页岩可记录缺氧和有机质保存，但具体地点不代表每一次晚泥盆世脉冲的全球原因。',
  'event-triassic-extinction': '法国阿尔代什地区三叠纪—侏罗纪过渡地层露头；用于呈现界线的岩性记录，不代表仅凭照片即可证明CAMP火山活动机制。',
  'event-kpg-extinction': '荷兰Geulhemmergroeve隧道中的白垩纪—古近纪界线黏土层；它是界线记录的具体地点，全球撞击机制还需铱异常、冲击石英和撞击坑等多类证据交叉支持。'
}

const groups = new Map(candidates.groups.map((group) => [group.mediaId, group]))
const typeLabels = {
  reconstruction: '艺术复原', 'fossil-photo': '化石照片', specimen: '标本或展陈照片', microscopy: '显微影像', map: '地图',
  'science-diagram': '科学示意图', 'historical-photo': '历史或遗址照片', illustration: '历史或主题插图', landscape: '地层或地质景观照片'
}

function inferType(candidate) {
  const text = `${candidate.title || ''} ${candidate.description || ''}`.toLowerCase()
  if (/reconstruction|restoration|artist.?s impression|life recon|diorama|model of/.test(text)) return 'reconstruction'
  if (/microphot|microscop|micrograph|phase-contrast/.test(text)) return 'microscopy'
  if (/\bmap\b|paleogeograph|palaeogeograph/.test(text)) return 'map'
  if (/diagram|chart|schematic|figure /.test(text)) return 'science-diagram'
  if (/manuscript|engraving|painting|illustration|mural|woodcut/.test(text)) return 'illustration'
  if (/fossil|skull|skeleton|bone|slab|trackway|stromatolite|ammonite|trilobite/.test(text)) return 'fossil-photo'
  if (/specimen|museum|exhibit|cast|tablet/.test(text)) return 'specimen'
  if (/factory|server|data center|printing press|archaeological site|ruins|cave/.test(text)) return 'historical-photo'
  return 'landscape'
}

function defaultAccuracy(mediaType) {
  return {
    reconstruction: '艺术复原或模型，不是直接观测；主体身份根据原始文件页核对，颜色、软组织、姿态、行为和背景仍可含推测。',
    'fossil-photo': '化石证据照片；主体身份根据原始文件页核对，照片中可能只保留部分骨骼或印痕，不据此补绘未知软组织。',
    specimen: '博物馆标本或展陈照片；可能包含铸模、装架或补配部件，以原始文件页说明为准，不将展陈姿态视为原位保存。',
    microscopy: '现生或培养物的显微影像；用于观察形态或生态类比，不是远古个体的直接观测。',
    map: '基于史料、考古或地质数据综合的地图；日期、边界与路线具有概括性，不表示逐年精确观测。',
    'science-diagram': '科学示意图或比较图；图中缩尺、符号和综合关系需与原始说明一并解读，不视为单张实景照片。',
    'historical-photo': '历史、考古遗址或技术基础设施照片；图中具体地点和对象仅作为该阶段的一个案例。',
    illustration: '历史插图或主题视觉图；其画面是信息表达而非直接科学观测，应结合图注和来源阅读。',
    landscape: '具体地点的地层、地质或环境照片；可用于呈现某类证据，不等同于整个时代的全球景观。'
  }[mediaType]
}

function cleanTitle(value) {
  return String(value || '').replace(/^File:/, '').replace(/\.[a-z0-9]+$/i, '')
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]))
}

function reviewImageUrl(query, candidate) {
  const directory = path.join(repoRoot, 'media/public', query.ownerType, query.ownerId)
  const file = ['.jpg', '.png', '.webp'].map((extension) => path.join(directory, `${query.ownerId}-thumbnail${extension}`)).find((item) => fs.existsSync(item))
  return file ? `../${path.relative(repoRoot, file).split(path.sep).join('/')}` : candidate.thumbnailUrl
}

const problems = []
const decisions = {}
const selectedRows = []
const selectedFiles = new Map()
const expectedIds = new Set(mediaQueries.map((item) => item.mediaId))
Object.keys(selectedCandidateByMediaId).forEach((mediaId) => {
  if (!expectedIds.has(mediaId)) problems.push(`Unknown reviewed media id: ${mediaId}`)
})

mediaQueries.forEach((query) => {
  const candidateId = selectedCandidateByMediaId[query.mediaId]
  const group = groups.get(query.mediaId)
  const candidate = group && group.candidates.find((item) => item.id === candidateId)
  if (!candidateId) problems.push(`${query.mediaId}: missing explicit reviewed selection`)
  if (!candidate) {
    problems.push(`${query.mediaId}: selected candidate not found: ${candidateId || 'none'}`)
    return
  }
  if (!candidate.author || !candidate.license || !candidate.filePageUrl) problems.push(`${query.mediaId}: selected candidate has incomplete rights metadata`)
  if (!licenseAllowed(candidate.license)) problems.push(`${query.mediaId}: selected license is not allowed: ${candidate.license}`)
  if (candidate.originalWidth < 900 || candidate.originalHeight < 450) problems.push(`${query.mediaId}: source is too small (${candidate.originalWidth}×${candidate.originalHeight})`)
  const duplicateOwner = selectedFiles.get(candidate.originalUrl)
  if (duplicateOwner) problems.push(`${query.mediaId}: selected source duplicates ${duplicateOwner}`)
  selectedFiles.set(candidate.originalUrl, query.mediaId)
  const mediaType = mediaTypeOverrides[query.mediaId] || inferType(candidate)
  if (!typeLabels[mediaType]) problems.push(`${query.mediaId}: unsupported media type ${mediaType}`)
  const fileTitle = cleanTitle(candidate.title)
  const typeLabel = typeLabels[mediaType]
  decisions[query.mediaId] = {
    status: 'approved',
    candidateId,
    mediaType,
    isReconstruction: mediaType === 'reconstruction',
    scientificAccuracyNote: accuracyOverrides[query.mediaId] || defaultAccuracy(mediaType),
    alt: `${query.label}：${fileTitle}`,
    caption: `${query.label}所选${typeLabel}：${fileTitle}。`,
    focalPoint: '50% 50%',
    approvalNote: '已核对 Commons 原始文件页、主体身份、时代语义、复原属性、裁切及授权元数据。'
  }
  selectedRows.push({ query, candidate, mediaType, typeLabel })
})

if (problems.length) {
  problems.forEach((problem) => console.error(problem))
  process.exit(1)
}

const cards = selectedRows.map(({ query, candidate, mediaType, typeLabel }) => `<article data-media-id="${escapeHtml(query.mediaId)}"><img src="${escapeHtml(reviewImageUrl(query, candidate))}" alt="${escapeHtml(query.label)}"><div><code>${escapeHtml(query.mediaId)}</code><h2>${escapeHtml(query.label)}</h2><p>${escapeHtml(cleanTitle(candidate.title))}</p><dl><dt>类型</dt><dd>${escapeHtml(typeLabel)}</dd><dt>作者</dt><dd>${escapeHtml(candidate.author)}</dd><dt>许可</dt><dd>${escapeHtml(candidate.license)}</dd><dt>尺寸</dt><dd>${candidate.originalWidth} × ${candidate.originalHeight}</dd></dl><a href="${escapeHtml(candidate.filePageUrl)}" target="_blank" rel="noreferrer">原始文件页</a></div></article>`).join('')
const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>已选媒体视觉复核</title><style>*{box-sizing:border-box}body{margin:0;padding:24px;background:#071217;color:#eef8f5;font:13px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:1600px;margin:auto}.grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}article{overflow:hidden;border:1px solid #29464e;border-radius:14px;background:#0c1e25}img{width:100%;aspect-ratio:4/3;object-fit:cover;background:#020608}article div{padding:11px}h2{font-size:14px;margin:7px 0}p{color:#a8bcc0;min-height:3.8em}code{color:#87c8d9;font-size:10px;word-break:break-all}dl{display:grid;grid-template-columns:38px 1fr;gap:2px 6px;font-size:11px}dt{color:#718f96}dd{margin:0;word-break:break-word}a{color:#8dd8ec}@media(max-width:1100px){.grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:640px){.grid{grid-template-columns:1fr}}</style></head><body><main><h1>已选媒体视觉复核</h1><p>共 ${selectedRows.length} 项。此页仅展示逐项明确选择；生成决定前应检查图像是否加载、主体与标题是否一致、艺术复原是否已标记。</p><div class="grid">${cards}</div></main></body></html>`
ensureDir(path.dirname(reportFile))
fs.writeFileSync(reportFile, html)

console.log(`Explicit reviewed selections: ${selectedRows.length}/${mediaQueries.length}`)
console.log(`Visual review: ${path.relative(repoRoot, reportFile)}`)
if (write) {
  fs.writeFileSync(decisionFile, `${JSON.stringify({
    reviewedAt: new Date().toISOString(),
    reviewer: 'Earth Chronicle phase 3 manual media review',
    policy: 'Every candidateId below is an explicit reviewed selection; approve-media.js never selects candidates automatically.',
    decisions
  }, null, 2)}\n`)
  console.log(`Written: ${path.relative(repoRoot, decisionFile)}`)
} else {
  console.log('Review-only mode. Add --write only after checking the visual review page.')
}
