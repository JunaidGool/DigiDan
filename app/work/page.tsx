import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { IsoCube } from "@/components/iso/IsoCube";
import { caseStudies } from "@/content/caseStudies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected DigiDan work and project experience: enterprise-scale delivery, product engineering and operational platforms.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main id="main" className="pb-8">
      <PageHeader
        eyebrow="Completed structures"
        title="Systems already running in production."
        lead="Ordered to highlight technically substantial platforms, enterprise-scale delivery and breadth across operational, customer-facing and infrastructure concerns."
      />

      <div className="shell mt-12 grid gap-4 md:grid-cols-2">
        {caseStudies.map((c) => (
          <Link
            key={c.slug}
            href={`/work/${c.slug}`}
            className="group flex flex-col rounded-tile border border-line p-7 transition-transform duration-200 ease-settle hover:-translate-y-1 hover:border-ink/20"
          >
            <div className="flex items-end gap-1.5" aria-hidden="true">
              {c.blocks.map((b, i) => (
                <IsoCube key={i} family={b} size={22} />
              ))}
            </div>
            <h2 className="mt-5 flex items-start justify-between gap-3 text-2xl">
              <span>{c.name}</span>
              <ArrowUpRight
                size={22}
                className="mt-1.5 shrink-0 text-muted transition-colors group-hover:text-ink"
                aria-hidden
              />
            </h2>
            <p className="mt-1 text-sm text-muted">{c.kicker}</p>
            <p className="mt-4 flex-1 text-ink/80">{c.cardOutcome}</p>
            <p className="mt-6 font-mono text-xs text-ink/70">{c.stack}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
