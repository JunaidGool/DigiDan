import { hero, CONTACT_HREF } from "@/content/home";
import { Reveal } from "@/components/Reveal";
import { Hypercube } from "@/components/Hypercube";

/**
 * Hero (The Grid). Left: eyebrow, headline with a neon glow, the "built for the
 * real world" tagline, one paragraph and two actions. Right: the WebGL
 * hypercube. Columns stack below the 960px breakpoint.
 */
export function Hero() {
  return (
    <section className="relative pt-16">
      <div className="shell grid items-center gap-10 pb-16 pt-12 wide:grid-cols-[1fr_minmax(0,30rem)] wide:pb-24 wide:pt-20">
        <div>
          <Reveal as="p" className="label label-neon" delay={0}>
            {hero.eyebrow}
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.28em] text-dim">
              {hero.legal}
            </p>
            <h1 className="glow-text mt-4 text-h1 font-light">{hero.h1}</h1>
            <p className="glow-neon-text mt-3 font-display text-xl font-light tracking-[0.04em] wide:text-2xl">
              {hero.tagline}
            </p>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-7 max-w-xl text-lg text-white/75">{hero.paragraph}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={CONTACT_HREF} className="btn btn-action">
                {hero.primary}
              </a>
              <a href="#capabilities" className="btn btn-ghost">
                {hero.secondary}
              </a>
            </div>
          </Reveal>
        </div>

        {/* The core. */}
        <div className="relative">
          <Hypercube />
          <p className="label label-neon mt-2 text-center">{hero.cubeCaption}</p>
        </div>
      </div>
    </section>
  );
}
