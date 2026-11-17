/**
 * Accessibility check for every story: serves the built Storybook (storybook-static), opens each story in a headless browser
 * and runs axe-core (WCAG 2.0/2.1/2.2 A and AA plus axe's best-practice rules) on it.
 *
 *   npm run build-storybook && npm run test:a11y
 *
 * It exits with 1 when any story has a violation or does not render. It needs the Playwright Chromium browser
 * (`npx playwright-core install chromium` once, if it is not on the machine yet).
 */
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const require = createRequire(import.meta.url)
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')
const ROOT = normalize(fileURLToPath(new URL('../storybook-static', import.meta.url)))
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.png': 'image/png' }

if (!existsSync(join(ROOT, 'index.json'))) {
  console.error('storybook-static/index.json not found. Run "npm run build-storybook" first.')
  process.exit(1)
}

const server = createServer((req, res) => {
  const requested = decodeURIComponent((req.url ?? '/').split('?')[0])
  const file = normalize(join(ROOT, requested === '/' ? 'index.html' : requested))
  if (!file.startsWith(ROOT) || !existsSync(file) || statSync(file).isDirectory()) {
    res.writeHead(404)
    return res.end()
  }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
  createReadStream(file).pipe(res)
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const origin = `http://127.0.0.1:${server.address().port}`

const stories = Object.values(JSON.parse(readFileSync(join(ROOT, 'index.json'), 'utf8')).entries).filter((e) => e.type === 'story')
const browser = await chromium.launch()
const page = await (await browser.newContext({ viewport: { width: 1000, height: 900 } })).newPage()
const pageErrors = []
page.on('pageerror', (e) => pageErrors.push(String(e).slice(0, 160)))

const failures = []
for (const story of stories) {
  pageErrors.length = 0
  await page.goto(`${origin}/iframe.html?id=${story.id}&viewMode=story`, { waitUntil: 'domcontentloaded' })
  const rendered = await page.waitForSelector('#storybook-root > *', { timeout: 8000 }).then(() => true, () => false)
  if (!rendered) {
    failures.push(`${story.id}: did not render${pageErrors.length ? ` (${pageErrors[0]})` : ''}`)
    continue
  }
  await page.waitForTimeout(250)
  await page.evaluate(axeSource)
  const violations = await page.evaluate(async () => {
    const result = await window.axe.run('#storybook-root', { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } })
    return result.violations.map((v) => `[${v.impact}] ${v.id} x${v.nodes.length}: ${v.help} -> ${v.nodes[0].html.slice(0, 100)}`)
  })
  for (const v of violations) failures.push(`${story.id}: ${v}`)
}

await browser.close()
server.close()
console.log(`${stories.length} stories checked, ${failures.length} problem${failures.length === 1 ? '' : 's'}.`)
for (const f of failures) console.log(`  ${f}`)
process.exit(failures.length ? 1 : 0)
