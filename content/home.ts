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
  { label: "What we build", href: "#capabilities" },
  { label: "Company", href: "#overview" },
  { label: "Work", href: "#work" },
] as const;

export const hero = {
  eyebrow: "SOUTH AFRICAN SOFTWARE ENGINEERING PARTNER",
  legal: "DIGIDAN (PTY) LTD",
  h1: "Software strong enough to depend on.",
  tagline: "Built for the real world.",
  paragraph:
    "We build custom software, online platforms and practical AI systems. We design for the full environment your software runs in, not just the screens and code.",
  primary: "Start a project",
  secondary: "View capabilities",
  cubeCaption: "THE DIGIDAN CORE",
} as const;

export const statement = {
  label: "WHAT WE DO",
  // The first sentence is rendered bold.
  lead: "We connect the whole system.",
  rest: "From payment systems and factory floors to cloud services and online stores. Your software has to work with everything around it, so that is how we build it.",
} as const;

export const capabilities = {
  title: "What we build",
  label: "THREE NODES. TAP ONE TO OPEN IT.",
  core: "SYSTEM CORE",
  coreSub: "ROUTER",
  blades: [
    {
      index: "MOD.01",
      title: "Fintech Engineering",
      card: "Payments and financial transaction systems. Built to handle money safely, with a full record of every step.",
      bullets: [
        "Payment flows aligned to ISO 8583 and ISO 20022",
        "High-volume messaging with Kafka and RabbitMQ",
        "Reliable ledgers with a full audit trail and replay",
        "Every transaction processed once, even under duplicate delivery",
        "Careful card-data handling in line with PCI-DSS",
      ],
      console: [
        "$ ledger.verify --replay",
        "OK  audit trail intact",
        "OK  iso8583 parser online",
        "OK  iso20022 mapper online",
        "STATUS  settlement ready",
      ],
    },
    {
      index: "MOD.02",
      title: "Software Platforms",
      card: "Custom software, online stores and system connections. We also modernise the systems your business already relies on.",
      bullets: [
        "Custom software products, built to scale",
        "Online stores on nopCommerce, set up and extended",
        "Systems integration through APIs and data feeds",
        "Legacy system modernisation and migration",
        "Release assurance and retained support after launch",
      ],
      console: [
        "$ platform.status --all",
        "OK  api gateway healthy",
        "OK  nopcommerce build green",
        "OK  data feeds synced",
        "STATUS  support retained",
      ],
    },
    {
      index: "MOD.03",
      title: "AI and Automation",
      card: "AI that works safely in a real business. Clear rules, proper testing, cost limits and human approval where it matters.",
      bullets: [
        "Every AI output is checked before it is used",
        "Smart search and context control (RAG, vector search)",
        "Test decks that catch problems before release",
        "Token budgets and circuit breakers to control cost",
        "A person approves anything that touches records or money",
      ],
      console: [
        "$ harness.run --gates",
        "OK  output verified",
        "OK  token budget within limit",
        "OK  circuit breaker armed",
        "HOLD  awaiting human approval",
      ],
    },
  ],
} as const;

export const overview = {
  label: "COMPANY OVERVIEW",
  numbers: [
    { value: 20, suffix: "+", caption: "Years software leadership" },
    { value: 8, suffix: "+", caption: "Years financial systems engineering" },
  ],
  paragraph:
    "DigiDan is led by Danyal Motan and Junaid Gool as equal partners. We think about the whole system: the people, the hardware, the networks, the data, the business rules, and what happens when something fails. That is how we build software that holds up in the real world.",
  telemetry: {
    title: "TELEMETRY",
    rows: [
      { key: "ENGAGEMENTS.RETAINED", value: "SAMSUNG / CHEIL / BNM" },
      { key: "CAMPAIGNS.2026", value: "168", count: 168 },
      { key: "ARCHITECTURE", value: "EVENT-DRIVEN" },
      { key: "COMPLIANCE", value: "PCI-DSS AWARE" },
      { key: "MODERNISATION", value: "LEGACY MIGRATION" },
      { key: "DEPLOY.MODE", value: "LOCAL-FIRST / HYBRID / CLOUD" },
      { key: "GOVERNANCE", value: "HUMAN-IN-THE-LOOP" },
      { key: "RESILIENCE", value: "DESIGN FOR FAILURE" },
    ],
    // Seed lines for the live diagnostic feed (decorative compiler simulation).
    feed: [
      "build: compiling modules ................ done",
      "ledger: reconciliation pass ............. ok",
      "iso8583: message parsed ................. 0x1100",
      "kafka: consumer group balanced .......... 12 part",
      "harness: output verified ................ pass",
      "deploy: local-first sync ................ ok",
      "otel: trace exported .................... 204",
      "circuit-breaker: armed .................. nominal",
      "nopcommerce: cache warmed ............... 707",
      "vector: index refreshed ................. 11672",
    ],
  },
} as const;

export const work = {
  title: "Things we have built",
  label: "LIVE AND IN USE TODAY",
  items: ["TrimBase", "DeploySeal", "JujHub", "ProductLens", "Inboxlio"],
} as const;

export const footer = {
  legalName: "DIGIDAN (PTY) LTD",
  location: "SOUTH AFRICA | DIGIDAN.CO.ZA",
  contact: "Contact us",
} as const;
