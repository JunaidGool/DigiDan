/**
 * DigiDan logo mark (spec section 7), rendered as a glowing tri-colour wireframe
 * for "The Grid" theme in the company's own logo palette: a neon-teal base, an
 * orange tower and a yellow cube. A reconstruction of the company mark; before
 * launch these polygons should be replaced with paths from the original vector.
 *
 * The mark is never recoloured or animated per element beyond its glow.
 */

const VIEWBOX = "-80 -97 160 177";

const GROUPS: { color: string; faces: string[] }[] = [
  {
    // base (brand teal, neon)
    color: "#2DE1C6",
    faces: [
      "-68,34 0,68 0,34 -68,0",
      "68,34 0,68 0,34 68,0",
      "0,-34 68,0 0,34 -68,0",
    ],
  },
  {
    // tower (brand orange)
    color: "#F07E26",
    faces: [
      "0,0 34,17 34,-51 0,-68",
      "68,0 34,17 34,-51 68,-68",
      "34,-85 68,-68 34,-51 0,-68",
    ],
  },
  {
    // cube (brand yellow)
    color: "#F5C518",
    faces: [
      "-68,0 -34,17 -34,-17 -68,-34",
      "0,0 -34,17 -34,-17 0,-34",
      "-34,-51 0,-34 -34,-17 -68,-34",
    ],
  },
];

export function LogoMark({
  size = 32,
  className,
  title = "DigiDan",
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  const [, , vbw, vbh] = VIEWBOX.split(" ").map(Number);
  return (
    <svg
      viewBox={VIEWBOX}
      width={size}
      height={(size * vbh) / vbw}
      className={className}
      role="img"
      aria-label={title}
    >
      {GROUPS.map((g) => (
        <g
          key={g.color}
          style={{ filter: `drop-shadow(0 0 3px ${g.color})` }}
        >
          {g.faces.map((points, i) => (
            <polygon
              key={i}
              points={points}
              fill="none"
              stroke={g.color}
              strokeWidth={5}
              strokeLinejoin="round"
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

/**
 * The `d g d n` wordmark. The final `n` carries a neon accent.
 * Decorative: the accessible name is provided by the surrounding link.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        fontFamily: "var(--font-mono)",
        fontWeight: 400,
        letterSpacing: "0.34em",
        textTransform: "lowercase",
      }}
    >
      d g d <span className="glow-neon-text">n</span>
    </span>
  );
}
