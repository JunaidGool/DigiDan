import {
  Landmark,
  ServerCog,
  ShoppingBag,
  BrainCircuit,
  Waypoints,
  ShieldCheck,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { services, servicesIntro, type Family } from "@/content/services";

const ICONS: Record<string, LucideIcon> = {
  Landmark,
  ServerCog,
  ShoppingBag,
  BrainCircuit,
  Waypoints,
  ShieldCheck,
};

// Cream tiles on the gold band (brief 6.5): each carries a 6px accent bottom
// edge and an outline icon in its family colour. Tile text stays warm-brown ink.
const EDGE: Record<Family, string> = {
  teal: "border-teal-500",
  coral: "border-coral-500",
  amber: "border-amber-400",
  olive: "border-olive-500",
};
const ICON_COLOR: Record<Family, string> = {
  teal: "text-teal-500",
  coral: "text-coral-500",
  amber: "text-amber-900",
  olive: "text-olive-500",
};

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-amber-400 py-20 md:py-28">
      <div className="shell">
        <span className="eyebrow text-ink/90">{servicesIntro.eyebrow}</span>
        <h2 className="mt-4 text-3xl text-ink md:text-4xl">
          {servicesIntro.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink/80">{servicesIntro.lead}</p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = ICONS[s.icon] ?? Boxes;
            return (
              <details
                key={s.id}
                className={`group rounded-tile bg-cream border-b-4 ${EDGE[s.family]} transition-transform duration-200 ease-settle open:shadow-sm hover:-translate-y-1 hover:border-b-[6px]`}
              >
                <summary className="flex cursor-pointer list-none flex-col gap-3 p-6 [&::-webkit-details-marker]:hidden">
                  <Icon
                    className={ICON_COLOR[s.family]}
                    size={26}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <h3 className="text-xl text-ink">{s.title}</h3>
                  <p className="text-sm text-ink/80">{s.summary}</p>
                </summary>
                <ul className="space-y-2 px-6 pb-6 text-sm text-ink/80">
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
