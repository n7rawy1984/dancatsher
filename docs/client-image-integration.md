# Client image integration — 11 September 2026

Starting repository: clean `main` at `5402903` (`Refine navbar sizing and sticky finish`). No partial prior-session image changes existed. The approved layout, branding, navigation, LinkedIn, homepage, Projects content and SEO configuration remain intact.

## Inventory and placement

The package contains ten original collages and **124 prepared crops**. Visual review excluded only `hvac/09-industrial-hvac-piping.jpg`, which has a visible Getty Images watermark. It was neither edited nor copied to public assets. All **123 suitable crops** have production derivatives and are represented in each locale.

| Source group        | Prepared | Published | Placement                                   |
| ------------------- | -------: | --------: | ------------------------------------------- |
| Oil & Gas cover     |        1 |         1 | Material Supply supporting editorial visual |
| Power/electrical    |       21 |        21 | Products: Electrical                        |
| PPE                 |       18 |        18 | Products: Personal Protective Equipment     |
| Hand tools          |       17 |        17 | Products: Hand Tools (14), Power Tools (3)  |
| Pipes/fittings      |        9 |         9 | Products: Pipes & Fittings                  |
| Packing/adhesives   |       16 |        16 | Products: Packing & Adhesives               |
| Welding consumables |       12 |        12 | Products: Welding                           |
| HVAC                |       15 |        14 | HVAC applications gallery                   |
| Kitchen/sanitary    |        7 |         7 | Contracting interior applications gallery   |
| Tiles/installation  |        8 |         8 | Contracting paving and blockwork gallery    |
| **Total**           |  **124** |   **123** | **123 per language**                        |

Drill bits, the heat gun and the flap wheel from the hand-tools source group appear with Power Tools as equipment/accessory examples. This gives each of the seven existing product categories its own gallery. There are ten scrollable galleries plus one editorial image viewer, with no standalone Gallery page.

Added headings, captions, alt text, instructions, buttons and dialog labels have English and Arabic text. Text embedded in the supplied artwork is preserved. Catalogue images are illustrative and make no distributorship, partnership, certification, stock or specification claim. New service imagery is labeled as applications, separate from the existing documented project imagery.

## Assets and implementation

`public/images/client-supplied/` contains **123 WebP files totaling 793,972 bytes (775.4 KiB)**. Derivatives preserve the full source framing and aspect ratio, with no enlargement. Source crops are small (70–505 pixels wide); the lightbox magnifies the available image for inspection, but cannot add detail to these low-resolution inputs. No raw collage or private source package is published.

`data/client-image-inventory.json` records every manifest crop, its category, localized caption and exclusion. `data/client-images.json` records each production path, dimensions, bytes and source hash. `scripts/prepare-client-images.mjs` regenerates approved derivatives using the existing Sharp dependency and requires the private source package.

The shared component uses CSS scroll snapping and a native modal dialog, with no new dependency or autoplay. It supports touch, previous/next controls, direction-aware arrow keys, Home/End, visible focus, Escape, close-button/backdrop dismissal, focus restoration and reduced motion. Native modal behavior contains focus and makes the background inert; background scrolling is locked while open.

Cards reserve their aspect ratio, use Next Image with responsive sizes, and lazy-load. The enlarged image mounts only when requested. Desktop shows four cards, tablet two, and mobile approximately 1.2 cards. Source audit metadata stays outside the client component payload.

## Reproducible checks

```bash
npm run lint
npm run format:check
npm run build
npm run typecheck
npm start -- --hostname 127.0.0.1 --port 3101
# Separate terminal, with the private source package available:
TEST_BASE_URL=http://127.0.0.1:3101 node scripts/verify-client-images.mjs
TEST_BASE_URL=http://127.0.0.1:3101 npm run verify:production
```

For smaller browser batches, set `TEST_LOCALE=en` or `ar` and `TEST_WIDTH=390`, `768` or `1440`. Each locale/width batch checks all six routes and confirms all 123 images; results are saved separately. Accessibility scans run in the current page after asserting there are no iframes.

The gallery check compares the manifest and inventory, validates derivative dimensions and source hashes, and matches browser-rendered image paths to all 123 production assets in each language. It covers Products, Material Supply, HVAC, Contracting, Home and Projects at 390, 768 and 1440 pixels in both languages, including touch input, keyboard behavior, modal interactions, overflow, image decoding, console/runtime errors, sticky branding and axe accessibility scans. Local screenshots and machine-readable evidence are stored under ignored `.inspection/client-images/`.

All 152 files under `_source/` were hashed before implementation. The source tree remains unchanged and Git-ignored. Nothing was pushed, deployed or configured for DNS/domain/email delivery.

## Acceptance and Git closure

All six locale/viewport batches passed: **36 route/viewport checks**, with **123/123 source crops represented in each language**. No broken images, horizontal document overflow, console/hydration errors or accessibility violations were found. Controls, touch gestures, direction-aware scrolling, reduced motion, focus outlines, Tab/Shift+Tab containment, Escape, close/backdrop dismissal and focus restoration passed. The enlarged Arabic mobile lightbox received an additional focused viewport check. Screenshots were visually reviewed across the requested sizes. The existing production smoke suite also passed its 33 checks, preserving navbar/footer, LinkedIn, project filters and enquiry behavior.

The image update does not eagerly fetch the catalogue: initial requests for the new images were **zero** on Products, HVAC and Contracting, and **one** for the supporting Material Supply cover. The observed maximum initial layout-shift score was **0.022**, and initial JavaScript transfer was approximately **159 KB**. These are local browser observations, not field-performance guarantees. There is no new runtime dependency. Gallery cards reserve space and responsive images remain lazy-loaded.

ESLint, strict TypeScript, formatting and the final production build passed. No application changes followed those final checks. Machine-readable acceptance evidence is in `.inspection/client-images/verification-final.json`, the six per-viewport reports and `.inspection/client-preview-browser-results.json`.

At resumption, both local `main` and live `origin/main` were `540290313a9265d0431940c98209415a2e1113d6`. The user had manually pushed the approved baseline to `https://github.com/n7rawy1984/dancatsher.git`; none of this image integration was committed or present on the remote. The completed integration was preserved, and closure finished the remaining desktop batch, focused Arabic modal confirmation, source/remote audit and documentation. The image update is prepared as one local commit, `Integrate client product and service galleries`, for the user to push manually. No push or deployment was performed by the agent during this task or continuation.
