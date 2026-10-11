/**
 * Asset ledger.
 *
 * Every image the site renders is imported here so Astro can optimise it and so
 * there is one place to see what exists, where it came from, and how it may be
 * described. `status` is deliberately explicit:
 *
 *   original     supplied by Emmanuel, used as-is (cropped/resized only)
 *   derived      a treatment applied to a supplied original
 *   capture      a screenshot taken from a live, public page
 *   illustration  composed or designed artwork, never presented as a screenshot
 *
 * See docs/asset-manifest.md for sources, licences and the missing-media list.
 */
import type { ImageMetadata } from "astro";

import bontehWeb from "../assets/bonteh-web.jpg";
import bookMockup from "../assets/book-mockup.webp";
import bookTablet from "../assets/book-tablet.webp";
import eventAudience from "../assets/event-audience.jpg";
import eventBanner from "../assets/event-banner.jpg";
import eventPortrait from "../assets/event-portrait.jpg";
import eventStand from "../assets/event-stand.jpg";
import eventTable from "../assets/event-table.jpg";
import eventTalkWide from "../assets/event-talk-wide.jpg";
import portraitAbout from "../assets/portrait-about.webp";
import portraitCutout from "../assets/portrait-cutout.webp";
import portraitHero from "../assets/portrait-hero.webp";
import portraitOriginal from "../assets/portrait-original.jpg";
import tribeAppDesign from "../assets/tribe-app-design.jpg";
import tribeIcon from "../assets/tribe-icon.png";
import tribeLockup from "../assets/tribe-lockup.png";
import tribeWeb from "../assets/tribe-web.jpg";

export type AssetStatus = "original" | "derived" | "capture" | "illustration";

export type Asset = {
  src: ImageMetadata;
  alt: string;
  status: AssetStatus;
  source: string;
  note?: string;
};

export const assets = {
  portraitHero: {
    src: portraitHero,
    alt: "Emmanuel Cobbi photographed from the chest up in a black Tribe cap and a black shirt carrying the yellow Tribe mark.",
    status: "derived",
    source: "Supplied photograph (Professional Portrait with Bold Graphic Shirt.png)",
    note: "Subject segmented from the white studio backdrop, matte tightened, then given an editorial colour grade, a warm rim light, film grain and a vignette. Face and shirt branding untouched.",
  },
  portraitAbout: {
    src: portraitAbout,
    alt: "Portrait of Emmanuel Cobbi wearing a black Tribe cap and a black shirt with the yellow Tribe mark.",
    status: "derived",
    source: "Supplied photograph (Professional Portrait with Bold Graphic Shirt.png)",
    note: "Calmer grade of the same cut-out, used where the hero treatment would be too strong.",
  },
  portraitCutout: {
    src: portraitCutout,
    alt: "Full-colour cut-out of Emmanuel Cobbi against a transparent background.",
    status: "derived",
    source: "Supplied photograph (Professional Portrait with Bold Graphic Shirt.png)",
    note: "Segmentation only, kept for future use.",
  },
  portraitOriginal: {
    src: portraitOriginal,
    alt: "Studio photograph of Emmanuel Cobbi in a black Tribe cap and a black shirt carrying the yellow Tribe mark.",
    status: "original",
    source: "Supplied photograph (Professional Portrait with Bold Graphic Shirt.png)",
  },
  bookMockup: {
    src: bookMockup,
    alt: "Tales the Gods Keep hardcover standing at an angle, showing the title, the subtitle and the author's name.",
    status: "original",
    source: "Supplied book mockup (1770566273.jpg)",
    note: "Studio backdrop keyed out; book artwork is the supplied cover, unaltered.",
  },
  bookTablet: {
    src: bookTablet,
    alt: "Tales the Gods Keep cover displayed on a tablet screen.",
    status: "original",
    source: "Supplied book mockup (1770568080.jpg)",
  },
  tribeIcon: {
    src: tribeIcon,
    alt: "Tribe app icon: a yellow rounded tile containing a black card mark with three white dots.",
    status: "original",
    source: "Original Tribe logo file (tribe logo2.png)",
    note: "Cropped from the original lockup. Not redrawn, recoloured or substituted.",
  },
  tribeLockup: {
    src: tribeLockup,
    alt: "Tribe logo lockup: the yellow app icon beside the black tribe wordmark.",
    status: "original",
    source: "Original Tribe logo file (tribe logo2.png)",
  },
  tribeWeb: {
    src: tribeWeb,
    alt: "Screenshot of the usetribeapp.com homepage showing the Tribe logo, the headline 'Your AI companion for money, work, and business' and a phone screen with a Tia conversation.",
    status: "capture",
    source: "https://usetribeapp.com/ captured 11 October 2026",
  },
  tribeAppDesign: {
    src: tribeAppDesign,
    alt: "Tribe mobile app interface design showing a vendor dashboard with total sales, orders, new customers, quick actions and recent orders.",
    status: "illustration",
    source: "Tribe app design files (Mobile UI/7.png)",
    note: "Product interface design. Not a screenshot of a live production build; sample figures shown are placeholders.",
  },
  bontehWeb: {
    src: bontehWeb,
    alt: "Screenshot of the Bonteh Magazine homepage showing the masthead, section navigation and the current lead story.",
    status: "capture",
    source: "https://www.bontehmagazine.com/ captured 11 October 2026",
  },
  eventBanner: {
    src: eventBanner,
    alt: "Emmanuel Cobbi standing beside a Tribe roll-up banner at a business exhibition.",
    status: "original",
    source: "Supplied event photograph",
  },
  eventTable: {
    src: eventTable,
    alt: "Emmanuel Cobbi talking with a visitor across a Tribe exhibitor table at an event.",
    status: "original",
    source: "Supplied event photograph",
  },
  eventTalkWide: {
    src: eventTalkWide,
    alt: "A crowd gathered around the Tribe exhibition stand during a demonstration.",
    status: "original",
    source: "Supplied event photograph",
  },
  eventPortrait: {
    src: eventPortrait,
    alt: "Emmanuel Cobbi standing in front of an event backdrop wearing an exhibitor badge.",
    status: "original",
    source: "Supplied event photograph",
  },
  eventAudience: {
    src: eventAudience,
    alt: "Emmanuel Cobbi speaking into a microphone to a seated audience at an event.",
    status: "original",
    source: "Supplied event photograph",
  },
  eventStand: {
    src: eventStand,
    alt: "Emmanuel Cobbi at the Tribe exhibition stand, showing branded bags and printed material on the table.",
    status: "original",
    source: "Supplied event photograph",
  },
} satisfies Record<string, Asset>;

export type AssetKey = keyof typeof assets;
