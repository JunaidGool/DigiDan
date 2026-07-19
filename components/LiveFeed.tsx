"use client";

import { useEffect, useRef, useState } from "react";
import { overview } from "@/content/home";

const POOL = overview.telemetry.feed;
const KEEP = 6;

/**
 * A decorative live diagnostic feed: pseudo build/compiler lines stream in to
 * keep the terminal looking actively alive. Reduced motion shows a static
 * snapshot with no streaming. The feed is aria-hidden.
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
      className="min-w-0 border border-neon/25 bg-void/70 p-5 font-mono text-[0.7rem] leading-relaxed text-neon/85"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="status-dot h-2 w-2 rounded-full bg-neon shadow-glow-neon" />
        <span className="label label-neon text-[0.55rem]">diagnostic feed</span>
      </div>
      <div className="min-w-0 space-y-1">
        {lines.map((l, i) => (
          <div key={`${l}-${i}`} className="truncate">
            <span className="text-dim">&gt;</span> {l}
          </div>
        ))}
        <div className="text-white/80">
          <span className="text-dim">&gt;</span>{" "}
          <span className="status-dot">_</span>
        </div>
      </div>
    </div>
  );
}
