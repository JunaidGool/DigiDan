"use client";

import { useState } from "react";
import { capabilities } from "@/content/home";
import { Reveal } from "@/components/Reveal";

/**
 * What We Build (The Grid): a connected node system. Three dark-glass capability
 * panels are mapped around a central System Core router. Hovering (or opening) a
 * panel lights the data highway that connects it to the core, with a pulse
 * travelling along the wire. Clicking a panel opens its detail: plain-English
 * bullets and a live console readout.
 *
 * Panels are buttons with aria-expanded, so the whole system is keyboard and
 * screen-reader operable; the highways and core are decorative.
 */
export function Capabilities() {
  const [open, setOpen] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const active = (i: number) => hover === i || open === i;

  // index -> grid placement (Fintech left, Software below core, AI right)
  const place = [
    "wide:col-start-1 wide:row-start-1",
    "wide:col-start-2 wide:row-start-2",
    "wide:col-start-3 wide:row-start-1",
  ];
  // index -> highway path in the stretched 100x60 overlay
  const wire = ["M16.6 15 L50 15", "M50 45 L50 15", "M83.4 15 L50 15"];

  return (
    <section id="capabilities" className="section">
      <div className="shell">
        <Reveal>
          <p className="label label-neon">{capabilities.label}</p>
          <h2 className="glow-text mt-4 text-h2 font-light">{capabilities.title}</h2>
        </Reveal>

        <div className="relative mt-14 grid gap-5 wide:grid-cols-3 wide:grid-rows-[auto_auto]">
          {/* Data highways. */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full wide:block"
            viewBox="0 0 100 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {wire.map((d, i) => (
              <g key={i}>
                <path
                  d={d}
                  fill="none"
                  stroke="#2DE1C6"
                  strokeWidth={active(i) ? 0.7 : 0.4}
                  strokeOpacity={active(i) ? 0.65 : 0.16}
                  vectorEffect="non-scaling-stroke"
                />
                {active(i) && (
                  <path
                    d={d}
                    fill="none"
                    stroke="#2DE1C6"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      strokeDasharray: "6 60",
                      animation: "pulse-travel 1.1s linear infinite",
                      filter: "drop-shadow(0 0 3px #2DE1C6)",
                    }}
                  />
                )}
              </g>
            ))}
          </svg>

          {/* The System Core router. */}
          <div className="relative z-10 hidden flex-col items-center justify-center gap-1 wide:col-start-2 wide:row-start-1 wide:flex">
            <div className="glass glass-lit flex h-28 w-28 flex-col items-center justify-center rounded-full">
              <span className="status-dot mb-1 h-2 w-2 rounded-full bg-action shadow-glow-action" />
              <span className="label label-neon text-[0.55rem]">{capabilities.core}</span>
              <span className="label text-[0.5rem]">{capabilities.coreSub}</span>
            </div>
          </div>

          {/* Capability panels. */}
          {capabilities.blades.map((blade, i) => {
            const isOpen = open === i;
            return (
              <button
                key={blade.index}
                type="button"
                aria-expanded={isOpen}
                aria-controls="capability-panel"
                onClick={() => setOpen(isOpen ? null : i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover((h) => (h === i ? null : h))}
                onFocus={() => setHover(i)}
                onBlur={() => setHover((h) => (h === i ? null : h))}
                className={`glass relative z-10 flex flex-col p-7 text-left transition-shadow duration-200 ${place[i]} ${
                  active(i) ? "glass-lit" : ""
                }`}
              >
                <span className="flex items-center justify-between">
                  <span className="label label-neon">{blade.index}</span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-lg leading-none text-action"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </span>
                <span className="mt-4 font-display text-lg font-normal text-white">
                  {blade.title}
                </span>
                <span className="mt-3 text-sm text-white/70">{blade.card}</span>
              </button>
            );
          })}
        </div>

        {/* Detail panel: one open at a time. */}
        <div
          id="capability-panel"
          className="overflow-hidden transition-[max-height] duration-500 ease-out"
          style={{ maxHeight: open === null ? 0 : "46rem" }}
        >
          {open !== null && (
            <div className="glass glass-lit mt-5 grid gap-10 p-8 wide:grid-cols-2 wide:p-10">
              <div>
                <p className="label label-neon">{capabilities.blades[open].index}</p>
                <h3 className="glow-text mt-3 font-display text-lg font-normal text-white">
                  {capabilities.blades[open].title}
                </h3>
                <ul className="mt-6 space-y-3">
                  {capabilities.blades[open].bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-white/80">
                      <span
                        aria-hidden="true"
                        className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rotate-45 bg-neon shadow-glow-neon"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                aria-hidden="true"
                className="self-start border border-neon/25 bg-void/70 p-6"
              >
                <div className="flex items-center gap-2">
                  <span className="status-dot h-2 w-2 rounded-full bg-neon shadow-glow-neon" />
                  <span className="label label-neon text-[0.58rem]">console</span>
                </div>
                <pre className="mt-4 whitespace-pre-wrap font-mono text-xs leading-relaxed text-neon/90">
                  {capabilities.blades[open].console.join("\n")}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
