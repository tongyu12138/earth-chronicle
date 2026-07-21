# 第五阶段发布验收报告

## 1. 发布范围

- 功能分支：`feat/paleo-code-and-earth-story`
- 基线提交：`92017fb`
- 小程序：微信原生小程序《地球编年史》
- 本阶段主题：PaleoCode 身份体系、60 份人工结果叙事、深时间故事模式、五次大灭绝对比、P0 物种知识复核与 7 个新事件
- 本报告验证日期：2026-07-21
- 禁止动作：本阶段没有执行微信小程序预览或上传

## 2. 主要文件变更

### 身份体系与结果页

- `data/paleo-types.js`：16 种 PaleoCode 的名称、家族、四轴标签、优势、盲区与视觉色板。
- `utils/paleo-type-engine.js`：四组二元轴的确定性编码逻辑。
- `data/quiz-result-content.js`：60 个正式结果的独立人工内容记录。
- `utils/quiz-engine.js`、`data/quiz-profiles.js`：匹配、同型筛选、答题证据与结果构建。
- `pages/quiz-result/index.js|wxml|wxss`：身份海报、四格解释、方向性答题依据、科学预览、相似结果和分享海报。
- `scripts/validate-result-semantics.js`、`reports/result-semantic-quality.md`：结果语义与分布验收。

### 物种科普内容

- `data/creature-knowledge/p0-reviewed/`：60 个 P0 结果物种的人工复核长文。
- `data/creature-knowledge/{catalog,index,sources,cenozoic,mesozoic}.js`：知识条目与来源索引。
- `pages/creature-detail/`：知识分级和来源展示补强。
- `scripts/validate-creature-content.js`、`scripts/validate-quiz-content.js`：110 个条目与 60 个知识题的完整性检查。

### 地球史故事与大灭绝对比

- `data/earth-story.js`：12 章连续因果叙事与 21 个来源。
- `pages/story/`：15 分钟地球史阅读模式。
- `data/extinction-comparison.js`、`components/extinction-comparison/`：五次大灭绝的同字段比较馆。
- `data/events.js`、`data/periods.js`、`data/period-summaries.js`、`data/index-meta.js`：新增事件与入口关联。
- `pages/science/`：故事入口、五次大灭绝对比和 AI 艺术复原标注。
- `scripts/validate-story-content.js`、`reports/earth-story-coverage.md`：故事、来源和灭绝对比检查。

### 媒体、构建与文档

- `media/public/event/{solar-system-formation,huronian-glaciations,boring-billion,rodinia-cycle,great-ordovician-biodiversification,first-forests,humanity-in-deep-time}/`：7 组独立 AI 艺术复原媒体。
- `media/ai-generations.json`、`data/ai-media-catalog.js`、`scripts/build-ai-media-catalog.js`：媒体生成记录和运行时目录。
- `.github/workflows/validate.yml`：加入结果语义和故事内容验证。
- `project.config.json`：固定稳定基础库 `3.15.2`，继续排除高清媒体、报告和脚本进入主包。
- `README.md`、`docs/IMAGE_SOURCES.md` 与 `reports/`：使用、来源、质量和发布报告。

## 3. 16 种 PaleoCode

| 代码 | 中文身份 | 家族 | 一句话方向 |
| --- | --- | --- | --- |
| EBCR | 先锋召集者 | 连接家族 | 先去试，再把伙伴带上 |
| EBCG | 机动守护者 | 守护家族 | 先接近问题，再护住退路 |
| EBSR | 闪行探路者 | 探索家族 | 看到新路，身体已经出发 |
| EBSG | 边界游侠 | 守护家族 | 敢往前，也随时能撤回 |
| EPCR | 远行织网者 | 连接家族 | 把新路走成大家都能用的路 |
| EPCG | 韧性照料者 | 连接家族 | 边适应，边照顾同行者 |
| EPSR | 长线拓荒者 | 探索家族 | 一个人也能把陌生路走远 |
| EPSG | 静默开垦者 | 建造家族 | 慢慢试，把立足点做牢 |
| OBCR | 战术领航者 | 连接家族 | 先看清局面，再带队突破 |
| OBCG | 快速哨兵 | 守护家族 | 先读危险，再把缺口补上 |
| OBSR | 精准突击者 | 探索家族 | 看准一个窗口，集中出手 |
| OBSG | 伏线守候者 | 守护家族 | 不浪费力气，只在必要时动 |
| OPCR | 长程建造者 | 建造家族 | 把大范围任务稳稳做完 |
| OPCG | 群落守基者 | 守护家族 | 把大家赖以生存的底座守住 |
| OPSR | 耐心专研者 | 建造家族 | 选准一件事，慢慢做深 |
| OPSG | 深层守望者 | 守护家族 | 先稳住自己，再熬过变化 |

四组编码轴只描述答题方向：探索/观察、快速/持续、协同/独立、争取/守界。环境亲和只用于同型物种排序，不改变 PaleoCode。

## 4. 60 个结果的分布与去模板化

- 正式结果：60 / 60，全部可在 10 万组模拟答案中成为第一名。
- 类型分布：EBCR 4；EBCG 3；EBSR 4；EBSG 4；EPCR 4；EPCG 4；EPSR 4；EPSG 4；OBCR 4；OBCG 4；OBSR 4；OBSG 3；OPCR 3；OPCG 4；OPSR 4；OPSG 3。
- 最大类型差：1；结果覆盖均衡。
- 最大单物种占比：阿法南方古猿 8.53%，低于 10% 验收线。
- 唯一结果标题：60 / 60；唯一一句话身份：60 / 60。
- 原有通用“人格模板 + 化石术语拼接”已从正式结果路径移除；60 个结果均有显式记录，不依赖运行时模板生成。
- 结果依据来自用户真实题号、真实选项和方向性解释；分享模式不会泄露好友答题记录。
- 科学说明把“它真实怎么活”“我们凭什么知道”“仍有争议的部分”与现代人格类比分开。

## 5. 巨齿鲨改版前后

- 改版前：[megalodon-before.png](./screenshots/phase-5/megalodon-before.png)
- 改版后：[megalodon-after.png](./screenshots/phase-5/megalodon-after.png)
- 改版前问题：巨大的娱乐分数、嵌套暗色信息卡和化石术语堆叠，使用户难以理解“为什么匹配”。
- 改版后结果：OPSR「耐心专研者」先给可读身份，再用“你愿意为一个很远的大目标认真投入”等现代行为解释匹配；证据、物种生态和不确定性放在后续分区。
- 回归规则：禁止把牙齿、椎体、体长模型或化石保存状态误写成巨齿鲨的生态策略。

## 6. 其他代表结果截图

- 产甲烷古菌：[methanogen-after.png](./screenshots/phase-5/methanogen-after.png)
- 始祖鸟：[archaeopteryx-after.png](./screenshots/phase-5/archaeopteryx-after.png)
- 甲龙：[ankylosaurus-after.png](./screenshots/phase-5/ankylosaurus-after.png)
- 真猛犸象：[woolly-mammoth-after.png](./screenshots/phase-5/woolly-mammoth-after.png)
- 阿法南方古猿：[australopithecus-after.png](./screenshots/phase-5/australopithecus-after.png)

六张结果海报均确认：AI 艺术复原图片加载成功、四个家族色板区分清楚、首屏没有文字/按钮遮挡、匹配理由使用现代可理解语言。

## 7. P0 知识复核

- 物种知识条目：110 / 110。
- A 级人工复核：60（本测试全部正式结果物种）。
- B 级结构化条目：50；保留后续逐条人工深审空间，但已通过完整字段、重复段落和来源检查。
- 来源记录：213 条。
- 60 个正式结果知识题均为人工策展；五章分布为 10 / 15 / 15 / 10 / 10。
- 110 个长文条目重复段落：0。

## 8. 15 分钟地球史

12 章顺序如下：

1. 尘埃怎样变成行星
2. 碰撞塑造地球与月球
3. 海洋出现，生命留下微弱痕迹
4. 氧气先改造岩石，再改造天空
5. “无聊十亿年”里的复杂细胞实验
6. 超大陆、雪球地球与埃迪卡拉海底
7. 海洋从身体创新走向生态分层
8. 植物、森林与四足动物重写陆地
9. 五次大灭绝不是五个相同按钮
10. 恐龙时代也属于鸟、哺乳动物与花
11. 从哺乳动物辐射到人类文明
12. 化石能源、全球网络与人工智能

- 来源：21；关联时期 24 / 29；关联事件 51 / 77。
- 关键边界：休伦冰期与成冰纪雪球地球分开；罗迪尼亚地图标记为重建；三叠纪末主流机制强调 CAMP；演化不写成通往人类的预定路线。
- 截图：[earth-story.png](./screenshots/phase-5/earth-story.png)

## 9. 七个新增关键事件与来源

1. 太阳系形成（NASA Science）
2. 休伦相关古元古代冰期（Earth-Science Reviews、ICS）
3. “无聊十亿年”（Scientific Reports、ICS）
4. 罗迪尼亚聚合与裂解（Precambrian Research）
5. 奥陶纪生物大辐射（Palaeoworld）
6. 最早森林（Journal of the Geological Society）
7. 人类在深时间中的位置（Smithsonian、NASA）

每个事件均有独立 AI 艺术复原图、缩略图、说明、来源和证据边界；不把艺术复原标成历史照片。

## 10. 五次大灭绝对比馆

- 对比对象：奥陶纪末、晚泥盆世、二叠纪末、三叠纪末、白垩纪末。
- 固定字段：主要影响生态、关键证据、当前主流机制、其他候选机制、恢复时间、幸存/扩张类群、科学把握。
- 截图：[five-mass-extinctions.png](./screenshots/phase-5/five-mass-extinctions.png)
- 自动检查：5 / 5，默认选择奥陶纪末；组件不使用微信不支持的标签选择器。

## 11. 微信开发者工具环境修复与验收

- 原环境：RC `2.02.2607161`，会在页面正常渲染后由 `WAAutoService` 注入 `appServiceSDKScriptError timeout`，属于开发者工具环境错误。
- 修复：从微信官方版本配置安装推荐稳定版 `2.01.2510290` ARM64；官方签名与 macOS 公证检查通过。
- RC 备份：`/Applications/wechatwebdevtools-rc-2.02.2607161.app`，未删除。
- 项目基础库：稳定非灰度 `3.15.2`。
- 稳定版自动化：六个结果媒体全部 `ready`；故事 12 章；灭绝对比 5 项。
- Errors：0；Problems：0；Console error：0；exceptions：0。
- 证据报告：`reports/screenshots/phase-5/after-automation-report.json`。

## 12. 包体与媒体

- 基线静态估算：74 个文件，1.42 MiB（1,490,003 bytes）。
- 当前静态估算：92 个文件，1.75 MiB（1,837,000 bytes）。
- 增量：346,997 bytes，约 0.33 MiB。
- 高清媒体不进入小程序主包；正式版从 HTTPS 媒体地址读取。
- ready 媒体：305；内容媒体：304 / 304；P0/P1/P2 覆盖全部 100%。

## 13. 完整验证

以下十项核心命令全部通过：

```bash
node scripts/validate-data.js
node scripts/generate-summaries.js --check
node scripts/validate-quiz.js --large
node scripts/validate-creature-content.js
node scripts/validate-quiz-content.js
node scripts/validate-result-semantics.js
node scripts/validate-story-content.js
node scripts/audit-routes.js
node scripts/report-package-size.js --check
node scripts/validate-media.js --release
```

附加通过：`git diff --check`。

关键结果：

- 29 时期、77 事件、110 物种、304 内容媒体。
- 15 道身份题，每题 4 选项；10 万组模拟答案覆盖 60 个正式结果。
- 单答案扰动无不合逻辑跳转；平均相似度 87.94%。
- 60 个结果、16 个 PaleoCode、分布 3—4。
- 12 个故事章节、21 个来源、7 个新增事件、5 次大灭绝。
- 路由审计覆盖 11 个注册页面、29/77/110 个详情 ID。
- 正式媒体 305 个全部可用。

## 14. 剩余人工审阅项

- 50 个 B 级物种条目已可发布并通过结构化校验，但若追求博物馆级逐句精度，后续仍可按时期继续人工深审。
- 真机上的字号、系统字体、低性能设备滚动和分享海报保存，应在正式上传前再做一次真机验收；本阶段按要求未执行预览或上传。
- AI 艺术复原会随新证据更新；来源和图像说明需要在版本升级时同步修订。
