import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox'],
});
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const paths = [
  'about',
  'divisions',
  'divisions/contracting',
  'divisions/hvac',
  'divisions/material-supply',
  'qhse',
];
const widths = [360, 390, 768, 1024, 1440, 1920];
const results = [];
const errors = [];

await mkdir('.inspection/inner-screenshots', { recursive: true });
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(`Page error: ${error.message}`));

  for (const locale of ['en', 'ar']) {
    const titles = new Set();
    const descriptions = new Set();
    for (const path of paths) {
      for (const width of widths) {
        await page.setViewportSize({ width, height: 1000 });
        const response = await page.goto(`${base}/${locale}/${path}`, { waitUntil: 'networkidle' });
        await page.evaluate(async () => {
          await document.fonts.ready;
          const targets = [...document.querySelectorAll('main section, main header')];
          for (const target of targets) {
            target.scrollIntoView({ block: 'center' });
            await new Promise((resolve) => setTimeout(resolve, 90));
          }
          await Promise.all([...document.images].map((image) => image.decode().catch(() => {})));
          scrollTo({ top: 0, behavior: 'instant' });
        });
        const metrics = await page.evaluate(() => {
          const headings = [...document.querySelectorAll('main h1, main h2, main h3')].map(
            (heading) => Number(heading.tagName.slice(1)),
          );
          return {
            lang: document.documentElement.lang,
            dir: document.documentElement.dir,
            title: document.title,
            description: document
              .querySelector('meta[name="description"]')
              ?.getAttribute('content'),
            openGraphTitle: document
              .querySelector('meta[property="og:title"]')
              ?.getAttribute('content'),
            h1: document.querySelectorAll('main h1').length,
            placeholder: Boolean(document.querySelector('.placeholder-section')),
            scrollWidth: document.documentElement.scrollWidth,
            brokenImages: [...document.images]
              .filter((image) => !image.complete || image.naturalWidth === 0)
              .map((image) => image.currentSrc || image.src),
            headingOrderValid: headings.every(
              (level, index) => index === 0 || level <= headings[index - 1] + 1,
            ),
          };
        });
        if (width === 360) {
          titles.add(metrics.title);
          if (metrics.description) descriptions.add(metrics.description);
        }
        const expectedDirection = locale === 'ar' ? 'rtl' : 'ltr';
        if (
          response?.status() !== 200 ||
          metrics.lang !== locale ||
          metrics.dir !== expectedDirection ||
          metrics.h1 !== 1 ||
          metrics.placeholder ||
          metrics.scrollWidth > width ||
          metrics.brokenImages.length ||
          !metrics.headingOrderValid ||
          !metrics.description ||
          !metrics.openGraphTitle
        ) {
          errors.push(`${locale}/${path}/${width}: ${JSON.stringify(metrics)}`);
        }
        await page.screenshot({
          path: `.inspection/inner-screenshots/${locale}-${path.replaceAll('/', '-')}-${width}.png`,
          fullPage: true,
        });
        results.push({ locale, path, width, status: response?.status(), ...metrics });
      }

      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${base}/${locale}/${path}`, { waitUntil: 'networkidle' });
      const accessibility = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      if (accessibility.violations.length) {
        errors.push(
          `${locale}/${path}: ${accessibility.violations.length} accessibility violations`,
        );
      }
      results.push({
        locale,
        path,
        accessibility: accessibility.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          nodes: violation.nodes.map((node) => node.target),
        })),
      });
    }
    if (titles.size !== paths.length) errors.push(`${locale}: inner-page titles are not unique`);
    if (descriptions.size !== paths.length)
      errors.push(`${locale}: inner-page descriptions are not unique`);
  }

  for (const path of ['products', 'projects', 'contact']) {
    await page.goto(`${base}/en/${path}`);
    if (!(await page.locator('.placeholder-section').count())) {
      errors.push(`${path}: expected the next-phase placeholder`);
    }
  }

  await page.goto(`${base}/en/divisions/hvac`);
  await Promise.all([
    page.waitForURL(`${base}/ar/divisions/hvac`),
    page.locator('.language-switch').click(),
  ]);
  if (!page.url().endsWith('/ar/divisions/hvac')) errors.push('Locale switch lost the inner path');
} finally {
  await browser.close();
}

await writeFile(
  '.inspection/inner-browser-results.json',
  JSON.stringify({ results, errors }, null, 2),
);
console.log(JSON.stringify({ checks: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
