"use client";

import { useEffect, useRef, useState } from "react";
import { IsoCube } from "@/components/iso/IsoCube";
import { stats, statsIntro, type Stat } from "@/content/stats";

/**
 * Real-number proof strip with a count-up on scroll into view.
 * Progressive enhancement: the SSR/no-JS/reduced-motion render shows the final
 * numbers immediately; motion users get the count-up when it scrolls in.
 */
export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="border-y border-line bg-paper-warm py-16 md:py-20">
      <div ref={ref} className="shell">
        <span className="eyebrow">{statsIntro.eyebrow}</span>
        <dl className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatValue key={s.label} stat={s} run={run} />
          ))}
        </dl>
        <p className="mt-8 text-xs text-muted">{statsIntro.note}</p>
      </div>
    </section>
  );
}

function StatValue({ stat, run }: { stat: Stat; run: boolean }) {
  // SSR / no-JS shows the final value; motion clients reset to 0 offscreen.
  const [display, setDisplay] = useState(stat.value);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMotion(true);
    setDisplay(0);
  }, []);

  useEffect(() => {
    if (!motion || !run) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1300;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(stat.value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [motion, run, stat.value]);

  return (
    <div>
      <IsoCube family={stat.family} size={22} />
      <dd className="mt-4 font-display text-4xl font-medium text-ink md:text-5xl">
        {display.toLocaleString("en-US")}
        {stat.suffix}
      </dd>
      <dt className="mt-2 text-sm text-ink/75">{stat.label}</dt>
    </div>
  );
}
