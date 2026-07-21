const precambrian = require('./precambrian')
const paleozoic = require('./paleozoic')
const mesozoic = require('./mesozoic')
const cenozoic = require('./cenozoic')

module.exports = [].concat(precambrian, paleozoic, mesozoic, cenozoic)
