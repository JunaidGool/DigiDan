/** Consistent subpage header: eyebrow + title + optional lead. */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="shell pt-16 md:pt-24">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="mt-4 max-w-3xl text-4xl md:text-5xl">{title}</h1>
      {lead && <p className="mt-6 max-w-prose text-lg text-ink/80">{lead}</p>}
    </header>
  );
}
