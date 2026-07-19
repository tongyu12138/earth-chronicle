const { execFile } = require('child_process')
const fs = require('fs')
const path = require('path')
const { sources } = require('../data/creature-knowledge/sources')

const concurrency = 10
const queue = sources.slice()
const results = []

function check(source) {
  return new Promise((resolve) => {
    execFile('curl', [
      '-L', '--silent', '--show-error', '--output', '/dev/null', '--max-time', '18',
      '--connect-timeout', '7', '--retry', '1', '--user-agent', 'EarthChronicleSourceAudit/1.0',
      '--write-out', '%{http_code}', source.url
    ], { timeout: 25000 }, (error, stdout, stderr) => {
      const status = Number(String(stdout || '').trim().slice(-3)) || 0
      const reachable = (status >= 200 && status < 400) || [401, 403, 405, 429].includes(status)
      resolve({ id: source.id, url: source.url, status, reachable, error: reachable ? '' : String(stderr || (error && error.message) || '').trim().slice(0, 160) })
    })
  })
}

async function worker() {
  while (queue.length) {
    const source = queue.shift()
    const result = await check(source)
    results.push(result)
    process.stdout.write(`${result.reachable ? '✓' : '×'} ${result.status || 'ERR'} ${source.id}\n`)
  }
}

async function main() {
  await Promise.all(Array.from({ length: concurrency }, worker))
  results.sort((left, right) => left.id.localeCompare(right.id))
  const failed = results.filter((item) => !item.reachable)
  const report = [
    '# 科学来源URL可达性报告', '',
    `- 检查时间：${new Date().toISOString()}`,
    `- URL总数：${results.length}`,
    `- 可达或受访问控制：${results.length - failed.length}`,
    `- 失败：${failed.length}`,
    '', '## 失败地址', '',
    failed.length ? failed.map((item) => `- ${item.id} · HTTP ${item.status || 'ERR'} · ${item.url}${item.error ? ` · ${item.error}` : ''}`).join('\n') : '- 无',
    '', '## 判定规则', '',
    '- HTTP 2xx/3xx 视为可达。',
    '- 401/403/405/429 表示服务器存在但限制自动访问，标记为“受访问控制”，需要人工打开抽查。',
    '- 404、5xx、DNS或连接超时视为失败。'
  ].join('\n')
  fs.writeFileSync(path.join(__dirname, '..', 'reports', 'source-url-check.md'), `${report}\n`)
  console.log(`Source URL check: ${results.length - failed.length}/${results.length} reachable; ${failed.length} failed`)
  if (failed.length) process.exit(1)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
