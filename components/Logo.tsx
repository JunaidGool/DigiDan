import { site } from "@/content/site";
import {
  boxFaces,
  pts,
  centroid,
  bounds,
  BLOCK_FILLS,
  type Box,
  type Family,
  type Pt,
} from "@/lib/iso";

/**
 * DigiDan isometric block mark: three separable pieces (teal foundation,
 * amber tower, coral cube) that assemble into one solid structure.
 * Geometry comes from lib/iso so every block on the site shares one projection.
 *
 * `exploded` pulls the pieces apart along their assembly vectors and draws the
 * dotted integration connectors. This is the start state of the hero animation
 * (Phase 3 tweens between exploded and assembled).
 */

export type Piece = { name: Family; box: Box; explode: Pt };

export const PIECES: Piece[] = [
  { name: "teal", box: [0, 0, 0, 2, 2, 1], explode: [0, 46] },
  { name: "amber", box: [1, 0, 1, 2, 1, 3], explode: [30, -78] },
  { name: "coral", box: [0, 1, 1, 1, 2, 2], explode: [-52, 22] },
];

// viewBox covers both assembled and exploded extents so neither state clips.
const ALL_POINTS: Pt[] = PIECES.flatMap((p) => {
  const f = boxFaces(...p.box);
  const flat = [...f.top, ...f.left, ...f.right];
  const moved = flat.map((pt) => [pt[0] + p.explode[0], pt[1] + p.explode[1]] as Pt);
  return [...flat, ...moved];
});
export const VB = bounds(ALL_POINTS, 8).viewBox;

function PieceG({ piece, exploded }: { piece: Piece; exploded: boolean }) {
  const f = boxFaces(...piece.box);
  const c = BLOCK_FILLS[piece.name];
  const [dx, dy] = exploded ? piece.explode : [0, 0];
  return (
    <g
      data-piece={piece.name}
      style={{ transform: `translate(${dx}px, ${dy}px)` }}
    >
      <polygon points={pts(f.left)} fill={c.dark} />
      <polygon points={pts(f.right)} fill={c.mid} />
      <polygon points={pts(f.top)} fill={c.light} />
    </g>
  );
}

export function LogoMark({
  size = 40,
  className,
  title = "DigiDan",
  exploded = false,
}: {
  size?: number;
  className?: string;
  title?: string;
  exploded?: boolean;
}) {
  const [, , vbw, vbh] = VB.split(" ").map(Number);
  return (
    <svg
      viewBox={VB}
      width={size}
      height={(size * vbh) / vbw}
      className={className}
      role="img"
      aria-label={title}
    >
      {/* integration connectors: drawn from each moving piece back to home */}
      {exploded &&
        PIECES.filter((p) => p.name !== "teal").map((p) => {
          const home = centroid(boxFaces(...p.box).top);
          const away: Pt = [home[0] + p.explode[0], home[1] + p.explode[1]];
          return (
            <line
              key={p.name}
              x1={home[0]}
              y1={home[1]}
              x2={away[0]}
              y2={away[1]}
              stroke="#26261F"
              strokeWidth={1.5}
              strokeDasharray="3 5"
              strokeLinecap="round"
              opacity={0.4}
            />
          );
        })}
      {PIECES.map((p) => (
        <PieceG key={p.name} piece={p} exploded={exploded} />
      ))}
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        letterSpacing: "0.22em",
      }}
      aria-hidden="true"
    >
      {site.wordmark}
    </span>
  );
}

export function LogoLockup({ size = 34 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} />
      <Wordmark className="text-[1.05rem] text-ink" />
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
