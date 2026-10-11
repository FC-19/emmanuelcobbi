/**
 * Screenshot helper used for design verification.
 *
 * Captures a URL at a set of viewport widths using the Chrome already installed
 * on this machine, optionally dismissing newsletter/cookie overlays first.
 *
 *   node tools/capture.mjs <url> <outDir> <prefix> [width:height ...]
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];

const args = process.argv.slice(2);
const fullPage = args.includes("--full");
const [url, outDir, prefix, ...sizes] = args.filter((a) => a !== "--full");
const viewports = (sizes.length ? sizes : ["1440:900", "768:1024", "375:812"]).map((s) => {
  const [width, height] = s.split(":").map(Number);
  return { width, height };
});

const { existsSync } = await import("node:fs");
const executablePath = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!executablePath) throw new Error("No Chrome or Edge executable found.");

await mkdir(outDir, { recursive: true });
const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--hide-scrollbars", "--disable-gpu", "--no-first-run", "--no-default-browser-check"],
});

for (const vp of viewports) {
  const page = await browser.newPage();
  await page.setViewport({ ...vp, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.setViewport({ ...vp, deviceScaleFactor: 1 });

  // Dismiss well-known overlays on third-party sites so the capture shows content.
  await page.evaluate(() => {
    const labels = ["reject optional", "accept all", "accept", "subscribe", "close", "no thanks"];
    for (const el of document.querySelectorAll("button, [role=button], a")) {
      const text = (el.textContent || "").trim().toLowerCase();
      if (labels.includes(text)) el.click();
    }
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", keyCode: 27, bubbles: true }));
    const vh = window.innerHeight;
    for (const el of document.querySelectorAll(
      "[role=dialog], [class*=modal], [class*=popup], [class*=overlay], [class*=cookie], [class*=consent], [class*=banner][class*=fixed], [id*=cookie]",
    )) {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const covers = (rect.width * rect.height) / (window.innerWidth * vh);
      if (style.position === "fixed" && covers > 0.02) el.remove();
    }
  });

  await new Promise((r) => setTimeout(r, 2400));
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("[role=dialog], [class*=cookie], [class*=consent]")) {
      const style = getComputedStyle(el);
      if (style.position === "fixed") el.remove();
    }
  });
  await new Promise((r) => setTimeout(r, 400));
  const file = path.join(outDir, `${prefix}-${vp.width}${fullPage ? "-full" : ""}.png`);
  if (fullPage) {
    // Let lazy-loaded images finish before capturing the whole document.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 180));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 900));
  }
  await page.screenshot({ path: file, fullPage });
  console.log(`${file}`);
  await page.close();
}

await browser.close();
