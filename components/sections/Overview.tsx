import { overview } from "@/content/home";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { LiveFeed } from "@/components/LiveFeed";

// Brand colours for the two stat bricks (teal, yellow).
const BRICK_ACCENT = ["#2DE1C6", "#F5C518"];

/**
 * Telemetry & Capabilities Hub (The Grid). Left: the company overview with two
 * key indicators encased in glass display bricks with illuminated top lips in
 * the brand colours, and the partner paragraph. Right: the telemetry instrument
 * with count-up values and a live diagnostic feed.
 */
export function Overview() {
  const { label, numbers, paragraph, telemetry } = overview;

  return (
    <section id="overview" className="section">
      <div className="shell grid gap-12 wide:grid-cols-2 wide:gap-16">
        {/* Left. */}
        <Reveal className="min-w-0">
          <p className="label label-neon">{label}</p>

          <div className="mt-8 grid grid-cols-2 gap-5">
            {numbers.map((n, i) => (
              <div
                key={n.caption}
                className="glass relative overflow-hidden p-6"
                style={
                  { "--accent": BRICK_ACCENT[i] } as React.CSSProperties
                }
              >
                {/* Illuminated top lip in the brick's brand colour. */}
                <span
                  aria-hidden="true"
                  className="accent-lip absolute inset-x-0 top-0 h-px"
                />
                <p className="font-mono text-4xl font-medium text-white wide:text-5xl">
                  <CountUp value={n.value} />
                  <span className="accent-glow">{n.suffix}</span>
                </p>
                <p className="label mt-3">{n.caption}</p>
              </div>
            ))}
          </div>

          <p className="mt-9 max-w-xl text-lg leading-relaxed text-white/80">
            {paragraph}
          </p>
        </Reveal>

        {/* Right: telemetry instrument. */}
        <Reveal delay={1} className="min-w-0">
          <div className="glass glass-lit">
            <div className="flex items-center justify-between border-b border-neon/20 px-6 py-4">
              <span className="label label-neon">{telemetry.title}</span>
              <span className="flex items-center gap-2">
                <span className="status-dot h-2 w-2 rounded-full bg-action shadow-glow-action" />
                <span className="label text-action">live</span>
              </span>
            </div>
            <dl className="divide-y divide-neon/10">
              {telemetry.rows.map((row) => (
                <div
                  key={row.key}
                  className="flex items-baseline justify-between gap-4 px-6 py-3.5"
                >
                  <dt className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-dim">
                    {row.key}
                  </dt>
                  <dd className="min-w-0 break-words text-right font-mono text-xs tracking-[0.06em] text-white">
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
