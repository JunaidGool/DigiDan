/**
 * DigiDan logo mark (spec section 7).
 *
 * A reconstruction of the company mark: three isometric blocks (teal base,
 * orange tower, yellow cube) built from the brand colours in spec 2.1. Before
 * launch these polygons should be replaced with paths from the original vector
 * file (open item in the decisions log).
 *
 * Two variants:
 *  - "solid"  tri-colour. Appears full size in exactly one place: the hero cube.
 *  - "outline" single-colour amber wireframe. Nav, footer, favicon.
 * The mark is never animated, tilted or recoloured. The cube moves; this does not.
 */

const VIEWBOX = "-74 -91 148 165";

// Per-face shades (top = light, right = mid, left = dark) for each brand colour.
const BLOCKS = {
  base: {
    // teal
    left: { points: "-68,34 0,68 0,34 -68,0", fill: "#35786A" },
    right: { points: "68,34 0,68 0,34 68,0", fill: "#45A08E" },
    top: { points: "0,-34 68,0 0,34 -68,0", fill: "#56B8A4" },
  },
  tower: {
    // orange
    left: { points: "0,0 34,17 34,-51 0,-68", fill: "#C0631A" },
    right: { points: "68,0 34,17 34,-51 68,-68", fill: "#F07E26" },
    top: { points: "34,-85 68,-68 34,-51 0,-68", fill: "#F79A54" },
  },
  cube: {
    // yellow
    left: { points: "-68,0 -34,17 -34,-17 -68,-34", fill: "#C39D0F" },
    right: { points: "0,0 -34,17 -34,-17 0,-34", fill: "#F5C518" },
    top: { points: "-34,-51 0,-34 -34,-17 -68,-34", fill: "#F8D550" },
  },
} as const;

const FACES = [
  BLOCKS.base.left,
  BLOCKS.base.right,
  BLOCKS.base.top,
  BLOCKS.tower.left,
  BLOCKS.tower.right,
  BLOCKS.tower.top,
  BLOCKS.cube.left,
  BLOCKS.cube.right,
  BLOCKS.cube.top,
];

export function LogoMark({
  size = 40,
  variant = "solid",
  className,
  title = "DigiDan",
}: {
  size?: number;
  variant?: "solid" | "outline";
  className?: string;
  title?: string;
}) {
  const [, , vbw, vbh] = VIEWBOX.split(" ").map(Number);
  const outline = variant === "outline";
  return (
    <svg
      viewBox={VIEWBOX}
      width={size}
      height={(size * vbh) / vbw}
      className={className}
      role="img"
      aria-label={title}
    >
      {FACES.map((f, i) => (
        <polygon
          key={i}
          points={f.points}
          fill={outline ? "none" : f.fill}
          stroke={outline ? "currentColor" : "none"}
          strokeWidth={outline ? 4 : 0}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/**
 * The `d g d n` wordmark. The final `n` carries the amber accent.
 * Decorative: the accessible name is provided by the surrounding link.
 */
export function Wordmark({
  className,
  accentClassName = "text-amber-d",
}: {
  className?: string;
  accentClassName?: string;
}) {
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        fontFamily: "var(--font-mono)",
        fontWeight: 400,
        letterSpacing: "0.32em",
        textTransform: "lowercase",
      }}
    >
      d g d{" "}
      <span className={accentClassName}>n</span>
    </span>
  );
}
