export interface HeroStatCard {
  metric: string;
  title: string;
  footerCopy: string;
  variant: "cream" | "glass";
}

export interface HeroBentoBlockData {
  id: string;
  type: "HeroBentoBlock";
  microLabel: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  watermarkText: string;
  statCards: HeroStatCard[];
  socialProofText: string;
  profileCard: {
    availabilityText: string;
    portraitUrl: string;
    initials: string;
    email: string;
    fullName: string;
    role: string;
    bioSnippet: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

export interface AboutSplitBlockData {
  id: string;
  type: "AboutSplitBlock";
  badgeLabel: string;
  watermarkLabel: string;
  headlinePrimary: string;
  headlineMuted: string;
  portraitUrl: string;
  portraitBadge: string;
  leadParagraph: string;
  secondaryCopy: string;
  partnerPillLabel: string;
  stackCard: {
    metric: string;
    subtitle: string;
    description: string;
    skills: string[];
    ctaLabel: string;
    ctaHref: string;
  };
  retainerCard: {
    metric: string;
    title: string;
    subtitle: string;
    visualUrl: string;
  };
}

export interface ServiceItem {
  title: string;
  description: string;
  variant: "cream" | "orange";
  href: string;
  tag: string;
}

export interface ServicesMatrixBlockData {
  id: string;
  type: "ServicesMatrixBlock";
  badgeLabel: string;
  headlineMuted: string;
  headlinePrimary: string;
  microQuote: string;
  bottomSummary: string;
  bottomCtaLabel: string;
  bottomCtaHref: string;
  services: [
    ServiceItem,
    ServiceItem,
    ServiceItem,
    ServiceItem,
    ServiceItem
  ];
}

export interface CaseStudyItem {
  id: string;
  title: string;
  category: string;
  metric: string;
  summary: string;
  tags: string[];
  variant: "cream" | "orange" | "dark";
  href: string;
  imageUrl?: string;
  external?: boolean;
}

export interface PortfolioGridBlockData {
  id: string;
  type: "PortfolioGridBlock";
  badgeLabel: string;
  headlinePrimary: string;
  headlineMuted: string;
  subtext: string;
  items: CaseStudyItem[];
}

export interface ContactFooterBlockData {
  id: string;
  type: "ContactFooterBlock";
  badgeLabel: string;
  headline: string;
  subtext: string;
  primaryEmail: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  telegramHref: string;
  facebookLabel: string;
  facebookHref: string;
  credentialsLine: string;
}

export type PageBlock =
  | HeroBentoBlockData
  | AboutSplitBlockData
  | ServicesMatrixBlockData
  | PortfolioGridBlockData
  | ContactFooterBlockData;

export interface PageDefinition {
  slug: string;
  title: string;
  description: string;
  blocks: PageBlock[];
}

