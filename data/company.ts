import type { Localized } from '@/types/content';
import { normalizeSiteUrl } from '@/lib/site-url';
interface Company {
  legalName: string;
  shortName: string;
  established: number;
  domain: string | null;
  email: string | null;
  officialEmail: string | null;
  telephone: string | null;
  telephoneDisplay: string | null;
  whatsapp: string | null;
  linkedin: string | null;
  tradeLicense: string | null;
  vatTrn: string | null;
  address: Localized;
  officeMapTitle: Localized;
  officeDirections: Localized;
  location: Localized;
  poBox: string;
  postalAddress: { streetAddress: string; addressLocality: string; addressCountry: string };
}
// Approved public contact address. Form delivery is configured separately on the server.
const officialEmail = 'info@dancatsher.com';

export const company: Company = {
  legalName: 'DANCATSHER Contracting L.L.C.',
  shortName: 'DCS',
  established: 2018,
  domain: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  officialEmail,
  email: officialEmail,
  telephone: '+971506163531',
  telephoneDisplay: '+971 50 616 3531',
  whatsapp: 'https://wa.me/971506163531',
  linkedin: 'https://linkedin.com/in/dancatsher-ts-724929253',
  tradeLicense: null,
  vatTrn: null,
  location: { en: 'Abu Dhabi, United Arab Emirates', ar: 'أبوظبي، الإمارات العربية المتحدة' },
  address: {
    en: 'Mazyad Mall, Tower 1, 5th Floor, Office 19, MBZ City, Abu Dhabi, UAE',
    ar: 'مزيد مول، البرج ١، الطابق الخامس، مكتب ١٩، مدينة محمد بن زايد، أبوظبي، الإمارات العربية المتحدة',
  },
  poBox: '70434',
  officeMapTitle: {
    en: 'Mazyad Mall, MBZ City, Abu Dhabi.',
    ar: 'مزيد مول، مدينة محمد بن زايد، أبوظبي.',
  },
  officeDirections: {
    en: 'Tower 1, 5th Floor, Office 19. Use the address link to continue in your preferred maps service.',
    ar: 'البرج ١، الطابق الخامس، مكتب ١٩. استخدم رابط العنوان للمتابعة في خدمة الخرائط المفضلة لديك.',
  },
  postalAddress: {
    streetAddress: 'Mazyad Mall, Tower 1, 5th Floor, Office 19, MBZ City',
    addressLocality: 'Abu Dhabi',
    addressCountry: 'AE',
  },
};

/** Public values only; mail-provider credentials must never be added here. */
export const clientConfirmation: Record<
  | 'domain'
  | 'officialEmail'
  | 'telephone'
  | 'address'
  | 'poBox'
  | 'whatsapp'
  | 'linkedin'
  | 'tradeLicense'
  | 'vatTrn',
  'pending-confirmation' | 'not-supplied' | 'confirmed'
> = {
  domain: 'not-supplied',
  officialEmail: 'confirmed',
  telephone: 'confirmed',
  address: 'pending-confirmation',
  poBox: 'pending-confirmation',
  whatsapp: 'confirmed',
  linkedin: 'confirmed',
  tradeLicense: 'not-supplied',
  vatTrn: 'not-supplied',
};

// Opt in at the approved production build; setting a domain alone does not index a preview.
export const indexingEnabled =
  Boolean(company.domain) && process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';
