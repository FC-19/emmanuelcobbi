import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// The site is live at emmanuelcobbi.xyz, so indexing defaults to on and the
// sitemap is emitted. Both can be overridden per build:
//
//   PUBLIC_SITE_URL        public origin, e.g. https://emmanuelcobbi.xyz
//   PUBLIC_SITE_INDEXABLE  "false" to fall back to a noindex private preview
//
// The noindex meta tag is driven by the matching value in
// src/content/site.ts -> seo, so keep the two in step.
const siteUrl = process.env.PUBLIC_SITE_URL ?? "https://www.emmanuelcobbi.xyz";
const indexable = process.env.PUBLIC_SITE_INDEXABLE !== "false";

export default defineConfig({
  site: siteUrl,
  trailingSlash: "ignore",
  integrations: indexable ? [sitemap()] : [],
  build: {
    inlineStylesheets: "auto",
  },
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },
});
