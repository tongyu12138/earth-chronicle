# 图片来源与授权记录

本文件是媒体上线前的版权与科学复核说明。当前运行时使用的 305 张媒体全部为项目自有 AI 艺术复原；每张图都必须具备生成记录、人工视觉复核说明、替代文字、图注、文件哈希和用途信息，才能在 `data/media-catalog.js` 中标记为 `ready`。

## 已接入图片

| 媒体 ID | 用途 | 作者 / 机构 | 许可 | 原始来源 | 是否艺术复原 |
| --- | --- | --- | --- | --- | --- |
| `hero-earth-blue-marble` | 科普首页地球主视觉 | 地球编年史项目 / OpenAI 图像生成 | Project-owned AI-generated artwork | 本节生成与审核记录 | 是，明确标注 AI 艺术复原 |
| `quiz-welcome-triptych` | 测试欢迎页深时间三联画 | 地球编年史项目 / OpenAI 图像生成 | Project-owned AI-generated artwork | 本节生成记录 | 是，明确标注 AI 艺术复原 |
| 其余 303 个媒体 ID | 时期、时期画廊、事件与古生物 | 地球编年史项目 / OpenAI 图像生成 | Project-owned AI-generated artwork | `media/ai-generations.json` | 是，逐图标注 AI 艺术复原 |

## 项目自有 AI 艺术复原

项目首页、29 个时期、87 个时期画廊位、77 个事件、110 个古生物以及测试欢迎页三联画，现已全部使用项目自有 AI 艺术复原。新增的太阳系形成、休伦冰期、“无聊十亿年”、罗迪尼亚、奥陶纪生物大辐射、最早森林和深时间人类事件也各有独立复原，不复用旧图。`media/ai-generations.json` 保存每个内容媒体位的文件尺寸、字节数、SHA-256、生成方式、视觉审核状态和逐图审核说明；`data/ai-media-catalog.js` 是由该记录生成的运行时目录。

`quiz-welcome-triptych` 把三个时代放在彼此独立的窗口中：左侧为寒武纪海洋中的奇虾、三叶虫和海绵，中间为晚侏罗世石灰岩岛屿环境中的始祖鸟，右侧为更新世猛犸象草原。窗口边框用于明确表达它们不曾共存于同一生态系统。

生成时要求始祖鸟具有带齿颌、翼上三指爪和长骨尾，寒武纪场景不出现鱼类、海生爬行动物或被子植物，更新世场景不出现恐龙。图像仍可能包含生成模型造成的形态误差；颜色、姿态、软组织、植被细节和个体外观均属于艺术推测，不能替代化石照片或论文插图。应用内必须显示“艺术复原”标签和这项时代分隔说明。

最终提示词的核心要求：制作一幅自然史博物馆风格的三联画，分别呈现寒武纪奇虾生态、晚侏罗世始祖鸟与更新世猛犸象草原；三者必须用独立窗口明确分隔，不添加文字、标志或水印，不混入跨时代生物。

所有复原图都用于科普叙事，不伪装成照片、化石、文物、档案或直接观测。应用内统一显示“艺术复原”标签；颜色、软组织、人物面貌、姿态、构图与缺乏证据约束的环境细节均应视为推测。

## 媒体清单与发布等级

现有清单共 304 个时期、时期画廊、事件、古生物和首页媒体位：

- P0：96 个，由首页主视觉、29 个时期头图、60 个正式测试生物主图和 6 个首页精选事件图组成。
- P1：100 个，用于普通事件与化石/地层画廊；本轮新增的 7 个故事关键事件均有独立 AI 复原。
- P2：108 个，用于其他古生物与扩展画廊。

release 门禁要求 P0、P1、P2 全部 ready，且每条运行时记录都必须是项目自有 AI 复原；任何旧资料图、远程热链或内容缺失都会阻断发布。

精确的 `ready` / `missing` 数量、授权分布、来源机构和媒体类型以下列命令生成的 `reports/media-coverage.md` 为准：

```bash
node scripts/validate-media.js
```

## 可接受的授权

- Public Domain / 公共领域；
- CC0；
- CC BY；
- CC BY-SA；
- 博物馆、科研机构或作者明确书面允许本项目使用；
- 项目自有图片；
- 明确标注“艺术复原”的自有 AI 生成图，并保留生成和人工复核记录。

不得从搜索结果页直接复制图片，不得用网页缩略图地址冒充原图，不得把艺术复原图标成化石证据图，也不得把 GitHub Raw 当作生产图片 CDN。只接受 JPEG、PNG 和 WebP 静态栅格图；PDF、DjVu、视频、网页截图与未知格式不得进入候选短名单。

## 候选、审核与批准

1. `scripts/discover-open-media.js` 通过 Wikimedia Commons API 搜索，并读取原始文件页、作者、许可、尺寸、MIME 和描述。脚本仅保留允许的开放授权，但搜索命中不等于科学上可用。
2. `scripts/build-media-review.js` 生成全部候选页，审核人需检查主体身份、时代、是否艺术复原、图注是否夸大及裁切是否损失证据。
3. `scripts/build-media-proposals.js` 只根据学名命中、文件描述、像素、作者完整性等信号缩小到四选一；该排名不具备批准效力。
4. 只有 `media/decisions.json` 中状态为 `approved` 且具备 `candidateId`、`mediaType`、`scientificAccuracyNote`、`alt`、`caption` 的决定才会被 `scripts/approve-media.js` 读取。
5. 批准脚本把详情图和缩略图下载到 `media/public/<ownerType>/<ownerId>/`，再交给 `scripts/sync-media.js` 核对 MIME、像素、哈希、重复使用、路径冲突与权利字段。

审核时必须从 Commons 原始文件页获取作者和许可，不能凭文件名推测。艺术复原的科学说明至少要指出“不是直接观测”，并列出颜色、软组织、姿态、行为或背景中仍属推测的部分。

## 媒体同步格式

`scripts/sync-media.js` 接受 JSON 数组，或带 `publicBaseUrl` 与 `items` 的对象。每项至少提供：

```json
{
  "id": "creature-anomalocaris",
  "imageFile": "originals/creature-anomalocaris.jpg",
  "thumbnailFile": "thumbnails/creature-anomalocaris.jpg",
  "alt": "奇虾科学复原图",
  "credit": "机构或图片作者",
  "author": "作者姓名",
  "license": "CC BY-SA 4.0",
  "sourceUrl": "https://原始来源页面",
  "isReconstruction": true,
  "mediaType": "reconstruction",
  "scientificAccuracyNote": "艺术复原，不是直接观测；软组织和颜色存在推测。",
  "caption": "基于化石材料的奇虾艺术复原。"
}
```

先执行只读检查：

```bash
node scripts/sync-media.js --input ./media/media.json
```

确认没有错误后再写入受管目录；脚本不会覆盖人工维护的已核验记录：

```bash
node scripts/sync-media.js --input ./media/media.json --write
```

## 部署与合法域名

开发、体验和正式环境默认都使用 `https://tongyu12138.github.io/earth-chronicle`，普通 HTTP 不会进入图片候选。`scripts/serve-media.js` 仅保留为显式可选的 HTTPS 调试服务，要求受信任证书与非回环 HTTPS 域名；该服务不会暴露候选文件、审核记录或仓库代码，只允许 `media/public/` 中的图片路径。

体验版和正式版使用 `https://tongyu12138.github.io/earth-chronicle`。`.github/workflows/deploy-media.yml` 先执行严格 release 校验，再由 `scripts/stage-media-site.js` 只复制运行时目录实际引用的 610 个大小图文件，部署完成后由 `scripts/verify-deployed-media.js` 逐一验证 HTTP 状态与图片 MIME；未引用的早期素材不会进入 Pages 产物。这是项目自有媒体的自托管路径，不是 GitHub Raw 热链。

发布前必须在微信公众平台把实际图片域名加入 `downloadFile` 合法域名。当前图片需要允许：

```text
https://tongyu12138.github.io
```

图片体积目标：列表缩略图 40—100KB，普通内容图 100—250KB，头图 300—500KB以内；应在保持科学细节可辨识的前提下压缩。

## 发布门禁

```bash
# 日常维护：权利、路径、MIME、像素和哈希错误会失败，尚未补图只警告
node scripts/validate-media.js

# 体验/正式发布：要求 304 个内容位全部 ready、305 条运行时媒体全部为项目自有 AI 复原，且最终地址可解析到 HTTPS
node scripts/validate-media.js --release
```

发布校验还会检查：详情图宽度 900—2600 px、缩略图宽度 360—900 px、极端长宽比、文件字节数与 SHA-256 是否和人工审核记录一致、不同主体是否错用相同文件、AI 授权与标记是否完整，以及每个最终地址能否解析到 HTTPS。
