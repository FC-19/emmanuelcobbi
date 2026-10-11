/**
 * Render the Open Graph card and the Apple touch icon from the same design
 * language as the site, using the Chrome already installed on this machine.
 *
 *   node tools/make-brand-images.mjs
 */
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

const ROOT = path.resolve(import.meta.dirname, "..");
const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find((p) => existsSync(p));

if (!CHROME) throw new Error("No Chrome or Edge executable found.");

await mkdir(path.join(ROOT, "public"), { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });

const og = await browser.newPage();
await og.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
const ogPath = path.join(ROOT, "tools", "og.html").replace(/\\/g, "/");
await og.goto(`file:///${ogPath}`, { waitUntil: "networkidle0" });
await og.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 600));
await og.screenshot({ path: path.join(ROOT, "public", "og-image.png") });
console.log("public/og-image.png");

const icon = await browser.newPage();
await icon.setViewport({ width: 180, height: 180, deviceScaleFactor: 1 });
await icon.setContent(
  `<html><body style="margin:0">
     <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
       <rect width="64" height="64" rx="14" fill="#E20000"/>
       <text x="32" y="41.5" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
         font-size="27" font-weight="500" letter-spacing="-1" fill="#FFFFFF">EC</text>
     </svg>
   </body></html>`,
);
await icon.screenshot({ path: path.join(ROOT, "public", "apple-touch-icon.png") });
console.log("public/apple-touch-icon.png");

await browser.close();
