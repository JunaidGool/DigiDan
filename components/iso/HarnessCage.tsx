import { boxFaces, bounds, type Box, type Pt } from "@/lib/iso";
import { IsoBlock } from "./IsoBlock";

/**
 * "Volatile block in a rigid frame" (brief 5.6): a teal foundation slab and
 * four ink pillars (the deterministic gates) containing one amber AI block,
 * which pulses gently. Drawn back-to-front for correct isometric occlusion.
 */

const INK = { light: "#3A3A31", mid: "#26261F", dark: "#17170F" };
const TEAL_DEEP = { light: "#0C6B54", mid: "#085041", dark: "#05352A" };

const BASE: Box = [0, 0, 0, 3, 3, 0.4];
const AI: Box = [1.05, 1.05, 0.4, 1.95, 1.95, 1.6];
const PILLARS: Box[] = [
  [0, 0, 0.4, 0.4, 0.4, 2.9], // back
  [2.6, 0, 0.4, 3, 0.4, 2.9], // right
  [0, 2.6, 0.4, 0.4, 3, 2.9], // left
  [2.6, 2.6, 0.4, 3, 3, 2.9], // front
];

const ALL: Pt[] = [BASE, AI, ...PILLARS].flatMap((b) => {
  const f = boxFaces(...b);
  return [...f.top, ...f.left, ...f.right];
});
const VB = bounds(ALL, 8).viewBox;

export function HarnessCage({ className }: { className?: string }) {
  return (
    <svg
      viewBox={VB}
      className={className}
      role="img"
      aria-label="A volatile AI block held inside a rigid frame: a deterministic foundation and four control-gate pillars."
    >
      {/* painter order: foundation, back + side pillars, AI block, front pillar */}
      <IsoBlock box={BASE} fills={TEAL_DEEP} />
      <IsoBlock box={PILLARS[0]} fills={INK} />
      <IsoBlock box={PILLARS[1]} fills={INK} />
      <IsoBlock box={PILLARS[2]} fills={INK} />
      <IsoBlock
        box={AI}
        family="amber"
        data-piece="ai-block"
        className="motion-safe:animate-harness-pulse"
      />
      <IsoBlock box={PILLARS[3]} fills={INK} />
    </svg>
  );
}
