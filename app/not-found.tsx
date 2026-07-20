import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/Logo";
import { CONTACT_HREF } from "@/content/home";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="top" className="grid min-h-screen place-items-center py-32">
      <Container className="text-center">
        <div className="mx-auto mb-8 w-fit">
          <LogoMark size={56} tone="brand" title="DigiDan" />
        </div>
        <p className="kicker justify-center">ERROR 404</p>
        <h1 className="mt-5 text-h2 font-bold text-white">
          This page could not be found.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-ash">
          The page you are looking for has moved or never existed. Let us point
          you back to something solid.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" size="lg" withArrow>
            Back to home
          </Button>
          <Button href={CONTACT_HREF} variant="secondary" size="lg">
            Contact us
          </Button>
        </div>
      </Container>
    </main>
  );
}
