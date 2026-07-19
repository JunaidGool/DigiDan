import { trust } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";

/**
 * Trust bar: client wordmarks set in a grid of dark cards, the way CoLab frames
 * its Ford / Schaeffler / Komatsu logo wall. Rendered as styled text rather than
 * borrowed logo files.
 */
export function TrustBar() {
  return (
    <div className="border-y border-line bg-night/60">
      <Container className="py-12 wide:py-14">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.24em] text-fog">
            {trust.label}
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {trust.logos.map((name) => (
              <li
                key={name}
                className="flex items-center justify-center rounded-lg border border-line bg-surface px-4 py-6 text-lg font-bold tracking-tight text-white/50 transition-colors hover:border-white/20 hover:text-white/85 wide:text-xl"
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
