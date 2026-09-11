import { notFound } from 'next/navigation';
import { getLocale } from '@/lib/locale';
import { metadata } from '@/lib/seo';
import { publicPaths } from '@/data/routes';
import {
  AboutInnerPage,
  ContractingInnerPage,
  DivisionsInnerPage,
  HvacInnerPage,
  QhseInnerPage,
  SupplyInnerPage,
} from '@/components/sections/inner-pages';
import { innerPageSeo } from '@/data/inner-pages';
import { phase2cSeo } from '@/data/phase2c';
import { ContactPage, ProductsPage, ProjectsPage } from '@/components/sections/phase2c-pages';
export function generateStaticParams() {
  return publicPaths.filter(Boolean).map((path) => ({ slug: path.split('/') }));
}
function getPage(path: string) {
  if (path === 'about') return innerPageSeo.about;
  if (path === 'divisions') return innerPageSeo.divisions;
  if (path === 'divisions/contracting') return innerPageSeo.contracting;
  if (path === 'divisions/hvac') return innerPageSeo.hvac;
  if (path === 'divisions/material-supply') return innerPageSeo['material-supply'];
  if (path === 'qhse') return innerPageSeo.qhse;
  if (path === 'products') return phase2cSeo.products;
  if (path === 'projects') return phase2cSeo.projects;
  if (path === 'contact') return phase2cSeo.contact;
  notFound();
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const p = await params;
  const locale = getLocale(p.locale);
  const path = p.slug.join('/');
  const page = getPage(path);
  return metadata(locale, page.title[locale], page.description[locale], path);
}
export default async function InnerRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const p = await params;
  const locale = getLocale(p.locale);
  const path = p.slug.join('/');
  if (path === 'about') return <AboutInnerPage locale={locale} />;
  if (path === 'divisions') return <DivisionsInnerPage locale={locale} />;
  if (path === 'divisions/contracting') return <ContractingInnerPage locale={locale} />;
  if (path === 'divisions/hvac') return <HvacInnerPage locale={locale} />;
  if (path === 'divisions/material-supply') return <SupplyInnerPage locale={locale} />;
  if (path === 'qhse') return <QhseInnerPage locale={locale} />;
  if (path === 'products') return <ProductsPage locale={locale} />;
  if (path === 'projects') return <ProjectsPage locale={locale} />;
  if (path === 'contact') return <ContactPage locale={locale} />;
  notFound();
}
