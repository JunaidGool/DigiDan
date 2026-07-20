import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/content/home";

/**
 * Shared shell for the long-form legal pages (privacy, terms). Renders the
 * heading, a last-updated line and the prose (styled by the `.legal` class),
 * then a contact footer.
 */
export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main id="top">
      <section className="relative pt-32 pb-24 wide:pt-40 wide:pb-28">
        <Container className="max-w-3xl">
          <Eyebrow>LEGAL</Eyebrow>
          <h1 className="mt-5 text-h2 font-bold text-white">{title}</h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-fog">
            Last updated: {updated}
          </p>

          <div className="legal mt-12">{children}</div>

          <p className="mt-14 border-t border-line pt-8 text-sm text-fog">
            Questions? Email{" "}
            <a className="text-orange-light underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </Container>
      </section>
    </main>
  );
}
