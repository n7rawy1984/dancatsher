import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox'],
});
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
await mkdir('.inspection/screenshots', { recursive: true });
const results = [];
const errors = [];
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  for (const locale of process.env.TEST_LOCALE ? [process.env.TEST_LOCALE] : ['en', 'ar']) {
    for (const width of [360, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto(`${base}/${locale}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 750) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise((resolve) => setTimeout(resolve, 70));
        }
        await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
      const metrics = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        lang: document.documentElement.lang,
        dir: document.documentElement.dir,
        h1: document.querySelectorAll('h1').length,
        brokenImages: [...document.images]
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.src),
        overflow: [...document.querySelectorAll('main *, header *, footer *')]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
          })
          .map((el) => ({ tag: el.tagName, class: el.className }))
          .slice(0, 12),
      }));
      if (
        response.status() !== 200 ||
        metrics.scrollWidth > width ||
        metrics.lang !== locale ||
        metrics.h1 !== 1 ||
        metrics.brokenImages.length > 0
      )
        errors.push(`${locale}/${width}: ${JSON.stringify(metrics)}`);
      await page.screenshot({
        path: `.inspection/screenshots/${locale}-${width}.png`,
        fullPage: true,
      });
      results.push({ locale, width, status: response.status(), ...metrics });
      console.log(`Checked ${locale} at ${width}px`);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}/${locale}`);
    const menu = page.locator('.menu-toggle');
    await menu.click();
    if ((await menu.getAttribute('aria-expanded')) !== 'true')
      errors.push('Mobile menu failed to open');
    await page.keyboard.press('Escape');
    if ((await menu.getAttribute('aria-expanded')) !== 'false')
      errors.push('Escape failed to close menu');
    await page.locator('#name').fill(locale === 'ar' ? 'مستخدم تجريبي' : 'Test User');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#division').selectOption({ index: 1 });
    await page.locator('#requirements').fill('Please discuss requirements for our project.');
    await page.locator('button[type=submit]').click();
    const emailLink = page.locator('.form-result a');
    if (!(await emailLink.getAttribute('href'))?.startsWith('mailto:'))
      errors.push('Enquiry email handoff failed');
    await page.locator('#requirements').fill('Changed requirement');
    if (await emailLink.count()) errors.push('Stale enquiry draft remained after edit');
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    results.push({
      locale,
      accessibility: axe.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
      })),
    });
    console.log(`Accessibility checked for ${locale}`);
    if (axe.violations.length)
      errors.push(`${locale}: ${axe.violations.length} accessibility violations`);
    const paths = [
      'about',
      'divisions',
      'divisions/contracting',
      'divisions/hvac',
      'divisions/material-supply',
      'products',
      'projects',
      'qhse',
      'contact',
    ];
    for (const path of paths) {
      const res = await page.goto(`${base}/${locale}/${path}`);
      if (res.status() !== 200) errors.push(`${locale}/${path}: ${res.status()}`);
      if ((await page.locator('h1').count()) !== 1) errors.push(`${path}: heading missing`);
    }
    await page.goto(`${base}/${locale}/divisions/hvac`);
    await Promise.all([
      page.waitForURL(`${base}/${locale === 'en' ? 'ar' : 'en'}/divisions/hvac`),
      page.locator('.language-switch').click(),
    ]);
    if (!page.url().endsWith(`/${locale === 'en' ? 'ar' : 'en'}/divisions/hvac`))
      errors.push('Locale switch lost inner path');
    await page.goto(`${base}/${locale}/products?category=pipes-fittings`);
    await page.locator('.selected-category').waitFor();
  }
  const root = await page.goto(base);
  if (!root.url().endsWith('/en')) errors.push('Root locale redirect failed');
  for (const path of ['/en/missing', '/fr', '/_source/LOGO-DCS.png']) {
    const res = await page.goto(base + path);
    if (res.status() !== 404) errors.push(`${path} expected 404, got ${res.status()}`);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`${base}/ar`);
  const reduced = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  );
  if (reduced !== 'auto') errors.push('Reduced motion not respected');
  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  await staticPage.goto(`${base}/en`);
  if (!(await staticPage.locator('h1').innerText()).includes('Engineering.'))
    errors.push('Core content unavailable without JS');
  await noJs.close();
} finally {
  await browser.close();
}
await writeFile(
  `.inspection/browser-results${process.env.TEST_LOCALE ? '-' + process.env.TEST_LOCALE : ''}.json`,
  JSON.stringify({ results, errors }, null, 2),
);
console.log(JSON.stringify({ checks: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
