import { credibility } from "@/content/hero";
import { leadershipIntro } from "@/content/leadership";

/**
 * Trust and commitment (brief 6.4): centred on the cream canvas. The production
 * credibility line leads, then the commitment statement in large italic
 * Fraunces. No third-party logos, names in text only.
 */
export function Trust() {
  return (
    <section className="scroll-mt-20 py-16 md:py-20">
      <div className="shell flex flex-col items-center text-center">
        <span className="eyebrow">{credibility.label}</span>
        <p className="mt-4 text-base text-ink/80 md:text-lg">
          {credibility.names.join(" · ")}
        </p>
        <p className="mt-10 max-w-3xl font-display text-2xl font-semibold italic leading-[1.25] text-ink md:text-[2rem]">
          {leadershipIntro.commitment}
        </p>
      </div>
    </section>
  );
}
