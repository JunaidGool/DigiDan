import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { IsoCube } from "@/components/iso/IsoCube";
import { caseStudies, getCaseStudy } from "@/content/caseStudies";
import { site } from "@/content/site";

// Static export: pre-render exactly the known case studies, nothing dynamic.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return {
    title: c.name,
    description: c.metaDescription,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: { title: `${c.name}: ${site.name}`, description: c.metaDescription },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Work", item: `${site.url}/work` },
      { "@type": "ListItem", position: 2, name: c.name, item: `${site.url}/work/${c.slug}` },
    ],
  };

  return (
    <main id="main" className="pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="shell pt-12 md:pt-16">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden /> All work
        </Link>
      </div>

      <header className="shell mt-8">
        <div className="flex items-end gap-2" aria-hidden="true">
          {c.blocks.map((b, i) => (
            <IsoCube key={i} family={b} size={28} />
          ))}
        </div>
        <p className="mt-6 eyebrow">{c.kicker}</p>
        <h1 className="mt-3 max-w-3xl text-4xl md:text-5xl">{c.name}</h1>
        <p className="mt-6 max-w-prose text-lg text-ink/80">{c.summary}</p>
        <p className="mt-6 font-mono text-xs text-ink/70">{c.stack}</p>
      </header>

      <div className="shell mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2">
        {c.sections.map((s) => (
          <section key={s.title} className="border-t border-line pt-5">
            <h2 className="text-lg">{s.title}</h2>
            <p className="mt-2 text-ink/80">{s.body}</p>
          </section>
        ))}
      </div>

      <div className="shell mt-16">
        <p className="text-sm text-muted">
          References for this engagement are available on request.{" "}
          <Link href="/contact" className="text-teal-900 underline">
            Talk to us
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
