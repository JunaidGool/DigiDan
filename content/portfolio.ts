/**
 * Portfolio — "completed structures" (brief 5.5).
 * Order per brief: DeploySeal, Samsung CRM delivery, TrimBase, Brand Name Marketing.
 * All facts sourced from profile section 5. No invented metrics or clients.
 */

export type Family = "teal" | "coral" | "amber";

export type Project = {
  slug: string;
  name: string;
  client?: string;
  outcome: string; // one-line, outcome-focused
  blocks: Family[]; // 3-4 squares = service families the structure was built from
  stack: string; // mono tech-stack line
};

export const projects: Project[] = [
  {
    slug: "deployseal",
    name: "DeploySeal",
    client: "DigiDan product engineering",
    outcome:
      "Turns informal launch approvals into structured, evidence-backed go/no-go sign-off.",
    blocks: ["coral", "teal", "amber"],
    stack: "ASP.NET Core / .NET 9 · Next.js · Preact · PostgreSQL · Redis",
  },
  {
    slug: "samsung-crm",
    name: "Samsung CRM and campaign engineering",
    client: "Delivery through Cheil",
    outcome:
      "High-volume, email-safe regional campaign delivery with an automated validation harness.",
    blocks: ["coral", "amber"],
    stack: "Responsive HTML email · Validation harness · Asset packaging",
  },
  {
    slug: "trimbase",
    name: "TrimBase",
    client: "FG Uniforms, Cape Town",
    outcome:
      "Converts cut sheets and BOMs into clear trim requirements, shortages and production readiness.",
    blocks: ["teal", "coral", "amber"],
    stack: "React · TypeScript · ASP.NET Core / C# · PostgreSQL · Docker",
  },
  {
    slug: "brand-name-marketing",
    name: "Brand Name Marketing and Creative Brands",
    client: "Retained development and operational support",
    outcome:
      "Continuing commerce, data and operational engineering across a business-critical digital estate.",
    blocks: ["coral", "amber", "teal"],
    stack: ".NET · REST · SSIS · nopCommerce · Brevo · Data-lake feeds",
  },
];

export const portfolioIntro = {
  eyebrow: "Completed structures",
  heading: "Systems already running in production.",
} as const;
