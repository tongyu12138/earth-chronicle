function option(text, scores, insight) {
  return { text, scores, insight }
}

const quizMeta = {
  title: '测测你的远古身份',
  subtitle: '15 个现代生活场景，在 60 个经人工校准的正式结果中匹配远古生命策略。',
  intro: '这不是心理诊断，也不是把某个选项直接绑定一只热门恐龙。系统会汇总 14 个维度，归一化后与全部古生物画像计算加权距离。',
  duration: '约 3—5 分钟',
  disclaimer: '测试用于科普娱乐。古生物行为多由化石与比较研究间接推断，性格类比是现代叙事，不是对已灭绝动物心理的科学测量。'
}

const dimensionLabels = {
  curiosity: '好奇探索', boldness: '果断勇气', sociability: '群体协作', patience: '耐心等待',
  adaptability: '环境适应', strategy: '策略规划', speed: '行动速度', defense: '防御意识',
  independence: '独立判断', sizePreference: '规模偏好', aquaticAffinity: '流动环境亲和',
  terrestrialAffinity: '稳定地面亲和', aerialAffinity: '高处视野亲和', coldAffinity: '寒冷耐受'
}

const questions = [
  {
    id: 'unknown-door', scene: '办公室里出现了一扇昨天还不存在的门。', question: '你第一步会怎么做？',
    options: [
      option('立刻打开，先看看再说', { curiosity: 3, boldness: 3, speed: 1, strategy: -1 }, '未知会让你兴奋'),
      option('叫上几个人，分工检查后一起进去', { curiosity: 2, sociability: 3, strategy: 2, boldness: 1 }, '你愿意把探索变成团队项目'),
      option('保持距离，观察门缝、声音和周围变化', { patience: 3, strategy: 3, defense: 2, curiosity: 1 }, '证据充分后再行动'),
      option('先完成今天的任务，记录下来交给专业人员', { patience: 2, independence: 2, defense: 3, adaptability: 1, boldness: -1 }, '稳定秩序比追逐刺激重要')
    ]
  },
  {
    id: 'team-project', scene: '一个重要项目只剩三天，团队意见完全不一致。', question: '你最自然的角色是？',
    options: [
      option('先定方向，承担最终决策', { boldness: 2, independence: 3, strategy: 2, sociability: -1 }, '你愿意承担决策压力'),
      option('把各方拉到一起，找共同目标', { sociability: 3, adaptability: 2, patience: 2 }, '你擅长修复协作网络'),
      option('把任务拆解成清单和时间表', { strategy: 3, patience: 2, defense: 1 }, '结构能降低混乱'),
      option('认领最难的一块，独自交出可靠结果', { independence: 3, curiosity: 1, patience: 2, sociability: -1 }, '你偏好用个人产出来稳定全局')
    ]
  },
  {
    id: 'power-outage', scene: '你在陌生城市遇到大范围停电，手机只剩 8% 电。', question: '你会优先做什么？',
    options: [
      option('快速前往人多、信息集中的地点', { speed: 3, sociability: 2, adaptability: 2, boldness: 1 }, '你靠移动和信息密度应变'),
      option('留在安全处，节省电量并等待通知', { patience: 3, defense: 3, strategy: 2, speed: -1 }, '你先保护关键资源'),
      option('画出离线路线，准备两套备用方案', { strategy: 3, independence: 2, defense: 2, curiosity: 1 }, '你习惯为失败路径留出口'),
      option('和周围人交换物资与消息', { sociability: 3, adaptability: 3, strategy: 1 }, '关系网络就是你的基础设施')
    ]
  },
  {
    id: 'shared-food', scene: '一桌人共享数量有限、口味各异的食物。', question: '你的取餐方式更接近？',
    options: [
      option('先少量尝遍，再决定重点', { curiosity: 3, adaptability: 2, patience: 1 }, '你先采样环境'),
      option('锁定最适合自己的，稳定吃完', { strategy: 2, independence: 2, patience: 2 }, '你更重视可靠收益'),
      option('先问大家需求，再协调分配', { sociability: 3, strategy: 2, defense: 1 }, '群体平衡会影响你的选择'),
      option('机会出现就快速拿下，之后再调整', { speed: 3, boldness: 2, adaptability: 1, patience: -1 }, '你偏好先占据窗口期')
    ]
  },
  {
    id: 'ideal-workspace', scene: '你可以免费使用一间工作室一年。', question: '哪种空间最能让你进入状态？',
    options: [
      option('临水的大窗房，光影一直变化', { aquaticAffinity: 3, adaptability: 2, curiosity: 1 }, '流动景观让思路保持活跃'),
      option('有院子的低层房，出门就是土地和植物', { terrestrialAffinity: 3, patience: 2, defense: 1 }, '稳定边界让你安心积累'),
      option('高层顶楼，视野越远越好', { aerialAffinity: 3, independence: 2, curiosity: 2 }, '你喜欢先看全局'),
      option('安静冷凉的山中小屋，设备齐全', { coldAffinity: 3, independence: 2, strategy: 2 }, '低干扰和清晰节奏最适合你')
    ]
  },
  {
    id: 'deadline', scene: '你收到一个两周后到期、没有固定做法的任务。', question: '通常怎样推进？',
    options: [
      option('当天做出能运行的第一版', { speed: 3, boldness: 2, adaptability: 2 }, '你用行动获得反馈'),
      option('先研究几天，确定方法再集中完成', { curiosity: 2, patience: 3, strategy: 3 }, '准备质量决定后续效率'),
      option('每天推进固定一点，保持稳定', { patience: 3, defense: 2, strategy: 2 }, '持续性是你的优势'),
      option('找伙伴并行试不同方案', { sociability: 3, adaptability: 3, curiosity: 2, independence: -1 }, '你用多路径探索降低风险')
    ]
  },
  {
    id: 'conflict', scene: '有人在公开场合误解了你的工作，还语气强硬。', question: '你更可能怎么处理？',
    options: [
      option('当场用事实直接纠正', { boldness: 3, defense: 2, speed: 2 }, '你倾向迅速守住边界'),
      option('先听完，私下讨论分歧', { patience: 3, sociability: 2, strategy: 2 }, '你把关系和事实分开处理'),
      option('整理证据，发布一份完整说明', { strategy: 3, independence: 2, defense: 2, speed: -1 }, '你相信可检查的记录'),
      option('如果影响不大就绕开，继续推进目标', { adaptability: 3, independence: 2, defense: 1 }, '你不让每次冲突改变路线')
    ]
  },
  {
    id: 'sudden-change', scene: '你熟悉的软件一夜之间彻底改版。', question: '你的真实反应是？',
    options: [
      option('兴奋，马上把新功能都点一遍', { curiosity: 3, adaptability: 3, speed: 2 }, '变化就是探索入口'),
      option('先看更新说明，再迁移自己的流程', { strategy: 3, patience: 2, adaptability: 2 }, '你先理解规则再重建秩序'),
      option('找教程和社群经验，少走弯路', { sociability: 3, adaptability: 2, defense: 1 }, '你借助群体知识适应'),
      option('尽量恢复旧布局，只改必要部分', { defense: 3, patience: 2, adaptability: -1, independence: 1 }, '稳定性优先于新鲜感')
    ]
  },
  {
    id: 'museum-map', scene: '你进入一座没有推荐路线的巨大博物馆。', question: '你会怎样参观？',
    options: [
      option('先上高处看全馆布局', { aerialAffinity: 2, strategy: 3, curiosity: 2 }, '先建立全局地图'),
      option('从第一个展柜开始逐件看说明', { patience: 3, defense: 1, curiosity: 2 }, '细节积累出完整认识'),
      option('跟着最吸引人的展品随机走', { curiosity: 3, adaptability: 3, boldness: 1 }, '兴趣决定路线'),
      option('约定集合点，然后各自探索', { independence: 2, sociability: 2, strategy: 2 }, '自主与协作可以并存')
    ]
  },
  {
    id: 'unexpected-noise', scene: '夜里露营时，帐篷外突然传来不明响动。', question: '你会？',
    options: [
      option('拿好照明立刻查看', { boldness: 3, speed: 2, curiosity: 2, defense: 1 }, '你要尽快消除未知'),
      option('保持安静，判断方向和距离', { patience: 3, strategy: 3, defense: 2 }, '你先从信号里提取信息'),
      option('叫醒同伴，按预案一起处理', { sociability: 3, defense: 3, strategy: 1 }, '群体响应更可靠'),
      option('加固帐篷，准备撤离路线', { defense: 3, adaptability: 2, independence: 2, boldness: -1 }, '先提高自身安全系数')
    ]
  },
  {
    id: 'free-afternoon', scene: '旅行中突然多出一个完全空白的下午。', question: '你会把它用在哪里？',
    options: [
      option('去地图上没有介绍的小路', { curiosity: 3, boldness: 2, terrestrialAffinity: 2 }, '未标注区域最有吸引力'),
      option('坐公共交通到终点再慢慢走回', { adaptability: 3, curiosity: 2, independence: 2 }, '你喜欢给偶然性留空间'),
      option('找当地人推荐只有本地人才去的地方', { sociability: 3, curiosity: 2, strategy: 1 }, '人际连接是探索工具'),
      option('回住处整理照片和路线，恢复体力', { patience: 3, defense: 2, strategy: 2 }, '复盘和恢复也是旅程的一部分')
    ]
  },
  {
    id: 'social-energy', scene: '参加一场几乎没有熟人的聚会。', question: '两个小时后你更可能处于什么状态？',
    options: [
      option('已经认识很多人，还组了新群', { sociability: 3, boldness: 2, speed: 1 }, '你会主动建立网络'),
      option('和两三个人聊得很深', { sociability: 2, patience: 3, strategy: 1 }, '连接质量重于数量'),
      option('大部分时间观察，等合适话题', { patience: 3, independence: 2, defense: 1 }, '你先读取群体环境'),
      option('提前离场，一个人散步更舒服', { independence: 3, terrestrialAffinity: 1, sociability: -2 }, '独处帮助你恢复能量')
    ]
  },
  {
    id: 'risk-choice', scene: '你有四种机会，收益和不确定性不同。', question: '最容易让你心动的是？',
    options: [
      option('高风险高回报，但能学到全新技能', { boldness: 3, curiosity: 3, adaptability: 1 }, '成长价值能提高你的风险容忍'),
      option('中等回报，可以和可靠团队一起做', { sociability: 3, strategy: 2, defense: 1 }, '伙伴质量影响你的选择'),
      option('回报稳定，规则清晰，可以长期积累', { patience: 3, defense: 3, strategy: 2 }, '可持续比峰值更重要'),
      option('先小额试验，用结果决定是否加码', { strategy: 3, adaptability: 3, independence: 2 }, '你把风险拆成可逆步骤')
    ]
  },
  {
    id: 'weekend', scene: '终于有一个没有安排的周末。', question: '哪种画面最像你想要的？',
    options: [
      option('多人运动、聚餐，日程排满', { sociability: 3, speed: 2, sizePreference: 2 }, '高密度活动让你充电'),
      option('一个人做大型模型或长期项目', { independence: 3, patience: 3, sizePreference: 3, strategy: 2 }, '你享受把复杂事做完整'),
      option('去冷门展览或户外路线，随时改计划', { curiosity: 3, adaptability: 3, terrestrialAffinity: 1 }, '探索和机动性最重要'),
      option('把房间收拾好，做饭、阅读、早睡', { defense: 3, patience: 2, terrestrialAffinity: 2 }, '稳定巢穴能恢复状态')
    ]
  },
  {
    id: 'after-hours-museum', scene: '闭馆后的自然博物馆允许你独自多留一小时。', question: '你最先走向哪里？',
    options: [
      option('灯光摇曳的海洋生命厅', { aquaticAffinity: 3, curiosity: 2, adaptability: 1 }, '流动和深处吸引你'),
      option('有巨型骨架的中央大厅', { sizePreference: 3, boldness: 2, terrestrialAffinity: 2 }, '尺度本身就有冲击力'),
      option('可以俯瞰全馆的高空步道', { aerialAffinity: 3, curiosity: 2, independence: 2 }, '你想从上方重建整体关系'),
      option('温度很低、保存标本的地下库房', { coldAffinity: 3, patience: 3, defense: 1 }, '你愿意在安静环境里接近证据本身')
    ]
  }
]

module.exports = { quizMeta, questions, dimensionLabels }
