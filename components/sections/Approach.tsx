import { steps, approachIntro, type Step } from "@/content/approach";

// mid-stop block fills; the staircase climbs teal -> amber -> coral.
const FILL: Record<Step["family"], string> = {
  teal: "bg-teal-500",
  amber: "bg-amber-400",
  coral: "bg-coral-500",
};

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-20 bg-paper-warm py-20 md:py-28">
      <div className="shell">
        <span className="eyebrow">{approachIntro.eyebrow}</span>
        <h2 className="mt-4 text-3xl md:text-4xl">{approachIntro.heading}</h2>
        <p className="mt-4 max-w-prose text-lg text-ink/80">
          {approachIntro.lead}
        </p>

        {/* Visual staircase — decorative reinforcement (Phase 3 adds scroll-drop).
            The ordered list below carries the accessible content. */}
        <div
          className="mt-14 hidden items-end gap-2 md:flex"
          aria-hidden="true"
        >
          {steps.map((s, i) => (
            <div key={s.n} className="flex flex-1 flex-col items-center gap-2">
              <div
                className={`w-full rounded-t-md ${FILL[s.family]}`}
                style={{ height: `${70 + i * 24}px` }}
              />
              <span className="font-display text-sm font-medium text-ink">
                {s.n}. {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Accessible, always-present content. On mobile this is the primary view. */}
        <ol className="mt-10 grid gap-x-8 gap-y-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="flex gap-4">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md font-display text-sm font-medium text-paper ${FILL[s.family]}`}
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
      </div>
    </section>
  );
}
