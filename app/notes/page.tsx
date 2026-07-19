import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { notes, notesIntro } from "@/content/notes";

export const metadata: Metadata = {
  title: "Field notes",
  description:
    "Short, evergreen engineering notes from DigiDan: on financial-grade systems, AI harness engineering, integration and resilience.",
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <main id="main" className="pb-8">
      <PageHeader
        eyebrow={notesIntro.eyebrow}
        title={notesIntro.heading}
        lead={notesIntro.lead}
      />

      <ul className="shell mt-12 max-w-3xl divide-y divide-line border-t border-line">
        {sorted.map((n) => (
          <li key={n.slug}>
            <Link
              href={`/notes/${n.slug}`}
              className="group block py-7 transition-colors hover:bg-paper-warm"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="eyebrow">{n.topic}</span>
                <span className="text-sm text-muted">
                  {n.displayDate} · {n.minutes} min
                </span>
              </div>
              <h2 className="mt-3 flex items-start justify-between gap-3 text-2xl">
                <span>{n.title}</span>
                <ArrowUpRight
                  size={20}
                  className="mt-1.5 shrink-0 text-muted transition-colors group-hover:text-ink"
                  aria-hidden
                />
              </h2>
              <p className="mt-2 max-w-prose text-ink/80">{n.dek}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
