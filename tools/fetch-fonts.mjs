/**
 * Download and self-host the portfolio's typefaces.
 *
 * All four are SIL Open Font License 1.1 and are fetched from Google Fonts:
 *   Inter Tight  — display / headings (the reference's tight grotesque)
 *   DM Sans      — body
 *   DM Mono      — labels, numbers, meta
 *   Caveat       — the handwritten sticky notes
 *
 *   node tools/fetch-fonts.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const FONT_DIR = path.join(ROOT, "public", "fonts");
const STYLE_DIR = path.join(ROOT, "src", "styles");

const FAMILIES = [
  { css: "Inter+Tight:wght@400..600", slug: "inter-tight" },
  { css: "DM+Sans:wght@400..500", slug: "dm-sans" },
  // DM Mono ships as static weights, not a variable axis.
  { css: "DM+Mono:wght@400;500", slug: "dm-mono" },
  { css: "Caveat:wght@500..600", slug: "caveat" },
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";

await mkdir(FONT_DIR, { recursive: true });
await mkdir(STYLE_DIR, { recursive: true });

const faces = [];

for (const family of FAMILIES) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${family.css}&display=swap`, {
      headers: { "User-Agent": UA },
    })
  ).text();

  for (const block of css.split("@font-face").slice(1)) {
    const range = /unicode-range:\s*([^;]+);/.exec(block)?.[1]?.trim();
    const url = /src:\s*url\(([^)]+)\)/.exec(block)?.[1];
    const weight = /font-weight:\s*([^;]+);/.exec(block)?.[1]?.trim();
    if (!url || !range) continue;

    let subset = null;
    if (range.includes("U+0000-00FF")) subset = "latin";
    else if (range.includes("U+0100-02BA")) subset = "latin-ext";
    if (!subset) continue;

    const manyWeights = /;/.test(family.css);
    const file = `${family.slug}-${subset}${manyWeights ? `-${(weight ?? "400").trim()}` : ""}.woff2`;
    const bytes = Buffer.from(await (await fetch(url)).arrayBuffer());
    await writeFile(path.join(FONT_DIR, file), bytes);
    faces.push({ family: family.slug, file, range, weight });
    console.log(`${file}  ${Math.round(bytes.length / 1024)}KB`);
  }
}

const familyNames = {
  "inter-tight": "Inter Tight",
  "dm-sans": "DM Sans",
  "dm-mono": "DM Mono",
  caveat: "Caveat",
};

const cssOut = [
  "/* Self-hosted webfonts, all SIL Open Font License 1.1. */",
  ...faces.map(
    (f) => `@font-face {
  font-family: "${familyNames[f.family]}";
  font-style: normal;
  font-weight: ${f.weight ?? "400"};
  font-display: swap;
  src: url("/fonts/${f.file}") format("woff2");
  unicode-range: ${f.range};
}`,
  ),
  "",
].join("\n");

await writeFile(path.join(STYLE_DIR, "fonts.css"), cssOut);
console.log("src/styles/fonts.css");

try {
  const license = await (
    await fetch("https://raw.githubusercontent.com/googlefonts/dm-fonts/main/OFL.txt")
  ).text();
  await writeFile(path.join(FONT_DIR, "OFL.txt"), license);
  console.log("OFL.txt");
} catch {
  console.warn("Could not fetch a licence file — add the OFL text manually.");
}
