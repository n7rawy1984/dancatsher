import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const routes = ['/en', '/ar', '/en/about', '/en/products', '/en/projects', '/en/contact'];
const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox'],
});
const results = [];
try {
  for (const [mode, base] of [
    ['development', process.env.DEV_BASE_URL || 'http://127.0.0.1:3000'],
    ['production', 'http://127.0.0.1:3100'],
  ]) {
    if (process.env.PRODUCTION_ONLY === 'true' && mode !== 'production') continue;
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    for (const pass of ['first-visit', 'warm'])
      for (const route of routes) {
        const response = await page.goto(`${base}${route}`, {
          waitUntil: 'domcontentloaded',
          timeout: 90000,
        });
        const visibleAtDomReady = await page.locator('h1').isVisible();
        await page.waitForTimeout(600);
        const timing = await page.evaluate(() => {
          const n = performance.getEntriesByType('navigation')[0];
          const paints = performance.getEntriesByType('paint');
          return {
            ttfbMs: Math.round(n.responseStart - n.requestStart),
            domReadyMs: Math.round(n.domContentLoadedEventEnd),
            fcpMs: Math.round(
              paints.find((p) => p.name === 'first-contentful-paint')?.startTime || 0,
            ),
            jsBytes: performance
              .getEntriesByType('resource')
              .filter((r) => r.name.includes('.js'))
              .reduce((a, r) => a + r.transferSize, 0),
            thirdParty: performance
              .getEntriesByType('resource')
              .filter((r) => new URL(r.name).origin !== location.origin)
              .map((r) => r.name),
          };
        });
        const row = { mode, pass, route, status: response.status(), visibleAtDomReady, ...timing };
        results.push(row);
        console.log(JSON.stringify(row));
      }
    await context.close();
  }
} finally {
  await browser.close();
}
await mkdir('.inspection', { recursive: true });
await writeFile(
  process.env.PRODUCTION_ONLY === 'true'
    ? '.inspection/pre-github-final-production-load-results.json'
    : '.inspection/pre-github-load-results.json',
  JSON.stringify(results, null, 2),
);
