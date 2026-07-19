const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const http = require('http')
const https = require('https')

const ALLOWED_LICENSE = /^(?:public domain|pd(?:-|$)|cc0|cc by(?:-sa)?(?: |-|$)|project-owned(?: |-|$))/i
const RASTER_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp'])

function cleanHtml(value) {
  return String(value || '')
    .replace(/<br\s*\/?>/gi, '；')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

function metadataValue(metadata, key) {
  return cleanHtml(metadata && metadata[key] && metadata[key].value)
}

function normalizeLicense(value) {
  const text = cleanHtml(value).replace(/Creative Commons/ig, 'CC').trim()
  if (/public domain|gemeinfrei|domaine public/i.test(text)) return 'Public Domain'
  if (/\bcc0\b/i.test(text)) return 'CC0'
  const match = text.match(/CC\s*BY(?:-SA)?(?:\s*[0-9.]+)?/i)
  return match ? match[0].toUpperCase().replace(/\s+/g, ' ') : text
}

function licenseAllowed(value) {
  return ALLOWED_LICENSE.test(normalizeLicense(value))
}

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')
}

function extensionForMime(mime) {
  return { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' }[mime] || ''
}

function readImageInfo(file) {
  const buffer = fs.readFileSync(file)
  let mime = ''
  let width = 0
  let height = 0

  if (buffer.length >= 24 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    mime = 'image/png'
    width = buffer.readUInt32BE(16)
    height = buffer.readUInt32BE(20)
  } else if (buffer.length >= 12 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    mime = 'image/jpeg'
    let offset = 2
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) { offset += 1; continue }
      const marker = buffer[offset + 1]
      if (marker === 0xd8 || marker === 0xd9) { offset += 2; continue }
      const length = buffer.readUInt16BE(offset + 2)
      if (length < 2 || offset + length + 2 > buffer.length) break
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        height = buffer.readUInt16BE(offset + 5)
        width = buffer.readUInt16BE(offset + 7)
        break
      }
      offset += length + 2
    }
  } else if (buffer.length >= 30 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    mime = 'image/webp'
    const chunk = buffer.toString('ascii', 12, 16)
    if (chunk === 'VP8X') {
      width = 1 + buffer.readUIntLE(24, 3)
      height = 1 + buffer.readUIntLE(27, 3)
    } else if (chunk === 'VP8 ') {
      const start = 20
      if (buffer[start + 3] === 0x9d && buffer[start + 4] === 0x01 && buffer[start + 5] === 0x2a) {
        width = buffer.readUInt16LE(start + 6) & 0x3fff
        height = buffer.readUInt16LE(start + 8) & 0x3fff
      }
    } else if (chunk === 'VP8L' && buffer[20] === 0x2f) {
      const bits = buffer.readUInt32LE(21)
      width = (bits & 0x3fff) + 1
      height = ((bits >> 14) & 0x3fff) + 1
    }
  }

  return { file, mime, width, height, bytes: buffer.length, sha256: crypto.createHash('sha256').update(buffer).digest('hex') }
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function safeSlug(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '')
}

function relativePosix(from, to) {
  return path.relative(from, to).split(path.sep).join('/')
}

function requestBuffer(url, options, redirectCount) {
  const redirects = redirectCount || 0
  if (redirects > 8) return Promise.reject(new Error(`Too many redirects: ${url}`))
  return new Promise((resolve, reject) => {
    const client = /^https:/i.test(url) ? https : http
    const request = client.get(url, Object.assign({
      headers: { 'user-agent': 'earth-chronicle-media-tools/1.0 (educational project)' }
    }, options || {}), (response) => {
      const status = response.statusCode || 0
      if (status >= 300 && status < 400 && response.headers.location) {
        response.resume()
        const target = new URL(response.headers.location, url).toString()
        requestBuffer(target, options, redirects + 1).then(resolve, reject)
        return
      }
      const chunks = []
      response.on('data', (chunk) => chunks.push(chunk))
      response.on('end', () => {
        const body = Buffer.concat(chunks)
        if (status < 200 || status >= 300) {
          const error = new Error(`${status} ${response.statusMessage || ''}: ${body.toString('utf8', 0, 300)}`)
          error.status = status
          error.headers = response.headers
          reject(error)
          return
        }
        resolve({ body, headers: response.headers, status, finalUrl: url })
      })
    })
    request.setTimeout(45000, () => request.destroy(new Error(`Request timeout: ${url}`)))
    request.on('error', reject)
  })
}

async function requestJson(url, options) {
  const response = await requestBuffer(url, options)
  try {
    return JSON.parse(response.body.toString('utf8'))
  } catch (error) {
    throw new Error(`Invalid JSON from ${url}: ${error.message}`)
  }
}

module.exports = {
  ALLOWED_LICENSE,
  RASTER_MIMES,
  cleanHtml,
  metadataValue,
  normalizeLicense,
  licenseAllowed,
  sha256,
  extensionForMime,
  readImageInfo,
  ensureDir,
  safeSlug,
  relativePosix,
  requestBuffer,
  requestJson
}
