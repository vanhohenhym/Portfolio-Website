import {
  AboutSplitBlockData,
  ContactFooterBlockData,
  HeroBentoBlockData,
  PageDefinition,
  PortfolioGridBlockData,
  ServicesMatrixBlockData,
} from "@/types/cms";
import { assetPath, siteConfig } from "./siteConfig";

const heroBlock: HeroBentoBlockData = {
  id: "hero",
  type: "HeroBentoBlock",
  microLabel: "Web Architect & Digital Growth Partner",
  headline: "Build brands that scale & convert",
  subheadline:
    "From high-converting Figma UI/UX and custom WordPress, Elementor & Next.js builds to data-driven SEO and social media management.",
  ctaLabel: "Start a project",
  ctaHref: "/contact",
  watermarkText: "SHAHRIAR",
  statCards: [
    {
      metric: "100%",
      title: "Custom Design & Build",
      footerCopy:
        "Pixel-perfect execution across Figma, WordPress, Elementor, and Next.js.",
      variant: "cream",
    },
    {
      metric: "95%+",
      title: "Client Retention",
      footerCopy:
        "Building long-term partnerships with returning clients through consistent ROI.",
      variant: "glass",
    },
  ],
  socialProofText: "Trusted Long-Term Partner for Returning Clients",
  profileCard: {
    availabilityText: "Available for retainers & new builds",
    portraitUrl: assetPath("/images/shahriar-portrait.webp"),
    initials: "SN",
    email: siteConfig.contact.email,
    fullName: siteConfig.brand.fullName,
    role: siteConfig.brand.role,
    bioSnippet:
      "Finance & Banking (7th Sem, Jahangirnagar University) • CMA Candidate. Combining business acumen with Figma, WordPress, Elementor & Next.js mastery.",
    ctaLabel: "Get Started",
    ctaHref: siteConfig.contact.whatsappHref,
  },
};

const aboutBlock: AboutSplitBlockData = {
  id: "about",
  type: "AboutSplitBlock",
  badgeLabel: "About me",
  watermarkLabel: "Shahriar",
  headlinePrimary: "I build digital ecosystems",
  headlineMuted: "that grow and stand out",
  portraitUrl: assetPath("/images/shahriar-portrait.webp"),
  portraitBadge:
    "Jahangirnagar University (Finance & Banking) • CMA Candidate",
  leadParagraph:
    "I bring together UI/UX precision in Figma, custom web engineering in WordPress, Elementor, and Next.js, and strategic marketing. Every decision is focused on growth, clarity, and long-term client impact.",
  secondaryCopy:
    "Focused on real business results, not just visuals — turning first-time builds into multi-year retainers with my existing clients.",
  partnerPillLabel: "Long-Term Partners",
  stackCard: {
    metric: "Full-Stack",
    subtitle: "Design, Code & Growth Stack",
    description: "Tools & platforms I use to scale client brands:",
    skills: [
      "Figma UI/UX",
      "WordPress",
      "Elementor Pro",
      "Next.js / React",
      "Technical SEO",
      "Social & Retainers",
    ],
    ctaLabel: "Work With Me",
    ctaHref: "/contact",
  },
  retainerCard: {
    metric: "Retainer",
    title: "Trusted by Returning Clients",
    subtitle:
      "From initial Figma prototype and full web build to ongoing monthly SEO and social media management.",
    visualUrl: assetPath("/images/shahriar-portrait.webp"),
  },
};

const servicesBlock: ServicesMatrixBlockData = {
  id: "services",
  type: "ServicesMatrixBlock",
  badgeLabel: "Services",
  headlineMuted: "How I build",
  headlinePrimary: "high-performing brands",
  microQuote: '"You don\'t need everything — just what works and converts."',
  bottomSummary:
    "I don't offer a rigid one-size-fits-all package — I combine Figma design, custom WordPress/Next.js development, SEO, and ongoing care to solve your specific business goals.",
  bottomCtaLabel: "View my work",
  bottomCtaHref: "/work",
  services: [
    {
      title: "Figma UI/UX & Web Design",
      description:
        "Designing high-converting wireframes, design systems, and interactive Figma prototypes that feel right and stand out.",
      variant: "cream",
      href: "/contact",
      tag: "Design System",
    },
    {
      title: "WordPress, Elementor & Next.js",
      description:
        "Full custom web-building using Elementor containers, custom code, Headless WordPress, and Next.js for blazing speed.",
      variant: "orange",
      href: "/contact",
      tag: "Engineering",
    },
    {
      title: "SEO & Search Visibility",
      description:
        "Technical, on-page, and content SEO strategies that help your website rank higher and capture organic leads.",
      variant: "cream",
      href: "/contact",
      tag: "Organic Growth",
    },
    {
      title: "Social Media Management",
      description:
        "Platform-tailored ad creatives, content calendars, and active social management that capture attention and drive sales.",
      variant: "cream",
      href: "/contact",
      tag: "Brand Voice",
    },
    {
      title: "Client Retainers & Care",
      description:
        "Long-term monthly partnerships covering continuous site updates, conversion optimization, and dedicated growth support.",
      variant: "orange",
      href: "/contact",
      tag: "Partnership",
    },
  ],
};

const portfolioBlock: PortfolioGridBlockData = {
  id: "work",
  type: "PortfolioGridBlock",
  badgeLabel: "Recent Work",
  headlinePrimary: "Live client websites",
  headlineMuted: "built to convert & scale",
  subtext:
    "Explore recent e-commerce storefronts, service lead-generation platforms, and brand ecosystems crafted for real clients.",
  items: [
    {
      id: "city-computer-nabinagar",
      title: "City Computer Nabinagar",
      category: "E-Commerce • Tech Retail",
      metric: "citycomputernabinagar.com",
      summary:
        "Fast-browsing computer & IT storefront featuring live Today's Prices, instant product search, category cards, and cart checkout for Savar's tech retail hub.",
      tags: ["E-Commerce UI", "Catalog & Cart", "Local SEO"],
      variant: "cream",
      href: "https://citycomputernabinagar.com/",
      imageUrl: assetPath("/images/work/citycomputernabinagar.webp"),
      external: true,
    },
    {
      id: "hifi-pest-control",
      title: "HIFI Pest Control Australia",
      category: "Service Lead-Gen • Greater Sydney",
      metric: "hifipestcontrol.com.au",
      summary:
        "High-trust Australian service platform built around a frictionless hero quote request form, same-day inspection CTAs, and residential/commercial service funnels.",
      tags: ["Conversion UX", "WordPress / Elementor", "Lead Capture"],
      variant: "orange",
      href: "https://hifipestcontrol.com.au/",
      imageUrl: assetPath("/images/work/hifipestcontrol.webp"),
      external: true,
    },
    {
      id: "alphagearx-bd",
      title: "AlphaGearX BD",
      category: "Brand Storefront • Fitness & Gear",
      metric: "alphagearxbd.com",
      summary:
        "Bold dark-theme athletic & fitness gear e-commerce experience with custom hero art direction, wishlist, shopping bag, and streamlined account onboarding.",
      tags: ["Brand Identity", "Storefront Build", "Mobile Commerce"],
      variant: "dark",
      href: "https://alphagearxbd.com/",
      imageUrl: assetPath("/images/work/alphagearxbd.webp"),
      external: true,
    },
  ],
};

const contactBlock: ContactFooterBlockData = {
  id: "contact",
  type: "ContactFooterBlock",
  badgeLabel: "Contact & Retainers",
  headline: "Let's build a long-term partnership",
  subtext:
    "Available for Figma UI/UX, WordPress & Elementor builds, Next.js apps, SEO, and monthly retainers.",
  primaryEmail: siteConfig.contact.email,
  phoneDisplay: siteConfig.contact.phoneDisplay,
  phoneHref: siteConfig.contact.phoneHref,
  whatsappHref: siteConfig.contact.whatsappHref,
  telegramHref: siteConfig.contact.telegramHref,
  facebookLabel: siteConfig.contact.facebookLabel,
  facebookHref: siteConfig.contact.facebookHref,
  credentialsLine: `${siteConfig.brand.fullName} • ${siteConfig.brand.credentials}.`,
};

export const pagesData: Record<string, PageDefinition> = {
  home: {
    slug: "home",
    title: `${siteConfig.brand.fullName} — Web Architect & Digital Growth Partner`,
    description:
      "Portfolio & digital agency of Md. Shahriar Rahman Nadim. Figma UI/UX, WordPress, Elementor, Next.js, Technical SEO & Client Retainers.",
    blocks: [
      heroBlock,
      aboutBlock,
      servicesBlock,
      portfolioBlock,
      contactBlock,
    ],
  },
  about: {
    slug: "about",
    title: `About — ${siteConfig.brand.fullName}`,
    description:
      "Finance & Banking student at Jahangirnagar University, CMA Candidate, and Full-Stack Web Designer & Strategist.",
    blocks: [aboutBlock, contactBlock],
  },
  services: {
    slug: "services",
    title: `Services — ${siteConfig.brand.fullName}`,
    description:
      "Figma UI/UX, custom WordPress & Elementor builds, Next.js applications, SEO, social media management, and monthly retainers.",
    blocks: [servicesBlock, contactBlock],
  },
  work: {
    slug: "work",
    title: `Selected Work — ${siteConfig.brand.fullName}`,
    description:
      "Case studies spanning Figma design systems, WordPress/Elementor, Next.js, and high-ROI growth retainers.",
    blocks: [portfolioBlock, contactBlock],
  },
  contact: {
    slug: "contact",
    title: `Contact — ${siteConfig.brand.fullName}`,
    description:
      "Start a project or monthly retainer with Md. Shahriar Rahman Nadim via email, WhatsApp, Telegram, or direct phone.",
    blocks: [contactBlock],
  },
};

