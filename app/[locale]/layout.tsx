import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-500.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-600.css';
import '../globals.css';
import { getLocale } from '@/lib/locale';
import { copy } from '@/data/copy';
import { company } from '@/data/company';
import { Header } from '@/components/layout/header';
import { WhatsAppContact } from '@/components/layout/whatsapp-contact';
import { Footer } from '@/components/layout/footer';
export const metadata: Metadata = {
  icons: { icon: '/brand/favicon.png', apple: '/brand/apple-touch-icon.png' },
  title: { default: company.legalName, template: '%s | DANCATSHER' },
};
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = getLocale((await params).locale);
  const { tagline, location, brand, brandSub, mainNav, language, quote, menu, closeMenu } =
    copy[locale];
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <a className="skip-link" href="#main-content">
          {copy[locale].skip}
        </a>
        <Header
          locale={locale}
          labels={{ tagline, location, brand, brandSub, mainNav, language, quote, menu, closeMenu }}
        />
        <main id="main-content">{children}</main>
        <Footer locale={locale} />
        <WhatsAppContact locale={locale} />
      </body>
    </html>
  );
}
