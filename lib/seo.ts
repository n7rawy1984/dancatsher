import type { Metadata } from 'next';
import { company, indexingEnabled } from '@/data/company';
import type { Locale } from '@/types/content';
export function metadata(locale: Locale, title: string, description: string, path = ''): Metadata {
  const suffix = path ? `/${path}` : '';
  const domain = company.domain?.replace(/\/$/, '');
  return {
    title,
    description,
    ...(domain
      ? {
          metadataBase: new URL(domain),
          alternates: {
            canonical: `${domain}/${locale}${suffix}`,
            languages: {
              en: `${domain}/en${suffix}`,
              ar: `${domain}/ar${suffix}`,
              'x-default': `${domain}/en${suffix}`,
            },
          },
        }
      : {}),
    robots: { index: indexingEnabled, follow: true },
    openGraph: {
      title: `${title} | DANCATSHER`,
      description,
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_AE',
      alternateLocale: locale === 'ar' ? 'en_AE' : 'ar_AE',
      siteName: company.legalName,
      ...(domain
        ? {
            url: `${domain}/${locale}${suffix}`,
            images: [
              {
                url: '/images/projects/shopping-centre-exterior.webp',
                width: 768,
                height: 1024,
                alt: company.legalName,
              },
            ],
          }
        : {}),
    },
  };
}
