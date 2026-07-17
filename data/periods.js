const ICS_SOURCE = {
  name: 'International Chronostratigraphic Chart',
  publisher: 'International Commission on Stratigraphy',
  url: 'https://stratigraphy.org/chart/'
}

const HUMAN_SOURCE = {
  name: 'Human Evolution Evidence',
  publisher: 'Smithsonian Human Origins Program',
  url: 'https://humanorigins.si.edu/evidence'
}

function galleryFor(id, name) {
  return [
    { id: `${id}-environment`, src: '', kind: '环境复原', alt: `${name}环境艺术复原图占位`, status: 'needed' },
    { id: `${id}-fossil`, src: '', kind: '化石与地层', alt: `${name}代表化石或地层照片占位`, status: 'needed' },
    { id: `${id}-map`, src: '', kind: '古地理', alt: `${name}海陆分布或地图示意图占位`, status: 'needed' }
  ]
}

function makePeriod(data) {
  return Object.assign({
    image: '',
    thumbnail: '',
    imageAlt: `${data.name}环境艺术复原图占位`,
    imageCredit: '',
    imageLicense: '',
    imageSourceUrl: '',
    gallery: galleryFor(data.id, data.name),
    eventIds: [],
    creatureIds: [],
    misconceptions: [],
    evidenceMethods: ['化石与地层对比', '放射性定年', '稳定同位素', '古地磁与计算模型'],
    sources: data.eraId === 'human-history' ? [HUMAN_SOURCE] : [ICS_SOURCE],
    sourceNeeded: false
  }, data)
}

const periods = [
  makePeriod({
    id: 'hadean', name: '冥古宙', englishName: 'Hadean', range: '约45.4亿—40亿年前', parent: '前寒武纪 · 宙', eraId: 'precambrian', color: '#e97b43', accent: '#ffbd71', icon: '◉',
    tagline: '一颗由碰撞、岩浆与冷却共同塑造的年轻行星。',
    overview: '太阳系尘埃盘中的物质通过吸积形成原始地球。早期撞击、内部放射性热和重力分异让地表长期炽热；随着外层冷却，最早的地壳与液态水环境逐步出现。冥古宙保留下来的完整岩石极少，我们主要依靠陨石、月球样本和古老锆石重建这段历史。',
    environment: { continents: '尚无现代意义上的大陆，可能存在短暂而不断被改造的原始地壳。', climate: '早期极热，之后总体冷却；局部条件与变化速度仍有较大不确定性。', oxygen: '几乎没有游离氧，早期大气与今天完全不同。', ocean: '古老锆石提示至少约44亿年前可能已有液态水，但海洋形成过程仍在研究。', tectonics: '撞击、岩浆洋冷却和内部形成主导，现代式板块构造是否已启动存在争论。', ice: '没有可靠证据显示存在全球性冰期。', modernDifference: '没有可呼吸空气、稳定大陆或已确认生命，天空和海洋化学也与现代完全不同。' },
    livingHere: '你首先面对的不是恐龙，而是高温、强烈火山活动、频繁撞击与不可呼吸的大气。连“找一块稳定陆地搭帐篷”都可能是奢望。',
    misconceptions: ['冥古宙并非四十多亿年都覆盖着同一个全球岩浆海；它经历了长期而复杂的冷却。', '早期地球也不是始终没有液态水，古老锆石为很早的水—岩作用提供了线索。'],
    evidenceMethods: ['陨石和月球样本放射性定年', '古老锆石中的铀—铅年龄与氧同位素', '行星形成数值模型', '月球撞击记录'],
    eventIds: ['earth-formation', 'moon-formation', 'first-oceans']
  }),
  makePeriod({
    id: 'archean', name: '太古宙', englishName: 'Archean', range: '约40亿—25亿年前', parent: '前寒武纪 · 宙', eraId: 'precambrian', color: '#2d8c88', accent: '#76d3bb', icon: '≈',
    tagline: '海洋、古老大陆核与最早生命证据共同出现。',
    overview: '地球外层逐渐稳定，古老克拉通和海洋环境形成。微体化石、叠层石与同位素异常提示生命至少在约37亿至35亿年前已经存在。产氧光合作用后来出现，但新产生的氧先被海洋和岩石中的还原物质大量消耗。',
    environment: { continents: '分散的小型大陆核和火山岛弧逐渐增生，尚未形成今天的大陆格局。', climate: '年轻太阳较暗，但温室气体可能帮助维持液态海洋；具体温度范围不确定。', oxygen: '大气游离氧极低，局部浅海可能出现短暂“氧气绿洲”。', ocean: '广阔海洋富含溶解铁，化学环境普遍缺氧。', tectonics: '早期地壳循环活跃，现代式板块俯冲何时全面建立仍有争议。', ice: '存在局部冰川线索，但全球背景仍不清晰。', modernDifference: '没有动物、植物和富氧空气，主要生态过程由微生物驱动。' },
    livingHere: '肉眼几乎看不到“野生动物”。最值得参观的是微生物席和叠层石，但你必须带着独立供氧系统，因为空气完全不适合人类。',
    misconceptions: ['最早生命证据不等同于找到一个公认的“第一个生命个体”。', '产氧光合作用出现后，大气氧并没有立刻升到现代水平。'],
    eventIds: ['early-tectonics', 'earliest-life', 'oxygenic-photosynthesis'],
    creatureIds: ['stromatolite-builders', 'cyanobacteria', 'methanogen']
  }),
  makePeriod({
    id: 'proterozoic', name: '元古宙', englishName: 'Proterozoic', range: '约25亿—5.388亿年前', parent: '前寒武纪 · 宙', eraId: 'precambrian', color: '#4f91b8', accent: '#9fe2e4', icon: '✧',
    tagline: '氧气、真核细胞、全球冰期与大型多细胞生命登场。',
    overview: '大氧化事件永久改变了地表化学，真核细胞与复杂多细胞生命逐步演化。新元古代经历多次强烈冰期，之后埃迪卡拉生物群展示了动物早期演化的复杂实验。这个宙跨越近二十亿年，内部差异远大于一张卡片能够概括的程度。',
    environment: { continents: '多个超大陆经历聚合与裂解，罗迪尼亚等重组改变海洋环流。', climate: '总体经历长时间变化，新元古代至少发生多次极端冰期。', oxygen: '在大氧化事件后显著增加，但仍多次波动，远非持续线性上升。', ocean: '深海长期可能缺氧或含硫，浅海氧化条件逐渐扩展。', tectonics: '成熟的板块循环、造山与大陆裂解持续重塑地表。', ice: '存在“雪球地球”或近似全球冰封阶段，冰覆盖范围仍有模型争议。', modernDifference: '动物生态系统尚未达到显生宙的复杂度，大气和深海含氧状态也不同。' },
    livingHere: '你可能先经历漫长而安静的微生物世界，再突然来到冰封纬度，最后在埃迪卡拉浅海遇见像叶片、被子和软垫一样的生物。请不要问它们是不是水母，分类没那么简单。',
    misconceptions: ['埃迪卡拉生物并不都能直接归入现代动物门类。', '“雪球地球”并不意味着所有研究者都认同海洋每一处都被同样厚的冰覆盖。'],
    eventIds: ['great-oxidation', 'first-eukaryotes', 'snowball-earth', 'ediacaran-animals'],
    creatureIds: ['grypania', 'charnia', 'dickinsonia', 'kimberella', 'spriggina', 'cyanobacteria']
  }),
  makePeriod({
    id: 'cambrian', name: '寒武纪', englishName: 'Cambrian', range: '约5.388亿—4.854亿年前', parent: '显生宙 · 古生代 · 纪', eraId: 'paleozoic', color: '#28a4a2', accent: '#8ee6cc', icon: '✺',
    tagline: '海洋生态系统的身体结构与捕食关系快速扩展。',
    overview: '寒武纪生命大爆发不是生命突然从无到有，而是动物身体结构、运动方式、硬质骨骼与生态互动在地质记录中快速多样化。保存软组织的特殊化石库让我们看见大量外形奇特的动物。',
    environment: { continents: '大陆分散，大片浅海覆盖大陆边缘。', climate: '总体温暖，南北极长期冰盖不显著。', oxygen: '较前寒武纪提高，但海洋含氧分布不均。', ocean: '浅海广阔，碳酸盐台地和泥质海底孕育多样生态。', tectonics: '大陆漂移与海平面变化创造大量浅海栖息地。', ice: '没有明确的长期大型大陆冰盖。', modernDifference: '陆地几乎没有复杂植被，视觉焦点完全在海中。' },
    livingHere: '潜水会像进入一次“身体设计发布会”：有带柄眼睛、五只眼睛、叶片状鳃和装甲。奇怪不等于失败，其中不少结构后来延续了数亿年。',
    misconceptions: ['寒武纪大爆发持续了数千万年，不是一天内发生。', '奇虾不是现代虾，怪诞虫也不是一场复原错误的笑话。'],
    eventIds: ['cambrian-explosion'],
    creatureIds: ['anomalocaris', 'opabinia', 'hallucigenia', 'wiwaxia', 'marrella', 'pikaia', 'haikouichthys', 'olenoides']
  }),
  makePeriod({
    id: 'ordovician', name: '奥陶纪', englishName: 'Ordovician', range: '约4.854亿—4.438亿年前', parent: '显生宙 · 古生代 · 纪', eraId: 'paleozoic', color: '#378fa8', accent: '#8fcbd8', icon: '≋',
    tagline: '海洋生物大辐射，最早陆生植物留下微小痕迹。',
    overview: '海洋无脊椎动物的类群和生态角色显著增加，礁体、滤食者和游泳捕食者共同扩展。最早陆生植物证据可能来自微小孢子。纪末冰期与海退触发了五次大灭绝中的第一次。',
    environment: { continents: '冈瓦纳向南极移动，其他大陆分散，浅海广布。', climate: '早期温暖，晚期出现明显冷却和冰期。', oxygen: '大气氧逐步变化，海洋底层仍常缺氧。', ocean: '海平面一度很高，晚期冰川增长引发显著海退。', tectonics: '洋盆闭合和造山作用影响海洋通道。', ice: '晚奥陶世冈瓦纳出现大陆冰盖。', modernDifference: '陆地仍近乎裸露，复杂生态主要位于海洋。' },
    livingHere: '海中很热闹，陆地却像一大片没有树林的石质空场。若你待到纪末，海平面下降和海水含氧变化会让旅程迅速从观光变成生存挑战。',
    misconceptions: ['奥陶纪末大灭绝不是一次瞬间事件，而包含多个环境压力阶段。'],
    eventIds: ['land-plants'],
    creatureIds: ['aegirocassis', 'isotelus', 'endoceras', 'sacabambaspis', 'arandaspis', 'cameroceras']
  }),
  makePeriod({
    id: 'silurian', name: '志留纪', englishName: 'Silurian', range: '约4.438亿—4.192亿年前', parent: '显生宙 · 古生代 · 纪', eraId: 'paleozoic', color: '#3b9b78', accent: '#9cd69b', icon: '♒',
    tagline: '海洋生态恢复，有颌鱼和陆地生态的先驱扩展。',
    overview: '奥陶纪末危机之后，礁生态恢复，早期有颌鱼类和大型海蝎出现。简单维管植物和节肢动物开始在陆地建立更持续的生态网络，但陆地仍远非现代森林。',
    environment: { continents: '劳伦大陆等低纬陆块与冈瓦纳之间仍有广阔海洋。', climate: '冰期消退后总体转暖，海平面回升。', oxygen: '大气氧逐步增加，但估算范围较宽。', ocean: '浅海礁体恢复，局部缺氧事件仍会发生。', tectonics: '大陆碰撞推动造山，海岸和浅海环境不断改变。', ice: '早期仍受晚奥陶世冰期余波影响，随后减弱。', modernDifference: '陆地植物矮小，真正高大的森林尚未出现。' },
    livingHere: '你能看到矮小植物沿潮湿地面扩张，也可能在水边遇到海蝎。它们不是“真正的蝎子掉进海里”，而是另一支节肢动物。',
    misconceptions: ['海蝎不是现代蝎子的海洋版本。', '第一批维管植物并没有立刻形成森林。'],
    creatureIds: ['eurypterus', 'pterygotus', 'cooksonia', 'birkenia', 'cephalaspis', 'brontoscorpio']
  }),
  makePeriod({
    id: 'devonian', name: '泥盆纪', englishName: 'Devonian', range: '约4.192亿—3.589亿年前', parent: '显生宙 · 古生代 · 纪', eraId: 'paleozoic', color: '#5a8f65', accent: '#b8c96f', icon: '◇',
    tagline: '鱼类多样化，森林成长，脊椎动物开始探索陆地。',
    overview: '泥盆纪常被称为“鱼类时代”，但同样重要的是树木和森林改变了土壤、河流与碳循环。肉鳍鱼支系中出现了具备浅水支撑和呼吸适应的形态，四足动物演化逐步展开。纪末经历长期而多阶段的生物危机。',
    environment: { continents: '欧美大陆形成，冈瓦纳占据南方，内陆河湖和浅海广泛。', climate: '前期温暖，晚期出现冷却与强烈波动。', oxygen: '陆地植物扩张影响氧与碳循环，数值估计存在差异。', ocean: '礁生态繁盛，晚期多次缺氧事件重创海洋。', tectonics: '造山、盆地形成和大陆位置变化塑造多样水域。', ice: '晚期可能出现冰川增长。', modernDifference: '森林结构和现代不同，陆地脊椎动物仍与水域紧密相连。' },
    livingHere: '河口可能有装甲鱼和早期四足形动物，陆上则是没有花朵和草坪的森林。别把提塔利克当作某条鱼突然决定“上岸进化”，它代表的是漫长支系变化中的一组过渡特征。',
    misconceptions: ['提塔利克不是所有四足动物的已确认直接祖先。', '“鱼类时代”不代表当时只有鱼类值得关注。'],
    eventIds: ['first-tetrapods'],
    creatureIds: ['dunkleosteus', 'tiktaalik', 'bothriolepis', 'cladoselache', 'ichthyostega', 'eusthenopteron']
  }),
  makePeriod({
    id: 'carboniferous', name: '石炭纪', englishName: 'Carboniferous', range: '约3.589亿—2.989亿年前', parent: '显生宙 · 古生代 · 纪', eraId: 'paleozoic', color: '#477c59', accent: '#91c56f', icon: '♧',
    tagline: '煤沼森林、较高氧气与羊膜动物的新机会。',
    overview: '热带湿地森林积累大量有机质，后经埋藏转化形成许多煤层。大气氧在部分阶段较高，有利于大型节肢动物的呼吸。羊膜卵让部分脊椎动物的繁殖不再必须回到开放水体。',
    environment: { continents: '大陆逐步聚合成盘古大陆，赤道地区遍布低地湿地。', climate: '热带湿润与后期干旱化并存，南方冈瓦纳有冰川。', oxygen: '部分阶段高于现代，但具体峰值和时空差异仍在研究。', ocean: '浅海与三角洲反复进退，形成复杂沉积旋回。', tectonics: '大陆碰撞造山，盆地沉降保存厚煤层。', ice: '南半球存在长期冰期并多次进退。', modernDifference: '森林由石松、木贼与蕨类亲属主导，没有现代开花植物。' },
    livingHere: '高湿度、密集沼泽和巨型节肢动物会比“有没有恐龙”更值得担心——恐龙还没出现。你的防蚊喷雾对翼展巨大的古老昆虫亲属大概也没有产品说明。',
    misconceptions: ['节肢动物变大不只由氧气单一决定。', '石炭纪森林不是现代雨林简单放大。'],
    eventIds: ['carboniferous-forests', 'amniotic-egg'],
    creatureIds: ['arthropleura', 'meganeura', 'hylonomus', 'pulmonoscorpius', 'eogyrinus', 'megalichthys']
  }),
  makePeriod({
    id: 'permian', name: '二叠纪', englishName: 'Permian', range: '约2.989亿—2.519亿年前', parent: '显生宙 · 古生代 · 纪', eraId: 'paleozoic', color: '#9a6b46', accent: '#d49d64', icon: '△',
    tagline: '盘古大陆内部趋于干旱，合弓动物多样化，末期迎来最大生物危机。',
    overview: '几乎所有主要大陆聚合为盘古大陆，广阔内陆更干旱且季节性强。包括异齿龙、丽齿兽类与二齿兽类在内的合弓动物占据重要生态角色。二叠纪末，大规模火山活动、增温、海洋酸化与缺氧等连锁压力导致最严重的已知大灭绝。',
    environment: { continents: '盘古大陆形成，内陆远离海洋。', climate: '大陆内部干旱、温差大，晚期快速增温。', oxygen: '较石炭纪下降，海洋含氧状况在末期严重恶化。', ocean: '超级海洋包围盘古大陆，末期广泛缺氧并发生化学改变。', tectonics: '大陆碰撞和西伯利亚大火成岩省活动显著。', ice: '早期仍有冰川，之后总体消退。', modernDifference: '没有恐龙，陆地大型脊椎动物主要属于更早的合弓动物和爬行动物支系。' },
    livingHere: '异齿龙背着帆，但它不是恐龙；水龙兽外表不抢镜，却在灾后世界拥有惊人的存在感。若你赶上纪末，真正的对手是全球环境系统的连锁失稳。',
    misconceptions: ['异齿龙不是恐龙，而是合弓动物。', '二叠纪末危机不能只归因于“火山喷发当场烧死动物”。'],
    eventIds: ['permian-extinction'],
    creatureIds: ['edaphosaurus', 'dimetrodon', 'inostrancevia', 'scutosaurus', 'lystrosaurus', 'mesosaurus']
  }),
  makePeriod({
    id: 'triassic', name: '三叠纪', englishName: 'Triassic', range: '约2.519亿—2.014亿年前', parent: '显生宙 · 中生代 · 纪', eraId: 'mesozoic', color: '#b36c45', accent: '#e4a45f', icon: '▲',
    tagline: '大灭绝后的恢复世界，恐龙与哺乳动物支系早期成员出现。',
    overview: '二叠纪末危机之后，生态系统经历漫长恢复。主龙类、海生爬行动物、早期恐龙和哺乳形类共同出现，但恐龙并非从纪初就占据全部陆地。纪末又一次大灭绝为侏罗纪恐龙扩张创造生态空间。',
    environment: { continents: '盘古大陆仍大体连在一起，内陆面积巨大。', climate: '总体温暖干旱，季风强烈，极区无持久大冰盖。', oxygen: '经历危机后的变化，估算存在不确定性。', ocean: '特提斯洋及大陆边缘海孕育恢复中的生态系统。', tectonics: '盘古大陆开始裂解，大西洋前身逐步形成。', ice: '没有明确长期极地冰盖。', modernDifference: '大陆连成大片，沙漠广阔；恐龙只是多类主龙形动物中的一支。' },
    livingHere: '不要一落地就寻找霸王龙，它要晚一亿多年才出现。你更可能看到体型不大的早期恐龙、植食性蜥脚形类，以及外形更像“主角”的非恐龙主龙。',
    misconceptions: ['三叠纪并不是恐龙从开场就统治全球。', '诺托龙和鱼龙等海生爬行动物不是海洋恐龙。'],
    eventIds: ['first-dinosaurs', 'first-mammals'],
    creatureIds: ['coelophysis', 'plateosaurus', 'herrerasaurus', 'postosuchus', 'nothosaurus', 'shonisaurus']
  }),
  makePeriod({
    id: 'jurassic', name: '侏罗纪', englishName: 'Jurassic', range: '约2.014亿—1.45亿年前', parent: '显生宙 · 中生代 · 纪', eraId: 'mesozoic', color: '#9a9345', accent: '#d8c86b', icon: '✦',
    tagline: '大型蜥脚类繁盛，鸟类支系在有羽毛恐龙中出现。',
    overview: '盘古大陆持续裂解，温暖气候与广阔植被支撑大型植食性恐龙。兽脚类捕食者、装甲恐龙和海生爬行动物多样化。保存羽毛和骨骼细节的化石揭示鸟类源自小型兽脚类恐龙。',
    environment: { continents: '盘古大陆分成劳亚与冈瓦纳，新的海盆逐渐扩张。', climate: '总体温暖湿润，区域季节性明显。', oxygen: '大气组成变化，但不宜用单一精确值概括整个纪。', ocean: '浅海扩展，鱼龙、蛇颈龙等海生爬行动物繁盛。', tectonics: '大陆裂谷与海底扩张持续。', ice: '没有持久的大型极地冰盖证据。', modernDifference: '没有草原和现代花卉景观，裸子植物和蕨类构成主要植被。' },
    livingHere: '地面会被蜥脚类的脚步震动，天空可能有翼龙，海里则是另一批爬行动物。三者都很醒目，但“会飞或会游的都是恐龙”仍然不对。',
    misconceptions: ['翼龙不是恐龙。', '鱼龙、蛇颈龙等海生爬行动物不是海洋恐龙。', '始祖鸟具有鸟类和非鸟恐龙共享、镶嵌的特征。'],
    eventIds: ['dinosaur-to-birds'],
    creatureIds: ['stegosaurus', 'diplodocus', 'allosaurus', 'archaeopteryx', 'liopleurodon', 'ichthyosaurus', 'brachiosaurus']
  }),
  makePeriod({
    id: 'cretaceous', name: '白垩纪', englishName: 'Cretaceous', range: '约1.45亿—6600万年前', parent: '显生宙 · 中生代 · 纪', eraId: 'mesozoic', color: '#648b4e', accent: '#b8c85c', icon: '✸',
    tagline: '开花植物扩张，恐龙生态高度多样，纪末撞击重置世界。',
    overview: '大陆继续分离，海平面较高，开花植物与昆虫共同重塑陆地生态。霸王龙、三角龙等知名动物只生活在白垩纪很晚阶段和特定地区。约6600万年前的小行星撞击叠加其他环境压力，导致非鸟恐龙等类群灭绝。',
    environment: { continents: '大陆轮廓逐渐接近现代，但海峡与内海分布不同。', climate: '总体温暖，晚期出现长期变化与区域差异。', oxygen: '存在长期波动，不应用一个数值代表整个白垩纪。', ocean: '海平面较高，大陆内海广布；部分阶段出现海洋缺氧事件。', tectonics: '海底扩张旺盛，火山活动与造山持续。', ice: '多数时期缺少持久大型冰盖。', modernDifference: '开花植物已扩张，但生态组成与现代仍不同，鸟类只是恐龙的一支幸存者。' },
    livingHere: '你在北美晚白垩世可能遇到霸王龙和三角龙，但不会撞见侏罗纪的剑龙。古生物也有严格的“上下班时代”，电影混搭不等于真实共存。',
    misconceptions: ['霸王龙和剑龙相隔的时间，比霸王龙与现代人之间还更长。', '鸟类属于恐龙支系，因此不能笼统说“恐龙全部灭绝”。'],
    eventIds: ['flowering-plants'],
    creatureIds: ['tyrannosaurus', 'triceratops', 'ankylosaurus', 'velociraptor', 'spinosaurus', 'parasaurolophus', 'deinonychus', 'quetzalcoatlus', 'mosasaurus', 'scaphites']
  }),
  makePeriod({
    id: 'paleocene', name: '古新世', englishName: 'Paleocene', range: '约6600万—5600万年前', parent: '显生宙 · 新生代 · 古近纪 · 世', eraId: 'cenozoic', color: '#799560', accent: '#b4c987', icon: '❖',
    tagline: '撞击后的恢复期，哺乳动物与鸟类进入空出的生态空间。',
    overview: '非鸟恐龙灭绝后，陆地生态系统重新组织。哺乳动物总体仍多为小型至中型，但体型和生态角色快速扩展；大型不会飞鸟类与爬行动物也占据重要位置。纪末的古新世—始新世极热事件带来快速全球增温。',
    environment: { continents: '大陆继续漂移，北大西洋尚在扩张。', climate: '整体温暖，并在末期快速升温。', oxygen: '接近新生代背景，变化不是本时期最显著特征。', ocean: '海洋环流重组，末期酸化和变暖明显。', tectonics: '印度向亚洲靠近，北大西洋火成活动增强。', ice: '极区缺少持久大型冰盖。', modernDifference: '森林可延伸到很高纬度，现代草原生态尚未建立。' },
    livingHere: '这是一个“生态职位重新招聘”的时代。哺乳动物并非第二天就全部变巨大，而是在数百万年里试出各种体型和生活方式。',
    misconceptions: ['哺乳动物不是在恐龙灭绝后才首次出现，它们在中生代已经存在。'],
    eventIds: ['kpg-extinction'],
    creatureIds: ['titanoboa', 'gastornis', 'purgatorius', 'champsosaurus', 'coryphodon', 'carpolestes']
  }),
  makePeriod({
    id: 'eocene', name: '始新世', englishName: 'Eocene', range: '约5600万—3390万年前', parent: '显生宙 · 新生代 · 古近纪 · 世', eraId: 'cenozoic', color: '#6b9b78', accent: '#9ed0a9', icon: '≈',
    tagline: '温暖世界中的哺乳动物辐射，鲸类完成重返海洋的重要阶段。',
    overview: '始新世早期极其温暖，森林覆盖高纬地区。灵长类、奇蹄类和偶蹄类早期成员多样化；鲸类祖先从陆生偶蹄类近亲逐步演化为完全水生动物。晚期气候冷却，为南极冰盖形成铺路。',
    environment: { continents: '印度与亚洲碰撞推进，澳大利亚和南极逐渐分离。', climate: '早期温室气候显著，晚期逐步冷却。', oxygen: '接近新生代常见范围，区域环境仍不同。', ocean: '海峡开启改变洋流，晚期冷却加强。', tectonics: '喜马拉雅造山起步，洋盆与海峡重组。', ice: '早期几乎无大型冰盖，末期南极冰川开始发展。', modernDifference: '高纬度更温暖，鲸类仍能展示从有腿到完全水生的一系列形态。' },
    livingHere: '海边可能上演一场持续数百万年的“返海工程”：不是一只陆生动物忽然变成鲸，而是一系列种群在游泳、听觉和繁殖方面逐步适应水域。',
    misconceptions: ['鲸不是由现代河马演化而来；两者共享更早的偶蹄类共同祖先。'],
    eventIds: ['early-primates', 'whale-evolution'],
    creatureIds: ['basilosaurus', 'uintatherium', 'gastornis', 'hyracotherium', 'ambulocetus', 'arsinoitherium']
  }),
  makePeriod({
    id: 'oligocene', name: '渐新世', englishName: 'Oligocene', range: '约3390万—2303万年前', parent: '显生宙 · 新生代 · 古近纪 · 世', eraId: 'cenozoic', color: '#ad8a5c', accent: '#d5b782', icon: '▰',
    tagline: '南极冰盖形成，开放环境扩展，巨型陆生哺乳动物出现。',
    overview: '全球气候较始新世明显冷却，南极大陆冰盖形成并影响海平面。森林在一些地区退缩，较开阔环境扩展。犀类远亲、副巨犀等大型哺乳动物以及多种捕食者活跃在欧亚、非洲和美洲。',
    environment: { continents: '大陆更接近现代位置，但陆桥和海峡仍不同。', climate: '总体冷却、干燥化增强。', oxygen: '大体处于新生代背景范围。', ocean: '南极绕极流逐步建立，全球热量输送改变。', tectonics: '造山和海峡变化影响季风与洋流。', ice: '南极大型冰盖形成并波动。', modernDifference: '草原尚在扩展早期，许多哺乳动物组合与今天不同。' },
    livingHere: '你会看到体型巨大的副巨犀，却找不到它头顶的犀牛角——巨型并不自动附送所有现代亲属特征。',
    misconceptions: ['副巨犀是犀类远亲，但不是简单放大版现代犀牛。'],
    creatureIds: ['paraceratherium', 'hyaenodon', 'entelodon', 'archaeotherium', 'arsinoitherium', 'aegyptopithecus']
  }),
  makePeriod({
    id: 'miocene', name: '中新世', englishName: 'Miocene', range: '约2303万—533万年前', parent: '显生宙 · 新生代 · 新近纪 · 世', eraId: 'cenozoic', color: '#b17a4c', accent: '#d7a467', icon: '⌁',
    tagline: '草原扩展、海洋巨兽活跃，人族支系在非洲出现。',
    overview: '中新世气候先暖后总体冷却，草本植物和开阔生态系统扩张。现代哺乳动物许多科的成员已经出现，海中有巨齿鲨等大型捕食者。约800万至600万年前，人族与黑猩猩支系共享的共同祖先之后发生分化。',
    environment: { continents: '大陆轮廓已较接近现代，山脉持续隆升。', climate: '中期较暖，之后冷却和干旱化增强。', oxygen: '接近现代背景但并非恒定。', ocean: '海洋生产力和上升流变化支撑大型海洋捕食者。', tectonics: '喜马拉雅、安第斯等造山影响环流与降水。', ice: '南极冰盖扩大，北半球晚期趋冷。', modernDifference: '草原扩张但物种组合陌生，早期人族仅出现在非洲。' },
    livingHere: '陆地上快速奔跑和高冠齿变得越来越实用，海里则可能出现巨齿鲨。它不是“超大白鲨”这么简单，而是一支已经灭绝的鲨类。',
    misconceptions: ['人类并不是由现代黑猩猩演化而来；双方共享更早共同祖先。'],
    eventIds: ['hominin-origins'],
    creatureIds: ['megalodon', 'phorusrhacos', 'thylacosmilus', 'deinotherium', 'sivapithecus', 'merychippus']
  }),
  makePeriod({
    id: 'pliocene', name: '上新世', englishName: 'Pliocene', range: '约533万—258万年前', parent: '显生宙 · 新生代 · 新近纪 · 世', eraId: 'cenozoic', color: '#b98d5f', accent: '#dcc391', icon: '⋰',
    tagline: '全球继续冷却，现代生态轮廓加强，南方古猿多样化。',
    overview: '巴拿马地峡闭合重组洋流并促成美洲生物大交换。全球总体冷却，草原和稀树草原广布。非洲的南方古猿表现出多样的两足行走与取食适应，最早石器证据也出现在上新世范围内。',
    environment: { continents: '巴拿马地峡连接南北美洲，多数大陆接近现代位置。', climate: '总体比中新世晚期更冷、更干，波动增强。', oxygen: '大体接近现代范围。', ocean: '海峡闭合重组大西洋和太平洋环流。', tectonics: '地峡形成和山地抬升持续影响气候。', ice: '北半球冰盖在晚期显著发展。', modernDifference: '许多现代属尚未出现，人族只分布在非洲。' },
    livingHere: '你可能在非洲看到南方古猿，在美洲目睹动物通过新形成的陆桥交换地盘。别期待一个整齐的“人类进化阶梯”，当时存在多条并行支系。',
    misconceptions: ['南方古猿不是现代人与黑猩猩之间的“半成品”。', '人类演化更像分枝灌木，而非单线阶梯。'],
    eventIds: ['australopithecus', 'earliest-stone-tools', 'genus-homo'],
    creatureIds: ['thylacosmilus', 'titanis', 'stegodon', 'homotherium', 'macrauchenia', 'australopithecus']
  }),
  makePeriod({
    id: 'pleistocene', name: '更新世', englishName: 'Pleistocene', range: '约258万—1.17万年前', parent: '显生宙 · 新生代 · 第四纪 · 世', eraId: 'cenozoic', color: '#7297b1', accent: '#b6d8e6', icon: '❄',
    tagline: '冰期循环、巨型动物与多支人类共同生活的时代。',
    overview: '更新世经历反复冰期—间冰期循环，海平面和栖息地大幅移动。猛犸象、剑齿虎、巨型地懒等大型动物分布在不同大陆。人属多支成员扩散、使用工具和火，并发生基因交流；智人约30万年前出现。',
    environment: { continents: '冰期低海平面暴露白令陆桥等通道。', climate: '强烈冰期—间冰期循环，变化幅度和速度都很大。', oxygen: '接近现代背景。', ocean: '海平面随冰量大幅升降，洋流随之改变。', tectonics: '大陆位置近现代，构造作用继续塑造山地与盆地。', ice: '北半球大型冰盖反复扩张和退缩。', modernDifference: '巨型动物更丰富，多种人类支系在欧亚非洲相遇。' },
    livingHere: '你需要先查清楚自己在哪个大陆和哪次冰期，因为“更新世套餐”可能是猛犸象草原、澳洲巨兽或南美巨型地懒。人类也不只有一种。',
    misconceptions: ['所有冰河时代动物并没有生活在同一地点和同一时刻。', '尼安德特人不是迟钝的失败者，并与部分智人发生过基因交流。'],
    eventIds: ['early-homo-dispersal', 'controlled-fire', 'neanderthals', 'homo-sapiens'],
    creatureIds: ['woolly-mammoth', 'smilodon', 'megatherium', 'glyptodon', 'doedicurus', 'megaloceros', 'cave-bear', 'dire-wolf', 'thylacoleo', 'diprotodon', 'megalania']
  }),
  makePeriod({
    id: 'holocene', name: '全新世', englishName: 'Holocene', range: '约1.17万年前—至今', parent: '显生宙 · 新生代 · 第四纪 · 世', eraId: 'cenozoic', color: '#6fa3a0', accent: '#b8d9c9', icon: '◎',
    tagline: '相对稳定的间冰期背景中，农业、城市与全球文明扩展。',
    overview: '末次冰期结束后，气候总体进入较温暖的间冰期。不同地区的人群独立或相互影响地发展农业与定居，城市、国家和全球交换网络相继形成。人类活动如今已深刻改变生态与地球化学，但“人类世”尚不是正式批准的地质年代单位。',
    environment: { continents: '现代大陆与海岸线基本形成，冰后海平面上升淹没陆桥。', climate: '总体较稳定但并非恒定，存在区域性干旱、冷暖期与快速事件。', oxygen: '接近现代水平，人为活动显著改变碳循环。', ocean: '现代洋流格局形成，近代承受增温、酸化和污染压力。', tectonics: '构造运动持续，但短期人类活动成为重要地表改造力量。', ice: '格陵兰和南极冰盖保留，高山冰川近代普遍退缩。', modernDifference: '这是我们所处的正式地质世；城市、农业和工业影响覆盖全球。' },
    livingHere: '欢迎回到最熟悉又最不寻常的时期：你可以点外卖、看卫星图，同时生活在一次由单一物种大规模改变地球系统的实验里。',
    misconceptions: ['“人类世”是重要讨论概念，但截至当前并非正式地质年代单位。'],
    eventIds: ['symbolic-culture', 'agriculture', 'first-cities', 'writing', 'paper-making', 'printing-press', 'copernican-revolution', 'steam-engine', 'vaccination', 'natural-selection', 'germ-theory', 'electric-grid', 'modern-physics', 'powered-flight', 'penicillin', 'transistor', 'dna-double-helix', 'sputnik', 'moon-landing', 'microprocessor', 'internet-tcp-ip', 'world-wide-web', 'human-genome', 'smartphone-era', 'crispr', 'deep-learning', 'alphago', 'transformer', 'alphafold', 'modern-ai'],
    creatureIds: ['woolly-mammoth', 'smilodon', 'megatherium', 'glyptodon', 'diprotodon', 'megaloceros']
  }),
  makePeriod({
    id: 'early-homo', name: '早期人属', englishName: 'Early Homo', range: '约280万—30万年前', parent: '人类历史 · 演化篇', eraId: 'human-history', color: '#a87958', accent: '#d6ad80', icon: '⌁',
    tagline: '多个人属物种并存，工具、迁徙与用火逐步发展。', overview: '人属的早期历史不是单一物种接力。不同人群在非洲及欧亚多地生活，脑量、体型、工具技术和食物利用呈镶嵌变化。部分早期人属走出非洲，持续用火的证据也在更新世逐渐清晰。',
    environment: { continents: '大陆接近现代，冰期海平面变化开合迁徙通道。', climate: '干湿与冷暖反复波动，环境不稳定性强。', oxygen: '接近现代水平。', ocean: '海岸资源在部分地区成为重要食物来源。', tectonics: '东非裂谷等地形影响栖息地与化石保存。', ice: '更新世冰期循环影响欧亚扩散。', modernDifference: '没有城市与农业，多支人类在不同环境中并存。' },
    livingHere: '“你是哪一种人”可能真是一道复杂问题。工具并非只属于智人，迁徙也不是一次从起点到终点的单程旅行。', misconceptions: ['石器并不能自动证明制造者一定属于某个特定人种。'],
    eventIds: ['earliest-stone-tools', 'genus-homo', 'early-homo-dispersal', 'controlled-fire', 'neanderthals'], creatureIds: ['australopithecus']
  }),
  makePeriod({
    id: 'hunter-gatherer', name: '狩猎采集与象征文化', englishName: 'Foragers & Symbolic Culture', range: '约30万—1.2万年前', parent: '人类历史 · 文化篇', eraId: 'human-history', color: '#9d6d55', accent: '#d39b77', icon: '✣',
    tagline: '智人扩散，复杂工具、艺术与远距离社会网络不断增加。', overview: '智人在非洲演化形成，并逐步扩散到全球。象征物、颜料、装饰品、洞穴与岩画以及远距离原料交换显示复杂文化实践，但这些行为不是在一个“认知革命日”同时出现。',
    environment: { continents: '低海平面时期陆桥连接部分地区。', climate: '晚更新世气候快速波动。', oxygen: '接近现代水平。', ocean: '海岸、河流与岛屿成为迁徙和食物网络的一部分。', tectonics: '影响较长期，短期生活更受气候与生态控制。', ice: '末次冰期塑造北半球景观。', modernDifference: '人口密度低，没有大规模农业国家，但社会与知识网络已相当复杂。' },
    livingHere: '你的手机会失去信号，但社会生活不会消失：食物分享、长距离交换和精细知识网络，都是抵御环境风险的关键基础设施。', misconceptions: ['狩猎采集者不等于“生活简单”或缺少文化。'],
    eventIds: ['homo-sapiens', 'symbolic-culture']
  }),
  makePeriod({
    id: 'agricultural-revolution', name: '农业革命', englishName: 'Agricultural Transitions', range: '约1.2万年前起', parent: '人类历史 · 社会篇', eraId: 'human-history', color: '#9c824d', accent: '#c9b36d', icon: '✤',
    tagline: '多个地区独立驯化动植物，定居与人口结构随之改变。', overview: '农业不是单一地点的一次发明，而是在西南亚、中国、非洲、美洲和新几内亚等地以不同作物和路径发展。它提高了单位土地可支持人口，却也带来劳动、疾病、营养与不平等方面的复杂代价。',
    environment: { continents: '现代大陆格局。', climate: '全新世早期总体转暖，区域水文变化影响农业选择。', oxygen: '现代背景。', ocean: '沿海资源仍重要，农业社会并非全部远离海洋。', tectonics: '区域灾害影响聚落，但社会变化主要由多因素共同推动。', ice: '冰后海平面上升。', modernDifference: '没有全球统一农业模式，各地作物、家畜和社会组织差异很大。' },
    livingHere: '日程表会突然被播种、收获和储粮占满。农业提供了稳定热量的可能，也把你绑进更密集的劳动和传染病网络。', misconceptions: ['农业并非毫无代价的线性“进步”，也不是全球同时发生。'], eventIds: ['agriculture']
  }),
  makePeriod({
    id: 'first-civilizations', name: '早期城市与文明', englishName: 'First Cities & States', range: '约公元前4000—前800年', parent: '人类历史 · 文明篇', eraId: 'human-history', color: '#a46e4e', accent: '#d6a06f', icon: '▦',
    tagline: '城市、文字、税收、工程与国家组织在多地发展。', overview: '美索不达米亚、埃及、印度河、黄河—长江流域及美洲等地区出现不同形式的城市与复杂政治组织。文字在部分社会服务于记录和治理，但许多复杂社会没有采用同样文字体系。',
    environment: { continents: '现代大陆格局。', climate: '区域干旱、洪水与季风变化影响社会韧性。', oxygen: '现代背景。', ocean: '河流和近海航运连接资源与贸易。', tectonics: '地震与火山可能影响城市，但不能单因果解释文明兴衰。', ice: '高纬冰盖与现代相近背景。', modernDifference: '城市规模和能源基础远小于工业时代，信息主要靠人、动物与书写传递。' },
    livingHere: '你会第一次感到“填表”成为文明核心技能：粮仓、税收、土地和契约都需要记录。文字很伟大，但最早用途不全是诗。', misconceptions: ['“文明”不是对其他生活方式高低排序的科学标签。'], eventIds: ['first-cities', 'writing']
  }),
  makePeriod({
    id: 'classical-civilizations', name: '古典文明', englishName: 'Classical Civilizations', range: '约公元前800—公元500年', parent: '人类历史 · 文明篇', eraId: 'human-history', color: '#b07c58', accent: '#d8b083', icon: '⌂',
    tagline: '大型帝国、城市网络、哲学与跨区域贸易并行发展。', overview: '欧亚、非洲和美洲存在多种古典国家与城市传统。道路、货币、法律、宗教和知识体系扩大跨区域联系，纸张等媒介逐步改变行政和文化传播。用一个单一“古典世界”无法概括各地区经验。',
    environment: { continents: '现代大陆格局。', climate: '区域气候波动影响粮食和政治，但结果取决于社会制度。', oxygen: '现代背景。', ocean: '印度洋、地中海等航路形成重要交换网络。', tectonics: '自然灾害与城市韧性密切相关。', ice: '现代背景。', modernDifference: '信息和运输依赖人力、畜力、帆船及有限机械。' },
    livingHere: '跨洲信息可能需要数月抵达，但贸易网络已经能把香料、金属、纸张和思想送到遥远城市。你的“物流查询”只能问下一支商队。', misconceptions: ['古典时代并不只指希腊和罗马。'], eventIds: ['paper-making']
  }),
  makePeriod({
    id: 'medieval-societies', name: '中世纪社会', englishName: 'Medieval Societies', range: '约公元500—1450年', parent: '人类历史 · 文明篇', eraId: 'human-history', color: '#786f63', accent: '#b4a787', icon: '✥',
    tagline: '跨大陆交流、城市复兴、宗教与知识机构持续变化。', overview: '“中世纪”原本是欧洲分期概念，不应直接覆盖全球。同期中国、伊斯兰世界、南亚、非洲与美洲拥有各自政治和知识传统。农业、贸易、大学、手工业与印刷前技术持续发展，瘟疫也深刻影响人口。',
    environment: { continents: '现代大陆格局。', climate: '存在中世纪气候异常和小冰期前期等区域变化。', oxygen: '现代背景。', ocean: '印度洋等海贸系统连接广阔区域。', tectonics: '灾害影响地方社会。', ice: '高纬冰盖稳定，山地冰川有波动。', modernDifference: '能源仍以生物质、水力、风力和人畜力为主。' },
    livingHere: '别把它想成一千年不开灯的“黑暗时代”。你可能身处繁忙港口、大学、工坊或大都市，知识网络只是没有即时消息提醒。', misconceptions: ['“中世纪=全球黑暗停滞”是欧洲中心且过度简化的叙事。']
  }),
  makePeriod({
    id: 'early-modern', name: '早期现代与全球交流', englishName: 'Early Modern & Global Exchange', range: '约1450—1750年', parent: '人类历史 · 全球篇', eraId: 'human-history', color: '#9f6248', accent: '#d3926b', icon: '✺',
    tagline: '印刷、远洋航行、殖民扩张与科学方法重组世界联系。', overview: '活字印刷在欧洲扩张前，东亚已有悠久印刷传统。远洋航行把原本相对分隔的生态和经济网络更紧密地连接，也带来殖民暴力、强迫劳动、疾病传播与跨大西洋奴隶贸易。近代科学并非单一人物突然“发现真理”，而是仪器、制度和全球知识交换共同作用。',
    environment: { continents: '现代大陆格局。', climate: '小冰期背景带来区域冷期与农业压力。', oxygen: '现代背景。', ocean: '海洋成为全球帝国、贸易和生物交换通道。', tectonics: '航海测量与地理知识快速积累。', ice: '山地冰川在部分地区扩张。', modernDifference: '全球联系快速加强，但尚无化石能源驱动的高速交通。' },
    livingHere: '地图快速更新，书籍加速复制，但全球化的账单也写着疾病、掠夺和强迫迁移。技术扩大了连接，也扩大了权力的不平等。', misconceptions: ['哥伦布交换不是平等互惠的单纯商品交流。'], eventIds: ['printing-press', 'copernican-revolution']
  }),
  makePeriod({
    id: 'industrial-revolution', name: '工业革命', englishName: 'Industrial Revolution', range: '约1750—1914年', parent: '人类历史 · 工业篇', eraId: 'human-history', color: '#806b5d', accent: '#c4865a', icon: '⚙',
    tagline: '化石能源、机械、城市与现代科学共同加速社会变化。', overview: '煤炭、蒸汽机、工厂制度和铁路改变生产与运输，工业化随后以不同路径扩展。电力、公共卫生、疫苗、病原学说和演化理论重塑生活与知识，同时劳工剥削、殖民资源网络和污染成为不可忽略的组成部分。',
    environment: { continents: '现代大陆格局。', climate: '自然波动叠加日益增强的人为温室气体影响。', oxygen: '现代水平，城市空气污染显著。', ocean: '蒸汽船和全球港口加速物质流动。', tectonics: '地质调查服务于矿产与工程。', ice: '工业化开始前后冰川总体经历波动，近代增温影响随后增强。', modernDifference: '能源密度、生产规模与城市人口快速增长。' },
    livingHere: '城市会更亮、更快，也更吵、更脏。蒸汽机不是单独按下的“现代化按钮”，它需要矿山、铁路、资本、劳动与制度共同运转。', misconceptions: ['工业革命不是只由一项发明造成，也不是各地同步发生。'], eventIds: ['steam-engine', 'vaccination', 'natural-selection', 'germ-theory', 'electric-grid']
  }),
  makePeriod({
    id: 'modern-world', name: '现代世界', englishName: 'Modern World', range: '约1914—1947年', parent: '人类历史 · 现代篇', eraId: 'human-history', color: '#65717c', accent: '#9db3c0', icon: '✈',
    tagline: '全球战争、现代物理、航空与医学在剧烈冲突中重塑世界。', overview: '两次世界大战、帝国体系变化和大众政治重构国际秩序。相对论、量子理论、航空、抗生素与广播等技术拓展能力，也被用于前所未有的工业化战争。现代化不是只有光明的发明清单。',
    environment: { continents: '现代大陆格局。', climate: '人为影响继续累积，区域污染增加。', oxygen: '现代水平。', ocean: '远洋航运与战争使海洋高度战略化。', tectonics: '板块构造理论尚在形成前期。', ice: '极地探测增加，长期冰量变化开始被系统记录。', modernDifference: '大众传播和机械化战争扩张，但数字网络尚未建立。' },
    livingHere: '你可能第一次坐上飞机、听广播或使用抗生素，也可能经历总体战。技术能力增长不自动等于社会会更明智地使用它。', misconceptions: ['青霉素不是发现后立刻普及；规模化生产和临床验证花了多年。'], eventIds: ['modern-physics', 'powered-flight', 'penicillin']
  }),
  makePeriod({
    id: 'digital-ai', name: '数字与人工智能时代', englishName: 'Digital & AI Age', range: '1947年—至今', parent: '人类历史 · 数字篇', eraId: 'human-history', color: '#6475d9', accent: '#63d2d6', icon: '⌘',
    tagline: '晶体管把计算压进芯片，网络连接世界，人工智能进入大众工具。', overview: '晶体管、集成电路和微处理器推动计算成本下降，互联网与万维网形成全球信息基础设施。基因组学、航天与可编程基因编辑扩展科学能力。深度学习和基础模型带来广泛应用，但可靠性、偏见、隐私、版权、能耗与治理问题仍在快速演化。',
    environment: { continents: '现代大陆格局。', climate: '人为增温已成为地球系统的主要外部驱动之一。', oxygen: '现代水平，化石能源燃烧显著改变碳循环。', ocean: '增温、酸化、缺氧与塑料污染压力增加。', tectonics: '卫星与传感器可毫米级监测部分地壳运动。', ice: '山地冰川和极地冰量总体下降，区域年际变化叠加其上。', modernDifference: '数字基础设施让信息近乎即时传播，人类技术影响达到全球尺度。' },
    livingHere: '你口袋里的设备远胜早期大型计算机，却也把注意力、位置和选择送入平台系统。AI会写字、识图和调用工具，但流畅输出不等于永远正确。', misconceptions: ['现代AI不是像人一样理解一切的万能大脑。', '“人类世”仍是讨论概念，不应未经说明写成正式地质世。'],
    eventIds: ['transistor', 'dna-double-helix', 'sputnik', 'moon-landing', 'microprocessor', 'internet-tcp-ip', 'world-wide-web', 'human-genome', 'smartphone-era', 'crispr', 'deep-learning', 'alphago', 'transformer', 'alphafold', 'modern-ai']
  })
]

function getPeriodById(id) {
  return periods.find((period) => period.id === id)
}

function getPeriodsByEra(eraId) {
  return periods.filter((period) => period.eraId === eraId)
}

function getPeriodForEvent(eventId) {
  return periods.find((period) => period.eraId === 'human-history' && period.eventIds.includes(eventId)) ||
    periods.find((period) => period.eventIds.includes(eventId))
}

module.exports = { periods, getPeriodById, getPeriodsByEra, getPeriodForEvent, ICS_SOURCE, HUMAN_SOURCE }
