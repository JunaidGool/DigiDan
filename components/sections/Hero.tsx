import Link from "next/link";
import { hero } from "@/content/hero";
import { primaryCta, secondaryCta } from "@/content/site";
import { HeroLogo } from "@/components/HeroLogo";

/**
 * Hero (brief 6.2, gate 1): two columns on desktop, stacked on mobile. Eyebrow
 * in orange-d, large Fraunces headline, plain-language subhead, orange and
 * outline pill CTAs, and the signature block assembly on the right.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="shell grid items-center gap-12 py-16 md:grid-cols-[55fr_45fr] md:py-24">
        {/* Left: copy */}
        <div>
          <span className="eyebrow">{hero.badge}</span>
          <h1 className="mt-5 text-4xl leading-[1.08] md:text-[3.25rem]">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-prose text-lg text-ink/80">{hero.subhead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={primaryCta.href}
              className="inline-flex rounded-full bg-coral-600 px-6 py-3 font-semibold text-cream transition-transform duration-150 ease-settle hover:-translate-y-0.5"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex rounded-full border-2 border-ink px-6 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* Right: the signature drift-and-click assembly (brief 6.2). */}
        <div className="flex justify-center md:justify-end">
          <HeroLogo size={280} />
        </div>
      </div>
    </section>
  );
}
