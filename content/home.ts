/**
 * Approved site copy (spec v1.0, section 6.3). Use verbatim.
 * British English, no em dashes. Jargon lives in bullet lists only.
 *
 * Contact method is an open decision (spec 9). Until confirmed, the primary
 * actions point at a domain mailbox rather than publishing a phone number.
 */

export const CONTACT_HREF = "mailto:hello@digidan.co.za";

export const site = {
  name: "DigiDan",
  legalName: "DigiDan (Pty) Ltd",
  url: "https://digidan.co.za",
  domain: "digidan.co.za",
  location: "South Africa",
  description:
    "We build custom software, online platforms and practical AI systems. We design for the full environment your software runs in, not just the screens and code.",
  wordmark: "d g d n",
} as const;

export const nav = [
  { label: "What we do", href: "/#services" },
  { label: "Company", href: "/#overview" },
  { label: "Work", href: "/work" },
] as const;

export const hero = {
  eyebrow: "CUSTOM SOFTWARE, PLATFORMS AND AI",
  legal: "DIGIDAN (PTY) LTD",
  h1: "Software strong enough to depend on.",
  tagline: "Built for the real world.",
  paragraph:
    "Tell us the problem. We build the custom software and automation to solve it, and we make it hold up in the real world, not just in a demo.",
  primary: "Start a project",
  secondary: "See what we can do",
  cubeCaption: "A LIVE SYSTEM, ASSEMBLING",
} as const;

/**
 * Services, reframed around what a customer gets. Each renders as a full-width
 * row (benefit copy on one side, a live graphic on the other), and the set is
 * the centre of the home page. `graphic` selects the animated panel component.
 */
export const services = {
  label: "WHAT WE CAN DO FOR YOU",
  title: "How we make your business better.",
  intro:
    "The questions we answer for businesses like yours. Tell us which one is keeping you up, and we will build the system that settles it.",
  items: [
    {
      id: "platforms",
      graphic: "platforms",
      kicker: "MODERNISE WHAT YOU RUN ON",
      title: "Custom software and online stores that grow with you.",
      body: "A new product built, an online store that sells, or a tired legacy system brought up to date, all connected to the tools you already use.",
      bullets: [
        "Custom software built for your business, not off the shelf",
        "Online stores on nopCommerce, set up and extended",
        "Your systems talking to each other cleanly",
        "Legacy systems modernised without stopping the business",
      ],
    },
    {
      id: "ai",
      graphic: "ai",
      kicker: "AUTOMATE THE SLOW WORK",
      title: "Automate the repetitive work, safely.",
      body: "We put AI to work on the tasks that slow your team down, with clear rules, proper testing and a person in control of anything that touches money or records.",
      bullets: [
        "Free your team from repetitive processes",
        "Every AI output checked before it is used",
        "Costs capped, with no runaway bills",
        "A person approves anything that matters",
      ],
    },
  ],
} as const;

export const statement = {
  label: "WHAT WE DO",
  // The first sentence is rendered bold.
  lead: "We connect the whole system.",
  rest: "From the business tools your team uses to cloud services and online stores. Your software has to work with everything around it, so that is how we build it.",
} as const;

export const overview = {
  label: "WHO YOU WORK WITH",
  numbers: [
    { value: 20, suffix: "+", caption: "Years software leadership" },
    { value: 8, suffix: "+", caption: "Years engineering complex systems" },
  ],
  paragraph:
    "DigiDan is a South African software engineering and digital solutions company. We combine more than twenty years of software development leadership with deep work across custom software, e-commerce, systems integration and production-grade AI. We think about the whole system: the people, the data, the business rules and what happens when something fails. That is how we build software that holds up in the real world.",
} as const;

export const work = {
  title: "Selected work",
  label: "LIVE AND IN USE TODAY",
  intro:
    "A selection of the platforms and products we have designed, built and still support. Each one solves a real operating problem for the business using it.",
  items: [
    {
      name: "TrimBase",
      mark: "trim",
      stack: "React · ASP.NET Core · PostgreSQL · Docker",
      blurb:
        "A local-first operations platform for garment manufacturing. It turns cut sheets and bills of materials into clear trim requirements, shortages, purchase needs and production readiness, with live dashboards for stock, receiving and jobs ready to run.",
    },
    {
      name: "DeploySeal",
      mark: "seal",
      stack: ".NET 9 · Next.js · PostgreSQL · Redis · Docker",
      blurb:
        "Launch sign-off and release assurance. It replaces informal go-live approvals with structured UAT, contextual issue capture, closed-loop resolution and formal, exportable approval records, so a team can answer one question with evidence: is this ready to go live?",
    },
    {
      name: "Web Watchdog",
      mark: "radar",
      stack: ".NET · Monitoring · Alerting",
      blurb:
        "A secure multi-site monitoring platform with historical uptime, downtime and speed reporting, automated alerts, retention controls and operational statistics across a fleet of sites.",
    },
    {
      name: "CRM and campaign engineering",
      mark: "mail",
      stack: "Responsive HTML · Validation harness · Automation",
      blurb:
        "High-volume, regional email and digital campaign production for a global electronics brand, delivered through an agency partner. A reusable validation harness checks structure, links, assets and packaging before every handover.",
    },
    {
      name: "E-commerce and data operations",
      mark: "store",
      stack: "nopCommerce · .NET · REST · SSIS",
      blurb:
        "Retained development and support across managed nopCommerce stores: supplier and catalogue data, branding and pricing rules, integrations, monitoring and day-to-day operational tooling.",
    },
  ],
} as const;

export const footer = {
  legalName: "DIGIDAN (PTY) LTD",
  location: "SOUTH AFRICA | DIGIDAN.CO.ZA",
  contact: "Contact us",
} as const;

/**
 * Ecosystem graph. Illustrates the statement: the DigiDan core in the middle,
 * with the real-world systems it connects arranged around it. Node labels are
 * the same systems named in the approved statement copy.
 */
export const ecosystem = {
  label: "ONE CONNECTED SYSTEM",
  title: "Your software has to work with everything around it.",
  core: "DIGIDAN CORE",
  nodes: [
    "Business tools",
    "Cloud services",
    "Online stores",
    "APIs and data feeds",
    "Legacy systems",
  ],
} as const;

/**
 * Closing call to action. British English, no em dashes, in the DigiDan voice.
 */
export const cta = {
  label: "START HERE",
  title: "Tell us what you are trying to build.",
  paragraph:
    "Whatever you are trying to run in the real world, tell us the problem. We will design for all of it: the people, the data and what happens when something fails.",
  primary: "Start a project",
  secondary: "See what we can do",
  emailPlaceholder: "Enter your work email",
  emailAction: "Talk to us",
  emailNote: "We only use your address to reply to you. Nothing else.",
} as const;
