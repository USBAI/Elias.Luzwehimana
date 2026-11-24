# elias-portfolio

Personal portfolio of Elias Luzwehimana. Next.js 16 (App Router) + TypeScript, plain CSS, no UI library.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

- `lib/content.ts`: all copy (slides, work, studies, projects, experience, stack). Edit text here.
- `components/journey.tsx`: the guided path: hero, chapters, scroll-linked transitions, menu and pager
- `components/story.tsx`: the "Read more" room
- `components/logo.tsx`: logo tile with monogram fallback
- `app/globals.css`: theme (Clarge lime on near-black, DM Sans + Instrument Serif)
- `public/images`: hero photos (upscaled and cleaned). Replace with originals using the same names.
- `public/logos`: organisation logos. School logos show as monograms until you add `chas.svg`, `kth.svg` and `fhs.svg` (SVG or PNG renamed in `lib/content.ts`).

## Deploy

Push to GitHub and import the repo on Vercel. No env vars needed.
