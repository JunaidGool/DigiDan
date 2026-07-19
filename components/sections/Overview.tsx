import { overview } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { LiveFeed } from "@/components/LiveFeed";
import { BRAND } from "@/components/ui/brand";

// Two indicators, carried in two of the logo colours.
const STAT_ACCENT = [BRAND.teal, BRAND.yellow];

/**
 * Company overview. Left: the eyebrow, two large key indicators and the partner
 * paragraph. Right: a live telemetry panel styled as a product window, with the
 * count-up values and the streaming diagnostic feed.
 */
export function Overview() {
  const { label, numbers, paragraph, telemetry } = overview;

  return (
    <Section id="overview">
      <Container className="grid gap-12 wide:grid-cols-2 wide:gap-16">
        {/* Left. */}
        <Reveal className="min-w-0">
          <Eyebrow>{label}</Eyebrow>

          <div className="mt-8 grid grid-cols-2 gap-5">
            {numbers.map((n, i) => (
              <Card key={n.caption} className="p-6">
                <p className="text-5xl font-extrabold tracking-tight text-white wide:text-6xl">
                  <CountUp value={n.value} />
                  <span style={{ color: STAT_ACCENT[i % STAT_ACCENT.length] }}>
                    {n.suffix}
                  </span>
                </p>
                <p className="mt-3 text-sm text-ash">{n.caption}</p>
              </Card>
            ))}
          </div>

          <p className="mt-9 max-w-xl text-lg leading-relaxed text-ash">
            {paragraph}
          </p>
        </Reveal>

        {/* Right: telemetry instrument. */}
        <Reveal delay={1} className="min-w-0">
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-fog">
                {telemetry.title}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 animate-blink rounded-full bg-orange" />
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-orange">
                  live
                </span>
              </span>
            </div>
            <dl className="divide-y divide-line">
              {telemetry.rows.map((row) => (
                <div
                  key={row.key}
                  className="flex items-baseline justify-between gap-4 px-6 py-3.5"
                >
                  <dt className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-fog">
                    {row.key}
                  </dt>
                  <dd className="min-w-0 break-words text-right font-mono text-xs tracking-[0.04em] text-white">
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
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}
