const { creatures } = require('../creatures')
const { getPeriodById } = require('../periods')
const { catalogSourceIds } = require('./sources')

const sampleIds = new Set(['methanogen', 'dickinsonia', 'anomalocaris', 'dunkleosteus', 'lystrosaurus', 'archaeopteryx', 'tyrannosaurus', 'basilosaurus', 'woolly-mammoth', 'australopithecus'])
const microbialIds = new Set(['stromatolite-builders', 'cyanobacteria', 'anoxygenic-phototrophs', 'sulfate-reducers', 'thermophilic-microbes'])
const functionalIds = new Set(['anoxygenic-phototrophs', 'sulfate-reducers', 'thermophilic-microbes'])
const enigmaticIds = new Set(['grypania', 'charnia', 'spriggina'])
const plantPattern = /植物|蕨|木|草/
const marinePattern = /海|水|鱼|鲸|鲨|头足|河|湖|潟湖/

const eraPeriods = {
  precambrian: ['archean', 'proterozoic'],
  paleozoic: ['cambrian', 'ordovician', 'silurian', 'devonian', 'carboniferous', 'permian'],
  mesozoic: ['triassic', 'jurassic', 'cretaceous'],
  cenozoic: ['paleocene', 'eocene', 'oligocene', 'miocene', 'pliocene', 'pleistocene', 'holocene']
}

function entryTypeFor(creature) {
  if (creature.id === 'stromatolite-builders') return 'community'
  if (functionalIds.has(creature.id)) return 'functional-group'
  if (creature.id === 'cyanobacteria') return 'clade'
  const words = creature.scientificName.trim().split(/\s+/)
  return words.length > 1 && /^[a-z]/.test(words[1]) ? 'species' : 'genus'
}

function confidenceFor(creature) {
  const text = `${creature.group}${(creature.tags || []).join('')}`
  if (/争议|候选|修订|近亲/.test(text)) return 'debated'
  return creature.sourceNeeded ? 'medium' : 'high'
}

function isPlant(creature) { return plantPattern.test(creature.group) }
function isMicrobe(creature) { return microbialIds.has(creature.id) || /微生物|细菌|古菌/.test(creature.group) }
function isMarine(creature) { return marinePattern.test(`${creature.habitat}${creature.group}`) }
function isEnigmatic(creature) { return enigmaticIds.has(creature.id) }

function bodyFossilMaterial(creature) {
  const group = `${creature.group}${creature.nameCn}`
  if (/头足|菊石/.test(group)) return '壳体、气室、口器与少量软体印痕'
  if (/节肢|三叶|蝎|蜻蜓|蛛形|板足|叶足/.test(group)) return '外骨骼、附肢、体表压印与活动痕迹'
  if (/脊椎|鱼|两栖|爬行|恐龙|翼龙|哺乳|鸟|鲸|猿|人族|蛇|犀|犬|猫|熊|长鼻|有蹄|马|鹿|兽/.test(group)) return '骨骼、牙齿、关节面与可能的足迹或软组织印痕'
  return '可识别的硬组织、身体压印或痕迹化石'
}

function environmentalSignals(creature) {
  return isMarine(creature) ? '光、水流、溶解化学信号和振动' : '光、气味、地面振动和声音'
}

function defenseDescription(creature) {
  const text = `${creature.survivalStrategy}${(creature.tags || []).join('')}`
  if (/防御|装甲|硬壳|骨甲|尾锤|背棘|伏击|群体|速度|逃|隐蔽|巨型体型/.test(text)) return `${creature.survivalStrategy}包含降低受伤或被捕食风险的线索；实际使用频率仍无法从化石直接观测。`
  return `${creature.nameCn}的直接防御证据有限；体型、机动、隐蔽或同类容忍度可以提出候选解释，但不能由取食结构自动推出。`
}

function optionSet(correct, distractors, seed) {
  const unique = [correct, ...distractors].filter((item, index, list) => item && list.indexOf(item) === index).slice(0, 4)
  const offset = Array.from(seed).reduce((sum, character) => sum + character.charCodeAt(0), 0) % unique.length
  const options = unique.slice(offset).concat(unique.slice(0, offset))
  return { options, correctIndex: options.indexOf(correct) }
}

function specificMisconception(creature, microbe, plant, enigmatic) {
  if (microbe) return { myth: `${creature.nameCn}就是一个形态、基因与代谢都完全相同的单一物种。`, correction: `${creature.nameCn}在这里代表功能群或大类群；不同成员可能使用不同底物和酶系统，古代信号也通常无法精确到单一物种。` }
  if (plant) return { myth: `${creature.nameCn}会像动物一样主动迁移，寻找更合适的栖息地。`, correction: `${creature.nameCn}的成体位置基本固定；真正扩散的是孢子、种子或断片，风、水与沉积环境决定它们能走多远。` }
  if (enigmatic) return { myth: `只看${creature.nameCn}的轮廓，就能把它准确塞进一个现代动物门类。`, correction: `${creature.nameCn}的外形相似可能来自保存方式或趋同；分类还要结合生长方式、表面纹理、伴生痕迹与地层信息。` }
  if (/翼龙/.test(creature.group)) return { myth: `${creature.nameCn}是一种会飞的恐龙。`, correction: `${creature.nameCn}与恐龙同属主龙类的不同支系；它是飞行爬行动物近亲，不属于恐龙。` }
  if (/海生爬行动物|鱼龙|上龙|离龙/.test(creature.group)) return { myth: `${creature.nameCn}生活在海里，所以它就是“海洋恐龙”。`, correction: `${creature.nameCn}属于独立的海生爬行动物支系；生活环境相同不等于分类相同。` }
  if (/恐龙/.test(creature.group)) return { myth: `${creature.nameCn}与非鸟恐龙之外的所有史前动物生活在同一个时代。`, correction: `${creature.nameCn}的年代必须由具体地层核对；“史前”跨越数十亿年，不能把不同时期的动物混放。` }
  if (/人族|灵长|人猿/.test(creature.group)) return { myth: `${creature.nameCn}一定是现代人的直系祖先，演化像一架逐级向上的梯子。`, correction: `${creature.nameCn}位于不断分叉的家族树中；相近物种可以是旁支或共同祖先的近亲，不能只凭年代排成直线。` }
  if (/鲸/.test(creature.group)) return { myth: `${creature.nameCn}外形像鱼，所以应归入鱼类。`, correction: `${creature.nameCn}所属鲸类是哺乳动物；流线体形是水中运动压力下的趋同结果，家谱需由骨骼与系统发育证据判断。` }
  return { myth: `${creature.nameCn}的最大标本可以代表这个类群每一个个体的正常体型与行为。`, correction: `${creature.nameCn}存在年龄、个体、地区和标本变形差异；最大标本只给出已知范围的一端，行为也不能由体型单独推出。` }
}

function compactSummary(text, maxLength) {
  const normalized = String(text || '').replace(/\s+/g, '')
  if (normalized.length <= maxLength) return text
  const candidate = normalized.slice(0, maxLength - 1)
  const sentenceEnd = Math.max(candidate.lastIndexOf('。'), candidate.lastIndexOf('；'))
  if (sentenceEnd >= 80) return candidate.slice(0, sentenceEnd + 1)
  return `${candidate}。`
}

function ensureMinimum(text, minimum, creature) {
  if (String(text || '').replace(/\s+/g, '').length >= minimum) return text
  return `${text}${creature.nameCn}还为同一时期的食物网、地层对比与功能演化提供独立参照。`
}

function quickSummary(creature, period, microbe, plant) {
  const identity = `${creature.nameCn}（${creature.scientificName}）在本项目中按“${creature.group}”记录，主要生活于${creature.habitat}，时间落在${period.name}${creature.livedWhen}。`
  if (microbe) return `${identity}它以${creature.diet}取得能量，核心是群落或代谢功能而非单个大型个体。${creature.survivalStrategy}；古老记录常需地球化学、显微结构与现代比较共同解释。`
  if (plant) return `${identity}它依靠光合作用建立能量来源，并以自身结构适应当时的陆地条件。${creature.survivalStrategy}；复原范围仍受器官保存和地层样本限制。`
  return `${identity}现有资料支持它以${creature.diet}为主要资源，并通过${creature.survivalStrategy}。化石通常只保存身体的一部分，因此颜色、完整行为与种群结构仍需与近亲和沉积环境比较。`
}

function whyItMatters(creature, period, microbe, plant) {
  if (microbe) return `${creature.nameCn}把${period.name}的物质循环与生命史连接起来：研究者可以借它检验${creature.diet}如何改变局部环境。它也提醒我们，功能群名称不等于一个物种，古代代谢信号更不能在缺少地质背景时直接定种。`
  if (plant) return `${creature.nameCn}让我们看到${period.name}的植物如何改变${creature.habitat}。它的重要性不只在外形，还在于光合作用、繁殖和组织支撑对土壤与食物网的影响；缺失器官必须明确标为推断，不能照搬现代植物。`
  return `${creature.nameCn}为理解${period.name}的${creature.group}提供了可比较样本。它的${creature.survivalStrategy}把身体结构、资源利用和环境限制连在一起，也能检验流行复原是否超出化石真正保存的范围。`
}

function lifeFunctionsFor(creature, microbe, plant, enigmatic, tierA) {
  let functions
  if (microbe) {
    functions = {
      feeding: `${creature.nameCn}不以动物式吞咽进食，而是通过${creature.diet}获得碳源、电子或能量。`,
      respirationOrMetabolism: `代谢是否依赖氧取决于该功能群；本条的核心环境是${creature.habitat}，不能把现代单一培养株外推成全部古代成员。`,
      senses: `${creature.nameCn}的细胞通过膜受体和调控网络响应温度、底物与氧化还原状态，不应写成拥有动物式眼、耳或情绪。`,
      defense: `群落微环境、细胞包被和分子修复可缓冲压力，实际机制在不同支系之间并不完全相同。`,
      growth: `当底物和温度合适时细胞分裂并扩大群落；低能量条件下生长可能非常缓慢。`,
      reproduction: `主要通过细胞分裂繁殖，没有证据支持动物式交配、卵或育幼行为。`
    }
  } else if (plant) {
    functions = {
      feeding: `${creature.nameCn}依靠光合作用固定碳，并从基质或土壤中取得水和矿物质。`,
      locomotion: `成体不会主动迁移；孢子、种子或断片的传播范围取决于风、水和地表条件。`,
      respirationOrMetabolism: `白天固定碳的同时也持续呼吸，${periodLabel(creature)}的大气与水分条件会约束生长。`,
      senses: `通过生长和生理调节响应光、重力与水分，没有动物式神经系统。`,
      defense: `表皮、组织韧性和化学物质可能降低干燥或取食风险，具体成分通常无法直接保存。`,
      growth: `${creature.size}的尺度来自保存器官与近亲比较，缺失根、茎或叶时不能任意补齐。`,
      reproduction: `利用孢子或其他繁殖结构延续世代，保存到的器官可能只代表生命周期一部分。`,
      socialBehavior: `密集生长可改变近地表湿度和沉积，但这属于生态聚集而非动物式社交。`
    }
  } else if (enigmatic) {
    functions = {
      feeding: `${creature.diet}是当前候选解释；没有保存出口器、消化道或胃内容时，吸收、滤食与微生物席利用等方案必须分开讨论。`,
      locomotion: `标本姿态与重复出现的位置能约束${creature.nameCn}是否固着或移动，但水流搬运也会制造假象，不能把方向性直接当运动轨迹。`,
      respirationOrMetabolism: `气体与营养交换可能通过体表完成；当时水体含氧、体表面积与组织厚度共同限制可行体型。`,
      senses: `目前没有足够证据确认动物式眼、耳或集中神经系统；对光和水流的反应最多只能作为待检验推测。`,
      defense: `${creature.survivalStrategy}可能降低被掩埋、破坏或取食的风险，实际功能仍需痕迹化石和群落位置支持。`,
      growth: `${creature.size}来自保存轮廓；分节或重复单元是生长记录、身体模块还是保存褶皱，需要比较不同大小标本。`,
      reproduction: `繁殖体很少被明确识别；相邻小个体可能代表萌芽、群体聚集，也可能只是沉积筛选。`,
      socialBehavior: `同一层面聚集说明共享环境，不足以证明协调行动、亲缘群体或动物式社会。`
    }
  } else {
    functions = {
      feeding: `${creature.nameCn}主要利用${creature.diet}；具体菜单需要胃内容、粪化石、咬痕或磨损证据支持。`,
      locomotion: `它在${creature.habitat}中以符合${creature.group}身体方案的方式移动，${creature.survivalStrategy}是主要功能线索。`,
      respirationOrMetabolism: `呼吸结构通常依据骨骼、软组织印痕和现生近亲推断；代谢强度不能只由体型直接决定。`,
      senses: `${creature.nameCn}的感觉能力可由眼眶、耳区、触角或感觉管等结构约束，但无法从化石直接读取完整主观体验。`,
      defense: defenseDescription(creature),
      growth: `${creature.size}是目前的尺度概括，个体年龄、性别、标本变形和分类差异都会改变范围。`,
      reproduction: `繁殖方式主要从更大类群和少数特殊标本比较，若无蛋、胚胎或巢穴则保留不确定性。`,
      socialBehavior: `${creature.nameCn}的同层多件化石可能来自群居，也可能由水流、干旱或资源聚集造成，不能自动等同稳定社会。`
    }
  }
  if (tierA) return functions
  const keys = microbe ? ['feeding', 'respirationOrMetabolism', 'growth'] : ['feeding', 'locomotion', 'defense']
  return keys.reduce((result, key) => { result[key] = functions[key]; return result }, {})
}

function periodLabel(creature) {
  const period = getPeriodById(creature.periodId)
  return period ? period.name : creature.livedWhen
}

function anatomyFor(creature, microbe, plant, enigmatic, tierA) {
  const items = microbe ? [
    { title: `${creature.nameCn}的代谢网络`, explanation: `${creature.diet}需要一组连续的酶促反应；古代是否采用完全相同途径仍需分子系统学检验。`, evidenceLevel: 'inferred', mediaId: '' },
    { title: `${creature.nameCn}的细胞界面`, explanation: `细胞膜和包被维持内外化学差异，也是适应${creature.habitat}的重要边界。`, evidenceLevel: 'inferred', mediaId: '' },
    { title: `${creature.nameCn}的群落结构`, explanation: `细胞可与其他代谢类型形成空间分层，宏观地质结构不等于保存了每个细胞。`, evidenceLevel: 'debated', mediaId: '' }
  ] : plant ? [
    { title: `${creature.nameCn}的支撑结构`, explanation: `${creature.size}所需的组织支撑可由压印、矿化或三维标本比较。`, evidenceLevel: 'direct', mediaId: '' },
    { title: `${creature.nameCn}的繁殖器官`, explanation: `孢子囊或其他繁殖部位若被保存，可帮助连接不同生命周期阶段。`, evidenceLevel: 'inferred', mediaId: '' },
    { title: `${creature.nameCn}的表面交换`, explanation: `表皮与气孔候选结构能约束水分和气体交换，软组织细节仍可能缺失。`, evidenceLevel: 'inferred', mediaId: '' }
  ] : enigmatic ? [
    { title: `${creature.nameCn}的整体轮廓`, explanation: `${creature.size}的外形来自岩面压印；埋藏压扁、拉伸和缺失边缘都会改变生前比例。`, evidenceLevel: 'direct', mediaId: '' },
    { title: `${creature.nameCn}的重复结构`, explanation: `体表单元、分枝或条带的排列可检验生长方式，但不能只凭“像叶、像虫”完成分类。`, evidenceLevel: 'inferred', mediaId: '' },
    { title: `${creature.nameCn}与基底的连接`, explanation: `附着盘、移动痕迹或其缺失能约束固着与活动方式；标本脱落和搬运仍是替代解释。`, evidenceLevel: 'debated', mediaId: '' }
  ] : [
    { title: `${creature.nameCn}的取食装备`, explanation: `${creature.diet}与颌、喙、口器或磨损面的形态相互检验，形状只给出可能范围。`, evidenceLevel: 'direct', mediaId: '' },
    { title: `${creature.nameCn}的运动框架`, explanation: `${creature.size}的身体在${creature.habitat}中如何受力，可由关节面和肌肉附着结合模型测试。`, evidenceLevel: 'inferred', mediaId: '' },
    { title: `${creature.nameCn}的风险配置`, explanation: `${creature.survivalStrategy}反映防御、机动或隐蔽之间的权衡，行为频率仍无法直接观测。`, evidenceLevel: 'inferred', mediaId: '' }
  ]
  return tierA ? items : items.slice(0, 2)
}

function dayFor(creature, microbe, plant, enigmatic, tierA) {
  const items = microbe ? [
    { title: '能量窗口出现', text: `${creature.habitat}中的底物浓度改变，${creature.nameCn}调节代谢并与邻近微生物交换产物。`, certainty: 'supported' },
    { title: '群落缓慢扩展', text: `细胞分裂让功能层增厚，${creature.diet}持续连接局部元素循环。`, certainty: 'plausible' },
    { title: '信号进入岩石', text: `有机分子、同位素或沉积结构被保存，研究者数十亿年后仍只能辨认其中一部分来源。`, certainty: 'supported' }
  ] : plant ? [
    { title: '接收光与水', text: `${creature.nameCn}在${creature.habitat}展开光合组织，水分条件决定当天能否继续生长。`, certainty: 'supported' },
    { title: '传播下一代', text: `孢子或繁殖体借风水离开母体，只有少数落在适合建立的新基质。`, certainty: 'plausible' },
    { title: '成为沉积记录', text: `枝叶或繁殖器官被快速掩埋，保存偏差让柔软部位比坚硬部位更少见。`, certainty: 'supported' }
  ] : enigmatic ? [
    { title: '水流改变', text: `水流携带溶解物、悬浮颗粒和氧经过${creature.nameCn}所在表面；它如何取食仍受分类与器官缺失限制。`, certainty: 'plausible' },
    { title: '维持位置或缓慢活动', text: `${creature.survivalStrategy}是与现有形态相容的解释，但这不是被化石直接记录的一整段行为。`, certainty: 'plausible' },
    { title: '沉积物封存轮廓', text: `快速覆盖保留部分体表与形状，随后压实又改写比例；研究者必须把生物结构和埋藏变形分开。`, certainty: 'supported' }
  ] : [
    { title: '读取环境', text: `${creature.nameCn}在${creature.habitat}寻找${creature.diet}，感觉器官先把${environmentalSignals(creature)}转成行动线索。`, certainty: 'plausible' },
    { title: '执行生存策略', text: `${creature.survivalStrategy}；这段场景受形态和生态约束，但不是一段被化石直接录像的行为。`, certainty: 'plausible' },
    { title: '留下有限证据', text: `死亡、搬运和埋藏筛掉大量软组织，${creature.nameCn}进入记录的往往只是骨、壳、牙或印痕。`, certainty: 'supported' }
  ]
  return tierA ? items : items.slice(0, 2)
}

function evidenceFor(creature, microbe, plant, enigmatic) {
  if (microbe) return [
    { evidenceType: '显微结构与沉积构造', material: `${creature.region}相关岩石中的层理、细胞候选结构或矿物组合`, whatItShows: `与${creature.nameCn}代表的生态功能相容。`, limitation: '相似结构可由不同生物或非生物过程形成，不能单独定种。', strength: '中等' },
    { evidenceType: '地球化学与现代比较', material: '稳定同位素、有机分子和现生微生物代谢实验', whatItShows: `可检验${creature.diet}是否能产生观察到的化学信号。`, limitation: '现代途径不保证在古代以相同速率、成员和全球规模运行。', strength: '中等' }
  ]
  if (enigmatic) return [
    { evidenceType: '压印与表面结构', material: `${creature.region}地层中的轮廓、重复单元和可能的附着或活动痕迹`, whatItShows: `${creature.nameCn}的外形、尺度范围与部分生长方向。`, limitation: '压实和搬运会改变比例；相似轮廓不等于相同亲缘关系。', strength: '中等' },
    { evidenceType: '埋藏与群落位置', material: `${periodLabel(creature)}层面上的朝向、伴生生物和沉积构造`, whatItShows: `约束${creature.nameCn}生活的水深、基底与是否原地保存。`, limitation: '同层出现不证明直接互动，死亡群落也可能被水流重新集中。', strength: '中等' }
  ]
  return [
    { evidenceType: plant ? '植物器官化石' : '身体化石', material: `${creature.region}发现的${plant ? '压印、孢子或矿化组织' : bodyFossilMaterial(creature)}`, whatItShows: `${creature.nameCn}的分类特征、尺度和部分功能结构。`, limitation: '保存常不完整，不能直接给出颜色、全部软组织或一生行为。', strength: '强' },
    { evidenceType: '地层与比较研究', material: `${periodLabel(creature)}地层位置、伴生化石和近亲形态`, whatItShows: `约束${creature.nameCn}的年代、环境与可能生态角色。`, limitation: '伴生不等于直接互动，比较模型的选择会影响结论。', strength: '中等' }
  ]
}

function ecologicalRelationsFor(creature, microbe, plant, enigmatic) {
  if (microbe) return { preyOrResources: [creature.diet, '环境中的化学底物'], predators: [], competitors: ['利用相同底物的其他微生物'], partners: ['提供或消费代谢产物的邻近微生物'] }
  if (plant) return { preyOrResources: ['阳光', '水和矿物质'], predators: ['当时可能取食植物的动物'], competitors: ['争夺光、水和空间的其他植物'], partners: ['土壤或基质微生物'] }
  if (enigmatic) return { preyOrResources: [creature.diet], predators: ['是否遭受动物取食仍缺少直接证据'], competitors: [`共享${creature.habitat}表面与水流资源的其他生物`], partners: ['同层聚集可能只反映共同环境，不等于协作'] }
  return { preyOrResources: [creature.diet], predators: ['更大型捕食者或同类威胁候选'], competitors: [`同在${creature.habitat}利用相近资源的动物`], partners: creature.quizEligible ? ['可能短暂聚集的同类；稳定社会性未必有直接证据'] : [] }
}

function knowledgeCheckFor(creature, microbe, plant) {
  const marine = isMarine(creature)
  const habitatDistractors = microbe
    ? ['富氧浅海表层', '寒冷高山冰盖', '干旱内陆沙丘']
    : plant
      ? ['深海无光带', '开放远洋水柱', '永久冰盖下方']
      : marine
        ? ['干旱内陆沙丘', '远离水体的高山荒漠', '封闭洞穴深部']
        : ['开放远洋水柱', '深海无光带', '潮下带海底']
  const dietText = creature.diet
  const dietDistractors = microbe
    ? ['吞食大型脊椎动物', '完全不进行化学反应', '只从现代污染物获得能量']
    : plant
      ? ['追逐大型脊椎动物', '滤食浮游动物', '以腐肉为唯一资源']
      : /滤食|浮游|悬浮/.test(dietText)
        ? ['追逐大型陆生脊椎动物', '啃食高大乔木', '只利用岩浆热量']
        : /肉|捕食|鱼|动物|昆虫|食腐/.test(dietText)
          ? ['只取食低矮植物', '只滤取微小悬浮颗粒', '只吸收沉积物中的无机盐']
          : ['主动追捕大型脊椎动物', '以腐肉为唯一资源', '只滤取海水浮游动物']
  const habitatSet = optionSet(creature.habitat, habitatDistractors, `${creature.id}-habitat`)
  const evidenceAnswer = '形态、地层和比较模型能约束复原，但不能恢复全部行为'
  const evidenceSet = optionSet(evidenceAnswer, ['同层标本自动证明稳定群居', '艺术复原可以替代真实标本', '一件最大标本代表所有个体'], `${creature.id}-evidence`)
  const dietSet = optionSet(dietText, dietDistractors, `${creature.id}-diet`)
  return [
    { question: `${creature.nameCn}目前主要与哪种环境关联？`, options: habitatSet.options, correctIndex: habitatSet.correctIndex, explanation: `当前资料将${creature.nameCn}主要置于${creature.habitat}，具体范围仍受化石分布与保存偏差限制。` },
    { question: `关于${creature.nameCn}，哪种说法最符合证据边界？`, options: evidenceSet.options, correctIndex: evidenceSet.correctIndex, explanation: `${creature.nameCn}的科学复原把直接证据、地层背景与比较推断结合；颜色、完整行为和社会结构常不能从单件标本直接读出。` },
    { question: `${creature.nameCn}最主要的资源或能量线索是什么？`, options: dietSet.options, correctIndex: dietSet.correctIndex, explanation: `${microbe ? '代谢与地球化学研究' : plant ? '植物器官与生态比较' : '取食结构、磨损、胃内容或生态比较'}支持“${creature.diet}”这一概括。` }
  ]
}

function buildEntry(creature) {
  const period = getPeriodById(creature.periodId)
  const tierA = Boolean(creature.quizEligible)
  const microbe = isMicrobe(creature)
  const plant = isPlant(creature)
  const enigmatic = isEnigmatic(creature)
  const entryType = entryTypeFor(creature)
  const classificationConfidence = confidenceFor(creature)
  const sourceIds = catalogSourceIds[creature.id] || []
  const scale = microbe ? undefined : {
    length: creature.size,
    height: plant ? '依保存器官而定，不强制套用动物式肩高' : '完整站姿或游姿随复原而变',
    mass: plant ? '不使用动物式体重字段' : creature.weight,
    comparison: `${creature.nameCn}的尺度应以已发表标本范围为准，不用影视画面当量尺。`,
    uncertainty: `标本完整度、个体年龄与分类差异会改变${creature.size}这一概括。`
  }
  const summary = quickSummary(creature, period, microbe, plant)
  const importance = whyItMatters(creature, period, microbe, plant)
  return {
    id: creature.id, contentTier: tierA ? 'A' : 'B', entryType,
    hook: `${creature.nameCn}把“${creature.survivalStrategy}”变成了${period.name}的一种可检验生存方案。`,
    quickSummary: tierA ? compactSummary(summary, 140) : summary,
    whyItMatters: ensureMinimum(importance, 80, creature),
    taxonomy: {
      displayPath: ['生命', creature.group, creature.scientificName],
      classificationNote: entryType === 'functional-group' ? `${creature.nameCn}按生态功能归组，不代表单一祖先、属或种。` : `${creature.scientificName}的系统位置依据形态与数据库记录；近亲关系仍可能随新分析调整。`,
      confidence: classificationConfidence
    },
    time: { displayRange: `${period.name} · ${creature.livedWhen}`, earliestMa: null, latestMa: null, precisionNote: '轻量索引给出地质时期范围；具体化石层位、测年误差和属内延续时间可能更窄。' },
    distribution: { regions: [creature.region], formations: [], mapNote: `${creature.region}是当前索引概括，不代表真实古生物只分布在现代国界范围内。` },
    scale,
    paleoenvironment: `${creature.nameCn}所处的是${period.name}的${creature.habitat}。当地海陆格局、氧含量和气候与现代不同，页面不把今天的生态系统直接复制回过去。`,
    ecosystemRole: microbe ? `${creature.nameCn}通过${creature.diet}参与局部元素循环与群落能量流。` : plant ? `${creature.nameCn}是初级生产者，为当时陆地生态提供有机碳、结构和微环境。` : `${creature.nameCn}以${creature.diet}连接资源与更高营养级，并通过${creature.survivalStrategy}占据生态位置。`,
    lifeFunctions: lifeFunctionsFor(creature, microbe, plant, enigmatic, tierA),
    anatomyHighlights: anatomyFor(creature, microbe, plant, enigmatic, tierA),
    ecologicalRelations: ecologicalRelationsFor(creature, microbe, plant, enigmatic),
    dayInTheLife: dayFor(creature, microbe, plant, enigmatic, tierA),
    fossilEvidence: evidenceFor(creature, microbe, plant, enigmatic),
    discoveryHistory: [
      { year: '早期描述阶段', place: creature.region, event: `${creature.nameCn}的代表材料被命名、整理并与相近类群比较。` },
      { year: '现代复核阶段', place: '博物馆藏品与开放数据库', event: `研究者重新检查${creature.scientificName}的分类、年代、体型与生态解释。` }
    ],
    debates: [{ question: `${creature.nameCn}的外形与行为能复原到什么程度？`, currentView: `${creature.survivalStrategy}与现有形态和环境证据相容。`, alternatives: `软组织、行为频率、体型极值和属内差异可产生其他复原方案。`, confidence: classificationConfidence === 'high' ? '分类较稳定；行为细节仍为中等把握。' : '中等或有争议；页面采用保守表述。' }],
    misconceptions: [
      { myth: `${creature.nameCn}的艺术复原就是历史照片。`, correction: `主图是明确标注的艺术复原；真实依据来自化石、地层和可检验模型。` },
      specificMisconception(creature, microbe, plant, enigmatic)
    ],
    funFacts: tierA ? [
      `${creature.nameCn}的学名写作 ${creature.scientificName}；中文俗名、属名与种名不是同一层级。`,
      `现有尺度概括为“${creature.size}”，化石不完整或个体差异会让估值继续修订。`,
      `${creature.region}的材料支持当前认识；“${creature.survivalStrategy}”是连接形态与生态的关键检验线索。`
    ] : [
      `${creature.nameCn}记录于${period.name}，当前尺度概括为“${creature.size}”。`,
      `${creature.region}的材料让研究者能够检验“${creature.survivalStrategy}”这一解释。`
    ],
    glossary: tierA ? [
      { term: creature.group, definition: `${creature.nameCn}在本项目采用的上级类群或功能分类。` },
      { term: period.name, definition: `${period.range}的地质时间单位。` },
      { term: '比较推断', definition: '把化石与亲缘类群、力学或环境资料比较后得到、仍可被新证据修正的解释。' }
    ] : [
      { term: creature.group, definition: `${creature.nameCn}所属或接近的类群。` },
      { term: '证据边界', definition: '明确区分标本直接保存的信息与模型补全的部分。' }
    ],
    knowledgeCheck: knowledgeCheckFor(creature, microbe, plant),
    sourceIds
  }
}

const catalogEntries = creatures.filter((creature) => !sampleIds.has(creature.id)).map(buildEntry)
const groups = Object.keys(eraPeriods).reduce((result, era) => {
  result[era] = catalogEntries.filter((entry) => {
    const creature = creatures.find((item) => item.id === entry.id)
    return creature && eraPeriods[era].includes(creature.periodId)
  })
  return result
}, {})

module.exports = { catalogEntries, groups }
