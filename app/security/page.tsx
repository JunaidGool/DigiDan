import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { IsoCube } from "@/components/iso/IsoCube";
import {
  securityIntro,
  groups,
  securityNote,
  securityCta,
} from "@/content/security";

export const metadata: Metadata = {
  title: "Security & data handling",
  description:
    "How DigiDan handles security and data: privacy-conscious capture, tenant isolation, transaction integrity and auditability, resilient design, AI safety and flexible data residency — the engineering practices behind financial-grade systems.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <main id="main" className="pb-8">
      <PageHeader
        eyebrow={securityIntro.eyebrow}
        title={securityIntro.title}
        lead={securityIntro.lead}
      />

      <div className="shell mt-6">
        <blockquote className="max-w-prose rounded-tile border-l-4 border-teal-500 bg-teal-100 p-6">
          <p className="text-teal-900">{securityIntro.principle}</p>
        </blockquote>
      </div>

      <div className="shell mt-14 grid gap-4 md:grid-cols-2">
        {groups.map((g) => (
          <section key={g.title} className="rounded-tile border border-line p-6">
            <IsoCube family={g.family} size={22} />
            <h2 className="mt-4 text-xl">{g.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {g.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-ink/80">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-[1px] bg-teal-500"
                    aria-hidden
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Honest scope note — practices, not certifications */}
      <div className="shell mt-10">
        <p className="max-w-prose text-sm text-muted">{securityNote}</p>
      </div>

      {/* CTA */}
      <section className="shell mt-16">
        <div className="rounded-tile border border-line bg-paper-warm p-8 md:p-10">
          <h2 className="max-w-2xl text-2xl md:text-3xl">
            {securityCta.heading}
          </h2>
          <p className="mt-3 max-w-prose text-ink/80">{securityCta.body}</p>
          <Link
            href={securityCta.cta.href}
            className="mt-6 inline-flex rounded-lg bg-ink px-6 py-3 font-medium text-paper transition-transform duration-150 ease-settle hover:-translate-y-0.5"
          >
            {securityCta.cta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
