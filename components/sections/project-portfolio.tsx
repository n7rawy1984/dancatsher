'use client';

import Image from 'next/image';
import { useState } from 'react';
import { projects } from '@/data/projects';
import { projectsPage } from '@/data/phase2c';
import type { Locale } from '@/types/content';

export function ProjectPortfolio({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState('all');
  const visible =
    filter === 'all' ? projects : projects.filter((project) => project.workType === filter);

  return (
    <>
      <div className="portfolio-filters" role="group" aria-label={projectsPage.filterLabel[locale]}>
        {projectsPage.filters.map((item) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label[locale]}
          </button>
        ))}
      </div>
      <div className="portfolio-grid" aria-live="polite">
        {visible.map((project, index) => (
          <article
            className={index === 0 && filter === 'all' ? 'portfolio-featured' : ''}
            key={project.id}
          >
            <figure>
              <div className="portfolio-image">
                <Image
                  src={project.image}
                  alt={project.alt[locale]}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 38vw"
                />
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <figcaption>
                <p>{project.category[locale]}</p>
                <h2>{project.title[locale]}</h2>
                <small>{projectsPage.imageNote[locale]}</small>
              </figcaption>
            </figure>
          </article>
        ))}
      </div>
    </>
  );
}
