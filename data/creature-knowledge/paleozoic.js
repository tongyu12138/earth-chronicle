const entries = [
  {
    id: 'anomalocaris', entryType: 'species',
    hook: '它不是把虾、圆盘和叶片拼错了，而是寒武纪海洋里一套完整的新身体方案。',
    quickSummary: '奇虾是寒武纪大型游泳动物，身体两侧有连续游泳叶片，头前伸出一对带刺附肢，口部由硬片围成环形结构。它属于节肢动物演化树的干群；眼、附肢与游泳结构显示它是主动觅食者，但猎物硬度与咬合能力曾被高估。',
    whyItMatters: '奇虾说明寒武纪海洋已经出现大型、视觉发达并能主动游动的消费者。研究它能拆解节肢动物头部、复眼和附肢如何逐步组合；同时，它早年被分成三种“动物”的误会，也是化石复原必须随新标本修正的经典案例。',
    taxonomy: { displayPath: ['动物界', '泛节肢动物', '恐虾纲', '奇虾属'], classificationNote: '属于真节肢动物冠群之外的干群亲属，不是现代虾类。', confidence: 'high' },
    time: { displayRange: '约5.08亿年前，寒武纪中期', earliestMa: 508, latestMa: 505, precisionNote: '本页主要依据加拿大伯吉斯页岩的 Anomalocaris canadensis。' },
    distribution: { regions: ['加拿大不列颠哥伦比亚'], formations: ['Burgess Shale'], mapNote: '世界其他寒武纪地点也有近亲，但不应全部自动归为同一种。' },
    scale: { length: '常见复原约0.5米，大型个体可接近1米', height: '身体低而宽', mass: '无法可靠估算', comparison: '大型个体接近一只中型犬的长度', uncertainty: '软体身体常不完整，最大体长受标本拼合和比例模型影响。' },
    paleoenvironment: '热带浅海陆棚外缘，细泥海底上方的水体中；伯吉斯页岩的快速埋藏保存了平常难以留下的软组织。',
    ecosystemRole: '主动游泳的中大型消费者，可能捕捉柔软或中等硬度的小型动物，也可能从海底附近搜取猎物。',
    lifeFunctions: {
      feeding: '前附肢向内弯曲，把猎物送到腹面的环形口器；口器更适合处理柔软目标，而非轻易咬碎坚硬三叶虫甲壳。',
      locomotion: '身体两侧叶片依次摆动，可能形成类似鳐鱼或乌贼侧鳍的波浪推进；尾扇帮助稳定和转向。',
      respirationOrMetabolism: '背侧鳃样结构可能负责气体交换，但软组织保存和同源解释仍在研究。',
      senses: '大型复眼含大量小眼，支持较高分辨率视觉和主动搜索。',
      defense: '体型、机动性和开阔水体活动降低被小型底栖捕食者接近的机会，没有厚重装甲。',
      growth: '作为泛节肢动物，可能通过蜕皮长大，但 Anomalocaris 的完整蜕皮序列证据有限。'
    },
    anatomyHighlights: [
      { title: '带刺前附肢', explanation: '分节附肢可弯向口部，刺的排列适合抓持而不是剪切。', evidenceLevel: 'direct', mediaId: '' },
      { title: '环形口器', explanation: '多块硬片围绕口部，开合范围和力学研究不支持“万能碎甲机”。', evidenceLevel: 'direct', mediaId: '' },
      { title: '侧面游泳叶片', explanation: '连续叶片与尾扇共同提供推进和稳定，三维模型可测试其运动表现。', evidenceLevel: 'inferred', mediaId: '' }
    ],
    ecologicalRelations: { preyOrResources: ['软体小型动物', '小型节肢动物', '海底附近猎物'], predators: ['大型个体的明确捕食者未知'], competitors: ['其他恐虾类与大型消费者'], partners: [] },
    dayInTheLife: [
      { title: '在海底上方巡游', text: '侧叶形成连续推进波，复眼扫描明暗变化和运动目标。', certainty: 'plausible' },
      { title: '附肢合拢', text: '一对前附肢把柔软猎物引向腹面口器，硬片完成抓持和吞咽，而不是像钳子一样横向剪碎。', certainty: 'supported' },
      { title: '泥流封存', text: '个体或脱落组织被细泥快速掩埋，缺氧与矿化条件使轮廓进入化石记录。', certainty: 'supported' }
    ],
    fossilEvidence: [
      { evidenceType: '软体化石', material: '附肢、口器、身体叶片、眼与鳃样结构的压印', whatItShows: '可以重建身体各部分的相对位置和运动方式。', limitation: '压扁会改变三维形状，不同个体常只保存部分结构。', strength: '强' },
      { evidenceType: '生物力学模型', material: '口器有限元与游泳叶片三维模拟', whatItShows: '可检验咬合、推进和机动性是否符合某种生活方式。', limitation: '模型依赖组织强度、姿态和边界条件假设。', strength: '中等' }
    ],
    discoveryHistory: [
      { year: '1892', place: '加拿大', event: '孤立前附肢最初被当成一种大型虾的腹部。' },
      { year: '20世纪初', place: '伯吉斯页岩', event: '口器被单独命名，身体叶片也曾被解释成海参。' },
      { year: '1980年代', place: '博物馆藏品重研究', event: '多类“化石”被拼回同一种动物的完整身体。' }
    ],
    debates: [{ question: '奇虾主要吃什么？', currentView: '前附肢和口器适合抓取柔软或中等硬度的小型猎物。', alternatives: '早期复原常把它描绘成专门咬碎三叶虫的顶级捕食者。', confidence: '中等：主动取食明确，具体食谱难由形态单独确定。' }],
    misconceptions: [
      { myth: '奇虾就是一只巨大的虾。', correction: '它是节肢动物干群亲属，身体结构与现代虾差别很大。' },
      { myth: '环形口器能轻松咬碎所有三叶虫。', correction: '力学和磨损证据提示口器能力更有限，硬壳专食说并不稳固。' }
    ],
    funFacts: ['它的前附肢、口器和身体曾分别被命名成不同动物。', '复眼是寒武纪复杂视觉的重要证据。', '侧叶推进模型显示它不是笨重漂浮物，而是可控制姿态的游泳者。'],
    glossary: [
      { term: '干群', definition: '比现生冠群更早分化、但与其亲缘更近的一系列已灭绝支系。' },
      { term: '复眼', definition: '由许多小眼单元组成的视觉器官。' },
      { term: '有限元分析', definition: '把结构拆成许多小单元来估算受力和变形的方法。' }
    ],
    knowledgeCheck: [
      { question: '奇虾如何把猎物送入口中？', options: ['用尾扇卷入', '用一对前附肢抓取', '用长舌黏取', '用牙齿撕咬'], correctIndex: 1, explanation: '分节前附肢可向腹面弯曲，把猎物送往环形口器。' },
      { question: '奇虾最初为什么被误认成多种动物？', options: ['名字翻译错误', '不同身体部分分开保存', '来自不同年代', '没有任何化石'], correctIndex: 1, explanation: '软体动物常零散保存，附肢、口器和身体曾分别命名。' },
      { question: '下列哪项较稳妥？', options: ['它必定专吃三叶虫', '它是现代虾', '它是主动游泳的消费者', '它生活在陆地'], correctIndex: 2, explanation: '眼、附肢与游泳叶片支持主动游泳取食。' }
    ],
    sourceIds: ['anomalocaris-rom', 'anomalocaris-smithsonian', 'anomalocaris-rspb-2021']
  },
  {
    id: 'dunkleosteus', entryType: 'species',
    hook: '没有真正牙齿的重甲鱼，却把颌部骨板磨成了能自我更新的剪刀。',
    quickSummary: '邓氏鱼是晚泥盆世大型盾皮鱼，头胸部由厚骨板包裹，颌缘没有现代意义的牙齿，而是锋利的骨质刃。我们掌握大量头甲和颌部，却缺少完整后躯，因此体长从传统六至八米下调到更短、更深躯的方案仍在讨论。',
    whyItMatters: '它把早期有颌脊椎动物的捕食力推到极端，也提醒我们不能用一颗头按现代鲨鱼比例随意补全身体。新研究把眼眶至鳃盖长度、口腔尺寸和近亲体形引入估算，让公众能看见科学如何主动修订一个著名巨兽的尺寸。',
    taxonomy: { displayPath: ['动物界', '脊索动物门', '盾皮鱼类', '节甲鱼目', '邓氏鱼属'], classificationNote: '盾皮鱼是已灭绝的早期有颌脊椎动物组合，内部关系仍会随系统分析调整。', confidence: 'high' },
    time: { displayRange: '约3.82亿—3.58亿年前，晚泥盆世', earliestMa: 382, latestMa: 358, precisionNote: '不同种与产地跨越的层位不同，本页重点为 D. terrelli。' },
    distribution: { regions: ['北美五大湖地区', '摩洛哥', '欧洲部分地区'], formations: ['Cleveland Shale 等'], mapNote: '不同地区化石可能属于邓氏鱼属不同种，不能用单一尺寸概括。' },
    scale: { length: 'D. terrelli 新估算常约3.4米，最大个体可能约4米上下', height: '躯干可能比旧式鲨鱼形复原更深', mass: '随身体模型差异很大', comparison: '长度接近小型汽车，但头胸部更厚重', uncertainty: '后躯保存不足，长度与体重仍高度依赖比例模型。' },
    paleoenvironment: '晚泥盆世温暖陆棚海与缺氧盆地边缘；Cleveland Shale 的低氧底水利于头甲保存。',
    ecosystemRole: '大型海洋捕食者与食腐者，能处理鱼类、头足类及其他可切割食物；是否捕食某类目标需依胃内容或咬痕确认。',
    lifeFunctions: {
      feeding: '张口机构快速打开颌部，锐利骨板在闭合时形成剪切边缘；骨板磨损后仍保持刃口。',
      locomotion: '后躯未完整保存，可能依靠有力尾部推进；厚重头甲意味着转向和加速需在体形复原中权衡。',
      respirationOrMetabolism: '以鳃呼吸，鳃盖区域骨板可提供肌肉和水流通道线索。',
      senses: '眼眶与头甲感觉管显示依赖视觉和水流感知，但软组织感官能力无法直接测量。',
      defense: '头与胸部骨甲抵御咬击，也构成颌部肌肉和关节的支撑框架。',
      growth: '骨板组织和个体尺寸差异记录生长，最大标本是否代表常见成体仍不确定。'
    },
    anatomyHighlights: [
      { title: '自锐式颌刃', explanation: '上下颌骨板接触和磨耗维持锋利边缘，功能类似重型剪切器。', evidenceLevel: 'direct', mediaId: '' },
      { title: '活动头甲关节', explanation: '头部与胸甲关节、颌部联动可增大张口速度和范围。', evidenceLevel: 'inferred', mediaId: '' },
      { title: '缺失的后半身', explanation: '大多数著名标本保存头甲，却没有可直接量取的完整脊柱和尾部。', evidenceLevel: 'direct', mediaId: '' }
    ],
    ecologicalRelations: { preyOrResources: ['鱼类', '头足类', '可利用的动物尸体'], predators: ['成年大型个体的明确捕食者未知'], competitors: ['大型鲨形鱼与其他盾皮鱼'], partners: [] },
    dayInTheLife: [
      { title: '沿陆棚水体巡游', text: '视觉与侧线样感觉系统读取猎物运动，厚重头甲前方保持稳定。', certainty: 'plausible' },
      { title: '瞬间张颌', text: '颅甲关节和肌肉使口部快速打开，猎物进入后由骨质刃完成剪切。', certainty: 'supported' },
      { title: '沉向缺氧海底', text: '死亡个体的头甲比软组织更容易进入低氧泥层并保存，后躯则常被分解或扰动。', certainty: 'supported' }
    ],
    fossilEvidence: [
      { evidenceType: '头甲与颌骨', material: '大量三维或压扁的骨板、关节与磨损面', whatItShows: '颌部力学、头部尺寸和装甲结构。', limitation: '无法直接给出完整体长、尾形或游泳姿态。', strength: '强' },
      { evidenceType: '比例模型', material: '眼眶—鳃盖长度、口腔尺寸与多类鱼体比例', whatItShows: '传统六至八米复原可能明显偏长。', limitation: '选择哪组现代或化石参照会改变估算，体重误差更大。', strength: '中等' }
    ],
    discoveryHistory: [
      { year: '19世纪后期', place: '北美与欧洲', event: '大型盾皮鱼头甲逐步被描述和分类。' },
      { year: '1930年代', place: '俄亥俄州', event: 'Cleveland Museum 团队重组标本，形成经典展示。' },
      { year: '2023', place: '多数据集比较', event: '新比例方法推动更短、更深躯的体长复原。' }
    ],
    debates: [{ question: 'Dunkleosteus terrelli 究竟有多长？', currentView: '新方法支持约三至四米级，而不是常见旧图中的六至十米。', alternatives: '不同参照比例仍能产生更长或更短方案。', confidence: '中等：头部可靠，后躯未保存使整体复原持续开放。' }],
    misconceptions: [
      { myth: '邓氏鱼有一排像鲨鱼一样可替换的牙。', correction: '它主要用颌骨边缘形成的锐利骨板切割。' },
      { myth: '所有博物馆旧模型的巨大体长都已被化石直接证实。', correction: '完整后躯缺失，体长是随方法更新的估算。' }
    ],
    funFacts: ['D. terrelli 的名字纪念古生物学家 David Dunkle。', '俄亥俄州将它指定为州化石鱼。', '同一批头甲既能研究捕食，也能检验公众熟悉的体长复原。'],
    glossary: [
      { term: '盾皮鱼', definition: '头胸部常具骨甲、现已灭绝的一组早期有颌脊椎动物。' },
      { term: '骨板', definition: '构成外部装甲或颌缘的硬质骨组织。' },
      { term: '比例估算', definition: '用已知部位与参照动物的关系推算缺失部位。' }
    ],
    knowledgeCheck: [
      { question: '邓氏鱼切割食物的主要结构是什么？', options: ['可替换牙齿', '颌缘骨板', '角质喙', '毒刺'], correctIndex: 1, explanation: '锋利颌骨边缘形成自锐式剪切结构。' },
      { question: '为什么体长仍有争议？', options: ['头部从未发现', '后躯缺少完整化石', '年代未知', '它没有骨骼'], correctIndex: 1, explanation: '保存偏向头甲，后躯比例必须通过模型推算。' },
      { question: '新研究主要带来什么变化？', options: ['确认它是恐龙', '支持更短更深的身体', '证明它吃植物', '证明它能上岸'], correctIndex: 1, explanation: '多种比例指标使传统超长复原受到挑战。' }
    ],
    sourceIds: ['dunkleosteus-diversity-2023', 'dunkleosteus-peerj-2023', 'dunkleosteus-cmnh']
  },
  {
    id: 'lystrosaurus', entryType: 'species',
    hook: '大灭绝后的陆地并非空无一物：这只长喙、带獠牙的合弓动物到处留下了骨头。',
    quickSummary: '水龙兽是二叠纪末到三叠纪初的二齿兽类合弓动物，身体粗壮，口前部有角质喙，多数种保留一对獠牙。它跨过地球史最严重的大灭绝，并在南部泛大陆许多地区变得常见，但“灾后几乎占九成陆生脊椎动物”的旧数字已被重新评估。',
    whyItMatters: '水龙兽是研究二叠纪—三叠纪危机、陆地食物网崩溃与恢复节奏的核心化石。骨组织、生长线、分布和洞穴共存信息让我们检验快速生长、季节性休眠或掘穴等假说，却没有任何单一特征能独自解释它为何幸存。',
    taxonomy: { displayPath: ['动物界', '合弓纲', '兽孔目', '二齿兽类', '水龙兽属'], classificationNote: '它比恐龙更接近哺乳动物一侧，但不是哺乳动物，也不是现代蜥蜴。', confidence: 'high' },
    time: { displayRange: '约2.54亿—2.48亿年前，跨二叠纪末与早三叠纪', earliestMa: 254, latestMa: 248, precisionNote: '不同种的存续范围并不一致，不能把整个属当作单一幸存种。' },
    distribution: { regions: ['南非', '南极洲', '印度', '俄罗斯与中国部分地区'], formations: ['Karoo Basin 多个组合带', '南极 Fremouw Formation'], mapNote: '广布化石曾帮助支持冈瓦纳大陆拼合，但不同地区的鉴定与年代仍需地层校准。' },
    scale: { length: '多数约0.8—1米，部分种更大', height: '肩高约中型犬级', mass: '依种和复原差异较大', comparison: '外形可类比一只短腿、粗壮的猪，但头部是喙和獠牙组合', uncertainty: '软组织、姿势和种间差异会显著影响体重。' },
    paleoenvironment: '从较湿润河漫滩到灭绝后炎热、季节性干旱的河流环境；不同地区和层位并非同一种气候。',
    ecosystemRole: '以低矮植物和地下或近地表资源为主的中型植食者，是灭绝后简化陆地食物网中的重要初级消费者。',
    lifeFunctions: {
      feeding: '角质喙剪取植物，颌部肌肉负责后移或压碎；獠牙可能兼具展示、掘取或防御功能。',
      locomotion: '四肢粗壮、步幅不长，适合地面稳定移动；是否经常掘穴需区分洞内化石与主动造洞证据。',
      respirationOrMetabolism: '骨组织显示较快生长，但代谢水平不能只由一项组织特征直接等同于现代哺乳动物。',
      senses: '头骨提供嗅觉、听觉和咀嚼肌附着线索，软组织感官范围仍需比较解剖推断。',
      defense: '粗壮身体、獠牙与可能的掘穴行为可降低部分风险；没有重型骨甲。',
      growth: '三叠纪部分种显示快速、较连续生长，可能有助于在不稳定环境中尽快成熟。',
      reproduction: '作为非哺乳合弓动物很可能产卵；具体巢穴和育幼行为长期缺乏直接证据。'
    },
    anatomyHighlights: [
      { title: '角质喙', explanation: '前颌缺少普通牙列，喙缘适合剪取韧性植物。', evidenceLevel: 'inferred', mediaId: '' },
      { title: '一对獠牙', explanation: '多数种的上颌犬齿持续生长，具体功能可能不止一种。', evidenceLevel: 'direct', mediaId: '' },
      { title: '快速生长的骨组织', explanation: '骨切片中的血管化和生长记录可比较灭绝前后生活史。', evidenceLevel: 'direct', mediaId: '' }
    ],
    ecologicalRelations: { preyOrResources: ['低矮种子蕨与其他耐逆植物', '近地表植物组织'], predators: ['大型兽头类等捕食性合弓动物'], competitors: ['其他二齿兽与小型植食四足动物'], partners: [] },
    dayInTheLife: [
      { title: '清晨取食', text: '在高温来临前用喙剪取低矮植物，獠牙和颌部帮助处理粗糙资源。', certainty: 'plausible' },
      { title: '寻找微环境', text: '干热时段靠近河岸阴影或洞穴；部分洞穴中发现水龙兽化石，但是否每个个体都主动掘穴不能确定。', certainty: 'plausible' },
      { title: '快速长大', text: '幼体把资源投入较快生长，较早达到能繁殖或抵御捕食的体型，这一优势仍属待检验解释。', certainty: 'plausible' }
    ],
    fossilEvidence: [
      { evidenceType: '骨组织学', material: '不同年龄和灭绝前后种的四肢骨切片', whatItShows: '生长速度、季节停顿和生活史差异。', limitation: '生长线不一定只代表冬眠，采样位置与个体年龄会改变记录。', strength: '强' },
      { evidenceType: '地层与群落统计', material: '卡鲁盆地大量标本的层位、种类和丰度', whatItShows: '哪些种跨越边界以及何时变得丰富。', limitation: '采集偏差和旧标本层位不精确会放大“占比”数字。', strength: '强' },
      { evidenceType: '洞穴共存', material: '洞穴充填物中的骨骼和姿态', whatItShows: '至少有个体进入或死在洞穴系统。', limitation: '不能证明所有水龙兽都建造这些洞穴。', strength: '中等' }
    ],
    discoveryHistory: [
      { year: '19世纪', place: '南非', event: '早期水龙兽头骨被收集并建立属名。' },
      { year: '1910—1912', place: '南极洲', event: '探险队发现化石，后来成为大陆漂移的重要公众证据。' },
      { year: '21世纪', place: '卡鲁盆地与南极', event: '骨组织和精细地层重新检验“灾变幸存者”叙事。' }
    ],
    debates: [{ question: '水龙兽为何在灭绝后成功？', currentView: '快速生长、广食性、较强环境耐受与可能的掘穴共同构成候选解释。', alternatives: '休眠、繁殖节奏或仅由采样偏差造成“异常繁盛”也曾被强调。', confidence: '中等：幸存和广布明确，单一因果尚未证明。' }],
    misconceptions: [
      { myth: '水龙兽是恐龙。', correction: '它属于合弓动物，亲缘上处在哺乳动物一侧，早于大多数恐龙繁盛。' },
      { myth: '灭绝后陆地脊椎动物有九成都是水龙兽。', correction: '旧比例受采集与地层统计影响，较新的群落研究给出更谨慎图景。' }
    ],
    funFacts: ['水龙兽化石曾用于向公众解释冈瓦纳大陆曾经相连。', '属内并非所有种都跨过二叠纪末边界。', '獠牙看起来像犬齿，但主要食物仍被认为是植物。'],
    glossary: [
      { term: '二齿兽', definition: '许多成员以喙和一对上颌獠牙为特征的植食性兽孔类。' },
      { term: '骨组织学', definition: '显微观察骨骼组织以研究生长、血管和生理线索。' },
      { term: '组合带', definition: '用一组常见化石划分和对比地层的单位。' }
    ],
    knowledgeCheck: [
      { question: '水龙兽属于哪条演化支系？', options: ['恐龙', '合弓动物', '现代蜥蜴', '两栖动物'], correctIndex: 1, explanation: '水龙兽是兽孔类合弓动物，位于哺乳动物演化一侧。' },
      { question: '哪项不能单独证明所有水龙兽都掘穴？', options: ['洞穴中的骨骼', '四肢骨结构', '地层分布', '以上任一单独证据'], correctIndex: 3, explanation: '洞内骨骼可能由进入、占用或搬运形成，造洞者身份需多证据。' },
      { question: '研究灭绝后成功的主要限制是什么？', options: ['没有任何化石', '多个因素难以分离', '年代晚于人类', '它只发现一件'], correctIndex: 1, explanation: '快速生长、环境耐受与采样偏差等解释可能共同作用。' }
    ],
    sourceIds: ['lystrosaurus-peerj-2020', 'lystrosaurus-lethaia-2007', 'lystrosaurus-burrow-2017']
  }
]

module.exports = entries.concat(require('./catalog').groups.paleozoic)
