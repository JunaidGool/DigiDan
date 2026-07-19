import { overview } from "@/content/home";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";

/**
 * Overview (spec 3.5): a light bench with a dark instrument. Left: label, two
 * big numbers with amber plus signs, one paragraph naming both partners. Right:
 * the telemetry instrument, an obsidian panel with an amber seam top and a soft
 * drop shadow, listing six mono data rows whose numeric values count up on
 * scroll.
 */
export function Overview() {
  const { label, numbers, paragraph, telemetry } = overview;

  return (
    <section id="overview" className="bg-paper section">
      <div className="shell grid gap-12 wide:grid-cols-2 wide:gap-16">
        {/* Left: the copy bench. */}
        <Reveal>
          <p className="label">{label}</p>
          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-8">
            {numbers.map((n) => (
              <div key={n.caption}>
                <p className="font-display text-5xl font-light tracking-[0.02em] text-ink wide:text-6xl">
                  <CountUp value={n.value} />
                  <span className="text-amber-l">{n.suffix}</span>
                </p>
                <p className="label mt-3">{n.caption}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-xl text-lg text-ink/85">{paragraph}</p>
        </Reveal>

        {/* Right: the telemetry instrument. */}
        <Reveal delay={1}>
          <div className="seam-top bg-obsidian shadow-[0_24px_60px_-20px_rgba(10,13,13,0.5)]">
            <div className="flex items-center justify-between border-b border-line-d px-6 py-4">
              <span className="label label-d">{telemetry.title}</span>
              <span className="flex items-center gap-2">
                <span className="live-dot h-2 w-2 rounded-full bg-amber-d" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-amber-d">
                  live
                </span>
              </span>
            </div>
            <dl className="divide-y divide-line-d">
              {telemetry.rows.map((row) => (
                <div
                  key={row.key}
                  className="flex items-baseline justify-between gap-6 px-6 py-4"
                >
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-slate-d">
                    {row.key}
                  </dt>
                  <dd className="text-right font-mono text-xs tracking-[0.08em] text-platinum">
                    {"count" in row && typeof row.count === "number" ? (
                      <CountUp value={row.count} />
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
