/**
 * DigiDan brand palette. The three logo colours drive the site's categorical
 * accents, mirroring the three parts of the mark (teal base, orange tower,
 * yellow cube). Orange remains the primary action colour everywhere; teal and
 * yellow return as the supporting brand accents.
 */
export const BRAND = {
  teal: "#2DE1C6",
  orange: "#F07E26",
  yellow: "#F5C518",
} as const;

// Cycled accent used for anything that comes in threes (capabilities, nodes).
export const BRAND_ACCENTS = [BRAND.teal, BRAND.orange, BRAND.yellow] as const;

export const accentAt = (i: number) =>
  BRAND_ACCENTS[i % BRAND_ACCENTS.length];
