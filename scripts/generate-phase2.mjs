// Renders the Phase 2 illustrations to standalone SVGs for visual verification.
// Uses the same isometric math as lib/iso.ts.
import { writeFileSync } from "node:fs";

const TW = 34, TH = 17, H = 34;
const iso = (x, y, z) => [(x - y) * TW, (x + y) * TH - z * H];
const FILLS = {
  teal: { light: "#5DCAA5", mid: "#1D9E75", dark: "#147A5A" },
  coral: { light: "#F0997B", mid: "#D85A30", dark: "#A8431F" },
  amber: { light: "#FAC775", mid: "#EF9F27", dark: "#C67C10" },
  ink: { light: "#3A3A31", mid: "#26261F", dark: "#17170F" },
  tealDeep: { light: "#0C6B54", mid: "#085041", dark: "#05352A" },
};
const faces = (x0, y0, z0, x1, y1, z1) => ({
  top: [iso(x0, y0, z1), iso(x1, y0, z1), iso(x1, y1, z1), iso(x0, y1, z1)],
  right: [iso(x1, y0, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x1, y0, z1)],
  left: [iso(x0, y1, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x0, y1, z1)],
});
const P = (a) => a.map((p) => p.map((n) => n.toFixed(2)).join(",")).join(" ");
const cen = (a) => [a.reduce((s, p) => s + p[0], 0) / a.length, a.reduce((s, p) => s + p[1], 0) / a.length];
function block(box, fill, extra = "") {
  const f = faces(...box);
  return `<g>${extra}<polygon points="${P(f.left)}" fill="${fill.dark}"/><polygon points="${P(f.right)}" fill="${fill.mid}"/><polygon points="${P(f.top)}" fill="${fill.light}"/></g>`;
}
function vb(pointsArr, pad = 10) {
  const xs = pointsArr.map((p) => p[0]), ys = pointsArr.map((p) => p[1]);
  const minX = Math.min(...xs) - pad, minY = Math.min(...ys) - pad;
  return `${minX} ${minY} ${Math.max(...xs) - minX + pad} ${Math.max(...ys) - minY + pad}`;
}
const allPts = (boxes) => boxes.flatMap((b) => { const f = faces(...b); return [...f.top, ...f.left, ...f.right]; });
const wrap = (inner, box) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}"><rect x="-999" y="-999" width="3000" height="3000" fill="#FAF9F6"/>${inner}</svg>\n`;

// --- staircase ---
const stFam = ["teal", "teal", "amber", "amber", "amber", "coral", "coral"];
const stBoxes = stFam.map((_, i) => [i, 0, 0, i + 1, 1, 1.1 + i * 0.5]);
const stSvg = stBoxes
  .map((b, i) => {
    const f = faces(...b);
    const c = cen(f.top);
    const num = `<text x="${c[0]}" y="${c[1]}" dominant-baseline="central" text-anchor="middle" font-size="20" font-weight="500" fill="#26261F">${i + 1}</text>`;
    return block(b, FILLS[stFam[i]], "") + num;
  })
  .join("");
writeFileSync(new URL("../preview/p2-staircase.svg", import.meta.url), wrap(stSvg, vb(allPts(stBoxes))));

// --- harness cage ---
const BASE = [0, 0, 0, 3, 3, 0.4];
const AI = [1.05, 1.05, 0.4, 1.95, 1.95, 1.6];
const PIL = [[0, 0, 0.4, 0.4, 0.4, 2.9], [2.6, 0, 0.4, 3, 0.4, 2.9], [0, 2.6, 0.4, 0.4, 3, 2.9], [2.6, 2.6, 0.4, 3, 3, 2.9]];
const cageSvg =
  block(BASE, FILLS.tealDeep) + block(PIL[0], FILLS.ink) + block(PIL[1], FILLS.ink) +
  block(PIL[2], FILLS.ink) + block(AI, FILLS.amber) + block(PIL[3], FILLS.ink);
writeFileSync(new URL("../preview/p2-cage.svg", import.meta.url), wrap(cageSvg, vb([BASE, AI, ...PIL].flatMap((b) => { const f = faces(...b); return [...f.top, ...f.left, ...f.right]; }))));

// --- exploded logo ---
const PIECES = [
  { fam: "teal", box: [0, 0, 0, 2, 2, 1], ex: [0, 46] },
  { fam: "amber", box: [1, 0, 1, 2, 1, 3], ex: [30, -78] },
  { fam: "coral", box: [0, 1, 1, 1, 2, 2], ex: [-52, 22] },
];
const conns = PIECES.filter((p) => p.fam !== "teal").map((p) => {
  const home = cen(faces(...p.box).top);
  return `<line x1="${home[0]}" y1="${home[1]}" x2="${home[0] + p.ex[0]}" y2="${home[1] + p.ex[1]}" stroke="#26261F" stroke-width="1.5" stroke-dasharray="3 5" opacity="0.4"/>`;
}).join("");
const exSvg = conns + PIECES.map((p) => `<g transform="translate(${p.ex[0]},${p.ex[1]})">${block(p.box, FILLS[p.fam])}</g>`).join("");
const exPts = PIECES.flatMap((p) => { const f = faces(...p.box); return [...f.top, ...f.left, ...f.right].map((pt) => [pt[0] + p.ex[0], pt[1] + p.ex[1]]); });
writeFileSync(new URL("../preview/p2-exploded.svg", import.meta.url), wrap(exSvg, vb(exPts)));

console.log("wrote p2-staircase.svg, p2-cage.svg, p2-exploded.svg");
