/**
 * Asset ledger. See docs/asset-manifest.md for sources, rights and the
 * missing-media list.
 *
 *   original     supplied file, cropped/resized only
 *   derived      a treatment applied to a supplied original
 *   capture      screenshot of a live, public page
 *   illustration product design artwork, never shown as a live screenshot
 */
import type { ImageMetadata } from "astro";

import bontehArticle from "../assets/bonteh-article.png";
import bontehArticleMobile from "../assets/bonteh-article-mobile.png";
import bontehLiveMobile from "../assets/bonteh-live-mobile.png";
import bontehWeb from "../assets/bonteh-web.jpg";
import bookMockup from "../assets/book-mockup.webp";
import ciaseWeb from "../assets/ciase-web.jpg";
import eventAudience from "../assets/event-audience.jpg";
import eventBanner from "../assets/event-banner.jpg";
import eventPortrait from "../assets/event-portrait.jpg";
import eventStand from "../assets/event-stand.jpg";
import eventTable from "../assets/event-table.jpg";
import eventTalkWide from "../assets/event-talk-wide.jpg";
import portraitAbout from "../assets/portrait-about.webp";
import portraitHero from "../assets/portrait-hero.webp";
import portraitOriginal from "../assets/portrait-original.jpg";
import tribeAffiliate from "../assets/tribe-affiliate.jpg";
import tribeAppDesign from "../assets/tribe-app-design.jpg";
import tribeEarnings from "../assets/tribe-earnings.jpg";
import tribeIcon from "../assets/tribe-icon.png";
import tribeLiveMobile from "../assets/tribe-live-mobile.png";
import tribeLockup from "../assets/tribe-lockup.png";
import tribeMarket from "../assets/tribe-market.jpg";
import tribeOrders from "../assets/tribe-orders.jpg";
import tribePersonal from "../assets/tribe-personal.jpg";
import tribeTia from "../assets/tribe-tia.jpg";
import tribeVendor from "../assets/tribe-vendor.jpg";
import tribeWallet from "../assets/tribe-wallet.jpg";
import tribeWeb from "../assets/tribe-web.jpg";

export type AssetStatus = "original" | "derived" | "capture" | "illustration";

export type Asset = {
  src: ImageMetadata;
  alt: string;
  status: AssetStatus;
  source: string;
};

export const assets = {
  tribeIcon: {
    src: tribeIcon,
    alt: "Tribe app icon: a yellow rounded tile with a black card mark and three white dots.",
    status: "original",
    source: "Original Tribe logo file",
  },
  tribeLockup: {
    src: tribeLockup,
    alt: "Tribe logo lockup: the yellow app icon beside the black tribe wordmark.",
    status: "original",
    source: "Original Tribe logo file",
  },
  portraitHero: {
    src: portraitHero,
    alt: "Emmanuel Cobbi in a black Tribe cap and a black shirt carrying the yellow Tribe mark.",
    status: "derived",
    source: "Supplied portrait, segmented and graded",
  },
  portraitAbout: {
    src: portraitAbout,
    alt: "Portrait of Emmanuel Cobbi wearing a black Tribe cap and graphic Tribe shirt.",
    status: "derived",
    source: "Supplied portrait, segmented and graded for the About section",
  },
  portraitOriginal: {
    src: portraitOriginal,
    alt: "Emmanuel Cobbi in a studio portrait wearing a black Tribe cap and graphic Tribe shirt.",
    status: "original",
    source: "Supplied professional portrait",
  },
  tribeWeb: {
    src: tribeWeb,
    alt: "The pre-rebrand Tribe product website: headline “Your AI companion for money, work, and business” beside a phone showing a Tia conversation.",
    status: "capture",
    source: "https://usetribeapp.com/ — 11 Nov 2026",
  },
  tribeLiveMobile: {
    src: tribeLiveMobile,
    alt: "The pre-rebrand mobile Tribe website with Tia messaging and the primary sign-up action.",
    status: "capture",
    source: "https://usetribeapp.com/ at 390px — 12 Nov 2026",
  },
  bontehWeb: {
    src: bontehWeb,
    alt: "The Bonteh Magazine homepage: masthead, section navigation and the lead story.",
    status: "capture",
    source: "https://www.bontehmagazine.com/ — 11 Nov 2026",
  },
  bontehLiveMobile: {
    src: bontehLiveMobile,
    alt: "The mobile Bonteh Magazine homepage showing the masthead and lead technology story.",
    status: "capture",
    source: "https://www.bontehmagazine.com/ at 390px — 12 Nov 2026",
  },
  bontehArticle: {
    src: bontehArticle,
    alt: "A Bonteh Magazine article page with a map illustration and the reading column.",
    status: "capture",
    source: "https://www.bontehmagazine.com/is-building-for-africa-becoming-a-trap/ — 12 Nov 2026",
  },
  bontehArticleMobile: {
    src: bontehArticleMobile,
    alt: "An Emmanuel Cobbi article on Bonteh Magazine as it appears at mobile width.",
    status: "capture",
    source: "https://www.bontehmagazine.com/is-building-for-africa-becoming-a-trap/ at 390px — 12 Nov 2026",
  },
  ciaseWeb: {
    src: ciaseWeb,
    alt: "The CIASE homepage: “Where Creativity, Languages, Innovation & Sustainability Connect” beside a sculptural film-strip image.",
    status: "capture",
    source: "https://ciase.se/ — 11 Nov 2026",
  },
  tribePersonal: {
    src: tribePersonal,
    alt: "Triber personal home screen showing a greeting, wallet balance and a message field for Tia.",
    status: "illustration",
    source: "Tribe app design files",
  },
  tribeVendor: {
    src: tribeVendor,
    alt: "Triber vendor dashboard with sales, orders, quick actions and recent orders.",
    status: "illustration",
    source: "Tribe app design files",
  },
  tribeAffiliate: {
    src: tribeAffiliate,
    alt: "Triber affiliate dashboard showing campaigns and recent earnings.",
    status: "illustration",
    source: "Tribe app design files",
  },
  tribeEarnings: {
    src: tribeEarnings,
    alt: "Triber earnings screen with a balance, earnings summary and recent transactions.",
    status: "illustration",
    source: "Tribe app design files",
  },
  tribeWallet: {
    src: tribeWallet,
    alt: "Triber wallet screen with a CFA balance, quick actions and recent activity.",
    status: "illustration",
    source: "Tribe app design files",
  },
  tribeMarket: {
    src: tribeMarket,
    alt: "Triber market screen with product categories, vendors and featured items.",
    status: "illustration",
    source: "Tribe app design files",
  },
  tribeOrders: {
    src: tribeOrders,
    alt: "Triber orders screen listing order numbers, statuses and totals.",
    status: "illustration",
    source: "Tribe app design files",
  },
  tribeTia: {
    src: tribeTia,
    alt: "Triber assistant screen with suggested prompts for Tia.",
    status: "illustration",
    source: "Tribe app design files",
  },
  tribeAppDesign: {
    src: tribeAppDesign,
    alt: "Triber vendor home screen showing business tools, sales and Tia guidance.",
    status: "illustration",
    source: "Tribe app design files",
  },
  bookMockup: {
    src: bookMockup,
    alt: "Tales the Gods Keep hardcover showing the title, subtitle and Emmanuel Cobbi's name.",
    status: "original",
    source: "Supplied book mockup",
  },
  eventBanner: {
    src: eventBanner,
    alt: "Emmanuel Cobbi beside a Tribe roll-up banner at a business exhibition.",
    status: "original",
    source: "Supplied event photograph",
  },
  eventTable: {
    src: eventTable,
    alt: "Emmanuel Cobbi talking with a visitor at the Tribe exhibitor table.",
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
    alt: "Emmanuel Cobbi in front of an event backdrop wearing an exhibitor badge.",
    status: "original",
    source: "Supplied event photograph",
  },
  eventAudience: {
    src: eventAudience,
    alt: "Emmanuel Cobbi speaking into a microphone to a seated audience.",
    status: "original",
    source: "Supplied event photograph",
  },
  eventStand: {
    src: eventStand,
    alt: "Emmanuel Cobbi at the Tribe stand with branded bags and printed material.",
    status: "original",
    source: "Supplied event photograph",
  },
} satisfies Record<string, Asset>;

export type AssetKey = keyof typeof assets;
