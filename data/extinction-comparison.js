const extinctionComparisons = [
  {
    id: 'ordovician-extinction', number: '01', title: '奥陶纪末', time: '约4.438亿年前', mediaId: 'event-ordovician-extinction',
    affectedEcosystems: '以浅海为主；笔石、腕足动物、三叶虫与礁群落受到强烈冲击。',
    keyEvidence: '两组化石更替、冰川沉积、海退沉积相、氧同位素与海洋氧化还原指标。',
    mainstreamMechanism: '冰盖增长造成降温和海退，随后复温、环流与缺氧变化形成多阶段压力。',
    alternativeMechanisms: '火山活动与金属输入可能参与，但不同海盆和脉冲的权重仍在讨论。',
    recoveryTime: '不是统一时钟；许多海洋类群在志留纪数百万年内扩展，复杂礁生态恢复更慢。',
    survivors: '部分腕足动物、三叶虫、珊瑚和鱼类支系幸存并在志留纪重新扩展。',
    confidence: '中高', confidenceLabel: '冰期与海退证据强；具体杀伤链仍是多因素模型', claimStatus: 'debated'
  },
  {
    id: 'late-devonian-extinction', number: '02', title: '晚泥盆世', time: '约3.72亿—3.59亿年前', mediaId: 'event-late-devonian-extinction',
    affectedEcosystems: '热带礁生态和海洋底栖群落受创，盾皮鱼等脊椎动物也发生显著更替。',
    keyEvidence: '多个灭绝层位、黑色页岩、有机碳与硫同位素、铀钼等缺氧指标。',
    mainstreamMechanism: '长期多脉冲危机；海洋缺氧和硫化是重要杀伤过程，气候、营养盐与海平面共同参与。',
    alternativeMechanisms: '植物扩张和风化、火山活动、轨道周期等可能是不同脉冲的触发或放大因素。',
    recoveryTime: '礁生态长期低迷，完整重建跨越泥盆纪末到石炭纪早期，不能用单一数字概括。',
    survivors: '鲨形类、辐鳍鱼、四足动物支系与多种无脊椎动物在后续生态中扩展。',
    confidence: '中等', confidenceLabel: '缺氧与多阶段危机证据强；最终触发链仍开放', claimStatus: 'debated'
  },
  {
    id: 'permian-extinction', number: '03', title: '二叠纪末', time: '约2.519亿年前', mediaId: 'event-permian-extinction',
    affectedEcosystems: '海洋和陆地同时遭受重创，礁体、底栖动物、森林和大型四足动物网络广泛崩解。',
    keyEvidence: '西伯利亚大火成岩省定年、碳同位素骤变、海温升高、酸化与缺氧指标、全球化石锐减。',
    mainstreamMechanism: '巨量火山气体驱动快速增温，继而造成海洋缺氧、酸化、富营养化和陆地干热压力。',
    alternativeMechanisms: '岩浆加热煤层或蒸发岩、臭氧损耗和金属毒性可能放大危机；贡献比例仍研究中。',
    recoveryTime: '微生物和机会型类群可较早扩张，复杂礁体与稳定食物网的恢复通常需要数百万年以上。',
    survivors: '水龙兽等少数陆生四足动物、双壳类、菊石祖先和多种小型机会类群扩展。',
    confidence: '高', confidenceLabel: '火山—碳循环—增温链条获强支持；细节持续修订', claimStatus: 'supported'
  },
  {
    id: 'triassic-extinction', number: '04', title: '三叠纪末', time: '约2.014亿年前', mediaId: 'event-triassic-extinction',
    affectedEcosystems: '海洋造礁和游泳类群、陆地大型主龙与植物群落发生显著更替。',
    keyEvidence: '中央大西洋岩浆省高精度定年、玄武岩和侵入岩、碳同位素异常、叶片气孔与海洋化学指标。',
    mainstreamMechanism: 'CAMP 岩浆活动扰动碳循环，引发增温、酸化、缺氧及反复气候冲击。',
    alternativeMechanisms: '海平面和生态本底会调节损失；撞击证据不足，不能与火山机制并列为同等解释。',
    recoveryTime: '不同类群恢复不同步；侏罗纪早期数百万年内新陆海群落逐步建立。',
    survivors: '恐龙、翼龙、鳄形类、早期哺乳形类及部分海生爬行动物在空缺生态位中扩展。',
    confidence: '高', confidenceLabel: 'CAMP 与灭绝的时间和碳循环联系强', claimStatus: 'supported'
  },
  {
    id: 'kpg-extinction', number: '05', title: '白垩纪末', time: '约6600万年前', mediaId: 'event-kpg-extinction',
    affectedEcosystems: '非鸟恐龙、菊石和多类海洋浮游生物消失，依赖持续初级生产的食物网首先崩解。',
    keyEvidence: '全球铱异常、冲击石英、玻璃微球、希克苏鲁伯陨石坑及与边界一致的高精度定年。',
    mainstreamMechanism: '大型小行星撞击抛出尘埃与硫酸盐气溶胶，造成黑暗、急冷和光合作用骤降。',
    alternativeMechanisms: '德干火山活动在撞击前后影响气候和生态压力，但不能替代撞击这一关键触发。',
    recoveryTime: '初级生产和局部多样性较早反弹，成熟森林、复杂食物网与大型体型恢复需要更长时间。',
    survivors: '鸟类、哺乳动物、鳄类、龟类、两栖类及淡水生态中的多支系幸存并扩展。',
    confidence: '很高', confidenceLabel: '撞击为关键原因是强共识；区域恢复差异仍研究中', claimStatus: 'consensus'
  }
]

module.exports = { extinctionComparisons }
