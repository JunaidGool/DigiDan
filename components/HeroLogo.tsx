"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { boxFaces, pts, centroid, BLOCK_FILLS, type Pt } from "@/lib/iso";
import { PIECES, VB } from "./Logo";

/**
 * The signature hero animation (brief 5.2 / 6): the three blocks start scattered,
 * dotted integration connectors draw between them, then the pieces click together
 * and the mark settles. Once settled it's interactive — the pieces lean toward
 * the cursor (per-piece parallax depth) and a click/tap replays the assembly.
 *
 * Progressive enhancement: the default render is the assembled mark (no-JS and
 * reduced-motion get the final state, no flash, no parallax). Motion and
 * interactivity switch on only when motion is allowed.
 */

type Phase = "idle" | "scattered" | "assembled";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
// per-piece parallax depth — the tower leans most, the base least (feels 3D)
const DEPTH: Record<string, number> = { teal: 4, coral: 6, amber: 9 };

export function HeroLogo({
  size = 280,
  title = "DigiDan — modular blocks assembled into one system",
}: {
  size?: number;
  title?: string;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [settled, setSettled] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const reduce = useRef(false);
  const timers = useRef<number[]>([]);

  const play = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (reduce.current) {
      setPhase("assembled");
      setSettled(true);
      return;
    }
    setSettled(false);
    setPhase("scattered");
    timers.current.push(
      window.setTimeout(() => setPhase("assembled"), 780),
      window.setTimeout(() => setSettled(true), 1680)
    );
  }, []);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    play();
    return () => timers.current.forEach(clearTimeout);
  }, [play]);

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    if (reduce.current || !settled) return;
    const r = svgRef.current!.getBoundingClientRect();
    const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
    const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    svgRef.current!.style.setProperty("--px", nx.toFixed(3));
    svgRef.current!.style.setProperty("--py", ny.toFixed(3));
  }
  function reset() {
    svgRef.current?.style.setProperty("--px", "0");
    svgRef.current?.style.setProperty("--py", "0");
  }

  const [, , vbw, vbh] = VB.split(" ").map(Number);
  const scattered = phase === "scattered";
  const assembled = phase === "assembled";

  function pieceStyle(name: string, explode: Pt): React.CSSProperties {
    if (scattered) {
      return { transform: `translate(${explode[0]}px, ${explode[1]}px)`, transition: "none" };
    }
    if (assembled && settled) {
      const d = DEPTH[name] ?? 5;
      return {
        transform: `translate(calc(var(--px, 0) * ${d}px), calc(var(--py, 0) * ${d}px))`,
        transition: "transform 260ms ease-out",
      };
    }
    // idle (SSR/reduced fallback) or mid-converge
    return {
      transform: "translate(0px, 0px)",
      transition: assembled ? `transform 880ms ${EASE}` : "none",
    };
  }

  return (
    <svg
      ref={svgRef}
      viewBox={VB}
      width={size}
      height={(size * vbh) / vbw}
      role="img"
      aria-label={title}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onClick={play}
      className={settled ? "motion-safe:cursor-pointer motion-safe:animate-ambient-float" : undefined}
    >
      <title>{settled ? "Click to reassemble" : title}</title>
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
              transition: "stroke-dashoffset 560ms ease-out, opacity 480ms ease-out",
            }}
          />
        );
      })}
      {/* the three pieces */}
      {PIECES.map((p) => {
        const f = boxFaces(...p.box);
        const c = BLOCK_FILLS[p.name];
        return (
          <g key={p.name} data-piece={p.name} style={pieceStyle(p.name, p.explode)}>
            <polygon points={pts(f.left)} fill={c.dark} />
            <polygon points={pts(f.right)} fill={c.mid} />
            <polygon points={pts(f.top)} fill={c.light} />
          </g>
        );
      })}
    </svg>
  );
}
