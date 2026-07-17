# 图片来源与授权记录

本文件是媒体上线前的版权检查表。只有同时具备原始来源、作者或机构、明确许可、替代文字和用途说明的素材，才能在 `data/media-catalog.js` 中标记为 `ready`。

## 已接入图片

| 媒体 ID | 用途 | 作者 / 机构 | 许可 | 原始来源 | 是否艺术复原 |
| --- | --- | --- | --- | --- | --- |
| `hero-earth-blue-marble` | 科普首页地球主视觉 | Reto Stöckli、Robert Simmon / NASA Earth Observatory | Public Domain (NASA)，保留署名并遵守 NASA 媒体使用规范 | https://science.nasa.gov/earth/earth-observatory/the-blue-marble-2181/ | 否，卫星观测数据合成影像 |

NASA 页面说明该影像可供教育者、科学家、博物馆和公众使用。项目保留完整署名与来源，不使用 NASA 标识暗示官方背书。

## 当前缺失情况

现有内容清单包含 287 个时期、时期画廊、事件和古生物媒体位。除上表独立的首页主视觉外，这 287 个媒体位目前均保持 `missing`，不显示系统破图，也不伪造来源。

精确数量以以下命令为准：

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

不得从搜索结果页直接复制图片，不得用网页缩略图地址冒充原图，不得把艺术复原图标成化石证据图，也不得把 GitHub Raw 当作生产图片 CDN。

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
  "isReconstruction": true
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

生产媒体应部署在对象存储或 CDN。`config/media.js` 分别提供 `develop`、`trial`、`release` 的 Base URL 配置位；当前尚未确定自有 CDN，因此三套 Base URL 均为空，已接入的 NASA 图片使用经过核验的绝对 HTTPS 地址。

发布前必须在微信公众平台把实际图片域名加入 `downloadFile` 合法域名。当前首页真实图片需要允许：

```text
https://eoimages.gsfc.nasa.gov
```

图片体积目标：列表缩略图 40—100KB，普通内容图 100—250KB，头图 300—500KB以内；应在保持科学细节可辨识的前提下压缩。
