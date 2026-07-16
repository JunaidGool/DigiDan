import { partners, leadershipIntro } from "@/content/leadership";

const AVATAR = ["bg-teal-100 text-teal-900", "bg-coral-100 text-coral-900"];

export function Leadership() {
  return (
    <section id="about" className="scroll-mt-20 py-20 md:py-28">
      <div className="shell">
        <span className="eyebrow">{leadershipIntro.eyebrow}</span>
        <h2 className="mt-4 text-3xl md:text-4xl">{leadershipIntro.heading}</h2>

        {/* Partner cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {partners.map((p, i) => (
            <div
              key={p.name}
              className="flex gap-5 rounded-tile border border-line p-6"
            >
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-lg font-medium ${AVATAR[i % AVATAR.length]}`}
                aria-hidden
              >
                {p.initials}
              </span>
              <div>
                <h3 className="text-xl">{p.name}</h3>
                <p className="text-sm text-muted">{p.role}</p>
                <p className="mt-3 text-sm text-ink/80">{p.summary}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment statement (profile: "Our commitment") */}
        <blockquote className="mt-6 rounded-tile border-l-4 border-teal-500 bg-teal-100 p-6">
          <p className="text-teal-900">{leadershipIntro.commitment}</p>
        </blockquote>

      </div>
    </section>
  );
}
