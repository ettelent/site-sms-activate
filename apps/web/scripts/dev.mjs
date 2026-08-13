import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const nuxt = fileURLToPath(new URL('../node_modules/nuxt/bin/nuxt.mjs', import.meta.url))
const child = spawn(process.execPath, [nuxt, 'dev', ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: { ...process.env, DEBUG: '' }
})

child.on('exit', code => process.exit(code ?? 0))
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal))
}
