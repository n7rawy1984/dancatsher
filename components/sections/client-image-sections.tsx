import inventory from '@/data/client-images.json';

// Only public display fields cross the client component boundary.
const images = inventory.map(({ src, width, height, caption, category, group }) => ({
  src,
  width,
  height,
  caption,
  category,
  group,
}));
import type { Locale } from '@/types/content';
import { ClientGallery } from './client-gallery';

export function ProductImageGallery({ category, locale }: { category: string; locale: Locale }) {
  const selected = images.filter((image) => image.category === category);
  if (!selected.length) return null;
  return (
    <div className="container">
      <ClientGallery
        images={selected}
        locale={locale}
        title={locale === 'ar' ? 'صور المنتجات والتطبيقات' : 'Products & applications'}
      />
    </div>
  );
}

export function ServiceImageSection({
  group,
  locale,
}: {
  group: 'hvac' | 'kitchen-sanitary' | 'tiles-installation' | 'oil-gas-cover';
  locale: Locale;
}) {
  const titles = {
    hvac: { en: 'Cooling systems & service applications', ar: 'أنظمة التبريد وتطبيقات الصيانة' },
    'kitchen-sanitary': {
      en: 'Interior, kitchen & sanitary applications',
      ar: 'تطبيقات التشطيبات والمطابخ والأدوات الصحية',
    },
    'tiles-installation': {
      en: 'Paving & blockwork applications',
      ar: 'تطبيقات الرصف والبناء بالبلوك',
    },
    'oil-gas-cover': { en: 'Materials for industrial operations', ar: 'مواد للعمليات الصناعية' },
  };
  const supply = group === 'oil-gas-cover';
  return (
    <section className="section client-service-images">
      <div className={`container${supply ? ' client-supply-editorial' : ''}`}>
        <div className="inner-copy-block">
          <p className="eyebrow">{locale === 'ar' ? 'التطبيقات' : 'Applications'}</p>
          <h2>{titles[group][locale]}</h2>
          <p>
            {supply
              ? locale === 'ar'
                ? 'استكشف مجموعات المنتجات للمتطلبات الصناعية، من الأنابيب والوصلات إلى المنتجات الكهربائية ومعدات الوقاية الشخصية.'
                : 'Explore product groups for industrial requirements, from pipes and fittings to electrical products and personal protective equipment.'
              : locale === 'ar'
                ? 'صور توضيحية لأنواع الأعمال والأنظمة والخدمات، وليست سجلاً لمشاريع منفذة.'
                : 'Illustrations of work types, systems and services; these images are not a record of completed projects.'}
          </p>
          {supply && (
            <a className="text-link" href={`/${locale}/products`}>
              {locale === 'ar' ? 'استكشف مجموعات المنتجات' : 'Explore product groups'}{' '}
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        <ClientGallery
          images={images.filter((image) => image.group === group)}
          locale={locale}
          title={locale === 'ar' ? 'صور توضيحية للتطبيقات' : 'Application illustrations'}
          editorial={supply}
        />
      </div>
    </section>
  );
}
