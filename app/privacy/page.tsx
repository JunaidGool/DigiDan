import type { Metadata } from "next";
import Link from "next/link";
import { privacyMeta, sections } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How DigiDan (Pty) Ltd collects, uses and protects personal information through this website, in line with South Africa's POPIA.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[46rem] px-6 pb-16 pt-12 md:px-10 md:pt-16">
      {/* Draft banner — this notice is not final until completed + legally reviewed. */}
      <p
        role="note"
        className="rounded-tile border-l-4 border-coral-500 bg-coral-100 p-4 text-sm text-coral-900"
      >
        {privacyMeta.draftBanner}
      </p>

      <header className="mt-8 border-b border-line pb-8">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-3 text-3xl md:text-4xl">{privacyMeta.title}</h1>
        <p className="mt-4 text-lg text-ink/80">{privacyMeta.lead}</p>
        <p className="mt-4 text-sm text-muted">
          Effective: {privacyMeta.effectiveDate}
        </p>
      </header>

      <div className="mt-4">
        {sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="text-xl">{s.heading}</h2>
            {s.blocks.map((b, i) =>
              b.type === "p" ? (
                <p key={i} className="mt-4 text-ink/85 leading-[1.7]">
                  {b.text}
                </p>
              ) : (
                <ul
                  key={i}
                  className="mt-4 list-disc space-y-2 pl-6 text-ink/85"
                >
                  {b.items.map((it) => (
                    <li key={it} className="leading-[1.6]">
                      {it}
                    </li>
                  ))}
                </ul>
              )
            )}
          </section>
        ))}

        <section className="mt-10">
          <h2 className="text-xl">Contact</h2>
          <p className="mt-4 text-ink/85 leading-[1.7]">
            Questions about this notice or your personal information: [
            privacy@digidan.co.za ]. See also our{" "}
            <Link href="/security" className="text-teal-900 underline underline-offset-2">
              security &amp; data handling
            </Link>{" "}
            practices.
          </p>
        </section>
      </div>
    </main>
  );
}
