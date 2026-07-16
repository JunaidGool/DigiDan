import { harness } from "@/content/harness";

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
        </div>

        {/* Illustration: volatile amber block inside a rigid deterministic frame.
            Pulse disabled under reduced motion (motion-safe:). */}
        <figure className="flex flex-col items-center">
          <div
            className="relative grid aspect-square w-full max-w-sm place-items-center rounded-xl border-2 border-ink p-8"
            role="img"
            aria-label="A volatile AI block held inside a rigid frame of deterministic gates: schema validation, evaluation, cost and loop control, and human approval."
          >
            {harness.gates.map((gate, i) => {
              const pos = [
                "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
                "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
                "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2",
                "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
              ][i];
              return (
                <span
                  key={gate}
                  className={`absolute ${pos} whitespace-nowrap rounded bg-ink px-2.5 py-1 font-mono text-[11px] text-paper`}
                >
                  {gate}
                </span>
              );
            })}

            {/* the non-deterministic component */}
            <div className="grid h-28 w-28 place-items-center rounded-lg bg-amber-400 motion-safe:animate-harness-pulse">
              <span className="font-display text-sm font-medium text-amber-900">
                AI
              </span>
            </div>
          </div>
          <figcaption className="mt-4 text-center text-sm text-muted">
            Volatile model, rigid frame.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
