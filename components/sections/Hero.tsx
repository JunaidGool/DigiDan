import { hero, showcase, CONTACT_HREF } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Reveal } from "@/components/Reveal";

/**
 * A mock application window rendering one capability's live console readout.
 * Sits inside the hero's gradient panel, standing in for a product screenshot.
 */
function ConsoleWindow({
  title,
  index,
  lines,
}: {
  title: string;
  index: string;
  lines: readonly string[];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-ink/85 shadow-lift backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fog">
          {index} / {title}
        </span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.72rem] leading-relaxed text-orange-light">
        {lines.map((l) => (
          <div key={l} className="whitespace-pre">
            {l.startsWith("$") ? (
              <span className="text-white">{l}</span>
            ) : l.startsWith("HOLD") ? (
              <span className="text-gold">{l}</span>
            ) : (
              <span>{l}</span>
            )}
          </div>
        ))}
        <div className="text-white/70">
          <span className="animate-blink">_</span>
        </div>
      </pre>
    </div>
  );
}

/**
 * Hero: a large statement headline, a lead paragraph and two actions, above the
 * signature gradient showcase. The showcase pages through DigiDan's three
 * systems as live console windows, matching the CoLab hero's carousel of
 * product panels but rendered entirely in code.
 */
export function Hero() {
  const slides = showcase.slides.map((s) => (
    <div key={s.index} className="px-4 pb-4 pt-10 wide:px-12 wide:pb-10 wide:pt-12">
      <p className="mb-6 text-center text-lg font-semibold text-white wide:text-2xl">
        {s.title}
      </p>
      <ConsoleWindow title={s.title} index={s.index} lines={s.console} />
    </div>
  ));

  return (
    <section className="relative overflow-hidden pt-28 wide:pt-40">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal as="p" className="kicker justify-center">
            {hero.eyebrow}
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-6 text-display font-bold text-white">
              Software strong enough <br className="hidden wide:block" />
              to <span className="text-ember">depend on</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lead text-ash">
              {hero.paragraph}
            </p>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href={CONTACT_HREF} size="lg" withArrow>
                {hero.primary}
              </Button>
              <Button href="#capabilities" variant="secondary" size="lg">
                {hero.secondary}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Signature gradient showcase. */}
      <Container className="mt-16 wide:mt-24">
        <Reveal delay={1}>
          <div className="relative mx-auto max-w-4xl rounded-2xl bg-ember p-1.5 shadow-glow-soft">
            <div className="rounded-[calc(1.5rem-6px)] bg-ink/30 p-3 wide:p-6">
              <p className="kicker justify-center pt-4 text-white/70">
                {showcase.label}
              </p>
              <Carousel
                className="pb-6"
                slides={slides}
                labels={showcase.slides.map((s) => s.title)}
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
