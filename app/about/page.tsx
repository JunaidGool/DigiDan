import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import {
  partners,
  references,
  referencesNote,
  leadershipIntro,
  aboutIntro,
} from "@/content/leadership";

export const metadata: Metadata = {
  title: "About",
  description:
    "DigiDan is a South African software engineering partner led by two senior engineers, with financial-grade delivery experience across banking, retail and product engineering.",
  alternates: { canonical: "/about" },
};

const AVATAR = ["bg-teal-100 text-teal-900", "bg-coral-100 text-coral-900"];

export default function AboutPage() {
  return (
    <main id="main" className="pb-8">
      <PageHeader
        eyebrow={leadershipIntro.eyebrow}
        title={leadershipIntro.heading}
        lead={aboutIntro.overview}
      />

      {/* Partner bios */}
      <div className="shell mt-14 grid gap-4 md:grid-cols-2">
        {partners.map((p, i) => (
          <div key={p.name} className="rounded-tile border border-line p-7">
            <div className="flex items-center gap-4">
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-lg font-medium ${AVATAR[i % AVATAR.length]}`}
                aria-hidden
              >
                {p.initials}
              </span>
              <div>
                <h2 className="text-xl">{p.name}</h2>
                <p className="text-sm text-muted">{p.role}</p>
              </div>
            </div>
            <p className="mt-5 text-ink/80">{p.bio}</p>
          </div>
        ))}
      </div>

      {/* Why DigiDan + commitment */}
      <section className="mt-20 border-t border-line bg-paper-warm py-20">
        <div className="shell">
          <span className="eyebrow">Why DigiDan</span>
          <p className="mt-4 max-w-prose text-lg text-ink/80">{aboutIntro.why}</p>
          <blockquote className="mt-8 rounded-tile border-l-4 border-teal-500 bg-teal-100 p-6">
            <p className="text-eyebrow font-medium uppercase tracking-wider text-teal-900">
              Our commitment
            </p>
            <p className="mt-2 max-w-prose text-teal-900">
              {leadershipIntro.commitment}
            </p>
          </blockquote>
        </div>
      </section>

      {/* References */}
      <div className="shell mt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl">References</h2>
          <p className="text-sm text-muted">{referencesNote}</p>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {references.map((r) => (
            <li key={r.name} className="rounded-tile border border-line p-5">
              <p className="font-medium text-ink">{r.name}</p>
              <p className="text-sm text-muted">
                {r.role} · {r.company}
              </p>
              <p className="mt-3 text-sm text-ink/75">{r.engagement}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
