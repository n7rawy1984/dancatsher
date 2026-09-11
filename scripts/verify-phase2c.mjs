import AxeBuilder from '@axe-core/playwright';
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox'],
});
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const paths = ['products', 'projects', 'contact'];
const allPaths = [
  '',
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
const widths = [360, 390, 768, 1024, 1440, 1920];
const results = [];
const errors = [];

await mkdir('.inspection/phase2c-screenshots', { recursive: true });

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
        const response = await page.goto(`${base}/${locale}/${path}`, {
          waitUntil: 'networkidle',
        });
        await page.evaluate(async () => {
          await document.fonts.ready;
          for (const target of document.querySelectorAll('main section, main header')) {
            target.scrollIntoView({ block: 'center' });
            await new Promise((resolve) => setTimeout(resolve, 45));
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
            description: document.querySelector('meta[name="description"]')?.content,
            openGraphTitle: document.querySelector('meta[property="og:title"]')?.content,
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
          path: `.inspection/phase2c-screenshots/${locale}-${path}-${width}.png`,
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
          `${locale}/${path}: accessibility ${accessibility.violations.map((item) => item.id).join(', ')}`,
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

    if (titles.size !== paths.length) errors.push(`${locale}: Phase 2C titles are not unique`);
    if (descriptions.size !== paths.length)
      errors.push(`${locale}: Phase 2C descriptions are not unique`);

    for (const path of allPaths) {
      const response = await page.goto(`${base}/${locale}${path ? `/${path}` : ''}`);
      if (response?.status() !== 200)
        errors.push(`${locale}/${path || 'home'}: ${response?.status()}`);
      if (await page.locator('.placeholder-section').count()) {
        errors.push(`${locale}/${path || 'home'}: public placeholder found`);
      }
    }

    await page.goto(`${base}/${locale}/projects`);
    const originalProjectCount = await page.locator('.portfolio-grid article').count();
    await page
      .locator('.portfolio-filters button')
      .filter({ hasText: locale === 'ar' ? 'التكييف' : 'HVAC' })
      .click();
    const filteredProjectCount = await page.locator('.portfolio-grid article').count();
    if (originalProjectCount <= filteredProjectCount || filteredProjectCount !== 1) {
      errors.push(`${locale}: project filtering failed`);
    }

    await page.goto(`${base}/${locale}/contact?division=material-supply&subject=material`);
    if ((await page.locator('#contact-division').inputValue()) !== 'material-supply') {
      errors.push(`${locale}: contact division preselection failed`);
    }
    await page.locator('.contact-enquiry-form button[type="submit"]').click();
    if (!(await page.locator('#contact-name').getAttribute('aria-invalid'))) {
      errors.push(`${locale}: contact validation did not expose invalid fields`);
    }
    await page.locator('#contact-name').fill(locale === 'ar' ? 'مستخدم تجريبي' : 'Test User');
    await page.locator('#contact-email').fill('test@example.com');
    await page.locator('#contact-phone').fill('+971 50 123 4567');
    await page.locator('#contact-requirements').fill('Please review this project requirement.');
    await page.locator('.contact-enquiry-form button[type="submit"]').click();
    const mailto = await page.locator('.contact-form-status a').getAttribute('href');
    if (!mailto?.startsWith('mailto:')) errors.push(`${locale}: safe email handoff failed`);

    await page.goto(`${base}/${locale}/products`);
    await Promise.all([
      page.waitForURL(`${base}/${locale === 'en' ? 'ar' : 'en'}/products`),
      page.locator('.language-switch').click(),
    ]);
  }

  const noJs = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJs.newPage();
  for (const path of paths) {
    await staticPage.goto(`${base}/en/${path}`);
    if ((await staticPage.locator('main h1').count()) !== 1) {
      errors.push(`${path}: core content unavailable without JavaScript`);
    }
  }
  await noJs.close();

  for (const path of ['/en/missing', '/fr', '/_source/LOGO-DCS.png']) {
    const response = await page.goto(`${base}${path}`);
    if (response?.status() !== 404) errors.push(`${path}: expected 404, got ${response?.status()}`);
  }
} finally {
  await browser.close();
}

await writeFile(
  '.inspection/phase2c-browser-results.json',
  JSON.stringify({ results, errors }, null, 2),
);
console.log(JSON.stringify({ checks: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
