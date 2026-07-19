/**
 * DigiDan logo mark (spec section 7), rendered as a cyan light-track wireframe
 * for "The Grid" theme. A reconstruction of the company mark: three isometric
 * blocks. Before launch these polygons should be replaced with paths from the
 * original vector file.
 *
 * The mark is drawn as a single-colour outline (currentColor) so it can glow
 * cyan in the nav and footer. The full-size, energised representation of the
 * core is the WebGL hypercube in the hero, not this mark.
 */

const VIEWBOX = "-80 -97 160 177";

const FACES = [
  "-68,34 0,68 0,34 -68,0",
  "68,34 0,68 0,34 68,0",
  "0,-34 68,0 0,34 -68,0",
  "0,0 34,17 34,-51 0,-68",
  "68,0 34,17 34,-51 68,-68",
  "34,-85 68,-68 34,-51 0,-68",
  "-68,0 -34,17 -34,-17 -68,-34",
  "0,0 -34,17 -34,-17 0,-34",
  "-34,-51 0,-34 -34,-17 -68,-34",
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
      style={{ filter: "drop-shadow(0 0 4px rgba(0,229,255,0.6))" }}
    >
      {FACES.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/**
 * The `d g d n` wordmark. The final `n` carries a cyan glow accent.
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
      d g d <span className="glow-cyan-text">n</span>
    </span>
  );
}
