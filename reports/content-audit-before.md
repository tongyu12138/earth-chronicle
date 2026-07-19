# 第四阶段内容升级前审计

> 基线提交：`822aa5c31c871587dcf58125e54e547c7cd5228e`
>
> 审计分支：`feat/knowledge-and-quiz-depth`
> 审计日期：2026-07-20

## 基线验证

| 检查 | 结果 |
| --- | --- |
| 数据规模 | 29 个时期、70 个事件、110 个古生物条目、297 个内容媒体 |
| 摘要一致性 | `generate-summaries.js --check` 通过 |
| 身份测试分布 | 15 题、60 个正式结果；100,000 次模拟中 60 个结果全部出现 |
| 路由 | 9 个页面注册；29 + 70 + 110 个详情 ID 冒烟检查通过 |
| 媒体发布门禁 | 298 个 ready 媒体；P0/P1/P2 均为 100% |
| 主包静态估算 | 1.20 MiB（媒体目录未进入主包） |

## 古生物内容现状

- 110 个条目均由 `data/creatures.js` 中的单一 `c(...)` 工厂生成。
- A 类（正式测试结果）：60 个；B 类（其余图鉴条目）：50 个。
- `sourceNeeded: true`：97/110（88.2%）。
- 使用统一默认 discovery 文案：97/110（88.2%）。
- 已有真实来源的条目：13/110；共 26 个来源 URL，26 个均不重复。
- 没有独立知识层；详情页加载的仍是列表索引对象。
- 当前详情页可读取字段：`id`、`nameCn`、`scientificName`、`nickname`、`periodId`、`periodIds`、`livedWhen`、`group`、`habitat`、`diet`、`size`、`weight`、`region`、`discovery`、`survivalStrategy`、`funIntro`、`modernAnalogy`、`mediaId`、`gallery`、图片授权字段、`sourceUrls`、`sourceNeeded`、`tags`，以及测试内部字段 `archetype`、`quizEligible`、`personalityProfile`、`matchReasons`、`resultSummary`、`resultStrengths`、`resultCaution`。
- 当前页面实际展示：主图、名称、年代、类群、食性、体型、环境、分布、重量、现代类比、生存方式、发现说明、14 维测试画像、图库、来源状态、来源 URL 和所属时期。
- 当前缺失：分类置信度、时间精度、地层/区域、分类型尺度、不同行为功能、解剖证据、生态关系、生活片段、化石证据局限、发现史、争议、误解、术语、知识题和结构化来源。
- 微生物和功能群当前被迫继承动物式 `weight` 字段，数据模型不合适。

## 重复文案与模板

- 统一默认 discovery 段落被 97 个不同条目重复使用，是最大的跨条目重复来源。
- `funIntro` 被原样复制为同一条目的 `modernAnalogy`，110/110 条目存在字段内重复。
- 60 个正式结果由 12 套 archetype 模板生成；每套共享标题、两条通用原因、两条优势和一条提醒。
- 60 个 `resultSummary` 全部使用同一语法模板，仅物种名和 12 种原型标题发生变化；归一化后只有 12 种摘要形状。
- 原型分布：community 4、adaptive 4、sentinel 8、explorer 5、aquatic 6、armored 8、sprinter 4、ambusher 5、transition 5、giant 6、aerial 3、coldSocial 2。
- 结论：结果可达性合格，但文案独特性和解释深度不合格。

## 身份测试现状

- 15/15 题均是现代日常、职场、旅行、聚会或博物馆情境。
- 真正发生在远古环境、同时具备 `periodId` 与科学背景的题目：0/15。
- 现有题目没有 `chapter`、`sceneMediaId`、`scienceContext`、`afterAnswerFact` 或 `sourceIds`。
- 选项已经保留 14 维计分和自然语言反馈，可在不破坏确定性算法的前提下迁移到远古场景。

## 用户界面问题

- 古生物详情页直接显示 `sourceNeeded`、`quizEligible`、`personalityProfile` 等开发者概念。
- 详情页默认展开全部 14 维数值，长页面缺少章节导航和渐进展开。
- `media-image` 只要存在 `displayCaption` 就渲染 `media-meta`，测试相近结果的缩略图可能被长图注挤压。
- 相近结果只显示名称与学名，没有“共同点 / 区别”解释。
- 结果页只显示模板摘要、三项优势与完整 14 维，没有保存或解释影响最大的答案。
- 当前没有独立“远古知识挑战”入口或题库。

## 升级风险与约束

- 110 个长文对象若继续并入 `data/creatures.js`，会让图鉴列表和主包无条件加载全部内容。
- 详情知识层必须按时代拆分，并由详情页按当前 ID 获取；列表继续使用轻量索引。
- 所有艺术复原图必须继续标注“艺术复原”，不能被写成化石证据。
- 科学来源必须为真实 URL；推断、争议和缺少软组织证据的内容必须明确降级表述。
- 批量扩展前先完成任务指定的 10 个代表条目并在微信开发者工具验收。
