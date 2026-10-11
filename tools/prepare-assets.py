"""Derive web assets for the Emmanuel Cobbi portfolio from original source files.

Nothing here redraws or regenerates brand artwork. Every output is a crop,
background key, resize or tonal treatment applied to a supplied original.

Run with the bundled Codex runtime Python:
  <python> tools/prepare-assets.py
"""

from __future__ import annotations

import os
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src" / "assets"

SRC_BOOK_STAND = Path("D:/TTGK/cover/1770566273.jpg")
SRC_BOOK_TABLET = Path("D:/TTGK/cover/1770568080.jpg")
SRC_TRIBE_LOCKUP = Path("C:/Users/A3s/Documents/Tribe/logo/Nlogo/tribe logo2.png")

SRC_EVENT = {
    "event-banner": "C:/Users/A3s/Videos/831479859_2622754464834053_4713602904028472495_n.jpg",
    "event-table": "C:/Users/A3s/Videos/837891204_2623688068074026_5240569844377582616_n.jpg",
    "event-talk-wide": "C:/Users/A3s/Videos/832591590_2623687951407371_2385250056318396333_n.jpg",
    "event-portrait": "C:/Users/A3s/Videos/833326141_2623687771407389_7303877483582138536_n.jpg",
    "event-audience": "C:/Users/A3s/Videos/834123994_2623687874740712_3417375527507802257_n.jpg",
    "event-stand": "C:/Users/A3s/Videos/833276159_2623688178074015_4101235260805184566_n.jpg",
}

# Live-site captures produced by tools/capture.mjs (see README for the command).
ROOT_CAPTURES = ROOT / "_captures"
SRC_CAPTURE = {
    "tribe-web": ROOT_CAPTURES / "tribe-1440.png",
    "bonteh-web": ROOT_CAPTURES / "bonteh-1440.png",
}

# Emmanuel's own Tribe app interface design files.
SRC_TRIBE_APP = Path("C:/Users/A3s/Documents/Tribe/Mobile UI/New folder/7.png")


def trimmed(im: Image.Image, pad: int = 0) -> Image.Image:
    bbox = im.getchannel("A").getbbox()
    if bbox is None:
        return im
    left = max(0, bbox[0] - pad)
    top = max(0, bbox[1] - pad)
    right = min(im.width, bbox[2] + pad)
    bottom = min(im.height, bbox[3] + pad)
    return im.crop((left, top, right, bottom))


def key_background(im: Image.Image, lo: int = 8, hi: int = 30) -> Image.Image:
    """Make near-white background transparent, keeping darker product edges.

    Alpha is driven by how far a pixel sits from white in its darkest channel,
    so bright but saturated artwork (the book cover's glowing sky) stays opaque
    while the studio backdrop falls away. Soft floor shadows survive as a
    semi-transparent matte instead of a hard cut.
    """
    arr = np.array(im.convert("RGB")).astype(np.int32)
    darkness = 255 - arr.min(axis=2)
    span = max(1, hi - lo)
    alpha = np.clip((darkness - lo) / span, 0.0, 1.0)
    alpha = (alpha * 255.0).round().astype(np.uint8)
    out = np.dstack([arr.astype(np.uint8), alpha])
    return Image.fromarray(out, "RGBA")


def soften_alpha(im: Image.Image, radius: float = 0.6) -> Image.Image:
    a = im.getchannel("A").filter(ImageFilter.GaussianBlur(radius))
    im = im.copy()
    im.putalpha(a)
    return im


def save_png(im: Image.Image, name: str) -> None:
    im.save(ASSETS / name, "PNG", optimize=True)
    print(f"  {name}  {im.width}x{im.height}  {round((ASSETS / name).stat().st_size / 1024)}KB")


def save_webp(im: Image.Image, name: str, quality: int = 92) -> None:
    im.save(ASSETS / name, "WEBP", quality=quality, method=6)
    print(f"  {name}  {im.width}x{im.height}  {round((ASSETS / name).stat().st_size / 1024)}KB")


def save_jpg(im: Image.Image, name: str, quality: int = 88) -> None:
    im.convert("RGB").save(ASSETS / name, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"  {name}  {im.width}x{im.height}  {round((ASSETS / name).stat().st_size / 1024)}KB")


def cover_crop(im: Image.Image, w: int, h: int) -> Image.Image:
    """Scale-and-crop to an exact aspect ratio without distorting the subject."""
    target = w / h
    src = im.width / im.height
    if src > target:
        new_h = im.height
        new_w = int(round(new_h * target))
    else:
        new_w = im.width
        new_h = int(round(new_w / target))
    left = (im.width - new_w) // 2
    top = int(round((im.height - new_h) * 0.35))  # bias upward: keeps faces in frame
    return im.crop((left, top, left + new_w, top + new_h))


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)

    print("Tribe brand (original artwork, cropped only)")
    lockup = Image.open(SRC_TRIBE_LOCKUP).convert("RGBA")
    icon = lockup.crop((14, 30, 1040, 748))
    save_png(trimmed(icon, 8), "tribe-icon.png")
    save_png(trimmed(lockup, 8), "tribe-lockup.png")

    print("Book")
    book = key_background(Image.open(SRC_BOOK_STAND), lo=8, hi=30)
    save_webp(soften_alpha(trimmed(book, 6)), "book-mockup.webp")
    tablet = key_background(Image.open(SRC_BOOK_TABLET), lo=8, hi=30)
    save_webp(soften_alpha(trimmed(tablet, 6)), "book-tablet.webp")

    print("Event photography")
    for name, path in SRC_EVENT.items():
        im = Image.open(path).convert("RGB")
        if im.height > im.width:
            out = cover_crop(im, 900, 1200)
        else:
            out = cover_crop(im, 1400, 1050)
        save_jpg(out, f"{name}.jpg", quality=86)

    print("Tribe app interface design")
    app = Image.open(SRC_TRIBE_APP).convert("RGB")
    app.thumbnail((720, 1600), Image.LANCZOS)
    save_jpg(app, "tribe-app-design.jpg", quality=84)

    print("Live site captures")
    for name, path in SRC_CAPTURE.items():
        if not path.exists():
            print(f"  {name}: capture missing at {path}")
            continue
        im = Image.open(path).convert("RGB")
        save_jpg(im, f"{name}.jpg", quality=88)


if __name__ == "__main__":
    main()
