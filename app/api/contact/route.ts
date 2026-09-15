import { divisions } from '@/data/divisions';
import { contactPage } from '@/data/phase2c';

export const runtime = 'nodejs';
const MAX_BODY_BYTES = 24000;
const limits = {
  name: 120,
  business: 160,
  email: 200,
  phone: 25,
  division: 120,
  subject: 120,
  requirements: 2500,
  locale: 2,
  source: 40,
  website: 200,
} as const;

function reply(status: number, ok = false) {
  return Response.json(ok ? { ok: true } : { ok: false, error: 'Unable to submit enquiry.' }, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function POST(request: Request) {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
    return reply(415);
  }
  // Only accept browser submissions from this site's own origin.
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return reply(403);

  let payload: unknown;
  try {
    if (!request.body) return reply(400);
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        return reply(413);
      }
      chunks.push(value);
    }
    payload = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return reply(400);
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return reply(400);
  const input = payload as Record<string, unknown>;
  if (Object.keys(input).some((key) => !Object.hasOwn(limits, key))) return reply(400);
  const fields = {} as Record<keyof typeof limits, string>;
  for (const key of Object.keys(limits) as (keyof typeof limits)[]) {
    const value = input[key] === undefined ? '' : input[key];
    if (typeof value !== 'string' || value.length > limits[key]) return reply(400);
    // Permit line breaks only in the plain-text message body.
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) return reply(400);
    if (key !== 'requirements' && /[\r\n]/.test(value)) return reply(400);
    fields[key] = value.trim();
  }
  if (fields.website) return reply(200, true); // Silently discard honeypot submissions.
  const locale = fields.locale;
  if (locale !== 'en' && locale !== 'ar') return reply(400);
  const division = divisions.find((item) => item.id === fields.division);
  if (
    !fields.name ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email) ||
    !division ||
    !fields.requirements ||
    (fields.phone && !/^[+\d][\d\s().-]{6,24}$/.test(fields.phone)) ||
    (fields.subject && !contactPage.form.subjects[locale].includes(fields.subject)) ||
    ![`/${locale}`, `/${locale}/contact`].includes(fields.source)
  ) {
    return reply(400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return reply(503);

  const text = [
    'DANCATSHER Website Enquiry',
    '',
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    ...(fields.phone ? [`Phone: ${fields.phone}`] : []),
    ...(fields.business ? [`Company: ${fields.business}`] : []),
    `Service: ${division.title[locale]}`,
    ...(fields.subject ? [`Category: ${fields.subject}`] : []),
    `Locale: ${locale}`,
    `Source: ${fields.source}`,
    '',
    'Message:',
    fields.requirements,
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject: `DANCATSHER Website Enquiry — ${division.title.en}`,
        text,
      }),
      signal: AbortSignal.timeout(15000),
      cache: 'no-store',
    });
    if (!response.ok) return reply(502);
    const result = await response.json();
    if (typeof result?.id !== 'string' || !result.id) return reply(502);
    return reply(200, true);
  } catch {
    return reply(502);
  }
}
