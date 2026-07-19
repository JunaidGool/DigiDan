import Link from "next/link";
import { nav, footerLinks, site } from "@/content/site";
import { closing } from "@/content/leadership";
import { LogoMark, Wordmark } from "./Logo";
import { ArcMotif } from "./ArcMotif";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Closing CTA on the burnt-orange band (brief 6.9): large Fraunces line
          and a cream pill with orange text. */}
      <section className="bg-coral-500">
        <div className="shell flex flex-col items-start gap-6 py-20 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-2xl text-3xl text-cream md:text-4xl">
            {closing.heading}
          </h2>
          <Link
            href={closing.cta.href}
            className="inline-flex shrink-0 rounded-full bg-cream px-6 py-3 font-semibold text-coral-900 transition-transform duration-150 ease-settle hover:-translate-y-0.5"
          >
            {closing.cta.label}
          </Link>
        </div>
      </section>

      {/* Footer on ink (brief 6.10): cream text, nav repeat, and the arc motif. */}
      <footer className="bg-ink text-cream">
        <div className="shell relative grid gap-10 py-14 md:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark size={30} />
              <Wordmark className="text-base text-cream" />
            </div>
            <p className="mt-4 max-w-xs text-sm text-cream/70">
              {site.description}
            </p>
            <p className="mt-6 text-sm text-cream/80">
              {site.legalName} · {site.location} · {site.domain} · © {year}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {[...nav, ...footerLinks].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-cream/80 transition-colors hover:text-cream"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Four-colour arc motif (brief 6.10) */}
          <ArcMotif className="pointer-events-none absolute bottom-6 right-6 hidden md:block" />
        </div>
      </footer>
    </>
  );
}
