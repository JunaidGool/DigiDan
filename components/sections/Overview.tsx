import { overview } from "@/content/home";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { LiveFeed } from "@/components/LiveFeed";

/**
 * Telemetry & Capabilities Hub (The Grid). Left: the company overview with two
 * key indicators encased in glass display bricks with illuminated top lips, and
 * the partner paragraph. Right: the telemetry instrument with count-up values
 * and a live diagnostic feed.
 */
export function Overview() {
  const { label, numbers, paragraph, telemetry } = overview;

  return (
    <section id="overview" className="section">
      <div className="shell grid gap-12 wide:grid-cols-2 wide:gap-16">
        {/* Left. */}
        <Reveal>
          <p className="label label-cyan">{label}</p>

          <div className="mt-8 grid grid-cols-2 gap-5">
            {numbers.map((n) => (
              <div key={n.caption} className="glass relative overflow-hidden p-6">
                {/* Illuminated top lip. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-cyan shadow-glow-cyan"
                />
                <p className="font-mono text-4xl font-medium text-white wide:text-5xl">
                  <CountUp value={n.value} />
                  <span className="glow-amber-text">{n.suffix}</span>
                </p>
                <p className="label mt-3">{n.caption}</p>
              </div>
            ))}
          </div>

          <p className="mt-9 max-w-xl text-lg text-white/75">{paragraph}</p>
        </Reveal>

        {/* Right: telemetry instrument. */}
        <Reveal delay={1}>
          <div className="glass glass-lit">
            <div className="flex items-center justify-between border-b border-cyan/20 px-6 py-4">
              <span className="label label-cyan">{telemetry.title}</span>
              <span className="flex items-center gap-2">
                <span className="status-dot h-2 w-2 rounded-full bg-amber shadow-glow-amber" />
                <span className="label text-amber">live</span>
              </span>
            </div>
            <dl className="divide-y divide-cyan/10">
              {telemetry.rows.map((row) => (
                <div
                  key={row.key}
                  className="flex items-baseline justify-between gap-6 px-6 py-3.5"
                >
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-teal">
                    {row.key}
                  </dt>
                  <dd className="text-right font-mono text-xs tracking-[0.06em] text-white">
                    {"count" in row && typeof row.count === "number" ? (
                      <CountUp value={row.count} />
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="p-4">
              <LiveFeed />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
