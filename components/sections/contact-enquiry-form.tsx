'use client';

import { useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { divisions } from '@/data/divisions';
import { contactPage } from '@/data/phase2c';
import { prepareContactEnquiry, type EnquiryResult } from '@/lib/enquiry';
import type { Locale } from '@/types/content';
import { Arrow } from '@/components/ui/primitives';

type Field = 'name' | 'email' | 'phone' | 'division' | 'requirements';
type Errors = Partial<Record<Field, string>>;

export function ContactEnquiryForm({ locale }: { locale: Locale }) {
  const labels = contactPage.form;
  const search = useSearchParams();
  const initialDivision = search.get('division') ?? '';
  const initialSubject = search.get('subject') === 'material' ? labels.subjects[locale][1] : '';
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<EnquiryResult | null>(null);

  function clear(field: Field) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (result) setResult(null);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (name: string) => String(form.get(name) ?? '').trim();
    const enquiry = {
      name: value('name'),
      business: value('business'),
      email: value('email'),
      phone: value('phone'),
      division: value('division'),
      subject: value('subject'),
      requirements: value('requirements'),
    };
    const nextErrors: Errors = {};
    if (!enquiry.name) nextErrors.name = labels.required[locale];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
      nextErrors.email = labels.invalidEmail[locale];
    }
    if (enquiry.phone && !/^[+\d][\d\s().-]{6,24}$/.test(enquiry.phone)) {
      nextErrors.phone = labels.invalidPhone[locale];
    }
    if (!enquiry.division) nextErrors.division = labels.required[locale];
    if (!enquiry.requirements) nextErrors.requirements = labels.required[locale];
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setResult({ status: 'invalid' });
      document.getElementById(`contact-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }
    setResult(prepareContactEnquiry(enquiry, labels.emailSubject[locale]));
  }

  const errorProps = (field: Field) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
  });

  return (
    <form
      className="contact-enquiry-form"
      id="enquiry"
      onSubmit={submit}
      onChange={() => setResult(null)}
      noValidate
    >
      <div className="contact-form-heading">
        <p className="eyebrow">{locale === 'ar' ? 'نموذج الاستفسار' : 'Enquiry form'}</p>
        <h2>{labels.title[locale]}</h2>
        <p>{labels.intro[locale]}</p>
      </div>
      <div className="contact-form-grid">
        <label htmlFor="contact-name">
          {labels.name[locale]} *
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            maxLength={120}
            onChange={() => clear('name')}
            {...errorProps('name')}
          />
          {errors.name && <span id="contact-name-error">{errors.name}</span>}
        </label>
        <label htmlFor="contact-business">
          {labels.company[locale]}
          <input
            id="contact-business"
            name="business"
            autoComplete="organization"
            maxLength={160}
          />
        </label>
        <label htmlFor="contact-email">
          {labels.email[locale]} *
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={200}
            dir="ltr"
            onChange={() => clear('email')}
            {...errorProps('email')}
          />
          {errors.email && <span id="contact-email-error">{errors.email}</span>}
        </label>
        <label htmlFor="contact-phone">
          {labels.phone[locale]}
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={25}
            dir="ltr"
            onChange={() => clear('phone')}
            {...errorProps('phone')}
          />
          {errors.phone && <span id="contact-phone-error">{errors.phone}</span>}
        </label>
        <label htmlFor="contact-division">
          {labels.division[locale]} *
          <select
            id="contact-division"
            name="division"
            defaultValue={initialDivision}
            onChange={() => clear('division')}
            {...errorProps('division')}
          >
            <option value="" disabled>
              {labels.chooseDivision[locale]}
            </option>
            {divisions.map((division) => (
              <option value={division.id} key={division.id}>
                {division.title[locale]}
              </option>
            ))}
          </select>
          {errors.division && <span id="contact-division-error">{errors.division}</span>}
        </label>
        <label htmlFor="contact-subject">
          {labels.subject[locale]}
          <select id="contact-subject" name="subject" defaultValue={initialSubject}>
            <option value="">{labels.chooseSubject[locale]}</option>
            {labels.subjects[locale].map((subject) => (
              <option value={subject} key={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>
        <label className="full" htmlFor="contact-requirements">
          {labels.message[locale]} *
          <textarea
            id="contact-requirements"
            name="requirements"
            rows={6}
            maxLength={2500}
            onChange={() => clear('requirements')}
            {...errorProps('requirements')}
          />
          {errors.requirements && (
            <span id="contact-requirements-error">{errors.requirements}</span>
          )}
        </label>
      </div>
      <div className="contact-form-submit">
        <button className="button" type="submit">
          {labels.review[locale]}
          <Arrow />
        </button>
        <p>{labels.privacy[locale]}</p>
      </div>
      <div className="contact-form-status" role="status" aria-live="polite">
        {result?.status === 'invalid' && <p>{labels.fixErrors[locale]}</p>}
        {result?.status === 'prepared' && (
          <div>
            <p>{labels.ready[locale]}</p>
            <a className="text-link" href={result.mailto}>
              {labels.openEmail[locale]}
              <Arrow />
            </a>
          </div>
        )}
      </div>
    </form>
  );
}
