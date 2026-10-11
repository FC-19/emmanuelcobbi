/**
 * Site verification harness.
 *
 * Loads every route at mobile, tablet and desktop widths against a running
 * preview server and reports the things that silently break a build:
 * horizontal overflow, broken images, missing alt text, console errors, failed
 * requests, multiple or missing h1s, nested anchors, and dead internal links.
 *
 *   node tools/verify.mjs http://127.0.0.1:4399
 */
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const ORIGIN = process.argv[2] ?? "http://127.0.0.1:4399";
const ROUTES = [
  "/",
  "/about",
  "/writing",
  "/work/tribe",
  "/work/bonteh-magazine",
  "/404",
];
const VIEWPORTS = [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1024, height: 800 },
  { width: 1440, height: 900 },
];

const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find((p) => existsSync(p));

if (!CHROME) throw new Error("No Chrome or Edge executable found.");

const problems = [];
const note = (route, vp, message) => problems.push(`${route} @${vp}px — ${message}`);

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    const consoleErrors = [];
    const failedRequests = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(String(err)));
    page.on("requestfailed", (req) => failedRequests.push(`${req.url()} ${req.failure()?.errorText}`));

    await page.setViewport({ ...vp, deviceScaleFactor: 1 });
    const response = await page.goto(`${ORIGIN}${route}`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const expected404 = route === "/404";
    if (!expected404 && response && response.status() >= 400) {
      note(route, vp.width, `HTTP ${response.status()}`);
    }

    const report = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - doc.clientWidth;

      // Only images the browser actually rendered count: decorative frames are
      // display:none below their breakpoint and are deliberately never fetched.
      const brokenImages = [...document.images]
        .filter(
          (img) =>
            img.currentSrc &&
            img.complete &&
            img.naturalWidth === 0 &&
            img.getBoundingClientRect().width > 0,
        )
        .map((img) => img.currentSrc);

      const missingAlt = [...document.images]
        .filter((img) => !img.hasAttribute("alt"))
        .map((img) => img.currentSrc);

      const nestedAnchors = [...document.querySelectorAll("a a")].length;

      const levels = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) =>
        Number(h.tagName[1]),
      );
      const jumps = [];
      for (let i = 1; i < levels.length; i += 1) {
        if (levels[i] > levels[i - 1] + 1) jumps.push(`${levels[i - 1]}->${levels[i]}`);
      }
      const headings = { h1: document.querySelectorAll("h1").length, order: jumps };

      const links = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"));
      const imagesWithoutDimensions = [...document.images].filter(
        (img) => !img.getAttribute("width") && !img.getAttribute("height") && !img.style.aspectRatio,
      ).length;

      return {
        overflow,
        brokenImages,
        missingAlt,
        nestedAnchors,
        headings,
        linkCount: links.length,
        links,
        imagesWithoutDimensions,
      };
    });

    if (report.overflow > 1) note(route, vp.width, `horizontal overflow of ${report.overflow}px`);
    if (report.brokenImages.length)
      note(route, vp.width, `broken images: ${report.brokenImages.join(", ")}`);
    if (report.missingAlt.length)
      note(route, vp.width, `images without alt: ${report.missingAlt.join(", ")}`);
    if (report.nestedAnchors) note(route, vp.width, `${report.nestedAnchors} nested anchor(s)`);
    if (report.headings.h1 !== 1) note(route, vp.width, `${report.headings.h1} h1 elements`);
    if (report.headings.order.length)
      note(route, vp.width, `heading level jumps: ${report.headings.order.join(", ")}`);
    if (consoleErrors.length) note(route, vp.width, `console errors: ${consoleErrors.join(" | ")}`);
    if (failedRequests.length)
      note(route, vp.width, `failed requests: ${failedRequests.join(" | ")}`);

    // Internal link resolution only needs checking once per route.
    if (vp.width === 1440) {
      const internal = [...new Set(report.links.filter((h) => h && h.startsWith("/")))]
        .map((h) => h.split("#")[0])
        .filter((h) => h !== "");
      for (const href of internal) {
        const res = await page.evaluate(async (u) => {
          try {
            const r = await fetch(u, { method: "GET" });
            return r.status;
          } catch {
            return 0;
          }
        }, href);
        if (res >= 400 || res === 0) note(route, vp.width, `internal link ${href} → ${res}`);
      }
      console.log(`${route} — checked ${report.linkCount} links`);
    }

    await page.close();
  }
}

await browser.close();

if (problems.length === 0) {
  console.log("\nAll checks passed.");
} else {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log(` - ${p}`);
  process.exitCode = 1;
}
