/**
 * The War Room — DigiDan product showcase.
 * Every claim is sourced from the the_war_room repository docs (system overview,
 * members, deliberation pipeline). No invented capabilities, models or metrics.
 * Exact model versions are intentionally omitted (they change); labs are named
 * because multi-lab decorrelation is the point.
 */

import type { Family } from "@/lib/iso";

export const warRoom = {
  eyebrow: "Product · Harness showcase",
  title: "The War Room",
  tagline: "Five AI advisors. One hard question. A verdict that shows its work.",
  lead: "The War Room turns a single hard decision into a structured, multi-model debate. Instead of asking one model for an answer, it convenes a panel of five advisors — each a distinct thinking lens on a distinct model from a distinct lab — has them argue it out in the open, and produces a verdict that reconstructs how the room got there.",
  status: "In limited access.",
  cta: { label: "Request access", href: "/contact" },
} as const;

export type Commitment = { title: string; body: string };

export const commitments: Commitment[] = [
  {
    title: "Diversity by construction",
    body: "Each advisor pairs a distinct thinking lens with a distinct model from a distinct lab — five labs across two regions, chosen for error decorrelation. Different training data means genuinely different blind spots, so agreement actually means something.",
  },
  {
    title: "Attribution, not anonymity",
    body: "Advisors challenge each other by name through attributed debate rounds, so you can see exactly who moved whom.",
  },
  {
    title: "Traceability",
    body: "The verdict reconstructs how the room reached its conclusion, and every model call is logged with its tokens and latency.",
  },
];

export type Advisor = {
  callsign: string;
  role: string;
  lens: string;
  lab: string;
  accent: string; // the advisor's War Room accent colour
};

export const advisors: Advisor[] = [
  { callsign: "The Adversary", role: "Red Team Lead", lens: "Hunts the fatal flaw", lab: "Anthropic", accent: "#ff6b5e" },
  { callsign: "The Architect", role: "Chief Strategist", lens: "Rebuilds from first principles", lab: "DeepSeek", accent: "#f5a623" },
  { callsign: "The Vanguard", role: "Head of Expansion", lens: "Finds the bigger play", lab: "OpenAI", accent: "#2ec4b6" },
  { callsign: "The Wildcard", role: "Outside Eyes", lens: "Reacts with zero context", lab: "Moonshot", accent: "#5aa9ff" },
  { callsign: "The Operator", role: "Field Commander", lens: "Drives to action", lab: "Google", accent: "#cdd631" },
];

export const supportingRoles =
  "Around the panel sit three more roles: the Clerk gates and frames the question on intake, the Arbiter chairs and writes the final verdict, and a Direct Expert handles questions that don't warrant a full debate.";

export type Stage = { n: number; name: string; body: string; family: Family };

export const pipeline: Stage[] = [
  { n: 1, name: "Triage", body: "The Clerk gates whether the question is worthy of the room and frames it into a brief.", family: "teal" },
  { n: 2, name: "Opening", body: "All five advisors answer the framed brief in parallel.", family: "amber" },
  { n: 3, name: "Debate", body: "Attributed rounds — advisors challenge each other by name until they converge or hit the round cap.", family: "amber" },
  { n: 4, name: "Verdict", body: "The Arbiter synthesizes the positions into a verdict that shows its reasoning.", family: "coral" },
];

export type Mapping = { capability: string; mechanism: string };

// The reason it belongs on the DigiDan site: it embodies the harness thesis.
export const harnessMapping: Mapping[] = [
  { capability: "Deterministic gates", mechanism: "The Clerk triages and frames the question before the room spends a cent." },
  { capability: "Cost and loop control", mechanism: "Round caps and convergence detection bound how long the debate can run." },
  { capability: "Evaluation and synthesis", mechanism: "The Arbiter weighs the advisors' positions into one accountable verdict." },
  { capability: "Agent traceability", mechanism: "Every model call is logged with tokens and latency; the verdict reconstructs its own path." },
  { capability: "Diversity by construction", mechanism: "Five labs across two regions, each model matched to its role, for decorrelated errors." },
];

export const tech = ".NET 10 · ASP.NET Core (minimal API + SSE) · React 19 · Vite · OpenRouter";

export const harnessTieIn =
  "The War Room is DigiDan's harness thesis running in the open: a volatile panel of models held inside a deterministic frame of gates, caps, synthesis and logging.";
