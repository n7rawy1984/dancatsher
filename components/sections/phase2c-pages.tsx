import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { company } from '@/data/company';
import { commonInner } from '@/data/inner-pages';
import { contactPage, productsPage, projectsPage } from '@/data/phase2c';
import { productCategories } from '@/data/products';
import { route } from '@/lib/locale';
import type { Locale, Localized } from '@/types/content';
import { Arrow, ButtonLink, TextLink } from '@/components/ui/primitives';
import { ContactEnquiryForm } from './contact-enquiry-form';
import { InnerHero } from './inner-pages';
import { ProjectPortfolio } from './project-portfolio';

const t = <T,>(value: Localized<T>, locale: Locale) => value[locale];

export function ProductsPage({ locale }: { locale: Locale }) {
  const p = productsPage;
  return (
    <>
      <InnerHero
        locale={locale}
        current={locale === 'ar' ? 'المنتجات' : 'Products'}
        eyebrow={t(p.hero.eyebrow, locale)}
        title={t(p.hero.title, locale)}
        lead={t(p.hero.lead, locale)}
        image="/images/products/steel-pipes.webp"
        imageAlt={t(p.hero.imageAlt, locale)}
      />
      <section className="section catalog-intro-section">
        <div className="container overview-grid">
          <div>
            <p className="eyebrow">{t(p.intro.eyebrow, locale)}</p>
            <h2>{t(p.intro.title, locale)}</h2>
          </div>
          <p>{t(p.intro.body, locale)}</p>
        </div>
      </section>
      <nav className="product-index" aria-label={t(p.indexEyebrow, locale)}>
        <div className="container">
          <p className="eyebrow">{t(p.indexEyebrow, locale)}</p>
          <h2>{t(p.indexTitle, locale)}</h2>
          <div className="product-index-links">
            {productCategories.map((category, index) => (
              <a href={`#${category.id}`} key={category.id}>
                <span>0{index + 1}</span>
                {category.title[locale]}
                <Arrow diagonal />
              </a>
            ))}
          </div>
        </div>
      </nav>
      <div className="product-catalog-sections">
        {productCategories.map((category, index) => (
          <section className="product-category-section" id={category.id} key={category.id}>
            <div className="container product-category-grid">
              <div className="product-category-visual">
                <Image
                  src={category.image}
                  alt={category.alt[locale]}
                  fill
                  sizes="(max-width: 767px) 100vw, 45vw"
                />
                <span aria-hidden="true">0{index + 1} / 07</span>
              </div>
              <div className="product-category-copy">
                <p className="eyebrow">
                  0{index + 1} / {t(p.examples, locale)}
                </p>
                <h2>{category.title[locale]}</h2>
                <p>{category.description[locale]}</p>
                <ul>
                  {category.products.map((product, productIndex) => (
                    <li key={product.cell}>
                      <span>{String(productIndex + 1).padStart(2, '0')}</span>
                      {product.name[locale]}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={`${route(locale, 'contact')}?division=material-supply&subject=material#enquiry`}
                >
                  {t(p.enquire, locale)}
                </ButtonLink>
              </div>
            </div>
          </section>
        ))}
      </div>
      <section className="product-commercial-note">
        <div className="container inner-bridge-grid">
          <div>
            <p className="eyebrow">{t(p.commercial.eyebrow, locale)}</p>
            <h2>{t(p.commercial.title, locale)}</h2>
          </div>
          <div>
            <p>{t(p.commercial.body, locale)}</p>
            <p className="catalog-source-note">{t(p.categoryNote, locale)}</p>
            <TextLink href={route(locale, 'divisions/material-supply')}>
              {locale === 'ar' ? 'قدرات توريد المواد' : 'Material supply capability'}
            </TextLink>
          </div>
        </div>
      </section>
      <section className="inner-closing">
        <div className="container inner-closing-grid">
          <div>
            <p className="eyebrow">{t(commonInner.closingEyebrow, locale)}</p>
            <h2>{t(commonInner.closingTitle, locale)}</h2>
          </div>
          <div>
            <p>{t(commonInner.closingBody, locale)}</p>
            <div className="inner-closing-actions">
              <ButtonLink href={`${route(locale, 'contact')}#enquiry`}>
                {t(commonInner.discuss, locale)}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ProjectsPage({ locale }: { locale: Locale }) {
  const p = projectsPage;
  return (
    <>
      <InnerHero
        locale={locale}
        current={locale === 'ar' ? 'أعمالنا' : 'Projects'}
        eyebrow={t(p.hero.eyebrow, locale)}
        title={t(p.hero.title, locale)}
        lead={t(p.hero.lead, locale)}
        image="/images/projects/shopping-centre-exterior.webp"
        imageAlt={t(p.hero.imageAlt, locale)}
      />
      <section className="section portfolio-intro">
        <div className="container overview-grid">
          <div>
            <p className="eyebrow">{t(p.intro.eyebrow, locale)}</p>
            <h2>{t(p.intro.title, locale)}</h2>
          </div>
          <p>{t(p.intro.body, locale)}</p>
        </div>
      </section>
      <section className="section portfolio-section">
        <div className="container">
          <ProjectPortfolio locale={locale} />
        </div>
      </section>
      <section className="project-closing">
        <div className="container inner-closing-grid">
          <div>
            <p className="eyebrow">{t(p.closing.eyebrow, locale)}</p>
            <h2>{t(p.closing.title, locale)}</h2>
          </div>
          <div>
            <p>{t(p.closing.body, locale)}</p>
            <div className="inner-closing-actions">
              <ButtonLink href={`${route(locale, 'contact')}#enquiry`}>
                {t(commonInner.discuss, locale)}
              </ButtonLink>
              <TextLink href={route(locale, 'divisions')}>
                {t(commonInner.divisions, locale)}
              </TextLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactPage({ locale }: { locale: Locale }) {
  const p = contactPage;
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address.en)}`;
  return (
    <>
      <InnerHero
        locale={locale}
        current={locale === 'ar' ? 'تواصل معنا' : 'Contact'}
        eyebrow={t(p.hero.eyebrow, locale)}
        title={t(p.hero.title, locale)}
        lead={t(p.hero.lead, locale)}
        image="/images/projects/shopping-centre-exterior.webp"
        imageAlt={
          locale === 'ar' ? 'موقع أعمال خارجية في أبوظبي' : 'External work site in Abu Dhabi'
        }
      />
      <section className="section contact-details-section">
        <div className="container">
          <div className="inner-section-heading">
            <div>
              <p className="eyebrow">{t(p.detailsEyebrow, locale)}</p>
              <h2>{t(p.detailsTitle, locale)}</h2>
            </div>
          </div>
          <div className="contact-detail-grid">
            <article>
              <span>01</span>
              <h3>{t(p.email, locale)}</h3>
              {company.email && (
                <a href={`mailto:${company.email}`} dir="ltr">
                  {company.email}
                  <Arrow diagonal />
                </a>
              )}
              {company.linkedin && (
                <a href={company.linkedin} target="_blank" rel="noopener noreferrer">
                  {locale === 'ar' ? 'لينكدإن' : 'LinkedIn'}
                  <Arrow diagonal />
                </a>
              )}
            </article>
            <article>
              <span>02</span>
              <h3>{t(p.phone, locale)}</h3>
              {company.telephone && (
                <a href={`tel:${company.telephone}`} dir="ltr">
                  {company.telephoneDisplay}
                  <Arrow diagonal />
                </a>
              )}
            </article>
            <article>
              <span>03</span>
              <h3>{t(p.address, locale)}</h3>
              <address>
                {company.address[locale]}
                <br />
                {locale === 'ar' ? 'ص.ب.' : 'P.O. Box'} {company.poBox}
              </address>
            </article>
          </div>
        </div>
      </section>
      <section className="contact-form-section">
        <div className="container">
          <Suspense fallback={null}>
            <ContactEnquiryForm locale={locale} />
          </Suspense>
        </div>
      </section>
      <section className="section contact-location-section">
        <div className="container contact-location-grid">
          <div className="location-diagram" aria-hidden="true">
            <span>{locale === 'ar' ? 'أبوظبي' : 'ABU DHABI'}</span>
            <i />
            <strong>DCS</strong>
            <i />
            <span>{locale === 'ar' ? 'مدينة محمد بن زايد' : 'MBZ CITY'}</span>
          </div>
          <div className="inner-copy-block">
            <p className="eyebrow">{t(p.mapEyebrow, locale)}</p>
            <h2>{t(p.mapTitle, locale)}</h2>
            <p>{t(p.mapBody, locale)}</p>
            <a className="text-link" href={mapHref} target="_blank" rel="noreferrer">
              {t(p.openMap, locale)}
              <Arrow diagonal />
            </a>
          </div>
        </div>
      </section>
      <section className="contact-availability">
        <div className="container">
          <p>{t(p.availability, locale)}</p>
          <Link href={route(locale)}>
            {locale === 'ar' ? 'العودة إلى الرئيسية' : 'Return home'} <Arrow />
          </Link>
        </div>
      </section>
    </>
  );
}
