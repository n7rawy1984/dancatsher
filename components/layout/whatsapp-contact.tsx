import { company } from '@/data/company';
import type { Locale } from '@/types/content';

export function WhatsAppContact({ locale }: { locale: Locale }) {
  if (!company.whatsapp) return null;
  const label = locale === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp';
  const message =
    locale === 'ar'
      ? 'مرحباً دان كاتشر، أود الاستفسار عن خدماتكم.'
      : 'Hello DANCATSHER, I would like to enquire about your services.';
  return (
    <a
      className="whatsapp-contact"
      data-locale={locale}
      href={`${company.whatsapp}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      <svg viewBox="0 0 24 24" width="25" height="25" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.48 0 .13 5.35.12 11.93c0 2.1.55 4.15 1.6 5.96L.02 24l6.25-1.64a11.93 11.93 0 0 0 5.77 1.47h.01c6.57 0 11.92-5.35 11.93-11.93a11.85 11.85 0 0 0-3.46-8.42ZM12.05 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.88 9.88 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.91-9.9a9.84 9.84 0 0 1 7 2.9 9.84 9.84 0 0 1 2.9 7c0 5.45-4.45 9.87-9.93 9.87Zm5.44-7.4c-.3-.15-1.76-.87-2.03-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.48 1.69.62.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.34Z" />
      </svg>
    </a>
  );
}
