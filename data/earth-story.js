const storySources = [
  { id: 'ics-chart', title: 'International Chronostratigraphic Chart', organization: 'International Commission on Stratigraphy', url: 'https://stratigraphy.org/chart/', type: 'official-standard' },
  { id: 'nasa-solar-system', title: 'Solar System: Facts — Formation', organization: 'NASA Science', url: 'https://science.nasa.gov/solar-system/solar-system-facts/', type: 'official-science' },
  { id: 'nasa-earth', title: 'Facts About Earth', organization: 'NASA Science', url: 'https://science.nasa.gov/earth/facts/', type: 'official-science' },
  { id: 'nasa-moon', title: 'Moon Formation', organization: 'NASA Science', url: 'https://science.nasa.gov/moon/formation/', type: 'official-science' },
  { id: 'smithsonian-goe', title: 'The Great Oxidation Event: How Cyanobacteria Changed Life', organization: 'Smithsonian Ocean', url: 'https://ocean.si.edu/ocean-life/microbes/great-oxidation-event-how-cyanobacteria-changed-life', type: 'museum-science' },
  { id: 'huronian-review', title: 'Aspects of the Archean–Proterozoic transition', organization: 'Earth-Science Reviews', url: 'https://doi.org/10.1016/j.earscirev.2018.12.013', type: 'peer-reviewed-review' },
  { id: 'boring-billion-review', title: 'The Boring Billion, a slingshot for Complex Life on Earth', organization: 'Scientific Reports', url: 'https://doi.org/10.1038/s41598-018-22695-x', type: 'peer-reviewed-research' },
  { id: 'rodinia-synthesis', title: 'Assembly, configuration, and break-up history of Rodinia: A synthesis', organization: 'Precambrian Research', url: 'https://doi.org/10.1016/j.precamres.2007.04.021', type: 'peer-reviewed-review' },
  { id: 'snowball-review', title: 'Snowball Earth climate dynamics and Cryogenian geology-geobiology', organization: 'Science Advances', url: 'https://doi.org/10.1126/sciadv.1600983', type: 'peer-reviewed-review' },
  { id: 'burgess-rom', title: 'Introduction to the Burgess Shale', organization: 'Royal Ontario Museum', url: 'https://burgess-shale.rom.on.ca/introduction/', type: 'museum-science' },
  { id: 'gobe-review', title: 'The Great Ordovician Biodiversification Event: Reviewing two decades of research', organization: 'Palaeoworld', url: 'https://doi.org/10.1016/j.palwor.2015.03.003', type: 'peer-reviewed-review' },
  { id: 'earliest-forest', title: 'Earth’s earliest forest: fossilized trees and vegetation-induced sedimentary structures', organization: 'Journal of the Geological Society', url: 'https://doi.org/10.1144/jgs2023-204', type: 'peer-reviewed-research' },
  { id: 'tetrapod-review', title: 'The Origin of Tetrapods', organization: 'University of California Museum of Paleontology', url: 'https://ucmp.berkeley.edu/vertebrates/tetrapods/tetraintro.html', type: 'museum-science' },
  { id: 'big-five-review', title: 'Forty years later: The status of the “Big Five” mass extinctions', organization: 'Cambridge Prisms: Extinction', url: 'https://doi.org/10.1017/ext.2022.4', type: 'peer-reviewed-review' },
  { id: 'smithsonian-extinction', title: 'Extinction Over Time', organization: 'Smithsonian National Museum of Natural History', url: 'https://naturalhistory.si.edu/education/teaching-resources/paleontology/extinction-over-time', type: 'museum-science' },
  { id: 'bird-origin', title: 'The origin and early evolution of birds', organization: 'Biological Reviews', url: 'https://doi.org/10.1111/brv.12142', type: 'peer-reviewed-review' },
  { id: 'smithsonian-human', title: 'Human Evolution Evidence', organization: 'Smithsonian Human Origins Program', url: 'https://humanorigins.si.edu/evidence', type: 'museum-science' },
  { id: 'smithsonian-sapiens', title: 'Homo sapiens', organization: 'Smithsonian Human Origins Program', url: 'https://humanorigins.si.edu/evidence/human-fossils/species/homo-sapiens', type: 'museum-science' },
  { id: 'our-world-energy', title: 'Energy Production and Consumption', organization: 'Our World in Data', url: 'https://ourworldindata.org/energy-production-consumption', type: 'research-data' },
  { id: 'cern-web', title: 'The birth of the Web', organization: 'CERN', url: 'https://home.cern/science/computing/birth-web', type: 'official-history' },
  { id: 'ai-index', title: 'AI Index Report', organization: 'Stanford Institute for Human-Centered AI', url: 'https://aiindex.stanford.edu/report/', type: 'research-report' }
]

const storyChapters = [
  {
    id: 'dust-to-worlds', title: '尘埃怎样变成行星',
    periodIds: ['hadean'], eventIds: ['solar-system-formation'], mediaId: 'event-solar-system-formation',
    openingQuestion: '太阳和地球，是谁先“造”了谁？',
    previousCondition: '上一幕还没有地球，只有一团含有更早恒星制造元素的星际气体与尘埃。',
    narrative: '分子云局部坍缩，中央成为年轻太阳，周围因旋转形成原行星盘。盘中尘埃不是直接跳成行星，而是经历黏结、碰撞、破碎和引力聚集。温度差让岩石、金属与冰在不同距离保存，地球的原料由此落在太阳附近的岩质区域。',
    keyFacts: ['太阳与行星来自同一片坍缩云团。', '吸积包含增长也包含破坏，并不是一路顺滑。', '太阳系最早固体的定年给出约45.67亿年的时间锚点。'],
    evidenceCards: [
      { title: '陨石时钟', evidence: '富钙铝包体保存太阳系最早固体的放射性定年记录。', claimStatus: 'consensus' },
      { title: '正在形成的行星系', evidence: '望远镜能看见年轻恒星周围的盘和缝隙，为模型提供现实对照。', claimStatus: 'supported' }
    ],
    misconception: '太阳系不是太阳爆炸后甩出八颗完整行星。',
    nextTransition: '盘内的一个岩质行星胚胎继续吸积，碰撞将把它改造成分层的年轻地球。',
    sourceIds: ['nasa-solar-system', 'nasa-earth']
  },
  {
    id: 'earth-and-moon', title: '碰撞塑造地球与月球',
    periodIds: ['hadean'], eventIds: ['earth-formation', 'moon-formation'], mediaId: 'event-moon-formation',
    openingQuestion: '一颗炽热行星，怎样得到核心、地壳和一颗大月亮？',
    previousCondition: '原行星盘已经制造出许多行星胚胎，它们共享轨道空间并频繁碰撞。',
    narrative: '地球通过吸积长大，碰撞与放射性热让内部熔融，密度更高的铁镍下沉形成地核，较轻物质形成地幔和早期地壳。主导模型认为，一次或多次大型碰撞把物质抛入轨道并聚成月球；模型能解释许多观测，但撞击体大小、角度和混合程度仍在修订。',
    keyFacts: ['地球年龄约45.4亿年。', '内部的分异让磁场、火山和长期物质循环成为可能。', '巨型碰撞是月球形成的主导模型，不是已经拍摄到的历史画面。'],
    evidenceCards: [
      { title: '同位素年龄', evidence: '陨石、月球样本和古老地球矿物共同约束形成时间。', claimStatus: 'consensus' },
      { title: '月球成分与动力学', evidence: '样本同位素和轨道角动量用于筛选不同碰撞模型。', claimStatus: 'debated' }
    ],
    misconception: '月球形成细节并非“忒伊亚以唯一角度撞击”这一张固定剧本。',
    nextTransition: '年轻地球逐渐散热，外层冷却和水的聚集为海洋与化学反应创造空间。',
    sourceIds: ['nasa-earth', 'nasa-moon']
  },
  {
    id: 'ocean-and-life', title: '海洋出现，生命留下微弱痕迹',
    periodIds: ['hadean', 'archean'], eventIds: ['first-oceans', 'early-tectonics', 'earliest-life'], mediaId: 'event-first-oceans',
    openingQuestion: '没有骨骼、没有眼睛，科学家怎样寻找最早生命？',
    previousCondition: '地球已经分层并持续冷却，但表面仍受撞击、火山与剧烈大气变化支配。',
    narrative: '至少约44亿年前的锆石显示地表附近可能已有液态水。到太古宙，古老大陆核与海洋环境逐步建立。早期生命很可能是微小细胞，研究者只能从叠层结构、微化石和碳同位素偏差中追踪它们；越老的岩石改造越强，结论越需要谨慎。',
    keyFacts: ['古老锆石提供早期水—岩作用的间接证据。', '至少约37亿—35亿年前存在多类早期生命候选证据。', '“最早证据”不等于找到一个公认的第一个生物。'],
    evidenceCards: [
      { title: '锆石里的水线索', evidence: '氧同位素与矿物包裹体用于推断早期低温水—岩作用。', claimStatus: 'supported' },
      { title: '岩石里的代谢痕迹', evidence: '微生物席结构、微化石和碳同位素需要排除非生物过程。', claimStatus: 'debated' }
    ],
    misconception: '最早海洋与最早生命都不是在某一天完整出现。',
    nextTransition: '某些微生物发展出产氧光合作用，开始把局部生态创新放大成行星化学变化。',
    sourceIds: ['nasa-earth', 'ics-chart']
  },
  {
    id: 'oxygen-and-ice', title: '氧气先改造岩石，再改造天空',
    periodIds: ['archean', 'proterozoic'], eventIds: ['oxygenic-photosynthesis', 'great-oxidation', 'huronian-glaciations'], mediaId: 'event-great-oxidation',
    openingQuestion: '既然微生物会放氧，为什么大气没有立刻变得适合呼吸？',
    previousCondition: '生命已经建立多种代谢，但海洋和大气仍普遍缺氧，岩石中有大量可与氧反应的物质。',
    narrative: '产氧光合作用释放的氧最初被溶解铁、火山气体和岩石大量消耗。约24亿年前，大气氧才发生显著且波动的上升。相邻时代的休伦冰期群说明气候也在重组；甲烷减少可能参与降温，但构造、风化和火山通量同样重要。',
    keyFacts: ['产氧光合作用早于大气明显富氧。', '大氧化事件跨越很长时间并伴随波动。', '休伦冰期群与约7亿年前的成冰纪雪球地球不是同一组事件。'],
    evidenceCards: [
      { title: '硫同位素转折', evidence: '特殊硫同位素信号的消失约束大气氧超过关键阈值。', claimStatus: 'consensus' },
      { title: '冰川地层', evidence: '多层冰碛岩记录多次推进和消退，触发机制仍需模型比较。', claimStatus: 'debated' }
    ],
    misconception: '蓝细菌不是被绝对确定的“第一种光合生命”，产氧也没有让天空立即富氧。',
    nextTransition: '氧气提高了可用能量，却没有让世界直线上升；地球随后进入漫长、低氧且变化缓慢的中年。',
    sourceIds: ['smithsonian-goe', 'huronian-review', 'ics-chart']
  },
  {
    id: 'quiet-middle', title: '“无聊十亿年”里的复杂细胞实验',
    periodIds: ['proterozoic'], eventIds: ['first-eukaryotes', 'boring-billion'], mediaId: 'event-boring-billion',
    openingQuestion: '一条平稳的地球化学曲线，真的代表生命无事发生吗？',
    previousCondition: '氧化转型提供了新的能量通道，但深海仍常缺氧，营养元素也受到限制。',
    narrative: '约18亿至8亿年前常被非正式称作“无聊十亿年”。它的部分同位素记录相对平稳，但真核细胞、内共生、性生殖与多细胞化的重要步骤在此期间积累。不同浅海可能拥有局部氧气和营养条件，因此全球平均状态遮不住区域性创新。',
    keyFacts: ['“无聊十亿年”不是正式地层单位。', '真核细胞把遗传与能量系统组织得更复杂。', '化石稀少既可能反映低多样性，也受软体生物和保存窗口限制。'],
    evidenceCards: [
      { title: '微体化石', evidence: '细胞壁结构、大小与形态组合支持部分真核生物判定。', claimStatus: 'supported' },
      { title: '海洋化学代用指标', evidence: '铁、钼和硫等记录提示低氧且空间分层的海洋。', claimStatus: 'debated' }
    ],
    misconception: '“无聊”不等于演化停止，也不等于全球环境一成不变。',
    nextTransition: '大陆重新聚合又裂解，气候进入极端冰期，浅海与营养循环被大幅改写。',
    sourceIds: ['boring-billion-review', 'ics-chart']
  },
  {
    id: 'rodinia-to-animals', title: '超大陆、雪球地球与埃迪卡拉海底',
    periodIds: ['proterozoic'], eventIds: ['rodinia-cycle', 'snowball-earth', 'ediacaran-animals'], mediaId: 'event-rodinia-cycle',
    openingQuestion: '接近全球的冰封之后，复杂生命为何开始更清晰地进入化石记录？',
    previousCondition: '真核生命已存在很久，但海洋含氧、营养供给和大陆边缘格局仍限制生态扩张。',
    narrative: '罗迪尼亚聚合与裂解重画海岸和洋盆，但大陆拼图仍有多种版本。约7.2亿至6.35亿年前，成冰纪至少发生斯图尔特和马里诺等大型冰期。融冰后海洋化学、营养与氧化状态变化，埃迪卡拉海底出现多样大型软体生物；二者相关不等于已证明单一因果。',
    keyFacts: ['罗迪尼亚古地图是证据约束的重建，不是定稿。', '雪球地球包含多次冰期，海洋是否每处完全封冻仍有争议。', '埃迪卡拉生物不都能塞进现代动物门类。'],
    evidenceCards: [
      { title: '大陆拼图', evidence: '古地磁、造山带和碎屑锆石共同约束陆块位置。', claimStatus: 'debated' },
      { title: '低纬冰川', evidence: '冰碛岩、古地磁与盖帽碳酸盐支持极广范围结冰。', claimStatus: 'supported' },
      { title: '软体生物印痕', evidence: '特殊沉积窗口保存叶状、盘状和蠕虫状身体轮廓。', claimStatus: 'supported' }
    ],
    misconception: '雪球地球没有被证明“直接制造了动物”，更不是一场持续不变的冰封。',
    nextTransition: '大型多细胞生命已经出现，接下来捕食、运动和硬质结构会让海洋生态关系急剧增多。',
    sourceIds: ['rodinia-synthesis', 'snowball-review', 'ics-chart']
  },
  {
    id: 'paleozoic-seas', title: '海洋从身体创新走向生态分层',
    periodIds: ['cambrian', 'ordovician'], eventIds: ['cambrian-explosion', 'great-ordovician-biodiversification', 'ordovician-extinction'], mediaId: 'event-great-ordovician-biodiversification',
    openingQuestion: '寒武纪已经很热闹，奥陶纪为什么还需要一次“大辐射”？',
    previousCondition: '埃迪卡拉海底已有大型生命，但主动捕食、钻洞与硬质身体结构尚未达到显生宙规模。',
    narrative: '寒武纪数千万年间，动物身体结构、运动与捕食关系在化石记录中显著扩展。奥陶纪则让许多既有门类发展出更多物种和生态层次，礁体、滤食者与游泳动物共同重组海洋。纪末冰期、海退与海洋化学变化带来第一场“大五”危机。',
    keyFacts: ['寒武纪大爆发不是生命从无到有。', '奥陶纪大辐射跨越全纪，不同类群并不同步。', '奥陶纪末灭绝包含气候、海平面与含氧变化的组合压力。'],
    evidenceCards: [
      { title: '软组织化石库', evidence: '伯吉斯页岩型保存揭示普通硬壳化石看不见的身体结构。', claimStatus: 'consensus' },
      { title: '全球多样性曲线', evidence: '大量化石出现区间显示奥陶纪属和科级多样性长期上升。', claimStatus: 'supported' }
    ],
    misconception: '两次“爆发”都不是同一天发生的事件，也没有朝现代动物预设方向前进。',
    nextTransition: '海洋生态建立后，植物、真菌和动物开始把复杂食物网带上陆地。',
    sourceIds: ['burgess-rom', 'gobe-review', 'ics-chart']
  },
  {
    id: 'green-continent', title: '植物、森林与四足动物重写陆地',
    periodIds: ['ordovician', 'silurian', 'devonian', 'carboniferous'], eventIds: ['land-plants', 'silurian-vascular-plants', 'first-forests', 'first-tetrapods', 'carboniferous-forests', 'amniotic-egg'], mediaId: 'event-first-forests',
    openingQuestion: '一批没有花朵的植物，怎样改变河流、空气和动物身体？',
    previousCondition: '复杂生态几乎都在海中，陆地表面缺少深根、森林冠层和稳定食物网。',
    narrative: '微小陆生植物先在潮湿地面扩展，输导和支撑组织帮助它们长高。中泥盆世已有森林现场，根和倒木改变沉积、风化与碳循环。肉鳍鱼支系逐步积累支撑、呼吸和感觉特征，早期四足动物仍常依赖水域；羊膜卵后来降低繁殖对开放水体的依赖。',
    keyFacts: ['最早森林不像现代雨林，树状植物身体方案非常不同。', '鱼到四足动物是一系列支系变化，不是一条鱼突然决定上岸。', '植物扩张影响晚泥盆世海洋，但不能单独承担灭绝原因。'],
    evidenceCards: [
      { title: '原位森林地面', evidence: '树桩、根痕、倒木和植被诱发沉积结构共同恢复森林现场。', claimStatus: 'supported' },
      { title: '过渡身体结构', evidence: '鳍内骨骼、肩带、头骨和足迹记录水陆功能的镶嵌变化。', claimStatus: 'supported' }
    ],
    misconception: '森林扩张、风化、营养盐、缺氧、气候和火山活动需要区分证据强度，不能缩成“树木杀死海洋”。',
    nextTransition: '陆海生态都更复杂，也更依赖气候与化学稳定；接下来五次大危机会反复拆解这些网络。',
    sourceIds: ['earliest-forest', 'tetrapod-review', 'ics-chart']
  },
  {
    id: 'five-crises', title: '五次大灭绝不是五个相同按钮',
    periodIds: ['ordovician', 'devonian', 'permian', 'triassic', 'paleocene'], eventIds: ['ordovician-extinction', 'late-devonian-extinction', 'permian-extinction', 'triassic-extinction', 'kpg-extinction'], mediaId: 'event-permian-extinction',
    openingQuestion: '为什么“都灭了很多物种”仍不足以解释五次危机？',
    previousCondition: '生命已经占领陆海多种生态位，但复杂网络会把气候、酸化、缺氧和栖息地变化放大。',
    narrative: '大五灭绝是从海洋化石统计中识别出的显著危机。奥陶纪末与冰期和海退相连；晚泥盆世是多脉冲长期危机；二叠纪末与西伯利亚大火成岩省及剧烈增温密切相关；三叠纪末重点证据指向中央大西洋岩浆省和碳循环扰动；白垩纪末则有撞击层、陨石坑与全球生态崩溃的强证据。恢复不是回到原样，而是幸存者扩张和食物网重组。',
    keyFacts: ['大五来自统计与地层记录，不代表只有五次生态危机。', '多数事件跨越多个脉冲，持续时间和杀伤路径不同。', '恢复时间从局部较快反弹到数百万年重建复杂生态不等。'],
    evidenceCards: [
      { title: '灭绝曲线', evidence: '全球化石数据库比较类群最后出现、采样和背景灭绝率。', claimStatus: 'supported' },
      { title: '机制指纹', evidence: '火山灰、汞、碳同位素、缺氧指标和撞击物质让不同假说接受检验。', claimStatus: 'supported' },
      { title: '证据并不等强', evidence: '白垩纪末撞击和三叠纪末火山机制证据较强，晚泥盆世各脉冲组合仍更开放。', claimStatus: 'debated' }
    ],
    misconception: '大灭绝不是单一瞬间按钮，也不是每次都由小行星造成。',
    nextTransition: '二叠纪末几乎重置许多生态系统；中生代幸存支系将建立新的陆海网络。',
    sourceIds: ['big-five-review', 'smithsonian-extinction', 'ics-chart']
  },
  {
    id: 'mesozoic-worlds', title: '恐龙时代也属于鸟、哺乳动物与花',
    periodIds: ['triassic', 'jurassic', 'cretaceous'], eventIds: ['first-dinosaurs', 'first-mammals', 'dinosaur-to-birds', 'flowering-plants', 'kpg-extinction'], mediaId: 'event-dinosaur-to-birds',
    openingQuestion: '如果中生代不只讲“大恐龙”，我们还会看见什么？',
    previousCondition: '二叠纪末危机留下空缺生态位，三叠纪幸存类群在不稳定气候中重新组合。',
    narrative: '恐龙只是中生代众多支系之一。早期哺乳形类发展出精细牙齿与多样生活方式，部分兽脚类恐龙演化出羽毛、翼和飞行能力，鸟类是其现存后代。白垩纪开花植物与传粉、取食网络扩展。三叠纪末火山危机和白垩纪末撞击再次筛选生态系统。',
    keyFacts: ['鸟类属于兽脚类恐龙的一支。', '中生代哺乳动物并非都只是同一种夜行小鼠。', '三叠纪末主流机制强调中央大西洋岩浆省，不与弱证据撞击说等量并列。'],
    evidenceCards: [
      { title: '带羽毛恐龙', evidence: '羽毛印痕、骨骼与系统发育分析连接非鸟恐龙和早期鸟类。', claimStatus: 'consensus' },
      { title: '牙齿与耳骨', evidence: '微小哺乳动物化石记录取食分化和中耳演化。', claimStatus: 'supported' },
      { title: '撞击边界层', evidence: '铱异常、冲击石英和希克苏鲁伯陨石坑共同锁定白垩纪末撞击。', claimStatus: 'consensus' }
    ],
    misconception: '非鸟恐龙灭绝不等于“所有恐龙消失”，鸟类仍活在今天。',
    nextTransition: '撞击后的生态空缺让哺乳动物和鸟类快速扩展，现代型生态逐步形成。',
    sourceIds: ['bird-origin', 'smithsonian-extinction', 'ics-chart']
  },
  {
    id: 'mammals-to-cities', title: '从哺乳动物辐射到人类文明',
    periodIds: ['paleocene', 'eocene', 'oligocene', 'miocene', 'pliocene', 'pleistocene', 'hunter-gatherer', 'agricultural-revolution', 'first-civilizations'], eventIds: ['early-primates', 'whale-evolution', 'hominin-origins', 'australopithecus', 'genus-homo', 'homo-sapiens', 'humanity-in-deep-time', 'symbolic-culture', 'agriculture', 'first-cities', 'writing'], mediaId: 'event-humanity-in-deep-time',
    openingQuestion: '人类只有很短的历史，为何能如此快速地改变地表？',
    previousCondition: '白垩纪末危机后，哺乳动物、鸟类和开花植物占据被重组的生态网络。',
    narrative: '新生代气候由早期温暖走向总体冷却，灵长类、鲸类和众多哺乳动物支系扩展。人族演化是一棵多支系树：直立行走、脑量、工具和社会行为并不同步。智人约30万年前在非洲出现，依靠语言、合作和累积文化扩散；农业和城市随后在多个地区以不同路径形成。',
    keyFacts: ['智人约30万年只占地球历史约0.0066%。', '不同人类支系曾长期并存并发生基因交流。', '农业和城市不是全球同步发生的单一路线。'],
    evidenceCards: [
      { title: '化石与足迹', evidence: '骨骼、牙齿和足迹记录镶嵌式身体变化。', claimStatus: 'supported' },
      { title: '古DNA与考古', evidence: '遗传片段、石器、火、颜料和聚落共同重建迁徙与文化网络。', claimStatus: 'supported' },
      { title: '时间压缩', evidence: '地球年龄与智人化石年龄按比例换算，显示“最后约6秒”的尺度。', claimStatus: 'supported' }
    ],
    misconception: '人类不是演化预先设定的终点；我们的出现依赖大量偶然、环境与支系历史。',
    nextTransition: '累积知识与化石能源把改变环境的速度进一步放大，影响开始进入全球地球系统。',
    sourceIds: ['smithsonian-human', 'smithsonian-sapiens', 'nasa-earth']
  },
  {
    id: 'industry-to-ai', title: '化石能源、全球网络与人工智能',
    periodIds: ['industrial-revolution', 'modern-world', 'digital-ai'], eventIds: ['steam-engine', 'electric-grid', 'transistor', 'internet-tcp-ip', 'world-wide-web', 'human-genome', 'deep-learning', 'transformer', 'modern-ai'], mediaId: 'event-modern-ai',
    openingQuestion: '为什么地球史最后极薄的一层，变化速度却如此醒目？',
    previousCondition: '城市、文字和跨区域知识网络已能积累经验，但能源与通信仍受肌肉、风、水流和运输速度限制。',
    narrative: '蒸汽机把化石燃料热能转成可调度机械功，电网与内燃交通扩大生产和物质流。晶体管、互联网和万维网让信息处理连接全球；深度学习与Transformer推动生成式人工智能进入公众工具。技术提高能力，也带来碳排放、资源消耗、权力集中、偏见与治理问题。',
    keyFacts: ['工业化是能源、制度、劳动力和全球贸易共同作用的过程。', '互联网与万维网不是同一项发明。', '现代AI从数据中学习统计模式，不等于天然可靠或理解所有事实。'],
    evidenceCards: [
      { title: '能源与碳记录', evidence: '燃料统计、冰芯和大气观测记录工业化后能源使用与温室气体上升。', claimStatus: 'consensus' },
      { title: '开放网络标准', evidence: '技术文档与运行网络保存TCP/IP和Web的工程历史。', claimStatus: 'consensus' },
      { title: 'AI能力与限制', evidence: '标准测试和真实应用可观察能力变化，但泛化、可靠性与社会影响仍需持续评估。', claimStatus: 'debated' }
    ],
    misconception: '技术史不是自动通向更好未来的直线；能力、代价和治理选择必须分别检验。',
    nextTransition: '故事抵达现在而没有结束：下一章由气候、生态、制度和技术选择共同书写。',
    sourceIds: ['our-world-energy', 'cern-web', 'ai-index']
  }
]

const storySourceMap = storySources.reduce((map, source) => {
  map[source.id] = source
  return map
}, {})

function getStoryChapterById(id) {
  return storyChapters.find((chapter) => chapter.id === id) || null
}

module.exports = { storyChapters, storySources, storySourceMap, getStoryChapterById }
