export interface NavItem {
  label: string;
  href: string;
  sectionId?: string;
}

export interface SocialQuickAction {
  id: "whatsapp" | "telegram" | "facebook";
  label: string;
  href: string;
}

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://shahriarnadim.com"
).replace(/\/+$/, "");

const formspreeEndpoint =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() ||
  "https://formspree.io/f/xbgodown";

export function assetPath(path: string): string {
  if (!path) return path;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

export const siteConfig = {
  siteUrl: `${siteOrigin}${basePath}`,
  siteOrigin,
  basePath,
  brand: {
    monogram: "S",
    shortName: "Shahriar",
    displayName: "Shahriar Nadim",
    fullName: "Md. Shahriar Rahman Nadim",
    role: "Full-Stack Web Designer & Strategist",
    credentials:
      "Dept. of Finance & Banking (7th Semester), Jahangirnagar University • CMA Candidate",
    copyrightYear: 2026,
  },
  contact: {
    email: "shahriarrahmannadim@gmail.com",
    formspreeEndpoint,
    phoneDisplay: "01646493182",
    phoneHref: "tel:+8801646493182",
    phoneInternational: "+8801646493182",
    whatsappHref: "https://wa.me/8801646493182",
    telegramHref: "https://t.me/+8801646493182",
    facebookHref: "https://www.facebook.com/md.shahriarrahman.nadim",
    facebookLabel: "facebook.com/md.shahriarrahman.nadim",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
  footerLinks: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ] satisfies NavItem[],
  socialActions: [
    {
      id: "whatsapp",
      label: "Chat on WhatsApp",
      href: "https://wa.me/8801646493182",
    },
    {
      id: "telegram",
      label: "Message on Telegram",
      href: "https://t.me/+8801646493182",
    },
    {
      id: "facebook",
      label: "Connect on Facebook",
      href: "https://www.facebook.com/md.shahriarrahman.nadim",
    },
  ] satisfies SocialQuickAction[],
} as const;
