const fs = require('fs')
const path = require('path')
const { paleoTypes } = require('../data/paleo-types')
const { quizProfiles } = require('../data/quiz-profiles')

const root = path.join(__dirname, '..')
const errors = []
const fail = (message) => errors.push(message)
const uniqueCount = (values) => new Set(values).size

if (paleoTypes.length !== 16) fail(`PaleoCode 应为16型，当前${paleoTypes.length}型`)
if (uniqueCount(paleoTypes.map((item) => item.code)) !== 16) fail('PaleoCode 编码不唯一')
if (quizProfiles.length !== 60) fail(`正式结果应为60种，当前${quizProfiles.length}种`)

const typeCounts = paleoTypes.reduce((map, item) => Object.assign(map, { [item.code]: 0 }), {})
const forbiddenStrategy = /牙齿与椎体认识|体长模型更新|化石保存不足|科学家如何认识|主要由.{0,12}(化石|牙齿|椎体|模型).{0,12}认识/
const boundaryLanguage = /不能|未知|未必|仍|限制|不确定|争议|尚无|缺少|不等于|不自动|不是|没有|很少|会随|无法/
const anthropomorphicClaims = /它(喜欢|讨厌|害怕|懒惰|勇敢|社恐|外向|内向)|古生物.{0,6}(性格|人格)|和你一样.{0,8}(想|爱|怕)/

quizProfiles.forEach((profile) => {
  if (!Object.prototype.hasOwnProperty.call(typeCounts, profile.paleoTypeCode)) fail(`${profile.id} 使用未知 PaleoCode：${profile.paleoTypeCode}`)
  else typeCounts[profile.paleoTypeCode] += 1
  if (profile.curationStatus !== 'manual') fail(`${profile.id} 不是人工策展结果`)
  if (!profile.resultTitle || !profile.oneLineIdentity) fail(`${profile.id} 缺少独立标题或一句话身份`)
  if (forbiddenStrategy.test(profile.creatureStrategy || '')) fail(`${profile.id} 把证据状态写成古生物生存策略`)
  if (!boundaryLanguage.test(profile.evidenceBoundary || '')) fail(`${profile.id} 的证据边界没有明确限制语气`)
  if (anthropomorphicClaims.test(profile.sharedMechanism || '')) fail(`${profile.id} 的共同机制把古生物人格化`)
  if (!profile.matchExplanation || !Object.prototype.hasOwnProperty.call(profile.matchExplanation, 'userEvidence')) fail(`${profile.id} 缺少结构化 userEvidence`)
  if (!profile.comparisonNotes || !profile.comparisonNotes.shared || !profile.comparisonNotes.difference) fail(`${profile.id} 缺少相近结果的共同点或差异点`)
})

const counts = Object.values(typeCounts)
if (counts.some((count) => count === 0)) fail(`存在没有正式结果的 PaleoCode：${Object.keys(typeCounts).filter((code) => !typeCounts[code]).join('、')}`)
if (Math.max(...counts) - Math.min(...counts) > 2) fail(`16型分布不均衡：最少${Math.min(...counts)}，最多${Math.max(...counts)}`)
if (uniqueCount(quizProfiles.map((item) => item.resultTitle)) !== 60) fail('resultTitle 不是60条唯一文案')
if (uniqueCount(quizProfiles.map((item) => item.oneLineIdentity)) !== 60) fail('oneLineIdentity 不是60条唯一文案')

const megalodon = quizProfiles.find((item) => item.id === 'megalodon')
if (!megalodon) fail('缺少巨齿鲨正式结果')
else if (forbiddenStrategy.test(megalodon.creatureStrategy || '')) fail('巨齿鲨仍把牙齿、椎体或体长模型当作生态策略')

const profileSource = fs.readFileSync(path.join(root, 'data/quiz-profiles.js'), 'utf8')
const resultJs = fs.readFileSync(path.join(root, 'pages/quiz-result/index.js'), 'utf8')
const resultWxml = fs.readFileSync(path.join(root, 'pages/quiz-result/index.wxml'), 'utf8')
const resultWxss = fs.readFileSync(path.join(root, 'pages/quiz-result/index.wxss'), 'utf8')

if (/summaryOpeners|scienceBridges|summaryClosers|modernRoles/.test(profileSource)) fail('旧式可见文案生成器仍存在')
if (!/topContributingQuestions/.test(resultJs) || !/selectedOptionText/.test(resultJs) || !/questionNumber/.test(resultJs)) fail('userEvidence 没有从真实答题记录生成')
if (!/共同：/.test(resultJs) || !/区别：/.test(resultJs)) fail('相近结果卡没有共同点与差异点')
if (/matchReasons|profileBars|showFullProfile|result-bars/.test(resultJs + resultWxml)) fail('结果页仍暴露旧式理由或完整14维模型')
if (/\{\{\s*match\s*\}\}\s*%|相似度\s*\{\{\s*match/.test(resultWxml.replace(/calculation-section[\s\S]*/, ''))) fail('默认首屏仍突出内部相似度数字')
if (!/娱乐相似度/.test(resultWxml) || !/showCalculation/.test(resultWxml)) fail('娱乐分没有收进可展开的计算说明')
if ((resultWxml.match(/class="[^"]*result-section/g) || []).length > 6) fail('结果页主卡片层级过多')
if (/result-section[\s\S]{0,160}result-section/.test(resultWxml)) fail('结果页出现主卡片嵌套')

const smallFonts = [...resultWxss.matchAll(/font-size:\s*(1\d)rpx/g)].map((match) => Number(match[1]))
if (smallFonts.length) fail(`结果页存在小于20rpx的文字：${[...new Set(smallFonts)].join('、')}rpx`)

const report = [
  '# 结果语义质量报告', '',
  `- PaleoCode 类型：${paleoTypes.length}`,
  `- 人工策展结果：${quizProfiles.filter((item) => item.curationStatus === 'manual').length} / ${quizProfiles.length}`,
  `- 类型分布：${Object.entries(typeCounts).map(([code, count]) => `${code} ${count}`).join('；')}`,
  `- 分布极差：${Math.max(...counts) - Math.min(...counts)}`,
  `- 唯一结果标题：${uniqueCount(quizProfiles.map((item) => item.resultTitle))}`,
  `- 唯一一句话身份：${uniqueCount(quizProfiles.map((item) => item.oneLineIdentity))}`,
  '', '## 语义边界', '',
  '- PaleoCode 只由探索、节奏、协作与应对四组轴生成；环境亲和只参与同型物种排序。',
  '- 用户依据从真实题号与选项原文生成，分享卡不会泄漏好友答题记录。',
  '- 古生物策略、共同机制和证据边界分栏呈现，不把古生物写成人类人格。',
  '- 巨齿鲨回归检查禁止把牙齿、椎体、体长模型或化石保存状态误写成生态策略。',
  '- 默认页不展示完整14维，只在计算说明中显示四组汇总与娱乐分。',
  '', '## 自动检查', '',
  errors.length ? errors.map((item) => `- ❌ ${item}`).join('\n') : '- ✅ 全部通过'
].join('\n')
fs.writeFileSync(path.join(root, 'reports/result-semantic-quality.md'), `${report}\n`)

console.log(`PaleoCode ${paleoTypes.length}; results ${quizProfiles.length}; distribution ${Math.min(...counts)}-${Math.max(...counts)}`)
if (errors.length) {
  console.error(errors.map((item) => `- ${item}`).join('\n'))
  process.exit(1)
}
console.log('Result semantics validation passed')
