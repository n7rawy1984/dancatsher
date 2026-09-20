import Image from 'next/image';
import { ServiceImageSection } from './client-image-sections';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { company } from '@/data/company';
import { divisions } from '@/data/divisions';
import {
  aboutPage,
  commonInner,
  contractingPage,
  divisionsPage,
  hvacPage,
  qhsePage,
  supplyPage,
} from '@/data/inner-pages';
import { productCategories } from '@/data/products';
import { projects } from '@/data/projects';
import { route } from '@/lib/locale';
import type { Locale, Localized } from '@/types/content';
import { Arrow, ButtonLink, TechnicalIcon, TextLink } from '@/components/ui/primitives';

const t = <T,>(value: Localized<T>, locale: Locale) => value[locale];

function Breadcrumbs({
  locale,
  current,
  division = false,
}: {
  locale: Locale;
  current: string;
  division?: boolean;
}) {
  return (
    <nav className="inner-breadcrumbs" aria-label={locale === 'ar' ? 'مسار الصفحة' : 'Breadcrumb'}>
      <Link href={route(locale)}>{t(commonInner.home, locale)}</Link>
      <span aria-hidden="true">/</span>
      {division && (
        <>
          <Link href={route(locale, 'divisions')}>{t(commonInner.divisions, locale)}</Link>
          <span aria-hidden="true">/</span>
        </>
      )}
      <span aria-current="page">{current}</span>
    </nav>
  );
}

export function InnerHero({
  locale,
  eyebrow,
  title,
  lead,
  current,
  image,
  imageAlt,
  division = false,
  dark = false,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  lead: string;
  current: string;
  image?: string;
  imageAlt?: string;
  division?: boolean;
  dark?: boolean;
}) {
  return (
    <header
      className={`inner-hero${dark ? ' inner-hero-dark' : ''}${image ? '' : ' inner-hero-text'}`}
    >
      <div className="container inner-hero-grid">
        <div className="inner-hero-copy">
          <Breadcrumbs locale={locale} current={current} division={division} />
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="inner-hero-lead">{lead}</p>
          <div className="inner-hero-actions">
            <ButtonLink href={`${route(locale, 'contact')}#enquiry`}>
              {t(commonInner.request, locale)}
            </ButtonLink>
            {division && (
              <TextLink href={route(locale, 'divisions')}>
                {t(commonInner.divisions, locale)}
              </TextLink>
            )}
          </div>
        </div>
        {image ? (
          <div
            className={`inner-hero-image${image.includes('/products/') ? ' product-hero-image' : ''}`}
          >
            <Image
              src={image}
              alt={imageAlt ?? ''}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 52vw"
            />
            <span className="inner-image-index" aria-hidden="true">
              DCS / UAE
            </span>
          </div>
        ) : (
          <div className="inner-hero-diagram" aria-hidden="true">
            <span />
            <span />
            <span />
            <strong>Q / H / S / E</strong>
          </div>
        )}
      </div>
    </header>
  );
}

function NumberedCards({
  items,
  locale,
  className = '',
}: {
  items: readonly { title: Localized<string>; body: Localized<string> }[];
  locale: Locale;
  className?: string;
}) {
  return (
    <div className={`inner-number-grid ${className}`.trim()}>
      {items.map((item, index) => (
        <article key={t(item.title, locale)}>
          <span className="inner-number">0{index + 1}</span>
          <h3>{t(item.title, locale)}</h3>
          <p>{t(item.body, locale)}</p>
        </article>
      ))}
    </div>
  );
}

function ProcessSteps({
  locale,
  eyebrow,
  title,
  steps,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  steps: readonly { title: Localized<string>; body: Localized<string> }[];
}) {
  return (
    <section className="section inner-process">
      <div className="container">
        <div className="inner-section-heading">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2>{title}</h2>
          </div>
        </div>
        <NumberedCards items={steps} locale={locale} className="process-grid" />
      </div>
    </section>
  );
}

function ClosingCta({ locale, secondary }: { locale: Locale; secondary?: ReactNode }) {
  return (
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
            {secondary}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutInnerPage({ locale }: { locale: Locale }) {
  const p = aboutPage;
  return (
    <>
      <InnerHero
        locale={locale}
        current={t(p.hero.eyebrow, locale).replace(/^.*\/\s*/, '')}
        eyebrow={t(p.hero.eyebrow, locale)}
        title={t(p.hero.title, locale)}
        lead={t(p.hero.lead, locale)}
        image="/images/projects/shopping-centre-exterior.webp"
        imageAlt={t(p.hero.imageAlt, locale)}
      />
      <section className="section about-video-section" aria-labelledby="about-video-title">
        <div className="container">
          <div className="inner-section-heading">
            <h2 id="about-video-title">
              {locale === 'ar' ? 'دان كاتشر عن قرب' : 'DANCATSHER in Focus'}
            </h2>
          </div>
          <video
            className="about-profile-video"
            controls
            playsInline
            preload="metadata"
            width={1280}
            height={720}
            dir="ltr"
            aria-labelledby="about-video-title"
          >
            <source src="/videos/dancatsher-company-profile.mp4" type="video/mp4" />
            {locale === 'ar'
              ? 'متصفحك لا يدعم تشغيل الفيديو. '
              : 'Your browser does not support video playback. '}
            <a href="/videos/dancatsher-company-profile.mp4">
              {locale === 'ar'
                ? 'افتح الفيديو التعريفي بالشركة'
                : 'Open the company introduction video'}
            </a>
          </video>
        </div>
      </section>
      <section className="section inner-story">
        <div className="container story-grid">
          <div className="story-year" aria-hidden="true">
            <span>{locale === 'ar' ? 'تأسست' : 'EST.'}</span>
            <strong>{company.established}</strong>
            <span>{locale === 'ar' ? 'أبوظبي' : 'ABU DHABI'}</span>
          </div>
          <div className="inner-copy-block">
            <p className="eyebrow">{t(p.story.eyebrow, locale)}</p>
            <h2>{t(p.story.title, locale)}</h2>
            <p className="lead">{t(p.story.lead, locale)}</p>
            <p>{t(p.story.body, locale)}</p>
          </div>
        </div>
      </section>
      <section
        className="inner-facts"
        aria-label={locale === 'ar' ? 'حقائق عن الشركة' : 'Company facts'}
      >
        <div className="container inner-facts-grid">
          {p.facts.map((fact) => (
            <div key={fact.value}>
              <strong dir="ltr">{fact.value}</strong>
              <span>{t(fact.label, locale)}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="section purpose-section">
        <div className="container">
          <div className="inner-section-heading">
            <div>
              <p className="eyebrow">{t(p.purpose.eyebrow, locale)}</p>
              <h2>{t(p.purpose.title, locale)}</h2>
            </div>
          </div>
          <div className="purpose-grid">
            <article>
              <span className="inner-number">01</span>
              <h3>{t(p.purpose.visionTitle, locale)}</h3>
              <p>{t(p.purpose.vision, locale)}</p>
            </article>
            <article>
              <span className="inner-number">02</span>
              <h3>{t(p.purpose.missionTitle, locale)}</h3>
              <p>{t(p.purpose.mission, locale)}</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section values-section">
        <div className="container">
          <div className="inner-section-heading">
            <div>
              <p className="eyebrow">{t(p.values.eyebrow, locale)}</p>
              <h2>{t(p.values.title, locale)}</h2>
            </div>
          </div>
          <NumberedCards items={p.values.items} locale={locale} />
        </div>
      </section>
      <section className="section capability-feature">
        <div className="container capability-feature-grid">
          <div className="feature-image">
            <Image
              src="/images/projects/interlock-paving.webp"
              alt={t(p.capability.imageAlt, locale)}
              fill
              sizes="(max-width: 767px) 100vw, 48vw"
            />
            <span className="experience-stamp inner-stamp">
              <strong dir="ltr">
                30<span>+</span>
              </strong>
              <span>{locale === 'ar' ? 'خبرة الفريق المشتركة' : 'COMBINED TEAM EXPERIENCE'}</span>
            </span>
          </div>
          <div className="inner-copy-block">
            <p className="eyebrow">{t(p.capability.eyebrow, locale)}</p>
            <h2>{t(p.capability.title, locale)}</h2>
            <p className="lead">{t(p.capability.lead, locale)}</p>
            <p>{t(p.capability.body, locale)}</p>
            <TextLink href={route(locale, 'divisions')}>
              {t(commonInner.divisions, locale)}
            </TextLink>
          </div>
        </div>
      </section>
      <section className="inner-bridge">
        <div className="container inner-bridge-grid">
          <div>
            <p className="eyebrow">{t(p.bridge.eyebrow, locale)}</p>
            <h2>{t(p.bridge.title, locale)}</h2>
          </div>
          <div>
            <p>{t(p.bridge.body, locale)}</p>
            <TextLink href={route(locale, 'qhse')}>{t(p.bridge.link, locale)}</TextLink>
          </div>
        </div>
      </section>
      <ClosingCta locale={locale} />
    </>
  );
}

export function DivisionsInnerPage({ locale }: { locale: Locale }) {
  const p = divisionsPage;
  return (
    <>
      <InnerHero
        locale={locale}
        current={t(commonInner.divisions, locale)}
        eyebrow={t(p.hero.eyebrow, locale)}
        title={t(p.hero.title, locale)}
        lead={t(p.hero.lead, locale)}
        image="/images/projects/shopping-centre-exterior.webp"
        imageAlt={t(p.hero.imageAlt, locale)}
      />
      <section className="section divisions-intro">
        <div className="container divisions-intro-grid">
          <div>
            <p className="eyebrow">{t(p.intro.eyebrow, locale)}</p>
            <h2>{t(p.intro.title, locale)}</h2>
          </div>
          <div>
            <p>{t(p.intro.body, locale)}</p>
            <ul>
              {p.needs.map((need, index) => (
                <li key={t(need, locale)}>
                  <span>0{index + 1}</span>
                  {t(need, locale)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="division-bands">
        {divisions.map((division, index) => (
          <article className="division-band" key={division.id}>
            <div className="container division-band-grid">
              <div className="division-band-copy">
                <span className="band-number">0{index + 1}</span>
                <TechnicalIcon variant={index} />
                <h2>{division.title[locale]}</h2>
                <p>{division.description[locale]}</p>
                <ul>
                  {division.capabilities[locale].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <TextLink href={route(locale, `divisions/${division.id}`)}>
                  {locale === 'ar' ? 'استكشف قدرات القطاع' : 'Explore this division'}
                </TextLink>
              </div>
              <Link
                className="division-band-image"
                href={route(locale, `divisions/${division.id}`)}
                tabIndex={-1}
              >
                <Image
                  src={division.image}
                  alt={division.alt[locale]}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <section className="section coordination-section">
        <div className="container coordination-grid">
          <div>
            <p className="eyebrow">{t(p.coordination.eyebrow, locale)}</p>
            <h2>{t(p.coordination.title, locale)}</h2>
          </div>
          <p>{t(p.coordination.body, locale)}</p>
        </div>
      </section>
      <ClosingCta locale={locale} />
    </>
  );
}

function ServiceGroups({
  locale,
  groups,
}: {
  locale: Locale;
  groups: readonly {
    title: Localized<string>;
    body: Localized<string>;
    items: Localized<readonly string[]>;
  }[];
}) {
  return (
    <div className="service-group-grid">
      {groups.map((group, index) => (
        <article key={t(group.title, locale)}>
          <div className="service-group-heading">
            <span>0{index + 1}</span>
            <TechnicalIcon variant={index % 3} />
          </div>
          <h3>{t(group.title, locale)}</h3>
          <p>{t(group.body, locale)}</p>
          <ul>
            {t(group.items, locale).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function ContractingInnerPage({ locale }: { locale: Locale }) {
  const p = contractingPage;
  return (
    <>
      <InnerHero
        locale={locale}
        current={divisions[0].title[locale]}
        division
        eyebrow={t(p.hero.eyebrow, locale)}
        title={t(p.hero.title, locale)}
        lead={t(p.hero.lead, locale)}
        image="/images/projects/interlock-paving.webp"
        imageAlt={t(p.hero.imageAlt, locale)}
      />
      <section className="section capability-overview">
        <div className="container overview-grid">
          <div>
            <p className="eyebrow">{t(p.overview.eyebrow, locale)}</p>
            <h2>{t(p.overview.title, locale)}</h2>
          </div>
          <p>{t(p.overview.body, locale)}</p>
        </div>
      </section>
      <section className="section service-groups-section">
        <div className="container">
          <ServiceGroups locale={locale} groups={p.groups} />
        </div>
      </section>
      <ServiceImageSection group="kitchen-sanitary" locale={locale} />
      <ServiceImageSection group="tiles-installation" locale={locale} />
      <section className="section split-detail">
        <div className="container split-detail-grid">
          <div>
            <p className="eyebrow">{t(p.detail.eyebrow, locale)}</p>
            <h2>{t(p.detail.title, locale)}</h2>
          </div>
          <div>
            {t(p.detail.paragraphs, locale).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <ProcessSteps
        locale={locale}
        eyebrow={t(p.method.eyebrow, locale)}
        title={t(p.method.title, locale)}
        steps={p.method.steps}
      />
      <section className="section evidence-section">
        <div className="container">
          <div className="inner-section-heading evidence-heading">
            <div>
              <p className="eyebrow">{t(p.evidence.eyebrow, locale)}</p>
              <h2>{t(p.evidence.title, locale)}</h2>
            </div>
            <p>{t(p.evidence.note, locale)}</p>
          </div>
          <div className="evidence-grid">
            {projects.map((project) => (
              <figure key={project.id}>
                <div>
                  <Image
                    src={project.image}
                    alt={project.alt[locale]}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                  />
                </div>
                <figcaption>
                  <span>{project.category[locale]}</span>
                  {project.title[locale]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <ClosingCta
        locale={locale}
        secondary={
          <TextLink href={route(locale, 'projects')}>
            {locale === 'ar' ? 'شاهد أعمال المواقع' : 'View site work'}
          </TextLink>
        }
      />
    </>
  );
}

export function HvacInnerPage({ locale }: { locale: Locale }) {
  const p = hvacPage;
  return (
    <>
      <InnerHero
        locale={locale}
        current={divisions[1].title[locale]}
        division
        eyebrow={t(p.hero.eyebrow, locale)}
        title={t(p.hero.title, locale)}
        lead={t(p.hero.lead, locale)}
        image="/images/projects/hvac-condensing-units.webp"
        imageAlt={t(p.hero.imageAlt, locale)}
      />
      <section className="section capability-overview">
        <div className="container overview-grid">
          <div>
            <p className="eyebrow">{t(p.overview.eyebrow, locale)}</p>
            <h2>{t(p.overview.title, locale)}</h2>
          </div>
          <p>{t(p.overview.body, locale)}</p>
        </div>
      </section>
      <section className="section service-groups-section">
        <div className="container">
          <ServiceGroups locale={locale} groups={p.systems} />
        </div>
      </section>
      <ServiceImageSection group="hvac" locale={locale} />
      <ProcessSteps
        locale={locale}
        eyebrow={t(p.method.eyebrow, locale)}
        title={t(p.method.title, locale)}
        steps={p.method.steps}
      />
      <section className="section hvac-installation">
        <div className="container hvac-installation-grid">
          <div className="feature-image">
            <Image
              src="/images/projects/hvac-condensing-units.webp"
              alt={t(p.hero.imageAlt, locale)}
              fill
              sizes="(max-width: 767px) 100vw, 48vw"
            />
          </div>
          <div className="inner-copy-block">
            <p className="eyebrow">{t(p.installation.eyebrow, locale)}</p>
            <h2>{t(p.installation.title, locale)}</h2>
            <p>{t(p.installation.body, locale)}</p>
          </div>
        </div>
      </section>
      <section className="hvac-media-section">
        <div className="container hvac-media-grid">
          <div className="hvac-system-visual" aria-hidden="true">
            <span>01</span>
            <i />
            <span>02</span>
            <i />
            <span>03</span>
          </div>
          <div>
            <p className="eyebrow">{t(p.media.eyebrow, locale)}</p>
            <h2>{t(p.media.title, locale)}</h2>
            <p>{t(p.media.body, locale)}</p>
            <ol>
              {t(p.media.items, locale).map((item, index) => (
                <li key={item}>
                  <span>0{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <ClosingCta
        locale={locale}
        secondary={
          <TextLink href={route(locale, 'projects')}>
            {locale === 'ar' ? 'شاهد أعمال التكييف' : 'View HVAC work'}
          </TextLink>
        }
      />
    </>
  );
}

export function SupplyInnerPage({ locale }: { locale: Locale }) {
  const p = supplyPage;
  return (
    <>
      <InnerHero
        locale={locale}
        current={divisions[2].title[locale]}
        division
        eyebrow={t(p.hero.eyebrow, locale)}
        title={t(p.hero.title, locale)}
        lead={t(p.hero.lead, locale)}
        image="/images/products/copper-fittings.webp"
        imageAlt={t(p.hero.imageAlt, locale)}
      />
      <section className="section capability-overview">
        <div className="container overview-grid">
          <div>
            <p className="eyebrow">{t(p.overview.eyebrow, locale)}</p>
            <h2>{t(p.overview.title, locale)}</h2>
          </div>
          <p>{t(p.overview.body, locale)}</p>
        </div>
      </section>
      <ServiceImageSection group="oil-gas-cover" locale={locale} />
      <section className="section supply-categories">
        <div className="container">
          <div className="inner-section-heading">
            <div>
              <p className="eyebrow">{t(p.categoryEyebrow, locale)}</p>
              <h2>{t(p.categoryTitle, locale)}</h2>
            </div>
          </div>
          <div className="supply-category-list">
            {productCategories.map((category, index) => (
              <article key={category.id}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{category.title[locale]}</h3>
                  <p>{category.description[locale]}</p>
                </div>
                <ul>
                  {category.products.map((product) => (
                    <li key={product.cell}>{product.name[locale]}</li>
                  ))}
                </ul>
                <Link
                  href={`${route(locale, 'products')}?category=${category.id}#${category.id}`}
                  aria-label={`${locale === 'ar' ? 'استكشف' : 'Explore'} ${category.title[locale]}`}
                >
                  <Arrow diagonal />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section supply-spotlight">
        <div className="container spotlight-grid">
          <div className="spotlight-product">
            <Image
              src="/images/products/steel-pipes.webp"
              alt={t(p.spotlight.imageAlt, locale)}
              width={351}
              height={205}
            />
          </div>
          <div className="inner-copy-block">
            <p className="eyebrow">{t(p.spotlight.eyebrow, locale)}</p>
            <h2>{t(p.spotlight.title, locale)}</h2>
            <p>{t(p.spotlight.body, locale)}</p>
            <TextLink href={`${route(locale, 'products')}?category=pipes-fittings#pipes-fittings`}>
              {t(commonInner.products, locale)}
            </TextLink>
          </div>
        </div>
      </section>
      <section className="section supply-clusters">
        <div className="container">
          <NumberedCards items={p.clusters} locale={locale} />
        </div>
      </section>
      <ProcessSteps
        locale={locale}
        eyebrow={t(p.process.eyebrow, locale)}
        title={t(p.process.title, locale)}
        steps={p.process.steps}
      />
      <ClosingCta
        locale={locale}
        secondary={
          <TextLink href={route(locale, 'products')}>{t(commonInner.products, locale)}</TextLink>
        }
      />
    </>
  );
}

export function QhseInnerPage({ locale }: { locale: Locale }) {
  const p = qhsePage;
  return (
    <>
      <InnerHero
        locale={locale}
        current="QHSE"
        eyebrow={t(p.hero.eyebrow, locale)}
        title={t(p.hero.title, locale)}
        lead={t(p.hero.lead, locale)}
        dark
      />
      <section className="section qhse-philosophy">
        <div className="container overview-grid">
          <div>
            <p className="eyebrow">{t(p.philosophy.eyebrow, locale)}</p>
            <h2>{t(p.philosophy.title, locale)}</h2>
          </div>
          <p>{t(p.philosophy.body, locale)}</p>
        </div>
        <div className="container">
          <NumberedCards items={p.qualitySteps} locale={locale} />
        </div>
      </section>
      <section className="section qhse-hse">
        <div className="container qhse-hse-grid">
          <div>
            <p className="eyebrow">{t(p.hse.eyebrow, locale)}</p>
            <h2>{t(p.hse.title, locale)}</h2>
          </div>
          <p>{t(p.hse.body, locale)}</p>
        </div>
      </section>
      <section className="section qhse-disciplines">
        <div className="container">
          <NumberedCards items={p.disciplines} locale={locale} />
        </div>
      </section>
      <section className="qhse-statement">
        <div className="container">
          <p className="eyebrow">{t(p.statement.eyebrow, locale)}</p>
          <h2>{t(p.statement.title, locale)}</h2>
          <p>{t(p.statement.body, locale)}</p>
        </div>
      </section>
      <ClosingCta locale={locale} />
    </>
  );
}
