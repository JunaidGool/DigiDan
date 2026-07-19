"use client";

import { useState } from "react";
import { capabilities } from "@/content/home";
import { Reveal } from "@/components/Reveal";

/**
 * Capabilities (spec 3.4): three equal card blades on the lab surface. Each
 * shows a mono index, a title, two plain sentences and a +. Clicking a blade
 * opens a full-width dark panel below the row (amber seam on top, obsidian body,
 * two columns: plain-English bullets and a decorative console block). One panel
 * open at a time; the open animation is a max-height ease of about 0.55s.
 *
 * Blades are buttons with aria-expanded. Hover adds a 2px amber top border and a
 * colour shift, no scale, no shadow.
 */
export function Capabilities() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="capabilities" className="lab-grid section bg-paper">
      <div className="shell">
        <Reveal>
          <p className="label">{capabilities.label}</p>
          <h2 className="mt-4 text-h2">{capabilities.title}</h2>
        </Reveal>

        {/* Blade row: 1px hairline gaps read as drawn dividers. */}
        <div className="mt-12 grid gap-px bg-line-l wide:grid-cols-3">
          {capabilities.blades.map((blade, i) => {
            const isOpen = open === i;
            return (
              <button
                key={blade.index}
                type="button"
                aria-expanded={isOpen}
                aria-controls="capability-panel"
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex flex-col border-t-2 border-transparent bg-paper p-8 text-left transition-colors hover:border-seam hover:bg-[#ECEDEB] aria-expanded:border-seam"
              >
                <span className="label text-amber-l">{blade.index}</span>
                <span className="mt-4 flex items-start justify-between gap-4">
                  <span className="font-display text-xl font-medium tracking-[0.02em] text-ink">
                    {blade.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-xl leading-none text-amber-l"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </span>
                <span className="mt-4 text-sm text-ink/80">{blade.card}</span>
              </button>
            );
          })}
        </div>

        {/* The panel: one open at a time, max-height ease. */}
        <div
          id="capability-panel"
          className="seam-top overflow-hidden bg-obsidian transition-[max-height] duration-[550ms] ease-out"
          style={{ maxHeight: open === null ? 0 : "44rem" }}
        >
          {open !== null && (
            <div className="grid gap-10 p-8 wide:grid-cols-2 wide:p-12">
              {/* Left: plain-English bullets. */}
              <div>
                <p className="label label-d text-amber-d">
                  {capabilities.blades[open].index}
                </p>
                <h3 className="mt-3 font-display text-lg font-medium tracking-[0.02em] text-platinum">
                  {capabilities.blades[open].title}
                </h3>
                <ul className="mt-6 space-y-3">
                  {capabilities.blades[open].bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm text-platinum/85"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-amber-d"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: decorative console block. */}
              <div
                aria-hidden="true"
                className="self-start border border-line-d bg-console p-6"
              >
                <div className="flex items-center gap-2">
                  <span className="live-dot h-2 w-2 rounded-full bg-amber-d" />
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-d">
                    console
                  </span>
                </div>
                <pre className="mt-4 whitespace-pre-wrap font-mono text-xs leading-relaxed text-amber-d/90">
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
