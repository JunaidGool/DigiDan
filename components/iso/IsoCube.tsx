import { boxFaces, pts, bounds, BLOCK_FILLS, type Family, type Pt } from "@/lib/iso";

const F = boxFaces(0, 0, 0, 1, 1, 1);
const VB = bounds([...F.top, ...F.left, ...F.right] as Pt[], 3).viewBox;

/**
 * A single isometric cube: the "blocks this structure was built from" markers
 * on portfolio cards (brief 5.5), one per contributing service family.
 */
export function IsoCube({ family, size = 20 }: { family: Family; size?: number }) {
  const c = BLOCK_FILLS[family];
  const [, , w, h] = VB.split(" ").map(Number);
  return (
    <svg viewBox={VB} width={size} height={(size * h) / w} aria-hidden="true">
      <polygon points={pts(F.left)} fill={c.dark} />
      <polygon points={pts(F.right)} fill={c.mid} />
      <polygon points={pts(F.top)} fill={c.light} />
    </svg>
  );
}
