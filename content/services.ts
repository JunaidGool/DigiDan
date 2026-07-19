/**
 * Services: "pick your blocks" (brief 5.3).
 * Six tiles grouped under the three brand families.
 * Titles/descriptions and detail bullets sourced from profile sections 3 & 4.
 */

export type Family = "teal" | "coral" | "amber";

export type Service = {
  id: string;
  family: Family;
  icon: string; // lucide-react icon name
  title: string;
  summary: string; // <= 10 words
  detail: string[];
};

export const services: Service[] = [
  {
    id: "fintech",
    family: "teal",
    icon: "Landmark",
    title: "Fintech engineering",
    summary: "Channels, transactions and control, financial-grade.",
    detail: [
      "Terminal-to-backend flows: authorisation, presentment, clearing, reversals and book transfers.",
      "ISO 8583 and ISO 20022-aligned messages with strict transaction-consistency controls.",
      "Self-service and edge orchestration for kiosks, EMV readers and banking peripherals.",
      "Real-time fraud checks and PCI-DSS-conscious cardholder-data handling.",
    ],
  },
  {
    id: "cloud",
    family: "teal",
    icon: "ServerCog",
    title: "Cloud, resilience and operations",
    summary: "Cloud-native, local-first and observable by design.",
    detail: [
      "Cloud-native, serverless, containerised and hybrid architecture.",
      "Local-first systems for sites with unreliable connectivity.",
      "Monitoring, logging, alerting, tracing and operational dashboards.",
      "Release assurance, deployment support and post-release verification.",
    ],
  },
  {
    id: "product",
    family: "coral",
    icon: "Boxes",
    title: "Custom software and product engineering",
    summary: "Business applications, portals and purpose-built products.",
    detail: [
      "Business applications, portals, dashboards and workflow systems.",
      "Purpose-built SaaS and internal software products.",
      "Legacy-system enhancement and modernisation.",
      "Desktop, web, mobile and cross-platform applications.",
    ],
  },
  {
    id: "ecommerce",
    family: "coral",
    icon: "ShoppingBag",
    title: "E-commerce and digital platforms",
    summary: "nopCommerce builds, storefronts and campaign automation.",
    detail: [
      "nopCommerce implementation, upgrades and customisation.",
      "Custom plugins, storefront features and administration tools.",
      "Catalogue, pricing, product, stock and image workflows.",
      "CRM/email engineering and campaign production automation.",
    ],
  },
  {
    id: "ai",
    family: "amber",
    icon: "BrainCircuit",
    title: "AI and intelligent automation",
    summary: "LLMs inside deterministic, governed boundaries.",
    detail: [
      "LLM and AI-service integration into business workflows.",
      "AI harnesses, evaluation, regression testing and output controls.",
      "Document, inbox, meeting and operational-information intelligence.",
      "Human-in-the-loop workflows, guardrails, observability and cost controls.",
    ],
  },
  {
    id: "integration",
    family: "amber",
    icon: "Waypoints",
    title: "Systems, API and data integration",
    summary: "APIs, middleware and event-driven data flows.",
    detail: [
      "REST APIs, middleware, OAuth and third-party platform integration.",
      "ETL, SSIS, supplier feeds and catalogue/data-lake workflows.",
      "SQL data processing, reconciliation, migration and import/export utilities.",
      "Event-driven integration using Kafka, RabbitMQ, SNS/SQS and EventBridge patterns.",
    ],
  },
];

export const servicesIntro = {
  eyebrow: "Services",
  lead: "Composable engineering blocks, combined into the system your operation actually needs.",
} as const;
