import { statement } from "@/content/home";
import { Reveal } from "@/components/Reveal";

/**
 * Statement band (spec 3.3): a full-bleed obsidian band with an amber seam top
 * and bottom. One label and one short statement paragraph, capped at 52rem so
 * it never collides with the cube intruding from the hero above.
 */
export function StatementBand() {
  return (
    <section className="seam-top seam-bottom bg-obsidian">
      <div className="shell py-20 wide:py-28">
        <Reveal className="max-w-statement">
          <p className="label label-d">{statement.label}</p>
          <p className="mt-8 text-statement text-platinum">
            <strong className="font-medium text-platinum">
              {statement.lead}
            </strong>{" "}
            {statement.rest}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
