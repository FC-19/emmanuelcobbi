/**
 * Capture a page at named vertical stops. This is a visual-QA helper for long
 * editorial pages where a full-page screenshot would be too tall to inspect.
 *
 *   node tools/capture-stops.mjs <url> <outDir> <prefix> <width> <height> <stop,...>
 */
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

const [url, outDir, prefix, widthArg, heightArg, stopsArg] = process.argv.slice(2);
const width = Number(widthArg || 1440);
const height = Number(heightArg || 1000);
const stops = (stopsArg || "0,1000,2000,3000,4000,5000,6000,7000")
  .split(",")
  .map(Number);

const executablePath = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find((candidate) => existsSync(candidate));

if (!executablePath) throw new Error("No Chrome or Edge executable found.");
await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--hide-scrollbars", "--disable-gpu"],
});
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((resolve) => setTimeout(resolve, 1600));

for (const stop of stops) {
  await page.evaluate((top) => {
    window.scrollTo({ top, behavior: "instant" });
  }, stop);
  await new Promise((resolve) => setTimeout(resolve, 700));
  await page.screenshot({
    path: path.join(outDir, `${prefix}-${width}-${String(stop).padStart(6, "0")}.png`),
  });
}

await browser.close();
