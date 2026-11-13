/**
 * Single source of truth for the portfolio.
 *
 * Profile facts come from Emmanuel's supplied brief and public pages checked
 * in November 2026. Social destinations below are verified profiles rather
 * than guessed handles.
 */

export const profile = {
  name: "Emmanuel Cobbi",
  legalName: "Fomben Emmanuel Cobbi",
  initials: "EC",
  role: "Full-stack developer · Product designer · Writer and author",
  identity:
    "I work across product, engineering and words, turning complicated ideas into useful things.",
  location: "Cameroon",
  discipline: "Product · Code · Words",
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
  whatsappCall:
    "https://wa.me/237672754178?text=" +
    encodeURIComponent(
      "Hello Emmanuel — I'd like to book a call about a project.",
    ),
} as const;

/** Verified destinations. */
export const links = {
  tribe: "https://usetriber.com/",
  bonteh: "https://www.bontehmagazine.com/",
  ciase: "https://ciase.se/",
  github: "https://github.com/FC-19",
  facebook: "https://www.facebook.com/emmanuel.cobbi",
  twitter: "https://x.com/EmmanuelCobbi",
  instagram: "https://www.instagram.com/kingcobbi/",
  linkedin: "https://cm.linkedin.com/in/emmanuel-cobbi-479b8718a",
  whatsappChannel: "https://whatsapp.com/channel/0029Vaky8VeK0IBrEyVKaA2I",
  medium: "https://medium.com/@cobbiemmanuel",
  book: "https://selar.com/w916op9966",
  course: "https://selar.com/4434yzm941",
  selar: "https://selar.com/m/KingCobbi",
} as const;

export const socials = [
  { label: "Facebook", short: "FB", href: links.facebook, handle: "Emmanuel Cobbi" },
  { label: "X / Twitter", short: "X", href: links.twitter, handle: "@EmmanuelCobbi" },
  { label: "Instagram", short: "IG", href: links.instagram, handle: "@kingcobbi" },
  { label: "LinkedIn", short: "IN", href: links.linkedin, handle: "Emmanuel Cobbi" },
  {
    label: "WhatsApp channel",
    short: "WA",
    href: links.whatsappChannel,
    handle: "Follow the channel",
  },
  { label: "Medium", short: "MD", href: links.medium, handle: "@cobbiemmanuel" },
  { label: "GitHub", short: "GH", href: links.github, handle: "FC-19" },
] as const;

export const hero = {
  eyebrow: "Full-stack developer · Product designer · Writer and author",
  titleLines: ["I build useful products.", "And write about", "what moves us."],
  lede:
    "From the first idea to the final interaction, I turn complex problems into intuitive products, thoughtful systems and stories people carry with them.",
  primary: { label: "Explore my work", href: "#work" },
  secondary: { label: "Let's talk", href: contact.whatsappCall },
  status: "Currently building Triber",
  marquee: [
    "Product design",
    "Software engineering",
    "AI & automation",
    "Editorial",
    "Strategy",
  ],
} as const;

export type Article = {
  title: string;
  href: string;
  publication: string;
  date: string;
  category: string;
  summary: string;
};

export const articles: Article[] = [
  {
    title: "Are Universities Training Software Engineers for a Future That No Longer Exists?",
    href: "https://www.bontehmagazine.com/are-universities-training-software-engineers-for-a-future-that-no-longer-exists/",
    publication: "Bonteh Magazine",
    date: "26 October 2026",
    category: "Technology",
    summary:
      "What changes when the tools students train on are no longer the tools defining the work?",
  },
  {
    title: "Cameroon’s Future of Work: AI Meets a Young Workforce",
    href: "https://www.bontehmagazine.com/cameroons-future-of-work-ai-meets-a-young-workforce/",
    publication: "Bonteh Magazine",
    date: "3 October 2026",
    category: "Africa",
    summary:
      "The opportunity is not simply more AI. It is building the trust, access and mentorship around it.",
  },
  {
    title: "Is “Building for Africa” Becoming a Trap?",
    href: "https://www.bontehmagazine.com/is-building-for-africa-becoming-a-trap/",
    publication: "Bonteh Magazine",
    date: "26 September 2026",
    category: "Africa",
    summary:
      "A market can desperately need a product and still lack the purchasing power to sustain its business.",
  },
  {
    title: "Waspito Is Winning Abroad. But Do Cameroonians Know What It Can Do?",
    href: "https://www.bontehmagazine.com/waspito-is-winning-abroad-but-do-cameroonians-know-what-it-can-do/",
    publication: "Bonteh Magazine",
    date: "25 September 2026",
    category: "Technology",
    summary:
      "A major international win is only one part of the work. Distribution and local relevance are the other.",
  },
  {
    title: "Why African Businesses Stay Informal and What It Costs Them",
    href: "https://www.bontehmagazine.com/why-african-businesses-stay-informal-and-what-it-costs-them/",
    publication: "Bonteh Magazine",
    date: "3 September 2026",
    category: "Business",
    summary:
      "The price of staying informal is paid quietly in trust, credit and room to grow.",
  },
  {
    title: "Africa’s Biggest Tech Problem May Not Be Innovation, but Distribution",
    href: "https://www.bontehmagazine.com/africas-biggest-tech-problem-may-not-be-innovation-but-distribution/",
    publication: "Bonteh Magazine",
    date: "27 August 2026",
    category: "Technology",
    summary:
      "Building useful technology is only half the battle. The harder question is whether it can reach people.",
  },
];

export type SocialPost = {
  title: string;
  excerpt: string;
  date: string;
  href: string;
};

export const socialPosts: SocialPost[] = [
  {
    title: "The skill didn’t lose its value. It lost its scarcity.",
    excerpt:
      "A designer’s reflection on distribution, leverage and why being good is no longer enough without a personal brand and a market that can find you.",
    date: "Facebook · recent",
    href: links.facebook,
  },
  {
    title: "Close your mouth when you’re eating.",
    excerpt:
      "On moving quietly while you build, knowing when the meal is done, and the difference between strategic silence and fear wearing strategy’s clothing.",
    date: "Facebook · recent",
    href: links.facebook,
  },
  {
    title: "The man in the mirror knows everything.",
    excerpt:
      "Nobody fails suddenly. Environment, proximity and repeated decisions compound quietly until they become the life in front of you.",
    date: "Facebook · recent",
    href: links.facebook,
  },
];

export const journalSlides = [
  { image: "eventPortrait", alt: "Emmanuel in front of a Triber event backdrop.", caption: "Field notes", position: "center 30%" },
  { image: "eventStand", alt: "Emmanuel at the Triber stand with branded bags.", caption: "Building the brand", position: "70% 28%" },
  { image: "eventAudience", alt: "Emmanuel speaking to a seated audience.", caption: "Teaching", position: "22% 24%" },
  { image: "eventTalkWide", alt: "A crowd gathered around the Triber stand.", caption: "Live demos", position: "16% 24%" },
  { image: "eventBanner", alt: "Emmanuel beside a Triber banner at a business exhibition.", caption: "On the ground", position: "18% 20%" },
  { image: "eventTable", alt: "Emmanuel speaking with a visitor at the Triber table.", caption: "Product conversations", position: "12% 22%" },
] as const;

export type WorkItem = {
  name: string;
  role: string;
  summary: string;
  href?: string;
  hrefLabel?: string;
  caseStudy?: string;
  assetKey?: "tribeWeb" | "bontehWeb" | "ciaseWeb";
  categories: string[];
  archived?: boolean;
};

export const work: WorkItem[] = [
  {
    name: "Triber",
    role: "Founder · Product · Software",
    summary:
      "An AI-powered layer for money, work and business. Tia connects the daily tools people use on WhatsApp and the web.",
    href: links.tribe,
    hrefLabel: "usetriber.com",
    caseStudy: "/work/triber",
    assetKey: "tribeWeb",
    categories: ["Product", "Websites"],
  },
  {
    name: "Bonteh Magazine",
    role: "CTO · Software Developer · Writer",
    summary:
      "A business and policy publication with a considered digital platform and writing about technology, money and power.",
    href: links.bonteh,
    hrefLabel: "Read Bonteh",
    caseStudy: "/work/bonteh-magazine",
    assetKey: "bontehWeb",
    categories: ["Writing", "Websites"],
  },
  {
    name: "CIASE",
    role: "Website · Digital",
    summary:
      "The digital home for a Stockholm cultural practice spanning film, art, tourism and sustainability.",
    href: links.ciase,
    hrefLabel: "Visit CIASE",
    assetKey: "ciaseWeb",
    categories: ["Websites"],
  },
];

export const archive = [
  {
    name: "Hope for All Cultures",
    note: "Non-profit developmental organization.",
  },
  {
    name: "InsideAfrika.store",
    note: "Visual identity and digital marketing work for a Germany-based African commerce platform.",
  },
  {
    name: "BOQER Technologies",
    note: "Website builds, redesigns, CMS work and digital campaigns from 2020 onward.",
  },
] as const;

export const teaching = {
  eyebrow: "Teaching",
  title: "AI Automation Blueprint",
  body:
    "A practical course on using AI across design, video, websites, apps and automation without losing the judgment that makes the work good.",
  note:
    "Trained more than 2,000 people in digital skills and helped close to 100 businesses build design systems and brands over the last five years.",
  cta: { label: "Explore the course", href: links.course },
} as const;

export const about = {
  eyebrow: "About",
  title: ["Make it clear.", "Make it work.", "Make it feel right."],
  disciplines: [
    "Product designer",
    "Full-stack developer",
    "Product thinking",
    "AI automation",
    "Writing",
    "Brand storytelling",
  ],
  paragraphs: [
    "I'm Emmanuel Cobbi, a Cameroonian software developer, designer and author. My work runs across code, interface and words — different crafts, one question: how does a good idea become something people can actually use?",
    "Today I'm building Triber, an AI-powered platform for business tools, commerce and payments. I also work as CTO, software developer and writer at Bonteh Magazine, where I help carry the publication's digital platform and write about the forces shaping business and technology.",
    "I am also an author. I wrote Tales the Gods Keep, a novel about power, hierarchy and the ladders people climb.",
  ],
  facts: [
    { label: "Experience", value: "10+ years making" },
    { label: "Focus", value: "Product · Systems · Stories" },
    { label: "Currently", value: "Founder at Triber" },
  ],
} as const;

export type ExperienceItem = {
  role: string;
  org: string;
  dates?: string;
  note: string;
  current?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    role: "Founder & Software Developer",
    org: "Triber",
    dates: "Present",
    note:
      "Leading product direction, interface design and implementation for an AI-powered platform connecting business tools, commerce and payments.",
    current: true,
  },
  {
    role: "CTO, Software Developer & Writer",
    org: "Bonteh Magazine",
    dates: "Present",
    note:
      "Working across the publication's digital platform and writing reported pieces and essays on business, technology and policy.",
    current: true,
  },
  {
    role: "Remote Software Developer & Digital Work",
    org: "CIASE — Stockholm, Sweden",
    note:
      "Remote software and digital work for a contemporary arts and sustainability practice spanning film, culture and education.",
  },
  {
    role: "Website & digital work",
    org: "Hope for All Cultures",
    note:
      "A non-profit developmental organization platform.",
  },
  {
    role: "Graphic Designer & Content Creator",
    org: "InsideAfrika.store — remote, Germany",
    dates: "2022",
    note:
      "Digital marketing visuals and social content strategy, working alongside the product team to keep pages consistent.",
  },
  {
    role: "Freelance Full-Stack Developer & Digital Marketer",
    org: "BOQER Technologies — Bamenda",
    dates: "2020",
    note:
      "Website builds and redesigns, CMS work, SEO, paid campaigns, graphic design and AI-assisted marketing.",
  },
  {
    role: "Graphic Designer",
    org: "Luster Graphics — Bamenda",
    dates: "2016–2020",
    note:
      "Print and communication design, product mockups and client relationships, worked alongside full-time study.",
  },
  {
    role: "Field Sales Representative",
    org: "MTN — Bafoussam / Bamenda",
    dates: "2015",
    note:
      "Field sales, SIM registration, mobile-money account support, customer assistance and reporting.",
  },
];

export const education = [
  {
    qualification: "Bachelor's degree",
    org: "Catholic University of Cameroon, Bamenda",
    dates: "2016–2019",
  },
] as const;

export type Capability = {
  title: string;
  body: string;
  gets: readonly string[];
};

export const capabilities: Capability[] = [
  {
    title: "Understand",
    body:
      "Start with the real constraint, the person using it and the outcome that matters.",
    gets: ["Product direction", "User flows", "Clear priorities"],
  },
  {
    title: "Build",
    body:
      "Design the system and implement it as one coherent, responsive product.",
    gets: ["Interface design", "Design systems", "Full-stack build"],
  },
  {
    title: "Ship",
    body:
      "Launch, listen and refine until the product earns its place in everyday use.",
    gets: ["Working release", "Better content", "Measured iteration"],
  },
] as const;

export const tribe = {
  eyebrow: "Currently building",
  title: "Currently building Triber.",
  supporting: "An AI companion for money, work and business.",
  role: "Founder · Product design · Software development",
  site: "usetriber.com",
  description:
    "Triber brings business tools, everyday money and commerce into one connected experience. Tia, its AI assistant, meets people in the web app and on WhatsApp.",
  vision:
    "The ambition is a calmer operating layer for modern work: one place to understand what needs attention, move money, run a business and keep the moving pieces connected.",
  values: [
    {
      title: "One connected place",
      body:
        "Products, customers, orders, invoices and payments are visible together instead of scattered across separate tools.",
    },
    {
      title: "Conversation as interface",
      body:
        "Tia lets people ask for the next step in plain language, then helps them carry it through.",
    },
    {
      title: "Built for real commerce",
      body:
        "Payment links, mobile money, escrow-protected orders and affiliate commissions sit close to the work.",
    },
  ],
  cta: { label: "Ask about Triber", href: contact.whatsappCall },
  ctaSecondary: { label: "usetriber.com", href: "#contact" },
} as const;

export const bonteh = {
  eyebrow: "Technology & editorial",
  title: "Bonteh Magazine",
  description:
    "The publication you read before making important business and policy decisions.",
  role: "CTO · Software Developer · Writer",
  values: [
    {
      title: "Publishing with intent",
      body:
        "A digital home for reporting on business, policy, politics and technology across Cameroon, Africa and the wider world.",
    },
    {
      title: "Technology with editorial judgment",
      body:
        "The platform is shaped around the reading experience, not added technology for its own sake.",
    },
    {
      title: "Writing from the system",
      body:
        "Essays connect technology and money back to the institutions and everyday decisions they affect.",
    },
  ],
} as const;

export const book = {
  eyebrow: "Author",
  title: "Tales the Gods Keep",
  name: "Tales the Gods Keep",
  subtitle:
    "A Coming-of-Age Journey into Forbidden Realities of Money, Systems, and Power",
  description:
    "A novel about power, hierarchy and the ladders people climb — a coming-of-age story set against the realities of money, systems and who gets to decide.",
  cta: { label: "Buy the Book", href: links.book },
  note: "Hard copy and digital editions available.",
} as const;

export const contactSection = {
  eyebrow: "Start a conversation",
  title: ["Say hi without", "leaving the page."],
  body:
    "A product, a website, a piece of writing or an AI workflow — tell me what you're trying to make clearer. I answer directly.",
  primary: { label: "Message me on WhatsApp", href: contact.whatsappCall },
  secondary: { label: "Send an email", href: `mailto:${contact.email}` },
} as const;

export const nav = [
  { label: "Home", href: "#top" },
  { label: "Works", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
] as const;

export const seo = {
  siteUrl: "https://www.emmanuelcobbi.xyz",
  defaultTitle: "Emmanuel Cobbi — Software Developer, Designer & Author",
  description:
    "Emmanuel Cobbi builds useful products people actually use. Software developer, designer and author, founder of Triber and CTO at Bonteh Magazine.",
  ogImage: "/og-image.png",
  indexable: true,
} as const;
