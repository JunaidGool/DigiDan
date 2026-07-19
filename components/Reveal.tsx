"use client";

import { useEffect, useRef, useState } from "react";

type State = "idle" | "armed" | "in";

/**
 * Scroll-reveal wrapper (spec 4: fade up 22px, 0.8s, staggered by 0.12s, once).
 * Progressive enhancement: default (no JS) stays "idle" = final visible state,
 * so content is never stuck hidden. JS arms it (hidden) then reveals on
 * intersection. Reduced motion is handled in CSS (forced to final state).
 *
 * `delay` is a stagger index: element N fades in N * 0.12s after it enters.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  threshold = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  delay?: number;
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);
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
    <Tag
      ref={ref}
      data-reveal={state}
      className={className}
      style={{ "--reveal-delay": delay } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
