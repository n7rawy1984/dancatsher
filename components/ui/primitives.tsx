import Link from 'next/link';
import type { ReactNode } from 'react';
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      className="arrow"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? 'button-secondary' : ''}`} href={href}>
      {children}
      <Arrow />
    </Link>
  );
}
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-link">
      {children}
      <Arrow />
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      {(description || children) && (
        <div className="section-intro">
          {description && <p>{description}</p>}
          {children}
        </div>
      )}
    </div>
  );
}
export function TechnicalIcon({ variant = 0 }: { variant?: number }) {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      {variant === 0 ? (
        <>
          <path d="M6 34V13l14-7 14 7v21H6Z M14 34V18h12v16M10 13h20M20 6V2" />
          <path d="M18 23h4m-4 5h4" />
        </>
      ) : variant === 1 ? (
        <>
          <rect x="5" y="8" width="30" height="24" rx="1" />
          <path d="M5 16h30M12 24h16M12 28h10M10 12h2m3 0h2" />
        </>
      ) : (
        <>
          <path d="m20 4 15 8v16l-15 8-15-8V12l15-8Zm0 16v16M5 12l15 8 15-8M12 8l15 8v8" />
        </>
      )}
    </svg>
  );
}
