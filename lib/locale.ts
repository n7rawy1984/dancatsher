import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/types/content';
export function getLocale(value: string): Locale {
  if (locales.some((locale) => locale === value)) return value as Locale;
  notFound();
}
export function route(locale: Locale, path = '') {
  return `/${locale}${path ? `/${path}` : ''}`;
}
