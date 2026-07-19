import { clsx } from "clsx";
import { Arrow } from "./glyphs";

/**
 * Button: the DigiDan action primitive, built entirely by hand (no library).
 *
 * Variants
 *  - primary   solid orange pill with a light sheen that sweeps on hover
 *  - secondary transparent, hairline border, fills faintly on hover
 *  - ghost     text-only with a sliding underline accent
 *  - icon      round control used for the showcase carousel
 *
 * Renders as an <a> when `href` is set, otherwise a <button>. The sheen and
 * lift are pure CSS, so they degrade gracefully and respect reduced motion.
 */
type Variant = "primary" | "secondary" | "ghost" | "icon" | "outline-gradient";
type Size = "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type AsLink = Common &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 font-medium " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out " +
  "focus-visible:outline-2 disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm rounded-full",
  lg: "h-14 px-7 text-base rounded-full",
};

const variants: Record<Variant, string> = {
  primary:
    "overflow-hidden bg-orange text-ink shadow-glow-soft hover:-translate-y-0.5 " +
    "hover:bg-orange-light active:translate-y-0",
  secondary:
    "border border-white/15 bg-white/[0.02] text-white hover:border-white/40 " +
    "hover:bg-white/[0.06] hover:-translate-y-0.5 active:translate-y-0",
  ghost: "px-1 text-ash hover:text-white",
  // Gradient border over a dark fill (padding-box vs border-box trick), echoing
  // CoLab's "Talk to an expert" pill in the DigiDan brand gradient.
  "outline-gradient":
    "border border-transparent bg-ink text-white hover:-translate-y-0.5 active:translate-y-0 " +
    "[background:linear-gradient(#050609,#050609)_padding-box,linear-gradient(92deg,#2DE1C6,#F07E26_55%,#F5C518)_border-box]",
  icon:
    "h-12 w-12 rounded-full border border-white/15 bg-white/[0.04] text-white " +
    "hover:border-white/40 hover:bg-white/[0.10] active:scale-95",
};

function Inner({
  variant,
  withArrow,
  children,
}: {
  variant: Variant;
  withArrow?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <>
      {/* Sheen sweep, primary only. */}
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 overflow-hidden rounded-full"
        >
          <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/35 opacity-0 blur-md transition-opacity duration-200 group-hover:animate-[sheen_0.9s_ease-out] group-hover:opacity-100" />
        </span>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {withArrow && (
          <Arrow
            size={18}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        )}
      </span>
    </>
  );
}

export function Button(props: AsLink | AsButton) {
  const {
    variant = "primary",
    size = "md",
    withArrow = false,
    className,
    children,
    ...rest
  } = props;

  const cls = clsx(
    base,
    variant !== "icon" && sizes[size],
    variants[variant],
    className
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } =
      rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <a href={href} className={cls} {...anchorRest}>
        <Inner variant={variant} withArrow={withArrow}>
          {children}
        </Inner>
      </a>
    );
  }

  return (
    <button
      className={cls}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <Inner variant={variant} withArrow={withArrow}>
        {children}
      </Inner>
    </button>
  );
}
