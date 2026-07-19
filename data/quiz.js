function option(text, scores, insight) {
  return { text, scores, insight }
}

const quizMeta = {
  title: '测测你的远古身份',
  subtitle: '15 个好玩的远古选择，看看哪种生物的生存办法和你最像。',
  intro: '这不是知识考试，也没有标准答案。每道题都先用日常语言讲清场景；想了解专业依据时，可以再展开查看。完成后，结果页会直接告诉你“你选了什么、这个物种怎么活、两者为什么相像”。',
  journey: '埃迪卡拉纪 → 寒武纪 → 泥盆纪 → 二叠纪 → 侏罗纪 → 白垩纪 → 新生代',
  duration: '约 4—6 分钟',
  disclaimer: '测试用于科普娱乐。古生物行为多由化石与比较研究间接推断，性格类比是现代叙事，不是对已灭绝动物心理的科学测量。'
}

const dimensionLabels = {
  curiosity: '愿意去看看', boldness: '敢先行动', sociability: '愿意找同伴', patience: '愿意等一等',
  adaptability: '会临时换办法', strategy: '会提前想路线', speed: '反应很快', defense: '先保护自己',
  independence: '喜欢自己判断', sizePreference: '愿意处理大任务', aquaticAffinity: '喜欢流动环境',
  terrestrialAffinity: '偏爱脚下稳当', aerialAffinity: '喜欢先看全局', coldAffinity: '能承受寒冷'
}

const questions = [
  {
    id: 'ediacaran-current', chapter: '第一章：环境判断', periodId: 'proterozoic', sceneMediaId: 'creature-dickinsonia',
    scene: '约5.58亿年前，海底像铺着一层柔软的微生物“地毯”。水流突然改变，平静的表面出现一道陌生阴影。',
    scienceContext: '埃迪卡拉海底常由微生物席覆盖。狄更逊水母的停驻痕迹可能记录移动和表面取食，但没有眼或神经组织直接保存。',
    question: '陌生阴影靠近时，你第一步会做什么？',
    options: [
      option('沿阴影边缘移动，尽快确认它从哪里来', { curiosity: 3, boldness: 3, speed: 1, strategy: -1 }, '你更愿意主动接近变化，用第一手信息消除未知。'),
      option('靠近同伴，看看大家从哪些方向发现了变化', { curiosity: 2, sociability: 3, strategy: 2, boldness: 1 }, '你更相信把几个人看到的线索放在一起，会比独自猜测可靠。'),
      option('先停下来，比较水流、光线和海底泥沙', { patience: 3, strategy: 3, defense: 2, curiosity: 1 }, '你习惯先把周围看清楚，再决定要不要行动。'),
      option('退回熟悉的海底区域，先保留体力', { patience: 2, independence: 2, defense: 3, adaptability: 1, boldness: -1 }, '你会先回到安全处，不让一次意外消耗太多体力。')
    ],
    afterAnswerFact: '化石里出现一串相似的身体轮廓，说明狄更逊水母可能动过；但它怎样发力，没有留下直接证据。',
    sourceIds: ['dickinsonia-plos-2017', 'dickinsonia-rspb-2017']
  },
  {
    id: 'cambrian-light', chapter: '第一章：环境判断', periodId: 'cambrian', sceneMediaId: 'creature-anomalocaris',
    scene: '寒武纪浅海里，悬浮细泥让光线忽明忽暗。远处一对大型复眼转向你所在的水层，周围小动物开始改变方向。',
    scienceContext: '奇虾拥有发达复眼、带刺前附肢和侧面游泳叶片，是主动游泳的消费者；具体食谱仍不能由口器形状单独确定。',
    question: '大家突然逃开，你会怎样判断危险？',
    options: [
      option('抢先改变方向，离开对方最容易追踪的路线', { boldness: 2, independence: 3, strategy: 2, sociability: -1 }, '你会先改变方向、摆脱追踪，再想下一步。'),
      option('观察附近个体往哪里逃，再跟随多数方向', { sociability: 3, adaptability: 2, patience: 2 }, '你会看大家往哪里逃，用群体反应帮自己判断危险。'),
      option('躲进浑水里，分两次撤到安全位置', { strategy: 3, patience: 2, defense: 1 }, '你会把一次危险的大动作，拆成几步更安全的小动作。'),
      option('贴着海底，走最窄但最熟悉的通道', { independence: 3, curiosity: 1, patience: 2, sociability: -1 }, '你更相信自己对附近小路的记忆。')
    ],
    afterAnswerFact: '奇虾的大眼睛说明它看得不错；但化石不会记录它每一次怎样寻找和抓住食物。',
    sourceIds: ['anomalocaris-rom', 'anomalocaris-rspb-2021']
  },
  {
    id: 'devonian-shallows', chapter: '第一章：环境判断', periodId: 'devonian', sceneMediaId: 'creature-dunkleosteus',
    scene: '晚泥盆世的浅海正在退潮，水温越来越高，食物和藏身处都被挤到小水坑里；更深处可能有大型邓氏鱼。',
    scienceContext: '邓氏鱼头甲与颌骨保存很好，完整后躯却稀少。它是大型捕食者，但体长与机动性仍依模型复原。',
    question: '浅水越来越热，你会把体力用在哪里？',
    options: [
      option('立即向水体连通处移动，边走边修正路线', { speed: 3, sociability: 2, adaptability: 2, boldness: 1 }, '你愿意用移动换取新信息，不在恶化地点久留。'),
      option('停在阴影最深处，少动一点，等水位变化', { patience: 3, defense: 3, strategy: 2, speed: -1 }, '你会先省下体力，等环境更适合时再行动。'),
      option('先确认两条通道，把较短路线作为备用', { strategy: 3, independence: 2, defense: 2, curiosity: 1 }, '你总会多留一条备用路，免得唯一通道走不通。'),
      option('和附近同伴一起警戒，再结伴通过开阔水域', { sociability: 3, adaptability: 3, strategy: 1 }, '你觉得大家互相提醒，能让危险的路更好走。')
    ],
    afterAnswerFact: '邓氏鱼巨大的头部盔甲是真化石；常见的完整鲨鱼形身体，很多是根据零散材料推算的。',
    sourceIds: ['dunkleosteus-diversity-2023', 'dunkleosteus-peerj-2023']
  },
  {
    id: 'permian-heat', chapter: '第一章：环境判断', periodId: 'permian', sceneMediaId: 'creature-lystrosaurus',
    scene: '二叠纪末大灭绝刚结束，河边平原炎热又干旱。低矮植物零散分布，旧河道可能藏着水，也可能只是会困住你的泥坑。',
    scienceContext: '水龙兽跨越灭绝边界并在部分早三叠纪地层常见。快速生长、广食性、耐逆与可能掘穴都是候选解释，尚无单一原因胜出。',
    question: '食物和水都不稳定，你会先去哪儿？',
    options: [
      option('每处都先尝一点，再留在最可靠的地方', { curiosity: 3, adaptability: 2, patience: 1 }, '你喜欢先做小尝试，不会一开始就把全部希望压在一个地方。'),
      option('去最近的植物旁，一直吃到体力恢复', { strategy: 2, independence: 2, patience: 2 }, '你更喜欢稳定而看得见的收获。'),
      option('先看同类都在哪里，避开最拥挤的地方', { sociability: 3, strategy: 2, defense: 1 }, '你会观察周围有多少竞争者，再决定去哪里。'),
      option('抢先到短暂水源，随后再按新情况调整', { speed: 3, boldness: 2, adaptability: 1, patience: -1 }, '你善于抓住时间窗口，接受之后重新规划。')
    ],
    afterAnswerFact: '“水龙兽”不只一种；不同种能不能从大灭绝前一直活到大灭绝后，情况并不完全相同。',
    sourceIds: ['lystrosaurus-peerj-2020', 'lystrosaurus-lethaia-2007']
  },
  {
    id: 'jurassic-islands', chapter: '第一章：环境判断', periodId: 'jurassic', sceneMediaId: 'creature-archaeopteryx',
    scene: '晚侏罗世的群岛上，浅湖、灌木和裸露岩地交错。一次风暴切断原路线，你必须在地面、水边和高处之间选择。',
    scienceContext: '始祖鸟同时保留飞羽、长骨尾、牙齿和带爪前肢。翼骨支持主动空气动力能力，但具体起飞和扑翼方式仍有争论。',
    question: '原路被风暴切断，你会先找哪里？',
    options: [
      option('沿水边移动，让水流和岸线提供连续参照', { aquaticAffinity: 3, adaptability: 2, curiosity: 1 }, '你喜欢借助持续变化但可追踪的边界前进。'),
      option('留在地面植被带，逐段确认遮蔽和食物', { terrestrialAffinity: 3, patience: 2, defense: 1 }, '稳定地面和可重复检查的路线让你更安心。'),
      option('先到高处建立全景，再决定落点', { aerialAffinity: 3, independence: 2, curiosity: 2 }, '你偏好先看整体关系，再进入局部执行。'),
      option('寻找背风冷凉处，等风力下降后再行动', { coldAffinity: 3, independence: 2, strategy: 2 }, '你能接受暂缓行动，以更清晰的条件换取成功率。')
    ],
    afterAnswerFact: '细腻的石灰泥保存了始祖鸟的羽毛轮廓，却不能告诉我们它每次能飞多远。',
    sourceIds: ['archaeopteryx-nhm', 'archaeopteryx-flight-2018']
  },
  {
    id: 'cambrian-feeding-window', chapter: '第二章：生存策略', periodId: 'cambrian', sceneMediaId: 'creature-anomalocaris',
    scene: '寒武纪海底上方出现短暂食物窗口：小型动物从泥面涌出，但浑水也会遮住接近中的大型游泳者。',
    scienceContext: '奇虾前附肢适合抓持，环形口器的受力研究不支持它轻易咬碎一切硬壳。生态优势来自感觉、游泳与抓取的组合。',
    question: '食物只出现一小会儿，你会怎么抓住机会？',
    options: [
      option('马上行动，看第一次结果再决定下一步', { speed: 3, boldness: 2, adaptability: 2 }, '你喜欢先动起来，再根据结果马上改进。'),
      option('先多看几轮，确认安全后再认真出手', { curiosity: 2, patience: 3, strategy: 3 }, '你宁愿先花时间观察，也不想把体力浪费在错误目标上。'),
      option('保持固定节奏，每次只拿可靠的一小部分', { patience: 3, defense: 2, strategy: 2 }, '你觉得每次都有一点收获，比偶尔一次大成功更可靠。'),
      option('与同伴分散尝试，再交换哪条路径更有效', { sociability: 3, adaptability: 3, curiosity: 2, independence: -1 }, '你用并行试探降低全体走错的风险。')
    ],
    afterAnswerFact: '口器的形状和受力方式能排除一些太硬的食物，却不能给出奇虾吃过的完整菜单。',
    sourceIds: ['anomalocaris-smithsonian', 'anomalocaris-rspb-2021']
  },
  {
    id: 'cretaceous-boundary', chapter: '第二章：生存策略', periodId: 'cretaceous', sceneMediaId: 'creature-tyrannosaurus',
    scene: '白垩纪的河边平原上，一处取食地留下新鲜足迹和骨头咬痕。远处传来霸王龙一类大型动物的气味，留下可能有食物，也可能发生冲突。',
    scienceContext: '霸王龙咬痕与含骨粪化石证明它能处理大型猎物。愈合伤口支持攻击活体，但捕猎与食腐并不互斥。',
    question: '食物旁边可能有霸王龙，你会怎么办？',
    options: [
      option('做出明确动作守住位置，让对方别再靠近', { boldness: 3, defense: 2, speed: 2 }, '你习惯尽快说清边界，不让冲突拖很久。'),
      option('先看对方是不是真的要攻击，再决定回应', { patience: 3, sociability: 2, strategy: 2 }, '你想先确认对方是否真有敌意，不会把每个动作都当成进攻。'),
      option('记录足迹、风向和退路，按证据做完整判断', { strategy: 3, independence: 2, defense: 2, speed: -1 }, '你相信可检查的线索比第一反应更可靠。'),
      option('放弃这里的食物，去找竞争更少的新地点', { adaptability: 3, independence: 2, defense: 1 }, '你不会为了证明自己，留在一场代价太大的冲突里。')
    ],
    afterAnswerFact: '一处咬痕能证明它咬过，却常常不能单独判断这是捕猎，还是在吃已经死亡的动物。',
    sourceIds: ['tyrannosaurus-smithsonian', 'tyrannosaurus-age-2004']
  },
  {
    id: 'eocene-current', chapter: '第二章：生存策略', periodId: 'eocene', sceneMediaId: 'creature-basilosaurus',
    scene: '始新世温暖浅海里，潮流改变了鱼群位置。熟悉的近岸路径收益下降，更深处可能有大型古鲸活动。',
    scienceContext: '龙王鲸已经完全水生，微小后肢不能承重。牙列和较小古鲸骨上的咬痕支持大型捕食者生态。',
    question: '熟悉的老办法不管用了，你会怎么做？',
    options: [
      option('马上查看更大范围，把变化当成寻找新路的机会', { curiosity: 3, adaptability: 3, speed: 2 }, '老路失效时，你会把它当成寻找新路的机会。'),
      option('先理解潮流变化，再重建原有节奏', { strategy: 3, patience: 2, adaptability: 2 }, '你倾向先找到新规律，再稳定推进。'),
      option('观察其他个体的移动，借群体经验少走弯路', { sociability: 3, adaptability: 2, defense: 1 }, '你愿意利用分散在群体中的环境信息。'),
      option('尽量保留旧路线，只修改确实走不通的一段', { defense: 3, patience: 2, adaptability: -1, independence: 1 }, '你不会因为一次变化，就把原来还能用的办法全部丢掉。')
    ],
    afterAnswerFact: '龙王鲸还保留小后肢，却已经无法上岸；身体结构留下来，不代表原来的功能还在。',
    sourceIds: ['basilosaurus-hindlimbs-1990', 'basilosaurus-smithsonian-ocean']
  },
  {
    id: 'afarensis-route', chapter: '第二章：生存策略', periodId: 'pliocene', sceneMediaId: 'creature-australopithecus',
    scene: '上新世的东非，一边是树林，一边是开阔草地。走地面更快，爬树却更容易找到食物和躲避危险；你无法一次看清全部路线。',
    scienceContext: '阿法南方古猿骨盆、膝和足支持习惯性双足行走，长臂与弯曲指骨又保留重要攀爬能力。',
    question: '地上更快、树上更安全，你会怎么走？',
    options: [
      option('先爬到高处看清地形，再决定整条路线', { aerialAffinity: 2, strategy: 3, curiosity: 2 }, '你喜欢先看清全貌，再一步步走。'),
      option('从最近的安全点开始，一段段核对', { patience: 3, defense: 1, curiosity: 2 }, '你依靠连续的小确认累积出完整判断。'),
      option('跟着最吸引你的食物走，随时切换地面和树上', { curiosity: 3, adaptability: 3, boldness: 1 }, '你会跟着兴趣走，也愿意随时换路。'),
      option('与同伴约定汇合点，各自探索不同支线', { independence: 2, sociability: 2, strategy: 2 }, '你能同时保留自主判断和协作保障。')
    ],
    afterAnswerFact: '直立行走和爬树特征可以同时出现在一个物种身上，演化并不是一次只能改变一项能力。',
    sourceIds: ['afarensis-smithsonian', 'afarensis-foot-2011']
  },
  {
    id: 'pleistocene-night', chapter: '第二章：生存策略', periodId: 'pleistocene', sceneMediaId: 'creature-woolly-mammoth',
    scene: '更新世寒原入夜后风向突变，雪尘遮住远处地标。幼体靠在群体中央，黑暗里传来无法确认的脚步。',
    scienceContext: '真猛犸象的群体结构主要由现生象比较、足迹和个体移动记录推断。成年体型、象牙与群体保护能降低幼体风险。',
    question: '黑暗里传来脚步声，你第一步做什么？',
    options: [
      option('走到迎风侧确认气味和声音来源', { boldness: 3, speed: 2, curiosity: 2, defense: 1 }, '你想尽快确认未知，不让模糊风险持续放大。'),
      option('保持安静，听脚步从哪里来、离得有多远', { patience: 3, strategy: 3, defense: 2 }, '你会先把声音听明白，再决定要不要行动。'),
      option('收紧群体，把幼体放到最安全的位置', { sociability: 3, defense: 3, strategy: 1 }, '你优先稳定最脆弱的成员，让群体防线先成形。'),
      option('加固背风阵位，同时保留撤离通道', { defense: 3, adaptability: 2, independence: 2, boldness: -1 }, '你先提高安全系数，并把撤退保持为有效选项。')
    ],
    afterAnswerFact: '象牙里的化学成分能记录一只猛犸象多年的移动，却不能像视频一样回放整个群体的生活。',
    sourceIds: ['mammoth-nps-isotopes', 'mammoth-science-advances-2024']
  },
  {
    id: 'permian-migration', chapter: '第三章：群体与迁徙', periodId: 'permian', sceneMediaId: 'creature-lystrosaurus',
    scene: '灭绝后的河网频繁改道，一块熟悉的取食地逐渐干枯。远处新河道有水，却要穿过缺少遮蔽的开阔地。',
    scienceContext: '水龙兽广布于南部泛大陆多个地区，但化石分布是跨越许多世代的记录，不代表单个个体完成洲际迁徙。',
    question: '熟悉的地方快干了，你会怎样出发？',
    options: [
      option('去地图上没有记录的支流，寻找新食物和水', { curiosity: 3, boldness: 2, terrestrialAffinity: 2 }, '你愿意往地图外多走一步，看看能不能发现新东西。'),
      option('先沿河走到下一个汇合点，再决定方向', { adaptability: 3, curiosity: 2, independence: 2 }, '你会先走到下一个路标，不要求一开始就看到终点。'),
      option('跟着更熟悉地形的同伴，边走边交换信息', { sociability: 3, curiosity: 2, strategy: 1 }, '你相信和熟路的人边走边聊，能少走弯路。'),
      option('在旧地点恢复体力，等温度合适再出发', { patience: 3, defense: 2, strategy: 2 }, '你觉得先休息、再检查路线，也是搬家的一部分。')
    ],
    afterAnswerFact: '相隔很远的地方都有水龙兽化石，说明许多代水龙兽逐渐扩散，并不是一只动物完成了整段旅程。',
    sourceIds: ['lystrosaurus-peerj-2020', 'lystrosaurus-lethaia-2007']
  },
  {
    id: 'jurassic-roost', chapter: '第三章：群体与迁徙', periodId: 'jurassic', sceneMediaId: 'creature-archaeopteryx',
    scene: '岛上灌木里的休息点不多，周围还有陌生个体，风暴又可能在天亮前到来。你需要决定和谁靠近、和谁保持距离。',
    scienceContext: '始祖鸟的羽毛、骨骼和环境已有丰富证据，但是否群居、怎样交流或是否共同夜栖几乎没有直接记录。',
    question: '进入陌生休息地，你会怎样和大家相处？',
    options: [
      option('很快交换信息，把多个个体组织成警戒网络', { sociability: 3, boldness: 2, speed: 1 }, '你会主动建立连接，让信息在群体中流动。'),
      option('只和两三个可靠个体保持紧密合作', { sociability: 2, patience: 3, strategy: 1 }, '你更喜欢少数几个可以长期信任的伙伴。'),
      option('先看看大家怎样相处，真正需要时再加入', { patience: 3, independence: 2, defense: 1 }, '你会先弄清这个群体的相处方式，不急着马上融进去。'),
      option('选择独立位置，保留随时离开的空间', { independence: 3, terrestrialAffinity: 1, sociability: -2 }, '独处能让你恢复清醒，也让你保留离开的自由。')
    ],
    afterAnswerFact: '多个同类化石出现在同一层岩石里，不一定表示它们生前是长期生活在一起的伙伴。',
    sourceIds: ['archaeopteryx-nhm', 'archaeopteryx-feathers-2014']
  },
  {
    id: 'cretaceous-risk', chapter: '第三章：群体与迁徙', periodId: 'cretaceous', sceneMediaId: 'creature-tyrannosaurus',
    scene: '白垩纪林地边缘出现一条通往大型猎物群的路线。回报很高，但地面有另一只大型暴龙科留下的新鲜足印。',
    scienceContext: '暴龙科可能有聚集或相互容忍行为，但现有骨床和足迹不能证明它们像现代狼群一样稳定合作狩猎。',
    question: '回报很大、风险也大，什么情况会让你出手？',
    options: [
      option('虽然危险，但能看到从未见过东西的路线', { boldness: 3, curiosity: 3, adaptability: 1 }, '如果能学到真正的新东西，你愿意多冒一点险。'),
      option('能和可信同伴一起承担风险的路线', { sociability: 3, strategy: 2, defense: 1 }, '身边有没有可靠伙伴，会明显改变你的决定。'),
      option('收获稳定、规则清楚、可以长期重复的路线', { patience: 3, defense: 3, strategy: 2 }, '你更喜欢可以稳定重复的收获，不追求一次性大成功。'),
      option('先走一小段试试，安全的话再继续深入', { strategy: 3, adaptability: 3, independence: 2 }, '你会先做可以回头的小尝试，不会一步走进无法退出的危险。')
    ],
    afterAnswerFact: '同类动物埋在一起，可能因为它们生前会聚集，也可能只是洪水、干旱或食物把它们带到同一处。',
    sourceIds: ['tyrannosaurus-growth-2004', 'tyrannosaurus-smithsonian']
  },
  {
    id: 'mammoth-season', chapter: '第三章：群体与迁徙', periodId: 'pleistocene', sceneMediaId: 'creature-woolly-mammoth',
    scene: '寒季将至，旧路线的水源可靠但距离很远；一条新路线更短，却穿过地形陌生的风口。群体需要把幼体和体力差异都算进去。',
    scienceContext: '猛犸象牙同位素显示个体能在巨大范围内移动，路线会随年龄、性别和资源变化；并非所有个体都采用同一种迁徙模式。',
    question: '大家为搬家路线争论时，你想负责什么？',
    options: [
      option('请几个人分头探路，再把看到的情况放在一起', { sociability: 3, speed: 2, sizePreference: 2 }, '你喜欢让大家分工合作，很快拼出一张完整地图。'),
      option('自己算清长距离路线，再拿出完整方案', { independence: 3, patience: 3, sizePreference: 3, strategy: 2 }, '你喜欢独自把一个又大又复杂的问题从头做到尾。'),
      option('先试走一段新路，随时准备换回旧路线', { curiosity: 3, adaptability: 3, terrestrialAffinity: 1 }, '你更在意能不能继续探索，不要求一开始就决定最终路线。'),
      option('维持旧路线补给点，确保最弱成员能跟上', { defense: 3, patience: 2, terrestrialAffinity: 2 }, '你擅长把稳定后方变成群体持续前进的条件。')
    ],
    afterAnswerFact: '一根象牙能记录一只猛犸象一生中的移动，却不能自动代表所有猛犸象。',
    sourceIds: ['mammoth-nps-isotopes', 'mammoth-science-advances-2024']
  },
  {
    id: 'afarensis-horizon', chapter: '第三章：群体与迁徙', periodId: 'pliocene', sceneMediaId: 'creature-australopithecus',
    scene: '上新世，火山灰刚被雨水打湿。前方有水边树林、开阔地、高处山脊和凉爽洞口，每条路都只能看到一部分。',
    scienceContext: '莱托利足迹记录了早期人族双足行走，造迹者很可能与阿法南方古猿有关，但足迹不能确定其姓名、社会制度或全部目的。',
    question: '旅程最后有四条路，你会先选哪条？',
    options: [
      option('沿着水边走，追踪不断变化的食物和水源', { aquaticAffinity: 3, curiosity: 2, adaptability: 1 }, '不断变化的水边总能吸引你继续往前看。'),
      option('穿过开阔地，直接走向最大、最清楚的目标', { sizePreference: 3, boldness: 2, terrestrialAffinity: 2 }, '目标越清楚、越重要，你越容易集中注意力。'),
      option('登上山脊，从高处看清所有路线', { aerialAffinity: 3, curiosity: 2, independence: 2 }, '你想先站高一点看清所有路线，再决定往哪走。'),
      option('进入凉爽洞缘，安静检查留下的痕迹', { coldAffinity: 3, patience: 3, defense: 1 }, '你愿意在低干扰环境里接近证据本身。')
    ],
    afterAnswerFact: '脚印能证明有谁怎样走过，却不能单靠形状还原他们是谁、怎样组成群体。',
    sourceIds: ['afarensis-smithsonian', 'afarensis-walking-model-2007']
  }
]

const plainScienceByQuestionId = {
  'ediacaran-current': '这里的海底像铺着一层微生物“地毯”。狄更逊水母可能在这层表面慢慢移动和进食。',
  'cambrian-light': '奇虾有很大的复眼、会游泳，还有一对带刺的抓取附肢，是当时海里很主动的捕食者之一。',
  'devonian-shallows': '邓氏鱼的头部盔甲和颌骨是真化石，但身体后半段保存很少，完整外形有不少复原成分。',
  'permian-heat': '水龙兽在大灭绝后很常见，可能因为长得快、吃得杂、比较能扛恶劣环境；科学家还不能确定唯一原因。',
  'jurassic-islands': '始祖鸟既有羽毛，也有牙齿和长尾。它能利用翅膀活动，但具体怎样起飞仍在争论。',
  'cambrian-feeding-window': '奇虾能抓、能游，也看得清，但它的圆形口器未必能咬碎所有硬壳。',
  'cretaceous-boundary': '霸王龙既会捕猎，也可能吃现成尸体；这两种取食方式并不冲突。',
  'eocene-current': '龙王鲸一生都在水里。它虽然还保留一对小后肢，却已经不能用来走路。',
  'afarensis-route': '阿法南方古猿能直立行走，也很会爬树；这两种能力可以同时存在。',
  'pleistocene-night': '猛犸象可能像现代大象一样保护幼体，但完整的群体生活只能通过足迹、象牙等线索推测。',
  'permian-migration': '很多地方都有水龙兽化石，说明这个类群经过许多代扩散，并不是一只动物横跨大陆。',
  'jurassic-roost': '始祖鸟有没有固定的群体生活，化石还没有告诉我们；这里的夜栖场景是一种有依据的想象。',
  'cretaceous-risk': '几只暴龙科动物埋在一起，不一定代表它们像狼群合作；洪水或干旱也可能把它们聚到一起。',
  'mammoth-season': '猛犸象牙像一支慢慢生长的记录笔，能留下移动线索；但一只猛犸象不能代表整个物种。',
  'afarensis-horizon': '莱托利足迹说明早期人族会用两条腿行走，但脚印不能告诉我们他们的姓名、制度或完整目的。'
}

questions.forEach((question) => {
  question.plainScience = plainScienceByQuestionId[question.id]
})

module.exports = { quizMeta, questions, dimensionLabels }
