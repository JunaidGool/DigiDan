import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, portfolioIntro } from "@/content/portfolio";
import { IsoCube } from "@/components/iso/IsoCube";

export function Portfolio() {
  return (
    <section id="work" className="scroll-mt-20 py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="eyebrow">{portfolioIntro.eyebrow}</span>
            <h2 className="mt-4 text-3xl md:text-4xl">{portfolioIntro.heading}</h2>
          </div>
          <Link
            href="/work"
            className="text-sm text-teal-900 underline underline-offset-4 hover:text-teal-500"
          >
            View all work
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group flex flex-col rounded-tile border border-line bg-paper p-6 transition-transform duration-200 ease-settle hover:-translate-y-1 hover:border-ink/20"
            >
              {/* the blocks this structure was built from */}
              <div className="flex items-end gap-1.5" aria-hidden="true">
                {p.blocks.map((b, i) => (
                  <IsoCube key={i} family={b} size={22} />
                ))}
              </div>

              <h3 className="mt-5 flex items-start justify-between gap-2 text-xl">
                <span>{p.name}</span>
                <ArrowUpRight
                  size={20}
                  className="mt-1 shrink-0 text-muted transition-colors group-hover:text-ink"
                  aria-hidden
                />
              </h3>
              {p.client && (
                <p className="mt-1 text-sm text-muted">{p.client}</p>
              )}
              <p className="mt-3 flex-1 text-sm text-ink/80">{p.outcome}</p>
              <p className="mt-5 font-mono text-xs text-ink/70">{p.stack}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
