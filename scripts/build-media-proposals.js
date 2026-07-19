const fs = require('fs')
const path = require('path')
const { mediaQueries } = require('../data/media-queries')

const repoRoot = path.resolve(__dirname, '..')
const candidateFile = path.join(repoRoot, 'media/candidates.json')
const proposalFile = path.join(repoRoot, 'media/proposals.json')
const reportFile = path.join(repoRoot, 'reports/media-shortlist.html')

if (!fs.existsSync(candidateFile)) {
  console.error('Missing media/candidates.json. Run discover-open-media.js first.')
  process.exit(1)
}

const payload = JSON.parse(fs.readFileSync(candidateFile, 'utf8'))
const queryById = new Map(mediaQueries.map((item) => [item.mediaId, item]))
const stopWords = new Set(['artist', 'impression', 'public', 'domain', 'life', 'early', 'earth', 'geology', 'fossil', 'fossils', 'reconstruction', 'photo', 'image', 'computer'])

function words(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).filter((word) => word.length >= 4 && !stopWords.has(word))
}

function scoreCandidate(candidate, query) {
  const title = String(candidate.title || '').toLowerCase()
  const haystack = `${title} ${candidate.description || ''} ${candidate.categories || ''}`.toLowerCase()
  let score = candidate.queryIndex === 0 ? 38 : 20
  const reasons = [candidate.queryIndex === 0 ? '首选查询命中' : '备选查询命中']
  if (candidate.originalWidth >= 1200 && candidate.originalHeight >= 800) { score += 18; reasons.push('像素充足') }
  if (/public domain|cc0/i.test(candidate.license)) { score += 4; reasons.push('公共领域/CC0') }
  const scientificName = String(query.scientificName || '').toLowerCase()
  if (scientificName && title.includes(scientificName)) { score += 130; reasons.push('学名完整命中标题') }
  else if (scientificName) {
    const scientificWords = words(scientificName)
    const hit = scientificWords.filter((word) => haystack.includes(word)).length
    score += hit * 32
    if (hit) reasons.push(`学名词命中 ${hit}/${scientificWords.length}`)
  }
  const queryWords = words(candidate.query)
  const queryHits = queryWords.filter((word) => haystack.includes(word)).length
  score += queryHits * 11
  if (queryHits) reasons.push(`查询词命中 ${queryHits}/${queryWords.length}`)
  if (query.ownerType === 'creature' && /fossil|skull|skeleton|specimen|slab|cast|holotype/.test(haystack)) { score += 20; reasons.push('实物/化石证据') }
  if (/reconstruction|restoration|artist.?s impression|diorama|life recon/.test(haystack)) { score += 7; reasons.push('明确复原标识') }
  if (/\.pdf|\.djvu|\.ogv|logo|coat of arms|postage|stamp|coin|banknote|journal|magazine|encyclopedia/.test(title)) { score -= 260; reasons.push('文档/无关对象惩罚') }
  if (!String(candidate.author || '').trim()) { score -= 35; reasons.push('作者信息缺失') }
  return { score, reasons }
}

function inferMediaType(candidate) {
  const text = `${candidate.title || ''} ${candidate.description || ''}`.toLowerCase()
  if (/reconstruction|restoration|artist.?s impression|life recon|diorama|model of|statue/.test(text)) return 'reconstruction'
  if (/microscop|micrograph|thin section|sem image/.test(text)) return 'microscopy'
  if (/map|paleogeograph|palaeogeograph/.test(text)) return 'map'
  if (/diagram|chart|schematic|timeline|figure /.test(text)) return 'science-diagram'
  if (/manuscript|engraving|painting|illustration|mural|woodcut/.test(text)) return 'illustration'
  if (/fossil|skull|skeleton|bone|slab|trackway|stromatolite|ammonite|trilobite/.test(text)) return 'fossil-photo'
  if (/specimen|museum|exhibit|cast/.test(text)) return 'specimen'
  if (/factory|server|data center|printing press|archaeological site|ruins|cave/.test(text)) return 'historical-photo'
  return 'landscape'
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]))
}

const proposals = []
;(payload.groups || []).forEach((group) => {
  const query = queryById.get(group.mediaId)
  if (!query) return
  const ranked = (group.candidates || []).map((candidate) => Object.assign({}, candidate, scoreCandidate(candidate, query)))
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
  proposals.push({
    mediaId: group.mediaId,
    label: group.label,
    ownerType: query.ownerType,
    ownerId: query.ownerId,
    priority: query.priority,
    expectedRatio: query.expectedRatio,
    scientificName: query.scientificName || '',
    status: 'proposal-only',
    selectedCandidateId: ranked[0] ? ranked[0].id : '',
    proposedMediaType: ranked[0] ? inferMediaType(ranked[0]) : '',
    alternatives: ranked.slice(0, 4).map((candidate) => ({
      id: candidate.id,
      title: candidate.title,
      thumbnailUrl: candidate.thumbnailUrl,
      filePageUrl: candidate.filePageUrl,
      author: candidate.author,
      license: candidate.license,
      description: candidate.description,
      originalWidth: candidate.originalWidth,
      originalHeight: candidate.originalHeight,
      score: candidate.score,
      reasons: candidate.reasons,
      inferredMediaType: inferMediaType(candidate)
    }))
  })
})

fs.mkdirSync(path.dirname(proposalFile), { recursive: true })
fs.writeFileSync(proposalFile, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  notice: '本文件只是缩小人工审核范围的提案，不是批准记录，approve-media.js 不读取它。',
  proposals
}, null, 2)}\n`)

const sections = proposals.map((proposal) => `
  <section data-media-id="${escapeHtml(proposal.mediaId)}">
    <header><div><span>${escapeHtml(proposal.priority)}</span><h2>${escapeHtml(proposal.mediaId)}</h2><p>${escapeHtml(proposal.label)}</p></div><strong>仅提案，未批准</strong></header>
    <div class="grid">${proposal.alternatives.map((candidate, index) => `
      <article class="${index === 0 ? 'proposed' : ''}">
        <div class="visual"><img src="${escapeHtml(candidate.thumbnailUrl)}" alt="${escapeHtml(proposal.label)}候选图" loading="lazy"><b>${index === 0 ? '算法首选' : `备选 ${index + 1}`}</b></div>
        <code>${escapeHtml(candidate.id)}</code><h3>${escapeHtml(candidate.title)}</h3>
        <p>${escapeHtml(candidate.description).slice(0, 360)}</p>
        <dl><dt>作者</dt><dd>${escapeHtml(candidate.author)}</dd><dt>许可</dt><dd>${escapeHtml(candidate.license)}</dd><dt>类型</dt><dd>${escapeHtml(candidate.inferredMediaType)}</dd><dt>像素</dt><dd>${candidate.originalWidth} × ${candidate.originalHeight}</dd><dt>评分</dt><dd>${candidate.score}；${escapeHtml(candidate.reasons.join('｜'))}</dd></dl>
        <a href="${escapeHtml(candidate.filePageUrl)}" target="_blank" rel="noreferrer">打开 Commons 原始文件页</a>
      </article>`).join('')}</div>
  </section>`).join('')

const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>媒体候选短名单</title><style>
*{box-sizing:border-box}body{margin:0;padding:28px;background:#071217;color:#edf6f3;font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}main{max-width:1500px;margin:auto}h1{font-size:34px}section{margin:30px 0;padding:22px;border:1px solid #25414a;border-radius:18px;background:#0c1e25}header{display:flex;justify-content:space-between;gap:24px;align-items:start}header span{color:#8ed19a}header h2{margin:4px 0;font-size:22px}header p{margin:0;color:#9db2b3}header strong{color:#ffd480}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:18px}article{overflow:hidden;border:1px solid #28434b;border-radius:14px;background:#09171c}article.proposed{border:2px solid #78c789}.visual{position:relative;aspect-ratio:4/3;background:#020608}.visual img{width:100%;height:100%;object-fit:cover}.visual b{position:absolute;left:10px;top:10px;padding:5px 9px;border-radius:20px;background:#071217dd;color:#d9f4df}article>p,article>h3,article>code,article>dl,article>a{margin-left:14px;margin-right:14px}article h3{font-size:15px}article p{color:#aabcc0;max-height:7.8em;overflow:auto}code{display:block;margin-top:12px;color:#87c8d9;font-size:11px;word-break:break-all}dl{display:grid;grid-template-columns:46px 1fr;gap:4px 8px;font-size:12px}dt{color:#76949b}dd{margin:0;word-break:break-word}a{display:block;margin-bottom:16px;color:#8dd8ec}@media(max-width:1100px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:620px){body{padding:14px}.grid{grid-template-columns:1fr}header{display:block}}
</style></head><body><main><h1>地球编年史媒体候选短名单</h1><p>算法首选只用于缩小人工核对范围。任何候选都必须继续核对主体身份、时代、艺术复原属性、裁切和原始文件页；本页不会被入库脚本读取。</p>${sections}</main></body></html>`
fs.mkdirSync(path.dirname(reportFile), { recursive: true })
fs.writeFileSync(reportFile, html)
console.log(`Proposal groups: ${proposals.length}; missing: ${proposals.filter((item) => !item.selectedCandidateId).length}`)
console.log(`Written: ${path.relative(repoRoot, proposalFile)}`)
console.log(`Review: ${path.relative(repoRoot, reportFile)}`)
