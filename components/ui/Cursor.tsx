"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: a precise brand dot with a trailing ring that springs behind
 * it. Over anything interactive (links, buttons, or [data-cursor] targets) the
 * ring swells and fills, and a small label can be shown. The native cursor is
 * hidden only on fine-pointer devices; touch devices and reduced-motion users
 * keep the system cursor and this renders nothing.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.body.style.cursor = "none";

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;
    let down = false;

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      const interactive = (e.target as Element)?.closest?.(
        "a, button, input, [data-cursor]"
      );
      setHot(Boolean(interactive));
    };
    const downFn = () => (down = true);
    const upFn = () => (down = false);
    const leave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const enter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        const scale = (hotRef.current ? 1.9 : 1) * (down ? 0.8 : 1);
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", downFn);
    window.addEventListener("pointerup", upFn);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", downFn);
      window.removeEventListener("pointerup", upFn);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  // Keep the latest hover state readable inside the rAF loop.
  const hotRef = useRef(false);
  useEffect(() => {
    hotRef.current = hot;
  }, [hot]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-orange"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={
          "pointer-events-none fixed left-0 top-0 z-[200] -ml-4 -mt-4 h-8 w-8 rounded-full border transition-[background-color,border-color,width,height] duration-200 " +
          (hot
            ? "border-orange bg-orange/15"
            : "border-white/50 bg-transparent mix-blend-difference")
        }
        style={{ willChange: "transform" }}
      />
    </>
  );
}
