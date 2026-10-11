"""Build the hero and profile portrait treatments from Emmanuel's supplied photo.

Stages:
  1. Segment the subject out of the studio backdrop (rembg, no face alteration).
  2. Keep an untouched full-colour cutout for the record.
  3. Grade the hero cut-out so it holds up on the vivid red field: deepened
     blacks, lifted contrast, a warm rim light on the light-facing side, film
     grain, and a soft vignette. The photograph's own colours are kept — the
     black shirt with the yellow Tribe mark is the point of the frame.
  4. Derive a calmer, tighter variant for the About section and page header.

The likeness is the source photograph throughout. Nothing here redraws,
regenerates or reinterprets the face or the branding on the shirt and cap.
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "src" / "assets"
SOURCE = Path("C:/Users/A3s/Downloads/Professional Portrait with Bold Graphic Shirt.png")


def cutout() -> Image.Image:
    cached = ASSETS / "portrait-cutout.png"
    if cached.exists():
        return Image.open(cached).convert("RGBA")
    session = new_session("u2net_human_seg")
    src = Image.open(SOURCE).convert("RGBA")
    return remove(
        src,
        session=session,
        alpha_matting=True,
        alpha_matting_foreground_threshold=250,
        alpha_matting_background_threshold=8,
        alpha_matting_erode_size=10,
    ).convert("RGBA")


def grade(im: Image.Image, contrast: float = 0.22, lift: float = 0.02) -> Image.Image:
    """Editorial colour grade: deeper blacks, a gentle S-curve, no hue shift."""
    rgb = np.array(im.convert("RGB")).astype(np.float32) / 255.0
    lum = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    # S-curve on luminance, applied as a gain so colour relationships survive.
    curved = np.clip(lum + contrast * (lum * lum * (3.0 - 2.0 * lum) - lum), 0.0, 1.0)
    gain = np.where(lum > 1e-4, curved / np.maximum(lum, 1e-4), 1.0)
    out = rgb * gain[..., None]
    # Lift the deepest shadows slightly so the black shirt keeps its folds.
    out = out * (1.0 - lift) + lift
    return Image.fromarray(np.clip(out * 255.0, 0, 255).round().astype(np.uint8), "RGB").convert(
        "RGBA"
    )


def rim_light(im: Image.Image, dx: int = 16, dy: int = -10, strength: float = 0.95) -> Image.Image:
    """Light the silhouette edge on the side the studio key light already falls."""
    alpha = np.array(im.getchannel("A")).astype(np.float32)
    shifted = np.roll(alpha, shift=(dy, dx), axis=(0, 1))
    if dx > 0:
        shifted[:, :dx] = 0
    elif dx < 0:
        shifted[:, dx:] = 0
    band = np.clip(alpha - shifted, 0, 255) / 255.0
    band = np.array(
        Image.fromarray((band * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(5))
    ).astype(np.float32) / 255.0
    rgb = np.array(im.convert("RGB")).astype(np.float32)
    # Warm rim with a red lean, drawn from the hero field.
    rim_rgb = np.array([255, 196, 168], dtype=np.float32)
    lit = rgb + (255.0 - rgb) * (np.clip(band * 1.6, 0, 1)[..., None] * strength)
    lit = lit + (rim_rgb - lit) * (band[..., None] * 0.55)
    return Image.fromarray(np.clip(lit, 0, 255).round().astype(np.uint8), "RGB").convert("RGBA")


def vignette(im: Image.Image, amount: float = 0.26, cy_ratio: float = 0.4) -> Image.Image:
    """Darken the lower corners so the face carries the composition."""
    h, w = im.height, im.width
    ys, xs = np.mgrid[0:h, 0:w].astype(np.float32)
    cx, cy = w * 0.5, h * cy_ratio
    nx = (xs - cx) / (w * 0.72)
    ny = (ys - cy) / (h * 0.78)
    d = np.sqrt(nx * nx + ny * ny)
    falloff = np.clip((d - 0.55) / 0.75, 0.0, 1.0) ** 1.5
    mask = 1.0 - falloff * amount
    rgb = np.array(im.convert("RGB")).astype(np.float32) * mask[..., None]
    return Image.fromarray(np.clip(rgb, 0, 255).round().astype(np.uint8), "RGB").convert("RGBA")


def grain(im: Image.Image, amount: float = 7.5, seed: int = 20261011) -> Image.Image:
    rng = np.random.default_rng(seed)
    rgb = np.array(im.convert("RGB")).astype(np.float32)
    noise = rng.normal(0.0, 1.0, rgb.shape[:2]).astype(np.float32)
    noise = np.array(
        Image.fromarray(((noise * 0.5 + 0.5) * 255).astype(np.uint8)).filter(
            ImageFilter.GaussianBlur(0.5)
        )
    ).astype(np.float32)
    noise = (noise - 128.0) / 128.0
    # Grain sits most visibly in the midtones, as film does.
    weight = 1.0 - np.abs(rgb.mean(axis=2) / 255.0 - 0.5) * 1.1
    out = rgb + noise[..., None] * amount * np.clip(weight, 0.15, 1.0)[..., None]
    return Image.fromarray(np.clip(out, 0, 255).round().astype(np.uint8), "RGB").convert("RGBA")


def trim(im: Image.Image) -> Image.Image:
    bbox = im.getchannel("A").getbbox()
    return im.crop(bbox) if bbox else im


def clean_matte(im: Image.Image, erode: int = 3, feather: float = 0.9) -> Image.Image:
    """Pull the matte in slightly so the studio backdrop leaves no pale halo.

    A soft matte keeps a rim of bright background pixels around a lit shoulder.
    Eroding the alpha by a pixel or two and re-feathering removes it without
    biting into the subject.
    """
    alpha = im.getchannel("A")
    # Reject the faintest coverage outright, then shrink the remaining edge.
    alpha = alpha.point(lambda v: 0 if v < 26 else v)
    if erode >= 3:
        alpha = alpha.filter(ImageFilter.MinFilter(erode))
    alpha = alpha.filter(ImageFilter.GaussianBlur(feather))
    out = im.copy()
    out.putalpha(alpha)
    return out


def save_png(im: Image.Image, name: str) -> None:
    im.save(ASSETS / name, "PNG", optimize=True)
    print(f"  {name}  {im.width}x{im.height}  {round((ASSETS / name).stat().st_size / 1024)}KB")


def save_webp(im: Image.Image, name: str, quality: int = 92) -> None:
    im.save(ASSETS / name, "WEBP", quality=quality, method=6)
    print(f"  {name}  {im.width}x{im.height}  {round((ASSETS / name).stat().st_size / 1024)}KB")


def save_jpg(im: Image.Image, name: str, quality: int = 90) -> None:
    im.convert("RGB").save(
        ASSETS / name, "JPEG", quality=quality, optimize=True, progressive=True
    )
    print(f"  {name}  {im.width}x{im.height}  {round((ASSETS / name).stat().st_size / 1024)}KB")


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)

    base = trim(clean_matte(cutout()))
    save_webp(base, "portrait-cutout.webp")

    hero = grain(vignette(rim_light(grade(base))), amount=6.0)
    hero.putalpha(base.getchannel("A"))
    save_webp(trim(hero), "portrait-hero.webp")

    calm = grain(vignette(grade(base, contrast=0.16), amount=0.2, cy_ratio=0.34), amount=3.5)
    calm.putalpha(base.getchannel("A"))
    save_webp(trim(calm), "portrait-about.webp")

    original = Image.open(SOURCE).convert("RGB")
    save_jpg(original, "portrait-original.jpg", quality=90)


if __name__ == "__main__":
    main()
