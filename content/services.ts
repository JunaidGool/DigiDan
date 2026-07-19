/**
 * Services: "pick your blocks" (brief 6.5). Six cream tiles on the gold band,
 * one per service family. Tile lines are verbatim from the brief; the detail
 * bullets are the technical layer, rewritten from profile sections 3 and 4.
 */

export type Family = "teal" | "coral" | "amber" | "olive";

export type Service = {
  id: string;
  family: Family;
  icon: string; // lucide-react icon name
  title: string;
  summary: string; // brief 6.5 tile line, verbatim
  detail: string[];
};

export const services: Service[] = [
  {
    id: "fintech",
    family: "teal",
    icon: "Landmark",
    title: "Fintech engineering",
    summary: "Banking channels, transactions, and the audit trail behind them.",
    detail: [
      "Terminal-to-backend flows: authorisation, presentment, clearing, reversals and book transfers.",
      "ISO 8583 and ISO 20022-aligned messages with strict transaction-consistency controls.",
      "Self-service and edge orchestration for kiosks, EMV readers and banking peripherals.",
      "Real-time fraud checks and PCI-DSS-conscious cardholder-data handling.",
    ],
  },
  {
    id: "software",
    family: "coral",
    icon: "ShoppingBag",
    title: "Software and e-commerce",
    summary: "Custom platforms and online stores that run every day.",
    detail: [
      "Business applications, portals, dashboards and workflow systems.",
      "nopCommerce implementation, upgrades, plugins and storefront features.",
      "Catalogue, pricing, product, stock and image workflows.",
      "Legacy-system enhancement across desktop, web and mobile.",
    ],
  },
  {
    id: "ai",
    family: "olive",
    icon: "BrainCircuit",
    title: "AI and automation",
    summary: "AI that speeds up work, inside rules you control.",
    detail: [
      "LLM and AI-service integration into business workflows.",
      "AI harnesses, evaluation, regression testing and output controls.",
      "Document, inbox, meeting and operational-information intelligence.",
      "Human-in-the-loop workflows, guardrails, observability and cost controls.",
    ],
  },
  {
    id: "integration",
    family: "coral",
    icon: "Waypoints",
    title: "Systems and data integration",
    summary: "Supplier feeds, APIs, and reports that agree with each other.",
    detail: [
      "REST APIs, middleware, OAuth and third-party platform integration.",
      "ETL, SSIS, supplier feeds and catalogue/data-lake workflows.",
      "SQL data processing, reconciliation, migration and import/export utilities.",
      "Event-driven integration using Kafka, RabbitMQ, SNS/SQS and EventBridge patterns.",
    ],
  },
  {
    id: "cloud",
    family: "teal",
    icon: "ServerCog",
    title: "Cloud and operations",
    summary: "Systems that stay up, and tell you when they are not.",
    detail: [
      "Cloud-native, serverless, containerised and hybrid architecture.",
      "Local-first systems for sites with unreliable connectivity.",
      "Monitoring, logging, alerting, tracing and operational dashboards.",
      "Deployment support and post-release verification.",
    ],
  },
  {
    id: "quality",
    family: "olive",
    icon: "ShieldCheck",
    title: "Quality and support",
    summary: "Testing before launch, and someone answering after it.",
    detail: [
      "Functional, integration and resilience testing before every release.",
      "Security-control checks and release-readiness assurance.",
      "Production verification once a system is live.",
      "Ongoing operational support for critical systems.",
    ],
  },
];

export const servicesIntro = {
  eyebrow: "Services",
  heading: "Pick your blocks.",
  lead: "Every engagement is built from parts that fit together, and keep fitting as you grow.",
} as const;
