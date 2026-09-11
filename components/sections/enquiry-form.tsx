'use client';
import { useState, type FormEvent } from 'react';
import type { Copy } from '@/data/copy';
import { divisions } from '@/data/divisions';
import { prepareEnquiry, type EnquiryResult } from '@/lib/enquiry';
import type { Locale } from '@/types/content';
import { Arrow } from '@/components/ui/primitives';
export function EnquiryForm({ locale, labels: c }: { locale: Locale; labels: Copy['contact'] }) {
  const [result, setResult] = useState<EnquiryResult | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const field = (name: string) => String(fields.get(name) ?? '').trim();
    setResult(
      prepareEnquiry(
        {
          name: field('name'),
          business: field('business'),
          email: field('email'),
          division: field('division'),
          requirements: field('requirements'),
        },
        c.emailSubject,
      ),
    );
  }
  return (
    <form className="enquiry-form" onSubmit={submit} onChange={() => result && setResult(null)}>
      <h3>{c.formTitle}</h3>
      <p className="form-notice" id="form-notice">
        {c.notice}
      </p>
      <div className="form-grid">
        <label htmlFor="name">
          {c.name} *<input id="name" name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label htmlFor="business">
          {c.business}
          <input id="business" name="business" autoComplete="organization" maxLength={160} />
        </label>
        <label htmlFor="email">
          {c.emailLabel} *
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            dir="ltr"
          />
        </label>
        <label htmlFor="division">
          {c.division} *
          <select id="division" name="division" required defaultValue="">
            <option value="" disabled>
              {c.choose}
            </option>
            {divisions.map((d) => (
              <option key={d.id} value={d.title[locale]}>
                {d.title[locale]}
              </option>
            ))}
          </select>
        </label>
        <label className="full" htmlFor="requirements">
          {c.requirements} *
          <textarea id="requirements" name="requirements" required rows={3} maxLength={1500} />
        </label>
      </div>
      <div className="form-bottom">
        <button className="button" type="submit" aria-describedby="form-notice">
          {c.submit}
          <Arrow />
        </button>
        <span>* {c.required}</span>
      </div>
      <div aria-live="polite" role="status">
        {result && (
          <div className="form-result">
            <p>{result.status === 'prepared' ? c.ready : c.invalid}</p>
            {result.status === 'prepared' && (
              <a className="text-link" href={result.mailto}>
                {c.send}
                <Arrow />
              </a>
            )}
          </div>
        )}
      </div>
      <p className="privacy-note">{c.privacy}</p>
    </form>
  );
}
