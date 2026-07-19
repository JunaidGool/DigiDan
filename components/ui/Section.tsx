import { clsx } from "clsx";

/**
 * Section: vertical rhythm primitive. `tone` sets the band background so we can
 * alternate the pure-black canvas with a slightly raised night panel, the way
 * the CoLab layout breathes between blocks.
 */
export function Section({
  id,
  tone = "ink",
  className,
  children,
}: {
  id?: string;
  tone?: "ink" | "night";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={clsx(
        "relative py-20 wide:py-28",
        tone === "night" && "bg-night",
        className
      )}
    >
      {children}
    </section>
  );
}
