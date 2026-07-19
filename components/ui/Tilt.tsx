"use client";

import { useRef } from "react";
import { clsx } from "clsx";

/**
 * Tilt: wraps a card so it leans in real 3D toward the cursor, with a light
 * sheen that tracks the pointer across the surface and a little depth pop. Pure
 * transforms, updated straight on the node (no per-frame React state). On
 * coarse pointers or reduced motion it simply renders its children flat.
 */
export function Tilt({
  children,
  className,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const allow = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent) => {
    if (!allow() || !innerRef.current) return;
    const el = innerRef.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 2 * max;
    const rx = -(py - 0.5) * 2 * max;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    if (glareRef.current) {
      glareRef.current.style.opacity = "1";
      glareRef.current.style.background = `radial-gradient(240px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.14), rgba(240,126,38,0.08) 40%, transparent 65%)`;
    }
  };

  const reset = () => {
    if (innerRef.current) {
      innerRef.current.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    }
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div className={clsx("[perspective:900px]", className)} onPointerMove={onMove} onPointerLeave={reset}>
      <div
        ref={innerRef}
        className="relative h-full transition-transform duration-300 ease-out [transform-style:preserve-3d] will-change-transform"
      >
        {children}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
        />
      </div>
    </div>
  );
}
