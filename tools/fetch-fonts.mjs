/**
 * Download and self-host the licensed webfont.
 *
 * Geist (SIL Open Font License 1.1) stands in for the reference site's
 * commercial Neue Haas Grotesk Display Pro: a neutral neo-grotesque with the
 * same low-contrast, tight-aperture character. The reference font file itself
 * is never copied.
 *
 *   node tools/fetch-fonts.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const FAMILY = "Geist";
const ROOT = path.resolve(import.meta.dirname, "..");
const FONT_DIR = path.join(ROOT, "public", "fonts");
const LICENSE_URL = "https://raw.githubusercontent.com/vercel/geist-font/main/OFL.txt";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36";

await mkdir(FONT_DIR, { recursive: true });

const css = await (
  await fetch(`https://fonts.googleapis.com/css2?family=${FAMILY}:wght@300..700&display=swap`, {
    headers: { "User-Agent": UA },
  })
).text();

const blocks = css.split("@font-face").slice(1);
const faces = [];
for (const block of blocks) {
  const range = /unicode-range:\s*([^;]+);/.exec(block)?.[1]?.trim();
  const url = /src:\s*url\(([^)]+)\)/.exec(block)?.[1];
  if (!url) continue;
  let name;
  if (range?.includes("U+0000-00FF")) name = "geist-latin";
  else if (range?.includes("U+0100-02BA")) name = "geist-latin-ext";
  else continue; // skip cyrillic/greek/vietnamese subsets
  const bytes = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(path.join(FONT_DIR, `${name}.woff2`), bytes);
  faces.push({ name, range });
  console.log(`${name}.woff2  ${Math.round(bytes.length / 1024)}KB`);
}

try {
  const license = await (await fetch(LICENSE_URL)).text();
  await writeFile(path.join(FONT_DIR, "OFL.txt"), license);
  console.log("OFL.txt  (SIL Open Font License 1.1)");
} catch {
  console.warn("Could not fetch OFL.txt; add the license manually before publishing.");
}

const unicodeFor = (name) =>
  faces.find((f) => f.name === name)?.range ?? "";

const cssOut = `/* Geist - SIL Open Font License 1.1. Self-hosted; see public/fonts/OFL.txt */
@font-face {
  font-family: "Geist";
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url("/fonts/geist-latin.woff2") format("woff2");
  unicode-range: ${unicodeFor("geist-latin")};
}
@font-face {
  font-family: "Geist";
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url("/fonts/geist-latin-ext.woff2") format("woff2");
  unicode-range: ${unicodeFor("geist-latin-ext")};
}
`;
await writeFile(path.join(ROOT, "src", "styles", "fonts.css"), cssOut);
console.log("src/styles/fonts.css");
