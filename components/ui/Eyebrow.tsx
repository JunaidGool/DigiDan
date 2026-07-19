import { clsx } from "clsx";

/**
 * Eyebrow: the small uppercase kicker that sits above a section heading, with
 * a short orange tick to anchor it.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={clsx("kicker", className)}>
      <span aria-hidden="true" className="h-px w-6 bg-orange" />
      {children}
    </p>
  );
}
