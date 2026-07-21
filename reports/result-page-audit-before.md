# 结果页升级前审计

审计基线：`main` / `92017fb`（本地与 `origin/main` 一致）
审计日期：2026-07-21

## 结论

当前结果页已经能展示真实答题选项、古生物证据与完整图鉴入口，但身份识别仍弱于“后台分析报告”的阅读感。最主要的根因有三项：60 个结果的用户可见文案由 12 套原型和多组句式在运行时拼装；`matchReasons` 把生态策略与证据边界混在同一个位置；首屏把生物名和娱乐百分比分放大，却没有稳定、可分享的类型代码。

## 首屏与信息层级

首屏从上到下包含：古生物主图、英文栏目名、“你的远古身份”、古生物中文名、学名、生成式结果标题、生成式一句话、娱乐匹配百分比圆环。首屏高度为 `940rpx`，百分比圆环位于身份标题正下方，容易被理解成经过科学测量的精确值。

当前页面主阅读顺序为：首屏 → 三个 trait chip → “一句话看懂”大卡 → 三张匹配步骤内卡 → 真实选择 → 三个核心能力 → 风险提示 → 现代类比 → 生存方式 → 生态工作 → 科学证据 → 四组倾向 → 可展开 14 维 → 相近结果 → 操作按钮。核心身份与科学解释被较多层级分散。

## 可见文案生成路径

- `data/quiz-profiles.js` 只有 12 个 `archetypes`，它们提供 `title`、`userPattern`、`sharedPoint`、优势和风险。
- 10 个 `summaryOpeners`、6 个 `scienceBridges`、10 个 `summaryClosers` 按结果序号排列组合出 `resultSummary`。
- `modernRoles`、通用 `hiddenStrength`、通用 `survivalLesson` 和 `ecosystemJob` 继续从原型或一条 `scienceBasis` 拼接。
- `resultTitle` 是“生物名 + 原型标题”，`punchline` 是“原型用户模式 + 生物名”的固定结构。
- `matchReasons` 是位置数组，第二项直接使用 `scienceBasis`。巨齿鲨的 `scienceBasis` 是“主要由牙齿与椎体认识，体长模型仍持续更新”，因此“它怎么活”错误显示了“我们怎样认识它”。
- `pages/quiz-result/index.js` 已能从 `topContributingQuestions` 取回真实题号、选择原文和选项解释，但这条证据另起一大段，没有参与 `userEvidence` 的方向链。

## 文案规模与重复来源

- 正式结果：60。
- 可见原型：12 套。
- 结果页相关可见正文长度：最短 489 字，最长 567 字，平均 541 字；这还不包含知识档案、证据卡和 14 维数据。
- `resultTitle` 虽然因生物名不同而唯一，但语义后半段来自 12 个原型。
- `oneLineIdentity` 尚不存在；当前 `punchline` 仍为统一句型。

## 生态、证据与知识策展

- 生态字段目前来自 `creatures.survivalStrategy`、`quiz-profiles.scienceBasis` 和知识档案中的 `lifeFunctions` / `ecosystemRole`。
- 证据字段来自 `creature-knowledge.fossilEvidence`、`sources` 与 `discovery`，但结果页又把 `primary.discovery` 放在“生态工作”的证据边界中，职责交叉。
- 110 条知识档案中，10 条是独立显式条目，100 条由 `data/creature-knowledge/catalog.js` 在运行时生成。
- 60 个正式测试结果里，10 条是独立显式知识条目，50 条依赖目录模板。P0 人工策展基线为 `10/60（16.7%）`。

## 视觉结构

- 结果页样式中出现 65 个不同的十六进制或 `rgb/rgba` 色值，但视觉主体仍集中在深青、灰绿与少量金色，颜色数量多、家族识别度却低。
- 主要嵌套路径为 `.why-card > .match-steps > view`，另有 section 内的 evidence card、dimension card 和 similar card。用户会连续看到多个同色圆角容器。
- 当前主要内文包含 `18rpx`、`19rpx` 字号，低于本阶段真机阅读下限 `20rpx`。
- 相近结果卡同时显示中文名、学名和长比较句，卡片最小高度 `430rpx`，窄屏存在拥挤风险。

## 升级目标

1. 用 16 种 PaleoCode 和四个家族色建立可一眼识别的身份系统。
2. 60 个结果改为显式、人工策展记录；真实答题记录只在运行时生成 `userEvidence`。
3. 把 `creatureStrategy`、`sharedMechanism` 与 `evidenceBoundary` 分开，巨齿鲨作为语义回归样例。
4. 首屏改为浅色/高饱和身份海报，娱乐数字降级为说明性小字。
5. 完整科学文章只保留入口，结果页只预览一条生态事实、一条证据和一项不确定性。
6. P0 知识条目不再运行时依赖通用目录段落，并明确 `contentOrigin` 与 `reviewStatus`。
