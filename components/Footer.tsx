import { LogoMark, Wordmark } from "./Logo";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { nav, footer, site, hero, CONTACT_HREF } from "@/content/home";

/**
 * Footer: a hairline rule seals the page, then a two-part row. Left: the mark,
 * wordmark, a short line about the company and the legal identity. Right: the
 * primary navigation and the contact action.
 */
export function Footer() {
  return (
    <footer className="border-t border-line bg-night">
      <Container className="py-16">
        <div className="grid gap-12 wide:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="flex items-center gap-2.5 text-white">
              <LogoMark size={32} tone="brand" title="DigiDan" />
              <Wordmark className="text-base text-white" />
            </span>
            <p className="mt-5 text-lg font-semibold text-white">{hero.tagline}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ash">
              {site.description}
            </p>
            <Button href={CONTACT_HREF} className="mt-8" withArrow>
              {footer.contact}
            </Button>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3 wide:items-end">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-fog">
              Explore
            </p>
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-ash transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-[0.62rem] uppercase tracking-[0.2em] text-fog wide:flex-row wide:items-center wide:justify-between">
          <span>
            {footer.legalName} &nbsp;·&nbsp; {footer.location}
          </span>
          <nav aria-label="Legal" className="flex gap-6">
            <a href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="/terms" className="transition-colors hover:text-white">
              Terms
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
