// WCAG 2.1 contrast audit for every text/background pairing actually used,
// including opacity-reduced text (blended over its background first).
// AA: normal text >= 4.5, large text (>=24px, or >=18.66px bold) >= 3.0.

// Seventies palette (brief 4.1). Kept in lockstep with tailwind.config.ts and
// globals.css :root. `paper` = cream canvas, `paper-warm` = sand band.
const C = {
  "teal-100": "#D6E9E1", "teal-300": "#8FCBB4", "teal-500": "#14705C", "teal-900": "#0B4A3B",
  "coral-100": "#F6E0D2", "coral-300": "#E89B6E", "coral-500": "#C4531D", "coral-900": "#9C3F14",
  "amber-100": "#F7EACB", "amber-200": "#F2C36B", "amber-400": "#E3A21A", "amber-900": "#8A5E08",
  "olive-100": "#E4E8CF", "olive-300": "#9FAF62", "olive-500": "#6B7A34", "olive-900": "#3F4A1C",
  ink: "#3B2D20", brown: "#6E5638", faint: "#A18B60",
  paper: "#F6EDD8", "paper-warm": "#EFE1C2", line: "#E1CFA9", muted: "#6E5638",
};

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const blend = (fg, bg, a) => fg.map((c, i) => Math.round(c * a + bg[i] * (1 - a)));
const ratio = (a, b) => { const [L1, L2] = [lum(a), lum(b)].sort((x, y) => y - x); return (L1 + 0.05) / (L2 + 0.05); };

// [fg token, bg token, alpha, min ratio (3 for large text), label]
const CHECKS = [
  ["ink", "paper", 1, 4.5, "body text"],
  ["ink", "paper", 0.8, 4.5, "ink/80 lead+body"],
  ["ink", "paper-warm", 0.8, 4.5, "ink/80 on warm"],
  ["ink", "paper", 0.75, 4.5, "ink/75 small"],
  ["ink", "paper", 0.7, 4.5, "ink/70 footer desc"],
  ["ink", "paper", 0.7, 4.5, "ink/70 mono stack 12px"],
  ["muted", "paper", 1, 4.5, "muted eyebrow/labels"],
  ["muted", "paper-warm", 1, 4.5, "muted on warm"],
  // Tinted service tiles: same-family dark text at full opacity on the 100 tint.
  ["teal-900", "teal-100", 1, 4.5, "teal tile title + body"],
  ["coral-900", "coral-100", 1, 4.5, "orange tile title + body"],
  ["amber-900", "amber-100", 1, 4.5, "gold tile title + body"],
  ["olive-900", "olive-100", 1, 4.5, "olive tile title + body"],
  ["paper", "ink", 1, 4.5, "cream text on ink buttons/footer"],
  ["teal-900", "paper", 1, 4.5, "teal-900 inline links on cream"],
  ["coral-900", "paper", 1, 4.5, "orange-d eyebrow + required asterisk on cream"],
  // Colour-band text rules (brief 4.1): teal band carries cream text; the gold
  // band carries ink (never cream, never gold-d which is too low); the orange
  // closing band carries only the large Fraunces display line in cream.
  ["paper", "teal-500", 1, 4.5, "cream text on deep-teal band"],
  ["ink", "amber-400", 1, 4.5, "ink text on harvest-gold band"],
  ["paper", "coral-500", 1, 3.0, "cream large display line on burnt-orange band"],
  // Staircase numbers: warm-brown ink on each light top face (large text).
  ["ink", "teal-300", 1, 3.0, "step number on teal top face (large)"],
  ["ink", "coral-300", 1, 3.0, "step number on orange top face (large)"],
  ["ink", "amber-200", 1, 3.0, "step number on gold top face (large)"],
  ["ink", "olive-300", 1, 3.0, "step number on olive top face (large)"],
];

let fails = 0;
for (const [fg, bg, a, min, label] of CHECKS) {
  const eff = a < 1 ? blend(hex(C[fg]), hex(C[bg]), a) : hex(C[fg]);
  const r = ratio(eff, hex(C[bg]));
  const pass = r >= min;
  if (!pass) fails++;
  console.log(
    `${pass ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(5)} (need ${min})  ${fg}${a < 1 ? `/${a}` : ""} on ${bg}: ${label}`
  );
}
console.log(`\n${fails} failure(s).`);
