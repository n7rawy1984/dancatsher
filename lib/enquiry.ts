'use client';

import { useRef, useState } from 'react';
import type { Locale } from '@/types/content';

export const enquiryMessages = {
  send: { en: 'Send enquiry', ar: 'إرسال الاستفسار' },
  sending: { en: 'Sending...', ar: 'جارٍ الإرسال...' },
  sent: { en: 'Your enquiry has been sent successfully.', ar: 'تم إرسال استفسارك بنجاح.' },
  error: {
    en: 'Something went wrong. Please try again.',
    ar: 'تعذّر إرسال استفسارك. يُرجى المحاولة مرة أخرى.',
  },
};

export function useEnquirySubmission(locale: Locale) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'invalid'>('idle');
  const pending = useRef(false);

  async function send(form: HTMLFormElement) {
    if (pending.current) return;
    pending.current = true;
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...Object.fromEntries(new FormData(form)),
          locale,
          source: window.location.pathname,
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('Submission failed');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    } finally {
      pending.current = false;
    }
  }

  function clearStatus() {
    if (!pending.current) setStatus('idle');
  }

  return { status, setStatus, send, clearStatus };
}
