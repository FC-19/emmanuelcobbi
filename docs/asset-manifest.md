# Asset manifest

Every image the site renders, where it came from, and how it may be described.
This file is the honest record: if something is a design rather than a
screenshot, or a treatment rather than an original, it says so here.

`status` values, mirrored in `src/content/assets.ts`:

| Status | Meaning |
| --- | --- |
| `original` | Supplied file, used as-is (cropped and resized only) |
| `derived` | A treatment applied to a supplied original |
| `capture` | A screenshot taken from a live, public page |
| `illustration` | Composed or designed artwork, never presented as a screenshot |

---

## Portrait

| File | Status | Source |
| --- | --- | --- |
| `src/assets/portrait-hero.webp` | derived | `Professional Portrait with Bold Graphic Shirt.png` |
| `src/assets/portrait-about.webp` | derived | same |
| `src/assets/portrait-cutout.webp` | derived | same |
| `src/assets/portrait-original.jpg` | original | same |

Processing (`tools/prepare-portrait.py`): the subject is segmented from the white
studio backdrop with rembg (`u2net_human_seg`), the matte is tightened by two
alpha pixels to remove the studio halo, then graded — an S-curve on luminance
applied as a gain, a lifted shadow floor, a warm rim light on the light-facing
edge, film grain and a soft vignette.

The face, the cap and the yellow mark on the shirt are untouched. No generative
step is involved anywhere in this pipeline.

## Book

| File | Status | Source |
| --- | --- | --- |
| `src/assets/book-mockup.webp` | original | `D:/TTGK/cover/1770566273.jpg` |
| `src/assets/book-tablet.webp` | original | `D:/TTGK/cover/1770568080.jpg` |

Processing: the white studio backdrop is keyed to transparency
(`tools/prepare-assets.py`, `key_background`), which preserves the soft floor
shadow as a semi-transparent matte. The cover artwork itself is unaltered.

## Tribe brand

| File | Status | Source |
| --- | --- | --- |
| `src/assets/tribe-icon.png` | original | `Tribe/logo/Nlogo/tribe logo2.png` |
| `src/assets/tribe-lockup.png` | original | same |

The icon is cropped from the original lockup — the yellow rounded tile with the
black card mark and three white dots. It is not redrawn, recoloured, substituted
for a chat bubble, or given a new wordmark.

Cross-check performed 11 October 2026: `https://usetribeapp.com/brand/tribe-logo-primary.png`
is byte-identical (SHA-256 `DC0E153A…C9BC263`) to the local `tribe logo1.png`, which
confirms these local files are the genuine brand artwork.

## Live-site captures

| File | Status | Source |
| --- | --- | --- |
| `src/assets/tribe-web.jpg` | capture | `https://usetribeapp.com/` |
| `src/assets/bonteh-web.jpg` | capture | `https://www.bontehmagazine.com/` |

Captured 11 October 2026 at 1440×1050 with `tools/capture.mjs`, which removes
newsletter and cookie overlays before shooting. The raw captures are kept in
`_captures/` for provenance and can be re-shot with:

```bash
node tools/capture.mjs "https://usetribeapp.com/" "_captures" tribe 1440:1050 1100:1500
node tools/capture.mjs "https://www.bontehmagazine.com/" "_captures" bonteh 1440:1050
```

Source images are stored in their delivery formats — WebP where alpha is needed,
JPEG for photography — so the repository stays small. Astro re-encodes them to
AVIF and WebP at several widths during the build.

## Tribe app interface design

| File | Status | Source |
| --- | --- | --- |
| `src/assets/tribe-app-design.jpg` | **illustration** | `Tribe/Mobile UI/New folder/7.png` |

Emmanuel's own product interface design work. It is labelled on the page as
interface design with placeholder figures, and is never described as a
screenshot of a live build.

## Event photography

| File | Status | Source |
| --- | --- | --- |
| `src/assets/event-banner.jpg` | original | Supplied event photograph |
| `src/assets/event-table.jpg` | original | Supplied event photograph |
| `src/assets/event-talk-wide.jpg` | original | Supplied event photograph |
| `src/assets/event-portrait.jpg` | original | Supplied event photograph |
| `src/assets/event-audience.jpg` | original | Supplied event photograph |
| `src/assets/event-stand.jpg` | original | Supplied event photograph |

Processing: scale-and-crop to a fixed aspect ratio only, biased upward so faces
stay in frame.

## Generated brand images

| File | Status | How |
| --- | --- | --- |
| `public/og-image.png` | composed | `tools/og.html` rendered at 1200×630 by `tools/make-brand-images.mjs` |
| `public/apple-touch-icon.png` | composed | Same script, 180×180 |
| `public/favicon.svg` | composed | Hand-written "EC" monogram |

The favicon uses Emmanuel's initials, not the Tribe mark.

## Typeface

| File | Licence |
| --- | --- |
| `public/fonts/geist-latin.woff2`, `geist-latin-ext.woff2` | SIL Open Font License 1.1 (`public/fonts/OFL.txt`) |

Geist stands in for the reference site's commercial Neue Haas Grotesk Display
Pro (identified from the reference's own font files, which are **not** copied).
Both are neutral neo-grotesques with low contrast and tight apertures. Geist is
self-hosted, so the site makes no third-party font requests.

---

## Missing or unconfirmed media

Nothing on this list is faked or substituted. Where an item is missing, the
layout degrades into a finished design rather than showing a placeholder.

| Item | Status | How the site handles it |
| --- | --- | --- |
| Confirmed book purchase link | Not supplied | "Ask about the book" opens WhatsApp with a prefilled message. No shop, checkout or preorder flow is invented. |
| Tribe product screenshots beyond the live site | Not supplied | The live site capture plus one labelled interface design are used. No fake dashboards. |
| Bonteh Magazine architecture details | Not confirmed | The case study describes the role and refuses to claim credit for the whole platform. |
| Personal social handles | Not confirmed | Omitted entirely. Tribe's official site publishes no Facebook, X or Instagram link, so no Tribe social links are rendered either. |
| Downloadable public CV PDF | Not available | `/about` carries a readable professional profile; the CV is offered on request with contact details deliberately excluded from this site. |
| `hopeforallcultures.org`, `ciase.se` | Domains no longer resolve | Listed as past work with no link. |
| Affiliate Lifestyle, PDV Leadex | Client sites no longer online | Named without links. |
| Archived project screenshots | Not supplied | No visual case studies invented. |

## Rights notes

- All photography, book artwork and Tribe brand assets are Emmanuel Cobbi's own
  or were supplied by him for this site.
- The live-site captures are screenshots of publicly accessible pages.
- The Geist font is used under the SIL Open Font License 1.1.
- No third-party stock imagery, testimonial, client logo or analytics figure is
  used anywhere on the site.
