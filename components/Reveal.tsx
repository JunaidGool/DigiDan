"use client";

import { useEffect, useRef, useState } from "react";

type State = "idle" | "armed" | "in";

/**
 * Scroll-reveal wrapper. Exposes its state as `data-reveal` for CSS to key off.
 * Progressive enhancement: default (no JS) stays "idle" = final visible state,
 * so content is never stuck hidden. JS arms it (hidden) then reveals on
 * intersection. Reduced motion skips straight to visible with no animation.
 */
export function Reveal({
  children,
  className,
  threshold = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setState("armed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setState("in");
            io.disconnect();
          }
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} data-reveal={state} className={className}>
      {children}
    </div>
  );
}
