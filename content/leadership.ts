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
  bio: string;
};

export const partners: Partner[] = [
  {
    name: "Danyal Motan",
    initials: "DM",
    role: "Partner & Senior Software Engineer",
    summary:
      "20+ years across custom .NET, e-commerce, nopCommerce, systems and data integration, automation and product delivery.",
    bio: "Danyal is a Bachelor of Technology graduate with more than 20 years of software development experience. His work covers custom .NET applications, e-commerce, nopCommerce, systems and data integration, automation, digital campaign engineering, product development, deployment and ongoing operational support.",
  },
  {
    name: "Junaid Gool",
    initials: "JG",
    role: "Partner & Senior Software Engineer",
    summary:
      "8+ years in resilient distributed systems, edge and kiosk integration, event-driven financial workflows and AI harness engineering.",
    bio: "Junaid brings more than eight years of enterprise banking and retail automation experience. He specialises in resilient distributed systems, edge-device and kiosk integration, cloud-native backends, event-driven financial workflows and production-grade AI harness engineering, including deterministic guardrails, evaluation, context management, cost controls and end-to-end traceability.",
  },
];

export const leadershipIntro = {
  eyebrow: "About",
  heading: "Senior engineers, hands on the build.",
  commitment:
    "Build the right system, make its behaviour understandable, design for failure as well as success, and remain accountable for the quality of the result.",
} as const;

export const aboutIntro = {
  overview:
    "DigiDan (Pty) Ltd is a South African software engineering and digital solutions company combining more than 20 years of software development leadership with over eight years of enterprise banking and retail automation engineering. We consider the people, hardware, networks, data, business rules, transaction consistency, audit requirements and failure conditions around the software — not only the screens and code.",
  why: "DigiDan brings senior hands-on engineering, enterprise architecture experience and a practical understanding of how software behaves outside the development environment. We are equally comfortable designing a new platform, integrating complex existing systems, automating high-volume delivery or supporting a critical operational estate.",
} as const;

export const closing = {
  heading: "Have a system that needs building? Let's find the first block.",
  cta: { label: "Start a build", href: "/contact" },
} as const;
