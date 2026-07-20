import { faq } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/Reveal";

/**
 * FAQ: plain, factual questions and answers. Built on native <details> so the
 * answers are always in the DOM (good for crawlers and answer engines) and the
 * whole thing is keyboard-accessible with no JavaScript. Mirrored into FAQPage
 * structured data on the page.
 */
export function FAQ() {
  return (
    <Section id="faq" tone="night">
      <Container>
        <Reveal className="max-w-3xl">
          <Eyebrow>{faq.label}</Eyebrow>
          <h2 className="mt-5 text-h2 font-bold text-white">{faq.title}</h2>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-line border-y border-line">
          {faq.items.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold text-white transition-colors hover:text-orange-light [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 shrink-0 text-orange"
                >
                  <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-current transition-transform duration-300 group-open:rotate-90" />
                </span>
              </summary>
              <p className="pb-6 pr-8 text-ash">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
