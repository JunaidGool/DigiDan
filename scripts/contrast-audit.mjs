// WCAG 2.1 contrast audit for every text/background pairing actually used,
// including opacity-reduced text (blended over its background first).
// AA: normal text >= 4.5, large text (>=24px, or >=18.66px bold) >= 3.0.

const C = {
  "teal-100": "#E1F5EE", "teal-300": "#5DCAA5", "teal-500": "#1D9E75", "teal-900": "#085041",
  "coral-100": "#FAECE7", "coral-300": "#F0997B", "coral-500": "#D85A30", "coral-900": "#712B13",
  "amber-100": "#FAEEDA", "amber-200": "#FAC775", "amber-400": "#EF9F27", "amber-900": "#633806",
  ink: "#26261F", paper: "#FFFFFF", "paper-warm": "#FAF9F6", line: "#E5E3DC", muted: "#726F63",
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
  ["teal-900", "teal-100", 1, 4.5, "teal tile title"],
  ["teal-900", "teal-100", 0.8, 4.5, "teal tile summary/80"],
  ["teal-900", "teal-100", 0.9, 4.5, "teal detail/90"],
  ["coral-900", "coral-100", 1, 4.5, "coral tile title"],
  ["coral-900", "coral-100", 0.8, 4.5, "coral tile summary/80"],
  ["coral-900", "coral-100", 0.9, 4.5, "coral detail/90"],
  ["amber-900", "amber-100", 1, 4.5, "amber tile title"],
  ["amber-900", "amber-100", 0.8, 4.5, "amber tile summary/80"],
  ["amber-900", "amber-100", 0.9, 4.5, "amber detail/90"],
  ["paper", "ink", 1, 4.5, "button text on ink"],
  ["teal-900", "paper", 1, 4.5, "teal-900 inline links"],
  ["teal-900", "teal-300", 1, 3.0, "staircase number on teal top face (large)"],
  ["coral-900", "coral-300", 1, 3.0, "staircase number on coral top face (large)"],
  ["amber-900", "amber-200", 1, 3.0, "staircase number on amber top face (large)"],
  ["coral-900", "paper", 1, 4.5, "required asterisk"],
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
