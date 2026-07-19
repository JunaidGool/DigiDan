import {
  boxFaces,
  pts,
  centroid,
  bounds,
  BLOCK_FILLS,
  type Box,
  type Family,
  type Pt,
} from "@/lib/iso";

/**
 * Seven isometric blocks climbing a staircase, colour progressing
 * teal -> amber -> coral (brief 5.4). Decorative reinforcement of the
 * accessible ordered list; Phase 3 drops each block in on scroll, so every
 * step is its own <g data-step> with the number on its top face.
 */

// Warm-brown ink on every light top face: reads as engraved and clears WCAG AA
// large-text contrast on all four families (brief 4.1 / 8.2).
const NUMBER_INK = "#3B2D20";

type Item = { n: number; family: Family };

function stepBox(i: number): Box {
  const height = 1.1 + i * 0.5; // gradual, even climb
  return [i, 0, 0, i + 1, 1, height];
}

export function Staircase({ steps }: { steps: Item[] }) {
  const boxes = steps.map((_, i) => stepBox(i));
  const allPoints: Pt[] = boxes.flatMap((b) => {
    const f = boxFaces(...b);
    return [...f.top, ...f.left, ...f.right];
  });
  const vb = bounds(allPoints, 10);

  return (
    <svg
      viewBox={vb.viewBox}
      className="w-full"
      role="img"
      aria-label="A staircase of seven blocks, one per delivery step, climbing from Discover to Deploy and support."
    >
      {steps.map((s, i) => {
        const b = boxes[i];
        const f = boxFaces(...b);
        const c = BLOCK_FILLS[s.family];
        const [cx, cy] = centroid(f.top);
        return (
          <g
            key={s.n}
            data-step={s.n}
            className="stair-step"
            style={{ "--i": i } as React.CSSProperties}
          >
            <polygon points={pts(f.left)} fill={c.dark} />
            <polygon points={pts(f.right)} fill={c.mid} />
            <polygon points={pts(f.top)} fill={c.light} />
            <text
              x={cx}
              y={cy}
              dominantBaseline="central"
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontSize={20}
              fontWeight={600}
              fill={NUMBER_INK}
            >
              {s.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
