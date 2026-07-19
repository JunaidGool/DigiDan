/**
 * Concentric quarter arcs in the four block colours (brief 4.2 / 6.10). Used
 * small, once, in the footer. Purely decorative. Anchored to the bottom-right
 * so the arcs open toward the content.
 */
const ARCS = [
  { r: 54, color: "#C4531D" }, // orange (outer)
  { r: 40, color: "#E3A21A" }, // gold
  { r: 26, color: "#6B7A34" }, // olive
  { r: 12, color: "#14705C" }, // teal (inner)
];

export function ArcMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={64}
      height={64}
      className={className}
      aria-hidden="true"
    >
      {ARCS.map(({ r, color }) => (
        <path
          key={r}
          d={`M ${64 - r} 64 A ${r} ${r} 0 0 1 64 ${64 - r}`}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
