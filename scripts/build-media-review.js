const fs = require('fs')
const path = require('path')
const { cleanHtml, ensureDir } = require('./media-utils')

const sourcePath = path.resolve(__dirname, '../media/candidates.json')
const decisionPath = path.resolve(__dirname, '../media/decisions.json')
const outputPath = path.resolve(__dirname, '../reports/media-review.html')

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]))
}

if (!fs.existsSync(sourcePath)) {
  console.error('media/candidates.json does not exist. Run discover-open-media.js first.')
  process.exit(1)
}

const payload = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
const decisions = fs.existsSync(decisionPath) ? JSON.parse(fs.readFileSync(decisionPath, 'utf8')) : { decisions: {} }
const chosen = decisions.decisions || {}

function reconstructionHint(item) {
  const text = `${item.title || ''} ${item.description || ''}`
  return /reconstruction|restoration|artist.?s impression|life recon|diorama|model of/i.test(text)
    ? '是，描述命中复原特征，必须人工确认'
    : '未由描述判定，必须人工确认'
}

const groups = payload.groups.map((group) => {
  const choice = chosen[group.mediaId] || {}
  const cards = group.candidates.map((item) => {
    const selected = choice.candidateId === item.id
    return `<article class="candidate ${selected ? 'selected' : ''}">
      <img src="${escapeHtml(item.thumbnailUrl)}" alt="${escapeHtml(group.label)}候选图">
      <div class="body">
        <code>${escapeHtml(item.id)}</code>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(cleanHtml(item.description).slice(0, 320) || 'Commons 未提供说明')}</p>
        <dl><dt>作者</dt><dd>${escapeHtml(item.author || '待人工核对')}</dd><dt>授权</dt><dd>${escapeHtml(item.license)}</dd><dt>尺寸</dt><dd>${item.originalWidth} × ${item.originalHeight}</dd><dt>查询</dt><dd>${escapeHtml(item.query)}</dd><dt>复原</dt><dd>${escapeHtml(reconstructionHint(item))}</dd><dt>用途</dt><dd>${escapeHtml((item.suggestedMediaTypes || []).join(' / ') || '待人工分类')}</dd></dl>
        <a href="${escapeHtml(item.filePageUrl)}" target="_blank" rel="noreferrer">打开原始文件页</a>
        <p class="check">科学核对：主体身份｜时代一致性｜是否复原｜图注是否夸大｜裁切是否损失证据</p>
      </div>
    </article>`
  }).join('')
  const decisionLabel = choice.status === 'approved' ? '已批准' : (choice.status === 'rejected' ? '已拒绝' : '待选择')
  return `<section><header><div><span>${escapeHtml(group.priority)}</span><h2>${escapeHtml(group.mediaId)}</h2><p>${escapeHtml(group.label)}</p></div><strong>${decisionLabel}</strong></header><div class="grid">${cards || '<p>没有合格候选，需要补充查询或项目自有图片。</p>'}</div></section>`
}).join('')

const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>地球编年史媒体人工审核</title><style>
:root{color-scheme:dark;background:#071319;color:#eaf5f1;font:15px/1.55 system-ui,sans-serif}body{margin:0;padding:32px;max-width:1500px;margin:auto}h1{font-size:34px}section{margin:30px 0;padding:22px;background:#0d2027;border:1px solid #244049;border-radius:18px}section>header{display:flex;justify-content:space-between;gap:20px}header span{color:#9cd69b}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-top:18px}.candidate{overflow:hidden;background:#07171d;border:1px solid #28434c;border-radius:14px}.candidate.selected{border:3px solid #9cd69b}.candidate img{width:100%;aspect-ratio:4/3;object-fit:cover;background:#10262e}.body{padding:14px}.body h3{font-size:16px}.body code{font-size:11px;word-break:break-all;color:#8fb9c8}.body p{color:#b7cbc6}dl{display:grid;grid-template-columns:52px 1fr;gap:4px 8px}dt{color:#78979e}dd{margin:0;word-break:break-word}a{color:#9cd69b}.check{font-size:12px;border-top:1px solid #28434c;padding-top:10px}</style></head><body>
<h1>地球编年史媒体人工审核</h1><p>生成时间：${escapeHtml(payload.generatedAt)}。候选只来自允许许可范围；页面排序不代表批准。正式入库以 <code>media/decisions.json</code> 的逐项决定为准。</p>${groups}</body></html>`

ensureDir(path.dirname(outputPath))
fs.writeFileSync(outputPath, html)
console.log(`Review groups: ${payload.groups.length}`)
console.log(`Written: ${outputPath}`)
