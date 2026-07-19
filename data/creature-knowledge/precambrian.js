const entries = [
  {
    id: 'methanogen', entryType: 'functional-group',
    hook: '在没有氧气的地球上，它们把最简单的分子接成了甲烷。',
    quickSummary: '产甲烷古菌不是一个单独物种，而是一组只能在缺氧条件下完成产甲烷代谢的古菌。它们利用二氧化碳与氢、乙酸或甲基化合物取得能量，今天仍生活在湿地、沉积物和动物消化道中。',
    whyItMatters: '它们展示了生命无需氧气也能建立能量系统。早期产甲烷活动可能改变了大气温室效应与碳循环；但古老甲烷也可能来自非生物反应，所以单一同位素或有机分子不能独自证明某个时代已有特定古菌。',
    taxonomy: { displayPath: ['生命', '古菌域', '产甲烷类群'], classificationNote: '这是跨越多个古菌支系的代谢功能群，不等于一个属或种。', confidence: 'high' },
    time: { displayRange: '至少可追溯到太古宙候选记录，具体起源时间仍有争论', earliestMa: 3460, latestMa: 0, precisionNote: '岩石中的碳同位素和分子钟提供间接约束，不能像完整骨骼那样直接定种。' },
    distribution: { regions: ['全球现代缺氧环境', '太古宙沉积与热液记录候选区'], formations: ['西澳大利亚古老岩系等候选记录'], mapNote: '古代分布依据地球化学信号推断，并非发现了全球成片的古菌细胞化石。' },
    paleoenvironment: '缺氧海水、沉积物孔隙、热液环境或富有机质微环境；不同产甲烷途径对温度、盐度与底物的要求并不相同。',
    ecosystemRole: '把无机碳或简单有机底物转化为甲烷，连接碳循环、氢循环与沉积物食物网；甲烷随后可被其他微生物氧化。',
    lifeFunctions: {
      feeding: '没有“吞食”动作，而是从二氧化碳、氢、乙酸或甲基化合物等小分子中取得底物。',
      respirationOrMetabolism: '以产甲烷途径保存能量，氧通常会抑制或伤害核心代谢系统；不同支系使用的底物组合不同。',
      senses: '细胞通过膜蛋白与调控网络响应底物、温度、盐度和氧化还原状态，不应类比成动物式感官。',
      defense: '通过细胞包被、修复系统、群落微环境和快速调节代谢，应对渗透压与短暂氧暴露。',
      growth: '在能量收益很低的环境中，部分群落生长极慢；实际速率取决于温度和底物供应。',
      reproduction: '主要通过细胞分裂增殖，没有化石证据支持动物式交配或育幼。'
    },
    anatomyHighlights: [
      { title: '产甲烷酶系统', explanation: '一套专门辅酶与酶促反应完成甲烷生成，关键末端步骤由甲基辅酶M还原酶参与。', evidenceLevel: 'direct', mediaId: '' },
      { title: '古菌细胞膜', explanation: '膜脂化学与细菌、真核生物不同，有助于识别古菌的独特演化历史。', evidenceLevel: 'direct', mediaId: '' },
      { title: '微生物群落界面', explanation: '许多产甲烷古菌依赖其他微生物提供氢或简单底物，功能常发生在群落而非孤立细胞中。', evidenceLevel: 'inferred', mediaId: '' }
    ],
    ecologicalRelations: { preyOrResources: ['二氧化碳与氢', '乙酸', '甲基化合物'], predators: [], competitors: ['硫酸盐还原微生物等底物竞争者'], partners: ['发酵微生物', '厌氧甲烷氧化群落'] },
    dayInTheLife: [
      { title: '沉积物深处', text: '表层氧气已被其他生物消耗，发酵产生的小分子扩散下来，产甲烷细胞开始从低能量反应中维持离子梯度。', certainty: 'supported' },
      { title: '甲烷向上扩散', text: '生成的甲烷进入上部沉积层，其中一部分被甲烷氧化微生物消耗，剩余部分才可能进入水体或大气。', certainty: 'supported' },
      { title: '回到早期地球', text: '类似过程可能曾影响太古宙大气，但速率、全球规模与具体途径只能由地球化学模型约束。', certainty: 'plausible' }
    ],
    fossilEvidence: [
      { evidenceType: '碳同位素', material: '古老沉积物和包裹体中的强负碳同位素信号', whatItShows: '与生物产甲烷或甲烷循环相容。', limitation: '部分非生物反应也能造成轻碳信号，不能单独确定生物身份。', strength: '中等' },
      { evidenceType: '分子与比较基因组', material: '现代古菌的核心产甲烷基因与系统发育关系', whatItShows: '产甲烷是古老且专门化的代谢系统。', limitation: '分子钟依赖校准和模型，给出的起源年代范围可能很宽。', strength: '中等' }
    ],
    discoveryHistory: [
      { year: '1770年代', place: '欧洲湿地与气体研究', event: '甲烷被识别为可燃气体，后来才与微生物过程联系起来。' },
      { year: '20世纪', place: '厌氧培养研究', event: '培养和生化实验逐步厘清产甲烷途径与古菌身份。' },
      { year: '21世纪', place: '古老岩石与基因组研究', event: '同位素、脂质和分子系统学共同约束其深时间历史。' }
    ],
    debates: [{ question: '太古宙甲烷信号是否一定来自产甲烷古菌？', currentView: '多类证据支持早期生物甲烷循环的可能性。', alternatives: '热液反应等非生物过程也能制造甲烷或类似同位素特征。', confidence: '中等：需要地质背景、同位素组合与分子证据交叉判断。' }],
    misconceptions: [
      { myth: '产甲烷古菌是一种远古细菌。', correction: '它们属于古菌域，而且“产甲烷古菌”包含多个支系，不是单一物种。' },
      { myth: '所有甲烷都证明有生命。', correction: '甲烷也能由非生物地质反应产生，来源判断必须结合环境和同位素证据。' }
    ],
    funFacts: ['产甲烷是古菌中独有的能量代谢方式。', '一些反刍动物排放的甲烷主要由消化道内共生古菌产生。', '甲烷既是微生物代谢产物，也是能被另一类微生物继续利用的能源。'],
    glossary: [
      { term: '古菌', definition: '与细菌和真核生物并列的一大生命域。' },
      { term: '厌氧', definition: '不依赖游离氧，某些生物还会被氧抑制的生活状态。' },
      { term: '同位素分馏', definition: '反应对轻、重同位素利用不同而留下的比例偏差。' }
    ],
    knowledgeCheck: [
      { question: '产甲烷古菌属于哪一类？', options: ['单一动物物种', '古菌中的代谢功能群', '一种真菌', '一种病毒'], correctIndex: 1, explanation: '它们是多个古菌支系共享产甲烷代谢的功能群。' },
      { question: '古老甲烷为什么不能单独证明生命？', options: ['甲烷无法保存', '甲烷只有现代才有', '地质反应也能生成甲烷', '古菌不产生甲烷'], correctIndex: 2, explanation: '非生物反应也可产生甲烷，需要多种证据交叉判断。' },
      { question: '产甲烷代谢通常在哪类环境进行？', options: ['富氧表层', '缺氧环境', '只有冰川表面', '只有动物体外'], correctIndex: 1, explanation: '核心产甲烷系统通常要求低氧或无氧条件。' }
    ],
    sourceIds: ['meth-nature-2006', 'meth-epsl-2019', 'meth-science-2001']
  },
  {
    id: 'dickinsonia', entryType: 'species',
    hook: '一张会长大、可能会移动的“海底软垫”，把动物起源问题压进了砂岩。',
    quickSummary: '狄更逊水母生活在埃迪卡拉纪海底，身体扁平、椭圆，并由左右错列的重复单元构成。它没有保存出明确的口、肠道或附肢；生长规律、移动痕迹与化石有机分子共同支持动物亲缘，但具体位置仍有争论。',
    whyItMatters: '它位于寒武纪大爆发之前，是理解大型动物何时出现、如何进食和发育的关键窗口。胆固醇类分子支持动物解释，规则生长又显示复杂发育控制；然而这些证据不能把它直接塞进任何现代动物门类。',
    taxonomy: { displayPath: ['生命', '动物候选', '狄更逊水母属'], classificationNote: '动物亲缘获得较强支持，但属于动物树的哪一支仍有分歧。', confidence: 'debated' },
    time: { displayRange: '约5.58亿—5.50亿年前的埃迪卡拉纪晚期', earliestMa: 558, latestMa: 550, precisionNote: '不同地点与种的年代不完全相同，页面范围用于科普概括。' },
    distribution: { regions: ['南澳大利亚', '俄罗斯白海地区'], formations: ['Ediacara Member', 'White Sea assemblages'], mapNote: '部分其他地区的相似印痕鉴定有争议，因此未全部计入。' },
    scale: { length: '从数毫米幼体到超过一米的个体', height: '极薄的软体', mass: '无法可靠估算', comparison: '大型个体可接近瑜伽垫长度，但远比瑜伽垫薄', uncertainty: '化石压扁和收缩会影响尺寸，质量没有直接证据。' },
    paleoenvironment: '浅海海底的细粒砂质环境，表面可能覆盖微生物席；快速覆埋和特殊成岩过程保存了软体印痕。',
    ecosystemRole: '可能在海底表面缓慢移动并利用微生物席或溶解有机物，是埃迪卡拉海底生态中的大型消费者之一。',
    lifeFunctions: {
      feeding: '化石下方的局部痕迹与身体底面接触关系支持从微生物席获取营养，但是否外部消化或直接吸收仍未定。',
      locomotion: '连续“停驻印痕”被解释为缓慢移动证据；没有足或肌肉直接保存。',
      respirationOrMetabolism: '可能通过较大的体表与海水交换气体，低矮体形可缩短扩散距离。',
      senses: '没有眼、触角或神经组织的直接证据，能否定向响应环境主要由移动痕迹推测。',
      growth: '个体通过增加身体单元并改变各单元生长速度，整体形状保持高度规则。',
      reproduction: '尚无可确认的生殖器官、卵或胚胎，不能从成体聚集直接判断繁殖方式。'
    },
    anatomyHighlights: [
      { title: '错列的身体单元', explanation: '左右两侧单元并非简单镜像对齐，过去常被误称为“分节”。', evidenceLevel: 'direct', mediaId: '' },
      { title: '前后轴与规则生长', explanation: '大量不同大小标本显示稳定的形状变化和单元添加规律。', evidenceLevel: 'direct', mediaId: '' },
      { title: '宽大底面', explanation: '扁平身体与海底紧密接触，可能有利于进食或气体交换。', evidenceLevel: 'inferred', mediaId: '' }
    ],
    ecologicalRelations: { preyOrResources: ['微生物席', '海底有机物候选'], predators: ['尚无确定捕食者'], competitors: ['其他海底表面取食者'], partners: ['微生物席群落'] },
    dayInTheLife: [
      { title: '贴近海床', text: '身体大面积覆盖微生物席，底面与有机质丰富的表层接触。', certainty: 'plausible' },
      { title: '留下停驻痕迹', text: '个体可能缓慢移到新的取食斑块，旧位置留下与身体轮廓相似的印痕。', certainty: 'plausible' },
      { title: '风暴覆埋', text: '一层新沉积物迅速盖住软体，微生物席和成岩作用帮助轮廓保存下来。', certainty: 'supported' }
    ],
    fossilEvidence: [
      { evidenceType: '身体印痕与生长序列', material: '数百件不同大小、保存姿态的扁平化石', whatItShows: '身体具有规则发育、前后轴和稳定单元排列。', limitation: '印痕不等同于完整解剖，内部器官和组织层数没有直接保存。', strength: '强' },
      { evidenceType: '有机分子', material: '部分俄罗斯标本中的胆固醇类分子', whatItShows: '支持狄更逊水母与动物有关，而非大型真菌。', limitation: '污染、成岩改变与系统位置仍需结合形态和地质背景判断。', strength: '强' },
      { evidenceType: '痕迹组合', material: '与身体轮廓相似、连续出现的海底痕迹', whatItShows: '可能具有主动移动和停驻取食行为。', limitation: '运动结构未保存，痕迹形成机制仍有不同解释。', strength: '中等' }
    ],
    discoveryHistory: [
      { year: '1946', place: '南澳大利亚', event: 'Reg Sprigg 在埃迪卡拉丘陵记录相关大型软体化石群。' },
      { year: '20世纪后半叶', place: '澳大利亚与俄罗斯', event: '大量标本促成关于生长、运动和分类的长期讨论。' },
      { year: '2018', place: '俄罗斯标本研究', event: '古老甾醇分子为动物亲缘提供新的化学证据。' }
    ],
    debates: [{ question: '狄更逊水母在动物演化树上的位置是什么？', currentView: '多数证据支持它属于动物或非常接近动物。', alternatives: '曾被解释为真菌、地衣、原生生物或已灭绝的独立大型生物支系。', confidence: '动物亲缘较高，具体分支中等到低。' }],
    misconceptions: [
      { myth: '名字有“水母”，所以它就是现代水母的祖先。', correction: '中文旧称不能代替分类证据，它与刺胞动物的直接关系没有确定。' },
      { myth: '身体条纹就是像蚯蚓一样的分节。', correction: '这些重复单元左右错列，是否与真正体节同源仍有争论。' }
    ],
    funFacts: ['部分个体长度差异超过百倍，却仍保持相似轮廓。', '它没有明确保存出口、肠或硬组织。', '化石里的脂质分子能补充肉眼看不到的分类证据。'],
    glossary: [
      { term: '埃迪卡拉生物群', definition: '寒武纪之前出现的一批大型软体生物及其痕迹组合。' },
      { term: '甾醇', definition: '细胞膜相关有机分子，某些类型可提供生物来源线索。' },
      { term: '成岩作用', definition: '沉积物埋藏后变成岩石时经历的物理与化学变化。' }
    ],
    knowledgeCheck: [
      { question: '哪类证据支持狄更逊水母的动物亲缘？', options: ['保存的牙齿', '胆固醇类分子', '羽毛印痕', '木质部'], correctIndex: 1, explanation: '标本中的胆固醇类分子与动物亲缘相符。' },
      { question: '为什么不能称它为确定的现代水母祖先？', options: ['年代太新', '中文名不是分类证据', '没有化石', '只生活在陆地'], correctIndex: 1, explanation: '旧称只描述外观联想，系统关系仍需形态和分子证据。' },
      { question: '身体印痕最难直接回答什么？', options: ['整体轮廓', '个体大小', '内部器官结构', '发现地点'], correctIndex: 2, explanation: '软体印痕通常不能完整保存内部组织。' }
    ],
    sourceIds: ['dickinsonia-science-2018', 'dickinsonia-plos-2017', 'dickinsonia-rspb-2017']
  }
]

module.exports = entries.concat(require('./catalog').groups.precambrian)
