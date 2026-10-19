# Auto Traders — Landing Page

Premium single-page marketing site for **Auto Traders**: nationwide new car sourcing, with finance and insurance support.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4
- `next/font` — Oswald (display) + Manrope (UI)
- Lucide icons
- Optional Resend for enquiry email delivery

## Local run

```bash
cd website
cp .env.example .env.local   # optional until Resend is ready
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Configuration

Business copy lives in [`src/lib/site.ts`](src/lib/site.ts).

## Brand assets

Converted from CorelDRAW `auto-traders.cdr` (v12) via Inkscape/libcdr:

| File | Use |
|------|-----|
| `public/brand/logo.svg` / `logo.png` / `logo@2x.png` | Wordmark lockup (light surfaces) |
| `public/brand/logo-on-dark.svg` / `logo-on-dark.png` | Lockup for dark surfaces |
| `public/brand/logo-icon.png` | Emblem / favicon |

Hero uses a **generative SVG/CSS composition** from the logo’s triangle + arc geometry—no stock photography.

## Palette (from logo)

| Token | Hex | Role |
|-------|-----|------|
| Ink | `#0A0909` | Stage / near-black |
| Graphite | `#1B1918` | Surfaces on dark |
| Steel | `#565757` | Secondary type / chrome mid |
| Silver | `#9C9E9F` | Borders / muted chrome |
| Chrome | `#C5C7C8` | Highlights |
| Signal | `#D10016` | Primary CTAs / TRADERS red |
| Signal deep | `#A50012` | Hover |
| Signal glow | `#E30016` | Accents |

## Enquiry form

`POST /api/enquiry` validates server-side. Email sends only when `RESEND_API_KEY` + `ENQUIRY_TO_EMAIL` are set; otherwise **503** with a clear message (never fake success).

## Still needing your input

1. Real phone / WhatsApp / social URLs (email from logo sheet is seeded as placeholder contact)
2. Resend credentials + verified from address
3. Domain / hosting
4. Privacy & Terms copy
