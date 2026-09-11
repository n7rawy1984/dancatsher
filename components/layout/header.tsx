'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Copy } from '@/data/copy';
import { navigation } from '@/data/navigation';
import { route } from '@/lib/locale';
import type { Locale } from '@/types/content';
import { Arrow } from '@/components/ui/primitives';
import { BrandLockup } from '@/components/ui/brand-lockup';
type HeaderLabels = Pick<
  Copy,
  | 'tagline'
  | 'location'
  | 'brand'
  | 'brandSub'
  | 'mainNav'
  | 'language'
  | 'quote'
  | 'menu'
  | 'closeMenu'
>;
export function Header({ locale, labels: c }: { locale: Locale; labels: HeaderLabels }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const other = locale === 'en' ? 'ar' : 'en';
  const languageHref = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`);
  useEffect(() => {
    if (!header.current) return;
    const element = header.current;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        '--header-height',
        `${element.getBoundingClientRect().height}px`,
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);
  return (
    <header className="site-header" ref={header}>
      <div className="utility-bar">
        <div className="container flex justify-between items-center">
          <span>{c.tagline}</span>
          <span className="utility-location">
            <span className="location-dot" />
            {c.location}
          </span>
        </div>
      </div>
      <div className="container header-main">
        <BrandLockup
          href={route(locale)}
          name={c.brand}
          descriptor={c.brandSub}
          className="header-brand"
          priority
          onClick={() => setOpen(false)}
        />
        <nav className="desktop-nav" aria-label={c.mainNav}>
          {navigation.map((n) => (
            <Link
              key={n.path}
              href={route(locale, n.path)}
              aria-current={pathname === route(locale, n.path) ? 'page' : undefined}
            >
              {n.label[locale]}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            className="language-switch"
            href={languageHref}
            hrefLang={other}
            lang={other}
            onClick={() => setOpen(false)}
          >
            {c.language}
          </Link>
          <Link className="button header-quote" href={`${route(locale, 'contact')}#enquiry`}>
            {c.quote}
            <Arrow />
          </Link>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-label={open ? c.closeMenu : c.menu}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span className={open ? 'open' : ''} />
            <span />
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" hidden={!open} aria-label={c.mainNav}>
        {navigation.map((n) => (
          <Link
            key={n.path}
            href={route(locale, n.path)}
            aria-current={pathname === route(locale, n.path) ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {n.label[locale]}
            <Arrow />
          </Link>
        ))}
        <Link href={`${route(locale, 'contact')}#enquiry`} onClick={() => setOpen(false)}>
          {c.quote}
          <Arrow />
        </Link>
      </nav>
    </header>
  );
}
