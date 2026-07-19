// Generates the DigiDan isometric block mark as inline SVG.
// Three separable cuboid pieces (teal foundation, coral + amber towers)
// that read as modular components assembled into one solid structure.
// Flat fills only, three-face convention, no gradients. Per brand rules.
import { writeFileSync } from "node:fs";

// --- isometric projection ---------------------------------------------------
const TW = 34; // tile half-width  (rhombus is 2:1)
const TH = 17; // tile half-height
const H = 34; // pixel height of one z-unit (cubic)

const iso = (x, y, z) => [(x - y) * TW, (x + y) * TH - z * H];

// --- brand block palettes (top=light, right=mid, left=dark) -----------------
// dark faces are flat, brand-derived shades. No gradients.
const BLOCKS = {
  teal: { light: "#5DCAA5", mid: "#1D9E75", dark: "#147A5A" },
  coral: { light: "#F0997B", mid: "#D85A30", dark: "#A8431F" },
  amber: { light: "#FAC775", mid: "#EF9F27", dark: "#C67C10" },
};

// a box: origin (x0,y0,z0) to (x1,y1,z1); returns the 3 visible face polygons
function boxFaces(x0, y0, z0, x1, y1, z1) {
  const top = [
    iso(x0, y0, z1),
    iso(x1, y0, z1),
    iso(x1, y1, z1),
    iso(x0, y1, z1),
  ];
  const right = [
    // x = x1 face (screen right)
    iso(x1, y0, z0),
    iso(x1, y1, z0),
    iso(x1, y1, z1),
    iso(x1, y0, z1),
  ];
  const left = [
    // y = y1 face (screen left)
    iso(x0, y1, z0),
    iso(x1, y1, z0),
    iso(x1, y1, z1),
    iso(x0, y1, z1),
  ];
  return { top, right, left };
}

// composition: 2x2x1 teal base, amber tower (back-right), coral cube (front-left)
const PIECES = [
  { name: "teal", box: [0, 0, 0, 2, 2, 1] }, // foundation slab
  { name: "amber", box: [1, 0, 1, 2, 1, 3] }, // tall tower, back-right
  { name: "coral", box: [0, 1, 1, 1, 2, 2] }, // cube, front-left
];

const pts = (arr) => arr.map((p) => p.map((n) => n.toFixed(2)).join(",")).join(" ");

// collect all points to size the viewBox
const all = [];
const groups = PIECES.map(({ name, box }) => {
  const f = boxFaces(...box);
  all.push(...f.top, ...f.right, ...f.left);
  const c = BLOCKS[name];
  return `  <g data-piece="${name}">
    <polygon points="${pts(f.left)}" fill="${c.dark}"/>
    <polygon points="${pts(f.right)}" fill="${c.mid}"/>
    <polygon points="${pts(f.top)}" fill="${c.light}"/>
  </g>`;
});

const xs = all.map((p) => p[0]);
const ys = all.map((p) => p[1]);
const pad = 6;
const minX = Math.min(...xs) - pad;
const minY = Math.min(...ys) - pad;
const w = Math.max(...xs) - minX + pad;
const h = Math.max(...ys) - minY + pad;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX.toFixed(2)} ${minY.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)}" role="img" aria-labelledby="dgdn-logo-title">
  <title id="dgdn-logo-title">DigiDan</title>
${groups.join("\n")}
</svg>
`;

writeFileSync(new URL("../preview/logo-mark.svg", import.meta.url), svg);
console.log(`viewBox: ${minX.toFixed(1)} ${minY.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`);
console.log("wrote preview/logo-mark.svg");
