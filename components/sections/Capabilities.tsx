import { capabilities, capabilityHighlights } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/Reveal";
import { IconLedger, IconPlatform, IconAI, Tick } from "@/components/ui/icons";

const ICONS = [IconLedger, IconPlatform, IconAI];

/**
 * Wrap the highlight phrase (an exact substring of the card copy) in the accent.
 * Falls back to plain text if the phrase is not present.
 */
function withHighlight(text: string, phrase: string) {
  const at = text.indexOf(phrase);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="font-semibold text-orange-light">{phrase}</span>
      {text.slice(at + phrase.length)}
    </>
  );
}

/**
 * What we build: three capability cards, each led by a custom hexagon line icon,
 * with a highlighted phrase and a ticked list of specifics. The layout follows
 * the CoLab feature-card pattern, rebuilt on the DigiDan component kit.
 */
export function Capabilities() {
  return (
    <Section id="capabilities" tone="night">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{capabilities.label}</Eyebrow>
          <h2 className="mt-5 text-h2 font-bold text-white">{capabilities.title}</h2>
        </Reveal>

        <div className="mt-14 grid gap-6 wide:grid-cols-3">
          {capabilities.blades.map((blade, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={blade.index} delay={i}>
                <Card interactive className="flex h-full flex-col p-8">
                  <Icon size={56} className="text-orange" title={blade.title} />
                  <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-fog">
                    {blade.index}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white">{blade.title}</h3>
                  <p className="mt-3 text-ash">
                    {withHighlight(blade.card, capabilityHighlights[i])}
                  </p>
                  <ul className="mt-7 space-y-3 border-t border-line pt-6">
                    {blade.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-ash">
                        <Tick className="mt-0.5 shrink-0 text-orange" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
