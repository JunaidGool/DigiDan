/**
 * Full case-study content: the single source of truth for both the homepage
 * portfolio cards and the /work/[slug] pages. Every fact is traceable to the
 * Company Profile (section 5, plus architecture notes). No invented metrics.
 * Order per brief: DeploySeal, Samsung CRM, TrimBase, Brand Name Marketing.
 */

import type { Family } from "@/lib/iso";

export type CaseSection = { title: string; body: string };

export type CaseStudy = {
  slug: string;
  name: string;
  kicker: string; // client / engagement type
  cardOutcome: string; // one-liner for the homepage card
  summary: string; // intro paragraph
  blocks: Family[];
  stack: string;
  sections: CaseSection[];
  metaDescription: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "deployseal",
    name: "DeploySeal",
    kicker: "DigiDan product engineering",
    cardOutcome:
      "Replaces informal launch approvals with recorded, evidence-backed sign-off.",
    summary:
      "DeploySeal replaces informal launch approvals with a structured, evidence-backed sign-off process for websites, e-commerce platforms and customer-facing software changes. It connects launch owners, testers, resolvers and decision-makers around one question: is this change ready to go live?",
    blocks: ["coral", "teal", "amber"],
    stack: "ASP.NET Core / .NET 9 · Next.js · Preact · PostgreSQL · Redis · Docker · Azure",
    sections: [
      {
        title: "Guided UAT",
        body: "Structured campaigns, assigned pages and tasks, tester accountability and low-friction invitation workflows.",
      },
      {
        title: "Contextual issue capture",
        body: "An embeddable widget records URL, browser, viewport, comments and supporting evidence for in-scope pages.",
      },
      {
        title: "Closed-loop assurance",
        body: "Issues move through resolution, retest and verification before sign-off.",
      },
      {
        title: "Approval evidence",
        body: "Formal approval records, audit trails and exportable readiness reports support go/no-go decisions.",
      },
      {
        title: "Integrations",
        body: "Asana, Slack, webhooks, email notifications, object storage and operational monitoring patterns.",
      },
      {
        title: "Engineering architecture",
        body: "ASP.NET Core / .NET 9, Clean Architecture, Next.js/React, a Preact widget, PostgreSQL, Redis, Docker and Azure storage, with automated unit, integration and end-to-end testing.",
      },
      {
        title: "Security design",
        body: "Tenant isolation, scoped tester access, origin validation, rate limiting, sensitive-data redaction, private attachments and audited administrative actions.",
      },
    ],
    metaDescription:
      "DeploySeal: a structured, evidence-backed launch sign-off and release-assurance platform by DigiDan.",
  },
  {
    slug: "samsung-crm",
    name: "Samsung CRM and digital campaign engineering",
    kicker: "Delivery through Cheil",
    cardOutcome:
      "168 campaigns and 11,672 assets delivered in a year, checked by automated validation before every handover.",
    summary:
      "DigiDan supports Samsung CRM and digital campaign delivery through Cheil, combining responsive email engineering, regional campaign production, asset management, packaging and automated quality validation.",
    blocks: ["coral", "amber"],
    stack: "Responsive HTML email · Validation harness · Asset packaging",
    sections: [
      {
        title: "High-volume delivery",
        body: "The 2026 production workspace contains 168 campaign folders, 707 HTML files and 11,672 image assets.",
      },
      {
        title: "Regional execution",
        body: "Campaign variants for multiple African markets and language requirements.",
      },
      {
        title: "Email engineering",
        body: "Responsive, email-safe HTML with mirror-page, unsubscribe, placeholder and asset requirements.",
      },
      {
        title: "Quality automation",
        body: "A reusable validation harness checks delivery structure, links, remote hosts, image references, packaging and campaign-specific requirements.",
      },
      {
        title: "Operational consistency",
        body: "Documented production guidance and evaluation cases support repeatable pre-flight checks before handover.",
      },
    ],
    metaDescription:
      "Samsung CRM and digital campaign engineering delivered through Cheil. High-volume, email-safe campaign production with automated quality validation.",
  },
  {
    slug: "trimbase",
    name: "TrimBase",
    kicker: "Client: FG Uniforms, Cape Town",
    cardOutcome:
      "Runs a garment factory's trim planning, stock, and purchasing, even when the internet drops.",
    summary:
      "TrimBase is a hybrid local-first operations platform for garment trim planning, production readiness, stock control, purchasing, receiving and CMT trim-pack management. It converts cut sheets and bills of materials into clear trim requirements, shortages, order needs and production-readiness information.",
    blocks: ["teal", "coral", "amber"],
    stack: "React · TypeScript · ASP.NET Core / C# · PostgreSQL · Docker",
    sections: [
      {
        title: "Operational workflow",
        body: "Cut sheet capture, size breakdowns, BOM selection, deterministic trim calculations, combined requirements and readiness roll-ups.",
      },
      {
        title: "Factory visibility",
        body: "Dashboards for active work, stock checks, shortages, ordered items and jobs ready for production.",
      },
      {
        title: "Purchasing and stock",
        body: "Need-to-order workflows, purchase orders, supplier information, stock-ledger functions and receiving-oriented design.",
      },
      {
        title: "Resilient architecture",
        body: "React and TypeScript front end, ASP.NET Core / C# API, PostgreSQL and Docker, with local-factory, cloud and hybrid deployment modes.",
      },
      {
        title: "Integration readiness",
        body: "Structured import/export patterns for Sage/Pastel item, BOM, supplier and stock information, without making accounting-system availability a blocker.",
      },
      {
        title: "Intelligent roadmap",
        body: "AI-assisted stock capture, master-data cleanup, shortage-risk summaries and management insights layered over deterministic business rules.",
      },
    ],
    metaDescription:
      "TrimBase: a hybrid local-first garment manufacturing operations platform built for FG Uniforms by DigiDan.",
  },
  {
    slug: "brand-name-marketing",
    name: "Brand Name Marketing and Creative Brands",
    kicker: "Retained development, solution delivery and operational support",
    cardOutcome:
      "Keeps a multi-store e-commerce operation running, from supplier feeds to uptime monitoring.",
    summary:
      "DigiDan provides continuing development and support across the Brand Name Marketing and Creative Brands digital environment. The engagement connects custom software, managed nopCommerce platforms, supplier data, catalogue operations, commercial rules, monitoring, automation and day-to-day problem solving.",
    blocks: ["coral", "amber", "teal"],
    stack: ".NET · REST · SSIS · nopCommerce · Brevo · Data-lake feeds",
    sections: [
      {
        title: "E-commerce engineering",
        body: "Customisation, integration and support across managed online-store environments.",
      },
      {
        title: "Data platform",
        body: "Product, price, category, brand, stock and branding-information ingestion through .NET, REST and SSIS workflows.",
      },
      {
        title: "Custom commerce",
        body: "Branding calculations for artwork, print methods, colours and cart items.",
      },
      {
        title: "Operational tooling",
        body: "Multi-site monitoring, historical status records, downtime and performance reporting, notifications and nopCommerce statistics.",
      },
      {
        title: "Catalogue utilities",
        body: "Product-image export, cross-database product transfer and catalogue-maintenance tooling.",
      },
      {
        title: "Integration",
        body: "Supplier feeds, data-lake components, address autocomplete, Brevo-connected forms and third-party services.",
      },
      {
        title: "Ongoing support",
        body: "Diagnosis, enhancement, deployment and operational continuity for business-critical digital systems.",
      },
    ],
    metaDescription:
      "Brand Name Marketing and Creative Brands: retained commerce, data and operational engineering by DigiDan.",
  },
];

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
