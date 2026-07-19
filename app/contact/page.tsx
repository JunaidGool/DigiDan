import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a build with DigiDan: financial-grade software engineering in South Africa.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main id="main" className="pb-8">
      <PageHeader
        eyebrow="Contact"
        title="Have a system that needs building? Let's find the first block."
        lead={`Tell us about the problem, the systems around it and what “done” looks like. A senior engineer will respond, not a sales funnel.`}
      />

      <div className="shell mt-12 grid gap-12 md:grid-cols-[1fr_320px]">
        <ContactForm />

        <aside className="text-sm text-ink/80">
          <p className="eyebrow">Direct</p>
          <p className="mt-3">{site.location}</p>
          <p>
            <a href={site.url} className="text-teal-900 underline">
              {site.domain}
            </a>
          </p>
          <p className="mt-6 eyebrow">What happens next</p>
          <ol className="mt-3 space-y-2">
            <li>1. We read your message ourselves.</li>
            <li>2. A short call to understand the operating problem.</li>
            <li>3. A clear, scoped path to the first increment.</li>
          </ol>
        </aside>
      </div>
    </main>
  );
}
