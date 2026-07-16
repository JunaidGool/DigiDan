import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getNote } from "@/content/notes";

/** Article header for a field note, rendered at the top of each note's MDX. */
export function NoteHeader({ slug }: { slug: string }) {
  const n = getNote(slug);
  if (!n) return null;
  return (
    <header className="border-b border-line pb-8">
      <Link
        href="/notes"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} aria-hidden /> Field notes
      </Link>
      <p className="eyebrow mt-6">{n.topic}</p>
      <h1 className="mt-3 text-3xl md:text-4xl">{n.title}</h1>
      <p className="mt-4 text-lg text-ink/80">{n.dek}</p>
      <p className="mt-5 text-sm text-muted">
        <time dateTime={n.date}>{n.displayDate}</time> · {n.minutes} min read ·{" "}
        {n.author}
      </p>
    </header>
  );
}
