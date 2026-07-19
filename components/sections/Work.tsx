import { work } from "@/content/home";
import { Reveal } from "@/components/Reveal";

/**
 * Things we have built (spec 3.6): the lab. Currently a strip of five product
 * names. Planned upgrade: short case blocks for TrimBase and DeploySeal first.
 */
export function Work() {
  return (
    <section id="work" className="lab-grid section bg-paper">
      <div className="shell">
        <Reveal>
          <p className="label">{work.label}</p>
          <h2 className="mt-4 text-h2">{work.title}</h2>
        </Reveal>

        <Reveal className="mt-12 grid gap-px bg-line-l wide:grid-cols-5">
          {work.items.map((name, i) => (
            <div
              key={name}
              className="flex items-center gap-4 bg-paper px-6 py-8"
            >
              <span className="label text-amber-l">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg font-medium tracking-[0.02em] text-ink">
                {name}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
