import { accentAt } from "./brand";

/**
 * Custom product marks. Each of DigiDan's own products gets a distinct
 * hand-drawn line glyph, so the work grid carries real identity instead of a
 * generic bullet. Colour is passed in (cycled through the brand palette by the
 * caller). Unknown names fall back to a neutral block so nothing ever breaks.
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
function TrimBase(p: MarkProps) {
  return (
    <Frame {...p}>
      <path d="M9 20 V12 H19 L23 16 V20 Z" />
      <path d="M6 24 H26" />
    </Frame>
  );
}

/** DeploySeal: a seal shield with an upward deploy chevron. */
function DeploySeal(p: MarkProps) {
  return (
    <Frame {...p}>
      <path d="M16 5 L25 9 V16 C25 21 21 24 16 27 C11 24 7 21 7 16 V9 Z" />
      <path d="M12 17 L16 13 L20 17" />
      <path d="M16 13 V21" />
    </Frame>
  );
}

/** JujHub: a central hub wired to four nodes. */
function JujHub(p: MarkProps) {
  return (
    <Frame {...p}>
      <circle cx="16" cy="16" r="3.2" />
      <path d="M13.5 13.5 L9 9 M18.5 13.5 L23 9 M13.5 18.5 L9 23 M18.5 18.5 L23 23" />
      <circle cx="8" cy="8" r="2" />
      <circle cx="24" cy="8" r="2" />
      <circle cx="8" cy="24" r="2" />
      <circle cx="24" cy="24" r="2" />
    </Frame>
  );
}

/** ProductLens: an aperture of nested rings with a blade line. */
function ProductLens(p: MarkProps) {
  return (
    <Frame {...p}>
      <circle cx="16" cy="16" r="10" />
      <circle cx="16" cy="16" r="4" />
      <path d="M16 6 L20.5 12.5" />
      <path d="M26 16 L18.5 16" strokeOpacity={0.6} />
    </Frame>
  );
}

/** Inboxlio: an inbox tray receiving a downward flow. */
function Inboxlio(p: MarkProps) {
  return (
    <Frame {...p}>
      <path d="M6 18 H11 L13 21 H19 L21 18 H26 V25 H6 Z" />
      <path d="M16 6 V13" />
      <path d="M12.5 10 L16 13.5 L19.5 10" />
    </Frame>
  );
}

/** Fallback block. */
function Generic(p: MarkProps) {
  return (
    <Frame {...p}>
      <rect x="8" y="8" width="16" height="16" rx="3" />
    </Frame>
  );
}

const MARKS: Record<string, (p: MarkProps) => React.JSX.Element> = {
  TrimBase,
  DeploySeal,
  JujHub,
  ProductLens,
  Inboxlio,
};

export function ProductMark({
  name,
  index = 0,
  size = 30,
}: {
  name: string;
  index?: number;
  size?: number;
}) {
  const Mark = MARKS[name] ?? Generic;
  return <Mark size={size} color={accentAt(index)} />;
}
