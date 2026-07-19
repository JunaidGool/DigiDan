import { cta, CONTACT_HREF } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";

/**
 * Closing call to action: a full-width gradient panel that lifts the eye before
 * the footer, mirroring the CoLab end-of-page conversion band. Orange leads the
 * gradient; the primary action sits on the dark inner card for contrast.
 */
export function CTA() {
  return (
    <section className="py-20 wide:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ember p-1.5 shadow-glow-soft">
            <div className="rounded-[calc(2.375rem-6px)] bg-ink/60 px-6 py-16 text-center backdrop-blur-sm wide:px-16 wide:py-20">
              <p className="kicker justify-center text-white/70">{cta.label}</p>
              <h2 className="mx-auto mt-6 max-w-3xl text-h2 font-bold text-white">
                {cta.title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-ash">
                {cta.paragraph}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button href={CONTACT_HREF} size="lg" withArrow>
                  {cta.primary}
                </Button>
                <Button href="#capabilities" variant="secondary" size="lg">
                  {cta.secondary}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
