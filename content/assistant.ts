/**
 * The DigiDan guide: a deterministic, content-driven conversation tree.
 * No LLM: every response is authored and traceable to the Company Profile,
 * so the guide can never invent a client, a capability, or a price. Editing
 * the guide means editing this file.
 *
 * A choice either navigates the tree (`goto`) or links to a page (`href`).
 */

export type Choice =
  | { label: string; goto: string }
  | { label: string; href: string };

export type Node = {
  id: string;
  message: string;
  choices: Choice[];
};

export const assistant = {
  launcherLabel: "Ask the guide",
  title: "DigiDan guide",
  // Shown once, under the header. Sets expectations honestly.
  disclosure:
    "A guided assistant, not a person. I point you to the right work and hand anything specific to an engineer.",
  handoff: { label: "Talk to an engineer", href: "/contact" },
  rootId: "welcome",
} as const;

export const nodes: Record<string, Node> = {
  welcome: {
    id: "welcome",
    message: "Hi, I'm the DigiDan guide. What are you working on?",
    choices: [
      { label: "Fintech / banking software", goto: "fintech" },
      { label: "E-commerce / nopCommerce", goto: "ecommerce" },
      { label: "AI / automation", goto: "ai" },
      { label: "Custom software / a product", goto: "product" },
      { label: "Systems integration", goto: "integration" },
      { label: "See The War Room", goto: "warroom" },
      { label: "Just exploring", goto: "explore" },
    ],
  },
  fintech: {
    id: "fintech",
    message:
      "Financial-grade is our core. We build terminal-to-backend transaction flows, authorisation, clearing, reversals and reconciliation, with ISO 8583 / ISO 20022 messaging, self-service and edge/kiosk orchestration, and event-driven architectures under strict transaction consistency.",
    choices: [
      { label: "See release-assurance work", href: "/work/deployseal" },
      { label: "Security & data handling", href: "/security" },
      { label: "How we deliver", href: "/approach" },
      { label: "Talk to an engineer", href: "/contact" },
      { label: "← Something else", goto: "welcome" },
    ],
  },
  ecommerce: {
    id: "ecommerce",
    message:
      "We do nopCommerce implementation, upgrades and customisation, custom plugins and storefront features, catalogue / pricing / stock workflows, and CRM and campaign-production automation.",
    choices: [
      { label: "See our commerce work", href: "/work/brand-name-marketing" },
      { label: "Talk to an engineer", href: "/contact" },
      { label: "← Something else", goto: "welcome" },
    ],
  },
  ai: {
    id: "ai",
    message:
      "We treat AI as a volatile component inside a deterministic frame: schema-validated outputs, evaluation harnesses, cost and loop controls, and human approval. AI suggests; systems and people decide.",
    choices: [
      { label: "See The War Room", goto: "warroom" },
      { label: "Read our AI approach", href: "/approach" },
      { label: "Talk to an engineer", href: "/contact" },
      { label: "← Something else", goto: "welcome" },
    ],
  },
  warroom: {
    id: "warroom",
    message:
      "The War Room is our multi-model deliberation product: five AI advisors, each on a different model from a different lab, debate a hard question to a verdict that shows its work. It's a live showcase of how we keep AI inside a deterministic frame, and it's in limited access right now.",
    choices: [
      { label: "Open The War Room", href: "/products/war-room" },
      { label: "Request access", href: "/contact" },
      { label: "← Something else", goto: "welcome" },
    ],
  },
  product: {
    id: "product",
    message:
      "Custom business applications, portals, dashboards and workflow systems; purpose-built SaaS; legacy modernisation; and desktop, web and mobile apps.",
    choices: [
      { label: "See DeploySeal", href: "/work/deployseal" },
      { label: "See TrimBase", href: "/work/trimbase" },
      { label: "Talk to an engineer", href: "/contact" },
      { label: "← Something else", goto: "welcome" },
    ],
  },
  integration: {
    id: "integration",
    message:
      "REST APIs, middleware, OAuth and third-party integration; ETL / SSIS and data-lake workflows; SQL processing, reconciliation and migration; and event-driven integration with Kafka, RabbitMQ, SNS/SQS and EventBridge.",
    choices: [
      { label: "See our work", href: "/work" },
      { label: "Talk to an engineer", href: "/contact" },
      { label: "← Something else", goto: "welcome" },
    ],
  },
  explore: {
    id: "explore",
    message: "Take a look around. Here's the fastest way in.",
    choices: [
      { label: "Our work", href: "/work" },
      { label: "The War Room", goto: "warroom" },
      { label: "How we deliver", href: "/approach" },
      { label: "About the team", href: "/about" },
      { label: "Talk to an engineer", href: "/contact" },
      { label: "← Start over", goto: "welcome" },
    ],
  },
};
