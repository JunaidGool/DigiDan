import { trust } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";

/**
 * Trust bar: a hairline-framed band of client wordmarks, the way CoLab sets its
 * Lockheed / Komatsu / GE row under the hero. Rendered as styled text rather
 * than borrowed logo files.
 */
export function TrustBar() {
  return (
    <div className="border-y border-line bg-night/60">
      <Container className="py-10 wide:py-12">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.24em] text-fog">
            {trust.label}
          </p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 wide:gap-x-16">
            {trust.logos.map((name) => (
              <li
                key={name}
                className="text-xl font-bold tracking-tight text-white/45 transition-colors hover:text-white/80 wide:text-2xl"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </div>
  );
}
