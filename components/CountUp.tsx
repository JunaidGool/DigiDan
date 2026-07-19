"use client";

import { useEffect, useRef, useState } from "react";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const format = (n: number) => n.toLocaleString("en-GB");

/**
 * Count-up on scroll (spec 3.5 / 5): numeric values ramp to their final value
 * over 1.4s with an ease-out cubic curve, once, when they enter the viewport.
 *
 * Progressive enhancement: the SSR / no-JS render is the final value, so the
 * number is never stuck at zero. Reduced motion skips straight to the final
 * value with no ramp.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1400,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value); // final value for SSR/no-JS

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setDisplay(0);
    let raf = 0;
    let start = 0;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.disconnect();
          const step = (ts: number) => {
            if (!start) start = ts;
            const t = Math.min(1, (ts - start) / duration);
            setDisplay(Math.round(easeOutCubic(t) * value));
            if (t < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {format(display)}
      {suffix}
    </span>
  );
}
