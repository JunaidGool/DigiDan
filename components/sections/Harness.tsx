import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { harness } from "@/content/harness";
import { HarnessCage } from "@/components/iso/HarnessCage";

export function Harness() {
  return (
    <section
      id="ai"
      className="scroll-mt-20 border-y border-line bg-paper py-20 md:py-28"
    >
      <div className="shell grid items-center gap-14 md:grid-cols-2">
        {/* Copy */}
        <div>
          <span className="eyebrow">{harness.eyebrow}</span>
          <h2 className="mt-4 text-3xl md:text-4xl">{harness.headline}</h2>
          <p className="mt-4 max-w-prose text-lg text-ink/80">{harness.lead}</p>

          <ul className="mt-8 space-y-3">
            {harness.capabilities.map((c) => (
              <li key={c} className="flex gap-3 text-sm text-ink/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-[1px] bg-teal-500" aria-hidden />
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <blockquote className="mt-9 rounded-tile border-l-4 border-amber-400 bg-amber-100 p-5">
            <p className="text-eyebrow font-medium uppercase tracking-wider text-amber-900">
              {harness.principle.label}
            </p>
            <p className="mt-2 text-amber-900">{harness.principle.quote}</p>
          </blockquote>

          <Link
            href="/products/war-room"
            className="group mt-6 inline-flex items-center gap-2 font-medium text-teal-900 underline underline-offset-4 hover:text-teal-500"
          >
            See the harness running — The War Room
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>

        {/* Illustration: volatile amber block inside a rigid deterministic
            frame. The cage pulse is disabled under reduced motion. */}
        <figure className="flex flex-col items-center">
          <HarnessCage className="w-full max-w-md" />
          <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-hidden="true">
            {harness.gates.map((gate) => (
              <li
                key={gate}
                className="rounded bg-ink px-2.5 py-1 font-mono text-[11px] text-paper"
              >
                {gate}
              </li>
            ))}
          </ul>
          <figcaption className="mt-4 text-center text-sm text-muted">
            Volatile model, rigid frame.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
