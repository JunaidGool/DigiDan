# DigiDan website

Marketing site for **DigiDan (Pty) Ltd** — digidan.co.za. Next.js (App Router)
static export, Tailwind, hand-authored isometric SVG. Theme: modular "building
blocks". All copy lives in typed content files and is traceable to the Company
Profile.

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

Everything editable lives in `/content/*.ts` (hero, services, approach,
case studies, harness, leadership, site). Case studies are the single source of
truth — the homepage portfolio cards derive from them. Reference contact details
are intentionally excluded from the public build pending partner confirmation.

## Deploy

Static export → host anywhere that serves static files. Vercel or Cloudflare
Pages recommended; build command `npm run build`, output directory `out`.

## Regenerating assets

```bash
npm run gen:logo                 # logo mark SVG
node scripts/generate-og.mjs     # then render + crop to public/og.png (see script)
node scripts/contrast-audit.mjs  # WCAG AA contrast check of the palette
```

## Structure

- `app/` — routes (home, `/work`, `/work/[slug]`, `/approach`, `/about`, `/contact`)
- `components/` — Nav, Footer, Logo, sections, `iso/` block illustrations
- `lib/iso.ts` — shared isometric projection used by every block graphic
- `content/` — typed copy and data
