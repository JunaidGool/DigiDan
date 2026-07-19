"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./Button";

/**
 * Carousel: a hand-built slide switcher used for the hero showcase. One slide is
 * shown at a time; round controls page through, dots jump directly, arrow keys
 * work when focused, and a horizontal drag/swipe advances on touch. No carousel
 * library. Slides are plain nodes, so any content can be paged.
 */
export function Carousel({
  slides,
  labels,
  className,
}: {
  slides: React.ReactNode[];
  labels: string[];
  className?: string;
}) {
  const [i, setI] = useState(0);
  const n = slides.length;
  const drag = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => setI(((next % n) + n) % n),
    [n]
  );

  return (
    <div
      className={className}
      role="group"
      aria-roledescription="carousel"
      aria-label="DigiDan systems"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        if (e.key === "ArrowLeft") go(i - 1);
      }}
    >
      <div
        className="relative"
        onPointerDown={(e) => (drag.current = e.clientX)}
        onPointerUp={(e) => {
          if (drag.current === null) return;
          const dx = e.clientX - drag.current;
          if (Math.abs(dx) > 48) go(i + (dx < 0 ? 1 : -1));
          drag.current = null;
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            aria-hidden={idx !== i}
            aria-roledescription="slide"
            aria-label={`${labels[idx]} (${idx + 1} of ${n})`}
            className={
              idx === i
                ? "opacity-100 transition-opacity duration-500"
                : "pointer-events-none absolute inset-0 opacity-0"
            }
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Controls: round prev/next either side of the dot rail. */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <Button
          variant="icon"
          onClick={() => go(i - 1)}
          aria-label="Previous system"
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </Button>

        <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose slide">
          {slides.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === i}
              aria-label={labels[idx]}
              onClick={() => go(idx)}
              className={
                "h-2.5 rounded-full transition-all duration-300 " +
                (idx === i
                  ? "w-7 bg-orange"
                  : "w-2.5 bg-white/25 hover:bg-white/50")
              }
            />
          ))}
        </div>

        <Button variant="icon" onClick={() => go(i + 1)} aria-label="Next system">
          <ArrowRight size={20} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
