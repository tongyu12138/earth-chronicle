# 地球编年史微信小程序

原生微信小程序：从地球形成到现代人工智能的分层科普档案，并提供独立的 15 题古生物性格测试。

## 当前规模

- 2 个独立一级入口：`地球史`、`测测你是谁`；
- 29 个地质时期及人类历史阶段；
- 61 个原有关键事件，详细科学内容与来源全部保留；
- 110 种古生物或古老生命类型；
- 15 道现代场景题，每题固定 4 个选项；
- 14 个计分维度，使用归一化加权距离匹配；
- 287 条待补图片清单（时期头图与画廊、61 个事件、110 种古生物）。

## 页面结构

```text
pages/science/index          地球史一级首页
pages/quiz/index             古生物测试一级首页与答题流程
pages/period/index           时期沉浸式详情
pages/detail/index           事件详情（保留原科学长文）
pages/event/index            事件兼容入口，转入详情页
pages/creatures/index        古生物图鉴、搜索与筛选
pages/creature-detail/index  古生物详情与测试画像
pages/search/index           时期、事件、古生物全局搜索
pages/quiz-result/index      测试结果、相近结果与分享
pages/timeline/index         61 个事件的时间轴总览
```

## 数据与工具

```text
data/eras.js                 五个顶层时代组
data/periods.js              29 个时期、环境、事件与生物映射
data/events.js               61 个事件及全部科学长文、证据和来源
data/creatures.js            110 种古生物与 14 维标准画像
data/quiz.js                 15 道题、选项与多维分数
data/image-manifest.js       图片文件名、画面、提示词、授权建议和状态
utils/quiz-engine.js         汇总、归一化、加权距离与结果排序
utils/storage.js             收藏、最近浏览、答题进度和结果缓存
utils/image.js               图片预览和占位状态
utils/data-validator.js      数据完整性检查
scripts/validate-data.js     全数据验收
scripts/validate-quiz.js     随机答案分布模拟
```

## 本地运行

1. 打开微信开发者工具。
2. 导入本目录：`/Users/tongyu/Desktop/历史`。
3. 使用项目已有 AppID；不要替换或提交 `project.private.config.json`。
4. 点击“编译”。默认启动页为“地球史”，底部可切换到“测测你是谁”。

项目没有 npm、云开发或后端依赖。

## 命令行验证

在项目根目录运行：

```bash
node scripts/validate-data.js
node scripts/validate-quiz.js
node scripts/validate-quiz.js --large
```

- 默认测试模拟 5000 组固定种子的随机答案；
- `--large` 模拟 100000 组，用于检查低概率结果；
- 相同答案始终得到相同结果；若题库、维度或画像缺失，脚本会以非零状态退出。

## 图片系统

当前版本没有把来源或授权未经确认的网络图片塞入小程序。所有页面都已实现：

- `image`、`thumbnail`、`gallery`、`imageAlt`、`imageCredit`、`imageLicense`、`imageSourceUrl` 字段；
- 16:9 头图、4:3 图鉴图和画廊位置；
- 深色时期渐变占位图；
- 详情头图加载失败回退；
- 懒加载内容图；
- 有真实图片时使用 `wx.previewImage` 预览；
- 没有授权图片时明确显示“授权图待补”。

`data/image-manifest.js` 为每个时期和古生物提供建议文件名、比例、中文生成提示词、替代文本、建议授权来源与当前状态。正式图片建议：

1. 缩略图使用 WebP/JPEG，尽量控制在 100KB 左右；
2. 普通内容图尽量控制在 250KB 以内；
3. 本地少量封面可放入 `assets/images/periods/`、`assets/images/creatures/`；
4. 大图放入 CDN 或对象存储，并在微信公众平台配置对应的 `downloadFile` 合法域名；
5. 填写真实作者、授权类型和原始链接；艺术复原必须明确标为复原图。

根目录原有 `封面图.jpg` 没有可靠的作者和授权记录，因此当前不进入小程序包，也不在页面展示。

## 科学内容维护

- 地质边界参考国际地层委员会时间表；数值会随新定年修订。
- “人类世”只作为存在讨论的概念说明，不写成正式地质世。
- 学名、体型、重量和复原应由相应领域人员在发布前复核。
- 古生物条目尚未逐一确认来源时使用 `sourceNeeded: true`，不得伪造 URL。
- 人格画像是科普娱乐用现代类比，不代表对已灭绝动物心理的科学测量。
- 新增事件必须保留 `detail`、`significance`、`mechanism`、`evidence`、`openQuestions`、`misconception`、`glossary` 与 `sources`。

## 本地功能

- 收藏时期、事件和古生物；
- 记录最后浏览的时期、事件或古生物；
- 退出测试后继续答题；
- 结果与相近结果可分享；
- 图鉴按时期、环境、食性、体型和类群筛选；
- 搜索中文名、学名、时期、事件和标签。
