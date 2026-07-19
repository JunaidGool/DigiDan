import { hero, CONTACT_HREF } from "@/content/home";
import { Reveal } from "@/components/Reveal";
import { ContainmentCube } from "@/components/ContainmentCube";

/**
 * Hero (spec 3.2): the lab. Two columns. Left: mono eyebrow, H1, one short
 * paragraph, two buttons. Right: the containment cube, translated down so it
 * crosses into the dark statement band (the one allowed grid violation). The
 * violation is disabled below the 960px breakpoint.
 */
export function Hero() {
  return (
    <section className="lab-grid relative bg-paper pt-16">
      <div className="shell grid items-center gap-12 pb-16 pt-10 wide:grid-cols-[1fr_minmax(0,26rem)] wide:pb-24">
        {/* Left: copy */}
        <div>
          <Reveal as="p" className="label" delay={0}>
            {hero.eyebrow}
          </Reveal>
          <Reveal as="h1" className="mt-6 text-h1" delay={1}>
            {hero.h1}
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.24em] text-slate-l">
              {hero.subline}
            </p>
            <p className="mt-6 max-w-xl text-lg text-ink/85">{hero.paragraph}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={CONTACT_HREF} className="btn btn-amber">
                {hero.primary}
              </a>
              <a href="#capabilities" className="btn btn-ghost">
                {hero.secondary}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right: the containment cube. On wide screens the stage drops down so
            the cube straddles the seam into the statement band below. */}
        <div className="relative hidden justify-center wide:flex">
          <div className="relative z-20 translate-y-[150px]">
            <ContainmentCube />
          </div>
        </div>

        {/* Mobile / narrow: cube shown in flow, no grid violation. */}
        <div className="flex justify-center wide:hidden">
          <ContainmentCube />
        </div>
      </div>
    </section>
  );
}
