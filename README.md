# Emmanuel Cobbi — personal website

A static editorial portfolio for Emmanuel Cobbi: software developer, designer,
author, and founder of Tribe.

This is a standalone project. It lives beside the Tribe Remotion work in this
workspace (`../tribe-promo`) and does not touch it.

## Stack

| | |
| --- | --- |
| Framework | Astro 5 (static output, no server, no database, no accounts) |
| Language | TypeScript |
| Styling | Hand-written CSS with custom properties — no framework |
| Images | `astro:assets` (sharp) → AVIF/WebP at build time |
| Typeface | Geist, self-hosted (SIL OFL 1.1) |
| JavaScript | One small inline script for the sticky header, reveals and menu |

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # serve dist/ locally
npm run check      # astro check (types + templates)
```

This machine's system Node is v20.12.2, which is below Astro's supported range.
The bundled runtime Node v24 is used instead:

```powershell
$env:PATH = "C:\Users\A3s\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;" + $env:PATH
npm run build
```

## Content

All editorial content lives in one typed module: [`src/content/site.ts`](src/content/site.ts).
Profile, contact, projects, archive, writing, book, experience, capabilities and
SEO defaults are plain data. Editing copy does not mean editing components.

Asset provenance lives in [`src/content/assets.ts`](src/content/assets.ts), with the
full record in [`docs/asset-manifest.md`](docs/asset-manifest.md).

## Pages

| Route | What it is |
| --- | --- |
| `/` | The full editorial homepage: hero, about, Tribe, selected work, writing, book, experience, contact |
| `/about` | Expanded background and a readable professional profile |
| `/writing` | Index of verified published writing |
| `/work/tribe` | Tribe case study |
| `/work/bonteh-magazine` | Bonteh Magazine case study |
| `/404` | Branded not-found page |

## Deployment switch

The site ships as a **private preview**: `noindex` on every page and a
`robots.txt` that disallows everything. No domain is registered and nothing has
been deployed.

To go live, two values change — one in `astro.config.mjs` (via environment) and
one in `src/content/site.ts`:

```bash
PUBLIC_SITE_URL=https://your-domain.com PUBLIC_SITE_INDEXABLE=true npm run build
```

```ts
// src/content/site.ts
export const seo = {
  siteUrl: "https://your-domain.com",
  indexable: true,
  ...
};
```

With `indexable: true` the sitemap integration activates, `robots.txt` switches
to allow, and the `noindex` meta tag is dropped. Canonical URLs, Open Graph
tags and Person structured data already point at `seo.siteUrl`.

## Tools

Reproducible scripts, all run with the bundled runtimes:

| Script | Purpose |
| --- | --- |
| `tools/prepare-assets.py` | Derives web assets from the supplied originals |
| `tools/prepare-portrait.py` | Portrait segmentation, matte cleanup and grade |
| `tools/fetch-fonts.mjs` | Downloads and self-hosts the webfont + licence |
| `tools/make-brand-images.mjs` | Renders the OG card and Apple touch icon |
| `tools/capture.mjs` | Screenshots a URL at several viewports |
| `tools/verify.mjs` | Structure, overflow, images, links, console errors |
| `tools/verify-interaction.mjs` | Reduced motion, keyboard, menu, header contrast |

## Checks performed

- `astro build` completes cleanly — 6 pages plus a generated `robots.txt` and
  sitemap.
- `tools/verify.mjs` at 375, 768, 1024 and 1440 px across all six routes:
  no horizontal overflow, no broken images, every image has alt text, no nested
  anchors, exactly one `h1` per page, no heading-level jumps, no console errors,
  no failed requests, every internal link resolves.
- `tools/verify-interaction.mjs`: reduced motion removes every continuous
  animation and reveals no longer hide content; the skip link is the first tab
  stop; the mobile menu opens on Enter, moves focus into the panel, locks body
  scroll, closes on Escape and returns focus; anchor navigation reaches
  `#contact`; the sticky header stays above 4.5:1 contrast over all eight
  section backgrounds (measured 4.96:1 at worst, over the red hero).
- Every outbound link was fetched and confirmed live on 11 October 2026:
  `usetribeapp.com`, `bontehmagazine.com` and the three article URLs, which were
  also checked for author attribution and publication date.

## Limitations

- No real domain is attached, so the canonical URL and the sitemap point at a
  placeholder. This is the go-live switch above, not a defect.
- No public CV PDF exists to download; `/about` offers a readable profile and a
  contact route instead of a broken button.
- The book has no confirmed purchase link, so the call to action asks rather
  than selling.
- Contrast was measured programmatically for the sticky header and checked by
  eye elsewhere; no full automated accessibility audit (axe or similar) was run.
- Sizeable content is only what could be verified. Older projects with dead
  domains are acknowledged without links rather than dressed up.
