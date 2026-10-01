// Renders cv/cv.html to public/George_Nicolaides_CV.pdf with Playwright/Chromium.
// Usage: node cv/build.mjs   (requires the `playwright` package and a Chromium install)
import { chromium } from 'playwright'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const dir = path.dirname(fileURLToPath(import.meta.url))
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
)
const page = await browser.newPage()
await page.goto(pathToFileURL(path.join(dir, 'cv.html')).href, { waitUntil: 'networkidle' })
await page.pdf({
  path: path.join(dir, '..', 'public', 'George_Nicolaides_CV.pdf'),
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
})
await browser.close()
console.log('CV written to public/George_Nicolaides_CV.pdf')
