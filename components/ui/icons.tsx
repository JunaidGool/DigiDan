/**
 * Small custom tick used in bullet lists across the site. Stroke is
 * currentColor; callers set the colour via className or an inline style.
 */
export function Tick({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      className={className}
      style={style}
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
