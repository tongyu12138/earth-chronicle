const fs = require('fs')
const path = require('path')

const repoRoot = path.resolve(__dirname, '..')
const project = JSON.parse(fs.readFileSync(path.join(repoRoot, 'project.config.json'), 'utf8'))
const reportFile = path.join(repoRoot, 'reports/package-size.md')
const checkOnly = process.argv.includes('--check')
const ignoredFolders = new Set(['.git', 'node_modules', 'miniprogram_npm'])
const ignoredFiles = new Set(['project.private.config.json', '.DS_Store'])

;(project.packOptions && project.packOptions.ignore || []).forEach((rule) => {
  if (rule.type === 'folder') ignoredFolders.add(rule.value.replace(/^\.\//, '').replace(/\/$/, ''))
  if (rule.type === 'file') ignoredFiles.add(rule.value.replace(/^\.\//, ''))
})

function walk(directory, relative) {
  const rows = []
  fs.readdirSync(directory, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name)).forEach((entry) => {
    const itemRelative = relative ? `${relative}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      if (ignoredFolders.has(itemRelative) || ignoredFolders.has(entry.name) || itemRelative.startsWith('.git/')) return
      rows.push(...walk(path.join(directory, entry.name), itemRelative))
      return
    }
    if (ignoredFiles.has(itemRelative) || ignoredFiles.has(entry.name)) return
    const stat = fs.statSync(path.join(directory, entry.name))
    rows.push({ file: itemRelative, bytes: stat.size })
  })
  return rows
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`
}

function bucket(file) {
  const head = file.split('/')[0]
  return file.includes('/') ? `${head}/` : '根目录'
}

const files = walk(repoRoot, '')
const total = files.reduce((sum, item) => sum + item.bytes, 0)
const buckets = {}
files.forEach((item) => { buckets[bucket(item.file)] = (buckets[bucket(item.file)] || 0) + item.bytes })
const largest = files.slice().sort((left, right) => right.bytes - left.bytes).slice(0, 20)
const report = [
  '# 微信小程序主包静态估算', '',
  '> 本报告按 `project.config.json` 的 `packOptions.ignore` 计算静态文件；最终上传大小以微信开发者工具“代码依赖分析 / 包体积”为准。', '',
  `- 估算打包文件：${files.length} 个`,
  `- 估算未压缩总大小：${formatBytes(total)}（${total} bytes）`,
  `- 高清媒体目录是否进入主包：${files.some((item) => item.file.startsWith('media/')) ? '是（需修复）' : '否'}`, '',
  '## 按目录统计', '',
  '| 目录 | 大小 |', '| --- | ---: |',
  ...Object.entries(buckets).sort((left, right) => right[1] - left[1]).map(([name, bytes]) => `| ${name} | ${formatBytes(bytes)} |`), '',
  '## 最大文件', '',
  '| 文件 | 大小 |', '| --- | ---: |',
  ...largest.map((item) => `| \`${item.file}\` | ${formatBytes(item.bytes)} |`)
].join('\n')

if (checkOnly) {
  const current = fs.existsSync(reportFile) ? fs.readFileSync(reportFile, 'utf8') : ''
  if (current !== `${report}\n`) {
    console.error('Package size report is stale. Run node scripts/report-package-size.js')
    process.exit(1)
  }
  console.log(`Package size report is current: ${formatBytes(total)}`)
} else {
  fs.mkdirSync(path.dirname(reportFile), { recursive: true })
  fs.writeFileSync(reportFile, `${report}\n`)
  console.log(`Package size estimate: ${formatBytes(total)} across ${files.length} files`)
  console.log(`Written: ${path.relative(repoRoot, reportFile)}`)
}
