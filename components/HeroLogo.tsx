"use client";

import { useEffect, useState } from "react";
import { boxFaces, pts, centroid, BLOCK_FILLS, type Pt } from "@/lib/iso";
import { PIECES, VB } from "./Logo";

/**
 * The signature hero animation (brief 5.2 / 6): the three blocks start scattered,
 * dotted integration connectors draw between them, then the pieces click together
 * into the assembled mark, which then floats gently.
 *
 * One-time on load, ~1.6s total. Progressive enhancement: the default render is
 * the assembled mark (so no-JS and reduced-motion users get the final state with
 * no flash); JS scatters then reassembles only when motion is allowed.
 */

type Phase = "idle" | "scattered" | "assembled";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export function HeroLogo({
  size = 280,
  title = "DigiDan — modular blocks assembled into one system",
}: {
  size?: number;
  title?: string;
}) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("assembled");
      return;
    }
    // scatter instantly, hold while connectors draw, then converge
    setPhase("scattered");
    const t = setTimeout(() => setPhase("assembled"), 780);
    return () => clearTimeout(t);
  }, []);

  const [, , vbw, vbh] = VB.split(" ").map(Number);
  const scattered = phase === "scattered";
  const assembled = phase === "assembled";

  return (
    <svg
      viewBox={VB}
      width={size}
      height={(size * vbh) / vbw}
      role="img"
      aria-label={title}
      className={assembled ? "motion-safe:animate-ambient-float" : undefined}
    >
      {/* integration connectors — draw in while scattered, fade as pieces meet */}
      {PIECES.filter((p) => p.name !== "teal").map((p) => {
        const home = centroid(boxFaces(...p.box).top);
        const away: Pt = [home[0] + p.explode[0], home[1] + p.explode[1]];
        const len = Math.hypot(p.explode[0], p.explode[1]) + 12;
        return (
          <line
            key={p.name}
            x1={home[0]}
            y1={home[1]}
            x2={away[0]}
            y2={away[1]}
            stroke="#26261F"
            strokeWidth={1.5}
            strokeLinecap="round"
            style={{
              strokeDasharray: len,
              strokeDashoffset: phase === "idle" ? len : 0,
              opacity: scattered ? 0.4 : 0,
              transition:
                "stroke-dashoffset 560ms ease-out, opacity 480ms ease-out",
            }}
          />
        );
      })}

      {/* the three pieces */}
      {PIECES.map((p) => {
        const f = boxFaces(...p.box);
        const c = BLOCK_FILLS[p.name];
        const [tx, ty] = scattered ? p.explode : [0, 0];
        return (
          <g
            key={p.name}
            data-piece={p.name}
            style={{
              transform: `translate(${tx}px, ${ty}px)`,
              // no transition into the scattered state (instant), tween on the way home
              transition: assembled ? `transform 880ms ${EASE}` : "none",
            }}
          >
            <polygon points={pts(f.left)} fill={c.dark} />
            <polygon points={pts(f.right)} fill={c.mid} />
            <polygon points={pts(f.top)} fill={c.light} />
          </g>
        );
      })}
    </svg>
  );
}
