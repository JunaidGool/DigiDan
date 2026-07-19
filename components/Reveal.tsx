"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// useLayoutEffect on the client (no flash), noop on the server.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : () => {};

/**
 * Scroll reveal orchestrated by GSAP ScrollTrigger: fade up 24px as the element
 * enters, once. `delay` is a stagger index (delay * 0.1s).
 *
 * Progressive enhancement: the SSR / no-JS render is the final visible state.
 * gsap.context sets the hidden start before first paint and reverts all inline
 * styles on unmount. Reduced motion leaves everything visible with no motion.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y: 24 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: delay * 0.1,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
