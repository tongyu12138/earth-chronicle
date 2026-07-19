# 地球编年史微信小程序

原生微信小程序：从地球形成滑到现代人工智能，点击时期、事件或古生物查看科普说明、证据和来源；另含一套 15 题古生物性格测试。

这是微信原生小程序，不是 HTML 网站，不能用普通浏览器运行。GitHub Pages 只承载经审批的开放授权图片，不承载小程序界面。项目未使用 React、Vue、Next.js、npm、云开发或后端。

## 当前规模

- 2 个 Tab：地球史、测测你是谁；
- 29 个地质时期及人类历史阶段；
- 70 个关键事件；
- 110 种古生物或古老生命类型；
- 15 道题，每题固定 4 个选项；
- 60 个正式、人工选择并经分布校准的测试结果，其他 50 种只保留在图鉴；
- 297 个内容媒体位：96 个 P0、93 个 P1、108 个 P2，现已全部完成；
- 加上测试欢迎页三联画，运行时共 298 张项目自有 AI 艺术复原，每张都有独立文件哈希、生成记录、人工视觉审核说明和推测性声明。

## 在微信开发者工具中运行

1. 克隆或下载仓库。
2. 在微信开发者工具中选择“导入项目”。
3. 选择包含 `app.json` 与 `project.config.json` 的仓库根目录。
4. 使用项目已有 AppID，点击“编译”。
5. 默认打开“地球史”；底部 Tab 可切换到“测测你是谁”。

需要查看本地已审批高清图片时，在编译前保持下列命令运行：

```bash
node scripts/serve-media.js
```

该服务只监听 `127.0.0.1:4173`，而且只允许读取 `media/public/`。真机不能访问开发电脑的 `127.0.0.1`，真机预览必须先完成 HTTPS 媒体部署和微信合法域名配置。

不要替换或提交 `project.private.config.json`。不要把 AppSecret、私钥、访问令牌或对象存储密钥写入前端仓库。

项目固定基础库为 `3.16.2`。该版本已存在于当前微信开发者工具的稳定基础库清单中，并已用于本项目编译；固定版本可以避免 `trial` 随工具升级而变化，提升复现性。AppID 未修改。

## 信息架构

```text
pages/science/index          轻量地球史首页、五大时代、精选事件与专题
pages/quiz/index             测试欢迎页与15题答题流程
pages/period/index           29个时期详情
pages/detail/index           70个事件详情
pages/creatures/index        110种古生物图鉴、搜索与筛选
pages/creature-detail/index  古生物详情
pages/search/index           全局搜索
pages/quiz-result/index      测试结果、相近结果与分享
pages/timeline/index         70个事件时间轴
```

旧的 `pages/event/index` 重定向层已删除。时期、时间轴、搜索、最近浏览和分享统一使用：

```text
/pages/detail/index?id=<eventId>
```

`utils/router.js` 统一处理普通页面、Tab 页面、重定向、重启、动态参数编码、重复点击节流、真实错误日志与用户提示。旧版本本地缓存中的事件兼容路径会在读取时迁移到事件详情页。

## 首屏与包体策略

首页只导入以下轻量数据，不再加载事件长文和完整古生物档案：

```text
data/index-meta.js
data/period-summaries.js
data/creature-summaries.js
```

测试页只导入 `data/quiz-profiles.js`。完整事件、时期和古生物数据仅由详情、图鉴、搜索和时间轴页面使用。

当前依据 `project.config.json` 排除规则得到的主包静态未压缩估算约为 1.20 MiB，高清图片位于 `media/` 并明确排除，不会被打进小程序主包。项目仍保持单主包；精确数据见 `reports/package-size.md`，最终数字以微信开发者工具“代码依赖分析 / 包体积”为准。

## 图片系统

```text
config/media.js                 开发、体验、生产媒体 Base URL
data/media-catalog.js           已核验媒体目录
components/media-image/         loading / ready / error / missing 组件
data/image-manifest.js          297个内容媒体位及P0/P1/P2优先级
data/ai-media-catalog.js        由逐图审核记录生成的AI运行时目录
data/media-queries.js           时期、生物和事件的开放媒体查询表
scripts/discover-open-media.js  Commons API候选发现，不会自动入库
scripts/build-media-review.js   生成所有候选人工审核页
scripts/build-media-proposals.js 生成四选一短名单，仍不会批准
scripts/approve-media.js        只执行media/decisions.json中的显式批准
scripts/sync-media.js           MIME、尺寸、哈希、路径和权利字段检查
scripts/validate-media.js       普通校验与全量AI发布门禁
scripts/serve-media.js          仅供微信开发者工具使用的本地媒体服务
scripts/stage-media-site.js     只发布运行时实际引用的AI媒体
docs/IMAGE_SOURCES.md           授权记录、同步格式与待补说明
```

图片组件区分 thumbnail / card / hero / full 四种模式，支持骨架屏、加载失败降级、手动重试、焦点裁切、大图预览、作者/许可/图注、原始来源复制和“艺术复原”类型标记。详情图加载失败时会先降级到缩略图，再降级到可读占位，不显示系统破图。

开发版 Base URL 为 `http://127.0.0.1:4173`，仅供本机微信开发者工具使用；体验版与正式版使用 `https://tongyu12138.github.io/earth-chronicle`，GitHub Pages 工作流只上传运行时目录实际引用并通过审核的 596 个 AI 大小图文件，不使用 GitHub Raw 热链。微信公众平台需配置：

```text
https://tongyu12138.github.io
```

不要使用 GitHub Raw 作为生产图片服务。列表缩略图建议 40—100KB，普通内容图 100—250KB，头图在清晰度允许时控制在 300—500KB。

### 保留的开放资料候选工作流

以下流程只用于研究参考和候选证据留档，当前 release 运行时不会采用这些资料图；正式媒体统一来自逐图审核的项目自有 AI 复原。

```bash
# 1. 只搜集开放许可候选，支持断点续跑
node scripts/discover-open-media.js --resume

# 2. 生成全量审核页和四选一短名单
node scripts/build-media-review.js
node scripts/build-media-proposals.js

# 3. 人工查看 reports/media-review.html 与 reports/media-shortlist.html
#    然后在 media/decisions.json 逐条写入批准决定

# 4. 仅下载显式批准项，检查后写入中央媒体目录
node scripts/approve-media.js --write

# 5. 重新生成轻量摘要并执行严格发布门禁
node scripts/generate-summaries.js
node scripts/validate-media.js --release
```

`media/candidates.json` 只是候选证据库，`media/proposals.json` 只是排序建议；两者都不能让图片进入小程序。只有 `media/decisions.json` 中同时提供候选 ID、类型、复原标记、中文替代文字、图注和科学准确性说明的 `approved` 项才能下载和同步。

## 测试画像

正式结果集中在 `data/quiz-profiles.js`：

- 60 种 `quizEligible: true`；
- 每种都有完整 14 维画像、匹配依据、结果摘要、优势和提醒；
- 其余 50 种 `quizEligible: false`，仍在图鉴展示；
- ID 哈希不再生成正式画像；哈希只用于无科学含义的旧昵称选择；
- 画像先依据生态原型人工选择，再用固定题库样本簇校准数值分布；
- 霸王龙、伶盗龙、三角龙等不会因流行度获得额外概率。

详细模拟结果见 `reports/quiz-distribution.md`。人格匹配只用于科普娱乐，不能解释为对已灭绝动物心理的科学测量。

## 自动验证

在仓库根目录运行：

```bash
node scripts/validate-data.js
node scripts/generate-summaries.js --check
node scripts/validate-quiz.js
node scripts/audit-routes.js
node scripts/report-package-size.js --check
node scripts/validate-media.js
```

大样本分布检查：

```bash
node scripts/validate-quiz.js --large
```

路由审计会检查页面文件、Tab、重复路径、WXML 事件处理函数、未注册目标、时期/事件/古生物 ID、关联数据和分享/最近阅读路径。GitHub Actions 会在每次 push 与 pull request 检查科学数据、生成摘要、测试分布、路由、包体估算与媒体字段。手动 release 检查或 Pages 部署还会执行 `node scripts/validate-media.js --release`；任一媒体位缺失、混入非项目自有 AI 图、路径不能解析到 HTTPS、像素或文件哈希异常都会阻断部署。

## 手工回归清单

在开发者工具中至少检查：

1. 两个 Tab 可互相切换；
2. 首页五个时代都能切换，29 个时期逐一可打开；
3. 时期页上下时期和“全部时期”正常；
4. 70 个时间轴事件、搜索事件与时期事件都直接进入详情页；
5. 图鉴筛选后可打开古生物，110 个 ID 均通过静态审计；
6. 最近阅读和分享路径可重新打开；
7. 测试可开始、返回上一题、中断继续、完成、重测和分享；第一题进度不是 0%，重测会完整清空旧状态，分享链接不传播分数；
8. 启动 `node scripts/serve-media.js` 后，时期、精选事件、测试页 AI 深时间三联画与生物图能加载；断网时媒体组件显示降级画面而非破图；
9. Console 中没有页面注册、WXML、WXSS 或路由错误；
10. “代码依赖分析 / 包体积”中没有把 `scripts`、`docs`、`reports` 和高清图片打入主包。

## 常见错误

- 不要导入仓库的上一级目录；应直接导入含 `app.json` 的目录。
- 不要把项目当作 GitHub Pages 网站运行。
- 不要用普通浏览器直接打开 WXML。
- 编译失败时先查看微信开发者工具 Console 和 `[Router]`、`[AppError]`、`[MediaImage]` 日志。
- 远程图片地址必须配置微信合法域名；开发者工具关闭域名校验不代表真机可用。
- 不要提交 `project.private.config.json`。
- 不要把 AppSecret 或任何服务端密钥写进小程序代码。

## 科学内容维护

- 地质边界参考国际地层委员会；年代会随定年研究修订。
- “人类世”只作为仍在讨论的概念，不写成正式地质世。
- 事件来源优先科研机构、博物馆、国际组织和论文。
- 古生物条目没有逐一核验来源时继续保留 `sourceNeeded: true`，不得生成看似可信的伪链接。
- 分类、体型、重量与艺术复原存在争议时应明确说明不确定性。
