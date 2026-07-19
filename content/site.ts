/**
 * Site-wide metadata and navigation.
 * All copy is traceable to the DigiDan Company Profile (July 2026).
 * Reference contact details are intentionally excluded from the public build
 * pending explicit partner confirmation (brief acceptance criteria).
 */

export const site = {
  name: "DigiDan",
  legalName: "DigiDan (Pty) Ltd",
  tagline: "Engineering that connects the whole system",
  url: "https://digidan.co.za",
  domain: "digidan.co.za",
  location: "South Africa",
  description:
    "Financial-grade systems, custom software, digital platforms, integrations and production-ready AI engineering, built for dependable real-world operation.",
  keywords: [
    "software engineering South Africa",
    "fintech software development South Africa",
    ".NET development Cape Town",
    "nopCommerce South Africa",
    "AI integration South Africa",
  ],
  wordmark: "d g d n",
} as const;

export type NavItem = { label: string; href: string; accent?: boolean };

export const nav: NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "Approach", href: "/approach" },
  { label: "Notes", href: "/notes" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
  { label: "Talk to us", href: "/contact", accent: true },
];

// Footer-only utility links (kept out of the main nav).
export const footerLinks: NavItem[] = [{ label: "Privacy", href: "/privacy" }];

export const primaryCta = { label: "Talk to us", href: "/contact" } as const;
export const secondaryCta = { label: "See our work", href: "/#work" } as const;
