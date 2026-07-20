import { services } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { ServiceGraphic } from "@/components/ui/ServiceGraphic";
import { Tick } from "@/components/ui/icons";
import { accentAt } from "@/components/ui/brand";

/**
 * What we can do for you: the centre of the home page. Each service is a
 * full-width row that alternates side to side, benefit copy against a live
 * graphic, so the page reads as a story about outcomes rather than a grid of
 * features. Framed around the customer's question, not our credentials.
 */
export function Services() {
  return (
    <Section id="services" tone="night">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{services.label}</Eyebrow>
          <h2 className="mt-5 text-h2 font-bold text-white">{services.title}</h2>
          <p className="mt-5 text-lg text-ash">{services.intro}</p>
        </Reveal>

        <div className="mt-16 space-y-20 wide:mt-24 wide:space-y-28">
          {services.items.map((s, i) => {
            const accent = accentAt(i);
            const reverse = i % 2 === 1;
            return (
              <div
                key={s.id}
                className="grid items-center gap-10 wide:grid-cols-2 wide:gap-16"
              >
                <Reveal className={reverse ? "wide:order-2" : undefined}>
                  <p
                    className="font-mono text-xs font-medium uppercase tracking-[0.2em]"
                    style={{ color: accent }}
                  >
                    {s.kicker}
                  </p>
                  <h3 className="mt-4 text-h3 font-bold text-white">{s.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-ash">{s.body}</p>
                  <ul className="mt-7 space-y-3">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-ash">
                        <Tick className="mt-1 shrink-0" style={{ color: accent }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal
                  delay={1}
                  className={reverse ? "wide:order-1" : undefined}
                >
                  <ServiceGraphic type={s.graphic} />
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
