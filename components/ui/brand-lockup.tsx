import Image from 'next/image';
import Link from 'next/link';
import type { MouseEventHandler } from 'react';

interface BrandLockupProps {
  href: string;
  name: string;
  descriptor: string;
  className?: string;
  priority?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function BrandLockup({
  href,
  name,
  descriptor,
  className = '',
  priority = false,
  onClick,
}: BrandLockupProps) {
  return (
    <Link
      href={href}
      className={`brand ${className}`.trim()}
      aria-label={`${name} — ${descriptor}`}
      onClick={onClick}
    >
      <span className="brand-emblem" aria-hidden="true">
        <Image
          src="/brand/dcs-emblem.webp"
          width={256}
          height={262}
          alt=""
          priority={priority}
          sizes="(max-width: 767px) 34px, 44px"
        />
      </span>
      <span className="brand-wordmark">
        <strong dir="ltr">{name}</strong>
        <small>{descriptor}</small>
      </span>
    </Link>
  );
}
