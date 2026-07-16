import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a build with DigiDan — financial-grade software engineering in South Africa.",
};

// Phase 1 stub. Phase 4 wires the full contact form (honeypot + rate limiting).
export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main" className="shell py-24">
        <span className="eyebrow">Contact</span>
        <h1 className="mt-4 max-w-2xl text-4xl md:text-5xl">
          Have a system that needs building? Let&rsquo;s find the first block.
        </h1>
        <p className="mt-6 max-w-prose text-lg text-ink/80">
          Tell us about the problem, the systems around it and what &ldquo;done&rdquo;
          looks like. A senior engineer will respond — not a sales funnel.
        </p>
        <p className="mt-8 text-ink/80">
          {site.location} · {site.domain}
        </p>
        <p className="mt-10 text-sm text-muted">
          The contact form is wired in Phase 4.{" "}
          <Link href="/" className="text-teal-900 underline">
            Back to home
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
