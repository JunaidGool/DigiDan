import { clsx } from "clsx";

/**
 * Card: the rounded dark surface used throughout. `interactive` adds the hover
 * lift and a warm edge highlight for cards that behave like targets.
 */
export function Card({
  as: Tag = "div",
  interactive = false,
  className,
  children,
  ...rest
}: {
  as?: React.ElementType;
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      className={clsx(
        "relative rounded-xl border border-line bg-surface shadow-card",
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-orange/40 hover:shadow-glow-soft",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
