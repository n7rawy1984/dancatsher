export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export type Localized<T = string> = Record<Locale, T>;
export interface Division {
  id: string;
  title: Localized;
  description: Localized;
  capabilities: Localized<readonly string[]>;
  image: string;
  alt: Localized;
  source: string;
}
export interface ProductReference {
  name: Localized;
  cell: string;
}
export interface ProductCategory {
  id: string;
  title: Localized;
  description: Localized;
  sourceSheet: string;
  image: string;
  alt: Localized;
  products: readonly ProductReference[];
}
export interface Project {
  id: string;
  title: Localized;
  category: Localized;
  workType: 'civil' | 'hvac' | 'fitout' | 'building';
  image: string;
  alt: Localized;
  source: string;
}
