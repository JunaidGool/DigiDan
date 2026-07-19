import {
  Landmark,
  ServerCog,
  Boxes,
  ShoppingBag,
  BrainCircuit,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { services, servicesIntro, type Family } from "@/content/services";

const ICONS: Record<string, LucideIcon> = {
  Landmark,
  ServerCog,
  Boxes,
  ShoppingBag,
  BrainCircuit,
  Waypoints,
};

// tinted card + 500-stop bottom edge (amber uses its 400 stop). Same-family text.
const FAMILY: Record<Family, { card: string; edge: string; text: string }> = {
  teal: { card: "bg-teal-100", edge: "border-teal-500", text: "text-teal-900" },
  coral: {
    card: "bg-coral-100",
    edge: "border-coral-500",
    text: "text-coral-900",
  },
  amber: {
    card: "bg-amber-100",
    edge: "border-amber-400",
    text: "text-amber-900",
  },
};

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-20 md:py-28">
      <div className="shell">
        <span className="eyebrow">{servicesIntro.eyebrow}</span>
        <p className="mt-4 max-w-2xl text-2xl text-ink md:text-3xl">
          {servicesIntro.lead}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = ICONS[s.icon] ?? Boxes;
            const f = FAMILY[s.family];
            return (
              <details
                key={s.id}
                className={`group rounded-tile ${f.card} border-b-4 ${f.edge} transition-transform duration-200 ease-settle open:shadow-sm hover:-translate-y-1 hover:border-b-[6px]`}
              >
                <summary className="flex cursor-pointer list-none flex-col gap-3 p-6 [&::-webkit-details-marker]:hidden">
                  <Icon className={f.text} size={26} strokeWidth={1.75} aria-hidden />
                  <h3 className={`text-xl ${f.text}`}>{s.title}</h3>
                  <p className={`text-sm ${f.text}`}>{s.summary}</p>
                </summary>
                <ul className={`space-y-2 px-6 pb-6 text-sm ${f.text}`}>
                  {s.detail.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span aria-hidden>·</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
