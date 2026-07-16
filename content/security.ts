/**
 * Security & data handling — grounded in the Company Profile (sections 3, 4, 7,
 * 8 & 9). These are engineering practices DigiDan applies, not certifications:
 * no formal-compliance or audit claims are made. "PCI-DSS-conscious" and the
 * POPIA reference are design postures, kept deliberately hedged — upgrade to any
 * formal claim only with partner/legal confirmation.
 */

import type { Family } from "@/lib/iso";

export const securityIntro = {
  eyebrow: "Trust",
  title: "Security & data handling",
  lead: "We build systems for environments where being wrong isn't an option — banking channels, ledgers, customer data. Transaction integrity, fault tolerance, auditability and controlled recovery are treated as architecture requirements, not afterthoughts.",
  principle:
    "We consider the people, networks, data, business rules, audit requirements and failure conditions around the software — not only the screens and code.",
} as const;

export type SecurityGroup = { title: string; family: Family; points: string[] };

export const groups: SecurityGroup[] = [
  {
    title: "Data protection & privacy",
    family: "teal",
    points: [
      "Privacy-conscious data capture — we collect the minimum a system needs to do its job.",
      "Tenant isolation, so one customer's data is never reachable from another's context.",
      "Sensitive-data redaction, scoped access and private attachments for confidential material.",
      "Privacy-friendly, cookieless analytics on our own properties.",
      "Personal-information handling designed consistently with South Africa's POPIA.",
    ],
  },
  {
    title: "Application & access security",
    family: "coral",
    points: [
      "Least-privilege, scoped access by default.",
      "Origin validation and rate limiting to resist abuse.",
      "Secure configuration and disciplined secrets handling.",
      "Audited administrative actions — privileged operations leave a trail.",
      "Automated validation, integration and end-to-end testing (including Playwright) as part of release.",
    ],
  },
  {
    title: "Transaction integrity & auditability",
    family: "amber",
    points: [
      "ACID-compliant ledgers and strict transaction-consistency controls.",
      "Append-only audit trails and deterministic replay.",
      "Reconciliation and end-of-day verification as a standing backstop.",
      "PCI-DSS-conscious cardholder-data handling and secure device-state management.",
      "ISO 8583 and ISO 20022-aligned message structures for financial flows.",
    ],
  },
  {
    title: "Resilient & observable by design",
    family: "teal",
    points: [
      "Design for failure as well as success — fault isolation, graceful degradation and controlled recovery.",
      "Exponential backoff and fault-isolated wrappers for unreliable devices and networks.",
      "Distributed tracing, metrics and monitoring (OpenTelemetry, Jaeger, Prometheus, Grafana).",
      "Release assurance, deployment support and post-release verification.",
    ],
  },
  {
    title: "AI safety",
    family: "coral",
    points: [
      "Deterministic verification gates block malformed or unsafe model output before it executes.",
      "Human approval for anything affecting records, stock, transactions or customer outcomes.",
      "Private AI execution — narrow models on your own infrastructure where privacy, latency or external-API dependency is a concern.",
      "Agent traceability and cost/loop controls on every AI-enabled workflow.",
    ],
  },
  {
    title: "Deployment & data residency",
    family: "amber",
    points: [
      "Local-first, hybrid and cloud deployment patterns to suit the operating reality.",
      "Local-first and private execution keep sensitive data and processing on-site where required.",
    ],
  },
];

export const securityNote =
  "This describes the engineering practices we apply; the specific controls for any project are shaped to its regulatory context and threat model. We're glad to walk a security or procurement team through them in detail — specifics are shared under NDA.";

export const securityCta = {
  heading: "Reviewing us as a build partner?",
  body: "We'll take your security or procurement team through our practices and how they'd apply to your systems.",
  cta: { label: "Talk to us about a security review", href: "/contact" },
} as const;
