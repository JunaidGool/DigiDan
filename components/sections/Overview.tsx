import { overview } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { BRAND } from "@/components/ui/brand";

// Two indicators, carried in two of the logo colours.
const STAT_ACCENT = [BRAND.teal, BRAND.yellow];

/**
 * Company overview: who is behind DigiDan and how we think, kept deliberately
 * light. Two quiet indicators plus the partner paragraph. The old telemetry
 * instrument was removed: it read as showing off rather than helping the reader.
 */
export function Overview() {
  const { label, numbers, paragraph } = overview;

  return (
    <Section id="overview">
      <Container className="grid items-center gap-12 wide:grid-cols-2 wide:gap-16">
        <Reveal className="min-w-0">
          <Eyebrow>{label}</Eyebrow>
          <p className="mt-8 max-w-xl text-h3 font-semibold leading-tight text-white">
            {paragraph}
          </p>
        </Reveal>

        <Reveal delay={1} className="grid grid-cols-2 gap-5">
          {numbers.map((n, i) => (
            <Card key={n.caption} className="p-7">
              <p className="text-5xl font-extrabold tracking-tight text-white wide:text-6xl">
                <CountUp value={n.value} />
                <span style={{ color: STAT_ACCENT[i % STAT_ACCENT.length] }}>
                  {n.suffix}
                </span>
              </p>
              <p className="mt-3 text-sm text-ash">{n.caption}</p>
            </Card>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
