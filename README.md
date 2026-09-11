# DANCATSHER website

Complete bilingual corporate website: 20 English/Arabic pages covering Home, About, Divisions, Contracting, HVAC, Material Supply, Products, Projects, QHSE and Contact. Built with Next.js App Router, React, strict TypeScript, Tailwind/CSS and self-hosted fonts.

Start with the [production handover](docs/final-production-readiness.md) and [client data checklist](docs/final-client-data-checklist.md). Earlier phase reports are historical records.

The [11 September client image integration report](docs/client-image-integration.md) records the additional 123 optimized product/service images, bilingual galleries, excluded watermarked crop and coverage verification commands.

## Local development and verification

```bash
npm ci
npm run dev
```

Open `http://localhost:3000/en` or `http://localhost:3000/ar`.

```bash
npm run lint
npm run format:check
npm run verify:config
npm run build
npm run typecheck
npm start -- --hostname 127.0.0.1 --port 3100
# In another terminal:
TEST_BASE_URL=http://127.0.0.1:3100 npm run verify:production
```

Run TypeScript and build sequentially because Next regenerates type files. The concise production smoke uses Chrome at `/usr/bin/google-chrome`; results are saved under ignored `.inspection/`. Earlier exhaustive scripts remain available for historical reproducibility and are not needed for routine preview verification.

## Configuration and content

- `data/company.ts`: public company/contact values and client confirmation status. The approved LinkedIn profile feeds Contact, Footer and Organization `sameAs`; WhatsApp stays hidden until supplied. Never put provider credentials here.
- `.env.example`: public build-time URL/indexing settings. Set `NEXT_PUBLIC_SITE_URL` to the approved HTTPS origin and `NEXT_PUBLIC_ALLOW_INDEXING=true` only for the approved production build; rebuild after changes. Preview defaults remain noindex.
- `data/routes.ts`: completed paths shared by prerendering and the 20-URL localized sitemap. Sitemap remains empty until a domain is configured.
- `data/copy.ts`, `data/inner-pages.ts`, `data/phase2c.ts`: typed bilingual copy. Locale layout controls `lang`/`dir`.
- `data/products.ts`, `data/projects.ts`: seven catalog categories, 47 examples and six supplied site photographs with source references.
- `lib/enquiry.ts`: isolated preview email-draft preparation. Automatic form delivery is still pending an approved provider and official domain mailbox; no backend or credentials have been connected.

## Approved branding and navigation

The approved gold emblem is derived without modifying `_source/DCS-logo-approved-gold.png`. Optimized transparent copies live in `public/brand/` and accompany the existing typographic company lockup in header/footer; favicon and touch icons also use the approved artwork. The entire header stack is sticky, with viewport-bounded mobile navigation and anchor clearance. About Vision/Mission uses balanced logical spacing in EN/AR.

The measured long local wait comes from development cold compilation (up to 21.1 seconds in the dev trace), not an application loading gate. Warm production HTML responses were 4–15 ms locally. See the handover for evidence and the optional trusted-LAN development setting.

## Source and launch status

`_source/` is immutable and excluded from the site. All 152 current source files, including the approved logo and the additional client image package, retain their input hashes. Only optimized production copies ship. The original HVAC video is not loaded. See the [source audit](docs/source-audit.md) for asset provenance.

A fresh `main` repository was initialized after final acceptance because this workspace had no previous usable Git history. The user subsequently pushed the approved baseline (`5402903`) to `origin/main` at `n7rawy1984/dancatsher`. The client image update is prepared locally for a separate user-reviewed push.

Ready for GitHub and Vercel client preview. Import only the confirmed repository into the intended Vercel account, retain `NEXT_PUBLIC_ALLOW_INDEXING=false` and leave `NEXT_PUBLIC_SITE_URL` unset for client preview. Do not connect DNS yet. Automatic enquiry delivery is the only deferred website function; the current explicit draft flow is complete for preview. Official-domain launch still needs client confirmation and production configuration. No deployment, domain/DNS changes, SMTP credentials, CMS, auth, database or ecommerce work has been performed.
