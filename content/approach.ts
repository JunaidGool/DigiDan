/**
 * Delivery approach: "seven blocks, one system" (brief 5.4).
 * Verbatim from profile section 9. Colour progresses teal -> amber -> coral
 * across the seven steps to echo the staircase illustration.
 */

export type Step = {
  n: number;
  title: string;
  description: string;
  family: "teal" | "amber" | "coral";
};

export const steps: Step[] = [
  {
    n: 1,
    title: "Discover",
    description:
      "Understand the operating problem, users, systems, data, constraints, risks and success measures.",
    family: "teal",
  },
  {
    n: 2,
    title: "Design",
    description:
      "Define the architecture, workflows, interfaces, security boundaries and delivery plan.",
    family: "teal",
  },
  {
    n: 3,
    title: "Validate",
    description:
      "Prototype the highest-risk workflows, integrations or AI behaviour before scaling implementation.",
    family: "amber",
  },
  {
    n: 4,
    title: "Build",
    description:
      "Deliver in reviewable increments with clear source control, environments and reusable components.",
    family: "amber",
  },
  {
    n: 5,
    title: "Integrate",
    description:
      "Connect data, APIs, devices and external platforms with explicit failure and reconciliation behaviour.",
    family: "amber",
  },
  {
    n: 6,
    title: "Assure",
    description:
      "Test functional behaviour, integration paths, resilience, security controls and release readiness.",
    family: "coral",
  },
  {
    n: 7,
    title: "Deploy and support",
    description:
      "Release safely, verify production behaviour, document operations and improve the solution using real evidence.",
    family: "coral",
  },
];

export const approachIntro = {
  eyebrow: "Approach",
  heading: "Seven blocks, one system.",
  lead: "Clear problem definition, strong architecture, incremental delivery and evidence-led quality: the same method on every engagement.",
} as const;
