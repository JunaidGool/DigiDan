# DigiDan website

Marketing site for **DigiDan (Pty) Ltd** — digidan.co.za. Next.js (App Router)
static export, Tailwind, hand-authored isometric SVG. Theme: modular "building
blocks". It also hosts the **War Room** product showcase, which carries its own
dark tactical "situation-room" identity. All copy lives in typed content files
and is traceable to the Company Profile (and, for War Room, the `the_war_room`
repository docs) — no invented clients, capabilities or metrics.

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
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Contact-form POST target (Formspree). Until set, the form shows a "not configured" notice. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables cookieless Plausible analytics. Leave empty to load no analytics. |

## Content

Everything editable lives in `/content/*.ts`:

- `site`, `hero`, `services`, `approach`, `harness`, `leadership` — homepage + About/Approach copy.
- `caseStudies` — the single source of truth for `/work`; the homepage portfolio cards derive from it.
- `stats` — the "By the numbers" strip (real, sourced figures only).
- `assistant` — the guide's conversation tree (see below).
- `warRoom` — the War Room showcase content, sourced from the product repo.

Named referees are **not** published (consent / POPIA); share them privately on
request. The three client engagements still appear via the case studies.

## Notable features

- **Interactive hero** (`components/HeroLogo.tsx`) — the block mark assembles on
  load, then leans toward the cursor and replays on click. Reduced-motion safe.
- **Delivery staircase** — isometric blocks that drop in on scroll (desktop) or
  build top-down as a vertical stack (mobile). See `components/iso/`.
- **The guide** (`components/Assistant.tsx`) — a deterministic, no-LLM assistant
  (bottom-right launcher). Fully accessible dialog; flows live in `content/assistant.ts`.
- **Stat strip** (`components/sections/Stats.tsx`) — count-up on scroll; SSR shows
  final numbers so no-JS/reduced-motion are unaffected.
- **War Room theme** — the `/products/war-room` page uses a dark HUD theme scoped
  entirely under the `.wr` class in `app/globals.css`, so it never touches the
  DigiDan light theme.

All motion is behind `prefers-reduced-motion` and progressively enhanced (the
server-rendered state is always the final, usable one).

## Deploy

Static export → host anywhere that serves static files. Vercel or Cloudflare
Pages recommended; build command `npm run build`, output directory `out`.

## Regenerating assets

```bash
npm run gen:logo                      # DigiDan block mark SVG
node scripts/generate-warroom-logo.mjs # War Room pentagon-table mark
node scripts/generate-og.mjs          # then render + crop to public/og.png (see script)
node scripts/contrast-audit.mjs       # WCAG AA contrast check of the palette
```

## Structure

- `app/` — routes: home, `/work`, `/work/[slug]`, `/approach`, `/about`,
  `/contact`, `/products/war-room`; plus `sitemap.ts`, `robots.ts`, `icon.svg`.
- `components/` — Nav, Footer, Logo, HeroLogo, Assistant, WarRoomLogo, Reveal,
  `sections/`, and `iso/` (shared block illustrations).
- `lib/iso.ts` — shared isometric projection used by every block graphic.
- `content/` — typed copy and data.
- `scripts/` — asset generators + the contrast audit.
