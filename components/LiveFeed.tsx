"use client";

import { useEffect, useRef, useState } from "react";
import { overview } from "@/content/home";

const POOL = overview.telemetry.feed;
const KEEP = 6;

/**
 * A decorative live diagnostic feed: pseudo build/compiler lines stream in to
 * keep the telemetry panel looking actively alive. Reduced motion shows a
 * static snapshot with no streaming. The feed is aria-hidden.
 */
export function LiveFeed() {
  const [lines, setLines] = useState<string[]>(() => POOL.slice(0, KEEP));
  const idx = useRef(KEEP % POOL.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setLines((prev) => {
        const next = [...prev, POOL[idx.current]];
        idx.current = (idx.current + 1) % POOL.length;
        return next.slice(-KEEP);
      });
    }, 1400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="min-w-0 rounded-lg border border-line bg-ink/70 p-5 font-mono text-[0.7rem] leading-relaxed text-orange-light/90"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2 w-2 animate-blink rounded-full bg-orange" />
        <span className="text-[0.58rem] uppercase tracking-[0.2em] text-fog">
          diagnostic feed
        </span>
      </div>
      <div className="min-w-0 space-y-1">
        {lines.map((l, i) => (
          <div key={`${l}-${i}`} className="truncate">
            <span className="text-fog">&gt;</span> {l}
          </div>
        ))}
        <div className="text-white/80">
          <span className="text-fog">&gt;</span>{" "}
          <span className="animate-blink">_</span>
        </div>
      </div>
    </div>
  );
}
