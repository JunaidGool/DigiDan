import Link from "next/link";
import { steps, approachIntro, type Step } from "@/content/approach";
import { Staircase } from "@/components/iso/Staircase";
import { MobileStaircase } from "@/components/iso/MobileStaircase";
import { Reveal } from "@/components/Reveal";

// Number badges: family tint with same-family dark text (AA on every family).
const BADGE: Record<Step["family"], string> = {
  teal: "bg-teal-100 text-teal-900",
  amber: "bg-amber-100 text-amber-900",
  coral: "bg-coral-100 text-coral-900",
};

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-20 py-20 md:py-28">
      <div className="shell">
        <span className="eyebrow">{approachIntro.eyebrow}</span>
        <h2 className="mt-4 text-3xl md:text-4xl">{approachIntro.heading}</h2>
        <p className="mt-4 max-w-prose text-lg text-ink/80">
          {approachIntro.lead}{" "}
          <Link
            href="/approach"
            className="text-teal-900 underline underline-offset-4 hover:text-teal-500"
          >
            Read the full approach.
          </Link>
        </p>

        {/* Desktop: horizontal isometric staircase (decorative) + content grid. */}
        <Reveal className="mt-12 hidden md:block">
          <Staircase steps={steps} />
        </Reveal>
        <ol className="mt-12 hidden gap-x-8 gap-y-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="flex gap-4">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md font-display text-sm font-semibold ${BADGE[s.family]}`}
              >
                {s.n}
              </span>
              <div>
                <h3 className="text-lg">{s.title}</h3>
                <p className="mt-1 text-sm text-ink/75">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Mobile: vertical block stack that builds top-down (carries content). */}
        <Reveal className="mt-10 md:hidden">
          <MobileStaircase steps={steps} />
        </Reveal>
      </div>
    </section>
  );
}
