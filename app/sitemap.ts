import type { MetadataRoute } from 'next';
import { company } from '@/data/company';
import { publicPaths } from '@/data/routes';
import { locales } from '@/types/content';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!company.domain) return [];
  const domain = company.domain.replace(/\/$/, '');
  return publicPaths.flatMap((path) => {
    const suffix = path ? `/${path}` : '';
    return locales.map((locale) => ({
      url: `${domain}/${locale}${suffix}`,
      alternates: {
        languages: {
          en: `${domain}/en${suffix}`,
          ar: `${domain}/ar${suffix}`,
          'x-default': `${domain}/en${suffix}`,
        },
      },
    }));
  });
}
