import { ProductMark } from "./ProductMark";

/**
 * A branded placeholder for a project's graphic, used until a real screenshot is
 * supplied. A large product mark on a soft ember wash inside a framed panel,
 * with the project name and corner ticks so it reads as a product preview slot
 * rather than a finished image.
 */
export function ProjectPlaceholder({
  name,
  mark,
  index = 0,
}: {
  name: string;
  mark: string;
  index?: number;
}) {
  return (
    <div className="relative flex aspect-[4/3] flex-col items-center justify-center gap-5 overflow-hidden rounded-xl border border-line bg-night">
      <div aria-hidden="true" className="absolute inset-0 bg-ember-soft opacity-40" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-line bg-raised">
        <ProductMark type={mark} index={index} size={40} />
      </div>
      <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-fog">
        {name}
      </p>
    </div>
  );
}
