import { clsx } from "clsx";

/**
 * Container: the centred content shell. Every section drops its content into
 * one of these so the measure and gutters stay consistent across the site.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={clsx("shell", className)}>{children}</div>;
}
