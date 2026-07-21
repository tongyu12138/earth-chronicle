const https = require('https')
const fs = require('fs')
const path = require('path')

const repoRoot = path.resolve(__dirname, '..')
const allowedRoot = path.resolve(repoRoot, 'media/public')
const originValue = String(process.env.MEDIA_HTTPS_ORIGIN || '').trim()
const certificateFile = process.env.MEDIA_HTTPS_CERT
const keyFile = process.env.MEDIA_HTTPS_KEY
const bindHost = process.env.MEDIA_HTTPS_BIND || '127.0.0.1'
const mimes = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }

function stop(message) {
  console.error(message)
  console.error('Example: MEDIA_HTTPS_ORIGIN=https://media.example.com:4173 MEDIA_HTTPS_CERT=/path/fullchain.pem MEDIA_HTTPS_KEY=/path/privkey.pem node scripts/serve-media.js')
  process.exit(1)
}

let origin
try {
  origin = new URL(originValue)
} catch (error) {
  stop('MEDIA_HTTPS_ORIGIN must be an explicit trusted HTTPS origin.')
}
if (origin.protocol !== 'https:') stop('MEDIA_HTTPS_ORIGIN must use HTTPS; HTTP media servers are not supported.')
if (['127.0.0.1', 'localhost', '::1'].includes(origin.hostname)) {
  stop('MEDIA_HTTPS_ORIGIN must use a trusted certificate hostname, not a loopback HTTP-style origin.')
}
if (!certificateFile || !keyFile) stop('MEDIA_HTTPS_CERT and MEDIA_HTTPS_KEY are required.')

const port = Number(origin.port) || 443
const tls = {
  cert: fs.readFileSync(path.resolve(certificateFile)),
  key: fs.readFileSync(path.resolve(keyFile))
}

const server = https.createServer(tls, (request, response) => {
  const pathname = decodeURIComponent(String(request.url || '').split('?')[0])
  if (!pathname.startsWith('/media/public/')) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    response.end('Only approved media is served.')
    return
  }
  const file = path.resolve(repoRoot, `.${pathname}`)
  if (!file.startsWith(`${allowedRoot}${path.sep}`) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    response.end('Media not found.')
    return
  }
  const mime = mimes[path.extname(file).toLowerCase()]
  if (!mime) {
    response.writeHead(415, { 'content-type': 'text/plain; charset=utf-8' })
    response.end('Unsupported media type.')
    return
  }
  response.writeHead(200, {
    'content-type': mime,
    'cache-control': 'public, max-age=3600',
    'access-control-allow-origin': '*'
  })
  fs.createReadStream(file).pipe(response)
})

server.listen(port, bindHost, () => {
  console.log(`Optional approved HTTPS media server: ${origin.origin}`)
  console.log(`Bound to ${bindHost}:${port}; only media/public is available.`)
  console.log('The certificate hostname must be trusted by the device and configured as a legal media/download domain in WeChat.')
})
