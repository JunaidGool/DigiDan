# DigiDan website

Marketing site for **DigiDan (Pty) Ltd** — digidan.co.za. Next.js (App Router)
static export, Tailwind, and a hand-built component toolkit.

**Design language.** A single dark, premium interface in the spirit of a modern
product-led SaaS site: a near-black canvas, big bold display headings, rounded
dark surfaces, one warm signature gradient and **DigiDan orange** as the primary
accent (teal and yellow are the supporting brand colours). Nothing is pulled
from a UI component library — every button, card, icon, graphic and the WebGL
hero are built by hand.

All copy lives in a typed content file (`content/home.ts`). Content is factual
and taken from the company profile. Client companies are **not** named on the
site. DigiDan is presented as a software engineering partner, not a bank.

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

Copy `.env.example` to `.env.local` (and set the same variables in the host's
environment for production):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Where the closing contact form (`EmailCta`) POSTs. Until set, the form falls back to opening the visitor's mail client at `hello@digidan.co.za`. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables cookieless Plausible analytics. Leave empty to load no analytics. |

## Design system

Tokens live in `tailwind.config.ts` (colours, radii, type scale, the `ember`
gradient, motion) and `app/globals.css` (base canvas, `.shell`, `.kicker`,
`.text-ember`, the service-graphic keyframes, focus and reduced-motion rules).

The custom toolkit in `components/ui/`:

- `Button.tsx` — primary / secondary / ghost / round-icon / gradient-outline
  variants, a CSS sheen on the primary, a custom animated arrow, and a magnetic
  cursor-follow. Renders as `<a>` or `<button>`.
- `Card.tsx`, `Section.tsx`, `Container.tsx`, `Eyebrow.tsx` — layout + surface
  primitives.
- `Cursor.tsx` — a bespoke cursor (dot + trailing ring) on fine-pointer devices.
- `ServiceGraphic.tsx` — the self-animating "product" panels for each service
  (integrity / systems / automation), CSS only.
- `glyphs.tsx` (arrow, menu, close), `icons.tsx` (tick), `brand.ts` (palette),
  `EmailCta.tsx` (contact form), `Carousel.tsx` (slide primitive).

The WebGL hero is `components/IsometricCore.tsx` — a live system-architecture
rig (Client → API Gateway → Services → Database / Queue / AI) that assembles on
load, flows data along the wires, and tilts to the cursor. `three` is imported
dynamically (code-split) and disposed on unmount; reduced motion shows a static
frame.

## Content

Everything editable lives in `content/home.ts`: `site`, `nav`, `hero`,
`services`, `statement`, `ecosystem`, `overview`, `faq`, `cta` and `footer`
(plus `CONTACT_HREF`). Services render as alternating info/graphic rows; the FAQ
is mirrored into structured data.

## Sections

`app/page.tsx` composes the homepage:

- `Hero` — headline, lead, actions, and the WebGL system-architecture centrepiece.
- `StatementBand` — the "we connect the whole system" statement.
- `Ecosystem` — a node graph of the systems DigiDan connects.
- `Services` — "what we can do for you": three customer-outcome rows (financial-
  grade engineering, custom software/stores, automation) with animated graphics.
- `Overview` — company statement and two indicators.
- `FAQ` — accessible `<details>` Q&A, mirrored into FAQPage structured data.
- `CTA` — the closing gradient band with the email capture.

All motion is behind `prefers-reduced-motion` and progressively enhanced (the
server-rendered state is always the final, usable one).

## SEO & AEO

- Metadata (title template, description, keywords, canonical, Open Graph,
  Twitter, robots) in `app/layout.tsx`; per-page canonical in `app/page.tsx`.
- Structured data `@graph` in `app/page.tsx`: `Organization`, `WebSite`,
  `ProfessionalService` (with a service `OfferCatalog`) and `FAQPage`.
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `app/icon.svg`,
  `app/apple-icon.png`, `public/icon-512.png`, `public/og.png`.
- `public/llms.txt` — a plain-language summary for LLM answer engines.

Regenerate the social image and PWA icons by rendering the brand template with
Chromium (see git history for `_oggen.mjs`), or replace `public/og.png`,
`public/icon-512.png` and `app/apple-icon.png` directly (og.png is 1200×630).

## Deploy

Static export → host anywhere that serves static files. Vercel or Cloudflare
Pages recommended; build command `npm run build`, output directory `out`.

## Structure

- `app/`: `layout.tsx`, `page.tsx`, `not-found.tsx`, `globals.css`,
  `sitemap.ts`, `robots.ts`, `manifest.ts`, `icon.svg`, `apple-icon.png`.
- `components/`: `Nav`, `Footer`, `Logo`, `IsometricCore`, `Reveal`, `CountUp`,
  `Analytics`, `sections/`, and the `ui/` toolkit.
- `content/home.ts`: typed copy and data.
- `public/`: `og.png`, `icon-512.png`, `llms.txt`.
- `scripts/`: asset generators + the contrast audit.

---

## TODO — still to do before / around launch

### Email (priority)

The site references `hello@digidan.co.za` (a `mailto:` link and the closing
contact form). To make email actually work end to end:

- [ ] **Mailbox / receiving.** Create the `hello@digidan.co.za` inbox. Choose a
      provider and add its **MX records** to the `digidan.co.za` DNS:
      Google Workspace, Microsoft 365, or Zoho Mail (has a free tier). For a
      free option, forward the address to a personal inbox with **Cloudflare
      Email Routing** or **ImprovMX**.
- [ ] **Deliverability DNS.** Add **SPF**, **DKIM** and **DMARC** records so
      mail from the domain is trusted (not spam) and the domain can't be
      spoofed. Each provider gives you the exact values.
- [ ] **Make the contact form submit.** The site is a static export (no server),
      so the form needs a backend. `EmailCta` already POSTs to
      `NEXT_PUBLIC_FORMSPREE_ENDPOINT` when set (otherwise it falls back to
      `mailto:`). Create a form endpoint (**Formspree**, Web3Forms, Basin or
      Formspark), then set that env var. Alternatively, on Vercel/Cloudflare use
      a serverless function plus a transactional email API.
- [ ] **Transactional / notification email (optional).** For an auto-reply to
      the enquirer and a notification to the team, use **Resend**, **Postmark**,
      **Brevo** (already used elsewhere by DigiDan) or SendGrid. Requires domain
      verification (DKIM).
- [ ] **Confirm the published contact details.** Currently email only
      (`hello@digidan.co.za`). Decide whether to also publish a phone number.
- [ ] **Test.** Send test enquiries through the form and to the mailbox; confirm
      they arrive and don't land in spam.

### Domain, hosting & analytics

- [ ] Point **digidan.co.za** (and `www`) at the host; confirm HTTPS and the
      production redirect. The site is currently on a Vercel preview URL.
- [ ] Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (or wire another analytics tool) if
      analytics is wanted.
- [ ] Verify the site in **Google Search Console** and **Bing Webmaster Tools**
      and submit `sitemap.xml` (add verification meta tags if needed).

### Content & positioning sign-off

- [ ] Founders to review all copy (`content/home.ts`) for accuracy and tone.
- [ ] Decide whether to **name clients** on the site (currently not named) and
      whether to reference specific engagements.
- [ ] Decide whether to add **founder details** to the structured data / an
      about section (currently omitted to keep the focus off partners).
- [ ] If a **Work / case-studies** page is reinstated, supply real project
      screenshots (the placeholder version was removed).

### Legal & compliance (South Africa / POPIA)

- [ ] Add a **Privacy Policy** and **Terms** page, and a short privacy note near
      the contact form explaining how the email address is used (POPIA). No
      cookie banner is needed while analytics stays cookieless.

### Polish (nice to have)

- [ ] Cross-browser / device QA; run `node scripts/contrast-audit.mjs` and a
      Lighthouse pass.
- [ ] Add social profiles + `sameAs` links in the schema once they exist.
- [ ] Add a `favicon.ico` fallback for older browsers if required.
