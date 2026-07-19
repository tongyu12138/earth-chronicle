const { getPeriodForEvent } = require('./periods')

const eraMeta = {
  冥古宙: {
    color: '#e6a15f',
    glow: 'rgba(230, 161, 95, 0.18)',
    eraRange: '约45.4亿—40亿年前'
  },
  太古宙: {
    color: '#c9b35f',
    glow: 'rgba(201, 179, 95, 0.18)',
    eraRange: '约40亿—25亿年前'
  },
  元古宙: {
    color: '#62c3ae',
    glow: 'rgba(98, 195, 174, 0.18)',
    eraRange: '约25亿—5.388亿年前'
  },
  古生代: {
    color: '#7fcf8f',
    glow: 'rgba(127, 207, 143, 0.18)',
    eraRange: '约5.388亿—2.519亿年前'
  },
  中生代: {
    color: '#ddbb59',
    glow: 'rgba(221, 187, 89, 0.18)',
    eraRange: '约2.519亿—6600万年前'
  },
  新生代: {
    color: '#e58e6f',
    glow: 'rgba(229, 142, 111, 0.18)',
    eraRange: '约6600万年前—至今'
  },
  人类文明: {
    color: '#d7a0d2',
    glow: 'rgba(215, 160, 210, 0.18)',
    eraRange: '约30万年前—公元1500年'
  },
  近现代: {
    color: '#da8867',
    glow: 'rgba(218, 136, 103, 0.18)',
    eraRange: '公元1500—1945年'
  },
  数字时代: {
    color: '#7da8ef',
    glow: 'rgba(125, 168, 239, 0.18)',
    eraRange: '公元1945年—至今'
  }
}

const eras = [
  { name: '冥古宙', firstEventId: 'earth-formation', color: eraMeta.冥古宙.color },
  { name: '太古宙', firstEventId: 'early-tectonics', color: eraMeta.太古宙.color },
  { name: '元古宙', firstEventId: 'great-oxidation', color: eraMeta.元古宙.color },
  { name: '古生代', firstEventId: 'cambrian-explosion', color: eraMeta.古生代.color },
  { name: '中生代', firstEventId: 'first-dinosaurs', color: eraMeta.中生代.color },
  { name: '新生代', firstEventId: 'kpg-extinction', color: eraMeta.新生代.color },
  { name: '人类文明', firstEventId: 'homo-sapiens', color: eraMeta.人类文明.color },
  { name: '近现代', firstEventId: 'copernican-revolution', color: eraMeta.近现代.color },
  { name: '数字时代', firstEventId: 'transistor', color: eraMeta.数字时代.color }
]

const rawEvents = [
  {
    id: 'earth-formation',
    title: '地球形成',
    displayTime: '约45.4亿年前',
    era: '冥古宙',
    category: '行星形成',
    summary: '太阳周围的尘埃与岩石不断碰撞、吸积，年轻的地球逐渐成形。',
    detail: '太阳系早期是一片围绕年轻太阳旋转的气体和尘埃盘。微小颗粒先黏结成更大的天体，再经过持续碰撞和引力吸积形成原始地球。早期地球温度极高，内部逐渐分异为地核、地幔和地壳。',
    significance: '这是此后全部地质、气候和生命史的起点。地球的质量、轨道位置和内部结构，共同决定了它能够长期保有液态水与大气。',
    dateNote: '地球年龄主要根据陨石、月球样本及地球最古老矿物的放射性定年估算，通常写作约45.4亿年。',
    sources: [
      {
        name: 'Facts About Earth',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/earth/facts/'
      }
    ]
  },
  {
    id: 'moon-formation',
    title: '月球形成',
    displayTime: '约45亿年前',
    era: '冥古宙',
    category: '天体碰撞',
    summary: '一次巨型碰撞把大量物质抛入轨道，碎片最终聚合成月球。',
    detail: '目前占主导地位的解释是“巨型碰撞假说”：一颗火星大小或若干较小的天体撞击年轻地球，抛出的熔融与汽化物质进入轨道，随后聚合成月球。具体碰撞方式仍在研究。',
    significance: '月球稳定了地球自转轴的长期变化，并通过潮汐持续影响海洋与地球自转。它也保存了太阳系早期撞击历史的重要记录。',
    dateNote: '月球形成时间通常估计在太阳系形成后的数千万年内；不同模型和样本定年给出的范围并不完全一致。',
    sources: [
      {
        name: 'Moon Formation',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/moon/formation/'
      }
    ]
  },
  {
    id: 'first-oceans',
    title: '早期海洋出现',
    displayTime: '至少约44亿年前已有液态水证据',
    era: '冥古宙',
    category: '水与气候',
    summary: '地表冷却后，水汽凝结；来自古老锆石的证据表明液态水很早就可能存在。',
    detail: '随着地表逐步冷却，火山释放的水汽能够凝结降落。含水小天体也可能贡献了一部分水。古老锆石的化学特征提示，在地球形成后不久，地壳附近或许已经存在液态水环境。',
    significance: '液态水是已知生命化学反应的重要介质，也参与岩石风化、物质循环与气候调节，使地球逐渐成为可居住行星。',
    dateNote: '早期地球几乎没有完整岩石保存下来，因此“海洋出现”的时间来自间接证据，不能理解为某一年突然形成全球海洋。',
    sources: [
      {
        name: 'What was the Earth like right after it formed?',
        publisher: 'NASA Science / Astrobiology',
        url: 'https://science.nasa.gov/astrobiology/learning-resources/alp/earth-right-after-it-formed/'
      },
      {
        name: 'Ocean Worlds: Water in the Solar System and Beyond',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/solar-system/ocean-worlds/'
      }
    ]
  },
  {
    id: 'early-tectonics',
    title: '大陆地壳与板块循环逐步建立',
    displayTime: '约40亿—25亿年前逐步发展',
    era: '太古宙',
    category: '地球动力学',
    summary: '地球外层逐渐形成能够移动、碰撞和循环的岩石圈，早期大陆开始成长。',
    detail: '地球冷却后形成固态外壳。今天的岩石圈被分成多个板块，它们在地幔缓慢流动和重力作用下移动，在洋中脊生成、在俯冲带返回地幔。早期地球是否已经以完全相同的方式运作仍有争论，但大陆地壳确实在太古宙逐步增长和反复改造。',
    significance: '板块循环调节火山活动、造山、海陆分布和长期碳循环，并把水和其他物质带入地球内部。它是地球能够在数十亿年中持续更新表面环境的重要原因。',
    mechanism: '较热、密度较低的物质上升，冷却后的岩石圈变重并可能下沉；洋壳俯冲、岩浆生成和大陆碰撞共同改造地壳。板块并不是漂浮在液态岩浆海上，而是在大部分为固体、但能在长期压力下缓慢变形的地幔上运动。',
    evidence: '现代证据包括全球地震和火山带的分布、海底磁条带、GPS测得的厘米级板块运动、同龄岩层和化石跨大陆对应。早期板块活动则主要从古老岩石的化学组成、变质压力、锆石和古地磁记录推断。',
    openQuestions: '现代式板块构造究竟何时开始仍无统一答案。研究者讨论早期地球可能经历“停滞盖层”、间歇式俯冲或与今天不同的板块行为。',
    confidence: '现代机制为强共识，早期起始年代有争议',
    misconception: '板块移动的主要图景不是“大陆像木筏漂在岩浆上”。板块包含大陆和海洋岩石圈，下面的地幔总体也是固态，只是在地质时间尺度上能够流动。',
    glossary: [
      { term: '岩石圈', definition: '由地壳和最上部地幔组成的坚硬外层，被分成多个构造板块。' },
      { term: '俯冲', definition: '一个板块在汇聚边界下沉到另一个板块之下并进入地幔的过程。' }
    ],
    dateNote: '这是一个跨越十多亿年的渐进过程，不存在公认的单一“板块构造诞生日”。时间范围强调大陆成长和构造循环逐渐增强。',
    sources: [
      {
        name: 'This Dynamic Earth: The Story of Plate Tectonics',
        publisher: 'U.S. Geological Survey',
        url: 'https://www.usgs.gov/publications/dynamic-earth-story-plate-tectonics'
      },
      {
        name: 'The Interior of the Earth',
        publisher: 'U.S. Geological Survey',
        url: 'https://pubs.usgs.gov/gip/interior/index.html'
      }
    ]
  },
  {
    id: 'earliest-life',
    title: '最早生命证据',
    displayTime: '至少约37亿—35亿年前',
    era: '太古宙',
    category: '生命起源',
    summary: '岩石中的化学信号和微生物结构，留下了早期生命活动的候选证据。',
    detail: '早期生命很可能是结构简单的单细胞生物。科学家通过同位素比例、叠层石和疑似微化石寻找它们的踪迹，但越古老的岩石经历的变质作用越强，证据解释也越困难。',
    significance: '生命的出现把地球历史从单纯的物理化学演化，带入了生物与环境彼此塑造的新阶段。所有后来生物都沿着早期生命建立的遗传与代谢机制演化。',
    dateNote: '不同证据对应约35亿年至更早的年代，其中一些仍有争议。这里采用“至少约37亿—35亿年前”的谨慎表述。',
    sources: [
      {
        name: 'Facts About Earth',
        publisher: 'NASA Science',
        url: 'https://science.nasa.gov/earth/facts/'
      },
      {
        name: 'Geologic Time: The Story of a Changing Earth',
        publisher: 'Smithsonian National Museum of Natural History',
        url: 'https://naturalhistory.si.edu/education/teaching-resources/earth-science/geologic-time'
      }
    ]
  },
  {
    id: 'oxygenic-photosynthesis',
    title: '产氧光合作用演化',
    displayTime: '不晚于约27亿年前',
    era: '太古宙',
    category: '生命与大气',
    summary: '微生物开始利用光能分解水，并把氧气作为副产物释放。',
    detail: '蓝细菌的祖先演化出产氧光合作用，把阳光、二氧化碳和水转化为有机物。早期产生的氧先与海洋和岩石中的还原性物质反应，并未立刻在大气中大量积累。',
    significance: '这一代谢创新最终改变了海洋和大气，为高效的有氧呼吸、复杂细胞和大型生物的出现创造条件。',
    dateNote: '产氧光合作用何时最早出现仍有讨论；地质记录显示，它早于大气氧气的大规模积累。',
    sources: [
      {
        name: 'The Great Oxidation Event: How Cyanobacteria Changed Life',
        publisher: 'Smithsonian Ocean',
        url: 'https://ocean.si.edu/ocean-life/microbes/great-oxidation-event-how-cyanobacteria-changed-life'
      }
    ]
  },
  {
    id: 'great-oxidation',
    title: '大氧化事件',
    displayTime: '约24亿年前开始',
    era: '元古宙',
    category: '行星转折',
    summary: '大气中的游离氧显著增加，地球表面环境发生深刻改变。',
    detail: '产氧微生物持续释放氧气。当海洋和地壳中容易与氧反应的物质逐渐被消耗后，氧开始在大气中积累。这个过程并非一次瞬间事件，而是持续很长时间、并伴随波动的环境转型。',
    significance: '氧气对许多早期厌氧生物有毒，却为有氧呼吸和复杂生命打开了新的能量通道；臭氧层的形成也减弱了地表紫外线。',
    dateNote: '大氧化事件通常指约24亿至21亿年前的大气氧化转变，起止时间会随研究定义而变化。',
    sources: [
      {
        name: 'The Great Oxidation Event: How Cyanobacteria Changed Life',
        publisher: 'Smithsonian Ocean',
        url: 'https://ocean.si.edu/ocean-life/microbes/great-oxidation-event-how-cyanobacteria-changed-life'
      }
    ]
  },
  {
    id: 'first-eukaryotes',
    title: '真核细胞出现',
    displayTime: '至少约18亿年前',
    era: '元古宙',
    category: '细胞演化',
    summary: '具有细胞核和复杂内部结构的细胞，为复杂生命奠定基础。',
    detail: '真核细胞把遗传物质包裹在细胞核中，并拥有复杂的细胞器。线粒体被认为源于一次古老的内共生：一种细菌进入另一细胞后，没有被消化，最终成为稳定的能量生产结构。',
    significance: '真核细胞拥有更复杂的调控和能量系统，后来演化出动物、植物、真菌和多种单细胞生物。',
    dateNote: '真核生物的起源早于能够明确识别的化石记录；约18亿年前已有较可靠的真核化石证据。',
    sources: [
      {
        name: 'The Origin of Eukaryotes',
        publisher: 'Nature Education',
        url: 'https://www.nature.com/scitable/topicpage/the-origin-of-eukaryotes-14311165/'
      }
    ]
  },
  {
    id: 'snowball-earth',
    title: '“雪球地球”冰期',
    displayTime: '约7.2亿—6.35亿年前间歇发生',
    era: '元古宙',
    category: '极端气候',
    summary: '冰川可能一度扩展到低纬度，地球经历接近全球冻结的极端气候。',
    detail: '新元古代至少发生了斯图尔特冰期和马里诺冰期等大规模冰期。低纬度冰川沉积、冰川岩层上方的特殊碳酸盐以及碳同位素异常，支持冰层曾扩展到接近赤道。海洋是否完全封冻，还是保留开阔水域，仍取决于模型和证据解释。',
    significance: '极端冰期改变风化、营养盐与海洋化学。冰退后的环境变化可能与大型多细胞生物扩展有关，但不能简单说“雪球地球直接制造了动物”。',
    mechanism: '冰雪反射阳光，降温会增加冰盖，进一步增强反射并形成正反馈。即使大面积结冰，火山仍释放二氧化碳；当风化吸收二氧化碳的能力下降，温室气体长期累积，最终可能触发快速融冰。',
    evidence: '证据包括古地磁显示的低纬度冰碛岩、冰川沉积之上的“盖帽碳酸盐”、划痕石块和全球碳同位素变化。不同地点的定年帮助把多次冰期分开。',
    openQuestions: '海洋是否真正从赤道到两极完全结冰、冰层下生命如何获得光和养分、融冰与动物演化的因果关系，仍是活跃研究问题。',
    confidence: '大范围低纬度冰川为强证据，完全冻结程度有争议',
    misconception: '“雪球地球”是科学模型的形象名称，不意味着地球一定像光滑雪球一样毫无开水面，也不是持续一亿年的单次冰封。',
    glossary: [
      { term: '冰—反照率反馈', definition: '冰雪增多会反射更多太阳光并促进继续降温的正反馈。' },
      { term: '盖帽碳酸盐', definition: '常覆盖在冰川沉积之上的特殊碳酸盐岩层，记录快速融冰后的海洋化学变化。' }
    ],
    dateNote: '“雪球地球”包含多次冰期。斯图尔特冰期约从7.17亿年前开始，马里诺冰期约在6.35亿年前结束；边界会随定年更新。',
    sources: [
      {
        name: 'International Chronostratigraphic Chart',
        publisher: 'International Commission on Stratigraphy',
        url: 'https://stratigraphy.org/chart'
      },
      {
        name: 'Snowball Earth climate dynamics and Cryogenian geology-geobiology',
        publisher: 'Science Advances',
        url: 'https://www.science.org/doi/10.1126/sciadv.1600983'
      }
    ]
  },
  {
    id: 'ediacaran-animals',
    title: '早期大型多细胞生物',
    displayTime: '约6.35亿—5.39亿年前',
    era: '元古宙',
    category: '复杂生命',
    summary: '埃迪卡拉纪海洋中出现了多样的大型软体生物群。',
    detail: '在埃迪卡拉纪，海底生活着形态奇特的叶状、盘状和蠕虫状生物。部分可能与后来动物有关，另一些则没有留下明确后代。软体结构不易形成化石，因此保存下来的窗口格外珍贵。',
    significance: '这些生物展示了动物生态系统形成前夕的生命实验，也说明大型复杂生命早于寒武纪生命大爆发。',
    dateNote: '埃迪卡拉纪的正式年代边界由国际地层委员会持续维护；具体化石的分类与亲缘关系仍有争论。',
    sources: [
      {
        name: 'International Chronostratigraphic Chart',
        publisher: 'International Commission on Stratigraphy',
        url: 'https://stratigraphy.org/chart'
      }
    ]
  },
  {
    id: 'cambrian-explosion',
    title: '寒武纪生命大爆发',
    displayTime: '约5.388亿年前开始',
    era: '古生代',
    category: '动物演化',
    summary: '较短的地质时期内，动物体型、取食方式与生态关系迅速多样化。',
    detail: '寒武纪早期的化石记录中，许多动物门类及带硬壳、外骨骼的形态明显增多。所谓“大爆发”并非生命突然从无到有，而是演化创新、生态互动和化石保存条件共同造成的显著记录。',
    significance: '捕食、防御、钻洞和游泳等生活方式扩展，海洋生态系统变得更复杂；现代许多动物基本身体结构可以追溯到这一阶段。',
    dateNote: '寒武纪底界目前定为约5.388亿年前。生命多样化跨越数千万年，并不是一次短暂爆炸。',
    sources: [
      {
        name: 'International Chronostratigraphic Chart',
        publisher: 'International Commission on Stratigraphy',
        url: 'https://stratigraphy.org/chart'
      },
      {
        name: 'The Cambrian Period',
        publisher: 'University of California Museum of Paleontology',
        url: 'https://ucmp.berkeley.edu/cambrian/cambrian.php'
      }
    ]
  },
  {
    id: 'land-plants',
    title: '植物登陆',
    displayTime: '约4.7亿年前',
    era: '古生代',
    category: '陆地生态',
    summary: '植物祖先从淡水藻类演化而来，开始在裸露陆地上建立生态系统。',
    detail: '最初的陆生植物体型很小，依赖潮湿环境。它们逐渐演化出防止水分散失的表皮、输导组织、根和种子，使植物能够进入更干燥、更广阔的陆地。',
    significance: '植物改变了土壤形成、碳循环和大气组成，并为动物登陆提供食物与栖息地。森林后来还深刻影响全球气候。',
    dateNote: '孢子化石提示陆生植物在约4.7亿年前已经存在；不同植物结构在之后很长时期内逐步演化。',
    sources: [
      {
        name: 'The first plants to conquer the land',
        publisher: 'Natural History Museum, London',
        url: 'https://www.nhm.ac.uk/discover/the-first-plants-to-conquer-the-land.html'
      }
    ]
  },
  {
    id: 'ordovician-extinction',
    title: '奥陶纪末大灭绝',
    displayTime: '约4.438亿年前',
    era: '古生代',
    category: '大灭绝',
    summary: '冰期、海退和海洋氧化还原结构变化分阶段冲击了以海洋为主的生态系统。',
    detail: '奥陶纪末的大灭绝至少包含两个主要脉冲。冈瓦纳大陆附近形成大型冰盖，全球降温与海平面下降压缩浅海栖息地；随后的海洋环流和氧含量变化又对幸存群落施加压力。不同海域的响应并不完全同步。',
    significance: '当时绝大多数复杂生物生活在海中，因此浅海面积和水体含氧变化会迅速影响多个类群。这一事件也提醒我们，“冰期”并不等于所有海水都更富氧：海底和上层海水可能出现不同变化。',
    mechanism: '冰盖增长把水储存在陆地，造成全球海退；降温、海盆形态与环流重组改变营养盐输送。模型与碘/钙等氧化还原代用指标显示，冰期中上层海洋可增氧，同时海底缺氧范围扩展。',
    evidence: '全球地层中的笔石、腕足动物和三叶虫更替记录灭绝脉冲；氧同位素、沉积相和氧化还原代用指标用于重建冰量、海平面与海洋含氧状态。',
    openQuestions: '两次灭绝脉冲中降温、栖息地丧失、缺氧和复温各占多大作用，以及不同海盆为何表现不同，仍在研究。',
    confidence: '灭绝与冰期、海退的关联证据强，具体杀伤机制仍是多因素模型',
    misconception: '奥陶纪末灭绝不是“海洋全部结冰”。主要压力来自气候、海平面、栖息地和海洋化学的快速组合变化。',
    dateNote: '奥陶纪—志留纪边界约为4.438亿年前。灭绝不是单日事件，而是跨越较短地质时间的多脉冲危机。',
    sources: [
      {
        name: 'Vertical decoupling in Late Ordovician anoxia due to reorganization of ocean circulation',
        publisher: 'Nature Geoscience',
        url: 'https://www.nature.com/articles/s41561-021-00843-9'
      },
      {
        name: 'International Chronostratigraphic Chart',
        publisher: 'International Commission on Stratigraphy',
        url: 'https://stratigraphy.org/chart'
      }
    ]
  },
  {
    id: 'silurian-vascular-plants',
    title: '早期维管植物在陆地扩展',
    displayTime: '约4.30亿—4.19亿年前',
    era: '古生代',
    category: '陆地生态',
    summary: '库克逊蕨等小型植物展示了输导组织、气孔和孢子囊等早期陆生适应。',
    detail: '志留纪陆地上的植物仍然低矮，通常生长在湿润环境。库克逊蕨类化石保存了分叉茎和顶生孢子囊；部分标本具有气孔、支持组织和中央输导结构。它们代表陆地植物身体结构逐步复杂化，而不是突然出现现代森林。',
    significance: '输导与支撑结构提高了水和养分运输能力，为植物后来长高、形成更深根系并改造土壤创造条件。植物扩展也逐渐改变风化、碳循环和陆地食物网。',
    mechanism: '防水表皮减少失水，气孔调节气体交换，中央输导细胞帮助运输水分；孢子囊位于分叉枝端，有利于孢子散布。不同特征并非一次同时完成。',
    evidence: '压印化石显示枝轴与孢子囊，显微切片中的加厚细胞壁可用于判断输导组织；孢子组合和沉积环境帮助重建植物分布。',
    openQuestions: '部分极小的库克逊蕨型植物是否能独立完成光合作用、哪些标本真正属于维管植物，以及最早输导组织出现的时间仍需谨慎判断。',
    confidence: '志留纪陆生植物化石可靠，具体分类和生理能力仍有争议',
    misconception: '志留纪的植物扩展不等于当时已经出现高大森林；真正的树木和复杂森林主要在泥盆纪以后发展。',
    dateNote: '志留纪中晚期已有较可靠陆生植物宏体化石。不同库克逊蕨标本年代和解剖保存程度不同，不能全部视为完全相同的植物。',
    sources: [
      {
        name: 'A vascular conducting strand in the early land plant Cooksonia',
        publisher: 'Nature',
        url: 'https://www.nature.com/articles/357683a0'
      },
      {
        name: 'A timeline for terrestrialization: consequences for the carbon cycle in the Palaeozoic',
        publisher: 'Philosophical Transactions of the Royal Society B',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3248713/'
      }
    ]
  },
  {
    id: 'silurian-jawed-fishes',
    title: '有颌脊椎动物早期辐射',
    displayTime: '约4.36亿—4.25亿年前',
    era: '古生代',
    category: '脊椎动物演化',
    summary: '保存完整的早志留世鱼类化石揭示，有颌脊椎动物已比过去记录显示的更早多样化。',
    detail: '中国重庆早志留世特异埋藏化石群保存了完整的有颌鱼身体，包括盾皮鱼类干群和早期软骨鱼型成员。它们补上了以往主要依赖零散鳞片、棘刺和牙齿研究的记录空白。',
    significance: '颌、成对附肢和多样取食方式是后来鱼类以及全部有颌四足动物演化的关键基础。完整化石显示主要支系的分化在志留纪早期已经深入展开。',
    mechanism: '颌可能由前部鳃弓系统演化并被新的肌肉和感觉结构整合；随后不同支系在头甲、牙齿、鳍和身体装甲上形成多种组合。',
    evidence: '关节相连的全身化石能够同时比较头骨、躯干和鳍；高分辨率成像、形态矩阵与系统发育分析用于确定这些鱼类在有颌脊椎动物树上的位置。',
    openQuestions: '更早的奥陶纪鳞片和棘刺属于哪些支系、颌与牙齿最初如何组合，以及软骨鱼和硬骨鱼共同祖先的外形仍会随新化石调整。',
    confidence: '完整化石显著加强早期辐射证据，深层亲缘关系仍在更新',
    misconception: '“泥盆纪是鱼类时代”不表示有颌鱼到泥盆纪才出现；志留纪甚至更早已有重要分化。',
    dateNote: '重庆化石群约为4.36亿年前。晚志留世约4.25亿年前也有多类完整有颌鱼记录。',
    sources: [
      {
        name: 'The oldest complete jawed vertebrates from the early Silurian of China',
        publisher: 'Nature',
        url: 'https://www.nature.com/articles/s41586-022-05136-8'
      }
    ]
  },
  {
    id: 'first-tetrapods',
    title: '脊椎动物走上陆地',
    displayTime: '约3.75亿年前',
    era: '古生代',
    category: '动物登陆',
    summary: '一些肉鳍鱼类的鳍、呼吸和支撑结构逐渐适应浅水与陆地环境。',
    detail: '从鱼到四足动物不是一次跳跃。像提塔利克鱼这样的过渡类型同时拥有鱼类特征和能够支撑身体的骨骼结构；早期四足动物可能仍主要生活在水中。',
    significance: '这一演化支系后来产生两栖类、爬行类、鸟类和哺乳类，也包括人类。陆地脊椎动物生态由此展开。',
    dateNote: '“登陆”是跨越数千万年的演化过程。约3.75亿年前代表重要过渡化石的年代，不是第一只动物踏上陆地的精确时刻。',
    sources: [
      {
        name: 'The Origin of Tetrapods',
        publisher: 'Understanding Evolution, UC Berkeley',
        url: 'https://evolution.berkeley.edu/what-are-evograms/the-origin-of-tetrapods/'
      }
    ]
  },
  {
    id: 'late-devonian-extinction',
    title: '晚泥盆世多阶段灭绝',
    displayTime: '约3.72亿—3.59亿年前',
    era: '古生代',
    category: '大灭绝',
    summary: '多次缺氧和有毒含硫水体扩展，长期削弱礁生态与海洋生物多样性。',
    detail: '晚泥盆世危机不是一次撞击式事件，而包括凯尔瓦瑟事件和接近泥盆纪末的汉根堡事件等多个阶段。海洋富营养化、缺氧乃至硫化水进入浅海，对造礁生物和多类海洋动物造成持续压力。',
    significance: '泥盆纪大型礁系统遭受重创，部分鱼类和无脊椎动物支系消失。分阶段危机说明生态系统可以在长期环境波动中反复受损，而不是只由一次瞬时灾变触发。',
    mechanism: '陆地植物扩展、风化增强、营养盐输入、气候与海平面变化以及火山活动可能共同扰动碳循环。高生产力消耗氧气，缺氧与硫化水随后向浅海扩展。',
    evidence: '黑色页岩、有机碳和硫同位素、铀与钼等氧化还原指标记录水体缺氧；化石群在多个地层层位出现分阶段锐减。',
    openQuestions: '陆地植物、火山、轨道周期和海平面变化各自的触发作用，以及凯尔瓦瑟与汉根堡事件应否作为同一场大灭绝处理，仍有讨论。',
    confidence: '多阶段生物危机和海洋缺氧证据强，最终触发链仍属活跃研究',
    misconception: '晚泥盆世灭绝不是单一年份的全球同步事件，也不能只归因于“植物制造了灾难”。植物扩展只是复杂地球系统变化中的一个可能因素。',
    dateNote: '晚泥盆世危机跨越约一千多万年，其中凯尔瓦瑟事件约在3.72亿年前，汉根堡事件接近3.59亿年前。',
    sources: [
      {
        name: 'Basin-scale reconstruction of euxinia and Late Devonian mass extinctions',
        publisher: 'Nature',
        url: 'https://www.nature.com/articles/s41586-023-05716-2'
      },
      {
        name: 'Timing and pacing of the Late Devonian mass extinction event regulated by eccentricity and obliquity',
        publisher: 'Nature Communications',
        url: 'https://www.nature.com/articles/s41467-017-02407-1'
      }
    ]
  },
  {
    id: 'carboniferous-forests',
    title: '石炭纪煤沼森林扩展',
    displayTime: '约3.59亿—2.99亿年前',
    era: '古生代',
    category: '森林与碳循环',
    summary: '巨型石松、木贼和蕨类组成广阔湿地森林，大量有机碳被埋藏。',
    detail: '赤道附近低地分布着潮湿森林，许多植物与今天树木并非近亲。植物遗体在缺氧沼泽中不易完全分解，反复被沉积物覆盖，经过埋藏、压实和加热后形成许多煤层。',
    significance: '森林扩展改变土壤、河流和大气碳循环，并为陆生节肢动物和脊椎动物提供复杂栖息地。人类工业化大量燃烧的煤，其中相当部分保存了这个时期固定的古老太阳能。',
    mechanism: '光合作用把大气二氧化碳转为有机物；当有机物被快速埋藏而未完全氧化，碳就从短期循环进入岩石圈。成煤还需要合适的沉降、地下水位和后期温压条件。',
    evidence: '煤层中的植物化石、孢粉、树干和根系遗迹揭示森林组成；沉积结构记录沼泽和河流环境，同位素及地球化学资料帮助重建当时大气与气候。',
    openQuestions: '高氧环境、植物分解能力、构造盆地和气候变化对成煤规模各占多大作用，仍需结合不同地区资料研究。',
    confidence: '地层与化石证据充分',
    misconception: '石炭纪并非“所有煤都在这时形成”。不同地区、不同地质时期都能成煤，石炭纪只是北美和欧洲许多大型煤层的重要形成期。',
    glossary: [
      { term: '成煤作用', definition: '植物遗体从泥炭经过埋藏、压实和热演化逐渐转变为煤的过程。' },
      { term: '碳埋藏', definition: '有机碳被沉积物覆盖，长期离开大气—海洋短期循环。' }
    ],
    dateNote: '石炭纪正式范围约为3.589亿至2.989亿年前。煤沼森林在不同大陆的兴衰时间并不完全同步。',
    sources: [
      {
        name: 'The Carboniferous Period',
        publisher: 'University of California Museum of Paleontology',
        url: 'https://ucmp.berkeley.edu/carboniferous/carboniferous.php'
      }
    ]
  },
  {
    id: 'amniotic-egg',
    title: '羊膜卵推动脊椎动物远离水边',
    displayTime: '约3.2亿年前',
    era: '古生代',
    category: '陆地繁殖',
    summary: '胚胎被多层膜和液体保护，四足动物的繁殖不再必须回到开放水体。',
    detail: '早期四足动物的卵容易失水，繁殖多依赖水域。羊膜动物演化出羊膜、绒毛膜、尿囊等胚膜，为胚胎提供水环境、气体交换和废物储存。爬行类与鸟类常形成有壳卵，哺乳类后来在母体内保留并改造了这些结构。',
    significance: '羊膜卵让脊椎动物能够进入更干旱、更远离水体的陆地生态位。现生爬行类、鸟类和哺乳类都属于羊膜动物。',
    mechanism: '关键不是硬壳本身，而是围绕胚胎的膜系统。羊膜保持局部液体环境，绒毛膜参与气体交换，尿囊储存含氮废物；卵黄提供发育能量。',
    evidence: '软组织胚膜极少化石化，科学家主要通过早期羊膜动物骨骼、足迹、系统发育关系以及现生爬行类、鸟类和哺乳类胚胎结构进行推断。',
    openQuestions: '最早羊膜动物之间的亲缘关系和胚膜逐步演化顺序仍会随新化石和系统发育分析改变。',
    confidence: '演化关系为强共识，最早节点仍会调整',
    misconception: '羊膜卵不等于“硬壳蛋”。人类胚胎同样具有羊膜，因此哺乳动物也是羊膜动物。',
    glossary: [
      { term: '羊膜动物', definition: '胚胎具有羊膜等结构的四足动物，包括爬行类、鸟类和哺乳类。' },
      { term: '胚膜', definition: '在胚胎周围承担保护、供养、气体交换与废物处理的膜结构。' }
    ],
    dateNote: '约3.2亿年前已出现较明确的早期羊膜动物化石。软组织不易保存，因此真正起源时间可能更早。',
    sources: [
      {
        name: 'The origin of the amniotic egg',
        publisher: 'University of California Museum of Paleontology',
        url: 'https://ucmp.berkeley.edu/vertebrates/tetrapods/amniota.php'
      }
    ]
  },
  {
    id: 'permian-extinction',
    title: '二叠纪末大灭绝',
    displayTime: '约2.519亿年前',
    era: '古生代',
    category: '大灭绝',
    summary: '地球已知最严重的生物灭绝事件重组了海洋和陆地生态系统。',
    detail: '大规模火山活动释放温室气体，引发快速变暖、海洋酸化与缺氧等连锁变化。绝大多数海洋物种和大量陆生脊椎动物支系消失，生态系统恢复耗费了数百万年。',
    significance: '灭绝清空了大量生态位，改变了演化方向，并为后来中生代的新生物群扩张创造空间。它也是研究当代快速环境变化风险的重要深时参照。',
    dateNote: '二叠纪—三叠纪边界定为约2.519亿年前。灭绝过程可能包含多个脉冲，持续时间仍在精细研究。',
    sources: [
      {
        name: 'International Chronostratigraphic Chart',
        publisher: 'International Commission on Stratigraphy',
        url: 'https://stratigraphy.org/chart'
      },
      {
        name: 'The Great Permian Extinction',
        publisher: 'Smithsonian Ocean',
        url: 'https://ocean.si.edu/through-time/ancient-seas/great-permian-extinction'
      }
    ]
  },
  {
    id: 'first-dinosaurs',
    title: '恐龙出现',
    displayTime: '约2.45亿—2.33亿年前',
    era: '中生代',
    category: '爬行动物演化',
    summary: '最早的恐龙在三叠纪晚期出现，随后扩散为多样的陆地动物。',
    detail: '早期恐龙通常体型不大，与多种其他主龙类共同生活。三叠纪末灭绝后，许多竞争支系消失，恐龙在侏罗纪和白垩纪占据了更多陆地生态位。',
    significance: '恐龙统治陆地生态系统超过一亿年，并演化出极其多样的形态。鸟类正是其中一支兽脚类恐龙延续至今的后代。',
    dateNote: '约2.45亿年前的材料被提出为早期恐龙候选；较明确的恐龙化石集中在约2.33亿年前。分类和年代仍会随新发现调整。',
    sources: [
      {
        name: 'When did dinosaurs live?',
        publisher: 'Natural History Museum, London',
        url: 'https://www.nhm.ac.uk/discover/when-did-dinosaurs-live.html'
      }
    ]
  },
  {
    id: 'first-mammals',
    title: '早期哺乳动物出现',
    displayTime: '约2.25亿年前',
    era: '中生代',
    category: '哺乳动物演化',
    summary: '小型哺乳动物及其近亲与恐龙共存，并逐步发展出听觉、牙齿和哺乳特征。',
    detail: '哺乳动物来自合弓动物支系，而不是由恐龙演化而来。中生代早期成员多体型较小，但并非全都只是夜行食虫者；化石显示它们已经分化出掘穴、攀树、滑翔、游泳和捕食等多种生活方式。',
    significance: '差异化牙齿、敏锐听觉、毛发、恒温和哺乳让它们能够精细利用资源。中生代建立的多种适应，为非鸟恐龙灭绝后的快速扩张准备了演化基础。',
    mechanism: '早期合弓动物下颌中的部分骨骼逐步缩小并转移到中耳，形成三块听小骨；下颌关节也被新的骨骼连接取代。这是一系列可以在过渡化石中追踪的渐变。',
    evidence: '牙齿形态、颌骨与中耳结构是识别早期哺乳动物的重要证据。微型CT可在不破坏化石的情况下观察颅骨内部，骨骼与牙齿生长线还能提供代谢线索。',
    openQuestions: '“第一种真正哺乳动物”的边界取决于采用哪些解剖特征；毛发和乳腺很少直接化石化，起源时间更多依赖间接推断。',
    confidence: '支系演化证据充分，最早边界依定义变化',
    misconception: '哺乳动物不是在恐龙灭绝之后才出现；它们与恐龙共同生活了一亿多年，只是在6600万年前后进入了更多大型生态位。',
    glossary: [
      { term: '合弓动物', definition: '头骨眼眶后方每侧有一个颞孔的脊椎动物大支系，包含哺乳动物及其已灭绝近亲。' },
      { term: '听小骨', definition: '哺乳动物中耳传递声音振动的锤骨、砧骨和镫骨。' }
    ],
    dateNote: '三叠纪晚期约2.25亿年前已有通常被归入早期哺乳动物的化石；若采用不同定义，时间会稍有变化。',
    sources: [
      {
        name: 'The origin of life on Earth: From basic chemicals to complex organisms',
        publisher: 'Natural History Museum, London',
        url: 'https://www.nhm.ac.uk/discover/origin-of-life-on-earth.html'
      }
    ]
  },
  {
    id: 'triassic-extinction',
    title: '三叠纪末大灭绝',
    displayTime: '约2.014亿年前',
    era: '中生代',
    category: '大灭绝',
    summary: '中央大西洋岩浆活动与碳循环突变引发增温、酸化和生态重组。',
    detail: '盘古大陆裂解前后，中央大西洋岩浆省发生大规模岩浆侵入和喷发。火山及岩浆加热富有机质沉积物释放温室气体，使大气二氧化碳和全球温度快速变化，海洋酸化与缺氧压力增强。',
    significance: '许多海洋无脊椎动物和陆生主龙类支系消失。灭绝后的生态空位帮助恐龙在侏罗纪成为更占优势的陆地大型脊椎动物，但这不是恐龙“必然胜出”的预设过程。',
    mechanism: '岩墙和岩床侵入沉积盆地，可同时释放岩浆来源和沉积物受热产生的碳；喷发气体与硫化物造成短期和长期气候扰动，海洋吸收二氧化碳后酸度上升。',
    evidence: '高精度铀铅定年把岩浆侵入与灭绝层附近的碳同位素变化对应起来；玄武岩、岩床、叶片气孔和海相化学指标提供独立证据。',
    openQuestions: '侵入与喷发各释放多少碳和硫、灭绝是否包含多个脉冲、陆地和海洋生态受损的时间差仍需更高分辨率地层记录。',
    confidence: 'CAMP岩浆活动与灭绝的时间联系强，具体气体来源比例仍研究中',
    misconception: '不是“火山熔岩直接覆盖全球生物”。主要全球压力来自岩浆活动驱动的大气、气候和海洋化学变化。',
    dateNote: '三叠纪—侏罗纪边界约2.014亿年前。高精度定年显示部分岩浆侵入早于最早已知熔岩流，并与灭绝开始接近。',
    sources: [
      {
        name: 'End-Triassic mass extinction started by intrusive CAMP activity',
        publisher: 'Nature Communications',
        url: 'https://www.nature.com/articles/ncomms15596'
      },
      {
        name: 'New U–Pb geochronology for the Central Atlantic Magmatic Province',
        publisher: 'Scientific Reports',
        url: 'https://www.nature.com/articles/s41598-023-32534-3'
      }
    ]
  },
  {
    id: 'dinosaur-to-birds',
    title: '羽毛恐龙与鸟类起源',
    displayTime: '约1.65亿—1.5亿年前',
    era: '中生代',
    category: '演化过渡',
    summary: '部分小型兽脚类恐龙演化出复杂羽毛、翼和更强飞行能力，鸟类由此产生。',
    detail: '羽毛最初不一定用于飞行，可能先承担保温、展示、伪装或孵卵功能。许多非鸟恐龙已经拥有羽毛、叉骨、气囊和类似鸟类的姿态；在小型兽脚类中，前肢和羽毛逐渐形成能够产生升力的翼。',
    significance: '鸟类并不是与恐龙并列的外来群体，而是仍然存活的一支恐龙。这个案例清楚展示了复杂结构可以从原有功能逐步被改造，而不是一次完整出现。',
    mechanism: '身体小型化降低飞行所需能量；不对称飞羽产生升力，肩带和胸肌控制扑翼，气囊系统提高呼吸效率。滑翔与地面起飞哪种路径更重要，可能因支系而异。',
    evidence: '始祖鸟等化石保存羽毛印痕和恐龙式骨骼；中国辽宁等地大量带羽毛恐龙化石补上多个过渡阶段。骨骼解剖、蛋、巢和系统发育分析相互支持。',
    openQuestions: '“第一只鸟”没有天然清晰界线，因为鸟类特征分阶段出现。早期飞行方式、不同有翼恐龙的飞行能力和现生鸟共同祖先的精确位置仍在研究。',
    confidence: '鸟类属于兽脚类恐龙为强共识',
    misconception: '不是所有恐龙都长有现代鸟类那样的羽毛，也不是某只恐龙突然生出一只现代鸟；这是多个特征长期累积的分支演化。',
    glossary: [
      { term: '兽脚类', definition: '以两足行走为主的一大类恐龙，包括霸王龙、迅猛龙和鸟类支系。' },
      { term: '过渡化石', definition: '同时保留祖先与后代支系特征、帮助重建演化变化的化石。' }
    ],
    dateNote: '约1.65亿至1.5亿年前出现多种鸟翼类和始祖鸟。鸟类特征的起源比这个时间更早，不能用单个化石定义绝对起点。',
    sources: [
      {
        name: 'How dinosaurs evolved into birds',
        publisher: 'Natural History Museum, London',
        url: 'https://www.nhm.ac.uk/discover/how-dinosaurs-evolved-into-birds.html'
      },
      {
        name: 'What were the first birds like?',
        publisher: 'Natural History Museum, London',
        url: 'https://www.nhm.ac.uk/discover/what-were-the-first-birds-like.html'
      }
    ]
  },
  {
    id: 'flowering-plants',
    title: '开花植物兴起',
    displayTime: '约1.4亿年前起',
    era: '中生代',
    category: '植物演化',
    summary: '被子植物开始快速多样化，花与果实重塑了陆地生态关系。',
    detail: '开花植物用花促进授粉，以果实包裹并传播种子。它们与昆虫等传粉者共同演化，在白垩纪逐渐扩展，后来成为现代陆地植被中最丰富的植物类群。',
    significance: '花、果实和叶片为昆虫、鸟类与哺乳动物提供新的食物来源，推动了复杂互惠关系和陆地生物多样性。',
    dateNote: '早期被子植物的起源时间仍在讨论。明确化石记录在早白垩世增多，分子钟研究有时给出更早年代。',
    sources: [
      {
        name: 'Vast DNA tree of life for plants revealed',
        publisher: 'Royal Botanic Gardens, Kew',
        url: 'https://www.kew.org/about-us/press-media/angiosperm-tree-of-life'
      }
    ]
  },
  {
    id: 'kpg-extinction',
    title: '小行星撞击与恐龙灭绝',
    displayTime: '约6600万年前',
    era: '新生代',
    category: '大灭绝',
    summary: '一颗大型小行星撞击地球，非鸟恐龙与众多物种消失。',
    detail: '小行星撞击今天墨西哥尤卡坦附近，抛起的尘埃和气溶胶遮蔽阳光，扰乱气候与食物网。同期火山活动可能加重环境压力，但撞击被视为灭绝的关键触发因素。',
    significance: '非鸟恐龙退出后，哺乳动物和鸟类进入新的生态位并迅速多样化，现代生态系统的许多组成由此展开。',
    dateNote: '白垩纪—古近纪边界约为6600万年前。灭绝影响在地质尺度上非常迅速，但不同生物群的响应并不同步。',
    sources: [
      {
        name: 'The Day the Dinosaurs Died',
        publisher: 'Smithsonian Magazine',
        url: 'https://www.smithsonianmag.com/science-nature/day-dinosaurs-died-180973211/'
      },
      {
        name: 'International Chronostratigraphic Chart',
        publisher: 'International Commission on Stratigraphy',
        url: 'https://stratigraphy.org/chart'
      }
    ]
  },
  {
    id: 'early-primates',
    title: '早期灵长类扩张',
    displayTime: '约5500万年前',
    era: '新生代',
    category: '哺乳动物演化',
    summary: '适应树栖生活的早期灵长类，在温暖森林中逐渐多样化。',
    detail: '早期灵长类演化出抓握能力、较灵活的四肢和向前的双眼，有助于在树冠中移动与判断距离。它们并不是现代猴或人类，而是通向多个灵长类支系的早期成员。',
    significance: '灵长类的视觉、手部灵活性和社会行为，为后来类人猿及人类支系的演化提供了身体与行为基础。',
    dateNote: '疑似灵长类亲属更早出现；约5500万年前开始出现较明确的真灵长类化石。',
    sources: [
      {
        name: 'Primate Origins and the Plesiadapiforms',
        publisher: 'University of California Museum of Paleontology',
        url: 'https://ucmp.berkeley.edu/mammal/primates/primfr.html'
      }
    ]
  },
  {
    id: 'whale-evolution',
    title: '鲸类从陆地重返海洋',
    displayTime: '约5000万—4000万年前',
    era: '新生代',
    category: '宏观演化',
    summary: '一支陆生偶蹄类近亲逐步适应水中生活，最终演化成完全海生的鲸类。',
    detail: '最早鲸类仍有能够承重的四肢，后来成员的后肢缩小、前肢变为鳍状，尾部成为主要推进器，鼻孔逐渐移向头顶。现代鲸的近亲关系显示，它们属于偶蹄类支系，河马是现生近亲之一。',
    significance: '鲸类演化拥有连续性很强的化石序列，是自然选择如何改造既有身体结构的经典案例，也说明演化能够从陆地再次进入海洋。',
    mechanism: '在浅水和沿海环境中，善于游泳、潜水和捕食的个体获得优势。骨骼密度、听觉传导、脊柱运动和体温调节逐步改变；这些特征并非同步一次完成。',
    evidence: '巴基鲸、陆行鲸、罗德侯鲸和龙王鲸等化石展示耳骨、踝骨、四肢和尾部的连续变化。分子系统学也把鲸类放在偶蹄类内部。',
    openQuestions: '不同早期鲸类的具体亲缘关系、尾鳍形成时间和从淡水到海洋的生态路线仍会随新化石调整。',
    confidence: '化石与分子证据高度一致',
    misconception: '鲸并不是由今天的河马变来；鲸和河马共享一个更早的共同祖先，各自沿不同支系演化。',
    glossary: [
      { term: '偶蹄类', definition: '以第三、第四趾共同承重为典型特征的哺乳动物支系；现代分类中鲸类也位于其中。' },
      { term: '退化结构', definition: '祖先结构在新环境中功能减弱或改变后留下的残余，例如现代鲸体内的骨盆残迹。' }
    ],
    dateNote: '约5000万年前已有半水生早期鲸类，约4000万年前出现完全海生类型；这是千万年尺度的过渡。',
    sources: [
      {
        name: 'The evolution of whales',
        publisher: 'Understanding Evolution, UC Berkeley',
        url: 'https://evolution.berkeley.edu/what-are-evograms/the-evolution-of-whales/'
      }
    ]
  },
  {
    id: 'antarctic-ice-expansion',
    title: '南极大陆冰盖快速扩张',
    displayTime: '约3390万—3370万年前',
    era: '新生代',
    category: '气候转型',
    summary: '始新世—渐新世界线附近，南极大陆冰量快速增加，地球进入更持久的冰室状态。',
    detail: '经过长期冷却后，南极冰盖在较短地质时间内扩大到接近大陆尺度。深海氧同位素、海平面和沉积记录显示，转型既包含海水降温，也包含大量海水被锁入陆地冰盖。',
    significance: '南极冰盖扩张改变全球海平面、海洋环流和高纬气候，是新生代从温室世界转向冰室世界的关键节点。它也影响陆地植被和动物群落，但各地区响应并不相同。',
    mechanism: '长期下降的大气二氧化碳使南极高地积雪更容易跨过持续成冰阈值；轨道变化调节高纬夏季日照，冰—反照率和冰盖高度反馈随后放大增长。',
    evidence: '底栖有孔虫氧同位素记录海温与全球冰量变化，海岸和深海沉积物记录海平面下降；冰盖—气候模型用于检验二氧化碳与轨道强迫。',
    openQuestions: '冰盖分几步增长、当时西南极各区域是否同步结冰，以及二氧化碳、洋流通道和轨道强迫的相对贡献仍在精细研究。',
    confidence: '大陆尺度冰盖扩张为强共识，区域时序和反馈强度持续更新',
    misconception: '南极结冰不是只因为大陆“漂到南极”。大陆位置提供条件，但温室气体下降和轨道、冰盖反馈对跨越结冰阈值同样重要。',
    dateNote: '始新世—渐新世边界约3390万年前。高分辨率记录常把主要冰量增长放在约3370万年前附近的阶跃中。',
    sources: [
      {
        name: 'Multi-proxy evidence for sea level fall at the onset of the Eocene-Oligocene transition',
        publisher: 'Nature Communications',
        url: 'https://www.nature.com/articles/s41467-023-39806-6'
      },
      {
        name: 'Rapid Cenozoic glaciation of Antarctica induced by declining atmospheric CO2',
        publisher: 'Nature',
        url: 'https://www.nature.com/articles/nature01290'
      }
    ]
  },
  {
    id: 'oligocene-faunal-turnover',
    title: '气候转冷与哺乳动物群重组',
    displayTime: '约3400万—3000万年前',
    era: '新生代',
    category: '生态重组',
    summary: '欧亚与非洲多地的哺乳动物群在降温和环境变化中发生显著更替，但区域模式并不完全一致。',
    detail: '始新世—渐新世转型后，欧洲的“大间断”和亚洲的“蒙古重组”记录了多个哺乳动物类群消失、迁入或改变优势度。亚洲部分记录显示温暖森林向更干冷的森林—草原镶嵌环境转变；非洲—阿拉伯的一些特有支系也出现多样性下降。',
    significance: '化石群落把全球气候转型与陆地生态变化联系起来，也显示同一次气候事件不会在所有大陆产生相同结果。地理隔离、迁徙通道和局地植被共同塑造响应。',
    mechanism: '降温、降水季节性和植被结构变化改变食物与栖息地；海平面变化和陆桥又影响物种迁徙。小型啮齿类、兔形类与不同食性哺乳动物在新环境中重新组合。',
    evidence: '连续地层中的牙齿、骨骼、花粉、古土壤和磁性地层可同步比较动物、植被和气候。牙齿形态还能帮助推断食物磨蚀度与取食方式。',
    openQuestions: '气候、植被变化和跨大陆迁入各自造成多少灭绝与替代，不同地区记录缺口是否夸大“突然性”，仍有争论。',
    confidence: '区域群落更替证据强，全球同步性和因果比例需谨慎',
    misconception: '“大间断”不是全球所有哺乳动物在同一时刻集体消失；它是欧洲命名的区域事件，其他大陆有不同但可比较的重组记录。',
    dateNote: '主要转型集中在约3390万年前边界及其后数百万年。不同大陆化石层的时间分辨率和更替节奏并不一致。',
    sources: [
      {
        name: 'Synchronous turnover of flora, fauna and climate at the Eocene–Oligocene Boundary in Asia',
        publisher: 'Scientific Reports',
        url: 'https://www.nature.com/articles/srep07463'
      },
      {
        name: 'Widespread loss of mammalian lineage and dietary diversity in the early Oligocene of Afro-Arabia',
        publisher: 'Communications Biology',
        url: 'https://www.nature.com/articles/s42003-021-02707-9'
      }
    ]
  },
  {
    id: 'hominin-origins',
    title: '人族支系形成',
    displayTime: '约800万—600万年前',
    era: '新生代',
    category: '人类演化',
    summary: '在人类与黑猩猩共同祖先分开后，早期人族支系开始演化。',
    detail: '“人族”包括现代人以及在人类一侧、与黑猩猩分支后出现的已灭绝物种。早期化石显示，双足行走相关特征逐步形成，同时仍保留攀爬能力。',
    significance: '稳定双足行走解放了双手，并改变了移动、取食和身体结构。人类演化不是一条直线，而是一棵曾经多支并存的树。',
    dateNote: '遗传与化石证据一般把人类和黑猩猩祖先分支放在约800万至600万年前，具体时间无法精确到单一年份。',
    sources: [
      {
        name: 'Climate Effects on Human Evolution',
        publisher: 'Smithsonian Human Origins Program',
        url: 'https://humanorigins.si.edu/research/climate-and-human-evolution/climate-effects-human-evolution'
      }
    ]
  },
  {
    id: 'australopithecus',
    title: '南方古猿多样化',
    displayTime: '约420万—200万年前',
    era: '新生代',
    category: '人类演化',
    summary: '多种南方古猿已经经常双足行走，同时仍保留攀树能力。',
    detail: '南方古猿不是单一物种，而是生活在非洲多个地区的一组早期人族。它们脑容量仍接近其他类人猿，手臂和肩部保留攀爬适应，但骨盆、膝关节和足部显示稳定双足行走已经形成。',
    significance: '化石说明双足行走早于人类大脑显著增大，也反驳了“先有大脑、后直立”的简单阶梯图景。南方古猿中的某些支系可能接近人属祖先，另一些则走向灭绝。',
    mechanism: '双足行走涉及骨盆变短变宽、股骨向内倾斜、脊柱曲线和足部承重方式的组合变化。自然选择可能同时受到移动效率、取食、散热与环境镶嵌化影响。',
    evidence: '“露西”等骨骼、莱托利足迹、牙齿磨损和骨盆结构提供直接证据。火山灰放射性定年、沉积地层和伴生动物帮助确定年代与环境。',
    openQuestions: '哪些南方古猿与人属关系最近、不同物种是否同时使用工具、树栖与地面活动各占多大比例，仍在讨论。',
    confidence: '双足行走证据强，具体谱系关系仍调整',
    misconception: '南方古猿不是“半只猴、半个人”的固定中间级别。它们是适应自身时代的多样物种，其中许多不是现代人的直接祖先。',
    glossary: [
      { term: '镶嵌演化', definition: '不同身体或行为特征以不同速度变化，而不是整套特征同时出现。' },
      { term: '人族', definition: '在人类与黑猩猩支系分开后，位于人类一侧的现代与已灭绝物种。' }
    ],
    dateNote: '南方古猿属通常覆盖约420万至200万年前，不同物种生活时间部分重叠。',
    sources: [
      {
        name: 'Australopithecus afarensis',
        publisher: 'Smithsonian Human Origins Program',
        url: 'https://humanorigins.si.edu/evidence/human-fossils/species/australopithecus-afarensis'
      }
    ]
  },
  {
    id: 'earliest-stone-tools',
    title: '最早已知石器制作',
    displayTime: '至少约330万年前',
    era: '新生代',
    category: '技术起源',
    summary: '在已知最早人属出现前，早期人族已经能够有目的地敲击石块制造锋利边缘。',
    detail: '肯尼亚洛美奎遗址发现约330万年前的石器。制造者选择石料并以特定角度敲击，获得可切割或砸击的边缘。约260万年前后，奥杜威石器技术在更多地区出现。',
    significance: '技术并不是智人或人属突然发明的能力。手部控制、材料理解和学习传统在更早人族中已经存在，并可能改变食物获取与社会学习。',
    mechanism: '石片剥离需要控制打击点、角度和力度。使用者必须理解石材断裂规律，并通过观察、练习或教学传递操作序列。',
    evidence: '石器表面的打击台、冲击纹、剥片方向和重复制造模式可区别人工敲击与自然破裂；地层、火山灰和古地磁用于定年。微痕和残留物分析可研究用途。',
    openQuestions: '谁制造了最早石器、它们具体用来处理什么材料、技术是否在多个群体中独立出现，都缺少直接答案。',
    confidence: '人工制作证据较强，制造者身份未知',
    misconception: '最早石器不等于“第一件工具”。木棍、骨头和未经加工的石块也可能更早被使用，只是更难保存和识别。',
    glossary: [
      { term: '石核', definition: '被敲击以剥下石片的原始石块。' },
      { term: '使用微痕', definition: '工具刃口在切割、刮削等活动中留下的微小磨损和划痕。' }
    ],
    dateNote: '洛美奎石器约330万年前；是否存在更早技术要等待证据。时间轴把“目前已知最早”与“真正第一次”严格区分。',
    sources: [
      {
        name: 'Early Stone Age Tools',
        publisher: 'Smithsonian Human Origins Program',
        url: 'https://humanorigins.si.edu/evidence/behavior/stone-tools/early-stone-age-tools'
      }
    ]
  },
  {
    id: 'genus-homo',
    title: '人属出现',
    displayTime: '至少约280万年前',
    era: '新生代',
    category: '人类演化',
    summary: '属于人属的早期成员出现，并逐渐发展出更复杂的工具与适应方式。',
    detail: '人属早期成员与更早人族在时间上有所重叠。随着气候波动和生态环境变化，一些支系表现出更大的脑容量、更灵活的取食方式和不断发展的石器技术。',
    significance: '人属后来产生直立人、尼安德特人和智人等多个支系，并从非洲扩展到欧亚大陆的不同环境。',
    dateNote: '约280万年前的下颌化石常被视为已知最早人属证据之一，但材料有限，分类仍会因新发现调整。',
    sources: [
      {
        name: 'Human Evolution Interactive Timeline',
        publisher: 'Smithsonian Human Origins Program',
        url: 'https://humanorigins.si.edu/evidence/human-evolution-interactive-timeline'
      }
    ]
  },
  {
    id: 'early-homo-dispersal',
    title: '早期人属走出非洲',
    displayTime: '至少约180万年前',
    era: '新生代',
    category: '全球迁徙',
    summary: '早期人属扩展到高加索与亚洲，适应不同纬度、季节和资源环境。',
    detail: '格鲁吉亚德马尼西约180万年前的人属化石，是非洲以外最早一批可靠证据。之后直立人及相关群体在东亚和东南亚长期存在。扩散可能由人口增长、猎物移动、气候窗口和灵活取食共同推动。',
    significance: '人类支系的全球化远早于智人。不同地区长期隔离与交流，形成多支并存的复杂演化格局，而不是一支队伍一次性走遍世界。',
    mechanism: '迁徙通常不是有目的的洲际远征，而是许多世代沿河谷、草地和海岸逐步扩大活动范围。工具、合作、食物弹性和可能的用火提升了适应能力。',
    evidence: '德马尼西、爪哇和中国等地的人骨与石器，加上地层、古地磁和放射性定年，构成时空证据。形态比较和古蛋白、古DNA在较晚时期提供谱系信息。',
    openQuestions: '最早扩散者属于哪个物种、是否有多次扩散、各地群体如何交流，以及东亚若干遗址的精确定年仍在讨论。',
    confidence: '早期扩散为强证据，路线与分类仍研究',
    misconception: '“走出非洲”不只发生一次。至少包括早期人属扩散以及后来智人的多次迁徙，也可能伴随返回非洲的基因流动。',
    glossary: [
      { term: '扩散', definition: '种群在多代时间里扩大地理分布，并不要求一次有目标的远征。' },
      { term: '古地磁定年', definition: '利用岩层记录的地磁极性变化与已知时间序列对应来约束年代。' }
    ],
    dateNote: '德马尼西证据约180万年前；非洲附近可能还有更早短距离扩展。不同地区的最早可靠年代并不一致。',
    sources: [
      {
        name: 'Human Evolution Interactive Timeline',
        publisher: 'Smithsonian Human Origins Program',
        url: 'https://humanorigins.si.edu/evidence/human-evolution-interactive-timeline'
      }
    ]
  },
  {
    id: 'controlled-fire',
    title: '持续用火与烹饪',
    displayTime: '至少约100万—79万年前已有较强证据',
    era: '新生代',
    category: '行为演化',
    summary: '人类祖先逐渐学会维持和使用火，用于取暖、防护、照明和加工食物。',
    detail: '天然火灾早于人类存在，关键问题是何时开始有控制地取火、保存火种并重复使用。南非Wonderwerk洞穴和以色列Gesher Benot Ya’aqov等遗址保存烧骨、灰烬、燧石和空间集中分布。',
    significance: '火扩大夜间活动和寒冷环境适应，烹饪提高部分食物的消化效率并减少病原体。围火活动也可能增加交流与社会学习，但具体影响难以直接测量。',
    mechanism: '加热使淀粉糊化、蛋白质变性并软化纤维，可降低咀嚼和消化成本。稳定火源需要燃料选择、搬运、通风和风险控制，是一套社会技术。',
    evidence: '研究者寻找超过自然火灾温度的烧灼、洞穴深处的灰层、反复炉址、烧骨与石器的微观结构。自然火、后期扰动和化学沉淀必须被排除。',
    openQuestions: '偶尔利用天然火与能够主动生火之间相隔多久、烹饪何时成为日常行为、用火如何影响身体演化，仍存在很大时间窗口。',
    confidence: '约79万年前后证据强，更早证据需谨慎',
    misconception: '发现一块烧黑的石头并不能证明人类会生火。科学家必须证明燃烧发生在遗址中、与人类活动关联且不是后期污染。',
    glossary: [
      { term: '炉址', definition: '重复燃烧留下的灰烬、炭、烧骨和受热沉积物集中区。' },
      { term: '变性', definition: '蛋白质在加热等条件下改变三维结构，通常更易被消化。' }
    ],
    dateNote: '不同遗址证据强度不同。约100万年前已有重要候选，约79万年前后反复用火证据更明确；主动生火可能更晚。',
    sources: [
      {
        name: 'Fire-Altered Stone Tools',
        publisher: 'Smithsonian Human Origins Program',
        url: 'https://humanorigins.si.edu/evidence/behavior/hearths-shelters/fire-altered-stone-tools'
      }
    ]
  },
  {
    id: 'neanderthals',
    title: '尼安德特人在欧亚大陆生活',
    displayTime: '约40万—4万年前',
    era: '新生代',
    category: '人类多样性',
    summary: '尼安德特人适应欧亚寒冷环境，拥有复杂技术、照护行为并与智人发生基因交流。',
    detail: '尼安德特人并非粗笨的“失败者”。他们制作多步骤石器、使用火、狩猎大型动物、照顾伤病者，也使用颜料和装饰物。智人进入欧亚后，两者相遇并杂交；许多非洲以外现代人基因组中保留少量尼安德特人DNA。',
    significance: '尼安德特人揭示近几十万年曾有多种人类并存。现代人不是孤立直线的终点，而是交流、迁徙和支系消失共同形成的唯一现存人类。',
    mechanism: '寒冷适应包括较粗壮身体、较短肢体和大型鼻腔等特征；社会合作和技术缓冲环境压力。小种群、气候波动、竞争、疾病与吸收性杂交都可能参与其消失。',
    evidence: '大量骨骼、居住遗址、石器、胶黏剂和古DNA提供多维证据。基因组可估计杂交时间和遗传比例，牙结石、同位素与磨损分析重建饮食。',
    openQuestions: '尼安德特人的语言能力、象征行为普遍程度、不同地区灭绝原因和智人影响的相对权重仍无单一答案。',
    confidence: '存在、技术与杂交证据强；消失原因多因素',
    misconception: '尼安德特人不是现代人的直接“低级祖先”。他们是与智人近缘且部分杂交的姐妹支系。',
    glossary: [
      { term: '古DNA', definition: '从古代骨骼、牙齿或沉积物中提取并测序的降解遗传物质。' },
      { term: '基因渗入', definition: '不同种群杂交后，部分遗传变异经后代进入另一种群。' }
    ],
    dateNote: '经典尼安德特人大约生活在40万至4万年前；其祖先特征更早出现，不同地区最后生存时间略有差异。',
    sources: [
      {
        name: 'Homo neanderthalensis',
        publisher: 'Smithsonian Human Origins Program',
        url: 'https://humanorigins.si.edu/evidence/human-fossils/species/homo-neanderthalensis'
      }
    ]
  },
  {
    id: 'homo-sapiens',
    title: '智人出现',
    displayTime: '约30万年前',
    era: '人类文明',
    category: '我们的物种',
    summary: '现代人的物种智人在非洲演化，并最终扩散到全球。',
    detail: '摩洛哥杰贝尔·伊鲁德等地的化石表明，早期智人在约30万年前已经出现。现代人的特征可能在非洲多个相互联系的人群中逐步形成，而不是在单一地点瞬间完成。',
    significance: '智人通过语言、合作、工具和累积文化适应多样环境；我们也曾与尼安德特人等其他人类支系并存并发生基因交流。',
    dateNote: '“约30万年前”代表目前较早且得到广泛接受的智人化石年代，新发现仍可能调整我们对起源过程的理解。',
    sources: [
      {
        name: 'Homo sapiens',
        publisher: 'Smithsonian Human Origins Program',
        url: 'https://humanorigins.si.edu/evidence/human-fossils/species/homo-sapiens'
      }
    ]
  },
  {
    id: 'symbolic-culture',
    title: '象征、艺术与复杂社会网络扩展',
    displayTime: '约10万—4万年前明显增多',
    era: '人类文明',
    category: '文化演化',
    summary: '颜料、珠饰、刻纹、音乐与洞穴艺术显示人类以符号表达身份、记忆和共同观念。',
    detail: '南非布隆伯斯洞穴的刻纹赭石与珠饰、欧亚多地的洞穴艺术和雕刻、骨笛等材料，说明象征行为在不同时间与地区出现。尼安德特人也可能使用颜料和装饰，因此符号能力不是简单的智人专属开关。',
    significance: '共享符号能够维系更大社会网络、传递规范和保存群体知识。文化积累让技术与观念在世代间改进，成为人类适应速度远超基因演化的重要原因。',
    mechanism: '语言、模仿、教学和仪式把个体经验外化为群体记忆。人口规模、跨群体联系和材料交换提高创新被保留、组合与传播的机会。',
    evidence: '考古证据包括有意制作的珠饰、颜料配方、重复几何刻纹、具象艺术、乐器和远距离原料。研究者通过显微磨损、颜料成分、地层与直接测年判断是否人为及其年代。',
    openQuestions: '语言本身不化石化，最早出现时间难以确定；某些刻痕是符号还是实用痕迹、艺术是否多次独立发展，都需语境判断。',
    confidence: '实物证据强，认知含义需谨慎解释',
    misconception: '“认知革命”不一定是约4万年前突然发生的一次基因突变。更早非洲证据显示，现代行为是长期、区域不均且可能反复的累积过程。',
    glossary: [
      { term: '象征行为', definition: '让物体、声音或动作代表超出其直接用途的身份、观念或规则。' },
      { term: '累积文化', definition: '知识和技术在代际传递中保存并逐步改进，形成单个个体难以独立发明的复杂成果。' }
    ],
    dateNote: '不同象征证据从十多万年前起零散出现，约4万年前后在部分地区数量和种类明显增加，但没有全球同步的单一开端。',
    sources: [
      {
        name: 'Art & Music',
        publisher: 'Smithsonian Human Origins Program',
        url: 'https://humanorigins.si.edu/evidence/behavior/art-music'
      }
    ]
  },
  {
    id: 'agriculture',
    title: '农业与定居扩展',
    displayTime: '约1.2万年前起',
    era: '人类文明',
    category: '社会转型',
    summary: '多个地区独立驯化植物与动物，部分人群逐渐转向定居生产。',
    detail: '冰期结束后，不同地区的人群分别开始管理并驯化小麦、稻米、玉米和多种动物。采集狩猎并未立即消失；农业、牧业和混合生计在不同环境中以不同速度发展。',
    significance: '稳定食物生产支持人口增长、村落和城市，也带来财产分化、传染病、劳动结构变化及更强的人类环境改造能力。',
    dateNote: '农业没有单一起源时间或地点。“约1.2万年前”概括最早一批转型，其他地区在之后数千年独立发展。',
    sources: [
      {
        name: 'Homo sapiens: How They Survived',
        publisher: 'Smithsonian Human Origins Program',
        url: 'https://humanorigins.si.edu/evidence/human-fossils/species/homo-sapiens'
      }
    ]
  },
  {
    id: 'first-cities',
    title: '城市与复杂国家组织出现',
    displayTime: '约公元前4000—前3000年',
    era: '人类文明',
    category: '社会组织',
    summary: '部分农业聚落发展为人口密集城市，出现专业分工、公共工程和制度化权力。',
    detail: '美索不达米亚乌鲁克等地在公元前四千纪快速扩张，拥有神庙、仓储、手工业区和远距离贸易。尼罗河、印度河、黄河与长江流域、中美洲和安第斯等地后来形成不同城市传统，并非复制单一模式。',
    significance: '城市使大量非亲属长期协作成为可能，推动行政、文字、税收、市场和工程发展；也带来阶层分化、拥挤、传染病、战争和资源压力。',
    mechanism: '农业剩余能够供养工匠、管理者和士兵，交通节点促进交换，灌溉与防御工程需要协调。但环境、宗教、贸易和政治竞争在不同地区作用不同。',
    evidence: '聚落面积、建筑分区、道路、公共设施、墓葬差异、仓储和手工业遗物可重建城市化。遥感、植物遗存、同位素和古DNA帮助分析人口流动与食物来源。',
    openQuestions: '城市是否必然依赖中央集权、早期聚落人口如何估算、气候与战争对城市兴衰的作用，在不同案例中答案不同。',
    confidence: '考古证据充分，定义与机制因地区而异',
    misconception: '城市文明不是由一个“文明中心”单向传播到全球。多个地区在不同时间独立形成城市和国家，组织形式也非常不同。',
    glossary: [
      { term: '农业剩余', definition: '生产者在维持自身与下一季生产之外可被储存、交换或征收的食物。' },
      { term: '城市化', definition: '人口、生产与制度向较高密度聚落集中的长期过程。' }
    ],
    dateNote: '“城市”没有唯一人口门槛。乌鲁克常被视为最早大型城市之一，但世界各地区城市化起点相差数千年。',
    sources: [
      {
        name: 'Uruk: The First City',
        publisher: 'The Metropolitan Museum of Art',
        url: 'https://www.metmuseum.org/toah/hd/uruk/hd_uruk.htm'
      }
    ]
  },
  {
    id: 'writing',
    title: '文字系统出现',
    displayTime: '约公元前3200年',
    era: '人类文明',
    category: '信息记录',
    summary: '美索不达米亚等地发展出成熟书写系统，知识得以跨越个体记忆。',
    detail: '早期楔形文字由记账符号逐渐发展，可记录货物、税收、法律、故事与外交。埃及、中国和中美洲等地区也独立形成了不同书写传统。',
    significance: '文字扩大了行政组织和知识积累的尺度，使制度、技术与观念能够更稳定地跨越时间和空间传播。',
    dateNote: '早期符号和成熟文字之间没有绝对清晰的界线。约公元前3200年通常对应乌鲁克晚期较成熟的楔形文字记录。',
    sources: [
      {
        name: 'How to write cuneiform',
        publisher: 'The British Museum',
        url: 'https://www.britishmuseum.org/blog/how-write-cuneiform'
      }
    ]
  },
  {
    id: 'paper-making',
    title: '纸张成熟并跨区域传播',
    displayTime: '中国西汉已有实物，公元2世纪后工艺改进',
    era: '人类文明',
    category: '知识载体',
    summary: '轻便、可折叠和适合书写的纤维纸逐渐替代部分竹简、木牍、莎草纸与羊皮纸。',
    detail: '造纸把植物纤维分散在水中，捞取成薄层后压榨干燥。中国西汉已有早期纸实物，东汉时期工艺得到改进和推广；后来技术经中亚进入伊斯兰世界，再传到欧洲并与印刷结合。',
    significance: '纸降低记录、携带与复制信息的成本，推动行政、教育、宗教、文学、科学和商业发展。它不是单独引发知识革命，但为大规模文字社会提供关键材料基础。',
    mechanism: '纤维在打浆中分离并产生细小纤维丝，水分排出后，纤维之间通过氢键交织成片。原料、施胶和抄造方式决定纸张强度、吸墨性与寿命。',
    evidence: '考古纸片可通过地层和放射性碳定年；纤维显微分析识别麻、树皮等原料。历史文献记录工艺人物和传播路线，但要与更早实物证据区分。',
    openQuestions: '最早纸片是否主要用于书写、不同地区具体传播路线、工艺改良由哪些无名工匠完成，仍受材料保存和文献偏差限制。',
    confidence: '实物与文献证据较强，单一发明者叙事过度简化',
    misconception: '蔡伦并非凭空“发明世界上第一张纸”。更早纸实物已经存在，他更适合理解为东汉造纸工艺改进和推广的代表人物。',
    glossary: [
      { term: '打浆', definition: '把植物纤维分散、切断并细化，使其适合交织成纸。' },
      { term: '施胶', definition: '处理纸面或纸浆，减少液体渗透并改善书写性能。' }
    ],
    dateNote: '西汉纸实物把历史推到公元前；公元105年是传统文献中蔡伦上奏改进工艺的年份，不等于纸的绝对诞生年。',
    sources: [
      {
        name: 'Papermaking',
        publisher: 'Encyclopaedia Britannica',
        url: 'https://www.britannica.com/technology/papermaking'
      }
    ]
  },
  {
    id: 'medieval-knowledge-networks',
    title: '跨欧亚知识翻译与传播网络',
    displayTime: '约公元8—13世纪',
    era: '人类文明',
    category: '知识传播',
    summary: '学者、商人和翻译者在阿拉伯语、希腊语、波斯语、拉丁语等知识传统之间持续转译和改造。',
    detail: '中世纪知识并非停滞在彼此隔绝的文明中。巴格达等城市的翻译活动保存并扩展希腊、波斯和印度学术；医学、数学、天文学与哲学著作又经地中海、西西里和伊比利亚等网络进入拉丁欧洲。东亚、南亚和伊斯兰世界内部也有各自庞大的教育与书写体系。',
    significance: '知识传播不是简单“搬运”。翻译者需要创造术语、比较证据并把文本适配新的教学传统；多轮转译和评论为后来的大学、医学与科学研究积累材料。',
    mechanism: '纸张、驿路、港口、商贸语言、图书馆、宗教机构和宫廷赞助共同降低复制与交流成本。战争和政治竞争有时破坏网络，也可能移动学者和手稿。',
    evidence: '现存多语种手稿、译者序言、书目、抄写痕迹和术语对应可以追踪文本传播；纸张、墨水和装帧分析帮助确定制作地点与年代。',
    openQuestions: '大量无名译者和区域传统未被文献充分记录；把复杂网络压缩为单向“从东方传到西方”会忽略反向和多中心交流。',
    confidence: '手稿与文献证据充分，网络规模和具体路径因材料保存而不均衡',
    misconception: '中世纪不是统一的“黑暗时代”。不同地区在不同时间经历战争、繁荣与知识创新，不能用单一欧洲标签概括全球。',
    dateNote: '8—13世纪概括多轮翻译与制度发展，并非单一运动的精确起止。部分知识传播更早开始，也在此后继续。',
    sources: [
      {
        name: 'The role of Ibn Sina’s medical poem in the transmission of medical knowledge to medieval Europe',
        publisher: 'International Journal of Health Sciences',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3963335/'
      },
      {
        name: 'From the History of Science to the History of Knowledge – and Back',
        publisher: 'Centaurus',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4320774/'
      }
    ]
  },
  {
    id: 'black-death',
    title: '黑死病重创欧亚与北非社会',
    displayTime: '约公元1346—1353年',
    era: '人类文明',
    category: '疾病与社会',
    summary: '鼠疫耶尔森菌沿贸易和交通网络扩散，造成巨大人口损失并长期改变社会结构。',
    detail: '第二次鼠疫大流行在14世纪中叶席卷欧洲、西亚和北非等地区。古DNA研究从中亚14世纪墓葬中重建的鼠疫耶尔森菌基因组，位于与黑死病相关大分化的祖先位置，支持中亚天山地区附近的早期来源。传播路径仍需结合历史、生态和考古证据研究。',
    significance: '高死亡率改变劳动力、土地使用、宗教生活和公共管理。城市逐步发展隔离、检疫和死亡登记等做法，但当时并不知道细菌与媒介机制，措施效果因地区而异。',
    mechanism: '鼠疫耶尔森菌可在啮齿动物和跳蚤等宿主—媒介系统中维持，也可在人群中形成不同传播链。贸易网络提高远距离连通性，但不能把传播简化为单一路线或单一动物。',
    evidence: '历史死亡记录与墓地考古提供规模和时间线，牙齿中的古DNA可直接识别病原体并重建谱系，现代鼠疫菌多样性用于比较可能的动物储存宿主区域。',
    openQuestions: '不同地区跳蚤、啮齿动物和人际传播各占多大比例，死亡人数如何估计，以及疫情如何与气候和贸易互动仍在持续研究。',
    confidence: '病原体身份与大流行事实为强证据，区域传播机制仍有差异',
    misconception: '黑死病不能只解释成“老鼠造成”。病原体、跳蚤和多种宿主、贸易网络、居住条件及人群流动共同影响传播。',
    dateNote: '1346—1353年指最著名的黑死病主波；第二次鼠疫大流行在许多地区又持续了数百年。',
    sources: [
      {
        name: 'The source of the Black Death in fourteenth-century central Eurasia',
        publisher: 'Nature',
        url: 'https://www.nature.com/articles/s41586-022-04800-3'
      }
    ]
  },
  {
    id: 'printing-press',
    title: '活字印刷推动知识传播',
    displayTime: '约公元1450年',
    era: '人类文明',
    category: '传播革命',
    summary: '欧洲金属活字印刷降低书籍复制成本，文本传播规模快速扩大。',
    detail: '古代中国和朝鲜已发展木版与活字印刷。15世纪中叶，古腾堡体系把金属活字、油性墨和压印设备结合，适合欧洲字母文字的大批量生产。',
    significance: '印刷加快宗教、科学和政治思想传播，促进识字、出版市场与知识标准化；但它是全球多种印刷传统长期积累的一部分。',
    dateNote: '古腾堡具体试验时间难以精确，约1450年代表其印刷体系形成期，而非人类第一次印刷。',
    sources: [
      {
        name: 'The Gutenberg Bible',
        publisher: 'Library of Congress',
        url: 'https://www.loc.gov/exhibits/bibles/the-gutenberg-bible.html'
      }
    ]
  },
  {
    id: 'copernican-revolution',
    title: '日心体系重塑宇宙观',
    displayTime: '公元1543年',
    era: '近现代',
    category: '科学革命',
    summary: '哥白尼系统提出地球绕太阳运行，开启近代天文学的重大转向。',
    detail: '哥白尼在《天体运行论》中用日心框架组织行星运动。这个模型仍保留圆周和本轮，精度也不是立刻全面胜出；后来开普勒、伽利略和牛顿把观测、数学与动力学结合，建立更强的解释体系。',
    significance: '地球不再被置于宇宙物理结构的中心。可检验模型、精密观测与数学定律的结合，成为近代科学方法的重要组成。',
    dateNote: '1543年是《天体运行论》出版年份。“科学革命”是后人概括的长期转型，而不是在这一年一次完成。',
    sources: [
      {
        name: 'The Copernican Model of the Solar System',
        publisher: 'Library of Congress',
        url: 'https://www.loc.gov/collections/finding-our-place-in-the-cosmos-with-carl-sagan/articles-and-essays/models-of-the-cosmos/copernican-model-of-the-solar-system/'
      }
    ]
  },
  {
    id: 'steam-engine',
    title: '蒸汽动力与工业化',
    displayTime: '18世纪后期',
    era: '近现代',
    category: '工业革命',
    summary: '改良蒸汽机把燃料能量转化为稳定机械动力，工厂与运输迅速扩展。',
    detail: '蒸汽机早期用于矿井抽水。瓦特等人的改良提高效率，使其更适合驱动工厂机械；煤炭、纺织、冶金、资本和殖民贸易等因素共同推动工业化，不能只归因于单项发明。',
    significance: '机器生产和化石能源显著提高产出，也加速城市化、劳动关系变化、全球贸易和温室气体排放，塑造现代社会的物质基础。',
    dateNote: '工业革命是18世纪中后期开始、持续数代的过程。1769年常与瓦特蒸汽机专利联系，但不是工业化的唯一开端。',
    sources: [
      {
        name: 'The Industrial Revolution',
        publisher: 'UK Parliament',
        url: 'https://www.parliament.uk/about/living-heritage/transformingsociety/tradeindustry/industryoverview/'
      }
    ]
  },
  {
    id: 'vaccination',
    title: '疫苗开启预防医学新时代',
    displayTime: '公元1796年',
    era: '近现代',
    category: '公共卫生',
    summary: '詹纳以牛痘材料预防天花，疫苗概念随后扩展到多种传染病。',
    detail: '亚洲和非洲部分地区早已有“人痘接种”传统，用较低风险的方式获得保护。1796年，詹纳利用牛痘与天花之间的交叉免疫进行实验。19世纪后，巴斯德等人把疫苗发展为可系统研究和制备的技术。',
    significance: '疫苗让医学从患病后的治疗转向事前预防，挽救大量生命。全球接种与监测最终在1980年消灭天花，这是迄今唯一被人类根除的传染病。',
    mechanism: '疫苗向免疫系统呈递安全形式的抗原，使B细胞、T细胞和记忆细胞建立更快反应。不同疫苗可使用减毒病原体、灭活病原体、蛋白、病毒载体或核酸。',
    evidence: '保护效果来自对照试验、流行病学比较、抗体和细胞免疫测量，以及接种率变化与病例下降的长期监测。安全性需要临床试验和上市后大规模监测。',
    openQuestions: '如何为快速变异病原体产生持久保护、怎样提高全球可及性、如何监测极罕见不良反应和建立公众信任，仍是持续任务。',
    confidence: '原理与公共卫生效益为强共识',
    misconception: '“自然感染也能产生免疫”并不意味着它更安全。自然感染必须先承受疾病、后遗症和传播风险，疫苗的目标是在大幅降低风险的情况下训练免疫系统。',
    glossary: [
      { term: '抗原', definition: '能够被免疫系统识别并诱发特异性反应的分子或结构。' },
      { term: '群体免疫', definition: '当足够多人具有免疫力时，传播链受阻，从而间接保护部分易感者。' }
    ],
    dateNote: '1796年是詹纳天花疫苗实验的代表节点。预防接种思想更早存在，现代疫苗科学则在之后两个世纪持续发展。',
    sources: [
      {
        name: 'History of smallpox vaccination',
        publisher: 'World Health Organization',
        url: 'https://www.who.int/news-room/spotlight/history-of-vaccination/history-of-smallpox-vaccination'
      }
    ]
  },
  {
    id: 'natural-selection',
    title: '自然选择理论系统提出',
    displayTime: '公元1858—1859年',
    era: '近现代',
    category: '演化生物学',
    summary: '达尔文与华莱士提出自然选择机制，解释物种如何在世代中发生适应性变化。',
    detail: '种群中的个体具有可遗传差异，生存和繁殖成功并不相同；与环境更匹配的变异会在后代中增加。达尔文和华莱士在1858年共同发表相关思想，达尔文1859年出版《物种起源》。',
    significance: '自然选择为生物共同祖先、适应和多样化提供统一机制。20世纪遗传学与群体遗传学把孟德尔遗传、突变和选择结合，形成现代演化综合理论。',
    mechanism: '演化发生在种群的基因和性状频率上，而不是个体“努力改变”。除自然选择外，突变、遗传漂变、基因流动和性选择也共同塑造演化。',
    evidence: '证据来自化石序列、生物地理、比较解剖、人工选择、基因组同源性和可直接观察的抗药性等。不同证据在共同祖先框架下相互吻合。',
    openQuestions: '演化是否发生并非科学争议；研究前沿集中在特定性状的选择强度、发育约束、生态反馈和复杂性状的遗传结构。',
    confidence: '现代生物学核心强共识',
    misconception: '演化没有预设目标，也不是“最强者必胜”。适合度指在特定环境中留下后代的相对成功，而且环境变化会改变何种特征有利。',
    glossary: [
      { term: '自然选择', definition: '可遗传差异造成繁殖成功不同，使某些变异在世代中增加的过程。' },
      { term: '遗传漂变', definition: '尤其在小种群中，等位基因频率因随机抽样而变化。' }
    ],
    dateNote: '1858年达尔文与华莱士联合发表摘要，1859年《物种起源》出版。现代演化理论包含后来遗传学的大量发展。',
    sources: [
      {
        name: 'Darwin, evolution & natural selection',
        publisher: 'Understanding Evolution, UC Berkeley',
        url: 'https://evolution.berkeley.edu/evolution-101/mechanisms-the-processes-of-evolution/natural-selection/'
      }
    ]
  },
  {
    id: 'germ-theory',
    title: '病原学说与无菌医学建立',
    displayTime: '19世纪中后期',
    era: '近现代',
    category: '医学革命',
    summary: '实验和临床证据显示，许多传染病由可传播的微生物引起。',
    detail: '塞麦尔维斯观察到洗手降低产褥热，巴斯德用实验反驳自然发生说并研究发酵，科赫建立特定微生物与特定疾病之间的因果方法，李斯特把消毒原则用于外科。理论来自多人、多个国家的累积。',
    significance: '病原学说改变医院卫生、供水、食品处理和传染病控制，为疫苗、抗菌药物和现代公共卫生提供科学基础。',
    mechanism: '病原体通过空气、飞沫、食物、水、接触或媒介进入宿主，在合适组织复制并触发损伤与免疫反应。传播还受宿主免疫、环境和社会网络影响。',
    evidence: '显微观察、培养、接种实验、病例追踪和消毒干预显示微生物与疾病的稳定关联。现代证据还包括分子检测、基因组测序和传播链重建。',
    openQuestions: '微生物群与健康的关系、无症状感染、宿主免疫差异和新病原体溢出机制仍在快速研究。',
    confidence: '传染病病原机制为强共识',
    misconception: '病原学说不等于“所有疾病都由细菌造成”。病毒、真菌、寄生虫也可致病，而遗传、环境、营养和免疫异常解释大量非传染病。',
    glossary: [
      { term: '病原体', definition: '能够在宿主中引起疾病的病毒、细菌、真菌、寄生虫等生物因子。' },
      { term: '无菌术', definition: '通过消毒、灭菌和隔离等方法减少医疗操作中的微生物污染。' }
    ],
    dateNote: '没有单一“病原学说发现年”。19世纪40至80年代的临床、实验和公共卫生工作逐步建立共识。',
    sources: [
      {
        name: 'Germ Theory',
        publisher: 'Science History Institute',
        url: 'https://www.sciencehistory.org/education/classroom-activities/role-playing-games/germ-theory/'
      }
    ]
  },
  {
    id: 'electric-grid',
    title: '电力系统进入城市',
    displayTime: '公元1882年',
    era: '近现代',
    category: '基础设施',
    summary: '早期商业发电站和配电网络开始为城市照明与设备供电。',
    detail: '1882年，纽约珍珠街电站代表早期集中式商业供电。此后交流输电、发电机、电动机和标准化电网相互发展，使电力能够跨更远距离服务工业与家庭。',
    significance: '电力把能源从固定机械轴转化为可灵活分配的通用基础设施，改变照明、通信、生产、交通和家庭生活。',
    dateNote: '1882年是象征性节点。电学发现、发电设备和区域电网在此前后数十年由许多人共同推进。',
    sources: [
      {
        name: 'Lighting a Revolution',
        publisher: 'Smithsonian National Museum of American History',
        url: 'https://americanhistory.si.edu/lighting/'
      }
    ]
  },
  {
    id: 'modern-physics',
    title: '量子论与相对论重塑物理学',
    displayTime: '公元1900—1915年',
    era: '近现代',
    category: '基础科学',
    summary: '经典物理在微观、高速和强引力领域遇到极限，新的理论框架由此建立。',
    detail: '普朗克用能量量子解释黑体辐射；爱因斯坦1905年发展狭义相对论并以光量子解释光电效应，1915年完成广义相对论。随后量子力学由玻尔、海森堡、薛定谔、玻恩、狄拉克等多人发展。',
    significance: '相对论解释时空、引力与宇宙尺度现象，量子理论解释原子、化学键和材料性质。半导体、激光、核磁共振、原子钟和GPS都依赖这些理论。',
    mechanism: '狭义相对论要求物理定律和真空光速对惯性观察者一致；广义相对论把引力描述为时空曲率。量子理论以状态和概率预测测量结果，不能简单套用宏观粒子轨迹。',
    evidence: '水星近日点进动、引力透镜、原子光谱、光电效应、电子衍射和贝尔实验等分别检验理论；现代粒子物理和卫星导航持续进行高精度验证。',
    openQuestions: '量子力学与广义相对论尚未在极端条件下统一；暗物质、暗能量、量子测量解释和量子引力仍是基础物理前沿。',
    confidence: '实验检验极强，统一理论仍未完成',
    misconception: '“观察会改变量子系统”不等于人的意识凭思想创造现实；物理学中的测量是系统与仪器发生可记录的相互作用。',
    glossary: [
      { term: '量子', definition: '某些物理量只能以离散单位交换或测量时使用的基本概念。' },
      { term: '时空', definition: '把三维空间和时间视为统一四维结构的物理框架。' }
    ],
    dateNote: '1900—1915年覆盖早期关键突破，成熟量子力学主要在1920年代建立，后续理论至今仍在发展。',
    sources: [
      {
        name: 'The Nobel Prize in Physics: Popular information and laureates',
        publisher: 'Nobel Prize',
        url: 'https://www.nobelprize.org/prizes/physics/'
      }
    ]
  },
  {
    id: 'powered-flight',
    title: '首次持续受控动力飞行',
    displayTime: '公元1903年',
    era: '近现代',
    category: '交通技术',
    summary: '莱特兄弟完成可持续、受控且有动力的重于空气飞行。',
    detail: '1903年12月17日，莱特飞行器在北卡罗来纳州基蒂霍克附近完成四次飞行。他们把机翼设计、轻型发动机和三轴操纵结合，解决了飞行不仅要升空、还要可控制的问题。',
    significance: '航空在几十年内压缩全球旅行与物流时间，也改变战争、气象观测、救援和人类对地球尺度的感受。',
    dateNote: '此前已有滑翔、气球与多种动力飞行尝试。1903年节点采用“持续、受控、动力、重于空气”的限定。',
    sources: [
      {
        name: '120 Years Ago: The First Powered Flight at Kitty Hawk',
        publisher: 'NASA',
        url: 'https://www.nasa.gov/history/120-years-ago-the-first-powered-flight-at-kitty-hawk/'
      }
    ]
  },
  {
    id: 'penicillin',
    title: '青霉素开启抗生素时代',
    displayTime: '1928年发现，1940年代推广',
    era: '近现代',
    category: '医学',
    summary: '青霉素从实验室发现走向规模化治疗，使许多细菌感染不再必然致命。',
    detail: '弗莱明在1928年观察到青霉菌抑制细菌生长。弗洛里、钱恩及其团队后来完成提纯、试验与生产推进，战时工业协作使青霉素在1940年代实现规模化应用。',
    significance: '抗生素显著降低感染死亡率，并让复杂手术、重症治疗和现代医疗更可行；过度使用同时造成日益严峻的耐药性问题。',
    dateNote: '“发现”与“成为可用药物”相隔十多年，因此时间轴同时标出1928年和1940年代。',
    sources: [
      {
        name: 'The Nobel Prize in Physiology or Medicine 1945',
        publisher: 'Nobel Prize',
        url: 'https://www.nobelprize.org/prizes/medicine/1945/summary/'
      }
    ]
  },
  {
    id: 'transistor',
    title: '晶体管诞生',
    displayTime: '公元1947年',
    era: '数字时代',
    category: '电子技术',
    summary: '小型固态器件能够放大和开关电信号，逐渐取代笨重真空管。',
    detail: '贝尔实验室团队在1947年展示点接触晶体管。此后结型晶体管、集成电路和制造工艺不断进步，让数十亿甚至更多开关能够集成在微小芯片中。',
    significance: '晶体管是现代计算机、通信设备、传感器和数字基础设施的物理基石，也推动电子产品持续小型化与低成本化。',
    dateNote: '1947年对应首次成功演示。现代芯片还依赖其后数十年的材料、光刻、设计和大规模制造创新。',
    sources: [
      {
        name: 'The Nobel Prize in Physics 1956',
        publisher: 'Nobel Prize',
        url: 'https://www.nobelprize.org/prizes/physics/1956/summary/'
      }
    ]
  },
  {
    id: 'dna-double-helix',
    title: 'DNA双螺旋结构揭示遗传复制线索',
    displayTime: '公元1953年',
    era: '数字时代',
    category: '分子生物学',
    summary: '互补碱基配对的双螺旋模型，解释遗传信息如何稳定保存并被复制。',
    detail: '沃森和克里克根据罗莎琳德·富兰克林、莫里斯·威尔金斯等人的X射线衍射资料，以及查加夫碱基比例规律提出双螺旋模型。两条链方向相反，A与T、C与G特异配对。',
    significance: '结构直接暗示每条DNA链都可作为复制模板，推动分子遗传学、基因工程、测序、法医学和基因组医学发展，也成为理解生命信息流的核心。',
    mechanism: 'DNA复制时两条链分开，DNA聚合酶依据互补配对合成新链。遗传信息来自碱基排列顺序；细胞通过转录和翻译把部分序列转为RNA和蛋白质。',
    evidence: 'X射线衍射“照片51”限制螺旋尺寸，查加夫规律支持互补配对。后续标记实验、结构研究和直接测序反复验证了DNA复制与信息编码机制。',
    openQuestions: '双螺旋只是起点。染色质三维折叠、基因调控、表观遗传和非编码区域功能仍构成庞大研究领域。',
    confidence: '结构与基本机制为极强共识',
    misconception: '双螺旋不是两个人孤立完成的“灵光一现”。模型依赖富兰克林等人的关键数据和此前数十年化学、遗传学积累，研究过程也涉及数据使用与荣誉分配的伦理争议。',
    glossary: [
      { term: '碱基', definition: 'DNA遗传字母A、T、C、G对应的含氮化学结构。' },
      { term: '互补配对', definition: 'DNA中A通常与T、C通常与G通过氢键配对的规则。' }
    ],
    dateNote: '1953年三篇相关论文在《Nature》同期发表。DNA是遗传物质的证据在此前已逐步建立。',
    sources: [
      {
        name: '1953: DNA Double Helix',
        publisher: 'National Human Genome Research Institute',
        url: 'https://www.genome.gov/25520255/online-education-kit-1953-dna-double-helix'
      }
    ]
  },
  {
    id: 'sputnik',
    title: '第一颗人造卫星进入轨道',
    displayTime: '公元1957年',
    era: '数字时代',
    category: '太空时代',
    summary: '苏联发射“斯普特尼克1号”，人类制造的物体首次绕地球运行。',
    detail: '斯普特尼克1号是一颗携带无线电发射器的金属球，于1957年10月4日进入地球轨道。世界各地无线电爱好者可以接收它的“哔哔”信号，发射同时展示了洲际火箭和轨道工程能力。',
    significance: '它开启太空时代和美苏太空竞赛，推动卫星通信、气象、地球观测、导航和空间科学，也加速美国成立NASA。',
    mechanism: '进入轨道并不是抵消重力，而是获得足够水平速度，使航天器持续下落却不断错过地面。火箭分级抛弃空载结构，提高最终速度。',
    evidence: '卫星无线电信号、全球光学跟踪、苏联任务记录和轨道计算共同确认发射。其轨道衰减和再入时间也能由大气阻力模型解释。',
    openQuestions: '今天的前沿转向轨道拥堵、空间碎片、商业星座、深空资源与太空治理；技术能力增长快于许多国际规则。',
    confidence: '历史记录完整',
    misconception: '卫星在轨道上仍持续受到地球重力；它不是“飞出重力范围”，而是在近乎失重的自由落体状态中绕行。',
    glossary: [
      { term: '轨道速度', definition: '航天器在特定高度保持轨道所需的切向速度。' },
      { term: '自由落体', definition: '物体主要只受重力作用的运动状态，轨道运行也是持续自由落体。' }
    ],
    dateNote: '斯普特尼克1号于1957年10月4日发射，电池工作约三周，1958年1月再入大气。',
    sources: [
      {
        name: '65 Years Ago: Sputnik Ushers in the Space Age',
        publisher: 'NASA',
        url: 'https://www.nasa.gov/history/65-years-ago-sputnik-ushers-in-the-space-age/'
      }
    ]
  },
  {
    id: 'moon-landing',
    title: '人类登上月球',
    displayTime: '公元1969年',
    era: '数字时代',
    category: '航天',
    summary: '阿波罗11号任务让人类首次在另一个天体表面行走。',
    detail: '1969年7月，阿波罗11号宇航员阿姆斯特朗和奥尔德林在月球静海着陆并开展舱外活动，柯林斯留在月球轨道。任务带回样本并部署科学仪器。',
    significance: '登月展示了火箭、导航、计算、材料和大型系统工程的综合能力，也让地球作为有限共同家园的图像深入公众意识。',
    dateNote: '首次载人登月发生于1969年7月20日（协调世界时）；不同地区日期显示可能因时区略有差异。',
    sources: [
      {
        name: 'Apollo 11 Mission Overview',
        publisher: 'NASA',
        url: 'https://www.nasa.gov/mission/apollo-11/'
      }
    ]
  },
  {
    id: 'microprocessor',
    title: '微处理器把CPU集成到芯片',
    displayTime: '公元1971年前后',
    era: '数字时代',
    category: '计算基础',
    summary: '处理器核心功能被集成到少量乃至单个芯片中，通用计算迅速小型化。',
    detail: '20世纪60年代末多个团队尝试把中央处理器压缩进更少芯片。1971年商用Intel 4004把约2300个晶体管集成在单片CPU中；随后8位和16位微处理器推动计算器、控制器和个人电脑发展。',
    significance: '微处理器让同一硬件通过软件承担不同任务，把计算能力嵌入汽车、家电、工业控制和通信设备，并为个人计算和后来的智能手机奠定硬件基础。',
    mechanism: 'CPU以取指、译码、执行循环运行指令，算术逻辑单元处理数据，寄存器保存高速状态，控制单元协调数据流。集成电路让连接缩短、速度提高且单位功能成本下降。',
    evidence: '芯片掩膜、专利、产品文档、工程样机和团队口述史保存了发展过程。多个并行方案说明“第一颗微处理器”取决于单芯片、通用性和商业化等定义。',
    openQuestions: '当晶体管缩放接近材料和能耗限制，芯片设计正在转向多核、专用加速器、先进封装、光计算和量子计算等路径。',
    confidence: '技术史资料充分，优先权定义需说明',
    misconception: '微处理器不是完整电脑。它仍需要存储器、输入输出、电源和软件；现代“系统级芯片”才会把更多模块集成在一起。',
    glossary: [
      { term: 'CPU', definition: '执行程序指令、算术逻辑运算并协调系统的中央处理器。' },
      { term: '集成电路', definition: '在一块半导体材料上制造大量晶体管和互连的电子电路。' }
    ],
    dateNote: '1971年是多种早期微处理器方案公开或商业化的关键年。4004是标志性产品，但“谁最先”需按技术定义区分。',
    sources: [
      {
        name: '1971: Microprocessor Integrates CPU Function onto a Single Chip',
        publisher: 'Computer History Museum',
        url: 'https://www.computerhistory.org/siliconengine/microprocessor-integrates-cpu-function-onto-a-single-chip/'
      }
    ]
  },
  {
    id: 'internet-tcp-ip',
    title: '互联网采用TCP/IP',
    displayTime: '公元1983年',
    era: '数字时代',
    category: '网络',
    summary: 'ARPANET切换到TCP/IP协议族，不同网络开始以共同规则互联。',
    detail: 'TCP/IP把信息拆分为数据包，并规定它们如何寻址、传输和重新组合。1983年的协议切换常被视为现代互联网形成的重要节点，但互联网来自此前数十年的分组交换、网络研究与标准协作。',
    significance: '开放协议允许不同硬件与网络彼此通信，形成可扩展的“网络之网络”，支撑全球信息交换和后来的万维网。',
    dateNote: '互联网没有单一生日。1969年ARPANET首次连接、1970年代TCP研究和1983年协议切换都可作为不同意义的起点。',
    sources: [
      {
        name: 'A Brief History of the Internet',
        publisher: 'Internet Society',
        url: 'https://www.internetsociety.org/internet/history-internet/brief-history-internet/'
      }
    ]
  },
  {
    id: 'world-wide-web',
    title: '万维网诞生',
    displayTime: '公元1989年',
    era: '数字时代',
    category: '信息网络',
    summary: '蒂姆·伯纳斯-李在CERN提出以超文本连接互联网资源的方案。',
    detail: '万维网把URL、HTTP和HTML结合，使文档能够通过超链接相互连接并由浏览器访问。1989年提出方案，随后完成首个服务器、浏览器与网站；1993年CERN开放相关软件，促进全球传播。',
    significance: 'Web把互联网从专业网络基础设施转变为普通人可以浏览、发布和连接信息的公共空间，并催生搜索、电子商务和社交媒体。',
    dateNote: '1989年是最初提案年份；首个网站在随后运行，Web的公众扩展主要发生在1990年代。Web与互联网不是同一事物。',
    sources: [
      {
        name: 'Where the web was born',
        publisher: 'CERN',
        url: 'https://home.cern/science/computing/the-birth-of-the-web/where-web-was-born/'
      }
    ]
  },
  {
    id: 'human-genome',
    title: '人类基因组计划完成',
    displayTime: '公元2003年',
    era: '数字时代',
    category: '生命科学',
    summary: '国际合作完成具有代表性的人类基因组序列，为基因组医学奠定基础。',
    detail: '人类基因组计划从1990年启动，到2003年宣布完成主要目标。项目测定并绘制了人类DNA的大部分序列，同时推动测序技术、数据共享和遗传伦理讨论。',
    significance: '基因组成为研究遗传病、人类演化和个体差异的公共参照，并推动测序成本快速下降；它也提醒人们，基因并不能单独决定复杂性状。',
    dateNote: '2003年版本仍留有少量难以测序区域。后续项目在2022年等节点继续补全参考序列，因此“完成”对应当时项目目标。',
    sources: [
      {
        name: 'The Human Genome Project',
        publisher: 'National Human Genome Research Institute',
        url: 'https://www.genome.gov/human-genome-project'
      }
    ]
  },
  {
    id: 'smartphone-era',
    title: '智能手机走向大众',
    displayTime: '2007年前后',
    era: '数字时代',
    category: '移动计算',
    summary: '触屏、移动网络、传感器与应用生态汇聚，计算机进入日常随身空间。',
    detail: '智能手机并非始于单一产品。早期个人数字助理、移动电话和触屏设备长期演进；2007年前后，多点触控界面、完整浏览器和后来的应用商店推动现代智能手机形态快速普及。',
    significance: '相机、地图、通信、支付和媒体被整合到随身设备中，改变工作、社交与信息获取，同时带来注意力、隐私和平台治理问题。',
    dateNote: '这里把2007年作为大众转折的象征节点，而非“第一部智能手机”的绝对起点。',
    sources: [
      {
        name: '2007 Timeline',
        publisher: 'Computer History Museum',
        url: 'https://www.computerhistory.org/timeline/2007/'
      }
    ]
  },
  {
    id: 'crispr',
    title: 'CRISPR成为可编程基因编辑工具',
    displayTime: '公元2012年',
    era: '数字时代',
    category: '生物技术',
    summary: '源自细菌免疫系统的CRISPR-Cas机制被改造为按序列定位并切割DNA的工具。',
    detail: '细菌把病毒DNA片段保存在CRISPR区域，用RNA引导Cas蛋白识别再次入侵的病毒。2012年研究显示Cas9可由设计好的向导RNA编程切割目标DNA，随后迅速用于细胞和生物体基因组编辑。',
    significance: 'CRISPR降低基因编辑门槛，推动基础研究、疾病模型、农业改良和基因治疗。部分疗法已进入临床应用，同时胚系编辑引发重大伦理和治理问题。',
    mechanism: '向导RNA与目标DNA互补配对，Cas蛋白在邻近特定短序列处切割。细胞修复断裂时可能产生小突变，或在提供模板时写入指定变化；碱基编辑和先导编辑可减少双链切割。',
    evidence: '体外生化实验验证RNA引导切割，细胞测序确认目标位点改变，动物模型和临床试验检验功能与安全。全基因组检测用于评估脱靶编辑。',
    openQuestions: '如何把编辑器安全送入特定组织、避免脱靶和免疫反应、控制长期影响，以及如何公平使用和监管胚系编辑，仍是核心问题。',
    confidence: '分子机制与编辑能力证据强，长期应用风险持续评估',
    misconception: 'CRISPR不是能随意设计复杂性状的“基因魔法剪刀”。多数性状涉及许多基因与环境，精准送达和安全修复往往比切开DNA更困难。',
    glossary: [
      { term: '向导RNA', definition: '通过碱基互补把Cas蛋白带到目标DNA序列的RNA分子。' },
      { term: '脱靶', definition: '编辑系统在预定目标之外相似序列发生不希望改变的现象。' }
    ],
    dateNote: 'CRISPR天然系统早已被研究；2012年是其被证明可编程切割DNA的标志节点，2013年后在真核细胞中迅速扩展。',
    sources: [
      {
        name: 'A programmable dual-RNA-guided DNA endonuclease in adaptive bacterial immunity',
        publisher: 'Science',
        url: 'https://www.science.org/doi/10.1126/science.1225829'
      }
    ]
  },
  {
    id: 'deep-learning',
    title: '深度学习取得突破',
    displayTime: '公元2012年',
    era: '数字时代',
    category: '人工智能',
    summary: '深层神经网络在大规模图像识别中显著提升表现，引发新一轮AI发展。',
    detail: 'AlexNet利用卷积神经网络、GPU计算和大规模标注数据，在ImageNet竞赛中取得突出结果。神经网络思想并不新，但算力、数据和训练技术的结合使其在多个任务上开始超越传统方法。',
    significance: '这一突破推动计算机视觉、语音识别和自然语言处理转向深度学习，并带动算力基础设施和AI研究投资快速增长。',
    dateNote: '2012年是一次标志性转折，不是深度学习的发明年份。关键理论和实验积累可追溯到此前数十年。',
    sources: [
      {
        name: 'ImageNet Classification with Deep Convolutional Neural Networks',
        publisher: 'NeurIPS Proceedings',
        url: 'https://proceedings.neurips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks'
      }
    ]
  },
  {
    id: 'alphago',
    title: 'AlphaGo击败顶尖棋手',
    displayTime: '公元2016年',
    era: '数字时代',
    category: '人工智能',
    summary: '结合深度神经网络与搜索的AlphaGo，在围棋比赛中击败李世石。',
    detail: 'AlphaGo使用策略网络、价值网络和蒙特卡洛树搜索评估复杂棋局。2016年五番棋以4比1战胜李世石，展示机器学习系统能够在巨大搜索空间中形成高水平决策。',
    significance: '这场比赛让强化学习和深度学习进入全球公众视野，也推动相关方法用于蛋白质研究、控制和其他复杂优化问题。',
    dateNote: 'AlphaGo在2015年已战胜职业棋手樊麾；2016年对李世石的比赛因对手水平和公众影响而成为标志节点。',
    sources: [
      {
        name: 'AlphaGo',
        publisher: 'Google DeepMind',
        url: 'https://deepmind.google/research/breakthroughs/alphago/'
      }
    ]
  },
  {
    id: 'transformer',
    title: 'Transformer架构提出',
    displayTime: '公元2017年',
    era: '数字时代',
    category: '人工智能',
    summary: '以注意力机制为核心的新架构，提高了大规模序列模型的并行训练能力。',
    detail: '论文《Attention Is All You Need》提出Transformer，以自注意力建立序列元素之间的关系，减少对循环结构的依赖。该架构随后扩展到语言、图像、音频和多模态任务。',
    significance: 'Transformer成为大语言模型和许多生成式AI系统的基础架构，使模型能够从海量数据中学习复杂模式并有效扩展。',
    dateNote: '注意力机制早于2017年出现；这一年代表Transformer论文发表，而之后的能力来自架构、数据、算力和训练方法的共同发展。',
    sources: [
      {
        name: 'Attention Is All You Need',
        publisher: 'Google Research',
        url: 'https://research.google/pubs/attention-is-all-you-need/'
      }
    ]
  },
  {
    id: 'alphafold',
    title: 'AlphaFold推动蛋白质结构预测',
    displayTime: '公元2020—2022年',
    era: '数字时代',
    category: 'AI与科学',
    summary: '深度学习显著提高从氨基酸序列预测蛋白质三维结构的准确度，并公开大规模预测数据库。',
    detail: '蛋白质由氨基酸链折叠成三维结构，结构影响其功能。AlphaFold2在2020年CASP评测中取得显著突破，结合注意力机制、进化序列信息和几何约束预测结构；之后与合作机构发布大量预测。',
    significance: '高质量预测能帮助提出实验假设、理解蛋白功能和筛选研究目标，缩短部分结构生物学流程；它不能替代所有实验，也不直接等于药物发现已经解决。',
    mechanism: '模型利用相关物种中序列共同变化推断氨基酸空间接近关系，并在神经网络中迭代更新序列与几何表示，输出结构和逐区域可信度。',
    evidence: 'CASP盲测在实验结构公开前比较预测与真实结果，减少挑选案例偏差。后续研究通过X射线晶体学、冷冻电镜和功能实验检验预测。',
    openQuestions: '蛋白动态、无序区域、突变影响、配体和复合物、多种构象与细胞环境仍难完整预测；训练数据偏差和结果解释也需注意。',
    confidence: '静态结构预测能力经盲测验证，适用范围有边界',
    misconception: 'AlphaFold没有“解决整个蛋白质折叠问题”。它主要预测结构结果，不完整模拟真实折叠过程，也不能替代功能、生化和临床实验。',
    glossary: [
      { term: '蛋白质结构', definition: '氨基酸链形成的三维形状，通常分为一级到四级结构层次。' },
      { term: '盲测', definition: '参与者在不知道实验答案的情况下提交预测，再由独立组织统一评估。' }
    ],
    dateNote: '2020年CASP14是技术突破节点，2021年论文与数据库发布，之后模型和覆盖范围继续扩展。',
    sources: [
      {
        name: 'Highly accurate protein structure prediction with AlphaFold',
        publisher: 'Nature',
        url: 'https://www.nature.com/articles/s41586-021-03819-2'
      },
      {
        name: 'AlphaFold Protein Structure Database',
        publisher: 'EMBL-EBI',
        url: 'https://alphafold.ebi.ac.uk/'
      }
    ]
  },
  {
    id: 'modern-ai',
    title: '现代人工智能走向大众',
    displayTime: '公元2022年至今',
    era: '数字时代',
    category: '正在发生',
    summary: '生成式AI通过自然语言界面进入公众生活，开始参与写作、编程、图像与科学工作。',
    detail: '大规模基础模型能够根据自然语言生成文本、代码、图像、音频等内容。2022年后，对话式产品快速普及，模型能力、工具使用和多模态交互持续发展；错误信息、偏见、版权、安全、能源消耗与就业影响也成为公共议题。',
    significance: '人工智能正在从单项识别工具转向更通用的人机协作界面。它可能改变知识生产和组织方式，但其长期社会影响并未定型，需要技术、制度与公众共同选择。',
    dateNote: '这是仍在进行的阶段。2022年是生成式AI进入大众视野的象征节点，不代表现代AI只有单一产品、公司或起点；内容应随新证据持续更新。',
    sources: [
      {
        name: 'Introducing ChatGPT',
        publisher: 'OpenAI',
        url: 'https://openai.com/index/chatgpt/'
      },
      {
        name: 'Artificial Intelligence Index Report',
        publisher: 'Stanford Institute for Human-Centered AI',
        url: 'https://hai.stanford.edu/ai-index'
      }
    ]
  }
]

const scienceNotes = {
  'earth-formation': {
    evidence: '陨石中最古老的钙铝包体给出太阳系形成起点；铀—铅等放射性同位素像多个独立时钟。月球岩石和地球古老锆石提供交叉检验，因此地球年龄并非根据外观或单块岩石猜测。',
    misconception: '45.4亿年不是地球上发现的“最老普通岩石”的年龄。早期岩石大多被板块和熔融循环破坏，年龄来自陨石、月岩、锆石和同位素模型的综合。',
    confidence: '年龄与吸积模型为强共识'
  },
  'moon-formation': {
    evidence: '阿波罗样本显示地月岩石同位素高度相似，月球贫挥发物、核心较小；角动量、轨道和数值模拟共同约束碰撞模型，但不同撞击情景仍可产生相似结果。',
    misconception: '“忒伊亚撞击地球”是当前最佳模型，不是被摄像记录的确定历史。撞击体大小、次数、角度和混合程度仍在研究。',
    confidence: '巨型碰撞为主流模型，细节未定'
  },
  'first-oceans': {
    evidence: '约44亿年前锆石中的氧同位素和矿物包裹体提示它曾与低温液态水和地壳作用；沉积岩、枕状熔岩和后期同位素记录继续追踪海洋存在。',
    misconception: '水不一定全由彗星送来，也不一定全来自地球内部。现代研究比较陨石、彗星与地幔水的氢同位素，支持多来源、不同阶段贡献。',
    confidence: '早期液态水证据较强，水源比例仍研究'
  },
  'earliest-life': {
    evidence: '候选证据包括碳同位素偏好、叠层石层状结构、微化石和有机分子。研究必须排除非生物化学反应、后期污染和岩石变质造成的拟态。',
    misconception: '“最早生命证据”不是最早生命本身。化石记录只能给出生命至少已经存在的最晚界限，真正起源可能更早。',
    confidence: '约35亿年前生命证据强，更早记录有争论'
  },
  'oxygenic-photosynthesis': {
    evidence: '条带状铁建造记录氧与溶解铁反应，碳和硫同位素记录氧化环境变化；蓝细菌系统发育和光合作用反应中心比较帮助重建代谢起源。',
    misconception: '会光合作用不一定会释放氧。更早的无氧光合作用可使用硫化物等电子供体；释放氧的关键创新是利用水。',
    confidence: '过程共识强，最早年代仍有范围'
  },
  'great-oxidation': {
    evidence: '古老岩层中硫同位素的非质量分馏信号消失、红层和氧化矿物增加，说明大气氧跨过重要门槛；不同盆地记录显示变化并非全球同步一步完成。',
    misconception: '大氧化事件没有把氧气立刻提升到今天水平。之后十多亿年氧含量仍可能较低并反复波动。',
    confidence: '大气氧化转折为强共识'
  },
  'first-eukaryotes': {
    evidence: '大型复杂微化石、细胞壁结构和特定生物标志物提供化石线索；线粒体拥有环状DNA、双层膜和细菌式核糖体，强力支持内共生起源。',
    misconception: '真核细胞不是单纯“更高级细菌”。它们来自多个古老细胞支系的深度合作与基因整合，演化树也不是从低级到高级的梯子。',
    confidence: '内共生为强共识，早期谱系细节持续更新'
  },
  'ediacaran-animals': {
    evidence: '细粒沉积物保存身体印痕，微生物席帮助软体生物留下轮廓；生长模式、移动痕迹和胆固醇类分子可辅助判断生物属性。',
    misconception: '埃迪卡拉生物群并不全是寒武纪动物的直接祖先。部分可能属于早期动物，部分或代表已经灭绝、难以归类的身体方案。',
    confidence: '生物群存在证据强，亲缘分类争议较大'
  },
  'cambrian-explosion': {
    evidence: '全球多个地层中硬体化石、微小壳体和遗迹化石在数千万年内显著增加；澄江和伯吉斯页岩等特异埋藏保存软组织，减少只看硬壳的偏差。',
    misconception: '寒武纪生命大爆发不是一天内突然出现全部动物，也不是演化论的空白。前寒武纪动物和遗传分化更早，寒武纪主要记录快速多样化与可见化。',
    confidence: '多样化事实强，驱动因素多元'
  },
  'land-plants': {
    evidence: '孢子、角质层、维管束和根状结构按地层顺序出现；现生轮藻与陆生植物基因和细胞结构比较支持共同祖先。',
    misconception: '植物不是一次“爬上岸”。防失水、支撑、运输、繁殖和根系等适应在不同支系、不同时间逐步组合。',
    confidence: '化石与分子证据一致'
  },
  'first-tetrapods': {
    evidence: '从肉鳍鱼到早期四足动物的一系列化石展示头骨变平、颈部出现、鳍内骨骼和趾的变化；足迹有时还能把最早时间向前推。',
    misconception: '长出四肢不等于立刻在陆地奔跑。阿坎托斯特加等早期四足动物很可能仍主要生活在水中，四肢最初可服务浅水移动。',
    confidence: '过渡序列充分，生态路线仍研究'
  },
  'permian-extinction': {
    evidence: '西伯利亚大火成岩省与灭绝时间接近，火山岩和沉积层定年、碳同位素骤变、海温指标、缺氧金属和化石消失共同支持多重环境压力。',
    misconception: '二叠纪末灭绝不能简单归因于“一座火山”或单一毒气。大规模持续喷发通过气候、海洋酸化、缺氧和食物网形成级联影响。',
    confidence: '灭绝与大规模火山活动联系强，链条细节持续研究'
  },
  'first-dinosaurs': {
    evidence: '骨盆、踝部和四肢结构帮助识别恐龙；放射性定年和地层关系确定三叠纪化石年代，足迹补充骨骼稀少地区。',
    misconception: '恐龙出现后没有立刻“统治地球”。它们最初只是多个主龙类群之一，在三叠纪末灭绝之后才占据更多生态位。',
    confidence: '化石证据强，最早候选分类仍调整'
  },
  'flowering-plants': {
    evidence: '花粉、叶片、花和果实化石显示白垩纪被子植物快速扩展；分子系统发育与化石校准估算支系分化时间。',
    misconception: '分子钟给出的更早起源不等于已经发现同年代化石。模型依赖突变速率和校准点，需与地层证据共同解释。',
    confidence: '白垩纪扩张证据强，最早起源时间有争议'
  },
  'kpg-extinction': {
    evidence: '全球边界层富集铱、发现冲击石英和玻璃微球，尤卡坦希克苏鲁伯陨石坑的年代与灭绝一致；沉积和生态模型解释撞击冬季。',
    misconception: '恐龙没有全部灭绝，鸟类幸存至今；也不是撞击瞬间杀死地球上每一只非鸟恐龙，主要破坏来自随后全球环境与食物网崩溃。',
    confidence: '小行星撞击为关键原因的强共识'
  },
  'early-primates': {
    evidence: '踝骨、牙齿、抓握手足和眼眶方向用于识别早期灵长类；地层与古气候资料显示它们在古新世—始新世温暖期扩散。',
    misconception: '人类不是由今天的猴子演变而来。人类与其他现生灵长类共享已经灭绝的共同祖先，各支系都独立演化至今。',
    confidence: '主要支系关系明确，最早成员边界有争论'
  },
  'hominin-origins': {
    evidence: '头骨、牙齿、股骨和足部化石提供双足与食性线索；人类和黑猩猩基因组差异可估算共同祖先时间，但需依赖突变率和化石校准。',
    misconception: '“人与黑猩猩分家”不是两个现代物种突然分开。共同祖先种群可能在很长时间内部分隔离并发生基因交流。',
    confidence: '共同祖先共识强，精确时间和早期物种位置仍研究'
  },
  'genus-homo': {
    evidence: '下颌、牙齿、颅骨和石器组合用于识别人属早期成员；但化石碎片有限，脑容量和牙齿等特征在不同物种间重叠。',
    misconception: '“人属”不是突然跨过某条智能门槛。早期人属与南方古猿长期并存，许多技术和行为在属出现之前已有根源。',
    confidence: '人属存在明确，最早化石归属有争论'
  },
  'homo-sapiens': {
    evidence: '摩洛哥、埃塞俄比亚等地化石从面部、脑壳和牙齿显示现代特征的镶嵌形成；古DNA与现代基因组支持非洲起源及后续与其他人类杂交。',
    misconception: '“智人出现于30万年前”不是某一对父母生下第一位现代人。物种特征在相互交流的种群中逐渐形成，边界由后人依据化石定义。',
    confidence: '非洲起源为强共识，具体区域网络持续研究'
  },
  'agriculture': {
    evidence: '植物种子尺寸、穗轴不易脱落、动物骨骼年龄结构、磨石和淀粉粒可识别驯化与种植；沉积花粉和同位素重建环境与饮食。',
    misconception: '农业不是单向“进步”且没有立即让所有人生活更好。早期农民常面临饮食单一、劳动增加和传染病上升，采集狩猎也没有因此消失。',
    confidence: '多地区独立起源证据强'
  },
  'writing': {
    evidence: '泥板上从数量符号到语音与词义符号的连续变化、书吏练习、行政档案和多语文本展示书写系统如何扩展功能；不同地区材料提供独立起源证据。',
    misconception: '文字不是语言本身，没有文字的社会也拥有完整语言与复杂知识。书写记录部分语言和制度，但大量人口在早期文字社会中并不识字。',
    confidence: '早期材料丰富，成熟文字边界需定义'
  },
  'printing-press': {
    evidence: '保存的木版印刷品、活字、纸张水印、印刷错误和字体磨损可重建生产技术与版本传播；书目和价格记录显示印刷规模与市场变化。',
    misconception: '古腾堡不是全世界第一个想到印刷或活字的人。东亚早已有木版和活字传统；他的体系是在欧洲字母、纸张和商业环境中形成的关键组合。',
    confidence: '实物与文献记录充分'
  },
  'copernican-revolution': {
    evidence: '第谷精密观测、开普勒椭圆轨道、伽利略看到金星相位与木星卫星，牛顿引力统一天上地下运动。日心模型因预测与机制逐步胜出，而非单凭权威接受。',
    misconception: '哥白尼模型最初并不比所有地心计算立刻更准确，也不是伽利略用望远镜“一眼证明地球在动”。科学转型依靠多代人的数据、数学和理论。',
    confidence: '现代天体力学验证极强'
  },
  'steam-engine': {
    evidence: '专利、工程图、矿井和工厂记录、燃煤量、产量和城市人口资料展示动力技术与工业化同步扩张；不同国家比较说明制度与资源同样关键。',
    misconception: '工业革命不是瓦特一个人发明蒸汽机后自动发生。煤、冶金、纺织、资本、劳动力、殖民体系、交通与专利制度共同参与。',
    confidence: '技术与经济史证据充分，因果权重持续讨论'
  },
  'electric-grid': {
    evidence: '发电站设备、配电图、用电账单、专利和城市照明记录保存完整。交流系统远距离输电的效率可由电路理论和实际损耗测量直接验证。',
    misconception: '“电流大战”不是单纯天才个人对决，也不是交流彻底取代直流。现代系统同时使用交流输配电与大量直流电子和高压直流线路。',
    confidence: '技术史与物理机制明确'
  },
  'powered-flight': {
    evidence: '1903年现场照片、日记、风洞资料、发动机与飞行器遗物、目击记录保存飞行距离和控制设计；后续复制试验检验空气动力学。',
    misconception: '首飞只有几十秒不代表“勉强跳起”。关键创新是可重复的三轴控制；升降舵、方向舵与机翼扭转让飞行员能控制俯仰、偏航和滚转。',
    confidence: '历史记录充分'
  },
  'penicillin': {
    evidence: '培养皿抑菌圈显示青霉菌分泌物阻止细菌生长，动物和临床试验检验疗效，生产记录展示发酵和纯化扩展；耐药菌基因可直接测序。',
    misconception: '弗莱明没有独自把一块发霉培养皿直接变成药。提纯、剂量、临床试验和工业生产依赖弗洛里、钱恩、希特利及大量团队。',
    confidence: '发现与临床效应证据完整'
  },
  'transistor': {
    evidence: '实验器件、实验笔记、专利和电流—电压测量记录点接触晶体管的诞生；半导体能带理论和现代芯片运行持续验证其物理机制。',
    misconception: '晶体管不是单纯“很小的开关”。在数字电路中它常近似开关，在模拟电路中也可连续放大信号；芯片能力还依赖互连、存储和软件。',
    confidence: '物理与技术史明确'
  },
  'moon-landing': {
    evidence: '月岩样本由世界多地实验室分析，月面反射器至今用于激光测距；独立无线电跟踪、轨道数据、照片、录像和苏联监测构成互相独立的证据链。',
    misconception: '登月影像中的旗帜摆动来自插入时的惯性和横杆，不需要空气；天空没有星星是因为相机曝光针对明亮月面，这些都不构成造假证据。',
    confidence: '历史与物证极其充分'
  },
  'internet-tcp-ip': {
    evidence: '协议规范、源代码、网络日志和参与者档案记录了ARPANET到TCP/IP的演进；不同网络成功互联可重复检验分层和数据包路由设计。',
    misconception: '互联网不等于万维网。互联网是互联网络和协议基础，Web是运行其上的一种超文本服务；电子邮件等应用早于Web。',
    confidence: '技术史记录完整'
  },
  'world-wide-web': {
    evidence: 'CERN保存1989年提案、首台服务器、浏览器代码和早期网页；HTTP请求和HTML链接机制可在重建的首个网站中直接体验。',
    misconception: '蒂姆·伯纳斯-李没有发明互联网。他在已有互联网之上组合URL、HTTP与HTML，创建容易发布和连接文档的Web。',
    confidence: '原始档案完整'
  },
  'human-genome': {
    evidence: '公开测序数据、物理与遗传图谱、独立实验室覆盖和质量指标构成结果；后续个体测序、长读长技术与端粒到端粒组装不断发现并填补缺口。',
    misconception: '人类基因组计划没有测完“全人类的唯一基因组”，也没有找到每个性状的一一对应基因。参考序列是拼合参照，人类遗传多样性远超单一线性序列。',
    confidence: '项目成果明确，参考表示持续改进'
  },
  'smartphone-era': {
    evidence: '设备规格、销量、移动网络覆盖、应用下载和使用研究记录普及过程；早期PDA和智能电话实物说明2007年前已有多条技术路线。',
    misconception: '智能手机不是2007年从零发明。标志性产品把电容触控、浏览器、传感器、移动宽带和后来的应用商店整合为可大规模采用的生态。',
    confidence: '技术史清楚，象征起点是产品史选择'
  },
  'deep-learning': {
    evidence: 'ImageNet盲测排行榜、公开模型和数据使结果可比较；消融实验、后续复现和跨视觉、语音任务表现支持深层网络优势，同时也揭示数据偏差与鲁棒性问题。',
    misconception: '2012年没有“发明神经网络”。反向传播、卷积网络和GPU计算均有更长历史，突破来自算法、数据、算力和工程组合。',
    confidence: '性能突破可复现，能力解释仍研究'
  },
  'alphago': {
    evidence: '正式比赛棋谱完整公开，系统在固定规则下与职业棋手对局；论文报告训练、搜索和评估方法，后续AlphaGo Zero用自我博弈展示不同训练路线。',
    misconception: '会下围棋不等于获得人类式通用理解。AlphaGo在明确规则、可模拟反馈的封闭任务中极强，不能因此自动处理现实世界任意问题。',
    confidence: '比赛结果与方法记录充分'
  },
  'transformer': {
    evidence: '机器翻译基准、消融实验和开放实现显示自注意力架构的并行性与效果；随后在语言、视觉和生物序列中的广泛复现证明其通用建模价值。',
    misconception: 'Transformer本身不等于大语言模型，更不等于意识。模型能力还取决于数据、目标函数、参数规模、推理方法、工具和安全训练。',
    confidence: '架构效果明确，内部表征解释仍研究'
  },
  'modern-ai': {
    evidence: '标准测试、盲评、真实用户研究和可重复任务展示模型能力；红队测试、偏差评估和事实核查同时记录幻觉、脆弱性与风险。任何单一排行榜都不能概括现实能力。',
    misconception: '语言流畅不等于内容必然真实，也不能据对话表现直接证明系统具有意识。生成模型根据学习到的模式产生输出，需要来源核查和人类责任。',
    confidence: '能力快速演进，长期社会影响高度不确定'
  }
}

const deepNotes = {
  'earth-formation': {
    mechanism: '尘埃先靠静电黏附成团，随后形成公里级微行星。重力使碰撞与吸积加速；撞击能、放射性衰变和重元素下沉释放热量，促使原始地球大范围熔融并发生核—幔分异。',
    openQuestions: '地球吸积持续多久、挥发性元素在何阶段加入、早期地核和磁场何时稳定，以及月球形成撞击如何重置地球表层，仍需陨石、同位素和模拟共同约束。',
    glossary: [{ term: '吸积', definition: '小颗粒和小天体经碰撞、黏结与引力聚合成长为更大天体的过程。' }]
  },
  'moon-formation': {
    mechanism: '高速碰撞把地球外层和撞击体物质加热、汽化并抛入轨道，轨道碎片盘在重力和碰撞耗散作用下聚合成月球；随后潮汐把月球逐渐推远。',
    openQuestions: '经典单次大撞击、高能混合、多次小撞击等模型如何同时解释地月同位素相似、挥发物含量和角动量，仍是行星科学重点。',
    glossary: [{ term: '角动量', definition: '描述旋转和轨道运动状态的物理量，在封闭系统中守恒。' }]
  },
  'first-oceans': {
    mechanism: '地幔和火山释放水汽，地表温度下降后水汽凝结；含水小天体也可能增加水储量。硅酸盐风化吸收二氧化碳，进一步帮助长期降温并稳定液态水。',
    openQuestions: '地球水有多少来自内部脱气、多少来自不同类型小行星或彗星，海洋是否曾被巨型撞击反复蒸发，以及早期盐度如何，都没有精确答案。',
    glossary: [{ term: '同位素', definition: '质子数相同但中子数不同的同一元素原子，可作为物质来源和年代的示踪剂。' }]
  },
  'earliest-life': {
    mechanism: '生命起源可能经历有机分子生成、信息复制、代谢网络和膜结构逐步耦合。RNA世界、海底热液孔和浅水湿干循环等是假说，尚无单一路线得到完整验证。',
    openQuestions: '最初遗传分子是什么、代谢与复制谁先出现、生命起源于何种环境、地球生命是否只起源一次，以及有机原料有多少来自太空，仍属未解问题。',
    glossary: [{ term: 'LUCA', definition: '现存全部生命的最近共同祖先，不等于地球上第一个生命。' }]
  },
  'oxygenic-photosynthesis': {
    mechanism: '两个光反应中心串联，利用光能从水中夺取电子，释放氧气，并把能量储存在ATP和还原力中，最终把二氧化碳固定成有机物。',
    openQuestions: '两个光系统如何演化并组合、最早产氧者是否就是现代意义的蓝细菌、地质记录中哪些信号能唯一指向产氧光合作用，仍在研究。',
    glossary: [{ term: '电子供体', definition: '在化学或生物反应中提供电子的物质；产氧光合作用以水为电子供体。' }]
  },
  'great-oxidation': {
    mechanism: '早期氧气先氧化海洋中的铁、火山气体和地壳矿物。当这些“氧汇”部分饱和，氧的产生超过消耗后才开始在大气中持续积累。',
    openQuestions: '氧气上升是一次还是多个脉冲、甲烷减少与全球冰期如何相互作用、营养限制为何让之后氧水平长期偏低，都有不同模型。',
    glossary: [{ term: '氧化还原', definition: '电子在物质之间转移的反应；失去电子为氧化，获得电子为还原。' }]
  },
  'first-eukaryotes': {
    mechanism: '一种古菌样宿主与细菌建立稳定内共生，后者逐步变成线粒体并把大量基因转移到宿主基因组；细胞骨架、内膜和细胞核也在长期演化中形成。',
    openQuestions: '宿主属于哪类古菌、线粒体进入发生在细胞复杂化之前还是之后、真核细胞核和内膜系统如何起源，仍无完全统一顺序。',
    glossary: [{ term: '内共生', definition: '一个生物生活在另一个生物细胞内部并形成长期互利或整合关系。' }]
  },
  'ediacaran-animals': {
    mechanism: '氧水平、海洋营养和微生物席环境变化，为大型软体生物提供生态空间；部分生物通过滤食、吸收或在沉积物上移动获得能量。',
    openQuestions: '哪些化石是真正动物、哪些与现代门类有关，金伯拉虫等是否已经具备复杂消化和运动能力，以及生物群为何在寒武纪前后衰退，仍有争议。',
    glossary: [{ term: '埋藏学', definition: '研究生物从死亡、埋藏到形成化石过程中信息如何保存或丢失的学科。' }]
  },
  'cambrian-explosion': {
    mechanism: '氧气增加、捕食军备竞赛、发育调控网络、矿化骨骼和海洋化学变化可能相互促进。动物活动翻动海底，又改变氧和营养物循环，形成生态反馈。',
    openQuestions: '氧水平是原因还是伴随现象，发育基因创新与生态竞争各占多大作用，化石保存改善贡献了多少“表观爆发”，仍需跨学科检验。',
    glossary: [{ term: '遗迹化石', definition: '脚印、洞穴、爬痕和粪化石等记录生物活动而非身体本身的化石。' }]
  },
  'land-plants': {
    mechanism: '蜡质角质层减少失水，气孔调节气体交换，维管组织运输水和糖，木质素提供支撑，根与真菌共生帮助从贫瘠岩屑获取矿物。',
    openQuestions: '最早陆生植物是否留下难识别的隐秘记录、植物与真菌共生何时建立、早期植物如何改变河流形态和全球气候，仍在持续量化。',
    glossary: [{ term: '维管组织', definition: '植物体内运输水、矿物和糖的木质部与韧皮部系统。' }]
  },
  'first-tetrapods': {
    mechanism: '肉鳍中的肱骨、桡尺骨等同源骨骼逐步承担支撑，肩带与头骨分离形成颈部，脊柱和骨盆增强；肺和空气呼吸能力在鱼类祖先中已有基础。',
    openQuestions: '最初四肢主要用于水底行走、浅水撑起身体还是偶尔登陆，不同过渡支系的环境与足迹证据尚不能给出单一路线。',
    glossary: [{ term: '同源结构', definition: '来自共同祖先相同结构、即使后来功能和外形不同的身体部分。' }]
  },
  'permian-extinction': {
    mechanism: '巨量岩浆活动释放二氧化碳和其他气体，造成快速变暖；温暖海水含氧下降，陆地风化和营养输入又可促使海洋富营养化、缺氧与酸化。',
    openQuestions: '喷发气体释放速率、煤层和蒸发岩被岩浆加热的贡献、臭氧破坏与金属毒性的重要性，以及不同生态系统恢复为何不同步，仍在研究。',
    glossary: [{ term: '大火成岩省', definition: '相对短地质时期内形成的巨大火山岩区域，常与深部地幔活动有关。' }]
  },
  'first-dinosaurs': {
    mechanism: '直立四肢把身体抬到关节上方，改善运动效率；气囊式呼吸、快速生长和多样取食方式后来帮助不同恐龙支系占据广泛生态位。',
    openQuestions: '最早恐龙起源于盘古大陆何处、尼亚萨龙等候选是否真正属于恐龙、早期恐龙优势来自生理还是灭绝后的机会，仍有不同解释。',
    glossary: [{ term: '主龙类', definition: '包含鳄类、恐龙、鸟类及其已灭绝近亲的爬行动物大支系。' }]
  },
  'flowering-plants': {
    mechanism: '花把花粉传递和胚珠保护整合，动物传粉提高定向繁殖，双受精形成胚乳，果实帮助种子保护与传播；与昆虫共同演化扩大多样性。',
    openQuestions: '被子植物最早祖先长什么样、为何在白垩纪快速辐射、热带起源还是多区域扩散，以及分子钟与化石时间差如何解释，仍是“恼人之谜”。',
    glossary: [{ term: '被子植物', definition: '胚珠被心皮包裹、能够形成花和果实的植物，也称开花植物。' }]
  },
  'kpg-extinction': {
    mechanism: '撞击产生震波、海啸和高温喷射物，硫酸盐气溶胶与尘埃遮蔽阳光，引发“撞击冬季”；光合作用骤降后，陆海食物网从底层开始崩溃。',
    openQuestions: '德干火山活动在撞击前已造成多大压力、不同地区黑暗和降温持续多久、为何鸟类和小型哺乳动物等部分支系幸存，仍在精细研究。',
    glossary: [{ term: '铱异常', definition: '地层中铱元素异常富集；铱在地壳稀少、在部分陨石中较丰富，可作为撞击线索。' }]
  },
  'early-primates': {
    mechanism: '抓握手足、指甲和前向双眼提高树枝间移动与深度判断；高分辨率视觉和灵活取食适应了开花植物丰富的森林环境。',
    openQuestions: '更早的更猴兽类是否属于灵长类冠群、真灵长类在何地起源，以及始新世快速扩散与全球变暖的具体关系仍在讨论。',
    glossary: [{ term: '立体视觉', definition: '双眼视野重叠后由大脑比较差异，从而判断深度和距离。' }]
  },
  'hominin-origins': {
    mechanism: '双足能力可能在林地与开阔地镶嵌环境中逐步增强，带来长距离移动、携带和散热优势；牙齿、手和社会行为则以不同速度变化。',
    openQuestions: '萨赫勒人、奥罗林和地猿在谱系中的准确位置、共同祖先外貌、早期双足行为频率，以及基因流动持续多久，仍缺完整化石。',
    glossary: [{ term: '双足行走', definition: '以两条后肢承担主要体重并进行地面移动的运动方式。' }]
  },
  'genus-homo': {
    mechanism: '更灵活饮食、工具使用、长距离移动和社会合作可能与脑和身体比例变化形成反馈；高能食物和加工降低部分消化成本，但不存在单一决定因素。',
    openQuestions: '约280万年前下颌应归入人属还是晚期南方古猿、人属应以脑容量、牙齿还是行为定义，以及多个早期物种是否需要合并，仍有分类争论。',
    glossary: [{ term: '属', definition: '生物分类中位于种之上的层级；人属包括智人与多个已灭绝近缘物种。' }]
  },
  'homo-sapiens': {
    mechanism: '非洲多个种群在气候波动中分离又重连，基因、技术和行为特征跨地区交换；后来迁徙群体与尼安德特人、丹尼索瓦人等发生有限杂交。',
    openQuestions: '智人特征主要在单一区域形成后扩散，还是泛非网络中逐步拼合，不同化石应如何分类，早期群体之间交流规模有多大，仍在研究。',
    glossary: [{ term: '物种', definition: '对能够保持独立演化谱系的生物群体所作分类；古人类物种边界常因可杂交而较模糊。' }]
  },
  'agriculture': {
    mechanism: '人类反复采集和播种特定个体，无意或有意选择不易脱粒、大种子和温顺动物；定居、储存和人口增长又增强对生产食物的依赖。',
    openQuestions: '气候稳定、人口压力、宴饮竞争、风险管理和偶然技术积累各起多大作用，为何有些地区采用农业、有些长期保持其他生计，答案因地区而异。',
    glossary: [{ term: '驯化', definition: '人类长期选择和管理使生物在遗传、形态或行为上适应人类环境的过程。' }]
  },
  'writing': {
    mechanism: '记账标记逐渐标准化为可表示物品、数量、词义和语音的符号。语音原则让有限符号组合记录更多语言内容，书吏训练则维持复杂系统。',
    openQuestions: '何时应把图像符号称为完整文字、印度河符号等未释读系统记录什么、不同地区之间是否存在刺激传播，仍受材料和释读限制。',
    glossary: [{ term: '楔形文字', definition: '用削尖芦苇在泥板压出楔形笔画的书写传统，可记录多种语言。' }]
  },
  'printing-press': {
    mechanism: '可重复使用的金属活字与可调排版框组合文本，油性墨附着金属并由压印机构均匀转印到纸上；校样和标准字模支持批量复制。',
    openQuestions: '印刷对宗教改革、科学交流和识字率的因果程度如何与教育、城市和商业网络区分，不同文字体系为何采用不同印刷路径，仍是历史研究主题。',
    glossary: [{ term: '活字', definition: '可单独排列、重复使用来组合不同页面内容的字符模块。' }]
  },
  'copernican-revolution': {
    mechanism: '日心框架把行星逆行解释为地球与外行星相对运动；开普勒以椭圆轨道改善预测，牛顿用万有引力解释轨道为何遵循这些规律。',
    openQuestions: '科学证据、宗教制度、印刷传播与赞助网络如何共同影响接受速度，以及“科学革命”是否过度简化跨文化知识来源，仍属科学史讨论。',
    glossary: [{ term: '日心体系', definition: '把行星包括地球视为绕太阳运行的天文学模型。' }]
  },
  'steam-engine': {
    mechanism: '燃料加热水产生蒸汽，压差推动活塞，把热能转成机械功。冷凝器、旋转机构和高压设计提高效率并扩展到工厂、船舶和铁路。',
    openQuestions: '为何工业化首先在英国加速、廉价煤、工资、帝国贸易和制度各占多大权重，工业化提高长期生活水平与造成早期苦难如何同时衡量，仍有争论。',
    glossary: [{ term: '热效率', definition: '热机输入热量中最终转化为有用机械功的比例。' }]
  },
  'electric-grid': {
    mechanism: '发电机利用电磁感应把机械能转为电能；变压器升高交流电压以减少长距离传输损耗，再在用户附近降压。电网必须实时平衡发电与用电。',
    openQuestions: '可再生能源波动如何与储能、需求响应和跨区域输电协调，老旧电网如何升级并保持公平、韧性与网络安全，是当代工程问题。',
    glossary: [{ term: '交流电', definition: '方向和大小周期性变化的电流，便于用变压器改变电压。' }]
  },
  'powered-flight': {
    mechanism: '机翼使周围空气向下偏转并形成压力差产生升力，发动机提供推力克服阻力；三轴控制让飞行器保持和改变姿态。',
    openQuestions: '多位早期发明者的试飞证据和“首次飞行”定义如何比较仍有历史争议；现代前沿则包括低碳燃料、电动航空和高超声速控制。',
    glossary: [{ term: '升力', definition: '空气作用在飞行器上、主要垂直于来流方向并支撑重量的合力。' }]
  },
  'penicillin': {
    mechanism: '青霉素类药物与细菌转肽酶结合，阻止细胞壁肽聚糖交联；正在生长的细菌壁失稳并破裂。人体细胞没有这种细胞壁，因此具有选择性。',
    openQuestions: '耐药基因如何在医院、社区、农业和环境间传播，如何开发新抗菌药、噬菌体或更精准疗法，同时避免过度使用，是全球健康难题。',
    glossary: [{ term: 'β-内酰胺', definition: '含特定四元环结构的一类抗生素，包括青霉素和头孢菌素。' }]
  },
  'transistor': {
    mechanism: '在半导体中掺入少量杂质形成p型和n型区域，电场或小电流可控制更大电流。场效应晶体管以栅极电压调节导电沟道，是现代芯片主力。',
    openQuestions: '传统缩放面临漏电、发热和量子效应，二维材料、三维晶体管、芯粒封装和新计算架构能否延续性能增长，是半导体前沿。',
    glossary: [{ term: '掺杂', definition: '向纯半导体加入少量特定原子，以控制载流子数量和导电性质。' }]
  },
  'moon-landing': {
    mechanism: '土星五号把飞船送入地月转移轨道；指令舱留在月球轨道，登月舱下降和再上升会合。这种月球轨道交会方案减少了需降落和起飞的质量。',
    openQuestions: '阿波罗样本仍在回答月球水、撞击史和内部演化问题；未来研究关注极区冰、长期驻留对人体影响及月球活动治理。',
    glossary: [{ term: '月球轨道交会', definition: '主飞船留在月球轨道，较小登月舱往返月面后在轨重新对接的任务方案。' }]
  },
  'internet-tcp-ip': {
    mechanism: '数据被拆为带地址的数据包，路由器逐跳选择路径；IP负责跨网络寻址，TCP负责排序、确认、重传和拥塞控制，使不可靠网络提供可靠字节流。',
    openQuestions: '开放互联如何兼顾安全、隐私、平台权力和国家治理，地址与路由系统怎样抵御攻击，偏远地区如何公平接入，仍是技术与制度共同问题。',
    glossary: [{ term: '数据包', definition: '网络传输中带有地址和控制信息的一小段数据，可沿不同路径到达目的地。' }]
  },
  'world-wide-web': {
    mechanism: '浏览器向URL指定的服务器发送HTTP请求，服务器返回HTML等资源；超链接让页面指向其他地址，开放标准允许不同设备和组织互操作。',
    openQuestions: '如何保持开放标准和去中心化，同时处理虚假信息、追踪广告、平台垄断、内容治理和长期网页保存，是Web持续面对的问题。',
    glossary: [{ term: '超链接', definition: '把当前数字文档中的元素连接到另一资源地址的可点击引用。' }]
  },
  'human-genome': {
    mechanism: '项目先建立遗传与物理图谱，把大型DNA片段定位，再对片段测序和计算组装；现代测序则可并行读取海量短片段或直接获得长读段。',
    openQuestions: '如何用泛基因组更公平表示全球多样性、解释非编码和结构变异、把关联转化为可靠医疗因果，同时保护遗传隐私，仍是核心方向。',
    glossary: [{ term: '基因组', definition: '一个生物体或细胞所拥有的完整遗传物质集合。' }]
  },
  'smartphone-era': {
    mechanism: '系统级芯片整合CPU、图形、通信和传感器处理，多点触控把电容变化转为手势；GPS、移动网络和云服务共同提供位置、通信与应用数据。',
    openQuestions: '长期注意力与心理影响如何区分相关和因果，平台如何保护儿童与隐私，设备供应链、维修权和电子废物如何治理，仍需要研究与制度实验。',
    glossary: [{ term: '应用生态', definition: '操作系统、开发工具、应用商店、支付规则和用户共同形成的软件分发体系。' }]
  },
  'deep-learning': {
    mechanism: '多层网络把简单特征逐级组合，损失函数衡量预测误差，反向传播用链式法则计算各参数梯度，优化器据此更新数百万乃至更多参数。',
    openQuestions: '深层网络为何具有良好泛化、如何在数据分布变化下保持可靠、怎样减少算力能耗并解释内部表征，仍没有统一理论。',
    glossary: [{ term: '卷积神经网络', definition: '以局部共享滤波器提取空间特征、特别适合图像处理的一类神经网络。' }]
  },
  'alphago': {
    mechanism: '策略网络提出有希望的落子，价值网络估计局面胜率，蒙特卡洛树搜索在两者指导下选择性探索变化；强化学习通过对局结果改进策略。',
    openQuestions: '如何把封闭规则环境中的规划迁移到反馈稀疏、规则不完整且涉及人类价值的现实任务，仍是通用智能的重要难题。',
    glossary: [{ term: '强化学习', definition: '智能体通过行动获得奖励反馈，并学习使长期累计奖励更高的策略。' }]
  },
  'transformer': {
    mechanism: '每个位置生成查询、键和值向量，查询与所有键计算相关度并加权汇总值；多头注意力同时学习不同关系，位置编码保留顺序信息。',
    openQuestions: '为何规模扩展产生某些能力、如何解释内部表示、降低长上下文计算成本、可靠注入知识并避免有害行为，仍是研究前沿。',
    glossary: [{ term: '自注意力', definition: '序列中每个位置根据内容动态汇总同一序列其他位置的信息。' }]
  },
  'modern-ai': {
    mechanism: '基础模型先在大规模数据上预测下一个单元或重建内容，学习统计表征；再通过指令微调、人类反馈、工具调用和检索增强，使其更适合对话和任务。',
    openQuestions: '如何可靠衡量推理与自主能力、减少幻觉和偏见、保护隐私与版权、验证高风险应用、分配经济收益并建立跨国治理，仍远未解决。',
    glossary: [{ term: '基础模型', definition: '在广泛数据上训练、可通过提示或微调用于多种下游任务的大规模模型。' }]
  }
}

const events = rawEvents.map((event, index) => {
  const notes = scienceNotes[event.id] || {}
  const deep = deepNotes[event.id] || {}
  const meta = eraMeta[event.era]
  const period = getPeriodForEvent(event.id)
  const previous = rawEvents[index - 1]
  const readingText = [
    event.detail,
    event.significance,
    event.mechanism || deep.mechanism,
    event.evidence || notes.evidence,
    event.openQuestions || deep.openQuestions,
    event.misconception || notes.misconception,
    event.dateNote
  ].join('')

  return Object.assign({
    mediaId: `event-${event.id}`,
    image: '',
    gallery: [],
    imageAlt: `${event.title}科学插图占位`,
    imageCredit: '',
    imageLicense: '',
    imageSourceUrl: '',
    imageStatus: 'needed'
  }, event, notes, deep, meta, {
    periodId: period ? period.id : '',
    periodName: period ? period.name : event.era,
    isEraStart: !previous || previous.era !== event.era,
    keyPoints: event.keyPoints || [event.summary, event.significance, event.dateNote],
    confidence: event.confidence || notes.confidence || '主流结论，具体年代与机制持续更新',
    misconception: event.misconception || notes.misconception || `“${event.title}”通常代表一段过程，不应把时间轴上的日期理解为所有变化在同一瞬间完成。`,
    glossary: event.glossary || deep.glossary || [],
    readingMinutes: Math.max(3, Math.ceil(readingText.length / 160))
  })
})

function getEventById(id) {
  return events.find((event) => event.id === id)
}

module.exports = {
  events,
  eras,
  getEventById
}
