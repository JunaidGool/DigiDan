/**
 * AI harness: "volatile blocks in a rigid frame" (brief 5.6).
 * Condensed from profile section 7. This is DigiDan's stated differentiator.
 */

export const harness = {
  eyebrow: "AI, held to account",
  headline: "AI that suggests. Systems that decide.",
  lead: "We treat non-deterministic language models as volatile system components that must operate inside deterministic software boundaries.",
  // The rigid frame around the volatile AI block: labelled gate edges.
  gates: [
    "Schema validation",
    "Automated evaluation",
    "Cost and loop control",
    "Human approval",
  ],
  capabilities: [
    "Deterministic verification gates block malformed, unsafe or hallucinated outputs before execution.",
    "Just-in-time retrieval, vector search and Graph-RAG supply context without uncontrolled growth.",
    "Scenario test decks and LLM-as-a-Judge rigs measure correctness before release.",
    "OpenTelemetry traceability records prompt context, tool calls, cost and decision paths.",
  ],
  principle: {
    label: "Practical AI principle",
    quote:
      "AI may suggest, classify, summarise, and speed up work. Deterministic rules and authorised people stay responsible for transactions and operational decisions.",
  },
} as const;
