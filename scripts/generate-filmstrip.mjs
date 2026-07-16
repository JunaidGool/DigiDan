// Renders the hero assembly as a 4-frame filmstrip (scattered -> assembled).
import { writeFileSync } from "node:fs";

const TW = 34, TH = 17, H = 34;
const iso = (x, y, z) => [(x - y) * TW, (x + y) * TH - z * H];
const FILLS = {
  teal: { light: "#5DCAA5", mid: "#1D9E75", dark: "#147A5A" },
  coral: { light: "#F0997B", mid: "#D85A30", dark: "#A8431F" },
  amber: { light: "#FAC775", mid: "#EF9F27", dark: "#C67C10" },
};
const faces = (x0, y0, z0, x1, y1, z1) => ({
  top: [iso(x0, y0, z1), iso(x1, y0, z1), iso(x1, y1, z1), iso(x0, y1, z1)],
  right: [iso(x1, y0, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x1, y0, z1)],
  left: [iso(x0, y1, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x0, y1, z1)],
});
const P = (a) => a.map((p) => p.map((n) => n.toFixed(2)).join(",")).join(" ");
const cen = (a) => [a.reduce((s, p) => s + p[0], 0) / a.length, a.reduce((s, p) => s + p[1], 0) / a.length];

const PIECES = [
  { fam: "teal", box: [0, 0, 0, 2, 2, 1], ex: [0, 46] },
  { fam: "amber", box: [1, 0, 1, 2, 1, 3], ex: [30, -78] },
  { fam: "coral", box: [0, 1, 1, 1, 2, 2], ex: [-52, 22] },
];

// viewBox covering scattered extent
const allPts = PIECES.flatMap((p) => {
  const f = faces(...p.box);
  return [...f.top, ...f.left, ...f.right].flatMap((pt) => [pt, [pt[0] + p.ex[0], pt[1] + p.ex[1]]]);
});
const xs = allPts.map((p) => p[0]), ys = allPts.map((p) => p[1]);
const pad = 12;
const minX = Math.min(...xs) - pad, minY = Math.min(...ys) - pad;
const w = Math.max(...xs) - minX + pad, h = Math.max(...ys) - minY + pad;

function frame(p, ox) {
  // p: 1 = scattered, 0 = assembled
  const conns = PIECES.filter((q) => q.fam !== "teal").map((q) => {
    const home = cen(faces(...q.box).top);
    const away = [home[0] + q.ex[0] * p, home[1] + q.ex[1] * p];
    return `<line x1="${home[0]}" y1="${home[1]}" x2="${away[0]}" y2="${away[1]}" stroke="#26261F" stroke-width="1.5" stroke-dasharray="3 5" stroke-linecap="round" opacity="${(0.4 * p).toFixed(2)}"/>`;
  }).join("");
  const blocks = PIECES.map((q) => {
    const f = faces(...q.box);
    const c = FILLS[q.fam];
    const tx = q.ex[0] * p, ty = q.ex[1] * p;
    return `<g transform="translate(${(ox + tx).toFixed(2)},${ty.toFixed(2)})"><polygon points="${P(f.left)}" fill="${c.dark}"/><polygon points="${P(f.right)}" fill="${c.mid}"/><polygon points="${P(f.top)}" fill="${c.light}"/></g>`;
  }).join("");
  // connectors drawn relative to origin, shift by ox
  return `<g transform="translate(${ox},0)">${conns}</g>${blocks}`;
}

const frames = [1, 0.62, 0.28, 0];
const gap = 24;
const panelW = w + gap;
const inner = frames.map((p, i) => frame(p, minX * -1 + i * panelW + minX)).join("");
// simpler: place each frame in its own translated group using local coords
const groups = frames
  .map((p, i) => `<g transform="translate(${i * panelW},0)"><svg x="0" y="0" width="${w}" height="${h}" viewBox="${minX} ${minY} ${w} ${h}">${frame(p, 0).replace(/translate\((-?\d)/, "translate($1")}</svg><text x="${w / 2}" y="${h - 4}" text-anchor="middle" font-family="monospace" font-size="11" fill="#8A8778">${["scattered", "connectors + converge", "clicking in", "assembled"][i]}</text></g>`)
  .join("");

const board = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${panelW * frames.length} ${h + 16}"><rect x="-50" y="-50" width="${panelW * frames.length + 100}" height="${h + 116}" fill="#FAF9F6"/>${groups}</svg>\n`;
writeFileSync(new URL("../preview/hero-filmstrip.svg", import.meta.url), board);
console.log("wrote preview/hero-filmstrip.svg");
