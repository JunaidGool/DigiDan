// The War Room mark: an isometric pentagon war-table (5 advisors) with accent
// seat-markers at each vertex and a glowing amber verdict monolith at centre.
// Dark tactical palette, amber command accent: the War Room's own identity.
import { writeFileSync } from "node:fs";

const S = 30, H = 30;
const C30 = Math.cos(Math.PI / 6), S30 = 0.5;
const proj = (x, y, z) => [(x - y) * C30 * S, (x + y) * S30 * S - z * H];
const P = (a) => a.map((p) => p.map((n) => n.toFixed(2)).join(",")).join(" ");
const sum = (v) => v[0] + v[1];

// palette
const DAIS_TOP = "#1b150d";
const DAIS_SIDE = "#0f0b07";
const DAIS_EDGE = "#f5a623";
const CORE = { top: "#ffce6a", mid: "#f5a623", dark: "#b9781a" };
const SEAT_ACCENTS = ["#ff6b5e", "#f5a623", "#2ec4b6", "#5aa9ff", "#cdd631"];

const TOPZ = 0.5; // dais thickness
const R = 1.9; // pentagon radius

// pentagon vertices (ground plane)
const verts = Array.from({ length: 5 }, (_, i) => {
  const a = (Math.PI / 180) * (i * 72 - 90);
  return [R * Math.cos(a), R * Math.sin(a)];
});

// --- dais ---
const top = verts.map((v) => proj(v[0], v[1], TOPZ));
const bot = verts.map((v) => proj(v[0], v[1], 0));

// side faces (one per edge), painter-sorted back->front by edge-midpoint depth
const sides = verts
  .map((v, i) => {
    const j = (i + 1) % 5;
    const quad = [top[i], top[j], bot[j], bot[i]];
    const depth = (sum(v) + sum(verts[j])) / 2;
    return { quad, depth };
  })
  .sort((a, b) => a.depth - b.depth);

// --- a small box helper (centred at cx,cy on the dais) ---
function box(cx, cy, half, z0, z1, fill) {
  const c = [
    [cx - half, cy - half],
    [cx + half, cy - half],
    [cx + half, cy + half],
    [cx - half, cy + half],
  ];
  const topF = c.map((p) => proj(p[0], p[1], z1));
  const rightF = [proj(cx + half, cy - half, z0), proj(cx + half, cy + half, z0), proj(cx + half, cy + half, z1), proj(cx + half, cy - half, z1)];
  const leftF = [proj(cx - half, cy + half, z0), proj(cx + half, cy + half, z0), proj(cx + half, cy + half, z1), proj(cx - half, cy + half, z1)];
  const dark = typeof fill === "string" ? shade(fill, 0.6) : fill.dark;
  const mid = typeof fill === "string" ? shade(fill, 0.82) : fill.mid;
  const light = typeof fill === "string" ? fill : fill.top;
  return { g: `<polygon points="${P(leftF)}" fill="${dark}"/><polygon points="${P(rightF)}" fill="${mid}"/><polygon points="${P(topF)}" fill="${light}"/>`, depth: cx + cy };
}
function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * f), g = Math.round(((n >> 8) & 255) * f), b = Math.round((n & 255) * f);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// seat markers at each vertex + central verdict block, painter-sorted
const props = verts
  .map((v, i) => box(v[0] * 0.82, v[1] * 0.82, 0.28, TOPZ, TOPZ + 0.45, SEAT_ACCENTS[i]))
  .concat([box(0, 0, 0.5, TOPZ, TOPZ + 1.35, CORE)])
  .sort((a, b) => a.depth - b.depth);

// bounds
const allPts = [...top, ...bot, proj(0, 0, TOPZ + 1.35)];
const xs = allPts.map((p) => p[0]), ys = allPts.map((p) => p[1]);
const pad = 26;
const minX = Math.min(...xs) - pad, minY = Math.min(...ys) - pad - 6;
const w = Math.max(...xs) - minX + pad, h = Math.max(...ys) - minY + pad;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX.toFixed(1)} ${minY.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stop-color="#f5a623" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#f5a623" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="${(proj(0,0,TOPZ+0.6)[0]).toFixed(1)}" cy="${(proj(0,0,TOPZ+0.6)[1]).toFixed(1)}" rx="${(w*0.42).toFixed(1)}" ry="${(h*0.38).toFixed(1)}" fill="url(#glow)"/>
  ${sides.map((s) => `<polygon points="${P(s.quad)}" fill="${DAIS_SIDE}" stroke="${DAIS_EDGE}" stroke-opacity="0.25" stroke-width="0.75"/>`).join("\n  ")}
  <polygon points="${P(top)}" fill="${DAIS_TOP}" stroke="${DAIS_EDGE}" stroke-width="1.5"/>
  <polygon points="${P(top.map((_,i)=>proj(verts[i][0]*0.5,verts[i][1]*0.5,TOPZ)))}" fill="none" stroke="${DAIS_EDGE}" stroke-opacity="0.4" stroke-width="0.75"/>
  ${props.map((p) => p.g).join("\n  ")}
</svg>
`;
writeFileSync(new URL("../preview/warroom-logo.svg", import.meta.url), svg);
console.log("wrote preview/warroom-logo.svg");
