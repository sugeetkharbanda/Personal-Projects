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

Official lockup / wordmark PNGs (cut to transparent) + 3D chrome mark:

| File | Use |
|------|-----|
| `public/brand/logo.png` / `@2x` | Full lockup (light surfaces) |
| `public/brand/logo-on-dark.png` / `@2x` | Full lockup with light chrome text (dark UI) |
| `public/brand/wordmark.png` / `wordmark-on-dark.png` | Wordmark-only (tight header / mobile) |
| `public/brand/logo-mark.png` / `@2x` | 3D chrome mark / favicon |

Hero uses a **generative SVG/CSS composition** from the ring-and-triangle mark—no stock photography.

## Palette (from chrome mark)

| Token | Hex | Role |
|-------|-----|------|
| Ink | `#0A0909` | Stage / near-black |
| Graphite | `#1B1918` | Surfaces on dark |
| Chrome | `#C8CACD` | Metallic accents |
| Chrome bright | `#F0F1F2` | On-dark type highlights |
| Signal | `#E1000F` | CTAs / TRADERS red |
| Signal deep | `#C4000C` | Hover |

## Enquiry form

`POST /api/enquiry` validates server-side. Email sends only when `RESEND_API_KEY` + `ENQUIRY_TO_EMAIL` are set; otherwise **503** with a clear message (never fake success).

## Still needing your input

1. Real phone / WhatsApp / social URLs (email from logo sheet is seeded as placeholder contact)
2. Resend credentials + verified from address
3. Domain / hosting
4. Privacy & Terms copy
