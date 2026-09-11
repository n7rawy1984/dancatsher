import type { MetadataRoute } from 'next';
import { company, indexingEnabled } from '@/data/company';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      ...(indexingEnabled
        ? { allow: '/', disallow: ['/_source/', '/.inspection/', '/api/'] }
        : { disallow: '/' }),
    },
    ...(company.domain ? { sitemap: `${company.domain.replace(/\/$/, '')}/sitemap.xml` } : {}),
  };
}
