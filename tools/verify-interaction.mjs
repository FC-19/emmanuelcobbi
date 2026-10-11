/**
 * Behavioural verification: reduced motion, keyboard access, the mobile menu,
 * and the sticky header's legibility as it crosses every section background.
 *
 *   node tools/verify-interaction.mjs http://127.0.0.1:4399
 */
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const ORIGIN = process.argv[2] ?? "http://127.0.0.1:4399";
const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find((p) => existsSync(p));

if (!CHROME) throw new Error("No Chrome or Edge executable found.");

const problems = [];
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });

// ---------------------------------------------------------------- reduced motion
{
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${ORIGIN}/`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 600));

  const result = await page.evaluate(() => {
    const frames = [...document.querySelectorAll(".float__frame")];
    const animated = frames.filter((f) => getComputedStyle(f).animationName !== "none");
    const hiddenReveals = [...document.querySelectorAll("[data-reveal]")].filter(
      (el) => getComputedStyle(el).opacity !== "1",
    );
    return {
      animatedFrames: animated.length,
      totalFrames: frames.length,
      hiddenReveals: hiddenReveals.length,
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    };
  });

  if (result.animatedFrames > 0)
    problems.push(`reduced motion: ${result.animatedFrames} float frame(s) still animating`);
  if (result.hiddenReveals > 0)
    problems.push(`reduced motion: ${result.hiddenReveals} reveal target(s) still hidden`);
  if (result.scrollBehavior !== "auto")
    problems.push(`reduced motion: scroll-behavior is "${result.scrollBehavior}"`);
  console.log(
    `reduced motion — ${result.totalFrames} frames, ${result.animatedFrames} animating, ${result.hiddenReveals} hidden reveals`,
  );
  await page.close();
}

// ---------------------------------------------------------------- keyboard + menu
{
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  await page.goto(`${ORIGIN}/`, { waitUntil: "networkidle2" });

  // First Tab should land on the skip link.
  await page.keyboard.press("Tab");
  const firstFocus = await page.evaluate(() => document.activeElement?.className ?? "");
  if (!firstFocus.includes("skip-link"))
    problems.push(`keyboard: first tab stop is "${firstFocus}", expected the skip link`);

  const toggle = "[data-menu-toggle]";
  await page.focus(toggle);
  await page.keyboard.press("Enter");
  await new Promise((r) => setTimeout(r, 400));
  const openState = await page.evaluate(() => ({
    menuOpen: document.querySelector("[data-mobile-menu]")?.getAttribute("data-open"),
    expanded: document.querySelector("[data-menu-toggle]")?.getAttribute("aria-expanded"),
    bodyLocked: document.body.getAttribute("data-menu-open"),
    focusInMenu: !!document.querySelector("[data-mobile-menu]")?.contains(document.activeElement),
  }));

  if (openState.menuOpen !== "true") problems.push("mobile menu: Enter did not open the menu");
  if (openState.expanded !== "true") problems.push("mobile menu: aria-expanded not updated");
  if (openState.bodyLocked !== "true") problems.push("mobile menu: body scroll not locked");
  if (!openState.focusInMenu) problems.push("mobile menu: focus did not move into the panel");

  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 400));
  const closed = await page.evaluate(() => ({
    menuOpen: document.querySelector("[data-mobile-menu]")?.getAttribute("data-open"),
    focusBack: document.activeElement?.hasAttribute("data-menu-toggle"),
  }));
  if (closed.menuOpen !== "false") problems.push("mobile menu: Escape did not close the menu");
  if (!closed.focusBack) problems.push("mobile menu: focus did not return to the toggle");

  // Anchor navigation from the mobile menu.
  await page.focus(toggle);
  await page.keyboard.press("Enter");
  await new Promise((r) => setTimeout(r, 300));
  await page.evaluate(() => document.querySelector('[data-mobile-menu] a[href="#contact"]')?.click());
  // Smooth scrolling across a long mobile document takes a moment.
  await new Promise((r) => setTimeout(r, 3000));
  const landed = await page.evaluate(() => {
    const contact = document.querySelector("#contact");
    const rect = contact?.getBoundingClientRect();
    return { inView: rect ? rect.top < window.innerHeight && rect.bottom > 0 : false };
  });
  if (!landed.inView) problems.push("anchor navigation: #contact did not scroll into view");
  console.log("keyboard and mobile menu — checked");
  await page.close();
}

// ---------------------------------------------------------------- header legibility
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${ORIGIN}/`, { waitUntil: "networkidle2" });

  const sections = await page.evaluate(() =>
    [...document.querySelectorAll("[data-theme]")].map((el) => ({
      theme: el.getAttribute("data-theme"),
      id: el.id || "(unnamed)",
    })),
  );

  for (const section of sections) {
    await page.evaluate((id) => {
      const el = id === "(unnamed)" ? null : document.getElementById(id);
      const target = el ?? document.querySelector("[data-theme]");
      const top = target.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top, behavior: "auto" });
    }, section.id);
    await new Promise((r) => setTimeout(r, 260));

    const headerState = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      const fg = styles.getPropertyValue("--header-fg").trim();
      const bg = styles.getPropertyValue("--header-bg").trim();
      const parse = (value) => {
        const m = value.match(/rgba?\(([^)]+)\)/);
        if (m) return m[1].split(",").map((n) => parseFloat(n));
        const hex = value.replace("#", "");
        if (hex.length === 6)
          return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).concat([1]);
        return null;
      };
      return { fg: parse(fg), bg: parse(bg) };
    });

    const luminance = ([r, g, b]) => {
      const f = (c) => {
        const v = c / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };

    const { fg, bg } = headerState;
    if (!fg) {
      problems.push(`header: no foreground colour set over ${section.theme}`);
      continue;
    }
    // When the header is transparent it sits directly on the section field.
    const base = !bg || bg[3] === 0 ? section.theme : null;
    const fieldLum = base
      ? {
          red: luminance([226, 0, 0]),
          ink: luminance([20, 18, 17]),
          blue: luminance([49, 89, 244]),
          cream: luminance([247, 242, 234]),
          paper: luminance([255, 253, 249]),
        }[base]
      : null;
    const bgLum = fieldLum ?? luminance(bg.slice(0, 3));
    const ratio =
      (Math.max(luminance(fg), bgLum) + 0.05) / (Math.min(luminance(fg), bgLum) + 0.05);

    if (ratio < 4.5)
      problems.push(
        `header: contrast ${ratio.toFixed(2)}:1 over ${section.theme} (${section.id}) is below 4.5:1`,
      );
    else
      console.log(
        `header over ${section.theme.padEnd(5)} — contrast ${ratio.toFixed(2)}:1`,
      );
  }
  await page.close();
}

await browser.close();

if (problems.length === 0) console.log("\nAll interaction checks passed.");
else {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log(` - ${p}`);
  process.exitCode = 1;
}
