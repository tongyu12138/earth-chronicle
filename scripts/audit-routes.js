const fs = require('fs')
const path = require('path')
const { periods, getPeriodById } = require('../data/periods')
const { events, getEventById } = require('../data/events')
const { creatures, getCreatureById } = require('../data/creatures')

const root = path.resolve(__dirname, '..')
const problems = []
const warnings = []

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8')
}

let app
try {
  app = JSON.parse(read('app.json'))
} catch (error) {
  console.error(`app.json is invalid JSON: ${error.message}`)
  process.exit(1)
}

const mainPages = Array.isArray(app.pages) ? app.pages : []
const subPages = (app.subpackages || app.subPackages || []).reduce((list, pack) => {
  return list.concat((pack.pages || []).map((page) => `${pack.root.replace(/\/$/, '')}/${page.replace(/^\//, '')}`))
}, [])
const registeredPages = mainPages.concat(subPages)
const pageSet = new Set(registeredPages)
if (pageSet.size !== registeredPages.length) problems.push('app.json contains duplicate page paths')

registeredPages.forEach((page) => {
  ;['js', 'wxml'].forEach((extension) => {
    if (!fs.existsSync(path.join(root, `${page}.${extension}`))) problems.push(`${page}.${extension} is missing`)
  })
  ;['json', 'wxss'].forEach((extension) => {
    if (!fs.existsSync(path.join(root, `${page}.${extension}`))) warnings.push(`${page}.${extension} is missing (optional)`)
  })
})

global.wx = {
  getStorageSync() { return '' }, setStorageSync() {}, removeStorageSync() {},
  showToast() {}, setNavigationBarTitle() {}, setClipboardData() {}, pageScrollTo() {},
  navigateBack() {}, previewImage() {}, getAccountInfoSync() { return { miniProgram: { envVersion: 'develop' } } }
}
global.getCurrentPages = () => []

function loadPageDefinition(page) {
  const modulePath = path.join(root, `${page}.js`)
  let definition = null
  global.Page = (value) => { definition = value }
  delete require.cache[require.resolve(modulePath)]
  require(modulePath)
  if (!definition) problems.push(`${page}.js did not register Page({...})`)
  return definition
}

function pageContext(definition) {
  const context = Object.assign({}, definition)
  context.data = JSON.parse(JSON.stringify(definition.data || {}))
  context.setData = function setData(patch) { Object.assign(this.data, patch || {}) }
  return context
}

const pageDefinitions = registeredPages.reduce((map, page) => {
  map[page] = loadPageDefinition(page)
  return map
}, {})

function smokeLoad(page, options) {
  const definition = pageDefinitions[page]
  if (!definition || typeof definition.onLoad !== 'function') return
  try {
    definition.onLoad.call(pageContext(definition), options || {})
  } catch (error) {
    problems.push(`${page} onLoad smoke failed: ${error.message}`)
  }
}

smokeLoad('pages/science/index')
smokeLoad('pages/quiz/index')
smokeLoad('pages/search/index')
smokeLoad('pages/creatures/index')
periods.forEach((period) => smokeLoad('pages/period/index', { id: period.id }))
events.forEach((event) => smokeLoad('pages/detail/index', { id: event.id }))
creatures.forEach((creature) => smokeLoad('pages/creature-detail/index', { id: creature.id }))

const tabPages = ((app.tabBar && app.tabBar.list) || []).map((item) => item.pagePath)
;['pages/science/index', 'pages/quiz/index'].forEach((page) => {
  if (!tabPages.includes(page)) problems.push(`${page} must be registered in tabBar`)
  if (!mainPages.includes(page)) problems.push(`${page} must remain in the main package`)
})
tabPages.forEach((page) => {
  if (!mainPages.includes(page)) problems.push(`Tab page is not in main package: ${page}`)
})

function handlerNames(wxml) {
  const names = []
  const pattern = /\b(?:bind|catch)(?:tap|input|error|load|change|submit|confirm|ready|longpress)\s*=\s*["']([A-Za-z_$][\w$]*)["']/g
  let match
  while ((match = pattern.exec(wxml))) names.push(match[1])
  return names
}

registeredPages.forEach((page) => {
  const jsPath = path.join(root, `${page}.js`)
  const wxmlPath = path.join(root, `${page}.wxml`)
  if (!fs.existsSync(jsPath) || !fs.existsSync(wxmlPath)) return
  const js = fs.readFileSync(jsPath, 'utf8')
  const wxml = fs.readFileSync(wxmlPath, 'utf8')
  handlerNames(wxml).forEach((handler) => {
    const definition = pageDefinitions[page]
    if (!definition || typeof definition[handler] !== 'function') problems.push(`${page}.wxml binds missing handler: ${handler}`)
  })
})

const componentDirectory = path.join(root, 'components')
if (fs.existsSync(componentDirectory)) {
  fs.readdirSync(componentDirectory).forEach((name) => {
    const wxmlPath = path.join(componentDirectory, name, 'index.wxml')
    const jsPath = path.join(componentDirectory, name, 'index.js')
    if (!fs.existsSync(wxmlPath) || !fs.existsSync(jsPath)) return
    let definition = null
    global.Component = (value) => { definition = value }
    delete require.cache[require.resolve(jsPath)]
    require(jsPath)
    handlerNames(fs.readFileSync(wxmlPath, 'utf8')).forEach((handler) => {
      if (!definition || !definition.methods || typeof definition.methods[handler] !== 'function') {
        problems.push(`components/${name}/index.wxml binds missing handler: ${handler}`)
      }
    })
  })
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).reduce((files, entry) => {
    if (entry.name === '.git' || entry.name === 'node_modules') return files
    const full = path.join(directory, entry.name)
    return entry.isDirectory() ? files.concat(walk(full)) : files.concat(full)
  }, [])
}

const codeFiles = walk(root).filter((file) => /\.(js|wxml)$/.test(file) && !file.includes(`${path.sep}scripts${path.sep}`))
const routePattern = /["'`]\/(pages|packages)\/[A-Za-z0-9_/-]+\/index/g
codeFiles.forEach((file) => {
  const source = fs.readFileSync(file, 'utf8')
  const matches = source.match(routePattern) || []
  matches.forEach((literal) => {
    const route = literal.slice(2)
    if (!pageSet.has(route)) problems.push(`${path.relative(root, file)} targets unregistered page: /${route}`)
  })
  if (source.includes('/pages/event/index')) problems.push(`${path.relative(root, file)} still references removed event redirect page`)
})

if (periods.length !== 29) problems.push(`Expected 29 periods, received ${periods.length}`)
if (events.length !== 61) problems.push(`Expected 61 events, received ${events.length}`)
if (creatures.length !== 110) problems.push(`Expected 110 creatures, received ${creatures.length}`)
periods.forEach((period) => {
  if (getPeriodById(period.id) !== period) problems.push(`getPeriodById failed for ${period.id}`)
  period.eventIds.forEach((id) => { if (!getEventById(id)) problems.push(`${period.id} references missing event ${id}`) })
  period.creatureIds.forEach((id) => { if (!getCreatureById(id)) problems.push(`${period.id} references missing creature ${id}`) })
})
events.forEach((event) => { if (getEventById(event.id) !== event) problems.push(`getEventById failed for ${event.id}`) })
creatures.forEach((creature) => { if (getCreatureById(creature.id) !== creature) problems.push(`getCreatureById failed for ${creature.id}`) })

const expectedShareRoutes = ['/pages/science/index', '/pages/quiz/index', '/pages/period/index', '/pages/detail/index', '/pages/creatures/index', '/pages/creature-detail/index', '/pages/quiz-result/index', '/pages/timeline/index']
expectedShareRoutes.forEach((route) => {
  if (!pageSet.has(route.slice(1))) problems.push(`Share/recent route is not registered: ${route}`)
})

console.log(`Registered pages: ${registeredPages.length}; main package: ${mainPages.length}; subpackage: ${subPages.length}`)
console.log(`Tab pages: ${tabPages.join(', ')}`)
console.log(`Route targets scanned in ${codeFiles.length} source files`)
console.log(`ID lookup checks: ${periods.length} periods, ${events.length} events, ${creatures.length} creatures`)
console.log(`onLoad smoke: ${periods.length} period + ${events.length} event + ${creatures.length} creature detail IDs`)
warnings.forEach((warning) => console.warn(`Warning: ${warning}`))
if (problems.length) {
  console.error(problems.join('\n'))
  process.exit(1)
}
console.log('Route audit passed')
