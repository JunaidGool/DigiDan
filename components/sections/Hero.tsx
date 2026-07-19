import { hero, CONTACT_HREF } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { IsometricCore } from "@/components/IsometricCore";

/**
 * Hero: a large statement headline, a lead paragraph and two actions, above the
 * flagship centrepiece — the Living Isometric Core, a real-time WebGL rig of
 * DigiDan's own building blocks that assembles on load, pulses light between
 * modules and tilts to the cursor.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 wide:pt-32">
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

      {/* Flagship centrepiece. */}
      <div className="relative -mt-2 wide:-mt-6">
        {/* Warm floor-glow behind the rig. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-56 max-w-3xl rounded-[50%] bg-orange/10 blur-3xl"
        />
        <Container>
          <IsometricCore />
          <p className="kicker justify-center">{hero.cubeCaption}</p>
        </Container>
      </div>
    </section>
  );
}
