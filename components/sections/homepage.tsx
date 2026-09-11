import Image from 'next/image';
import Link from 'next/link';
import { copy } from '@/data/copy';
import { company } from '@/data/company';
import { divisions } from '@/data/divisions';
import { productCategories } from '@/data/products';
import { projects } from '@/data/projects';
import { route } from '@/lib/locale';
import type { Locale } from '@/types/content';
import {
  Arrow,
  ButtonLink,
  SectionHeading,
  TechnicalIcon,
  TextLink,
} from '@/components/ui/primitives';
import { EnquiryForm } from './enquiry-form';
export function Homepage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-rule" />
              {c.hero.eyebrow}
            </p>
            <h1>
              {c.hero.lines.map((line, i) => (
                <span key={line} className={i === 2 ? 'cyan' : ''}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="hero-description">{c.hero.description}</p>
            <div className="hero-actions">
              <ButtonLink href="#enquiry">{c.quote}</ButtonLink>
              <TextLink href="#divisions">{c.explore}</TextLink>
            </div>
            <div className="hero-bottom">
              <span className="crosshair" aria-hidden="true">
                +
              </span>
              <span>{c.hero.note}</span>
              <span className="line" />
            </div>
          </div>
          <div className="hero-visual">
            <Image
              src="/images/projects/shopping-centre-exterior.webp"
              alt={c.hero.imageAlt}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              preload
              className="hero-photo"
            />
            <div className="photo-grid" aria-hidden="true" />
            <div className="photo-corner" aria-hidden="true" />
            <div className="hero-caption">
              <span>{c.hero.caption}</span>
              <span aria-hidden="true">01 — 03</span>
            </div>
            <div className="hero-vertical" aria-hidden="true">
              {c.hero.drawingLabel}
            </div>
          </div>
        </div>
      </section>
      <section className="credibility">
        <div className="container stats-grid">
          {c.stats.map((s) => (
            <div className="stat" key={s.value}>
              <strong dir="ltr">{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="section divisions-section" id="divisions">
        <div className="container">
          <SectionHeading {...c.divisions} />
          <div className="division-grid">
            {divisions.map((d, i) => (
              <article className="division-card" key={d.id}>
                <Link
                  href={route(locale, `divisions/${d.id}`)}
                  className={`division-image ${i === 2 ? 'product-image' : ''}`}
                  tabIndex={-1}
                >
                  <Image
                    src={d.image}
                    alt={d.alt[locale]}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                  />
                  <span className="division-number">0{i + 1}</span>
                </Link>
                <div className="division-body">
                  <div className="division-title">
                    <TechnicalIcon variant={i} />
                    <h3>{d.title[locale]}</h3>
                  </div>
                  <p>{d.description[locale]}</p>
                  <ul>
                    {d.capabilities[locale].map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <TextLink href={route(locale, `divisions/${d.id}`)}>{c.learn}</TextLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section products-section" id="products">
        <div className="container">
          <SectionHeading {...c.products}>
            <TextLink href={route(locale, 'products')}>{c.allProducts}</TextLink>
          </SectionHeading>
          <div className="catalog-layout">
            <div className="catalog-feature">
              <div className="catalog-feature-image">
                <Image
                  src="/images/products/steel-pipes.webp"
                  alt={c.products.imageAlt}
                  width={351}
                  height={205}
                />
              </div>
              <div className="catalog-feature-copy">
                <p className="eyebrow">{c.products.feature}</p>
                <h3>{c.products.featureTitle}</h3>
                <p>{c.products.featureDescription}</p>
                <TextLink
                  href={`${route(locale, 'products')}?category=pipes-fittings#pipes-fittings`}
                >
                  {c.products.featureCta}
                </TextLink>
              </div>
            </div>
            <div className="category-index">
              <p className="eyebrow">
                {c.products.categories}
                <span aria-hidden="true">/ 07</span>
              </p>
              {productCategories.map((p, i) => (
                <Link
                  className="category-row"
                  href={`${route(locale, 'products')}?category=${p.id}#${p.id}`}
                  key={p.id}
                >
                  <span className="category-number">0{i + 1}</span>
                  <span>{p.title[locale]}</span>
                  <Arrow diagonal />
                </Link>
              ))}
              <p className="catalog-note">{c.products.note}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section about-section">
        <div className="container about-grid">
          <div className="about-visual">
            <Image
              src="/images/projects/interlock-paving.webp"
              alt={c.about.imageAlt}
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
            />
            <div className="experience-stamp">
              <strong dir="ltr">
                30<span>+</span>
              </strong>
              <span>{c.about.badge}</span>
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">{c.about.eyebrow}</p>
            <h2 className="section-title">{c.about.title}</h2>
            <p className="lead">{c.about.description}</p>
            <p>{c.about.body}</p>
            <ul className="about-pillars">
              {c.about.pillars.map((x) => (
                <li key={x}>
                  <span aria-hidden="true">✓</span>
                  {x}
                </li>
              ))}
            </ul>
            <TextLink href={route(locale, 'about')}>{c.aboutLink}</TextLink>
          </div>
        </div>
      </section>
      <section className="section projects-section" id="projects">
        <div className="container">
          <SectionHeading {...c.projects}>
            <TextLink href={route(locale, 'projects')}>{c.allProjects}</TextLink>
          </SectionHeading>
          <div className="project-grid">
            {projects.slice(0, 3).map((p, i) => (
              <article className={`project project-${i}`} key={p.id}>
                <Link className="project-image" href={route(locale, 'projects')} tabIndex={-1}>
                  <Image
                    src={p.image}
                    alt={p.alt[locale]}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 40vw"
                  />
                </Link>
                <div className="project-caption">
                  <div>
                    <p className="eyebrow">{p.category[locale]}</p>
                    <h3>
                      <Link href={route(locale, 'projects')}>{p.title[locale]}</Link>
                    </h3>
                  </div>
                  <Arrow diagonal />
                </div>
              </article>
            ))}
          </div>
          <p className="project-note">{c.projects.note}</p>
        </div>
      </section>
      <section className="section qhse-section">
        <div className="container">
          <SectionHeading {...c.qhse}>
            <TextLink href={route(locale, 'qhse')}>{c.qhse.link}</TextLink>
          </SectionHeading>
          <div className="qhse-grid">
            {c.qhse.items.map((item, i) => (
              <article key={item.title}>
                <span className="qhse-mark" aria-hidden="true">
                  0{i + 1}
                  <span>+</span>
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section why-section">
        <div className="container">
          <p className="eyebrow">{c.why.eyebrow}</p>
          <h2 className="why-title">{c.why.title}</h2>
          <div className="why-grid">
            {c.why.items.map((item, i) => (
              <article key={item.title}>
                <span className="why-number">/ 0{i + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section contact-section" id="enquiry">
        <div className="container contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">{c.contact.eyebrow}</p>
            <h2>{c.contact.title}</h2>
            <p className="contact-description">{c.contact.description}</p>
            <div className="contact-details">
              {company.email && (
                <div>
                  <span>{c.contact.email}</span>
                  <a href={`mailto:${company.email}`} dir="ltr">
                    {company.email}
                    <Arrow diagonal />
                  </a>
                </div>
              )}
              {company.telephone && (
                <div>
                  <span>{c.contact.phone}</span>
                  <a href={`tel:${company.telephone}`} dir="ltr">
                    {company.telephoneDisplay}
                    <Arrow diagonal />
                  </a>
                </div>
              )}
              <div>
                <span>{c.contact.visit}</span>
                <address>{company.address[locale]}</address>
              </div>
            </div>
          </div>
          <EnquiryForm locale={locale} labels={c.contact} />
        </div>
      </section>
    </>
  );
}
