/** Hero + credibility strip (brief 5.2). Source: profile p.1 opening + p.2 capability. */

export const hero = {
  badge: "South African software engineering partner",
  headline: "Financial-grade software, built block by block.",
  subhead:
    "Financial-grade systems, custom software, digital platforms, integrations and production-ready AI engineering — built for dependable real-world operation.",
} as const;

export type CredibilityItem = { name: string; note: string };

/**
 * Named in text only. Samsung is delivered *through Cheil* (not a direct client)
 * and appears as "via Cheil" without the Samsung mark — trademark-safe framing
 * per the agreed build decisions.
 */
export const credibility = {
  label: "Trusted in production by",
  items: [
    { name: "Samsung CRM delivery", note: "via Cheil" },
    { name: "Brand Name Marketing", note: "retained engineering" },
    { name: "FG Uniforms", note: "TrimBase platform" },
  ] satisfies CredibilityItem[],
} as const;
