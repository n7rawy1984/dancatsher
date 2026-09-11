import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3100';
const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox'],
});
const paths = [
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
const results = [];
const errors = [];
const links = new Set();
const anchors = new Map();
const titles = new Set();
const descriptions = new Set();
const bodies = new Set();
await mkdir('.inspection', { recursive: true });
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(`Runtime: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`Console: ${message.text()}`);
  });
  page.setDefaultTimeout(10000);
  for (const locale of ['en', 'ar'])
    for (const path of paths) {
      const width = locale === 'en' ? 1440 : 390;
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(`${base}/${locale}${path ? `/${path}` : ''}`, {
        waitUntil: 'networkidle',
      });
      await page.evaluate(async () => {
        await document.fonts.ready;
        for (const image of document.images) image.loading = 'eager';
        await Promise.all([...document.images].map((image) => image.decode().catch(() => {})));
      });
      const originalHeaderHeight = await page
        .locator('.site-header')
        .evaluate((node) => node.getBoundingClientRect().height);
      await page.evaluate(() => scrollTo({ top: 800, behavior: 'instant' }));
      const sticky = await page.locator('.site-header').evaluate((node) => ({
        top: node.getBoundingClientRect().top,
        height: node.getBoundingClientRect().height,
        position: getComputedStyle(node).position,
      }));
      if (
        Math.abs(sticky.top) > 1 ||
        sticky.position !== 'sticky' ||
        Math.abs(sticky.height - originalHeaderHeight) > 1
      )
        errors.push(`${locale}/${path}: sticky header`);
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      const metrics = await page.evaluate(() => {
        const headings = [...document.querySelectorAll('main h1,main h2,main h3')].map((node) =>
          Number(node.tagName.slice(1)),
        );
        return {
          lang: document.documentElement.lang,
          dir: document.documentElement.dir,
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.content,
          og: document.querySelector('meta[property="og:title"]')?.content,
          robots: document.querySelector('meta[name="robots"]')?.content,
          h1: document.querySelectorAll('main h1').length,
          headings: headings.every(
            (level, index) => index === 0 || level <= headings[index - 1] + 1,
          ),
          overflow: document.documentElement.scrollWidth > innerWidth,
          broken: [...document.images]
            .filter((image) => !image.complete || !image.naturalWidth)
            .map((image) => image.src),
          missingAlt: [...document.images]
            .filter((image) => !image.getAttribute('alt') && !image.closest('[aria-hidden="true"]'))
            .map((image) => image.src),
          body: document.querySelector('main').innerText,
          ids: [...document.querySelectorAll('[id]')].map((node) => node.id),
          links: [...document.querySelectorAll('a[href]')].map((node) => node.href),
          structuredData: [...document.querySelectorAll('script[type="application/ld+json"]')].map(
            (node) => JSON.parse(node.textContent),
          ),
        };
      });
      if (
        response.status() !== 200 ||
        metrics.lang !== locale ||
        metrics.dir !== (locale === 'ar' ? 'rtl' : 'ltr') ||
        metrics.h1 !== 1 ||
        !metrics.headings ||
        metrics.overflow ||
        metrics.broken.length ||
        metrics.missingAlt.length ||
        !metrics.description ||
        !metrics.og
      )
        errors.push({ locale, path, metrics });
      if (
        titles.has(metrics.title) ||
        descriptions.has(metrics.description) ||
        bodies.has(metrics.body)
      )
        errors.push(`${locale}/${path}: duplicate title, description or main content`);
      titles.add(metrics.title);
      descriptions.add(metrics.description);
      bodies.add(metrics.body);
      if (/lorem ipsum|coming soon|under construction|placeholder|قيد الإنشاء/i.test(metrics.body))
        errors.push(`${locale}/${path}: placeholder copy`);
      if (locale === 'en' && /[\u0600-\u06ff]/.test(metrics.body))
        errors.push(`${locale}/${path}: Arabic in English main content`);
      if (path === '') {
        const organization = metrics.structuredData[0];
        if (
          organization?.['@type'] !== 'Organization' ||
          organization.name !== 'DANCATSHER Contracting L.L.C.' ||
          organization.foundingDate !== '2018' ||
          organization.address?.['@type'] !== 'PostalAddress' ||
          organization.address.addressCountry !== 'AE' ||
          'aggregateRating' in organization ||
          'review' in organization ||
          organization.sameAs?.[0] !==
            (await page.locator('.site-footer a[href*="linkedin.com"]').getAttribute('href'))
        )
          errors.push(`${locale}: Organization shape`);
      }
      await expect(page.locator('.site-footer a[href*="linkedin.com"]')).toHaveAttribute(
        'rel',
        /noopener/,
      );
      if (path === 'contact')
        await expect(page.locator('main a[href*="linkedin.com"]')).toHaveAttribute(
          'rel',
          /noopener/,
        );
      await expect(page.locator('.header-brand img')).toHaveAttribute('src', /dcs-emblem/);
      if (path === 'about') {
        const columns = await page.locator('.purpose-grid article').evaluateAll((nodes) =>
          nodes.map((node) => ({
            width: node.getBoundingClientRect().width,
            start: getComputedStyle(node).paddingInlineStart,
            end: getComputedStyle(node).paddingInlineEnd,
            top: node.querySelector('h3').getBoundingClientRect().top,
          })),
        );
        if (
          Math.abs(columns[0].width - columns[1].width) > 1 ||
          columns[0].start !== columns[1].start ||
          columns[0].end !== columns[1].end ||
          (width > 767 && Math.abs(columns[0].top - columns[1].top) > 1)
        )
          errors.push({ locale, path, columns });
      }
      anchors.set(new URL(page.url()).pathname, metrics.ids);
      metrics.links.filter((href) => href.startsWith(base)).forEach((href) => links.add(href));
      const arabicLatinText =
        locale === 'ar' ? metrics.body.split('\n').filter((line) => /[a-z]{3}/i.test(line)) : [];
      const { body, ids, links: ignoredLinks, ...saved } = metrics;
      void body;
      void ids;
      void ignoredLinks;
      results.push({ locale, path, width, status: response.status(), ...saved, arabicLatinText });
      if (['', 'products', 'contact'].includes(path)) {
        const accessibility = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        const violations = accessibility.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        }));
        results.push({ locale, path, accessibility: violations });
        if (violations.length) errors.push({ locale, path, accessibility: violations });
      }
      console.log(`${locale}/${path || 'home'} ${width}: checked`);
    }
  // Cross-check shared layout and interactions at the complementary viewport.
  for (const locale of ['en', 'ar']) {
    const width = locale === 'en' ? 390 : 1440;
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['', 'projects', 'contact']) {
      await page.goto(`${base}/${locale}${path ? `/${path}` : ''}`, { waitUntil: 'networkidle' });
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth))
        errors.push(`${locale}/${path}/${width}: overflow`);
      if (!path) {
        if (width === 390) {
          await page.locator('.menu-toggle').click();
          await expect(page.locator('#mobile-navigation')).toBeVisible();
          await page.keyboard.press('Escape');
          await expect(page.locator('#mobile-navigation')).toBeHidden();
          await expect(page.locator('.menu-toggle')).toBeFocused();
        }
        await page.keyboard.press('Control+Home');
        await page.locator('.language-switch').click();
        await expect(page).toHaveURL(`${base}/${locale === 'en' ? 'ar' : 'en'}`);
      }
      if (path === 'projects') {
        for (const [index, count] of [6, 2, 1, 2, 1].entries()) {
          await page.locator('.portfolio-filters button').nth(index).click();
          await expect(page.locator('.portfolio-grid article')).toHaveCount(count);
        }
      }
      if (path === 'contact') {
        await page.locator('button[type="submit"]').click();
        await expect(page.locator('[aria-invalid="true"]')).toHaveCount(4);
        await expect(page.locator('#contact-name')).toBeFocused();
        await page.locator('#contact-name').fill('Preview Test');
        await page.locator('#contact-email').fill('test@example.com');
        await page.locator('#contact-division').selectOption('hvac');
        await page.locator('#contact-requirements').fill('Local verification only.');
        await page.locator('button[type="submit"]').click();
        await expect(page.locator('.contact-form-status a')).toHaveAttribute('href', /^mailto:/);
        await page.locator('#contact-business').fill('Updated company');
        await expect(page.locator('.contact-form-status a')).toHaveCount(0);
      }
      results.push({ locale, path, width, interaction: 'passed' });
    }
    await page.goto(`${base}/${locale}/products`, { waitUntil: 'networkidle' });
    await page.locator('.product-index-links a').first().click();
    await expect(page).toHaveURL(/#packing-adhesives$/);
    await page.locator('.product-category-copy .button').first().click();
    await expect(page.locator('#contact-division')).toHaveValue('material-supply');
  }
  // One tablet width plus the requested viewports for sticky/menu/RTL composition.
  for (const locale of ['en', 'ar'])
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${base}/${locale}/about`, { waitUntil: 'networkidle' });
      await page.locator('.purpose-section').scrollIntoViewIfNeeded();
      if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth))
        errors.push(`${locale}/${width}: About overflow`);
      if (width > 767) {
        const heads = await page
          .locator('.purpose-grid h3')
          .evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().top));
        if (Math.abs(heads[0] - heads[1]) > 1) errors.push(`${locale}/${width}: purpose baseline`);
      }
      if (width <= 900) {
        await page.locator('.menu-toggle').click();
        await expect(page.locator('#mobile-navigation')).toBeVisible();
        const menu = await page.locator('#mobile-navigation').boundingBox();
        if (menu.y + menu.height > 901) errors.push(`${locale}/${width}: menu viewport bounds`);
        await page.locator('#mobile-navigation a[href$="/contact#enquiry"]').click();
      } else await page.locator('.header-quote').click();
      await expect(page.locator('#enquiry')).toBeVisible();
      await page.waitForTimeout(500);
      const clear = await page.evaluate(
        () =>
          document.getElementById('enquiry').getBoundingClientRect().top >=
          document.querySelector('.site-header').getBoundingClientRect().bottom - 1,
      );
      if (!clear) errors.push(`${locale}/${width}: enquiry hidden behind header`);
      await page.locator('#contact-name').focus();
      const focus = await page.locator('#contact-name').evaluate((node) => ({
        top: node.getBoundingClientRect().top,
        header: document.querySelector('.site-header').getBoundingClientRect().bottom,
      }));
      if (focus.top < focus.header) errors.push(`${locale}/${width}: field focus hidden`);
      if (width === 1440 || (locale === 'ar' && width === 390)) {
        await page.goto(`${base}/${locale}/about`, { waitUntil: 'networkidle' });
        await page.locator('.purpose-section').scrollIntoViewIfNeeded();
        await page.screenshot({ path: `.inspection/client-preview-${locale}-${width}.png` });
      }
    }
  for (const href of links) {
    const url = new URL(href);
    const response = await context.request.get(href);
    if (response.status() !== 200) errors.push(`Broken link: ${href}`);
    if (url.hash && !anchors.get(url.pathname)?.includes(decodeURIComponent(url.hash.slice(1))))
      errors.push(`Broken anchor: ${href}`);
  }
  // Expected 404s use HTTP requests so expected missing resources are not console errors.
  for (const path of [
    '/_source/LOGO-DCS.png',
    '/.inspection/source-hashes.json',
    '/.env',
    '/package.json',
    '/en/missing',
    '/fr',
  ]) {
    if ((await context.request.get(`${base}${path}`)).status() !== 404)
      errors.push(`Unexpected public exposure: ${path}`);
  }
  const root = await context.request.get(`${base}/`, { maxRedirects: 0 });
  if (![302, 307].includes(root.status()) || root.headers().location !== '/en')
    errors.push('Root redirect');
  const response = await context.request.get(`${base}/en`);
  if (
    response.headers()['x-content-type-options'] !== 'nosniff' ||
    response.headers()['x-frame-options'] !== 'SAMEORIGIN'
  )
    errors.push('Security headers missing');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`${base}/ar`);
  const motion = await page.evaluate(() => ({
    reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
    scroll: getComputedStyle(document.documentElement).scrollBehavior,
  }));
  if (!motion.reduced || motion.scroll === 'smooth') errors.push('Reduced motion');
  results.push({
    internalLinks: links.size,
    uniqueTitles: titles.size,
    uniqueDescriptions: descriptions.size,
    motion,
  });
} catch (error) {
  errors.push(String(error));
} finally {
  await browser.close();
}
await writeFile(
  '.inspection/client-preview-browser-results.json',
  JSON.stringify({ results, errors }, null, 2),
);
console.log(JSON.stringify({ checks: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
