import Link from "next/link";
import { hero, credibility } from "@/content/hero";
import { primaryCta, secondaryCta } from "@/content/site";
import { LogoMark } from "@/components/Logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="shell grid items-center gap-12 py-16 md:grid-cols-[55fr_45fr] md:py-24">
        {/* Left: copy */}
        <div>
          <span className="inline-flex rounded-full bg-teal-100 px-3 py-1 text-eyebrow font-medium uppercase tracking-wider text-teal-900">
            {hero.badge}
          </span>
          <h1 className="mt-6 text-4xl leading-[1.08] md:text-[3.25rem]">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-prose text-lg text-ink/80">{hero.subhead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={primaryCta.href}
              className="inline-flex rounded-lg bg-ink px-6 py-3 font-medium text-paper transition-transform duration-150 ease-settle hover:-translate-y-0.5"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex rounded-lg border border-ink/20 px-6 py-3 font-medium text-ink transition-colors hover:border-ink/40"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* Right: the signature mark. Phase 1 static assembled state;
            Phase 3 replaces with the drift-and-click assembly animation. */}
        <div className="flex justify-center md:justify-end">
          <LogoMark
            size={280}
            className="motion-safe:animate-ambient-float"
            title="DigiDan — modular blocks assembled into one system"
          />
        </div>
      </div>

      {/* Credibility strip (brief 5.2) — text names only, no third-party logos */}
      <div className="border-y border-line bg-paper-warm">
        <div className="shell flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-8">
          <span className="eyebrow shrink-0">{credibility.label}</span>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {credibility.items.map((item) => (
              <li key={item.name} className="text-sm text-ink/75">
                <span className="font-medium text-ink">{item.name}</span>{" "}
                <span className="text-muted">{item.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
