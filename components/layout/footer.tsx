import Link from 'next/link';
import { company } from '@/data/company';
import { copy } from '@/data/copy';
import { divisions } from '@/data/divisions';
import { navigation } from '@/data/navigation';
import { route } from '@/lib/locale';
import type { Locale } from '@/types/content';
import { BrandLockup } from '@/components/ui/brand-lockup';
export function Footer({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <BrandLockup
              href={route(locale)}
              name={c.brand}
              descriptor={c.brandSub}
              className="footer-brand"
            />
            <p className="footer-description">{c.footer.description}</p>
            <p className="footer-location">
              <span className="location-dot" />
              {company.location[locale]}
            </p>
          </div>
          <nav aria-label={c.footerNav}>
            <h2>{c.footer.navigation}</h2>
            {navigation
              .filter((n) => n.path)
              .map((n) => (
                <Link key={n.path} href={route(locale, n.path)}>
                  {n.label[locale]}
                </Link>
              ))}
          </nav>
          <div>
            <h2>{c.footer.divisions}</h2>
            {divisions.map((d) => (
              <Link key={d.id} href={route(locale, `divisions/${d.id}`)}>
                {d.title[locale]}
              </Link>
            ))}
          </div>
          <div>
            <h2>{c.footer.contact}</h2>
            <address>
              {company.address[locale]}
              <br />
              {c.footer.poBox} {company.poBox}
            </address>
            {company.email && (
              <a href={`mailto:${company.email}`} dir="ltr">
                {company.email}
              </a>
            )}
            {company.telephone && (
              <a href={`tel:${company.telephone}`} dir="ltr">
                {company.telephoneDisplay}
              </a>
            )}
            {company.linkedin && (
              <a href={company.linkedin} target="_blank" rel="noopener noreferrer">
                {locale === 'ar' ? 'لينكدإن' : 'LinkedIn'}
              </a>
            )}
            {company.whatsapp && (
              <a href={company.whatsapp} target="_blank" rel="noopener noreferrer">
                {locale === 'ar' ? 'واتساب' : 'WhatsApp'}
              </a>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {c.footer.rights}
          </span>
          <span>{c.footer.closing}</span>
        </div>
        <p className="footer-credit">
          <span lang="en" dir="ltr">
            Website by{' '}
            <a
              href="https://www.elnahrawy.co"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Elnahrawy"
            >
              {'Elnahrawy'.split('').map((letter, index) => (
                <span
                  key={index}
                  className="footer-credit-letter"
                  aria-hidden="true"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  {letter}
                </span>
              ))}
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
