# DANCATSHER Phase 1 handover

Implemented directly in the existing `msn1` workspace. No deployment or domain access was performed.

## Source review and facts

All 15 supplied files were inspected, including all 12 workbook sheets, 84 embedded images, seven JPGs, four PNGs, the PDF and educational video metadata/sample. The [source audit](source-audit.md) records each asset and why it was used or excluded. Original SHA-256 hashes match after implementation.

The profile supports the 2018 founding date, Abu Dhabi office, 30+ years of team experience, building EPC/civil/fit-out/steel/mechanical/electrical/HVAC capabilities and quality/safety commitments. The catalog workbook verifies seven product categories. Office address, P.O. Box, company email and landline come from the profile. Current contact details should be reconfirmed for launch.

No invented project counts, delivered-project ownership, clients, dates, values, specifications, SKUs, brands represented, certifications, reviews or official WhatsApp status. Oil-and-gas contracting was described as a future plan, so the current division is presented as material supply.

## Architecture and delivered scope

Next.js 16.3.4 App Router, React 19.2.8, strict TypeScript 5.9.3, and Tailwind CSS 4.3.3. Current installed dependency ranges and the npm lockfile are recorded. Node 24.14.1 was used. Self-hosted Manrope variable and IBM Plex Sans Arabic (400/500/600) fonts.

Both `/en` and `/ar` contain the complete homepage: header/navigation, language switcher, hero, credibility strip, three divisions, seven catalog categories, integrated capabilities/about, site-work gallery, QHSE, business strengths, enquiry section and footer. Arabic has document-level RTL and localized content, mirrored layouts/arrows and suitable typography.

Nine safe inner-page shells per language: about, divisions, three division pages, products, projects, QHSE and contact. Product category links preserve their selected category on the products shell. Other inner content remains intentionally deferred.

Typed data centralizes company, navigation, divisions, product categories/source references, projects, QHSE and homepage/contact copy. Source workbook sheet/cell references are retained. Server components deliver page content; small client components handle menu state, enquiry preparation and the product query. Interactive components receive only the copy they need.

SEO includes localized page titles/descriptions, Open Graph, factual Organization JSON-LD, sitemap and robots. Canonical/hreflang/absolute OG URLs activate from `NEXT_PUBLIC_SITE_URL`. The preview is noindex while the domain is unset; unfinished shells remain noindex and are excluded from the sitemap.

The form validates required fields and prepares a `mailto:` draft through `lib/enquiry.ts`. It never transmits data or claims delivery. Users explicitly open their email client and send; editing a field clears a stale draft. No backend, external scripts or persistence.

## Exact files

See the complete [file inventory](file-inventory.md). Generated dependency, build and inspection artifacts are ignored. `_source/` is ignored and immutable.

## Production assets

| Production copy                                        | Source                                  | Dimensions |  Bytes |
| ------------------------------------------------------ | --------------------------------------- | ---------- | -----: |
| `public/images/brand/dcs-logo.webp`                    | `LOGO-DCS.png`                          | 103 × 169  |  2,932 |
| `public/images/projects/shopping-centre-exterior.webp` | `DCS Image 260830-1125.jpg`             | 768 × 1024 | 82,138 |
| `public/images/projects/hvac-condensing-units.webp`    | `DCS IMAGE 260830-1126.jpg`             | 825 × 1100 | 65,058 |
| `public/images/projects/interlock-paving.webp`         | `DCS IMAGE 260830-1127.jpg`             | 825 × 1100 | 69,402 |
| `public/images/projects/bathroom-fitout.webp`          | `DCS IMAGE 260830-1131.jpg`             | 825 × 1100 | 88,554 |
| `public/images/products/copper-fittings.webp`          | Product workbook `xl/media/image22.png` | 515 × 370  | 31,722 |
| `public/images/products/steel-pipes.webp`              | Product workbook `xl/media/image20.png` | 351 × 205  | 12,342 |

Total: 352,148 bytes (approximately 344 KiB). Production WebP copies use bounded dimensions and quality 85. Next Image provides responsive delivery, explicit sizes, reserved geometry and lazy loading below the fold. Hero image is preloaded. The small steel-pipe illustration is contained at approximately its native size; the logo displays at 31 × 51 or smaller and is easy to replace.

Excluded: the watermarked Shutterstock procurement montage; promotional oil-rig/event graphics of uncertain provenance; private registrar confirmation and company stamp; duplicate bathroom and unused blockwork photos; unused embedded catalog images; all source spreadsheets/PDFs; the 41.3 MB, ten-minute HVAC animation. The video is reserved for a later HVAC education section, subject to rights and delivery-copy preparation.

## Commands and verification

- Environment inspection: `node -v`, `npm -v`, file listing, image dimensions and source hashing.
- Workbook inspection: Python 3 standard-library ZIP/XML extraction; Pillow contact sheets of all embedded imagery.
- PDF: `pdftotext -layout`, `pdftoppm -scale-to 1000 -png -singlefile`.
- Video: `ffprobe -v quiet -show_format -show_streams`, `ffmpeg -ss 120 ... -frames:v 1` for an ignored inspection frame.
- Dependency setup: `npm view next version`, `npm install --cache .inspection/npm-cache --no-audit --no-fund`; project-local Prettier added afterward.
- Formatting: `npm exec -- prettier --write ...`.
- Verification: `npm run lint`, `npm run typecheck`, `npm run build`.
- Local production preview: `npm start -- --hostname 127.0.0.1`.
- Browser checks: `TEST_BASE_URL=http://127.0.0.1:3100 npm run verify:browser` against the final production build.

The environment blocks the local worker port used by Turbopack's PostCSS evaluation. The project therefore uses Next's supported Webpack production compiler for `npm run build`; all 24 static routes compiled successfully. TypeScript was aligned from 6.0.3 to the stable 5.9.3 line used by this Next.js compiler path.

The final closure pass completed with zero ESLint errors or warnings, zero TypeScript errors, and a successful production build. Chrome checked English and Arabic at 360, 390, 768, 1024, 1440, and 1920 pixels. All pages returned 200, used the correct `lang`/`dir`, had one H1, no horizontal overflow, and no broken images. WCAG 2 A/AA/2.1 AA automated scans returned zero violations. Root redirect, all 18 placeholder routes, 404 handling, mobile-menu open/Escape close, language-switch path preservation, product-category selection, enquiry draft/clear behavior, reduced motion, and core no-JavaScript content all passed.

Meaningful secondary text was increased without changing the visual system: division and QHSE descriptions, capabilities, product copy/notes, project notes, business-strength copy, contact labels/address, form instructions/labels/privacy text, stats, and footer copy. Three previously reported English small-text contrast failures were corrected and rechecked.

## Limitations and Phase 2

The small raster logo and low-resolution catalog originals limit image detail. Obtain a vector logo and stronger product photography. The reference site could not be fetched; its described clarity informed navigation, without cloning it. Browser checks are local Chrome lab checks, not measured field Core Web Vitals or a complete manual assistive-technology audit. The public domain and final domain-based mailbox remain intentionally unset pending client confirmation.

Review and approve the bilingual homepage direction. Confirm domain and current contact details. Develop source-backed inner pages and category browsing, verify project credentials and image permissions, and connect an approved enquiry delivery mechanism with appropriate privacy handling. Review the educational video's rights and encoding only when building the HVAC page. Enable indexing and extend the sitemap as content becomes ready.

## Start development

```bash
npm run dev
```

Open `http://localhost:3000/en` or `http://localhost:3000/ar`. Dependencies are already installed; a fresh checkout uses `npm ci` first.
