const net = require('net')
const { spawn } = require('child_process')

const maxAttempts = 5
let child
let stopping = false

function findAvailablePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.once('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address()
      server.close((error) => (error ? reject(error) : resolve(port)))
    })
  })
}

function runDevServer(attempt = 1) {
  findAvailablePort()
    .then((port) => {
      console.log(`Starting development server on http://localhost:${port}/flashlight/`)

      const command = process.platform === 'win32' ? 'yarn.cmd' : 'yarn'
      let output = ''
      child = spawn(command, ['dev', '--port', String(port)], {
        stdio: ['inherit', 'pipe', 'pipe']
      })

      for (const stream of [child.stdout, child.stderr]) {
        stream.on('data', (chunk) => {
          output += chunk
          process.stdout.write(chunk)
        })
      }

      child.once('close', (code) => {
        if (!stopping && /EADDRINUSE/.test(output) && attempt < maxAttempts) {
          console.log(`Port was claimed; retrying (${attempt + 1}/${maxAttempts}).`)
          runDevServer(attempt + 1)
          return
        }

        process.exitCode = code || 0
      })
    })
    .catch((error) => {
      console.error(error)
      process.exitCode = 1
    })
}

for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.on(signal, () => {
    stopping = true
    if (child && !child.killed) child.kill(signal)
  })
}

runDevServer()
