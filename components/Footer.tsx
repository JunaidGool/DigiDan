import Link from "next/link";
import { nav, footerLinks, site } from "@/content/site";
import { closing } from "@/content/leadership";
import { LogoMark, Wordmark } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Closing CTA band (brief 5.8) */}
      <section className="bg-paper-warm border-t border-line">
        <div className="shell flex flex-col items-start gap-6 py-20 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-2xl text-3xl md:text-4xl">{closing.heading}</h2>
          <Link
            href={closing.cta.href}
            className="inline-flex shrink-0 rounded-lg bg-ink px-6 py-3 font-medium text-paper transition-transform duration-150 ease-settle hover:-translate-y-0.5"
          >
            {closing.cta.label}
          </Link>
        </div>
      </section>

      <footer className="border-t border-line bg-paper">
        <div className="shell relative grid gap-10 py-14 md:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark size={30} />
              <Wordmark className="text-base text-ink" />
            </div>
            <p className="mt-4 max-w-xs text-sm text-ink/70">
              {site.description}
            </p>
            <p className="mt-6 text-sm text-muted">
              {site.location} · {site.domain} · © {year} {site.legalName}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {[...nav, ...footerLinks].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-ink/80 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Small disassembled-blocks motif (brief 5.8) */}
          <div
            className="pointer-events-none absolute bottom-6 right-6 hidden gap-1.5 md:flex"
            aria-hidden="true"
          >
            <span className="h-3 w-3 rotate-45 bg-teal-300" />
            <span className="h-3 w-3 rotate-45 bg-coral-300" />
            <span className="h-3 w-3 rotate-45 bg-amber-200" />
          </div>
        </div>
      </footer>
    </>
  );
}
