"use client";

import { useEffect, useRef } from "react";
import { work } from "@/content/home";
import { Reveal } from "@/components/Reveal";

// Brand colours cycled across the projects (teal, orange, yellow). `v` is a
// theme-aware token for DOM text; `rgb` stays brand-bright for the canvas wave.
const BRAND = [
  { v: "var(--accent-teal)", rgb: "45,225,198" },
  { v: "var(--accent-orange)", rgb: "240,126,38" },
  { v: "var(--accent-yellow)", rgb: "245,197,24" },
];
const accentFor = (i: number) => BRAND[i % BRAND.length];

/**
 * Things We Have Built (The Grid): the project names sit above a dynamic sine
 * wave built from glowing data dots on a canvas. Hovering a project pinches the
 * wave toward that point, creating a splash of light in that project's brand
 * colour beneath it.
 *
 * Reduced motion draws a single calm wave with no animation or pointer response.
 * The canvas is decorative and aria-hidden.
 */
export function Work() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinch = useRef({ x: 0.5, s: 0, tx: 0.5, ts: 0, col: "45,225,198" });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const DOTS = 96;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const p = pinch.current;
      p.x += (p.tx - p.x) * 0.12;
      p.s += (p.ts - p.s) * 0.08;
      const baseAmp = h * 0.12;
      for (let i = 0; i < DOTS; i++) {
        const fx = i / (DOTS - 1);
        const x = fx * w;
        const env = Math.exp(-((fx - p.x) ** 2) / (2 * 0.006)) * p.s;
        const wave = Math.sin(fx * Math.PI * 7 + t * 0.0016) * baseAmp * (0.5 + env * 1.6);
        const y = h * 0.5 + wave - env * (h * 0.22);
        const bright = 0.32 + env * 0.68;
        const size = 1.6 + env * 2.8;
        const col = env > 0.35 ? p.col : "45,225,198";
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${bright})`;
        ctx.shadowBlur = 8 + env * 16;
        ctx.shadowColor = `rgba(${col},0.8)`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    if (reduce) {
      draw(0);
      return () => ro.disconnect();
    }
    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const enter = (i: number) => {
    pinch.current.tx = (i + 0.5) / work.items.length;
    pinch.current.ts = 1;
    pinch.current.col = accentFor(i).rgb;
  };
  const leave = () => {
    pinch.current.ts = 0;
  };

  return (
    <section id="work" className="section">
      <div className="shell">
        <Reveal>
          <p className="label label-neon">{work.label}</p>
          <h2 className="glow-text mt-4 text-h2 font-light">{work.title}</h2>
        </Reveal>

        <div ref={wrapRef} className="relative mt-12 min-h-[200px]">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          />
          <ul className="relative grid gap-px overflow-hidden border border-neon/25 bg-neon/15 wide:grid-cols-5">
            {work.items.map((name, i) => (
              <li key={name}>
                <a
                  href="#work"
                  onMouseEnter={() => enter(i)}
                  onMouseLeave={leave}
                  onFocus={() => enter(i)}
                  onBlur={leave}
                  className="flex h-full flex-col gap-3 bg-panel/50 px-6 py-9 backdrop-blur-[2px] transition-colors hover:bg-panel-raised/70 focus-visible:bg-panel-raised/70"
                >
                  <span
                    className="label accent-text"
                    style={{ "--accent": accentFor(i).v } as React.CSSProperties}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-normal text-white">
                    {name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
