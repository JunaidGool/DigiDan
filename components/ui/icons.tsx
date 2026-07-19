/**
 * Hand-drawn icon set. Each capability icon is a line glyph inside a pointy-top
 * hexagon frame, matching the CoLab iconography but drawn from scratch for
 * DigiDan. Stroke is currentColor so callers set the colour; the frame is
 * rendered a touch dimmer than the glyph.
 */

const HEX = "M32 2 L58 17 L58 47 L32 62 L6 47 L6 17 Z";

function HexIcon({
  children,
  size = 56,
  className,
  title,
}: {
  children: React.ReactNode;
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={HEX} stroke="currentColor" strokeOpacity={0.35} />
      {children}
    </svg>
  );
}

/** Fintech: a currency token, for money moved safely and recorded. */
export function IconLedger(props: { size?: number; className?: string; title?: string }) {
  return (
    <HexIcon {...props}>
      <circle cx="32" cy="32" r="11" />
      <path d="M32 22 V42" />
      <path d="M27 27 H37" />
      <path d="M27 37 H37" />
    </HexIcon>
  );
}

/** Software platforms: two stacked, connected panels. */
export function IconPlatform(props: { size?: number; className?: string; title?: string }) {
  return (
    <HexIcon {...props}>
      <rect x="19" y="21" width="26" height="12" rx="3" />
      <rect x="19" y="35" width="26" height="12" rx="3" />
      <path d="M25 27 H33" strokeOpacity={0.6} />
      <path d="M25 41 H33" strokeOpacity={0.6} />
      <circle cx="39" cy="27" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="39" cy="41" r="1.4" fill="currentColor" stroke="none" />
    </HexIcon>
  );
}

/** AI and automation: a decision node branching to checked outputs. */
export function IconAI(props: { size?: number; className?: string; title?: string }) {
  return (
    <HexIcon {...props}>
      <circle cx="24" cy="32" r="5" />
      <circle cx="44" cy="23" r="3.5" />
      <circle cx="44" cy="41" r="3.5" />
      <path d="M29 30 L40.5 24" />
      <path d="M29 34 L40.5 40" />
    </HexIcon>
  );
}

/** Small custom tick used in bullet lists. */
export function Tick({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8.5 L6.5 12 L13 4" />
    </svg>
  );
}
