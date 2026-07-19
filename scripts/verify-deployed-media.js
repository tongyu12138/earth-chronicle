const https = require('https')
const { mediaCatalog } = require('../data/media-catalog')
const { MEDIA_BASE_URLS } = require('../config/media')

const baseFlag = process.argv.indexOf('--base-url')
const baseUrl = String(
  process.env.MEDIA_PUBLIC_BASE_URL ||
  (baseFlag >= 0 ? process.argv[baseFlag + 1] : '') ||
  MEDIA_BASE_URLS.release ||
  ''
).replace(/\/$/, '')
const concurrency = Math.max(1, Math.min(24, Number(process.env.MEDIA_VERIFY_CONCURRENCY) || 12))
const attempts = Math.max(1, Math.min(5, Number(process.env.MEDIA_VERIFY_ATTEMPTS) || 3))
const timeoutMs = Math.max(1000, Number(process.env.MEDIA_VERIFY_TIMEOUT_MS) || 15000)

if (!/^https:\/\//i.test(baseUrl)) {
  console.error(`MEDIA_PUBLIC_BASE_URL must be HTTPS: ${baseUrl || '(empty)'}`)
  process.exit(1)
}

const paths = [...new Set(mediaCatalog
  .filter((item) => item.status === 'ready')
  .reduce((items, item) => items.concat(item.imageUrl, item.thumbnailUrl), [])
  .map((value) => String(value || '').replace(/^\/+/, ''))
  .filter(Boolean))]

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function probe(url, redirects) {
  return new Promise((resolve, reject) => {
    const request = https.request(url, {
      method: 'HEAD',
      headers: { 'user-agent': 'earth-chronicle-media-verifier/1.0', accept: 'image/*' }
    }, (response) => {
      const status = Number(response.statusCode) || 0
      const location = response.headers.location
      response.resume()
      if (status >= 300 && status < 400 && location && redirects < 4) {
        resolve(probe(new URL(location, url).toString(), redirects + 1))
        return
      }
      const contentType = String(response.headers['content-type'] || '').toLowerCase()
      if (status < 200 || status >= 300) {
        reject(new Error(`HTTP ${status}`))
        return
      }
      if (!contentType.startsWith('image/')) {
        reject(new Error(`unexpected content-type ${contentType || '(empty)'}`))
        return
      }
      resolve({ status, contentType })
    })
    request.setTimeout(timeoutMs, () => request.destroy(new Error(`timeout after ${timeoutMs}ms`)))
    request.on('error', reject)
    request.end()
  })
}

async function verify(relativePath) {
  const url = `${baseUrl}/${relativePath}`
  let lastError
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await probe(url, 0)
      return null
    } catch (error) {
      lastError = error
      if (attempt < attempts) await delay(attempt * 1000)
    }
  }
  return `${relativePath}: ${lastError ? lastError.message : 'unknown error'}`
}

async function main() {
  let cursor = 0
  let completed = 0
  const failures = []
  async function worker() {
    while (cursor < paths.length) {
      const current = paths[cursor]
      cursor += 1
      const failure = await verify(current)
      completed += 1
      if (failure) failures.push(failure)
      if (completed % 50 === 0 || completed === paths.length) console.log(`Verified ${completed}/${paths.length}`)
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, paths.length) }, worker))
  if (failures.length) {
    failures.forEach((failure) => console.error(failure))
    console.error(`Deployed media verification failed: ${failures.length}/${paths.length}`)
    process.exit(1)
  }
  console.log(`Deployed media verification passed: ${paths.length}/${paths.length} at ${baseUrl}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
