/**
 * The site's single source of truth for editorial content.
 *
 * Facts here come from: Emmanuel's brief, the supplied CV, the supplied assets,
 * and pages verified on 11 October 2026 (usetribeapp.com, bontehmagazine.com and
 * the three linked articles). Nothing is inferred beyond what those sources
 * support; unverified items are marked in `docs/asset-manifest.md` instead of
 * being published.
 */

export const profile = {
  /** Public name, used everywhere the site speaks as him. */
  name: "Emmanuel Cobbi",
  /** Full name as it appears on the CV. Not used for site branding. */
  legalName: "Fomben Emmanuel Cobbi",
  role: "Software Developer, Author & Founder of Tribe",
  identity: "Software developer, designer, and author.",
  origin: "Cameroonian",
  /** Deliberately not a street address or an assumed current city. */
  location: "Cameroon",
  focus: "AI, finance, and commerce",
} as const;

export const contact = {
  email: "cobbiemmanuel@gmail.com",
  phoneDisplay: "+237 672 754 178",
  whatsapp: "https://wa.me/237672754178",
  whatsappBook:
    "https://wa.me/237672754178?text=" +
    encodeURIComponent(
      "Hello Emmanuel — I found your site and I'd like to ask about Tales the Gods Keep.",
    ),
  whatsappCourse:
    "https://wa.me/237672754178?text=" +
    encodeURIComponent(
      "Hello Emmanuel — I'd like to ask about the AI Automation Blueprint course.",
    ),
} as const;

/**
 * Only destinations confirmed on 11 October 2026 appear here.
 * Tribe's official site currently publishes no Facebook, X or Instagram link,
 * so none is rendered. Emmanuel's personal handles are unconfirmed and omitted.
 */
export const links = {
  tribe: "https://usetribeapp.com/",
  bonteh: "https://www.bontehmagazine.com/",
  insideAfrika: "https://insideafrika.store/",
} as const;

export const hero = {
  eyebrow: profile.name,
  titleLines: ["I build useful things.", "And write about what moves us."],
  lede: "Software developer, designer, and author. Currently building Tribe at the intersection of AI, finance, and commerce.",
  primary: { label: "Explore my work", href: "#work" },
  secondary: { label: "Let's talk", href: "#contact" },
  status: "Currently building Tribe.",
} as const;

export const about = {
  eyebrow: "About",
  title: "I work where technology, creativity, and human behaviour meet.",
  paragraphs: [
    "My experience runs across software development, visual design, marketing, and writing. Different disciplines, one recurring question: how does a good idea become something people can actually use?",
    "Today I am building Tribe as founder and software developer, and working as CTO, software developer, and writer at Bonteh Magazine. I also write fiction and essays about business, technology, wealth, responsibility, and the systems shaping everyday life.",
    "I am Cameroonian, and I build for people whose everyday reality is closer to mine than to the assumptions most products are written for. That shows up in how I design: start from the constraint, then make the thing feel effortless.",
  ],
  facts: [
    { label: "Based", value: "Cameroon" },
    { label: "Building", value: "Tribe — AI, commerce and business tools" },
    { label: "Working", value: "Bonteh Magazine — CTO, software developer and writer" },
    { label: "Also", value: "Fiction, essays and teaching" },
  ],
  disciplines: ["Software", "Product", "Design", "Writing", "AI & automation"],
} as const;

export const tribe = {
  eyebrow: "Currently building",
  title: "Currently building Tribe.",
  supporting: "Helping people run business with less friction.",
  description:
    "Tribe is an AI-powered platform bringing business tools, commerce, and payments into one connected experience, with Tia, an AI assistant, available through the web and WhatsApp.",
  vision:
    "The longer direction is an AI layer across finance and commerce: making everyday transactions and business operations easier to manage.",
  role: "Founder / software developer",
  values: [
    {
      title: "Business tools, connected",
      body: "Products and services, inventory, orders, payment links, invoices, receipts, and customer follow-ups sit in one place instead of five.",
    },
    {
      title: "An assistant that acts",
      body: "Tia works through conversation: ask what needs attention, draft an invoice or a customer message, and follow the task through from chat.",
    },
    {
      title: "Commerce and money alongside",
      body: "Payments, escrow-protected marketplace orders, and opt-in affiliate commissions live next to the rest of the business rather than in a separate app.",
    },
  ],
  cta: { label: "Visit Tribe", href: links.tribe },
  ctaSecondary: { label: "Inside the project", href: "/work/tribe" },
} as const;

export type WorkItem = {
  name: string;
  role: string;
  period?: string;
  summary: string;
  href?: string;
  hrefLabel?: string;
  caseStudy?: string;
  assetKey?: "bontehWeb" | "tribeWeb";
  archived?: boolean;
};

export const work: WorkItem[] = [
  {
    name: "Bonteh Magazine",
    role: "CTO, Software Developer & Writer",
    summary:
      "I work across the technology and editorial sides of Bonteh Magazine, contributing to its digital platform and writing about the forces shaping business, technology, and society.",
    href: links.bonteh,
    hrefLabel: "Visit the publication",
    caseStudy: "/work/bonteh-magazine",
    assetKey: "bontehWeb",
  },
  {
    name: "Tribe",
    role: "Founder / Software Developer",
    summary:
      "An AI-powered platform for business tools, commerce, and payments, with Tia available on WhatsApp and the web. Tribe is the project I am building now.",
    href: links.tribe,
    hrefLabel: "Visit Tribe",
    caseStudy: "/work/tribe",
    assetKey: "tribeWeb",
  },
  {
    name: "AI Automation Blueprint",
    role: "Creator and instructor",
    summary:
      "A course on putting AI to practical use in design, video, websites, apps, and automation — built for people who want to turn an idea into working output.",
  },
];

export const archive: { name: string; note: string }[] = [
  {
    name: "InsideAfrika.store",
    note: "Remote graphic design and content creation for a Germany-based store; started 2022.",
  },
  {
    name: "BOQER Technologies — Affiliate Lifestyle",
    note: "Client website development and digital campaigns. The original site is no longer online.",
  },
  {
    name: "BOQER Technologies — PDV Leadex",
    note: "Client website development and digital campaigns. The original site is no longer online.",
  },
  {
    name: "hopeforallcultures.org",
    note: "Past client website work. Domain no longer resolves; scope unconfirmed, so no link is offered.",
  },
  {
    name: "ciase.se",
    note: "Past client website work. Domain no longer resolves; scope unconfirmed, so no link is offered.",
  },
];

export type Article = {
  title: string;
  url: string;
  published: string;
  publishedDisplay: string;
  publication: string;
  summary: string;
};

export const articles: Article[] = [
  {
    title: "Is “Building for Africa” Becoming a Trap?",
    url: "https://www.bontehmagazine.com/is-building-for-africa-becoming-a-trap/",
    published: "2026-09-26",
    publishedDisplay: "26 September 2026",
    publication: "Bonteh Magazine",
    summary: "On local problems, purchasing power, and building a business that can survive.",
  },
  {
    title:
      "Waspito Is Winning Abroad. But Do Cameroonians Know What It Can Do?",
    url: "https://www.bontehmagazine.com/waspito-is-winning-abroad-but-do-cameroonians-know-what-it-can-do/",
    published: "2026-09-25",
    publishedDisplay: "25 September 2026",
    publication: "Bonteh Magazine",
    summary:
      "A look at the gap between a product's achievements and its visibility at home.",
  },
  {
    title:
      "Africa’s Biggest Tech Problem May Not Be Innovation, but Distribution",
    url: "https://www.bontehmagazine.com/africas-biggest-tech-problem-may-not-be-innovation-but-distribution/",
    published: "2026-08-27",
    publishedDisplay: "27 August 2026",
    publication: "Bonteh Magazine",
    summary: "Why building the product is only part of the challenge.",
  },
];

export const book = {
  eyebrow: "Author",
  title: "Some ideas become products.\nOthers become stories.",
  name: "Tales the Gods Keep",
  subtitle: "A Coming-of-Age Journey into Forbidden Realities of Money, Systems, and Power",
  description:
    "A novel about power, hierarchy, and the ladders people climb — a coming-of-age story set against the realities of money, systems, and who gets to decide.",
  cta: { label: "Ask about the book", href: contact.whatsappBook },
  note: "No purchase link is published yet. Ask directly and I will point you to the right place.",
} as const;

export const teaching = {
  eyebrow: "Teaching",
  title: "I also teach people how to turn ideas into practical work with AI.",
  body: "The AI Automation Blueprint covers practical AI use in design, video, websites, apps, and automation. It is built for people who want to ship something rather than collect tools.",
  cta: { label: "Ask about the course", href: contact.whatsappCourse },
} as const;

export type ExperienceItem = {
  role: string;
  org: string;
  dates?: string;
  note: string;
  current?: boolean;
};

/** Dates are preserved exactly as the CV states them. */
export const experience: ExperienceItem[] = [
  {
    role: "Founder / Software Developer",
    org: "Tribe",
    note: "Building an AI-powered platform for business tools, commerce, and payments, with Tia on WhatsApp and the web.",
    current: true,
  },
  {
    role: "CTO, Software Developer & Writer",
    org: "Bonteh Magazine",
    note: "Working across the publication's digital platform and its editorial output on business, technology, and policy.",
    current: true,
  },
  {
    role: "Graphic Designer & Content Creator",
    org: "InsideAfrika.store, Germany — remote",
    dates: "Started 2022",
    note: "Digital marketing visuals and social content strategy, working with the development team to keep product pages visually consistent.",
  },
  {
    role: "Freelance Developer & Digital Marketer",
    org: "BOQER Technologies, Bamenda",
    dates: "Started 2020",
    note: "Website builds and redesigns, CMS work, SEO and paid campaigns, graphic design, tutoring, and AI-assisted marketing for client projects.",
  },
  {
    role: "Graphic Designer",
    org: "Luster Graphics, Bamenda",
    dates: "Jul 2016 – Oct 2020",
    note: "Print and marketing design — brochures, banners, signage — plus product mockups and day-to-day client relationships, worked alongside full-time study.",
  },
  {
    role: "Field Sales Representative",
    org: "MTN, Bafoussam",
    dates: "Jul 2015 – Sep 2015",
    note: "Field sales, SIM registration, mobile money account support, customer assistance, and reporting.",
  },
];

export const education = [
  {
    qualification: "Bachelor's degree, Computer Science",
    org: "Catholic University of Cameroon, Bamenda",
    dates: "Oct 2016 – Aug 2020",
  },
];

export const capabilities = [
  {
    title: "Software & web",
    body: "HTML, CSS, JavaScript, responsive design, WordPress and CMS platforms, UX, Android development.",
  },
  {
    title: "Design",
    body: "Product and interface design, brand and marketing visuals, Adobe Creative Suite, mockups and print.",
  },
  {
    title: "Marketing & business",
    body: "SEO, paid campaigns, content and social strategy, email marketing, research, sales, client relationships.",
  },
  {
    title: "Writing & media",
    body: "Essays, journalism, copywriting, content creation, and video production.",
  },
  {
    title: "AI & automation",
    body: "Practical AI tooling, AI-assisted workflows, and automation applied to real design and marketing work.",
  },
] as const;

export const contactSection = {
  eyebrow: "Contact",
  title: "Have something worth building?",
  body: "A product, a story, or a useful problem. Let's talk.",
  primary: { label: "Start a conversation", href: contact.whatsapp },
  secondary: { label: "Email me", href: `mailto:${contact.email}` },
} as const;

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Tribe", href: "/#tribe" },
  { label: "Work", href: "/#work" },
  { label: "Writing", href: "/#writing" },
  { label: "Contact", href: "/#contact" },
] as const;

export const seo = {
  /** The live public origin. Kept in one place so it is easy to change. */
  siteUrl: "https://emmanuelcobbi.xyz",
  titleTemplate: "%s — Emmanuel Cobbi",
  defaultTitle: "Emmanuel Cobbi — Software Developer, Author & Founder of Tribe",
  description:
    "Explore Emmanuel Cobbi's work in software, design, writing, and AI, including Tribe, Bonteh Magazine, and Tales the Gods Keep.",
  ogImage: "/og-image.png",
  /** Public site: pages may be indexed and a sitemap is emitted. */
  indexable: true,
} as const;

export const stack = {
  framework: "Astro",
  styling: "Hand-written CSS with custom properties",
  typeface: "Geist (SIL Open Font License 1.1), self-hosted",
} as const;
