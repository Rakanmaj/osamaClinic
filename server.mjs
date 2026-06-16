import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, relative } from 'node:path'
import { createBrotliCompress, createGzip } from 'node:zlib'

const port = Number(process.env.PORT || 4173)
const root = join(process.cwd(), 'dist')
const indexFile = join(root, 'index.html')
let isShuttingDown = false

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
}

const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "base-uri 'self'",
    "connect-src 'self'",
    "font-src 'self' https://fonts.gstatic.com",
    "frame-src https://maps.google.com https://www.google.com",
    "img-src 'self' data: https:",
    "object-src 'none'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "upgrade-insecure-requests",
  ].join('; '),
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), microphone=(), payment=(), usb=(), geolocation=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Permitted-Cross-Domain-Policies': 'none',
}

function writeJson(response, status, payload, extraHeaders = {}) {
  response.writeHead(status, {
    ...securityHeaders,
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    ...extraHeaders,
  })
  response.end(JSON.stringify(payload))
}

function isInsideRoot(filePath) {
  const pathFromRoot = relative(root, filePath)
  return pathFromRoot === '' || (
    !pathFromRoot.startsWith('..') &&
    !pathFromRoot.startsWith('/') &&
    !pathFromRoot.startsWith('\\')
  )
}

function safeFilePath(pathname) {
  let decodedPath

  try {
    decodedPath = decodeURIComponent(pathname)
  } catch {
    return null
  }

  const cleanPath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, '')
  const filePath = join(root, cleanPath)
  return isInsideRoot(filePath) ? filePath : null
}

function getCacheControl(filePath) {
  const normalizedPath = filePath.replaceAll('\\', '/')

  if (normalizedPath.includes('/assets/')) {
    return 'public, max-age=31536000, immutable'
  }

  if (extname(filePath).toLowerCase() === '.html') {
    return 'no-cache, no-store, must-revalidate'
  }

  return 'public, max-age=86400, stale-while-revalidate=604800'
}

function getCompression(request, filePath) {
  const type = types[extname(filePath).toLowerCase()] || ''
  const accepts = request.headers['accept-encoding'] || ''
  const compressible = /text|javascript|json|svg/.test(type)

  if (!compressible) return null
  if (accepts.includes('br')) return { encoding: 'br', stream: createBrotliCompress() }
  if (accepts.includes('gzip')) return { encoding: 'gzip', stream: createGzip() }
  return null
}

function sendFile(request, response, filePath, status = 200) {
  const type = types[extname(filePath).toLowerCase()] || 'application/octet-stream'
  const compression = getCompression(request, filePath)

  response.writeHead(status, {
    ...securityHeaders,
    'Cache-Control': getCacheControl(filePath),
    'Content-Type': type,
    'Vary': compression ? 'Accept-Encoding' : 'Accept-Encoding',
    ...(compression ? { 'Content-Encoding': compression.encoding } : {}),
  })

  if (request.method === 'HEAD') {
    response.end()
    return
  }

  const fileStream = createReadStream(filePath)

  fileStream.on('error', (error) => {
    console.error('Static file stream failed:', error)
    if (!response.headersSent) {
      response.writeHead(500, securityHeaders)
    }
    response.end('Internal Server Error')
  })

  if (compression) {
    fileStream.pipe(compression.stream).pipe(response)
    return
  }

  fileStream.pipe(response)
}

function handleStaticRequest(request, response) {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`)

  if (url.pathname === '/healthz' || url.pathname === '/readyz') {
    writeJson(response, isShuttingDown ? 503 : 200, {
      ok: !isShuttingDown,
      service: 'rakeez-clinic',
      uptime: Math.round(process.uptime()),
    })
    return
  }

  if (!['GET', 'HEAD'].includes(request.method || 'GET')) {
    response.writeHead(405, {
      ...securityHeaders,
      Allow: 'GET, HEAD',
      'Cache-Control': 'no-store',
      'Content-Type': 'text/plain; charset=utf-8',
    })
    response.end('Method Not Allowed')
    return
  }

  const filePath = safeFilePath(url.pathname)

  if (!filePath) {
    response.writeHead(403, securityHeaders)
    response.end('Forbidden')
    return
  }

  if (url.pathname.includes('/.') || filePath.includes(`${root}.`)) {
    response.writeHead(404, securityHeaders)
    response.end('Not Found')
    return
  }

  let resolvedFile = filePath

  if (existsSync(resolvedFile) && statSync(resolvedFile).isDirectory()) {
    resolvedFile = join(resolvedFile, 'index.html')
  }

  if (existsSync(resolvedFile) && statSync(resolvedFile).isFile()) {
    sendFile(request, response, resolvedFile)
    return
  }

  if (existsSync(indexFile)) {
    sendFile(request, response, indexFile)
    return
  }

  writeJson(response, 503, {
    ok: false,
    error: 'Build output is missing. Run npm run build before starting the server.',
  })
}

const server = createServer((request, response) => {
  try {
    handleStaticRequest(request, response)
  } catch (error) {
    console.error('Request failed:', error)
    if (!response.headersSent) {
      response.writeHead(500, {
        ...securityHeaders,
        'Cache-Control': 'no-store',
        'Content-Type': 'text/plain; charset=utf-8',
      })
    }
    response.end('Internal Server Error')
  }
})

server.keepAliveTimeout = 65_000
server.headersTimeout = 66_000
server.requestTimeout = 60_000

server.listen(port, '0.0.0.0', () => {
  console.log(`Rakeez site listening on port ${port}`)
})

function shutdown(signal) {
  if (isShuttingDown) return
  isShuttingDown = true
  console.log(`Received ${signal}. Closing server gracefully.`)

  server.close((error) => {
    if (error) {
      console.error('Graceful shutdown failed:', error)
      process.exit(1)
    }

    process.exit(0)
  })

  setTimeout(() => process.exit(1), 10_000).unref()
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error)
  shutdown('uncaughtException')
})

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason)
  shutdown('unhandledRejection')
})
