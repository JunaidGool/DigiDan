# DigiDan website

Marketing site for **DigiDan (Pty) Ltd**: digidan.co.za. Next.js (App Router)
static export, Tailwind, and a hand-built component toolkit.

**Design language.** A single dark, premium interface in the spirit of a modern
product-led SaaS site: a near-black canvas, big bold display headings, rounded
dark surfaces, one warm signature gradient and **DigiDan orange** as the only
bright accent. Nothing is pulled from a UI component library — every button,
card, carousel and icon is built in `components/ui`.

All copy lives in a typed content file (`content/home.ts`) and is used verbatim.
No invented clients, capabilities or metrics.

## Run

```bash
npm install      # first time
npm run dev      # http://localhost:3000
```

> View over `http://` only. Opening `out/index.html` as a `file://` will render
> unstyled (Next uses absolute asset paths that need a web root).

## Build & preview the static export

```bash
npm run build    # outputs a static site to ./out
npx serve out    # preview the real export over HTTP
```

If the dev server ever renders unstyled after many edits, clear its cache:
`rm -rf .next && npm run dev`.

## Configuration (environment)

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables cookieless Plausible analytics. Leave empty to load no analytics. |

## Design system

Tokens live in `tailwind.config.ts` (colours, radii, type scale, the `ember`
gradient, motion) and `app/globals.css` (base canvas, the `.shell` container,
`.kicker`, `.text-ember`, focus and reduced-motion rules).

The custom toolkit in `components/ui/`:

- `Button.tsx` — primary / secondary / ghost / round-icon variants, with a CSS
  sheen sweep on the primary. Renders as `<a>` or `<button>`.
- `Card.tsx` — the rounded dark surface, with an optional interactive lift.
- `Carousel.tsx` — hand-built slide switcher (dots, round controls, keyboard,
  swipe). Powers the hero showcase.
- `Section.tsx`, `Container.tsx`, `Eyebrow.tsx` — layout + heading primitives.
- `icons.tsx` — the hexagon line-icons drawn from scratch for each capability.

## Content

Everything editable lives in `content/home.ts`: `site`, `nav`, `hero`,
`statement`, `capabilities`, `overview`, `work`, `trust`, `showcase`,
`capabilityHighlights`, `cta` and `footer`. Highlight phrases are exact
substrings of the approved copy, wrapped in the accent at render time only.

## Sections

`app/page.tsx` composes the homepage:

- `Hero` — headline, lead, actions, and the gradient showcase carousel of live
  console readouts.
- `TrustBar` — client wordmarks.
- `StatementBand` — the "what we do" statement.
- `Capabilities` — three capability cards with custom hexagon icons.
- `Overview` — company indicators (count-up) and a live telemetry panel.
- `Work` — the live products.
- `CTA` — the closing gradient conversion band.

All motion is behind `prefers-reduced-motion` and progressively enhanced (the
server-rendered state is always the final, usable one).

## Deploy

Static export → host anywhere that serves static files. Vercel or Cloudflare
Pages recommended; build command `npm run build`, output directory `out`.

## Structure

- `app/`: `layout.tsx`, `page.tsx`, `globals.css`, `sitemap.ts`, `robots.ts`, `icon.svg`.
- `components/`: `Nav`, `Footer`, `Logo`, `Reveal`, `CountUp`, `LiveFeed`,
  `Analytics`, `sections/`, and the `ui/` toolkit.
- `content/home.ts`: typed copy and data.
- `scripts/`: asset generators (logo, OG image) + the contrast audit.
