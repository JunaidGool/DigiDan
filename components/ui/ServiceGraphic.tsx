import { Tick } from "./icons";

/**
 * ServiceGraphic: a bespoke, self-animating "product panel" for each service,
 * standing in for a real product screenshot. Pure markup + CSS keyframes (no JS,
 * no libraries), so it renders on the server and pauses under reduced motion.
 * These read as small live dashboards of what each service actually does.
 */

const TEAL = "#2DE1C6";
const ORANGE = "#F07E26";
const YELLOW = "#F5C518";

function Shell({
  accent,
  title,
  status,
  children,
}: {
  accent: string;
  title: string;
  status: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-night p-4 shadow-lift">
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-fog">
          <span
            className="h-2 w-2 animate-blink rounded-full"
            style={{ backgroundColor: accent }}
          />
          {title}
        </span>
        <span
          className="font-mono text-[0.58rem] uppercase tracking-[0.2em]"
          style={{ color: accent }}
        >
          {status}
        </span>
      </div>
      {children}
    </div>
  );
}

/**
 * Financial-grade engineering: an integrity panel showing the disciplines that
 * matter in financial systems. Deliberately about engineering (exactly-once,
 * audit, reconciliation), not a money/payment UI, so it never reads as a bank.
 */
function FintechGraphic() {
  const checks = [
    "Exactly-once processing",
    "Append-only audit trail",
    "Reconciled, end of day",
  ];
  return (
    <Shell accent={TEAL} title="Integrity" status="verified">
      <div className="space-y-2">
        {checks.map((c, i) => (
          <div
            key={c}
            className="flex items-center gap-2 rounded-md border border-line bg-ink px-3 py-2"
            style={{ animation: "dgnSeq 3.6s ease-in-out infinite", animationDelay: `${i * 0.9}s` }}
          >
            <Tick className="h-3.5 w-3.5" style={{ color: TEAL }} />
            <span className="text-[0.72rem] text-white">{c}</span>
          </div>
        ))}
        <div className="flex items-center gap-3 rounded-md border border-line bg-ink px-3 py-2">
          <span className="text-[0.72rem] text-ash">Reconciliation</span>
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
            <span
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: TEAL, animation: "dgnFill 3.6s ease-in-out infinite" }}
            />
          </div>
          <span className="font-mono text-[0.62rem]" style={{ color: TEAL }}>
            ok
          </span>
        </div>
      </div>
      <div className="mt-4 space-y-1.5 font-mono text-[0.62rem] text-fog">
        <div>&gt; idempotent consumers armed</div>
        <div>&gt; iso 20022 mapped</div>
        <div className="text-ash">&gt; pci-dss conscious</div>
      </div>
    </Shell>
  );
}

/** Platforms: connected systems with a pulse travelling the pipeline. */
function PlatformsGraphic() {
  const nodes = ["Store", "API", "Cloud", "Data"];
  return (
    <Shell accent={ORANGE} title="Systems" status="synced">
      <div className="relative rounded-lg border border-line bg-ink px-4 py-6">
        <div className="relative flex items-center justify-between">
          {/* Connecting track with a travelling pulse. */}
          <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
          <span
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: ORANGE, animation: "dgnFlow 2.8s linear infinite" }}
          />
          {nodes.map((n) => (
            <span
              key={n}
              className="relative z-10 rounded-md border border-line bg-raised px-2.5 py-1.5 text-[0.62rem] font-medium text-white"
            >
              {n}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-fog">
          deploy
        </span>
        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
          <span
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ backgroundColor: ORANGE, animation: "dgnFill 3.2s ease-in-out infinite" }}
          />
        </div>
        <span className="font-mono text-[0.62rem]" style={{ color: ORANGE }}>
          build green
        </span>
      </div>

      <div className="mt-4 space-y-1.5 font-mono text-[0.62rem] text-fog">
        <div>&gt; nopcommerce store connected</div>
        <div>&gt; data feeds synced</div>
        <div className="text-ash">&gt; legacy bridge online</div>
      </div>
    </Shell>
  );
}

/** AI: an automation run with checks passing and a human approval gate. */
function AIGraphic() {
  const steps = [
    { label: "Draft generated", done: true },
    { label: "Output verified", done: true },
  ];
  return (
    <Shell accent={YELLOW} title="Automation run" status="gated">
      <div className="space-y-2">
        {steps.map((s, i) => (
          <div
            key={s.label}
            className="flex items-center gap-2 rounded-md border border-line bg-ink px-3 py-2"
            style={{ animation: "dgnSeq 3.6s ease-in-out infinite", animationDelay: `${i * 0.9}s` }}
          >
            <Tick className="h-3.5 w-3.5" style={{ color: YELLOW }} />
            <span className="text-[0.72rem] text-white">{s.label}</span>
          </div>
        ))}

        <div className="flex items-center gap-3 rounded-md border border-line bg-ink px-3 py-2">
          <span className="text-[0.72rem] text-ash">Token budget</span>
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
            <span
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: YELLOW, animation: "dgnFill 3.6s ease-in-out infinite" }}
            />
          </div>
          <span className="font-mono text-[0.62rem]" style={{ color: YELLOW }}>
            42%
          </span>
        </div>

        <div className="flex items-center justify-between rounded-md border border-line bg-ink px-3 py-2">
          <span className="text-[0.72rem] text-ash">Human approval</span>
          <span
            className="rounded-full px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em]"
            style={{ animation: "dgnFlip 3.2s ease-in-out infinite" }}
          >
            Approved
          </span>
        </div>
      </div>
    </Shell>
  );
}

export function ServiceGraphic({ type }: { type: string }) {
  if (type === "fintech") return <FintechGraphic />;
  if (type === "platforms") return <PlatformsGraphic />;
  return <AIGraphic />;
}
