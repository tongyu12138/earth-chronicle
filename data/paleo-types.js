const paleoTypes = [
  {
    code: 'EBCR', nameCn: '先锋召集者', family: 'connector',
    tagline: '先去试，再把伙伴带上',
    description: '你习惯主动接近变化，用快速试探换取信息，也愿意让伙伴一起推进。',
    axisLabels: ['主动探索', '快速出手', '协同推进', '向外争取'],
    strengths: ['敢迈出第一步', '会把信息带回团队', '变化中仍能推进'],
    blindSpot: '启动太快时，可能来不及确认每个人是否跟得上。',
    color: '#F17868', softColor: '#FFE3DC', foreground: '#4E1E18', icon: '⟡'
  },
  {
    code: 'EBCG', nameCn: '机动守护者', family: 'guardian',
    tagline: '先接近问题，再护住退路',
    description: '你愿意主动处理突发状况，行动很快，但不会忘记安全边界。',
    axisLabels: ['主动探索', '快速出手', '协同推进', '守住边界'],
    strengths: ['临场反应快', '愿意替团队探路', '懂得及时收手'],
    blindSpot: '一边冲一边保护所有人，容易让自己最先耗尽。',
    color: '#39B7A5', softColor: '#DDF8F1', foreground: '#073B35', icon: '◉'
  },
  {
    code: 'EBSR', nameCn: '闪行探路者', family: 'explorer',
    tagline: '看到新路，身体已经出发',
    description: '你好奇、独立、启动快，常用一次小规模行动判断陌生环境。',
    axisLabels: ['主动探索', '快速出手', '独立判断', '向外争取'],
    strengths: ['不怕陌生线索', '能独立完成试探', '行动中修正方向'],
    blindSpot: '新线索太多时，容易不断换目标。',
    color: '#7C61F2', softColor: '#EEE9FF', foreground: '#281754', icon: '✦'
  },
  {
    code: 'EBSG', nameCn: '边界游侠', family: 'guardian',
    tagline: '敢往前，也随时能撤回',
    description: '你喜欢亲自确认风险，动作果断，同时保留一条清楚的退路。',
    axisLabels: ['主动探索', '快速出手', '独立判断', '守住边界'],
    strengths: ['能快速试错', '不依赖他人催促', '风险来时转向快'],
    blindSpot: '习惯自己扛住突发状况，可能太晚求助。',
    color: '#35AFA1', softColor: '#D9F5EF', foreground: '#083934', icon: '◌'
  },
  {
    code: 'EPCR', nameCn: '远行织网者', family: 'connector',
    tagline: '把新路走成大家都能用的路',
    description: '你愿意长期探索，也擅长把零散的人和资源连接成稳定网络。',
    axisLabels: ['主动探索', '持续投入', '协同推进', '向外争取'],
    strengths: ['能维持长期协作', '愿意拓展资源', '会积累可复用经验'],
    blindSpot: '连接越铺越大时，维护成本可能被低估。',
    color: '#EE7B6B', softColor: '#FFE6DF', foreground: '#51201A', icon: '◇'
  },
  {
    code: 'EPCG', nameCn: '韧性照料者', family: 'connector',
    tagline: '边适应，边照顾同行者',
    description: '你愿意尝试新办法，但更看重让伙伴和重要资源安全抵达。',
    axisLabels: ['主动探索', '持续投入', '协同推进', '守住边界'],
    strengths: ['能适应长期变化', '会照顾团队节奏', '懂得保存关键资源'],
    blindSpot: '总替大家兜底，可能忘了调整自己的负荷。',
    color: '#F08070', softColor: '#FFE7E1', foreground: '#52221C', icon: '◎'
  },
  {
    code: 'EPSR', nameCn: '长线拓荒者', family: 'explorer',
    tagline: '一个人也能把陌生路走远',
    description: '你愿意独立投入很久，用连续观察和小步调整开拓未知。',
    axisLabels: ['主动探索', '持续投入', '独立判断', '向外争取'],
    strengths: ['能长期钻研', '陌生环境里有耐性', '不怕独立做决定'],
    blindSpot: '走得太远时，可能失去来自他人的校准。',
    color: '#8065F4', softColor: '#EFEAFF', foreground: '#291858', icon: '✧'
  },
  {
    code: 'EPSG', nameCn: '静默开垦者', family: 'builder',
    tagline: '慢慢试，把立足点做牢',
    description: '你会探索新空间，但更愿意一小步一小步建立可靠的生活边界。',
    axisLabels: ['主动探索', '持续投入', '独立判断', '守住边界'],
    strengths: ['能在压力下坚持', '会逐步加固方案', '不轻易丢掉积累'],
    blindSpot: '为了守住已有成果，可能错过更轻松的新方案。',
    color: '#DFA33B', softColor: '#FFF0D2', foreground: '#4B2E00', icon: '◆'
  },
  {
    code: 'OBCR', nameCn: '战术领航者', family: 'connector',
    tagline: '先看清局面，再带队突破',
    description: '你会先观察关键关系，一旦窗口出现，就组织伙伴快速行动。',
    axisLabels: ['冷静观察', '快速出手', '协同推进', '向外争取'],
    strengths: ['擅长判断时机', '能协调多人行动', '关键时刻很果断'],
    blindSpot: '等待共同节奏时，可能把少数人的异议当成阻力。',
    color: '#EC7968', softColor: '#FFE3DC', foreground: '#501F19', icon: '✥'
  },
  {
    code: 'OBCG', nameCn: '快速哨兵', family: 'guardian',
    tagline: '先读危险，再把缺口补上',
    description: '你对异常信号很敏感，发现风险后会迅速组织防护和应对。',
    axisLabels: ['冷静观察', '快速出手', '协同推进', '守住边界'],
    strengths: ['能及早发现风险', '突发时保持清醒', '会保护团队重点'],
    blindSpot: '警报开得太久，团队和自己都会疲惫。',
    color: '#34AE9F', softColor: '#DCF7F1', foreground: '#073A34', icon: '⊙'
  },
  {
    code: 'OBSR', nameCn: '精准突击者', family: 'explorer',
    tagline: '看准一个窗口，集中出手',
    description: '你不急着到处尝试，常在观察后独立抓住最值得投入的机会。',
    axisLabels: ['冷静观察', '快速出手', '独立判断', '向外争取'],
    strengths: ['专注度高', '懂得节省动作', '机会出现时很果断'],
    blindSpot: '过度等待清晰信号，可能错过需要边做边学的任务。',
    color: '#775BEF', softColor: '#ECE7FF', foreground: '#261650', icon: '⋆'
  },
  {
    code: 'OBSG', nameCn: '伏线守候者', family: 'guardian',
    tagline: '不浪费力气，只在必要时动',
    description: '你先观察、独立判断并守住资源，行动往往短而有针对性。',
    axisLabels: ['冷静观察', '快速出手', '独立判断', '守住边界'],
    strengths: ['能耐住无效冲动', '擅长保护体力', '行动目标清楚'],
    blindSpot: '把每次行动都等成“最佳时机”，可能一直停在原地。',
    color: '#32A99B', softColor: '#D9F4EE', foreground: '#073832', icon: '◍'
  },
  {
    code: 'OPCR', nameCn: '长程建造者', family: 'builder',
    tagline: '把大范围任务稳稳做完',
    description: '你会看清全局，用协作和长期投入处理规模大、周期长的任务。',
    axisLabels: ['冷静观察', '持续投入', '协同推进', '向外争取'],
    strengths: ['能承接复杂工程', '会分配长期资源', '擅长维持共同方向'],
    blindSpot: '计划越大，越容易低估转向和维护的成本。',
    color: '#E0A23A', softColor: '#FFF0D1', foreground: '#4B2E00', icon: '⬥'
  },
  {
    code: 'OPCG', nameCn: '群落守基者', family: 'guardian',
    tagline: '把大家赖以生存的底座守住',
    description: '你偏好稳定协作，愿意长期维护边界、秩序和关键资源。',
    axisLabels: ['冷静观察', '持续投入', '协同推进', '守住边界'],
    strengths: ['可靠耐心', '重视共同安全', '能维护长期秩序'],
    blindSpot: '为了让系统稳定，可能对必要的变化反应偏慢。',
    color: '#37B2A2', softColor: '#DCF7F1', foreground: '#073A34', icon: '◉'
  },
  {
    code: 'OPSR', nameCn: '耐心专研者', family: 'builder',
    tagline: '选准一件事，慢慢做深',
    description: '你喜欢先看懂问题，再独立投入时间，把复杂任务一点点做透。',
    axisLabels: ['冷静观察', '持续投入', '独立判断', '向外争取'],
    strengths: ['能深入复杂问题', '不容易被噪声带走', '长期节奏稳定'],
    blindSpot: '独立研究太久，可能把反馈当成打断。',
    color: '#DFA13A', softColor: '#FFF0D0', foreground: '#4A2D00', icon: '⬩'
  },
  {
    code: 'OPSG', nameCn: '深层守望者', family: 'guardian',
    tagline: '先稳住自己，再熬过变化',
    description: '你观察细、耐力长、独立性高，倾向用低消耗方式守住底线。',
    axisLabels: ['冷静观察', '持续投入', '独立判断', '守住边界'],
    strengths: ['抗干扰能力强', '会保存体力', '压力下仍能守界'],
    blindSpot: '保护层建得太厚，帮助和新机会也可能进不来。',
    color: '#31A99A', softColor: '#D9F4EE', foreground: '#073832', icon: '●'
  }
]

const paleoTypeMap = paleoTypes.reduce((map, type) => {
  map[type.code] = type
  return map
}, {})

function getPaleoType(code) {
  return paleoTypeMap[code] || null
}

module.exports = { paleoTypes, paleoTypeMap, getPaleoType }
