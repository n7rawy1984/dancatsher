import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve, dirname } from 'node:path';
import ts from 'typescript';

// Evaluate the actual pure configuration modules with isolated environment/cache state.
const nativeRequire = createRequire(import.meta.url);
function configuration() {
  const cache = new Map();
  function load(name) {
    const file = resolve(name.endsWith('.ts') ? name : `${name}.ts`);
    if (cache.has(file)) return cache.get(file).exports;
    const evaluatedModule = { exports: {} };
    cache.set(file, evaluatedModule);
    const output = ts.transpileModule(readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    const localRequire = (id) =>
      id.startsWith('@/')
        ? load(id.slice(2))
        : id.startsWith('.')
          ? load(resolve(dirname(file), id))
          : nativeRequire(id);
    new Function('require', 'module', 'exports', output)(
      localRequire,
      evaluatedModule,
      evaluatedModule.exports,
    );
    return evaluatedModule.exports;
  }
  return load;
}
const original = {
  url: process.env.NEXT_PUBLIC_SITE_URL,
  indexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING,
};
try {
  for (const [url, indexing, count, indexable] of [
    ['', '', 0, false],
    ['https://example.test/', 'false', 20, false],
    ['https://example.test/', 'true', 20, true],
    ['', 'true', 0, false],
  ]) {
    process.env.NEXT_PUBLIC_SITE_URL = url;
    process.env.NEXT_PUBLIC_ALLOW_INDEXING = indexing;
    const load = configuration();
    const sitemap = load('app/sitemap').default();
    const robots = load('app/robots').default();
    const { metadata } = load('lib/seo');
    const { publicPaths } = load('data/routes');
    assert.equal(sitemap.length, count);
    assert.equal(new Set(sitemap.map((entry) => entry.url)).size, count);
    assert.equal(robots.rules.allow === '/', indexable);
    for (const locale of ['en', 'ar'])
      for (const path of publicPaths) {
        const meta = metadata(locale, 'Test title', 'Test description', path);
        assert.equal(meta.robots.index, indexable);
        if (url) {
          const suffix = path ? `/${path}` : '';
          assert.equal(meta.alternates.canonical, `https://example.test/${locale}${suffix}`);
          assert.equal(meta.alternates.languages.ar, `https://example.test/ar${suffix}`);
          assert.equal(meta.alternates.languages['x-default'], `https://example.test/en${suffix}`);
          assert(sitemap.some((entry) => entry.url === meta.alternates.canonical));
          assert.equal(meta.openGraph.url, meta.alternates.canonical);
        } else assert.equal(meta.alternates, undefined);
      }
    console.log(
      `SEO configuration: domain=${Boolean(url)}, indexing=${indexing || 'unset'} passed`,
    );
  }
  const load = configuration();
  const { normalizeSiteUrl } = load('lib/site-url');
  for (const value of [
    'http://example.test',
    'https://user:pass@example.test',
    'https://example.test/path',
    'https://example.test?x=1',
    'https://example.test/#x',
    'not a url',
  ]) {
    assert.throws(() => normalizeSiteUrl(value));
  }
  const { productCategories } = load('data/products');
  const { projects } = load('data/projects');
  assert.equal(productCategories.length, 7);
  assert.equal(productCategories.flatMap((item) => item.products).length, 47);
  assert.equal(projects.length, 6);
  for (const name of [
    'copy',
    'inner-pages',
    'phase2c',
    'navigation',
    'divisions',
    'products',
    'projects',
  ]) {
    function check(value) {
      if (!value || typeof value !== 'object') return;
      if ('en' in value || 'ar' in value) {
        assert('en' in value && 'ar' in value, `Missing locale in ${name}`);
        assert(value.en && value.ar, `Empty locale in ${name}`);
      }
      Object.values(value).forEach(check);
    }
    check(load(`data/${name}`));
  }
  console.log('URL safeguards, route coverage, catalog counts and localized data passed.');
} finally {
  for (const [key, value] of Object.entries({
    NEXT_PUBLIC_SITE_URL: original.url,
    NEXT_PUBLIC_ALLOW_INDEXING: original.indexing,
  })) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}
