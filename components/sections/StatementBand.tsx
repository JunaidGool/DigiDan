import { statement } from "@/content/home";
import { Reveal } from "@/components/Reveal";

/**
 * Statement band (The Grid): one bright statement on the void, framed top and
 * bottom by cyan light rules. Capped at 52rem for a controlled measure.
 */
export function StatementBand() {
  return (
    <section className="relative">
      <div className="shell">
        <div className="rule-cyan" />
        <div className="py-16 wide:py-24">
          <Reveal className="max-w-statement">
            <p className="label label-cyan">{statement.label}</p>
            <p className="mt-8 text-statement text-white/85">
              <strong className="glow-text font-normal text-white">
                {statement.lead}
              </strong>{" "}
              {statement.rest}
            </p>
          </Reveal>
        </div>
        <div className="rule-cyan" />
      </div>
    </section>
  );
}
