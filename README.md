# Get Found — landing page

A custom-coded, single-page site for a studio that builds websites for local
businesses (the working example is a garden events venue in Tayabas, Quezon).
No framework, no build step, no dependencies — just HTML, CSS, and a little
vanilla JavaScript. It loads fast on a phone and it's yours to own.

## Files

```
index.html          Markup + copy for every section
styles.css          All styling (design tokens at the top)
main.js             Interactions (see CONFIG at the top)
assets/
  fonts.css         @font-face for the self-hosted fonts
  fonts/*.woff2     Fraunces (display) + Hanken Grotesk (body) subsets
  img/*.webp        Photography
design/             The original Claude Design source, kept for reference
```

## Run it locally

It's a static site, so any static server works:

```bash
npx serve .
# or
python -m http.server 4321
```

Then open the URL it prints. (Opening `index.html` directly with `file://`
also works, but a server is closer to production and avoids font/CORS quirks.)

## Make it yours

**1. Brand name + booking link.** Open `main.js` and edit the `CONFIG` block
at the top — it's the only place these live:

```js
var CONFIG = {
  brandName:  'studio',                 // shown in the nav + footer
  bookingUrl: 'https://m.me/yourpage',  // where every "Book" button goes
  founderName: ''                       // e.g. 'Alejandro' (fills the founder line)
};
```

`bookingUrl` can be a Messenger link, a WhatsApp `https://wa.me/…` link, a
Calendly URL, a `tel:` number, or a `mailto:` — whatever you want the buttons
to open.

**2. Photos.** Drop replacements into `assets/img/` using the same filenames:

| File            | Where it shows        | What works best |
|-----------------|-----------------------|-----------------|
| `hero.webp`     | Full-screen hero      | Wide, warm, atmospheric — it gets darkened for text |
| `phone.webp`    | The "after" phone card| The business looking its best |
| `findable.webp` | Value card 1          | A search moment — phone in hand |
| `credible.webp` | Value card 2          | A beautiful detail — plate, table, light |
| `bookable.webp` | Value card 3          | A hand tapping "message" |
| `break.webp`    | Full-bleed photo break| One gorgeous shot — morning light, a set table |
| `founder.webp`  | Founder portrait      | **Replace with the real founder's photo** |

The photos here were generated with Higgsfield (Soul 2.0) as realistic
placeholders. Swap in real shots of the actual business before you go live —
real always beats generated.

**3. Copy, prices, the story.** All text is right there in `index.html`. Prices
live in the pricing section; the example "Hardin Verde" venue story lives in the
Problem and Signature sections — change the names, numbers, and city to match.

## Deploy

Drag the folder onto **Netlify**, import it to **Vercel**, or push it to a
**GitHub Pages** repo. There's nothing to build — the folder *is* the site.

## Notes

- **Motion respects `prefers-reduced-motion`** — everything falls back to a
  calm, static page for people who ask for reduced motion.
- **Works without JavaScript** — content is fully readable; JS only adds the
  reveals, the before/after toggle, and the count-ups.
- **Fonts are self-hosted** — no external font requests, no layout shift.
