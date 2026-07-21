const entries = [
  {
    id: 'archaeopteryx', entryType: 'species',
    hook: '它不是“一半鸟一半恐龙”的拼图，而是一只带飞羽、牙齿和长尾的侏罗纪近鸟恐龙。',
    quickSummary: '始祖鸟来自德国晚侏罗世石灰岩，体型约乌鸦大小，保存了不对称飞羽，同时具有牙齿、长骨质尾和带爪前肢。它接近鸟类起源的重要分支，但不是所有现代鸟类都必须经过的单一“中间祖先”；飞行方式也不等同于现代鸟。',
    whyItMatters: '1861年骨骼在《物种起源》出版不久后被描述，使它成为演化过渡特征的标志。新标本的羽毛分布、肩带和翼骨几何能检验滑翔、扑翼与地面活动假说，也显示“羽毛先只为飞行而出现”的简单故事并不成立。',
    taxonomy: { displayPath: ['动物界', '恐龙总目', '兽脚类', '近鸟类', '始祖鸟属'], classificationNote: '通常置于鸟翼类早期位置；它是非鸟恐龙与鸟类连续演化的一部分，不是现代类群的机械拼接。', confidence: 'high' },
    time: { displayRange: '约1.50亿年前，晚侏罗世', earliestMa: 150.8, latestMa: 148.5, precisionNote: '不同索伦霍芬地区板层石灰岩的精确年龄与标本层位有小幅差异。' },
    distribution: { regions: ['德国巴伐利亚'], formations: ['Solnhofen Limestone 及邻近板层石灰岩'], mapNote: '目前可靠标本高度集中于这一岛屿与潟湖环境，不能据此断言其全球分布很窄。' },
    scale: { length: '含尾约0.5米', height: '站立约鸽至乌鸦级', mass: '常估约0.5—1千克', comparison: '与一只乌鸦相近，但长骨尾显著延伸', uncertainty: '不同标本可能包含年龄或分类差异，体重依软组织复原而变。' },
    paleoenvironment: '干旱热带群岛间的浅潟湖与碳酸盐泥坪，周围有低矮植被；缺氧、细粒的潟湖底部保存了羽毛印痕。',
    ecosystemRole: '小型捕食或杂食性近鸟恐龙，可能捕捉昆虫、小型脊椎动物，并在地面、灌木或低矮树木间活动。',
    lifeFunctions: {
      feeding: '颌部保留小牙，食谱可能包括昆虫和小型动物；没有直接胃内容能定义全部食物。',
      locomotion: '后肢适于地面行走和攀越，羽翼可产生空气动力；翼骨截面支持主动飞行负荷，但持续扑翼能力可能低于现代鸟。',
      respirationOrMetabolism: '作为近鸟兽脚类，可能具有较高代谢和气囊式呼吸系统的部分基础，软组织气囊未直接保存。',
      senses: '头骨与内耳研究支持视觉、平衡和快速头部控制的重要性。',
      defense: '小体型、羽翼辅助跃迁和带爪四肢可帮助逃离威胁，没有装甲。',
      growth: '骨组织显示它可能比多数现代鸟生长更慢，完全成熟需较长时间。',
      reproduction: '应当产卵，但尚无与始祖鸟个体直接关联的巢、蛋或育幼行为证据。'
    },
    anatomyHighlights: [
      { title: '不对称飞羽', explanation: '羽轴两侧羽片宽度不同，是产生和控制升力的重要空气动力特征。', evidenceLevel: 'direct', mediaId: '' },
      { title: '长骨质尾', explanation: '尾椎串联并附着羽毛，与现代鸟短尾综荐骨方案不同。', evidenceLevel: 'direct', mediaId: '' },
      { title: '翼骨几何', explanation: '骨壁厚度与形状接近会主动飞行的鸟类，但并不证明扑翼姿态与现代鸟完全相同。', evidenceLevel: 'inferred', mediaId: '' }
    ],
    ecologicalRelations: { preyOrResources: ['昆虫', '小型蜥蜴或其他脊椎动物候选'], predators: ['群岛上的较大兽脚类候选'], competitors: ['其他小型近鸟恐龙与翼龙'], partners: [] },
    dayInTheLife: [
      { title: '在岛屿灌丛觅食', text: '后肢在石灰质地面移动，眼睛追踪昆虫或小型猎物。', certainty: 'plausible' },
      { title: '借翼越过空隙', text: '前肢扑动并展开飞羽，在短距离内产生升力和控制；起飞方式仍未确定。', certainty: 'plausible' },
      { title: '落入潟湖', text: '尸体进入缺氧细泥，几乎无扰动的沉积把羽毛轮廓留在石板两面。', certainty: 'supported' }
    ],
    fossilEvidence: [
      { evidenceType: '骨骼与羽毛印痕', material: '多件近完整板状石灰岩标本', whatItShows: '飞羽排列、尾部、牙齿、爪和整体比例同时存在。', limitation: '压扁标本会遮挡关节姿态，羽毛颜色和多数软组织未知。', strength: '强' },
      { evidenceType: '骨截面与三维扫描', material: '翼骨几何、微观骨组织和CT数据', whatItShows: '翼受到与主动飞行相符的机械负荷，生长速度可被估计。', limitation: '结构相似不等于飞行动作完全相同，肌肉和行为仍需建模。', strength: '中等到强' }
    ],
    discoveryHistory: [
      { year: '1860', place: '德国巴伐利亚', event: '孤立羽毛被发现并命名，是否确属始祖鸟仍有讨论。' },
      { year: '1861', place: '伦敦标本', event: '首件骨骼与羽毛印痕标本推动演化讨论。' },
      { year: '21世纪', place: '欧洲同步辐射与显微研究', event: '新标本和扫描持续修正羽毛分布、飞行与生长认识。' }
    ],
    debates: [{ question: '始祖鸟能怎样飞？', currentView: '羽毛与翼骨支持一定程度的主动空气动力飞行。', alternatives: '起飞可来自地面奔跑、树上跃下或两者结合，扑翼幅度与耐力也有不同模型。', confidence: '中等：能利用羽翼较可靠，具体动作和生态频率未定。' }],
    misconceptions: [
      { myth: '始祖鸟是现代鸟类唯一、直线式的祖先。', correction: '它是鸟类起源附近众多分支之一，演化树不是一条排队升级的直线。' },
      { myth: '它的羽毛证明羽毛专门为飞行才出现。', correction: '更早与其他恐龙羽毛显示保温、展示等功能可能先出现。' }
    ],
    funFacts: ['部分标本最初曾被误认成小型恐龙而忽略羽毛。', '它既有不对称飞羽，也保留长尾和牙齿。', '极细石灰泥能保存到单根羽毛的轮廓。'],
    glossary: [
      { term: '近鸟类', definition: '在兽脚类中接近鸟类起源的一组恐龙。' },
      { term: '不对称飞羽', definition: '羽轴两侧羽片宽度不同、可提升空气动力控制的羽毛。' },
      { term: '板层石灰岩', definition: '可沿薄层劈开的细粒石灰岩，常精细保存软组织印痕。' }
    ],
    knowledgeCheck: [
      { question: '始祖鸟同时保留了哪组特征？', options: ['飞羽、牙齿和长骨尾', '鳃和鱼鳍', '胎生和毛发', '角和颈盾'], correctIndex: 0, explanation: '这些特征共同显示鸟类与其他兽脚类之间的连续变化。' },
      { question: '翼骨研究能较可靠说明什么？', options: ['飞行颜色', '承受过飞行相关负荷', '每次飞行距离', '叫声音调'], correctIndex: 1, explanation: '骨几何可测试机械负荷，但不能直接复原完整行为。' },
      { question: '为什么它不是“半鸟半恐龙”？', options: ['鸟不属于恐龙', '它是具有完整特征组合的近鸟恐龙', '化石是假的', '它没有羽毛'], correctIndex: 1, explanation: '鸟类本就在恐龙演化支内，始祖鸟有自身完整身体方案。' }
    ],
    sourceIds: ['archaeopteryx-nhm', 'archaeopteryx-flight-2018', 'archaeopteryx-feathers-2014']
  },
  {
    id: 'tyrannosaurus', entryType: 'species',
    hook: '真正可怕的不只是巨口：快速生长、立体视觉和精细嗅觉共同构成了霸王龙。',
    quickSummary: '霸王龙生活在白垩纪最末期的北美西部，是大型暴龙科兽脚类。成年个体可长约十二米、重数吨，深而坚固的头骨承受强大咬合；幼体更修长、长腿。咬痕、粪化石和骨骼病理证明它进食大型恐龙，但主动狩猎与食腐并非互斥。',
    whyItMatters: '它拥有从幼体到高龄成体的较丰富样本，使研究者能重建生长曲线、咬合、感觉和种群差异。霸王龙也是辨别“化石直接告诉我们什么”与“电影补上了什么”的理想案例：羽毛覆盖、群体狩猎和最高奔跑速度都仍有限制。',
    taxonomy: { displayPath: ['动物界', '恐龙总目', '兽脚类', '暴龙科', '暴龙属', '霸王龙'], classificationNote: 'Tyrannosaurus rex 是属内最广泛接受的种；是否还应拆分其他种存在争论。', confidence: 'high' },
    time: { displayRange: '约6800万—6600万年前，晚白垩世马斯特里赫特期', earliestMa: 68, latestMa: 66, precisionNote: '在非鸟恐龙灭绝事件前最后约两百万年生活。' },
    distribution: { regions: ['美国西部', '加拿大西部'], formations: ['Hell Creek', 'Lance', 'Frenchman 等'], mapNote: '当时被西部内陆海道和山系塑造的北美与现代地图差异很大。' },
    scale: { length: '大型成体约12—13米', height: '臀高约3.5—4米', mass: '大型个体常估7—9吨，极值随模型变化', comparison: '头部可超过成年人躯干长度，一颗牙接近香蕉大小', uncertainty: '软组织体积、标本变形和回归方法会改变质量估算。' },
    paleoenvironment: '河流、洪泛平原、林地和湿地交错的温暖季节性环境，与三角龙、埃德蒙顿龙等共享生态系统。',
    ecosystemRole: '生态系统顶级大型肉食者，同时会利用可获得的尸体；幼体与成体体形差异可能让它们占据不同猎物与速度生态位。',
    lifeFunctions: {
      feeding: '粗壮牙齿刺穿并压碎骨骼，强颌与颈部肌肉撕取组织；愈合咬痕和粪化石提供实际取食证据。',
      locomotion: '强壮后肢承担体重，长尾平衡躯干；成年速度受体重和骨骼安全限制，不太可能像电影中高速追车。',
      respirationOrMetabolism: '与其他兽脚类和鸟类比较支持气囊式高效呼吸系统，但具体代谢率范围仍由骨组织和模型推断。',
      senses: '面向前方的眼眶支持较大双眼重叠，嗅球和内耳显示嗅觉、平衡与低频感知重要。',
      defense: '成年体型与强颌是主要防御，面部伤痕显示同类冲突并非没有代价。',
      growth: '青少年较轻巧，青春期出现快速增重，许多个体在二十岁前后达到大型成体。',
      reproduction: '作为恐龙应产卵，但尚未发现可无争议归给霸王龙的巢和蛋。',
      socialBehavior: '多个暴龙科个体共存与足迹可支持容忍或聚集，但不能直接证明像狼群一样长期合作狩猎。'
    },
    anatomyHighlights: [
      { title: '深而融合的头骨', explanation: '粗壮骨梁、缝合和腭部结构分散巨大咬合产生的应力。', evidenceLevel: 'direct', mediaId: '' },
      { title: '粗大异型牙', explanation: '前部牙截面和后部牙大小不同，均适合抗弯和反复穿刺骨肉。', evidenceLevel: 'direct', mediaId: '' },
      { title: '短而有力的前肢', explanation: '两指前肢骨和肌肉附着并非无用，但它在捕猎中的具体角色未获直接证明。', evidenceLevel: 'inferred', mediaId: '' }
    ],
    ecologicalRelations: { preyOrResources: ['三角龙', '埃德蒙顿龙', '其他大型恐龙尸体'], predators: ['成体几乎没有稳定天敌', '幼体可能面对同类与其他肉食者'], competitors: ['其他霸王龙个体', '较小兽脚类'], partners: [] },
    dayInTheLife: [
      { title: '沿河漫滩搜索', text: '嗅觉和视觉扫描植食动物活动、尸体气味与其他霸王龙留下的信号。', certainty: 'plausible' },
      { title: '短距离接近', text: '在合适距离发动力量型追击或伏击；成年个体不需要也未必能维持极高长跑速度。', certainty: 'plausible' },
      { title: '在骨头留下记录', text: '牙齿压入骨表，部分猎物活下来形成愈合痕迹，另一些碎片进入粪便并保存。', certainty: 'supported' }
    ],
    fossilEvidence: [
      { evidenceType: '骨骼生长序列', material: '不同年龄头骨、四肢骨和骨组织切片', whatItShows: '幼体比例、快速生长期和大致成熟年龄。', limitation: '样本仍偏向少数地区，年龄估计依生长线解释。', strength: '强' },
      { evidenceType: '咬痕与粪化石', material: '带霸王龙形牙痕的骨、嵌齿与含骨碎片粪化石', whatItShows: '实际啃食大型恐龙并能压碎骨头。', limitation: '单个咬痕通常不能区分捕杀还是食腐。', strength: '强' },
      { evidenceType: '生物力学', material: '头骨CT、肌肉重建和足部应力模型', whatItShows: '咬合与运动能力的可行范围。', limitation: '软组织尺寸和行为输入会改变结果。', strength: '中等' }
    ],
    discoveryHistory: [
      { year: '1902', place: '蒙大拿州', event: 'Barnum Brown 发现后来成为经典的霸王龙标本。' },
      { year: '1905', place: '美国自然历史博物馆', event: 'Henry Fairfield Osborn 正式命名 Tyrannosaurus rex。' },
      { year: '1990年代至今', place: '北美多家博物馆', event: '更完整标本、CT与骨组织学重写生长和功能认识。' }
    ],
    debates: [{ question: '霸王龙是猎手还是食腐者？', currentView: '它既能主动捕猎，也会像现生大型肉食者一样食腐。', alternatives: '曾有人强调它主要或几乎只食腐。', confidence: '高：愈合咬痕支持攻击活体，取食尸体在生态上同样合理。' }],
    misconceptions: [
      { myth: '霸王龙看不见静止物体。', correction: '这是电影设定；眼眶与视觉模型不支持这种缺陷。' },
      { myth: '短前肢完全无用。', correction: '骨骼和肌肉附着显示前肢有力量，只是具体行为功能尚不明确。' }
    ],
    funFacts: ['一生的大部分体重可能在青春期快速增加。', '有些猎物骨上的咬伤发生后愈合，记录了失败攻击或冲突。', '“猎手”和“食腐者”不是互斥职业，现代大型捕食者也会两者兼用。'],
    glossary: [
      { term: '暴龙科', definition: '晚白垩世出现多种大型或中型成员的兽脚类恐龙支系。' },
      { term: '骨组织生长线', definition: '骨骼周期性生长停顿留下、可辅助估龄的显微结构。' },
      { term: '双眼重叠', definition: '左右眼视野共同覆盖的区域，有助于深度判断。' }
    ],
    knowledgeCheck: [
      { question: '哪项能证明霸王龙实际咬过活体猎物？', options: ['电影镜头', '愈合的咬痕', '完整羽毛', '脚印颜色'], correctIndex: 1, explanation: '伤口若愈合，说明被咬动物在攻击后仍存活一段时间。' },
      { question: '幼年霸王龙与成体有何重要差异？', options: ['完全没有后肢', '通常更修长轻巧', '生活在海里', '没有牙齿'], correctIndex: 1, explanation: '生长序列显示幼体比例更纤细，生态位可能随年龄变化。' },
      { question: '猎手与食腐者关系是什么？', options: ['必须二选一', '大型肉食者通常会兼用', '食腐者不能咬骨', '化石无法研究取食'], correctIndex: 1, explanation: '机会性利用尸体并不否定主动捕猎能力。' }
    ],
    sourceIds: ['tyrannosaurus-smithsonian', 'tyrannosaurus-growth-2004', 'tyrannosaurus-age-2004']
  },
  {
    id: 'ankylosaurus', entryType: 'species', contentOrigin: 'manual', reviewStatus: 'publish-ready',
    hook: '它不是一辆只会挨打的装甲车：骨甲负责覆盖身体，尾端则形成一套能主动摆动的防御系统。',
    quickSummary: '甲龙生活在晚白垩世北美西部，是低矮、四足的大型植食恐龙。皮内成骨覆盖颈、背和体侧，尾端骨块与加固尾椎组成尾锤。它主要在近地面取食植物；尾锤能否、何时以及对谁挥击，需要把骨骼、肌肉复原和力学模型分开阅读。',
    whyItMatters: '甲龙把“防御”拆成了多套结构：骨甲保护身体，低矮宽阔的躯干提高稳定性，尾部则保留主动反击的可能。不同甲龙类的颌与牙齿还显示，装甲恐龙并非都用同一种方式吃同一类植物。它是理解身体结构如何同时服务取食、防护和运动约束的好案例。',
    taxonomy: { displayPath: ['动物界', '恐龙总目', '鸟臀目', '甲龙亚目', '甲龙科', '甲龙属'], classificationNote: 'Ankylosaurus magniventris 是晚白垩世北美甲龙科成员；许多尾锤功能研究使用保存更完整的近亲，外推时需标明。', confidence: 'high' },
    time: { displayRange: '约6800万—6600万年前，晚白垩世', earliestMa: 68, latestMa: 66, precisionNote: '主要来自北美最晚白垩世地层；不同标本的层位和完整度并不相同。' },
    distribution: { regions: ['美国西部', '加拿大西部'], formations: ['Hell Creek', 'Lance', 'Scollard 等'], mapNote: '化石点位于当时北美西部沿海平原与河流系统，不能直接套用现代州界和气候。' },
    scale: { length: '大型个体约6—8米', height: '背部较低，臀高约成人身高上下', mass: '常见估算约数吨，随体积模型变化', comparison: '体长接近一辆大型巴士，身体明显比多数大型恐龙更低矮宽阔', uncertainty: '完整骨架少，躯干宽度、软组织与尾部比例会改变估重。' },
    paleoenvironment: '温暖的河流、洪泛平原、林地与湿地交错环境，与霸王龙、三角龙和鸭嘴龙类共享最晚白垩世生态系统。',
    ecosystemRole: '大型低位取食植食者，利用蕨类、灌木和其他近地植物资源；装甲与尾锤降低大型捕食者接近的收益。',
    lifeFunctions: {
      feeding: '宽吻部适合收集近地植被，小型叶状牙负责切割；近亲的磨耗与颌部研究显示部分甲龙类还具有前后向处理动作。',
      locomotion: '四条粗壮肢体支撑低矮宽阔躯干，日常移动更适合稳定步行，不支持高速长距离奔跑。',
      respirationOrMetabolism: '鼻腔曲折结构可能参与空气调节与共鸣，但具体体温和代谢率仍需骨组织及近亲比较。',
      senses: '头骨内腔可约束嗅觉、听觉和平衡范围，不能直接给出警觉程度或情绪。',
      defense: '背部与体侧骨甲覆盖暴露区域，加固尾椎让尾端骨块作为整体摆动；大型尾锤在模型中可产生显著冲击。',
      growth: '皮内成骨与骨组织会随生长改变，幼体尾锤可能尚未达到成体尺寸和力学能力。',
      reproduction: '作为恐龙应当产卵，但目前缺少可无争议归给甲龙属的巢、蛋和育幼序列。',
      socialBehavior: '化石分布不足以证明固定群居；尾锤用于捕食者防御、同类竞争或两者兼有，仍需更多损伤证据。'
    },
    anatomyHighlights: [
      { title: '皮内成骨装甲', explanation: '皮肤内部形成的骨板和小骨块覆盖颈、背与体侧，并非金属外壳。', evidenceLevel: 'direct', mediaId: '' },
      { title: '加固尾柄', explanation: '尾部后段椎骨与肌腱排列限制弯曲，使力量能传向尾端。', evidenceLevel: 'direct', mediaId: '' },
      { title: '尾端骨块', explanation: '成对大型皮内成骨构成尾锤主体；冲击能力取决于尺寸、摆幅与软组织输入。', evidenceLevel: 'inferred', mediaId: '' }
    ],
    ecologicalRelations: { preyOrResources: ['蕨类', '低矮灌木', '近地被子植物候选'], predators: ['霸王龙等大型兽脚类'], competitors: ['其他低位取食甲龙类', '小型与中型植食恐龙'], partners: [] },
    dayInTheLife: [
      { title: '贴近地面取食', text: '宽吻部扫过低矮植被，小牙切下植物，宽阔躯干维持稳定步行。', certainty: 'supported' },
      { title: '风险从侧后方靠近', text: '装甲先保护身体，尾部保持在可摆动范围；具体警戒姿态没有被化石直接记录。', certainty: 'plausible' },
      { title: '尾锤改变接近成本', text: '大型尾锤可能以侧向摆动产生足以伤害骨骼的冲击，但是否真正命中捕食者仍需病理证据。', certainty: 'plausible' }
    ],
    fossilEvidence: [
      { evidenceType: '骨甲、尾椎与尾锤', material: '皮内成骨、加固尾柄和尾端大型骨块', whatItShows: '防护覆盖范围与尾部作为整体摆动的结构基础。', limitation: '骨骼不记录每次挥击对象、速度或行为频率。', strength: '强' },
      { evidenceType: '生物力学模型', material: '尾部尺寸、肌肉截面、关节范围和摆动速度模拟', whatItShows: '不同大小尾锤可能产生的冲击力范围。', limitation: '肌肉与速度是假设输入，近亲结果不能不加说明地等同甲龙属。', strength: '中等' },
      { evidenceType: '颌部与牙齿比较', material: '甲龙类头骨、牙齿磨耗和有限元模型', whatItShows: '低位植食与类群间取食力学差异。', limitation: '研究常来自近亲，不能确定甲龙属的完整植物菜单。', strength: '中等' }
    ],
    discoveryHistory: [
      { year: '1908', place: '美国蒙大拿州', event: 'Barnum Brown 依据部分骨架正式命名甲龙。' },
      { year: '20世纪', place: '北美多家博物馆', event: '分散头骨、骨甲与尾部材料逐步拼合出更可靠身体方案。' },
      { year: '2009年至今', place: '数字模型与比较解剖研究', event: '尾锤冲击、形成过程与甲龙类取食方式被分开检验。' }
    ],
    debates: [{ question: '尾锤主要用来对付捕食者还是同类？', currentView: '骨骼与力学支持它能产生有效冲击，防御和同类竞争都可能。', alternatives: '展示、威慑或多功能使用也可与挥击并存。', confidence: '功能能力较可靠，具体使用对象与频率仍有争议。' }],
    misconceptions: [
      { myth: '所有甲龙类都有同样巨大的尾锤。', correction: '尾锤在甲龙科内部逐步演化，许多结节龙科成员没有这种结构。' },
      { myth: '有尾锤就能证明它经常主动攻击。', correction: '结构支持冲击能力，不等于化石保存了行为频率或攻击动机。' }
    ],
    funFacts: ['甲龙属的完整骨架并不多，经典复原来自多件标本拼合。', '尾锤主体是皮内成骨，不是尾椎末端直接膨大。', '装甲恐龙的牙小，但近亲磨耗显示取食处理并不都很简单。'],
    glossary: [
      { term: '皮内成骨', definition: '在皮肤内部形成、可成为装甲或骨块的骨组织。' },
      { term: '尾柄', definition: '尾锤前方被加固、负责传力的尾部区段。' },
      { term: '有限元分析', definition: '把结构分成许多小单元，计算特定受力条件下应力分布的工程方法。' }
    ],
    knowledgeCheck: [
      { question: '甲龙尾锤的骨块主要属于哪类结构？', options: ['皮内成骨', '牙齿', '角质羽毛', '胃石'], correctIndex: 0, explanation: '尾端骨块和身体装甲都与皮肤内形成的骨组织有关。' },
      { question: '力学模型最适合回答什么？', options: ['尾锤可能产生的冲击范围', '每周挥击次数', '甲龙的情绪', '皮肤颜色'], correctIndex: 0, explanation: '模型能测试结构在设定参数下的能力，不能直接复原行为频率。' },
      { question: '甲龙更可能在哪一高度取食？', options: ['近地面植被', '高树冠顶端', '深海浮游生物', '空中昆虫'], correctIndex: 0, explanation: '低矮身体、吻部和牙齿共同支持低位植食。' }
    ],
    sourceIds: ['ankylosaur-tail-impact-2009', 'ankylosaur-tail-evolution-2015', 'ankylosaur-feeding-2023']
  }
]

module.exports = entries.concat(require('./catalog').groups.mesozoic)
