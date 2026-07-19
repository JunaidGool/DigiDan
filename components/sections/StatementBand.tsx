import { statement } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal";

/**
 * Statement band: one large, plain-spoken claim set in the big display voice,
 * the lead sentence in white and the rest carried down in muted grey, echoing
 * the CoLab problem-statement headlines.
 */
export function StatementBand() {
  return (
    <Section>
      <Container>
        <Reveal className="max-w-4xl">
          <Eyebrow>{statement.label}</Eyebrow>
          <p className="mt-8 text-h2 font-semibold leading-tight">
            <span className="text-white">{statement.lead}</span>{" "}
            <span className="text-fog">{statement.rest}</span>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
