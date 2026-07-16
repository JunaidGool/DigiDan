import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Staircase } from "@/components/iso/Staircase";
import { Reveal } from "@/components/Reveal";
import { steps, type Step } from "@/content/approach";
import { harness } from "@/content/harness";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How DigiDan delivers: a seven-step method from discovery to support, and a harness-engineering approach that keeps AI inside deterministic boundaries.",
  alternates: { canonical: "/approach" },
};

const FILL: Record<Step["family"], string> = {
  teal: "bg-teal-500",
  amber: "bg-amber-400",
  coral: "bg-coral-500",
};

export default function ApproachPage() {
  return (
    <main id="main" className="pb-8">
      <PageHeader
        eyebrow="Approach"
        title="Seven blocks, one system."
        lead="We favour clear problem definition, strong architecture, incremental delivery and evidence-led quality. Each engagement is shaped around measurable operating value, appropriate technology and a supportable long-term solution."
      />

      <div className="shell">
        <Reveal className="mt-14 hidden md:block">
          <Staircase steps={steps} />
        </Reveal>

        <ol className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {steps.map((s) => (
            <li key={s.n} className="flex gap-4 border-t border-line pt-5">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md font-display text-sm font-medium text-paper ${FILL[s.family]}`}
              >
                {s.n}
              </span>
              <div>
                <h2 className="text-lg">{s.title}</h2>
                <p className="mt-1 text-ink/80">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* AI harness philosophy in depth */}
      <section className="mt-24 border-t border-line bg-paper-warm py-20">
        <div className="shell">
          <span className="eyebrow">{harness.eyebrow}</span>
          <h2 className="mt-4 max-w-3xl text-3xl md:text-4xl">
            {harness.headline}
          </h2>
          <p className="mt-6 max-w-prose text-lg text-ink/80">{harness.lead}</p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <ul className="space-y-4">
              {harness.capabilities.map((cap) => (
                <li key={cap} className="flex gap-3 text-ink/85">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-[1px] bg-teal-500"
                    aria-hidden
                  />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>

            <div>
              <p className="eyebrow">The deterministic frame</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {harness.gates.map((gate) => (
                  <li
                    key={gate}
                    className="rounded bg-ink px-3 py-1.5 font-mono text-xs text-paper"
                  >
                    {gate}
                  </li>
                ))}
              </ul>
              <blockquote className="mt-8 rounded-tile border-l-4 border-amber-400 bg-amber-100 p-5">
                <p className="text-eyebrow font-medium uppercase tracking-wider text-amber-900">
                  {harness.principle.label}
                </p>
                <p className="mt-2 text-amber-900">{harness.principle.quote}</p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
