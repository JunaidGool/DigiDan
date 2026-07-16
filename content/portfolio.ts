/**
 * Homepage portfolio cards — "completed structures" (brief 5.5).
 * Derived from the case-study content so names, order and stacks never drift.
 */

import { caseStudies } from "@/content/caseStudies";
import type { Family } from "@/lib/iso";

export type { Family };

export type Project = {
  slug: string;
  name: string;
  client: string;
  outcome: string;
  blocks: Family[];
  stack: string;
};

export const projects: Project[] = caseStudies.map((c) => ({
  slug: c.slug,
  name: c.name,
  client: c.kicker,
  outcome: c.cardOutcome,
  blocks: c.blocks,
  stack: c.stack,
}));

export const portfolioIntro = {
  eyebrow: "Completed structures",
  heading: "Systems already running in production.",
} as const;
