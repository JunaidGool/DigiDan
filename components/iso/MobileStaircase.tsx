import {
  boxFaces,
  pts,
  centroid,
  bounds,
  BLOCK_FILLS,
  type Family,
  type Pt,
} from "@/lib/iso";

/**
 * Mobile variant of the delivery staircase (brief 5.4): a vertical stack of
 * isometric blocks that build top-down on scroll. Carries the step content
 * (title + description) so it is the accessible mobile view. The desktop
 * horizontal staircase is decorative and hidden here.
 */

// Warm-brown ink on every light top face (brief 4.1): clears AA on all families.
const NUMBER_INK = "#3B2D20";

const F = boxFaces(0, 0, 0, 1, 1, 1);
const VB = bounds([...F.top, ...F.left, ...F.right] as Pt[], 3).viewBox;
const [CX, CY] = centroid(F.top);

function StepCube({ family, n }: { family: Family; n: number }) {
  const c = BLOCK_FILLS[family];
  const [, , w, h] = VB.split(" ").map(Number);
  return (
    <svg
      viewBox={VB}
      width={54}
      height={(54 * h) / w}
      aria-hidden="true"
      className="shrink-0"
    >
      <polygon points={pts(F.left)} fill={c.dark} />
      <polygon points={pts(F.right)} fill={c.mid} />
      <polygon points={pts(F.top)} fill={c.light} />
      <text
        x={CX}
        y={CY}
        dominantBaseline="central"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize={13}
        fontWeight={600}
        fill={NUMBER_INK}
      >
        {n}
      </text>
    </svg>
  );
}

type Item = { n: number; title: string; description: string; family: Family };

export function MobileStaircase({
  steps,
  headingLevel: Heading = "h3",
}: {
  steps: Item[];
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ol className="flex flex-col gap-5">
      {steps.map((s, i) => (
        <li
          key={s.n}
          className="stair-step flex gap-4"
          style={{ "--i": i } as React.CSSProperties}
        >
          <StepCube family={s.family} n={s.n} />
          <div>
            <Heading className="text-lg">{s.title}</Heading>
            <p className="mt-1 text-sm text-ink/75">{s.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
