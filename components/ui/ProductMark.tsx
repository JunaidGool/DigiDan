import { accentAt } from "./brand";

/**
 * Custom product marks: a distinct hand-drawn line glyph per project, selected
 * by a `type` key so it does not depend on the project name. Colour is cycled
 * through the brand palette by the caller's index. Unknown types fall back to a
 * neutral block.
 */
type MarkProps = { size?: number; color?: string; className?: string };

function Frame({
  size = 30,
  color = "currentColor",
  className,
  children,
}: MarkProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** TrimBase: a trimmed block sitting on a baseline. */
function Trim(p: MarkProps) {
  return (
    <Frame {...p}>
      <path d="M9 20 V12 H19 L23 16 V20 Z" />
      <path d="M6 24 H26" />
    </Frame>
  );
}

/** DeploySeal: a seal shield with an upward sign-off tick. */
function Seal(p: MarkProps) {
  return (
    <Frame {...p}>
      <path d="M16 5 L25 9 V16 C25 21 21 24 16 27 C11 24 7 21 7 16 V9 Z" />
      <path d="M12 16 L15 19 L20 13" />
    </Frame>
  );
}

/** Web Watchdog: a radar sweep watching a fleet of sites. */
function Radar(p: MarkProps) {
  return (
    <Frame {...p}>
      <circle cx="16" cy="16" r="10" />
      <circle cx="16" cy="16" r="5" strokeOpacity={0.6} />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
      <path d="M16 16 L24.5 10.5" />
    </Frame>
  );
}

/** CRM and campaign engineering: an envelope. */
function Mail(p: MarkProps) {
  return (
    <Frame {...p}>
      <rect x="6" y="9" width="20" height="14" rx="2.5" />
      <path d="M7 11 L16 18 L25 11" />
    </Frame>
  );
}

/** E-commerce: a shopping bag. */
function Store(p: MarkProps) {
  return (
    <Frame {...p}>
      <path d="M9 11 H23 L24 26 H8 Z" />
      <path d="M12.5 11 V9.5 A3.5 3.5 0 0 1 19.5 9.5 V11" />
    </Frame>
  );
}

function Generic(p: MarkProps) {
  return (
    <Frame {...p}>
      <rect x="8" y="8" width="16" height="16" rx="3" />
    </Frame>
  );
}

const MARKS: Record<string, (p: MarkProps) => React.JSX.Element> = {
  trim: Trim,
  seal: Seal,
  radar: Radar,
  mail: Mail,
  store: Store,
};

export function ProductMark({
  type,
  index = 0,
  size = 30,
}: {
  type: string;
  index?: number;
  size?: number;
}) {
  const Mark = MARKS[type] ?? Generic;
  return <Mark size={size} color={accentAt(index)} />;
}
