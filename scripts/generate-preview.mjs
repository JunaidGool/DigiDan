// Builds a presentation board (assembled + exploded + palette) for identity sign-off.
import { writeFileSync } from "node:fs";

const TW = 34, TH = 17, H = 34;
const iso = (x, y, z) => [(x - y) * TW, (x + y) * TH - z * H];
const BLOCKS = {
  teal: { light: "#5DCAA5", mid: "#1D9E75", dark: "#147A5A" },
  coral: { light: "#F0997B", mid: "#D85A30", dark: "#A8431F" },
  amber: { light: "#FAC775", mid: "#EF9F27", dark: "#C67C10" },
};
const PIECES = {
  teal: [0, 0, 0, 2, 2, 1],
  amber: [1, 0, 1, 2, 1, 3],
  coral: [0, 1, 1, 1, 2, 2],
};
// direction each piece flies out along for the exploded/assembly view
const EXPLODE = { teal: [0, 40], amber: [26, -70], coral: [-46, 20] };

const P = (a) => a.map((p) => p.map((n) => n.toFixed(2)).join(",")).join(" ");
function faces(x0, y0, z0, x1, y1, z1) {
  return {
    top: [iso(x0, y0, z1), iso(x1, y0, z1), iso(x1, y1, z1), iso(x0, y1, z1)],
    right: [iso(x1, y0, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x1, y0, z1)],
    left: [iso(x0, y1, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x0, y1, z1)],
  };
}
function pieceG(name, dx = 0, dy = 0) {
  const f = faces(...PIECES[name]);
  const c = BLOCKS[name];
  return `<g transform="translate(${dx},${dy})">
    <polygon points="${P(f.left)}" fill="${c.dark}"/>
    <polygon points="${P(f.right)}" fill="${c.mid}"/>
    <polygon points="${P(f.top)}" fill="${c.light}"/>
  </g>`;
}
const centroid = (name) => {
  const [x0, y0, z0, x1, y1, z1] = PIECES[name];
  return iso((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
};

// assembled mark group
const assembled = `<g>${["teal", "amber", "coral"].map((n) => pieceG(n)).join("")}</g>`;
// exploded mark group with dotted connectors
const connectors = ["amber", "coral"]
  .map((n) => {
    const c = centroid(n);
    const e = EXPLODE[n];
    return `<line x1="${c[0]}" y1="${c[1]}" x2="${c[0] + e[0]}" y2="${c[1] + e[1]}" stroke="#26261F" stroke-width="1.5" stroke-dasharray="3 5" stroke-linecap="round" opacity="0.45"/>`;
  })
  .join("");
const exploded = `<g>${connectors}${["teal", "amber", "coral"]
  .map((n) => pieceG(n, EXPLODE[n][0], EXPLODE[n][1]))
  .join("")}</g>`;

const swatch = (x, hex, label) =>
  `<rect x="${x}" y="470" width="70" height="42" rx="4" fill="${hex}"/><text x="${x + 6}" y="528" font-family="monospace" font-size="11" fill="#26261F">${label}</text>`;
const palette = [
  ["#1D9E75", "teal-500"], ["#5DCAA5", "teal-300"],
  ["#D85A30", "coral-500"], ["#F0997B", "coral-300"],
  ["#EF9F27", "amber-400"], ["#FAC775", "amber-200"],
  ["#26261F", "ink"], ["#FAF9F6", "paper-w"],
].map((s, i) => swatch(90 + i * 92, s[0], s[1])).join("");

const board = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 560" font-family="'Space Grotesk','Helvetica Neue',Arial,sans-serif">
  <rect width="900" height="560" fill="#FAF9F6"/>
  <rect x="0" y="0" width="450" height="440" fill="#FFFFFF"/>
  <text x="40" y="52" font-size="13" letter-spacing="2" fill="#8A8778">ASSEMBLED MARK</text>
  <g transform="translate(225,230) scale(0.95)">${assembled}</g>
  <g transform="translate(150,378)">
    <text font-size="52" font-weight="500" letter-spacing="14" fill="#26261F">d g d n</text>
  </g>
  <text x="490" y="52" font-size="13" letter-spacing="2" fill="#8A8778">EXPLODED &#183; INTEGRATION CUE</text>
  <g transform="translate(670,250) scale(0.95)">${exploded}</g>
  <text x="40" y="452" font-size="13" letter-spacing="2" fill="#8A8778">PALETTE</text>
  ${palette}
</svg>
`;
writeFileSync(new URL("../preview/board.svg", import.meta.url), board);
console.log("wrote preview/board.svg");
