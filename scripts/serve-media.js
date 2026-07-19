const http = require('http')
const fs = require('fs')
const path = require('path')

const repoRoot = path.resolve(__dirname, '..')
const allowedRoot = path.resolve(repoRoot, 'media/public')
const port = Number(process.env.MEDIA_PORT) || 4173
const mimes = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }

const server = http.createServer((request, response) => {
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
  response.writeHead(200, { 'content-type': mime, 'cache-control': 'public, max-age=3600', 'access-control-allow-origin': '*' })
  fs.createReadStream(file).pipe(response)
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Approved media server: http://127.0.0.1:${port}`)
  console.log('Keep this process running while previewing in WeChat DevTools.')
})
