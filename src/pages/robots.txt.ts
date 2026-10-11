import type { APIRoute } from "astro";
import { seo } from "../content/site";

/**
 * robots.txt follows the same switch as the pages, so a private preview can
 * never be indexed by accident.
 */
export const GET: APIRoute = () => {
  const body = seo.indexable
    ? [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${new URL("sitemap-index.xml", seo.siteUrl).href}`,
        "",
      ].join("\n")
    : [
        "# Private preview.",
        "# The site is marked noindex until a real public domain is attached.",
        "# Set seo.indexable = true in src/content/site.ts and rebuild at go-live.",
        "User-agent: *",
        "Disallow: /",
        "",
      ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
