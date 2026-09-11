# DANCATSHER — final GitHub / client-preview handover

The complete bilingual corporate website is prepared for GitHub and Vercel client preview. No push, deployment, DNS change, SMTP configuration or real email transmission has been performed. Automatic enquiry-form delivery is the only deferred website function. Earlier phase reports remain historical records.

## Architecture and routes

Next.js 16.3.4 App Router, React/React DOM 19.2.8, strict TypeScript 5.9.3, Tailwind CSS 4.3.3; verified with Node 24.14.1. The lockfile and dependency versions are unchanged. Use Node 24 on the preview host. Pages are prerendered, with small client components for header/menu, project filters and enquiry forms. No CMS, auth, database, API backend, middleware or loading splash/gate exists.

All ten paths exist under both `/en` and `/ar` (20 pages). Root `/` redirects to `/en`; unknown routes/locales return 404.

| Path after locale            | Page            |
| ---------------------------- | --------------- |
| `/`                          | Home            |
| `/about`                     | About           |
| `/divisions`                 | Divisions       |
| `/divisions/contracting`     | Contracting     |
| `/divisions/hvac`            | HVAC            |
| `/divisions/material-supply` | Material Supply |
| `/products`                  | Products        |
| `/projects`                  | Projects        |
| `/qhse`                      | QHSE            |
| `/contact`                   | Contact         |

`data/routes.ts` shares the completed paths between prerendering and sitemap. `app/[locale]/layout.tsx` sets language/direction and shared typography. Copy lives in `data/copy.ts`, `data/inner-pages.ts` and `data/phase2c.ts`; `types/content.ts` defines locale types. `data/products.ts` contains seven categories and 47 workbook-backed bilingual examples. `data/projects.ts` contains six supplied photographs and work-type filters, without invented project credentials.

## Approved brand and visual fixes

`_source/DCS-logo-approved-gold.png` is the preferred approved master (1024×1024); it was neither moved nor changed. `scripts/prepare-brand.mjs` deterministically removes only edge-connected near-white exterior background, preserving enclosed white details, gold artwork and grey outline. It crops the surrounding margin and downsamples without enlargement. It uses Sharp already installed with Next, not a new optimization library.

Production derivatives:

- `public/brand/dcs-emblem.webp`: 256×262, lossless transparent WebP, 43,574 bytes.
- `public/brand/favicon.png`: 32×32 transparent icon.
- `public/brand/apple-touch-icon.png`: 180×180 icon.

The emblem is paired with the existing DANCATSHER / CONTRACTING L.L.C. typographic lockup in header/footer. It displays at 44px desktop or 34px mobile width. The new icons are configured in locale metadata. White inside the artwork is intentional; no exterior white rectangle remains. Source provenance/hash and crop details are saved locally in `.inspection/approved-logo-derivation.json`. Regeneration requires the private approved master, which is intentionally excluded from GitHub.

The utility strip and primary navigation form one opaque sticky stack. CSS keeps it in normal flow with no sticky-state layout jump; a small ResizeObserver synchronizes the actual stack height with root anchor padding. The mobile menu is an independently scrollable panel below the stack, bounded by viewport height. Escape closes it and restores toggle focus. Product anchors and contact CTAs clear the sticky header.

About Vision/Mission now uses two equal tracks with symmetric logical padding, aligned numbers/headings and a single shared vertical divider. Mobile stacks the columns. The physical-padding/RTL-override conflict was removed; no body text was centered or reduced. Similar two-column components were inspected without unrelated redesign.

## Single client configuration

`data/company.ts` owns domain source, official email and preview fallback, telephone/display number, optional WhatsApp, approved LinkedIn, localized office/map text, postal address, P.O. Box, trade licence and VAT/TRN. `clientConfirmation` records genuinely pending facts. The approved LinkedIn URL is stored only there and consumed by Contact, Footer and Organization `sameAs`. External links have accessible text and safe new-tab attributes. WhatsApp remains hidden.

The current company email is the source-backed `Dancatsher@gmail.com`. Set the `officialEmail` constant only when the domain mailbox is approved; all public email links and draft preparation then use it. Never add provider credentials to this public module.

## Preview versus official production SEO

| Variable                     | Client preview                                                                                  | Official public launch                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | Leave unset; do not use the Vercel preview URL as a production canonical                        | Set to the confirmed HTTPS origin, without path, credentials, query or fragment |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` in both Vercel Preview and Production scopes while the project is only a client preview | `true` only for the approved official production build                          |
| `NEXT_DEV_ALLOWED_ORIGINS`   | Optional local development hostnames/IPs, comma separated, without schemes                      | Not needed on Vercel                                                            |

Rebuild after changing public settings. The site does not infer its canonical from `VERCEL_URL`. Without an official URL, absolute canonicals/hreflang are omitted, sitemap is empty and robots/meta remain noindex. Once configured, the sitemap contains all 20 localized URLs and language alternates; metadata uses that same normalized origin. Indexing also requires the explicit flag. Never guess the official domain or enable indexing for a client-preview hostname.

Every page has unique localized title/description, one H1, logical headings and Open Graph metadata. Organization JSON-LD uses only supported company/contact/address facts and the approved LinkedIn `sameAs`; no ratings, reviews or unsupported relationships. JSON is safely serialized. Configuration tests cover preview and production branches without changing the actual build's domain.

## Contact preview and later automatic delivery

Both bilingual forms remain complete: validation, accessible labels/errors, first-error focus, division preselection and draft invalidation on edits. `lib/enquiry.ts` is the isolated preview adapter. A valid form prepares an encoded email draft for an explicit user handoff; it neither sends through a website backend nor claims successful delivery.

After provider/mailbox approval, preferred option A is one minimal serverless/API endpoint using the approved mail provider. Keep credentials server-only in host secrets, recipient/sender fixed server-side, validated visitor email in Reply-To, and independently validate lengths/fields on the server. Add appropriate abuse limits and truthful localized pending/error/accepted states. Test actual mailbox delivery and failures before switching public copy from draft to submission. Option B is an approved hosted form service with appropriate privacy, spam controls and localized accessible feedback. Update both form components when implementing delivery. No provider or SMTP credentials were invented.

Provider sender verification and any SPF/DKIM/DMARC/DNS work require later authorization. This deferred delivery work does not prevent the complete Contact page from being shown in client preview.

## Loading investigation and performance

The existing local development server was already running on port 3000; it was not killed. A second instance was correctly refused by Next's development lock, so measurements used the existing server and a separate production server on port 3100.

The actual dev trace records `/[locale]` cold compilations up to **21.133 seconds** and an `/en` request of **24.323 seconds**. Some first development image transformations took roughly 7 seconds. The log also records blocked LAN HMR from the user's local IP; this affects development hot reload. For LAN testing, put the trusted hostname/IP in `NEXT_DEV_ALLOWED_ORIGINS` in ignored `.env.local`, then restart development when convenient. Do not use a wildcard or change production behavior to fix dev tooling.

Browser comparison covered `/en`, `/ar`, `/en/about`, `/en/products`, `/en/projects` and `/en/contact`, with first-visit and warm measurements. On this machine, production warm HTML TTFB was **4–15 ms**, versus **372–1,285 ms** in development. Initial production FCP ranged **404–2,456 ms**; warm FCP **400–744 ms**. The H1 was visible at document readiness on every visit, and no third-party blocking request occurred. Initial production JS transfer was about **157 KB**, versus **822 KB** for the dev entry. These are local observations, not field metrics or a Vercel timing guarantee. Results are in `.inspection/pre-github-load-results.json` and `.inspection/pre-github-dev-trace-summary.json`.

The long cold-compilation blank wait is a development-server cause, not a client-side application loading gate. Production prerenders pages at build time, so Vercel production should not repeat route compilation on the first visit. Cold image/font delivery can still differ from cached visits. No speculative rendering rewrite or loading screen was added.

Next Image retains reserved dimensions/fill containers, responsive sizes, hero priority and lazy loading below the fold. Local fonts use swap and Unicode subsets. No source video, workbook or PDF is shipped; the large HVAC video remains deferred. No image-quality reduction, new optimization dependency or unnecessary Client Component was introduced. The new header observer handles geometry only and never gates content.

## Local commands

```bash
npm ci
npm run dev
# Validate a clean checkout in this order:
npm run lint
npm run format:check
npm run verify:config
npm run build
npm run typecheck
npm start -- --hostname 127.0.0.1 --port 3100
# Another terminal:
TEST_BASE_URL=http://127.0.0.1:3100 npm run verify:production
```

Do not run build and standalone TypeScript simultaneously. Next generates ignored `next-env.d.ts`/`.next/types`. The existing build uses Webpack; dev uses Turbopack. Chrome verification uses `/usr/bin/google-chrome`. `node scripts/measure-local-load.mjs` compares an existing dev server at port 3000 (override `DEV_BASE_URL`) and production at 3100; `PRODUCTION_ONLY=true` checks just production. `node scripts/prepare-brand.mjs` is only for deriving assets from the privately supplied approved master.

## Basic hygiene and Git content

This phase is intentionally not a deep security audit; no npm advisory upload or `npm audit` was run. Basic checks cover source/env exclusions, public exposure, safe links and runtime errors. Existing basic security headers remain.

Git excludes `_source/`, `.inspection/`, `.next/`, `node_modules/`, local env files, host caches, screenshots/test artifacts, generated TypeScript cache/type entry, private-key formats and editor/OS junk. `.env.example` is kept. Application/data/lib/components, production assets, useful scripts, README, historical/relevant docs, package/lock files and configuration are included. All 16 current source files, including the newly approved logo, retain their input hashes.

The current folder has no usable Git history, reconfirmed outside the sandbox. The user authorized a new repository after all final checks. No existing history will be fabricated or overwritten; the local preparation outcome is recorded below.

## GitHub next step — after checks and repository preparation

Create/confirm the new DANCATSHER repository in the intended GitHub account, preferably private for the client project. Supply its exact URL. No guessed remote is configured and no push is performed in this phase.

With the clean initial commit ready and no remote configured:

```bash
read -r -p "Confirmed DANCATSHER GitHub repository URL: " DANCATSHER_REPO_URL
git remote add origin "$DANCATSHER_REPO_URL"
git remote -v
# Only after confirming that origin belongs to this project:
git push -u origin main
```

Do not run `git remote add` over an existing unrelated remote. Inspect it first.

## Vercel next step — separately authorized

After the approved push, import that exact GitHub repository into the intended Vercel team. Use root directory `.`, framework Next.js, Node 24, install `npm ci`, build `npm run build`, and the framework-default output directory. Keep `NEXT_PUBLIC_SITE_URL` unset and `NEXT_PUBLIC_ALLOW_INDEXING=false` in both Preview and Production scopes for this client-preview stage; importing `main` may create a deployment labeled Production even though it is only being used for client review.

Only click Deploy when deployment is authorized. Share the resulting Vercel URL with suitable access settings and verify routes, logo, sticky navigation, Arabic layout and draft behavior online. Do not connect a custom domain/DNS or enable indexing yet. Vercel Git integration and environment-scope behavior are documented in [Vercel Git deployments](https://vercel.com/docs/git) and [environment variables](https://vercel.com/docs/environment-variables). The development LAN setting follows [Next allowedDevOrigins](https://nextjs.org/docs/pages/api-reference/config/next-config-js/allowedDevOrigins).

After client preview: implement the approved automatic email integration, then handle official-domain/DNS/indexing launch steps and the separately planned post-deployment security review when authorized. No public page remains unfinished.

## Final acceptance and repository state

Final acceptance passed with zero errors. The saved 33-record run includes all 20 localized pages, unique metadata, 76 internal links, no overflow/broken media/console or hydration errors, project filters, form validation and preselection, approved LinkedIn and Organization `sameAs`. Its targeted EN/AR loop verified sticky/menu behavior, quote anchors and focused form-field clearance at 390, 768 and 1440px. Six representative axe scans passed. Desktop/mobile screenshots and the remaining tablet views were reviewed; Vision/Mission alignment is balanced and the sticky lockup is readable.

ESLint, strict TypeScript, configuration checks and production build passed. No application file changed after the successful build, so resumption did not repeat that build or the completed performance measurements. Final formatting and ESLint passed on resumption. The existing successful build and TypeScript results were retained because application code was unchanged. Evidence remains ignored under `.inspection/client-preview-browser-results.json` and `.inspection/client-preview-*.png`.

No push, deployment, DNS change, real email, credentials or deep security audit occurred. All 16 source hashes match. Automatic email integration remains the only deferred website functionality.

Local repository preparation: a fresh `main` repository was initialized only after all checks passed. No prior history was overwritten and no remote is configured. The initial release commit message is `Initial DANCATSHER corporate website release`. Private originals, local inspection/build/dependency artifacts and secrets are excluded from staging. Nothing has been pushed.
