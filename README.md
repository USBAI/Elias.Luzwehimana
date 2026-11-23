# elias-portfolio

Personal portfolio of Elias Luzwehimana. Next.js 16 (App Router) + TypeScript, plain CSS, no UI library.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

- `lib/content.ts`: all copy (hero, slides and stories, work, experience, stack). Edit text here.
- `components/hero.tsx`: hero slider, availability banner and story card
- `components/story.tsx`: the glass story drawer used by slides and work cards
- `components/sections.tsx`: page sections
- `app/globals.css`: theme (Clarge lime on near-black, DM Sans + Instrument Serif)
- `public/images`: slider photos. Swap in higher-resolution versions (≥1600px) with the same names.

## Deploy

Push to GitHub and import the repo on Vercel. No env vars needed.
