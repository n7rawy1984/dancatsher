import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const inventory = JSON.parse(await readFile('data/client-image-inventory.json', 'utf8'));
const images = JSON.parse(await readFile('data/client-images.json', 'utf8'));
const root = '_source/dancatsher_client_assets_2026_09_11';
const manifest = (await readFile(`${root}/manifest.csv`, 'utf8'))
  .trim()
  .split(/\r?\n/)
  .slice(1)
  .map((line) => {
    const [group, file] = line.split(',');
    return `${group}/${file}`;
  });
assert.deepEqual(inventory.map((item) => item.source).sort(), manifest.sort());
assert.equal(images.length, inventory.filter((item) => !item.excluded).length);
assert.equal(new Set(images.map((item) => item.src)).size, images.length);
const publicFiles = await readdir('public/images/client-supplied', { recursive: true });
assert.equal(publicFiles.filter((file) => file.endsWith('.webp')).length, images.length);
for (const item of images) {
  const input = await readFile(`${root}/crops/${item.source}`);
  assert.equal(createHash('sha256').update(input).digest('hex'), item.sourceHash);
  const source = await sharp(input).metadata();
  const output = await sharp(`public${item.src}`).metadata();
  assert.equal(output.width, item.width);
  assert.equal(output.height, item.height);
  assert.ok(output.width <= source.width && output.height <= source.height);
  assert.ok(Math.abs(output.width / output.height - source.width / source.height) < 0.01);
  assert.match(item.caption.ar, /[\u0600-\u06ff]/);
}
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3100';
const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox'],
});
const testLocales = process.env.TEST_LOCALE ? [process.env.TEST_LOCALE] : ['en', 'ar'];
const testWidths = process.env.TEST_WIDTH ? [Number(process.env.TEST_WIDTH)] : [390, 768, 1440];
const suffix =
  process.env.TEST_LOCALE && process.env.TEST_WIDTH
    ? `-${process.env.TEST_LOCALE}-${process.env.TEST_WIDTH}`
    : '';
const errors = [],
  results = [],
  coverage = { en: new Set(), ar: new Set() };
const paths = [
  'products',
  'divisions/material-supply',
  'divisions/hvac',
  'divisions/contracting',
  '',
  'projects',
];
try {
  const context = await browser.newContext({ hasTouch: true });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.galleryLayoutShift = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        if (!entry.hadRecentInput) window.galleryLayoutShift += entry.value;
    }).observe({ type: 'layout-shift', buffered: true });
  });
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  for (const locale of testLocales)
    for (const width of testWidths)
      for (const path of paths) {
        await page.setViewportSize({ width, height: 900 });
        const response = await page.goto(`${base}/${locale}/${path}`, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200);
        assert.equal(
          await page.locator('html').getAttribute('dir'),
          locale === 'ar' ? 'rtl' : 'ltr',
        );
        const initial = await page.evaluate(() => ({
          layoutShift: window.galleryLayoutShift,
          jsBytes: performance
            .getEntriesByType('resource')
            .filter((entry) => entry.name.includes('.js'))
            .reduce((sum, entry) => sum + entry.transferSize, 0),
          imageRequests: performance
            .getEntriesByType('resource')
            .filter((entry) => entry.name.includes('client-supplied')).length,
          lazy: [...document.querySelectorAll('.client-gallery-card img')].every(
            (image) => image.loading === 'lazy',
          ),
        }));
        assert.ok(initial.lazy);
        await page.evaluate(async () => {
          await document.fonts.ready;
          for (const image of document.images) image.loading = 'eager';
          await Promise.all([...document.images].map((image) => image.decode()));
        });
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
          false,
          `${locale}/${path}/${width} overflow`,
        );
        const srcs = await page
          .locator('.client-gallery-card img')
          .evaluateAll((nodes) =>
            nodes.map(
              (node) => new URL(node.src).searchParams.get('url') || new URL(node.src).pathname,
            ),
          );
        srcs.forEach((src) => coverage[locale].add(src));
        assert.ok(!srcs.some((src) => /industrial-hvac-piping/.test(src)));
        if (['', 'projects'].includes(path)) assert.equal(srcs.length, 0);
        const galleries = page.locator('.client-gallery');
        for (let i = 0; i < (await galleries.count()); i++) {
          const gallery = galleries.nth(i),
            track = gallery.locator('.client-gallery-track');
          await track.scrollIntoViewIfNeeded();
          const cards = gallery.locator('.client-gallery-card');
          if (await track.evaluate((node) => node.scrollWidth > node.clientWidth + 2)) {
            const controls = gallery.locator('.client-gallery-controls button');
            await expect(controls.first()).toBeDisabled();
            await controls.last().click();
            await expect
              .poll(() => track.evaluate((node) => Math.abs(node.scrollLeft)))
              .toBeGreaterThan(30);
            await expect(controls.first()).toBeEnabled();
            await controls.first().click();
            await expect
              .poll(() => track.evaluate((node) => Math.abs(node.scrollLeft)))
              .toBeLessThan(2);
            await track.focus();
            await page.keyboard.press(locale === 'ar' ? 'ArrowLeft' : 'ArrowRight');
            await expect
              .poll(() => track.evaluate((node) => Math.abs(node.scrollLeft)))
              .toBeGreaterThan(30);
            await page.keyboard.press('End');
            await expect(controls.last()).toBeDisabled();
            await page.keyboard.press('Home');
            await expect(controls.first()).toBeDisabled();
            // Exercise native touch scrolling through Chrome's input protocol.
            if (width === 390) {
              const box = await track.boundingBox();
              const cdp = await context.newCDPSession(page);
              const start = locale === 'ar' ? box.x + 40 : box.x + box.width - 40;
              const finish = locale === 'ar' ? box.x + box.width - 40 : box.x + 40;
              const y = Math.max(160, box.y + 60);
              await cdp.send('Input.dispatchTouchEvent', {
                type: 'touchStart',
                touchPoints: [{ x: start, y }],
              });
              for (let step = 1; step <= 8; step++)
                await cdp.send('Input.dispatchTouchEvent', {
                  type: 'touchMove',
                  touchPoints: [{ x: start + ((finish - start) * step) / 8, y }],
                });
              await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
              await expect
                .poll(() => track.evaluate((node) => Math.abs(node.scrollLeft)))
                .toBeGreaterThan(20);
              await cdp.detach();
              await track.focus();
              await page.keyboard.press('Home');
            }
          }
          await cards.first().focus();
          await page.keyboard.press('Enter');
          const dialog = gallery.locator('dialog');
          await expect(dialog).toBeVisible();
          await expect(dialog.locator('button')).toBeFocused();
          if (i === 0 && width !== 768)
            await page.screenshot({
              path: `.inspection/client-images/lightbox-${locale}-${path.replaceAll('/', '-')}-${width}.png`,
            });
          await page.keyboard.press('Tab');
          assert.ok(await page.evaluate(() => document.activeElement?.closest('dialog') !== null));
          await page.keyboard.press('Shift+Tab');
          await expect(dialog.locator('button')).toBeFocused();
          await page.keyboard.press('Escape');
          await expect(dialog).toBeHidden();
          await expect(cards.first()).toBeFocused();
          const focus = await cards.first().evaluate((node) => getComputedStyle(node).outlineStyle);
          assert.notEqual(focus, 'none');
          await cards.first().click();
          await dialog.locator('button').click();
          await expect(dialog).toBeHidden();
          await cards.first().click();
          await page.mouse.click(3, 3);
          await expect(dialog).toBeHidden();
        }
        if (await galleries.count()) {
          // These pages have no frames; scan in place to avoid an extra Chrome tab.
          assert.equal(await page.locator('iframe').count(), 0);
          const axe = await new AxeBuilder({ page })
            .setLegacyMode(true)
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze();
          assert.deepEqual(
            axe.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
            [],
          );
          if (width === 1440) {
            await galleries.first().locator('.client-gallery-card').first().click();
            const modalAxe = await new AxeBuilder({ page })
              .setLegacyMode(true)
              .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
              .analyze();
            assert.deepEqual(
              modalAxe.violations.map((v) => v.id),
              [],
            );
            await page.keyboard.press('Escape');
          }
          await galleries.first().scrollIntoViewIfNeeded();
          await page.screenshot({
            path: `.inspection/client-images/${locale}-${path.replaceAll('/', '-')}-${width}.png`,
          });
        }
        await page.evaluate(() => scrollTo({ top: 600, behavior: 'instant' }));
        assert.ok(Math.abs((await page.locator('.site-header').boundingBox()).y) < 1);
        await expect(page.locator('.header-brand img')).toHaveAttribute('src', /dcs-emblem/);
        await expect(page.locator('.site-footer a[href*="linkedin.com"]')).toBeVisible();
        results.push({
          locale,
          path,
          width,
          galleries: await galleries.count(),
          images: srcs.length,
          initial,
        });
        console.log(`${locale}/${path || 'home'} ${width}: passed`);
      }
  for (const locale of testLocales)
    assert.deepEqual([...coverage[locale]].sort(), images.map((image) => image.src).sort());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`${base}/ar/products`);
  const track = page.locator('.client-gallery-track').first();
  await track.focus();
  await page.keyboard.press('ArrowLeft');
  assert.ok(await track.evaluate((node) => Math.abs(node.scrollLeft) > 20));
  assert.notEqual(await track.evaluate((node) => getComputedStyle(node).scrollBehavior), 'smooth');
} catch (error) {
  errors.push(error.stack);
} finally {
  await browser.close();
}
await writeFile(
  `.inspection/client-images/verification${suffix}.json`,
  JSON.stringify(
    {
      prepared: inventory.length,
      suitable: images.length,
      coverage: Object.fromEntries(
        Object.entries(coverage).map(([locale, values]) => [locale, values.size]),
      ),
      results,
      errors,
    },
    null,
    2,
  ),
);
console.log(JSON.stringify({ checks: results.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
