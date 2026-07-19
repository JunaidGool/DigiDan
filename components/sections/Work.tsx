import { work } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/Reveal";

/**
 * Things we have built: the live products, presented as a responsive grid of
 * cards. Each carries its index, name and a small live tag. Calm, high-contrast
 * and on-brand, in place of the earlier animated canvas.
 */
export function Work() {
  return (
    <Section id="work" tone="night">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{work.label}</Eyebrow>
          <h2 className="mt-5 text-h2 font-bold text-white">{work.title}</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 wide:grid-cols-3">
          {work.items.map((name, i) => (
            <Reveal key={name} delay={i % 3}>
              <Card interactive className="flex h-full items-center justify-between gap-4 p-7">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-fog">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-xl font-bold text-white">{name}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-orange/30 bg-orange/10 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-orange-light">
                  <span className="h-1.5 w-1.5 animate-blink rounded-full bg-orange" />
                  Live
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
