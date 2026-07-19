/** Hero + credibility strip (brief 5.2). Source: profile p.1 opening + p.2 capability. */

export const hero = {
  badge: "South African software engineering partner",
  headline: "We build software businesses depend on.",
  subhead:
    "Banking systems, online stores, factory platforms, and the connections between them. We design for the day things go wrong, and we stay accountable after launch.",
} as const;

/**
 * Trust strip (brief 6.4). Named in text only, no third-party logos. Samsung is
 * delivered through Cheil (not a direct client) and always appears as
 * "Samsung (via Cheil)", the trademark-safe framing the brief specifies.
 */
export const credibility = {
  label: "Trusted in production by",
  names: ["Samsung (via Cheil)", "Brand Name Marketing", "FG Uniforms"],
} as const;
