import { ecosystem } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DecodeText } from "@/components/ui/DecodeText";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";
import { accentAt } from "@/components/ui/brand";

/**
 * Ecosystem graph: the DigiDan core at the centre with the real-world systems it
 * connects arranged around it, each linked by a curved path in one of the brand
 * colours. A custom SVG (decorative, aria-hidden); the same systems are given as
 * an accessible list for screen readers.
 */
const W = 860;
const H = 420;
const CX = W / 2;
const CY = H / 2;
const RX = 250;
const RY = 150;

export function Ecosystem() {
  const nodes = ecosystem.nodes.map((label, i) => {
    // Distribute around an ellipse, starting at the top.
    const a = -Math.PI / 2 + (i / ecosystem.nodes.length) * Math.PI * 2;
    const x = CX + Math.cos(a) * RX;
    const y = CY + Math.sin(a) * RY;
    return { label, x, y, accent: accentAt(i), right: x >= CX };
  });

  return (
    <Section tone="night">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">{ecosystem.label}</Eyebrow>
          <DecodeText
            as="h2"
            text={ecosystem.title}
            className="mt-5 block text-h2 font-bold text-white"
          />
        </Reveal>

        <Reveal delay={1} className="mt-14">
          <div className="relative mx-auto max-w-4xl">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              role="img"
              aria-label={`${ecosystem.core} connects: ${ecosystem.nodes.join(", ")}`}
            >
              {/* Connecting paths, each curving from the core to a node. */}
              {nodes.map((nd, i) => (
                <path
                  key={`p-${i}`}
                  d={`M ${CX} ${CY} C ${(CX + nd.x) / 2} ${CY}, ${(CX + nd.x) / 2} ${nd.y}, ${nd.x} ${nd.y}`}
                  fill="none"
                  stroke={nd.accent}
                  strokeWidth={1.4}
                  strokeOpacity={0.5}
                />
              ))}

              {/* Outer nodes. */}
              {nodes.map((nd, i) => (
                <g key={`n-${i}`}>
                  <circle cx={nd.x} cy={nd.y} r={7} fill={nd.accent} />
                  <circle
                    cx={nd.x}
                    cy={nd.y}
                    r={13}
                    fill="none"
                    stroke={nd.accent}
                    strokeOpacity={0.35}
                  />
                  <text
                    x={nd.right ? nd.x + 22 : nd.x - 22}
                    y={nd.y + 4}
                    textAnchor={nd.right ? "start" : "end"}
                    className="fill-white font-body text-[13px] font-medium"
                  >
                    {nd.label}
                  </text>
                </g>
              ))}

              {/* The core. */}
              <circle cx={CX} cy={CY} r={54} fill="#0A0B10" stroke="rgba(255,255,255,0.14)" />
              <circle cx={CX} cy={CY} r={54} fill="url(#coreGlow)" />
              <defs>
                <radialGradient id="coreGlow" cx="0.5" cy="0.4" r="0.6">
                  <stop offset="0%" stopColor="#F07E26" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#F07E26" stopOpacity="0" />
                </radialGradient>
              </defs>
              <text
                x={CX}
                y={CY + 40}
                textAnchor="middle"
                className="fill-fog font-mono text-[9px] uppercase tracking-[0.2em]"
              >
                {ecosystem.core}
              </text>
            </svg>

            {/* The mark, laid over the SVG core (centre of the WxH box). */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${(CY / H) * 100}%` }}
            >
              <LogoMark size={44} tone="brand" title="" />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
