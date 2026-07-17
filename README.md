# 地球编年史微信小程序

原生微信小程序：从地球形成滑到现代人工智能，点击时期、事件或古生物查看科普说明、证据和来源；另含一套 15 题古生物性格测试。

这不是 HTML 网站，也不能用普通浏览器或 GitHub Pages 运行。项目未使用 React、Vue、Next.js、npm、云开发或后端。

## 当前规模

- 2 个 Tab：地球史、测测你是谁；
- 29 个地质时期及人类历史阶段；
- 61 个关键事件；
- 110 种古生物或古老生命类型；
- 15 道题，每题固定 4 个选项；
- 60 个正式、人工选择并经分布校准的测试结果，其他 50 种只保留在图鉴；
- 1 张已核验来源和许可的真实首页图片；287 个内容媒体位保持 `missing`。

## 在微信开发者工具中运行

1. 克隆或下载仓库。
2. 在微信开发者工具中选择“导入项目”。
3. 选择包含 `app.json` 与 `project.config.json` 的仓库根目录。
4. 使用项目已有 AppID，点击“编译”。
5. 默认打开“地球史”；底部 Tab 可切换到“测测你是谁”。

不要替换或提交 `project.private.config.json`。不要把 AppSecret、私钥、访问令牌或对象存储密钥写入前端仓库。

项目固定基础库为 `3.16.2`。该版本已存在于当前微信开发者工具的稳定基础库清单中，并已用于本项目编译；固定版本可以避免 `trial` 随工具升级而变化，提升复现性。AppID 未修改。

## 信息架构

```text
pages/science/index          轻量地球史首页、五大时代、精选事件与专题
pages/quiz/index             测试欢迎页与15题答题流程
pages/period/index           29个时期详情
pages/detail/index           61个事件详情
pages/creatures/index        110种古生物图鉴、搜索与筛选
pages/creature-detail/index  古生物详情
pages/search/index           全局搜索
pages/quiz-result/index      测试结果、相近结果与分享
pages/timeline/index         61个事件时间轴
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

当前仓库非 Git 文件约 0.86MB，且没有把高清图片打进小程序包；因此本轮评估后保持单主包，避免为 9 个页面引入不必要的分包路径复杂度。`project.config.json` 排除了脚本、文档、报告、工作流与旧图片清单。未来接入大量本地资源或接近主包限制时，再把非 Tab 页面和详细数据迁入普通分包。

## 图片系统

```text
config/media.js                 开发、体验、生产媒体 Base URL
data/media-catalog.js           已核验媒体目录
components/media-image/         loading / ready / error / missing 组件
data/image-manifest.js          287个内容媒体位清单，仅供维护和校验
scripts/validate-media.js       来源、许可、URL、重复ID检查
scripts/sync-media.js           本地媒体JSON检查与目录同步
docs/IMAGE_SOURCES.md           授权记录、同步格式与待补说明
```

图片组件在加载前显示骨架屏，失败或缺失时显示主题渐变和替代文字，不显示系统破图；支持懒加载、作者与授权信息及显式大图预览。页面数据只保存媒体 ID，完整 URL 与版权信息集中在媒体目录。

当前三套 Base URL 均为空，因为项目尚未确定自有对象存储或 CDN。已核验的 NASA 首页地球影像使用绝对 HTTPS 地址。生产发布前需在 `config/media.js` 写入实际 CDN 地址，并在微信公众平台配置 `downloadFile` 合法域名。当前真实图片还需要允许：

```text
https://eoimages.gsfc.nasa.gov
```

不要使用 GitHub Raw 作为生产图片服务。列表缩略图建议 40—100KB，普通内容图 100—250KB，头图在清晰度允许时控制在 300—500KB。

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
node scripts/validate-quiz.js
node scripts/audit-routes.js
node scripts/validate-media.js
```

大样本分布检查：

```bash
node scripts/validate-quiz.js --large
```

路由审计会检查页面文件、Tab、重复路径、WXML 事件处理函数、未注册目标、时期/事件/古生物 ID、关联数据和分享/最近阅读路径。GitHub Actions 会在每次 push 与 pull request 执行四项验证，失败时返回非零状态。

## 手工回归清单

在开发者工具中至少检查：

1. 两个 Tab 可互相切换；
2. 首页五个时代都能切换，29 个时期逐一可打开；
3. 时期页上下时期和“全部时期”正常；
4. 61 个时间轴事件、搜索事件与时期事件都直接进入详情页；
5. 图鉴筛选后可打开古生物，110 个 ID 均通过静态审计；
6. 最近阅读和分享路径可重新打开；
7. 测试可开始、返回上一题、中断继续、完成、重测和分享；
8. 首页 NASA 影像加载；断网时媒体组件显示降级画面而非破图；
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
