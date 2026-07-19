const entries = [
  {
    id: 'basilosaurus', entryType: 'species',
    hook: '名字里有“龙”，骨盆旁还挂着小腿，但它其实是已经无法回到陆地的早期鲸。',
    quickSummary: '龙王鲸生活在晚始新世温暖海洋，身体极长，保留一对微小而完整的后肢，却没有承重和陆行能力。头骨、异型牙与幼鲸骨上的咬痕显示它是大型海洋捕食者；细长体形常被画成海蛇式起伏，但脊椎和鲸类运动仍需谨慎复原。',
    whyItMatters: '它处在鲸类完全海洋化的重要阶段：后肢已退出行走，骨盆不再与脊柱承重连接，听觉与躯干适应海水生活。丰富骨架把“鲸从陆地哺乳动物演化而来”变成可逐项比较的解剖记录，也纠正了早期被误认成巨型爬行动物的历史。',
    taxonomy: { displayPath: ['动物界', '脊索动物门', '哺乳纲', '鲸偶蹄目', '龙王鲸科', '龙王鲸属'], classificationNote: '它是完全水生的古鲸类，不是现代须鲸或齿鲸的一个现生成员。', confidence: 'high' },
    time: { displayRange: '约4100万—3400万年前，晚始新世', earliestMa: 41, latestMa: 34, precisionNote: 'B. isis 与 B. cetoides 的分布、体长和年代存在差异。' },
    distribution: { regions: ['北非', '北美东南部'], formations: ['Wadi Al-Hitan 地层', '美国墨西哥湾沿岸始新世地层'], mapNote: '当时特提斯海和墨西哥湾海岸线与今天不同。' },
    scale: { length: '不同种常估约15—20米', height: '完全水生，不使用陆地肩高', mass: '细长身体使质量低于同长度现代大型鲸，估算差异大', comparison: '长度可接近一节大型公交车的两倍，但躯干远比蓝鲸纤细', uncertainty: '椎骨间软组织、胸腹厚度和不同种比例影响复原。' },
    paleoenvironment: '温暖的热带—亚热带浅海与陆棚，鱼类、鲨和多种早期鲸共存；埃及鲸谷记录了海岸向海洋环境的序列。',
    ecosystemRole: '大型海洋捕食者，捕食鱼、鲨和较小古鲸；牙齿磨损、胃内容候选与猎物骨咬痕共同支持。',
    lifeFunctions: {
      feeding: '前部牙适合抓握，后部三角牙有切割刃；头颈配合处理大型猎物。',
      locomotion: '尾部和躯干上下摆动推进，前肢为鳍；极长身体的弯曲幅度与尾鳍形态仍需软组织模型。',
      respirationOrMetabolism: '用肺呼吸并定期上浮，作为哺乳动物保持较高代谢；鼻孔已向后移动但未到现代鲸头顶位置。',
      senses: '耳区骨骼显示适应水下听觉，牙齿与头骨可辅助重建捕食方向；是否回声定位没有证据。',
      defense: '成年体型和大型牙齿减少威胁，幼体可能面临同类或大型鲨捕食。',
      growth: '椎骨与牙齿的成熟度可区分年龄，但完整生长曲线不如现代鲸清楚。',
      reproduction: '应在水中交配和生产；微小后肢可能在交配时帮助固定身体，但属于功能推断。',
      socialBehavior: '化石聚集不能直接证明稳定鲸群，社会结构尚无可靠直接证据。'
    },
    anatomyHighlights: [
      { title: '微小后肢与足趾', explanation: '仍保留股骨、胫腓骨和足部，却过小且骨盆不承重，无法在陆地行走。', evidenceLevel: 'direct', mediaId: '' },
      { title: '异型牙列', explanation: '前牙抓握、后颊齿切割，与现代鲸较同形的牙列不同。', evidenceLevel: 'direct', mediaId: '' },
      { title: '极长椎柱', explanation: '延长的椎体塑造细长躯干，但不能据此简单画成左右蛇行。', evidenceLevel: 'direct', mediaId: '' }
    ],
    ecologicalRelations: { preyOrResources: ['大型鱼类', '鲨', '较小古鲸如 Dorudon'], predators: ['幼体可能受大型鲨或同类威胁'], competitors: ['其他大型古鲸和鲨'], partners: [] },
    dayInTheLife: [
      { title: '在浅海搜猎', text: '水下听觉和视觉追踪鱼群或较小鲸，肺呼吸决定它必须定期返回海面。', certainty: 'plausible' },
      { title: '抓握与切割', text: '前牙固定猎物，后部带刃牙切开组织；某些 Dorudon 幼体头骨上的咬痕与之相符。', certainty: 'supported' },
      { title: '沉积在鲸谷', text: '尸体落到古特提斯海底，骨骼被沉积物覆盖，数千万年后随沙漠侵蚀暴露。', certainty: 'supported' }
    ],
    fossilEvidence: [
      { evidenceType: '关联骨架', material: '头骨、长椎柱、前肢、骨盆和微小后肢', whatItShows: '已完全水生，同时保留来自陆生祖先的后肢结构。', limitation: '尾端和软组织不总完整，身体轮廓仍需比较复原。', strength: '强' },
      { evidenceType: '咬痕与牙列', material: '较小古鲸骨上的齿痕、龙王鲸牙齿磨损与颅颌形态', whatItShows: '具备捕食大型脊椎动物的能力。', limitation: '难以判断每次痕迹来自捕杀还是取食尸体。', strength: '强' }
    ],
    discoveryHistory: [
      { year: '1830年代', place: '美国南部', event: '巨大椎骨最初被误判为爬行动物并命名“帝王蜥”。' },
      { year: '1839', place: '英国比较解剖研究', event: 'Richard Owen 识别其哺乳动物和鲸类特征。' },
      { year: '1980—1990年代', place: '埃及与美国标本', event: '后肢和完整骨架揭示完全水生却仍保留足部。' }
    ],
    debates: [{ question: '龙王鲸怎样游泳、有没有现代式尾鳍？', currentView: '以尾部和躯干上下摆动推进，属于完全水生鲸类。', alternatives: '尾端软组织和极长躯干的弯曲方式存在不同复原。', confidence: '中等：运动方向可靠，精确波形与尾鳍外观仍不确定。' }],
    misconceptions: [
      { myth: '龙王鲸是一种海生爬行动物。', correction: '名称源自早期误判，牙齿、耳区和骨骼明确显示它是鲸类哺乳动物。' },
      { myth: '保留后腿说明它还能爬上岸。', correction: '后肢太小，骨盆不承重，无法支撑陆地行走。' }
    ],
    funFacts: ['“Basilosaurus”意为“帝王蜥”，却按命名规则保留了这个历史误称。', '小后肢甚至保留足趾，但不再负责走路。', '埃及鲸谷保存了多种鲸从近岸到完全海洋化的阶段。'],
    glossary: [
      { term: '古鲸类', definition: '早期鲸类的多支已灭绝成员，记录从陆生祖先到水生的转变。' },
      { term: '异型牙', definition: '同一牙列中不同位置牙齿形状和功能不同。' },
      { term: '退化结构', definition: '在演化中缩小或改变原有主要功能、但仍被保留的结构。' }
    ],
    knowledgeCheck: [
      { question: '龙王鲸的小后肢能做什么？', options: ['在陆地走路', '不能承重，可能辅助交配', '高速奔跑', '挖洞'], correctIndex: 1, explanation: '后肢完整但微小，骨盆不与脊柱形成承重连接。' },
      { question: '“龙王鲸”名称为何容易误导？', options: ['化石是恐龙', '早期被误认成爬行动物', '它生活在侏罗纪', '它有鳞片'], correctIndex: 1, explanation: '最初巨大椎骨被错判，后来才确认是鲸类。' },
      { question: '哪类证据支持它捕食其他鲸？', options: ['幼鲸骨上的匹配咬痕', '植物花粉', '巢穴', '羽毛'], correctIndex: 0, explanation: '较小古鲸骨上的损伤与龙王鲸牙列相符。' }
    ],
    sourceIds: ['basilosaurus-hindlimbs-1990', 'basilosaurus-smithsonian-ocean', 'basilosaurus-smithsonian-specimen']
  },
  {
    id: 'woolly-mammoth', entryType: 'species',
    hook: '一根不断生长的象牙，能把猛犸象一生走过的河谷、寒季和迁徙路线按时间写下来。',
    quickSummary: '真猛犸象是更新世北半球寒冷草原的象类，具有长毛、厚脂肪、小耳和弯曲长牙。骨骼、冻土木乃伊、粪便、同位素与古DNA让它成为资料最丰富的灭绝动物之一；不同大陆种群在冰期结束后并非同时消失。',
    whyItMatters: '它把形态适应、群体生活、迁徙和灭绝研究连在一起。象牙同位素可以逐周到逐季追踪移动，染色体尺度古基因组显示细胞核三维结构也能残留；这些高分辨率证据仍不能把气候变化与人类狩猎压缩成唯一原因。',
    taxonomy: { displayPath: ['动物界', '哺乳纲', '长鼻目', '象科', '猛犸象属', '真猛犸象'], classificationNote: '与现生亚洲象亲缘较近，但是真正独立的灭绝种。', confidence: 'high' },
    time: { displayRange: '约40万年前出现，主体种群至约1万年前；孤岛残存更晚', earliestMa: 0.4, latestMa: 0.004, precisionNote: '不同大陆与岛屿的末次年代差异大，Wrangel Island 残存至约4000年前。' },
    distribution: { regions: ['欧亚大陆北部', '北美北部', '北冰洋岛屿'], formations: ['冻土、洞穴与河流阶地多类沉积'], mapNote: '冰期海平面下降时白令陆桥连接西伯利亚与阿拉斯加，迁徙路线随冰盖改变。' },
    scale: { length: '身体约4—6米', height: '肩高多约2.7—3.4米', mass: '成体常约4—6吨，个体和性别差异明显', comparison: '体型接近现生大象，但耳更小、肩峰更高、毛层更厚', uncertainty: '软组织保存虽多，体重仍依骨架与体积模型。' },
    paleoenvironment: '寒冷、干燥而多风的猛犸草原，禾草、莎草和耐寒草本丰富；并非整片被厚雪覆盖的极地荒漠。',
    ecosystemRole: '大型植食者，通过踩踏、取食和粪便改变植被与养分循环，也为大型肉食者和人类提供高风险资源。',
    lifeFunctions: {
      feeding: '臼齿由密集珐琅板组成，适合研磨草本；象牙可清雪、争斗、展示或处理植被。',
      locomotion: '柱状四肢支持长距离步行，家族群随季节、水源和植被在巨大范围内移动。',
      respirationOrMetabolism: '鼻腔和厚皮毛减少寒冷空气与体热损失，巨大体型降低单位体积散热。',
      senses: '长鼻整合触觉与嗅觉；耳小减少散热，但听觉能力不能只由外耳尺寸推定。',
      defense: '成年体型、弯曲象牙与群体保护能抵御捕食，幼象仍较脆弱。',
      growth: '象牙生长层、牙齿更替和骨骼可记录年龄、营养与压力事件。',
      reproduction: '与现生象比较支持较长妊娠和低繁殖率，幼崽依赖群体照料；冻土幼体提供发育线索。',
      socialBehavior: '雌性和幼体可能形成母系群，成年雄性活动更独立；个体同位素路线支持性别和生命周期差异。'
    },
    anatomyHighlights: [
      { title: '双层保温系统', explanation: '粗长护毛、细密绒毛和皮下脂肪共同减少热量损失。', evidenceLevel: 'direct', mediaId: '' },
      { title: '高冠板状臼齿', explanation: '多片珐琅板承受含尘草本的高磨耗，随年龄依次替换。', evidenceLevel: 'direct', mediaId: '' },
      { title: '时间轴式象牙', explanation: '连续生长层保存锶、氧和氮同位素，能对应地点、季节与营养变化。', evidenceLevel: 'direct', mediaId: '' }
    ],
    ecologicalRelations: { preyOrResources: ['禾草', '莎草', '耐寒草本和灌木'], predators: ['洞狮等对幼体的潜在威胁', '人类'], competitors: ['野牛', '马', '披毛犀等大型植食者'], partners: ['肠道微生物', '母系家族群'] },
    dayInTheLife: [
      { title: '穿过寒冷草原', text: '群体沿熟悉路线寻找水和未被积雪覆盖的植被，幼体走在成年个体保护范围内。', certainty: 'plausible' },
      { title: '用牙记录旅程', text: '饮水和食物中的锶、氧同位素进入持续生长的象牙，形成可与地质地图比对的序列。', certainty: 'supported' },
      { title: '应对资源波动', text: '严冬、受伤或哺乳会改变营养同位素和生长纹，研究者可在死亡后读取这些压力。', certainty: 'supported' }
    ],
    fossilEvidence: [
      { evidenceType: '冻土木乃伊', material: '毛、皮肤、肌肉、胃肠内容和粪便', whatItShows: '保温结构、实际食物与软组织解剖。', limitation: '冻土样本集中于特定环境和季节，不代表全部种群。', strength: '强' },
      { evidenceType: '象牙同位素', material: '沿生长轴连续取样的锶、氧和氮同位素', whatItShows: '个体一生的移动、季节和营养压力变化。', limitation: '地点反演依赖完整同位素基线图，并存在多解。', strength: '强' },
      { evidenceType: '古DNA与染色体结构', material: '冻存组织中的基因组和染色质残留', whatItShows: '亲缘、群体历史与部分基因调控结构。', limitation: '保存极罕见，DNA不能直接恢复完整行为或“复活”个体。', strength: '强' }
    ],
    discoveryHistory: [
      { year: '18世纪末', place: '欧洲与西伯利亚', event: '比较解剖确认猛犸象不是仍生活在热带的大象。' },
      { year: '20世纪', place: '西伯利亚冻土', event: '多具木乃伊让皮毛、食物和软组织进入研究。' },
      { year: '21世纪', place: '北极地区与实验室', event: '同位素和古基因组把个体生平与种群变化联系起来。' }
    ],
    debates: [{ question: '真猛犸象为何灭绝？', currentView: '快速变暖、草原缩减、种群破碎和人类压力在不同地区共同作用。', alternatives: '不同研究对气候、人类狩猎、疾病和小种群遗传负担的相对权重不同。', confidence: '中等：全球单一原因不足，区域过程可有差异。' }],
    misconceptions: [
      { myth: '所有猛犸象都生活在终年冰雪覆盖的荒地。', correction: '真猛犸象主要依赖生产力较高的寒冷草原，那里有大量草本植物。' },
      { myth: '有完整DNA就能简单克隆一只猛犸象。', correction: '古DNA碎裂且细胞、胚胎发育和代孕环境无法由序列自动恢复。' }
    ],
    funFacts: ['最晚的孤岛种群生活到埃及金字塔建成之后。', '一根象牙可记录数万公里的终生移动。', '2024年的研究从约5.2万年前皮肤中恢复了染色体尺度结构。'],
    glossary: [
      { term: '猛犸草原', definition: '更新世北部寒冷、干燥、以草本为主的高生产力生态系统。' },
      { term: '锶同位素', definition: '受当地岩石和食物影响、可用于追踪移动来源的化学标记。' },
      { term: '古DNA', definition: '从古代遗骸中提取、通常已经破碎和化学损伤的遗传物质。' }
    ],
    knowledgeCheck: [
      { question: '象牙同位素最适合研究什么？', options: ['羽毛颜色', '个体移动与食物变化', '叫声', '奔跑速度'], correctIndex: 1, explanation: '持续生长的象牙按时间保存当地环境和饮食化学信号。' },
      { question: '真猛犸象的主要环境是什么？', options: ['热带雨林', '寒冷草原', '深海', '沙漠洞穴'], correctIndex: 1, explanation: '猛犸草原有大量耐寒草本，而不是没有食物的冰原。' },
      { question: '关于灭绝，哪项最稳妥？', options: ['全球只有一个原因', '区域中多种压力共同作用', '完全与气候无关', '发生在同一年'], correctIndex: 1, explanation: '种群在不同地区和时间消失，多因素解释更符合证据。' }
    ],
    sourceIds: ['mammoth-nps-isotopes', 'mammoth-cell-2024', 'mammoth-science-advances-2024']
  },
  {
    id: 'australopithecus', entryType: 'species',
    hook: '它能用两条腿在地面行走，也保留善于攀爬的上肢；演化没有要求它只能二选一。',
    quickSummary: '阿法南方古猿生活在约390万至290万年前的东非，脑容量仍接近大型类人猿，却已有稳定双足行走的骨盆、膝和足部特征。长臂、弯曲指骨与肩部又显示攀爬仍重要；“露西”和莱托利足迹分别提供骨骼与行为证据。',
    whyItMatters: '它证明人族双足行走早于大脑显著增大，并揭示地面行走与树上活动可以在同一身体中共存。来自不同地点、年龄与性别的标本让研究者讨论体型差异、步态和生活环境，也提醒我们它不是通向现代人的一格直线阶梯。',
    taxonomy: { displayPath: ['动物界', '灵长目', '人科', '人族', '南方古猿属', '阿法南方古猿'], classificationNote: '是早期人族重要成员，可能接近后续多支人族共同祖先，但具体祖先—后代关系仍有争论。', confidence: 'high' },
    time: { displayRange: '约390万—290万年前，晚上新世', earliestMa: 3.9, latestMa: 2.9, precisionNote: '依火山灰测年、古地磁与地层对比约束，不同地点范围不完全相同。' },
    distribution: { regions: ['埃塞俄比亚', '坦桑尼亚', '肯尼亚'], formations: ['Hadar Formation', 'Laetoli Beds', 'Dikika 等'], mapNote: '化石点之间有湖岸、林地和较开阔植被镶嵌，不能画成单一稀树草原。' },
    scale: { length: '不适用统一体长', height: '个体约1.0—1.5米，差异明显', mass: '约25—45千克的常见估算范围', comparison: '整体小于多数现代成人，长臂与较小脑颅更接近其他类人猿比例', uncertainty: '性别差异、物种内变异和不完整骨架会改变身高体重范围。' },
    paleoenvironment: '湖岸林地、灌丛、草地和河边森林交错的东非景观，环境随地点和几十万年时间尺度变化。',
    ecosystemRole: '中等体型杂食性灵长类，利用果实、植物组织和可能的小型动物资源，同时既在地面移动也进入树木避险或取食。',
    lifeFunctions: {
      feeding: '牙齿磨耗和同位素显示食谱具有弹性，包含C3植物资源，也可能利用其他食物；不能由一颗牙定义全部菜单。',
      locomotion: '骨盆、股骨角度、膝与足弓支持习惯性双足行走；长臂、肩和弯曲指骨仍适合攀爬。',
      respirationOrMetabolism: '作为中型灵长类以肺呼吸和恒温代谢活动，具体日能量预算由体型和步态模型估算。',
      senses: '面向前方的眼与灵长类抓握能力重要；脑内功能无法由颅腔大小直接逐区还原。',
      defense: '群体警戒、攀树和对环境的熟悉可能降低捕食风险，缺少爪牙或装甲式防御。',
      growth: '牙齿发育显示生活史与现代人不同，幼年期可能没有人类式极长依赖期。',
      reproduction: '没有直接保存妊娠或育幼行为；与其他灵长类比较可提出但不能确认群体照料模型。',
      socialBehavior: '明显体型差异曾被用于推测社会结构，但性别判定和样本差异使结论仍不稳定。'
    },
    anatomyHighlights: [
      { title: '短而宽的骨盆', explanation: '髂骨方向改变，帮助单腿支撑时稳定躯干，是双足步态关键。', evidenceLevel: 'direct', mediaId: '' },
      { title: '内收的股骨', explanation: '股骨从髋部向膝内倾，使足落在身体重心下方。', evidenceLevel: 'direct', mediaId: '' },
      { title: '足弓与莱托利足迹', explanation: '第四跖骨形态和足迹支持足部刚性与脚趾前推，但步态细节仍有模型差异。', evidenceLevel: 'direct', mediaId: '' }
    ],
    ecologicalRelations: { preyOrResources: ['果实', '叶、种子和地下植物组织', '小型动物候选'], predators: ['大型猫科与鬣狗类', '鳄类在水边的威胁'], competitors: ['其他灵长类和杂食动物'], partners: ['同种群体成员'] },
    dayInTheLife: [
      { title: '两足穿过林间空地', text: '骨盆与膝在单脚支撑时维持平衡，双手可以携带食物或抓握枝条。', certainty: 'supported' },
      { title: '回到树上', text: '长臂、肩和弯曲指骨帮助攀爬取食或休息；树上活动频率无法由骨骼精确计时。', certainty: 'plausible' },
      { title: '火山灰上的脚印', text: '一群早期人族走过湿润火山灰，随后覆盖层把连续双足步迹保存下来；归属阿法南方古猿很可能但非绝对。', certainty: 'supported' }
    ],
    fossilEvidence: [
      { evidenceType: '关联骨架与大量散骨', material: '“露西”、Dikika 幼体及头骨、牙齿、骨盆、四肢', whatItShows: '双足与攀爬特征并存，个体生长和体型范围可比较。', limitation: '多数标本不完整，性别和个体差异会影响合并复原。', strength: '强' },
      { evidenceType: '足迹', material: '坦桑尼亚莱托利火山灰中的连续人族足迹', whatItShows: '约366万年前已有稳定双足行走行为。', limitation: '足迹没有与造迹者骨架直接连接，物种归属依年代和当地化石推断。', strength: '强' },
      { evidenceType: '机器人与肌骨模型', material: '骨盆、关节范围和肌肉参数模拟', whatItShows: '不同步态的能量消耗和可行性。', limitation: '肌肉大小、软组织和速度是假设输入，不是化石直接观测。', strength: '中等' }
    ],
    discoveryHistory: [
      { year: '1974', place: '埃塞俄比亚哈达尔', event: 'Donald Johanson 团队发现约40%骨架“露西”。' },
      { year: '1978', place: '坦桑尼亚莱托利', event: 'Mary Leakey 团队公布早期人族足迹。' },
      { year: '2000年代', place: '埃塞俄比亚 Dikika', event: '幼年个体补充肩、足和生长研究。' }
    ],
    debates: [{ question: '它有多少时间在树上活动？', currentView: '习惯性双足行走已经建立，同时保留显著攀爬能力。', alternatives: '不同研究认为上肢特征可能是频繁攀爬适应，或部分只是祖先遗留结构。', confidence: '中等：两种能力明确，日常时间分配未知。' }],
    misconceptions: [
      { myth: '露西就是人类和黑猩猩之间的半成品。', correction: '她属于自身适应良好的物种，保留的是一组镶嵌特征，不是现代类群的半成品。' },
      { myth: '会双足行走后就完全不再爬树。', correction: '骨骼同时支持地面双足和重要的攀爬能力。' }
    ],
    funFacts: ['“露西”只是阿法南方古猿众多标本之一。', '莱托利足迹比露西骨架本身更古老约五十多万年。', '双足行走出现时，脑容量仍远小于现代人。'],
    glossary: [
      { term: '人族', definition: '人与黑猩猩共同祖先分化后，属于人类一侧的演化成员。' },
      { term: '镶嵌演化', definition: '不同身体特征以不同速度改变，新旧特征可同时存在。' },
      { term: 'C3植物', definition: '采用C3光合作用途径的植物，常包括树木、灌木和许多草本。' }
    ],
    knowledgeCheck: [
      { question: '阿法南方古猿最重要的运动组合是什么？', options: ['只会游泳', '双足行走并保留攀爬能力', '四足奔跑且不会攀树', '会飞'], correctIndex: 1, explanation: '骨盆和膝支持双足，上肢与手指仍显示攀爬适应。' },
      { question: '莱托利足迹能直接说明什么？', options: ['造迹者姓名', '当时已有双足行走', '语言能力', '具体社会制度'], correctIndex: 1, explanation: '连续足迹记录行为，但不能提供全部软组织与文化信息。' },
      { question: '为什么不能把它画成线性进化阶梯的一格？', options: ['演化会分支', '它没有化石', '它生活在现代', '它是恐龙'], correctIndex: 0, explanation: '早期人族存在多支并行，祖先—后代关系并非简单排队。' }
    ],
    sourceIds: ['afarensis-smithsonian', 'afarensis-walking-model-2007', 'afarensis-foot-2011']
  }
]

module.exports = entries.concat(require('./catalog').groups.cenozoic)
