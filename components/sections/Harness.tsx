import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { harness } from "@/content/harness";
import { HarnessCage } from "@/components/iso/HarnessCage";

/**
 * AI on the deep-teal band (brief 6.8, gate 2). Cream text throughout, teal-l
 * eyebrow. The illustration is a pulsing gold block held inside a rigid cream
 * frame captioned "rules · checks · approval".
 */
export function Harness() {
  return (
    <section id="ai" className="scroll-mt-20 bg-teal-500 py-20 text-cream md:py-28">
      <div className="shell grid items-center gap-14 md:grid-cols-2">
        {/* Copy */}
        <div>
          <span className="eyebrow text-teal-100">{harness.eyebrow}</span>
          <h2 className="mt-4 text-3xl text-cream md:text-4xl">
            {harness.headline}
          </h2>
          <p className="mt-4 max-w-prose text-lg text-cream/90">{harness.lead}</p>

          <ul className="mt-8 space-y-3">
            {harness.capabilities.map((c) => (
              <li key={c} className="flex gap-3 text-sm text-cream/90">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-[1px] bg-amber-400"
                  aria-hidden
                />
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <blockquote className="mt-9 rounded-tile border-l-4 border-amber-400 bg-teal-900 p-5">
            <p className="text-eyebrow font-semibold uppercase tracking-wider text-amber-200">
              {harness.principle.label}
            </p>
            <p className="mt-2 text-cream">{harness.principle.quote}</p>
          </blockquote>

          <Link
            href="/products/war-room"
            className="group mt-6 inline-flex items-center gap-2 font-semibold text-cream underline underline-offset-4 hover:text-teal-300"
          >
            See the harness running: The War Room
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>

        {/* Illustration: pulsing gold block inside a rigid deterministic frame.
            The cage pulse is disabled under reduced motion. */}
        <figure className="flex flex-col items-center">
          <HarnessCage className="w-full max-w-md" />
          <ul
            className="mt-6 flex flex-wrap justify-center gap-2"
            aria-hidden="true"
          >
            {harness.gates.map((gate) => (
              <li
                key={gate}
                className="rounded bg-teal-900 px-2.5 py-1 font-mono text-[11px] text-cream"
              >
                {gate}
              </li>
            ))}
          </ul>
          <figcaption className="mt-4 text-center font-mono text-sm text-cream/80">
            rules · checks · approval
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
