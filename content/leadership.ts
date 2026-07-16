/**
 * Leadership + references (brief 5.7). Source: profile section 2 & 10.
 * Reference phone numbers and emails are deliberately omitted from the public
 * build; details are available on request until partners confirm otherwise.
 */

export type Partner = {
  name: string;
  initials: string;
  role: string;
  summary: string;
};

export const partners: Partner[] = [
  {
    name: "Danyal Motan",
    initials: "DM",
    role: "Partner & Senior Software Engineer",
    summary:
      "20+ years across custom .NET, e-commerce, nopCommerce, systems and data integration, automation and product delivery.",
  },
  {
    name: "Junaid Gool",
    initials: "JG",
    role: "Partner & Senior Software Engineer",
    summary:
      "8+ years in resilient distributed systems, edge and kiosk integration, event-driven financial workflows and AI harness engineering.",
  },
];

export type Reference = {
  name: string;
  role: string;
  company: string;
  engagement: string;
};

export const references: Reference[] = [
  {
    name: "Renusha Matadin",
    role: "Digital Performance HOD",
    company: "Cheil",
    engagement: "Samsung CRM and digital campaign engineering.",
  },
  {
    name: "Fuad Gierdien",
    role: "Founder / Owner",
    company: "FG Uniforms",
    engagement: "TrimBase garment manufacturing operations platform.",
  },
  {
    name: "Jannie Vermeulen",
    role: "Reference Contact",
    company: "Brand Name Marketing",
    engagement: "Retained development, e-commerce, integration and support.",
  },
];

export const referencesNote = "Contact details available on request.";

export const leadershipIntro = {
  eyebrow: "About",
  heading: "Senior engineers, hands on the build.",
  commitment:
    "Build the right system, make its behaviour understandable, design for failure as well as success, and remain accountable for the quality of the result.",
} as const;

export const closing = {
  heading: "Have a system that needs building? Let's find the first block.",
  cta: { label: "Start a build", href: "/contact" },
} as const;
