// Exercise the actual route with mocked Resend fetch. Never contacts an email provider.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

const root = process.cwd();
const cache = new Map();
let calls = [];
let provider = async () => Response.json({ id: 'mock-id' });
const env = {
  RESEND_API_KEY: 'test-key',
  CONTACT_TO_EMAIL: 'private@example.test',
  CONTACT_FROM_EMAIL: 'Website <sender@example.test>',
};
function load(file) {
  if (cache.has(file)) return cache.get(file);
  const loadedModule = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, {
    module: loadedModule,
    exports: loadedModule.exports,
    require: (id) => load(path.resolve(root, id.replace(/^@\//, '') + '.ts')),
    process: { env },
    Response,
    URL,
    Buffer,
    AbortSignal,
    fetch: async (url, options) => {
      calls.push({ url, options, body: JSON.parse(options.body) });
      return provider();
    },
  });
  cache.set(file, loadedModule.exports);
  return loadedModule.exports;
}
const { POST } = load(path.join(root, 'app/api/contact/route.ts'));
const valid = {
  name: 'Test Visitor',
  business: 'Test Company',
  email: 'visitor@example.test',
  phone: '+971 50 123 4567',
  division: 'hvac',
  subject: 'Project enquiry',
  requirements: '<script>alert(1)</script>\nPlease quote.',
  locale: 'en',
  source: '/en/contact',
  website: '',
};
async function post(body, status, headers = {}, raw = false) {
  const response = await POST(
    new Request('https://site.example/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: raw ? body : JSON.stringify(body),
    }),
  );
  assert.equal(response.status, status);
  const json = await response.json();
  assert.equal(json.ok, status === 200);
  assert.ok(!JSON.stringify(json).includes('private@example.test'));
  assert.ok(!JSON.stringify(json).includes('test-key'));
}
await post(valid, 200);
assert.equal(calls[0].url, 'https://api.resend.com/emails');
assert.equal(calls[0].body.reply_to, valid.email);
assert.equal(calls[0].body.from, env.CONTACT_FROM_EMAIL);
assert.equal(calls[0].body.to[0], env.CONTACT_TO_EMAIL);
assert.equal(calls[0].body.html, undefined);
assert.ok(calls[0].body.text.includes(valid.requirements));
assert.ok(!calls[0].body.text.includes(env.RESEND_API_KEY));
assert.ok(!calls[0].body.text.includes(env.CONTACT_TO_EMAIL));
await post({ ...valid, locale: 'ar', source: '/ar/contact', subject: 'طلب مواد' }, 200);
await post({ ...valid, source: '/en', phone: undefined, subject: undefined }, 200);
const beforeInvalid = calls.length;
for (const body of [
  null,
  [],
  { ...valid, name: '' },
  { ...valid, email: 'invalid' },
  { ...valid, email: 'x@example.test\r\nBcc: x@example.test' },
  { ...valid, phone: 'bad' },
  { ...valid, name: 'x'.repeat(121) },
  { ...valid, business: null },
  { ...valid, requirements: 'x'.repeat(2501) },
  { ...valid, division: 'unknown' },
  { ...valid, subject: 'unknown' },
  { ...valid, locale: 'xx' },
  { ...valid, source: '/untrusted' },
  { ...valid, to: 'injected@example.test' },
])
  await post(body, 400);
await post('{', 400, {}, true);
await post(' '.repeat(24001), 413, {}, true);
await post(valid, 415, { 'Content-Type': 'text/plain' });
await post(valid, 403, { Origin: 'https://other.example' });
await post({ ...valid, website: 'spam' }, 200);
assert.equal(calls.length, beforeInvalid);
delete env.RESEND_API_KEY;
await post(valid, 503);
assert.equal(calls.length, beforeInvalid);
env.RESEND_API_KEY = 'test-key';
provider = async () => Response.json({ message: 'secret provider error' }, { status: 429 });
await post(valid, 502);
provider = async () => {
  throw new Error('secret network error');
};
await post(valid, 502);
provider = async () => Response.json({});
await post(valid, 502);
console.log(
  'Contact route: validation, EN/AR, honeypot, private configuration, email payload and provider failures passed (mocked; no email sent).',
);
