import { Homepage } from '@/components/sections/homepage';
import { getLocale } from '@/lib/locale';
import { metadata } from '@/lib/seo';
import { navigation } from '@/data/navigation';
import { copy } from '@/data/copy';
import { company } from '@/data/company';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocale((await params).locale);
  return metadata(locale, copy[locale].homeTitle, navigation[0].description[locale]);
}
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = getLocale((await params).locale);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.legalName,
    foundingDate: String(company.established),
    ...(company.domain ? { url: company.domain } : {}),
    email: company.email,
    telephone: company.telephone,
    ...(company.linkedin ? { sameAs: [company.linkedin] } : {}),
    address: {
      '@type': 'PostalAddress',
      ...company.postalAddress,
      postOfficeBoxNumber: company.poBox,
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Homepage locale={locale} />
    </>
  );
}
