'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import type { Locale, Localized } from '@/types/content';

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  caption: Localized;
}

export function ClientGallery({
  images,
  locale,
  title,
  editorial = false,
}: {
  images: GalleryImage[];
  locale: Locale;
  title: string;
  editorial?: boolean;
}) {
  const id = useId();
  const track = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [edges, setEdges] = useState({ start: true, end: images.length === 1 });
  const ar = locale === 'ar';
  const previous = ar ? 'الصور السابقة' : 'Previous images';
  const next = ar ? 'الصور التالية' : 'Next images';
  const close = ar ? 'إغلاق الصورة' : 'Close image';

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const update = () => {
      const offset = Math.abs(node.scrollLeft);
      setEdges({ start: offset < 2, end: offset >= node.scrollWidth - node.clientWidth - 2 });
    };
    const observer = new ResizeObserver(update);
    observer.observe(node);
    node.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      node.removeEventListener('scroll', update);
    };
  }, []);

  useEffect(() => {
    if (active === null) return;
    const modal = dialog.current;
    const trigger = opener.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal?.showModal();
    return () => {
      modal?.close();
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [active]);

  function move(direction: number) {
    const node = track.current;
    if (!node) return;
    node.scrollBy({
      left: direction * (ar ? -1 : 1) * node.clientWidth * 0.85,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }
  const selected = active === null ? null : images[active];
  return (
    <div
      className={`client-gallery${editorial ? ' client-gallery-editorial' : ''}`}
      role="region"
      aria-labelledby={`${id}-title`}
    >
      <div className="client-gallery-heading">
        <div>
          <h3 id={`${id}-title`}>{title}</h3>
          <p>{ar ? 'اختر صورة لعرضها بحجم أكبر' : 'Select an image for a closer look'}</p>
        </div>
        {images.length > 1 && (
          <div className="client-gallery-controls">
            <button
              type="button"
              aria-label={previous}
              aria-controls={`${id}-track`}
              disabled={edges.start}
              onClick={() => move(-1)}
            >
              <span aria-hidden="true">{ar ? '→' : '←'}</span>
            </button>
            <button
              type="button"
              aria-label={next}
              aria-controls={`${id}-track`}
              disabled={edges.end}
              onClick={() => move(1)}
            >
              <span aria-hidden="true">{ar ? '←' : '→'}</span>
            </button>
          </div>
        )}
      </div>
      <ul
        id={`${id}-track`}
        className="client-gallery-track"
        ref={track}
        tabIndex={0}
        aria-label={title}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            move((event.key === 'ArrowRight' ? 1 : -1) * (ar ? -1 : 1));
          }
          if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
            track.current?.scrollTo({
              left: event.key === 'Home' ? 0 : (ar ? -1 : 1) * track.current.scrollWidth,
              behavior: 'instant',
            });
          }
        }}
      >
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              className="client-gallery-card"
              aria-label={`${ar ? 'عرض الصورة' : 'View image'}: ${image.caption[locale]}`}
              aria-haspopup="dialog"
              onClick={(event) => {
                opener.current = event.currentTarget;
                setActive(index);
              }}
            >
              <span className="client-gallery-image">
                <Image
                  src={image.src}
                  alt={image.caption[locale]}
                  fill
                  sizes={
                    editorial
                      ? '(max-width: 767px) 80vw, 400px'
                      : '(max-width: 767px) 80vw, (max-width: 1099px) 44vw, 300px'
                  }
                  loading="lazy"
                />
              </span>
              <span className="client-gallery-caption">
                {image.caption[locale]}
                <span aria-hidden="true">↗</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialog}
        className="client-lightbox"
        aria-labelledby={`${id}-caption`}
        onCancel={(event) => {
          event.preventDefault();
          setActive(null);
        }}
        onClose={() => setActive(null)}
        onKeyDown={(event) => {
          // The close button is the viewer's only interactive control.
          // Keep Tab in the viewer instead of moving focus to browser chrome.
          if (event.key === 'Tab') {
            event.preventDefault();
            dialog.current?.querySelector('button')?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActive(null);
        }}
      >
        {selected && (
          <div className="client-lightbox-panel">
            <button
              type="button"
              className="client-lightbox-close"
              aria-label={close}
              autoFocus
              onClick={() => setActive(null)}
            >
              {close}
              <span aria-hidden="true">×</span>
            </button>
            <Image
              src={selected.src}
              alt={selected.caption[locale]}
              width={selected.width}
              height={selected.height}
              sizes="(max-width: 767px) 90vw, 900px"
              className="client-lightbox-image"
            />
            <p id={`${id}-caption`}>{selected.caption[locale]}</p>
          </div>
        )}
      </dialog>
    </div>
  );
}
