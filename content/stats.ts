/**
 * Proof-in-numbers strip. Every figure is real and traceable to the Company
 * Profile — no invented metrics. Samsung figures are from the 2026 campaign
 * workspace delivered via Cheil (profile section 5).
 */

import type { Family } from "@/lib/iso";

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
  family: Family;
};

export const statsIntro = {
  eyebrow: "By the numbers",
  note: "Samsung figures are from the 2026 campaign workspace, delivered via Cheil.",
} as const;

export const stats: Stat[] = [
  { value: 20, suffix: "+", label: "years of senior engineering leadership", family: "teal" },
  { value: 8, suffix: "+", label: "years in enterprise banking & automation", family: "coral" },
  { value: 168, label: "regional campaigns shipped", family: "amber" },
  { value: 11672, label: "campaign assets delivered", family: "teal" },
];
