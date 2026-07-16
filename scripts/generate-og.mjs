// Generates the 1200x630 OpenGraph image featuring the assembled block motif.
// Rendered via qlmanage (which pads to square), so we author on a 1200x1200
// canvas with content centred in the middle 630 band and centre-crop after.
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
const block = (box, fam) => {
  const f = faces(...box), c = FILLS[fam];
  return `<polygon points="${P(f.left)}" fill="${c.dark}"/><polygon points="${P(f.right)}" fill="${c.mid}"/><polygon points="${P(f.top)}" fill="${c.light}"/>`;
};
const mark =
  block([0, 0, 0, 2, 2, 1], "teal") +
  block([1, 0, 1, 2, 1, 3], "amber") +
  block([0, 1, 1, 1, 2, 2], "coral");

const OY = 285; // top of the visible 630 band within the 1200 square

const content = `
  <rect x="0" y="0" width="1200" height="10" fill="#1D9E75"/>
  <rect x="0" y="0" width="800" height="10" fill="#EF9F27"/>
  <rect x="0" y="0" width="400" height="10" fill="#D85A30"/>
  <g transform="translate(78,70)">
    <text font-size="28" font-weight="500" letter-spacing="13" fill="#26261F">d g d n</text>
  </g>
  <g transform="translate(78,0)">
    <text y="185" font-size="58" font-weight="500" fill="#26261F">Financial-grade software,</text>
    <text y="253" font-size="58" font-weight="500" fill="#26261F">built block by block.</text>
    <text y="322" font-size="26" fill="#4A4A40">Engineering that connects the whole system.</text>
    <text y="470" font-size="20" font-family="monospace" fill="#726F63">South African software engineering partner</text>
    <text y="506" font-size="20" font-family="monospace" fill="#085041">digidan.co.za</text>
  </g>
  <g transform="translate(1012,430) scale(1.55)">${mark}</g>
`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200" font-family="'Space Grotesk','Helvetica Neue',Arial,sans-serif">
  <rect width="1200" height="1200" fill="#FAF9F6"/>
  <g transform="translate(0,${OY})">${content}</g>
</svg>
`;
writeFileSync(new URL("../preview/og.svg", import.meta.url), svg);
console.log("wrote preview/og.svg (1200x1200, content in middle 630 band)");
