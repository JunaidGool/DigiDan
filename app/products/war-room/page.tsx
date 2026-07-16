import type { Metadata } from "next";
import Link from "next/link";
import { WarRoomLogo } from "@/components/WarRoomLogo";
import {
  warRoom,
  commitments,
  advisors,
  supportingRoles,
  pipeline,
  harnessMapping,
  tech,
  harnessTieIn,
} from "@/content/warRoom";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "The War Room",
  description:
    "The War Room — a multi-model AI deliberation system by DigiDan. Five advisors on five models debate a hard question to a verdict that shows its work. A live showcase of DigiDan's AI harness engineering.",
  alternates: { canonical: "/products/war-room" },
  openGraph: {
    title: `The War Room — ${site.name}`,
    description:
      "Five AI advisors on five models debate a hard question to a verdict that shows its work.",
  },
};

const STAGE_ACCENT: Record<string, string> = {
  teal: "#2ec4b6",
  amber: "#f5a623",
  coral: "#ff6b5e",
};

const AMBER = "#f5a623";
const CREAM = "#e9dfce";
const DIM = "#9a8b73";

export default function WarRoomPage() {
  return (
    <main id="main" className="wr overflow-hidden pb-16">
      {/* Hero */}
      <header className="shell grid items-center gap-10 pt-16 md:grid-cols-[1fr_auto] md:pt-24">
        <div>
          <p className="wr-eyebrow">{warRoom.eyebrow}</p>
          <h1 className="wr-title mt-5 text-4xl leading-tight md:text-6xl">
            The War Room
          </h1>
          <p className="mt-5 max-w-xl text-xl md:text-2xl" style={{ color: CREAM }}>
            {warRoom.tagline}
          </p>
          <p className="mt-6 max-w-prose text-lg" style={{ color: DIM }}>
            {warRoom.lead}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={warRoom.cta.href}
              className="inline-flex rounded-md px-6 py-3 font-medium text-[#0a0806] transition-transform duration-150 ease-settle hover:-translate-y-0.5"
              style={{ background: AMBER }}
            >
              {warRoom.cta.label}
            </Link>
            <a
              href="#how"
              className="inline-flex rounded-md border px-6 py-3 font-medium transition-colors"
              style={{ borderColor: "rgba(245,166,35,0.4)", color: CREAM }}
            >
              See how it works
            </a>
            <span className="wr-eyebrow">{warRoom.status}</span>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <WarRoomLogo size={320} />
        </div>
      </header>

      {/* Three commitments */}
      <section className="shell mt-20">
        <div className="grid gap-4 md:grid-cols-3">
          {commitments.map((c) => (
            <div key={c.title} className="wr-panel wr-frame rounded-sm p-6">
              <h2 className="wr-title text-sm">{c.title}</h2>
              <p className="mt-3 text-sm" style={{ color: DIM }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The panel */}
      <section id="how" className="shell mt-24 scroll-mt-20">
        <p className="wr-eyebrow">The panel</p>
        <h2 className="wr-title mt-4 text-2xl md:text-3xl">Five lenses, five labs</h2>
        <p className="mt-4 max-w-prose text-lg" style={{ color: DIM }}>
          Each advisor is a distinct role on a model from a different lab —
          spanning two regions, so their mistakes don&rsquo;t correlate.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advisors.map((a) => (
            <li
              key={a.callsign}
              className="wr-panel rounded-sm p-6"
              style={{ borderTop: `3px solid ${a.accent}` }}
            >
              <span
                className="inline-block h-3 w-3 rounded-[2px]"
                style={{ background: a.accent }}
                aria-hidden
              />
              <h3 className="mt-3 text-xl font-medium" style={{ color: CREAM }}>
                {a.callsign}
              </h3>
              <p className="wr-eyebrow mt-1">{a.role}</p>
              <p className="mt-3" style={{ color: DIM }}>
                {a.lens}
              </p>
              <p
                className="mt-4 font-mono text-xs"
                style={{ color: a.accent }}
              >
                {a.lab}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-prose text-sm" style={{ color: "#6b5f4d" }}>
          {supportingRoles}
        </p>
      </section>

      {/* The pipeline */}
      <section className="mt-24">
        <div
          className="border-y py-16"
          style={{ borderColor: "rgba(245,166,35,0.2)", background: "#0f0b07" }}
        >
          <div className="shell">
            <p className="wr-eyebrow">The deliberation</p>
            <h2 className="wr-title mt-4 text-2xl md:text-3xl">
              Raw question to reasoned verdict
            </h2>

            <ol className="mt-12 grid gap-8 md:grid-cols-4">
              {pipeline.map((s) => (
                <li key={s.n} className="wr-frame pl-1">
                  <span
                    className="font-mono text-3xl font-semibold"
                    style={{ color: STAGE_ACCENT[s.family] }}
                  >
                    {String(s.n).padStart(2, "0")}
                  </span>
                  <h3 className="wr-title mt-2 text-sm">{s.name}</h3>
                  <p className="mt-2 text-sm" style={{ color: DIM }}>
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-prose text-sm" style={{ color: "#6b5f4d" }}>
              Questions that don&rsquo;t warrant a full debate take a
              direct-answer side path — one strong model, no room convened.
            </p>
          </div>
        </div>
      </section>

      {/* Harness mapping — the tie back to DigiDan */}
      <section className="shell mt-24">
        <p className="wr-eyebrow">Why it&rsquo;s a harness showcase</p>
        <h2 className="mt-4 max-w-3xl text-2xl md:text-3xl" style={{ color: CREAM }}>
          {harnessTieIn}
        </h2>

        <div
          className="mt-10 overflow-hidden rounded-sm border"
          style={{ borderColor: "rgba(245,166,35,0.2)" }}
        >
          {harnessMapping.map((m, i) => (
            <div
              key={m.capability}
              className="grid gap-1 p-5 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-8"
              style={{
                borderTop: i > 0 ? "1px solid rgba(245,166,35,0.15)" : "none",
              }}
            >
              <p className="wr-title text-sm">{m.capability}</p>
              <p style={{ color: DIM }}>{m.mechanism}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 font-mono text-xs" style={{ color: "#6b5f4d" }}>
          {tech}
        </p>
      </section>

      {/* Closing CTA */}
      <section className="shell mt-20">
        <div
          className="wr-frame rounded-sm p-8 md:p-10"
          style={{
            background: "#14100b",
            border: "1px solid rgba(245,166,35,0.4)",
          }}
        >
          <h2 className="wr-title max-w-2xl text-xl md:text-2xl">
            Put a hard decision in front of the room
          </h2>
          <p className="mt-3" style={{ color: DIM }}>
            {warRoom.status} Request an invitation and we&rsquo;ll be in touch.
          </p>
          <Link
            href={warRoom.cta.href}
            className="mt-6 inline-flex rounded-md px-6 py-3 font-medium text-[#0a0806] transition-transform duration-150 ease-settle hover:-translate-y-0.5"
            style={{ background: AMBER }}
          >
            {warRoom.cta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
