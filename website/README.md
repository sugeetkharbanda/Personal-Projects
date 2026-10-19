# AutoSourcing India — Landing Page

Premium single-page marketing site for **AutoSourcing India** (ASI): nationwide new car sourcing, with finance and insurance support.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4
- `next/font` — Fraunces (display) + Manrope (UI)
- `next/image` + Lucide icons
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
npm run build   # production build
npm start       # serve production build
```

## Configuration

Business copy, nav, services, contact placeholders, and social links live in:

[`src/lib/site.ts`](src/lib/site.ts)

Update that file when the official logo, colours, phone, email, WhatsApp, or social URLs arrive.

## Enquiry form

- Form fields submit to `POST /api/enquiry`
- Server validates the payload
- Email is sent **only** when all of the following are set:
  - `RESEND_API_KEY`
  - `ENQUIRY_TO_EMAIL`
  - `ENQUIRY_FROM_EMAIL` (defaults to Resend onboarding sender if omitted)
- If email is not configured, the API returns **503** with a clear message. The UI never pretends the enquiry was delivered.

See [`.env.example`](.env.example).

## Design notes

| Token         | Value     |
|---------------|-----------|
| Ink           | `#07090D` |
| Graphite      | `#12151C` |
| Surface       | `#EEF0F3` |
| Chrome        | `#C0C0C0` |
| Crimson       | `#A11C1E` |
| Crimson deep  | `#8B0A0E` |

Brand marks (extracted from official PSD `logo-a.png` via `psd-tools`):

- `public/brand/logo.png` + `logo@2x.png` — transparent composite (chrome + crimson + soft shadow)
- `public/brand/logo-icon.png` + `logo-icon@2x.png` — square nav/favicon
- `public/brand/layers/` — `logo.png` (chrome), `red.png` (crimson), `shadow.png`
- Hero: `public/hero/hero.jpg` — art-directed studio plate with brand grading

Differentiator copy centres on a **broader nationwide sourcing network**. Shorter waits are framed as a possible outcome, never a guarantee. No fabricated testimonials, stats, affiliations, prices, or timelines.

## Still needing your input

1. Optional fine-tuning of crimson/chrome against print/brand guidelines
2. **Real contact details** — phone, email, WhatsApp, address/hours
3. **Social profile URLs**
4. **Resend credentials** + enquiry inbox (`RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, verified from address)
5. **Domain / hosting** preferences for deploy
6. Privacy & Terms page content (stubs only today)
7. Optional native SVG of the mark if design provides one

## Project layout

```
website/
  src/app/           # layout, page, globals, api/enquiry
  src/components/    # Header, Hero, Services, HowItWorks, WhyUs, ContactForm, Footer
  src/lib/           # site.ts, enquiry.ts
  public/brand/      # placeholder brand mark
```
