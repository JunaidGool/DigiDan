/**
 * The supergraphic stripe (brief 4.2 / 6.3): a full-width 12px band of four
 * equal segments in orange, gold, olive and teal. It appears once, between the
 * hero and the trust strip. Purely decorative.
 */
export function StripeDivider() {
  return (
    <div className="flex h-3 w-full" aria-hidden="true">
      <span className="flex-1 bg-coral-500" />
      <span className="flex-1 bg-amber-400" />
      <span className="flex-1 bg-olive-500" />
      <span className="flex-1 bg-teal-500" />
    </div>
  );
}
