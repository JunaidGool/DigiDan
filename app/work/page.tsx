import type { Metadata } from "next";
import { work, cta, CONTACT_HREF } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import { ProductMark } from "@/components/ui/ProductMark";
import { ProjectPlaceholder } from "@/components/ui/ProjectPlaceholder";

export const metadata: Metadata = {
  title: "Work: platforms and products we have built | DigiDan",
  description:
    "A selection of the platforms and products DigiDan has designed, built and still supports, each solving a real operating problem for the business using it.",
  alternates: { canonical: "/work" },
};

/**
 * Work page. Real projects from the company profile, laid out CoLab-style:
 * project detail on one side, a graphic on the other, alternating down the page.
 * The graphics are branded placeholders until real project screenshots are
 * supplied. Client companies are not named on the site.
 */
export default function WorkPage() {
  return (
    <main id="top">
      <section className="relative pt-32 pb-24 wide:pt-40 wide:pb-32">
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow>{work.label}</Eyebrow>
            <h1 className="mt-5 text-display font-bold text-white">{work.title}</h1>
            <p className="mt-6 max-w-2xl text-lead text-ash">{work.intro}</p>
          </Reveal>

          <div className="mt-16 space-y-20 wide:mt-24 wide:space-y-28">
            {work.items.map((p, i) => {
              const reverse = i % 2 === 1;
              return (
                <div
                  key={p.name}
                  className="grid items-center gap-10 wide:grid-cols-2 wide:gap-16"
                >
                  <Reveal className={reverse ? "wide:order-2" : undefined}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-raised">
                        <ProductMark type={p.mark} index={i} size={24} />
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-fog">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="mt-5 text-h3 font-bold text-white">{p.name}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-ash">{p.blurb}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.stack.split(" · ").map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ash"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Reveal>

                  <Reveal delay={1} className={reverse ? "wide:order-1" : undefined}>
                    <ProjectPlaceholder name={p.name} mark={p.mark} index={i} />
                  </Reveal>
                </div>
              );
            })}
          </div>

          <Reveal className="mt-24 border-t border-line pt-14 text-center">
            <h2 className="text-h3 font-bold text-white">{cta.title}</h2>
            <div className="mt-7 flex justify-center">
              <Button href={CONTACT_HREF} size="lg" withArrow>
                {cta.primary}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
