# Adomin.studio — landing page

A single-page site for a studio that builds websites for local businesses
(the working example is a garden events venue in Tayabas, Quezon). Built with
**React + Vite + Tailwind CSS v4 + Framer Motion**, with self-hosted fonts and
real photography.

## Run it

```bash
npm install
npm run dev      # local dev server (Vite) — open the URL it prints
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

You need a real browser to see the motion. Embedded preview panes often run in a
throttled / reduced-motion mode and will show the calm, static version.

## Where things live

```
index.html                 Vite entry
src/
  main.tsx                 mounts React
  index.css                Tailwind theme (colors, fonts), base styles, keyframes
  fonts.css                @font-face for the self-hosted fonts
  lib/config.ts            brand, founder, contacts  ← edit this to make it yours
  lib/anim.tsx             shared easing + a small Reveal helper
  components/*.tsx         one file per section
public/
  img/*.webp               photography
  fonts/*.woff2            Fraunces (display) + Hanken Grotesk (body)
design/                    the original Claude Design source, kept for reference
```

## Make it yours

**Names, contacts, booking link** live in `src/lib/config.ts`:

```ts
export const config = {
  brand: 'Adomin.studio',
  founder: 'Alejandro Umila',
  email: 'umila.alejandro@gmail.com',
  instagram: 'https://www.instagram.com/adomin.dev/',
  facebook: 'https://www.facebook.com/alejandro.umila.5/',
  contactUrl: 'https://m.me/alejandro.umila.5', // every "let's talk" button
}
```

Heads up: `contactUrl` is a Messenger link built from the Facebook profile. If
`m.me/alejandro.umila.5` doesn't open a chat for you, swap it for the `mailto`
value in the same file, or a Calendly URL.

**Photos** sit in `public/img/` (same filenames = drop-in replacement). They were
generated as realistic placeholders; swap in real photos of the actual business
before launch. `founder.webp` should become the real founder's photo.

**Copy** lives right in the section components under `src/components/`. Prices are
in `Pricing.tsx`; the venue story is in `Problem.tsx` and `Signature.tsx`.

## How the motion is set up

Each section has its own intent rather than one reused effect:

- **Hero** — headline rises out of a mask; the photo does scroll-linked parallax
- **The chat** — bubbles spring in one by one, with a live typing indicator
- **Before / After phone** — the screens swipe sideways (not a crossfade)
- **Value cards** — no entrance; tactile hover (image zoom + lift)
- **Photo break** — scroll parallax
- **Pricing** — tiers spring up in a stagger; the badge shimmers
- **Founder** — the orbit rings draw themselves on, then drift
- **Renting vs Owning** — the counters count up and the rent bar drips away
- **Guarantee** — the check mark draws itself on
- **Trust** — quiet; hover only

All of it respects `prefers-reduced-motion`: large/spatial motion is dropped and
content is shown in place.

## Deploy

`npm run build` outputs a static `dist/`. Deploy it to Vercel, Netlify, GitHub
Pages, or any static host.
