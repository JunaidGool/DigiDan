import { clsx } from "clsx";

/**
 * DigiDan logo mark: the isometric building block (a base, a tower and a cube),
 * drawn as a crisp line mark. On the dark interface it reads cleanest in a
 * single colour, so `tone` defaults to solid white for the nav (matching the
 * CoLab wordmark cube); `brand` keeps the three DigiDan logo colours for places
 * that want the full identity. No glow, no per-element animation.
 */

const VIEWBOX = "-80 -97 160 177";

const GROUPS: { key: string; brand: string; faces: string[] }[] = [
  {
    key: "base",
    brand: "#2DE1C6",
    faces: [
      "-68,34 0,68 0,34 -68,0",
      "68,34 0,68 0,34 68,0",
      "0,-34 68,0 0,34 -68,0",
    ],
  },
  {
    key: "tower",
    brand: "#F07E26",
    faces: [
      "0,0 34,17 34,-51 0,-68",
      "68,0 34,17 34,-51 68,-68",
      "34,-85 68,-68 34,-51 0,-68",
    ],
  },
  {
    key: "cube",
    brand: "#F5C518",
    faces: [
      "-68,0 -34,17 -34,-17 -68,-34",
      "0,0 -34,17 -34,-17 0,-34",
      "-34,-51 0,-34 -34,-17 -68,-34",
    ],
  },
];

export function LogoMark({
  size = 30,
  className,
  title = "DigiDan",
  tone = "mono",
}: {
  size?: number;
  className?: string;
  title?: string;
  tone?: "mono" | "brand" | "orange";
}) {
  const [, , vbw, vbh] = VIEWBOX.split(" ").map(Number);
  const stroke = (brand: string) =>
    tone === "brand" ? brand : tone === "orange" ? "#F07E26" : "#FFFFFF";
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
        <g key={g.key}>
          {g.faces.map((points, i) => (
            <polygon
              key={i}
              points={points}
              fill="none"
              stroke={stroke(g.brand)}
              strokeWidth={6}
              strokeLinejoin="round"
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

/**
 * The DigiDan wordmark. Spaced lowercase `d g d n` with the final `n` carried in
 * the orange accent, echoing the CoLab spaced-cap wordmark treatment.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={clsx("font-semibold", className)}
      aria-hidden="true"
      style={{ letterSpacing: "0.3em", textTransform: "lowercase" }}
    >
      d g d <span className="text-orange">n</span>
    </span>
  );
}
