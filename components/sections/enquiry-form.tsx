'use client';
import { type FormEvent } from 'react';
import type { Copy } from '@/data/copy';
import { divisions } from '@/data/divisions';
import { enquiryMessages, useEnquirySubmission } from '@/lib/enquiry';
import type { Locale } from '@/types/content';
import { Arrow } from '@/components/ui/primitives';
export function EnquiryForm({ locale, labels: c }: { locale: Locale; labels: Copy['contact'] }) {
  const { status, send, clearStatus } = useEnquirySubmission(locale);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(event.currentTarget);
  }
  return (
    <form
      className="enquiry-form"
      onSubmit={submit}
      onChange={clearStatus}
      aria-busy={status === 'sending'}
    >
      <input
        type="text"
        name="website"
        hidden
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
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
              <option key={d.id} value={d.id}>
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
        <button
          className="button"
          type="submit"
          aria-describedby="form-notice"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? enquiryMessages.sending[locale] : enquiryMessages.send[locale]}
          <Arrow />
        </button>
        <span>* {c.required}</span>
      </div>
      <div aria-live="polite" role="status">
        {status !== 'idle' && status !== 'invalid' && (
          <div className="form-result">
            <p>{enquiryMessages[status][locale]}</p>
          </div>
        )}
      </div>
      <p className="privacy-note">{c.privacy}</p>
    </form>
  );
}
