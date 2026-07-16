import { boxFaces, pts, BLOCK_FILLS, type Box, type Family } from "@/lib/iso";

/**
 * A single isometric cuboid as an SVG <g> of three flat-fill faces.
 * `fills` overrides the family palette (used for neutral/ink frame blocks).
 */
export function IsoBlock({
  box,
  family,
  fills,
  opacity,
  className,
  "data-piece": dataPiece,
}: {
  box: Box;
  family?: Family;
  fills?: { light: string; mid: string; dark: string };
  opacity?: number;
  className?: string;
  "data-piece"?: string;
}) {
  const f = boxFaces(...box);
  const c = fills ?? BLOCK_FILLS[family ?? "teal"];
  return (
    <g opacity={opacity} className={className} data-piece={dataPiece}>
      <polygon points={pts(f.left)} fill={c.dark} />
      <polygon points={pts(f.right)} fill={c.mid} />
      <polygon points={pts(f.top)} fill={c.light} />
    </g>
  );
}
