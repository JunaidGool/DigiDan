/**
 * Interface glyphs, drawn from scratch so no third-party icon font or library
 * ships with the site. These cover the chrome (arrows, menu, close) that a
 * generic build would pull from a package like lucide. Stroke is currentColor
 * with round joins, matching the DigiDan line language.
 */

type GlyphProps = {
  size?: number;
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
};

function Svg({
  size = 20,
  className,
  strokeWidth = 2,
  style,
  children,
}: GlyphProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/**
 * Directional arrow: a shaft and a chevron head. `direction` flips it; the
 * shaft is a separate path so callers can animate it (it grows on hover in the
 * button). Right-pointing by default.
 */
export function Arrow({
  direction = "right",
  ...props
}: GlyphProps & { direction?: "right" | "left" }) {
  return (
    <Svg {...props} className={`${props.className ?? ""}`.trim()}>
      <g style={direction === "left" ? { transform: "scaleX(-1)", transformOrigin: "center" } : undefined}>
        <path d="M3.5 12 H17" className="dgn-arrow-shaft" />
        <path d="M12.5 6.5 L18 12 L12.5 17.5" />
      </g>
    </Svg>
  );
}

/**
 * Menu: an intentionally asymmetric two-bar mark (top bar full, lower bar short)
 * so it reads as DigiDan rather than a stock hamburger.
 */
export function MenuGlyph(props: GlyphProps) {
  return (
    <Svg {...props}>
      <path d="M4 9 H20" />
      <path d="M4 15 H13" />
    </Svg>
  );
}

/** Close: two crossing strokes. */
export function CloseGlyph(props: GlyphProps) {
  return (
    <Svg {...props}>
      <path d="M6 6 L18 18" />
      <path d="M18 6 L6 18" />
    </Svg>
  );
}
