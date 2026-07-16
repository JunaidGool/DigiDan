/**
 * Shared isometric projection for all hand-authored block illustrations.
 * One projection, used everywhere, so the logo, staircase, portfolio cubes
 * and harness cage all share exact geometry. Flat fills, three-face convention.
 */

export const TW = 34; // tile half-width (rhombus 2:1)
export const TH = 17; // tile half-height
export const H = 34; // pixel height of one z-unit (cubic)

export type Pt = [number, number];
export type Box = [number, number, number, number, number, number];
export type Family = "teal" | "coral" | "amber";

export const iso = (x: number, y: number, z: number): Pt => [
  (x - y) * TW,
  (x + y) * TH - z * H,
];

// top = light face, right (x=x1) = mid, left (y=y1) = derived flat dark face.
export const BLOCK_FILLS: Record<Family, { light: string; mid: string; dark: string }> = {
  teal: { light: "#5DCAA5", mid: "#1D9E75", dark: "#147A5A" },
  coral: { light: "#F0997B", mid: "#D85A30", dark: "#A8431F" },
  amber: { light: "#FAC775", mid: "#EF9F27", dark: "#C67C10" },
};

export function boxFaces(
  x0: number,
  y0: number,
  z0: number,
  x1: number,
  y1: number,
  z1: number
): { top: Pt[]; right: Pt[]; left: Pt[] } {
  return {
    top: [iso(x0, y0, z1), iso(x1, y0, z1), iso(x1, y1, z1), iso(x0, y1, z1)],
    right: [iso(x1, y0, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x1, y0, z1)],
    left: [iso(x0, y1, z0), iso(x1, y1, z0), iso(x1, y1, z1), iso(x0, y1, z1)],
  };
}

export const pts = (arr: Pt[]): string =>
  arr.map((p) => p.map((n) => n.toFixed(2)).join(",")).join(" ");

export const centroid = (arr: Pt[]): Pt => {
  const n = arr.length;
  return [
    arr.reduce((s, p) => s + p[0], 0) / n,
    arr.reduce((s, p) => s + p[1], 0) / n,
  ];
};

export function bounds(all: Pt[], pad = 6) {
  const xs = all.map((p) => p[0]);
  const ys = all.map((p) => p[1]);
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  return {
    minX,
    minY,
    w: Math.max(...xs) - minX + pad,
    h: Math.max(...ys) - minY + pad,
    viewBox: `${minX.toFixed(2)} ${minY.toFixed(2)} ${(Math.max(...xs) - minX + pad).toFixed(2)} ${(Math.max(...ys) - minY + pad).toFixed(2)}`,
  };
}
