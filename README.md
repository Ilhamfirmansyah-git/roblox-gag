# Steal a Brainrot — Value List & Tools

A fast, mobile-first web app for the Roblox game **Steal a Brainrot**. Helps players check item values, calculate if trades are fair, and create shareable tier lists.

## Features

- **Value List** — search, filter, and sort all items by value/demand/rarity
- **Trade Calculator** — compare two trade sides, get WIN/FAIR/LOSE verdict
- **Tier List Maker** — drag-drop items into S/A/B/C/D tiers, export as PNG

## Quick Start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build
npm run preview    # preview build locally
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
3. Framework preset: **Astro**
4. Click Deploy — done. Auto-deploys on every push to main.

## Updating Item Values

See [DATA.md](./DATA.md) for a full guide on adding/editing/removing items without coding.

## Setting Up Ads (AdSense)

1. Copy `.env.example` to `.env`
2. Fill in your AdSense publisher ID and slot IDs
3. Open `src/components/AdSlot.tsx` and replace the placeholder `<div>` with your actual AdSense `<ins>` tag
4. Redeploy

> ⚠️ **Compliance Note:** Roblox's audience includes many minors. Ad networks like Google AdSense have "child-directed content" policies (e.g., COPPA in the US) that restrict targeted advertising for children. Before monetizing, review your ad network's eligibility requirements and applicable regulations. Do not collect personal data from children. This is the site owner's responsibility — the code only provides placeholder slots.

## Setting Up Affiliate Links

1. Get your affiliate URL for a Robux top-up service
2. Set `PUBLIC_AFFILIATE_ROBUX_URL` in `.env`
3. Or edit `src/components/AffiliateBanner.tsx` directly

## Tech Stack

- [Astro](https://astro.build) — static site framework (best SEO + performance)
- [React](https://react.dev) — interactive islands (calculator, tier list)
- [Tailwind CSS](https://tailwindcss.com) — styling
- [@dnd-kit](https://dndkit.com) — accessible drag-and-drop
- [html-to-image](https://github.com/bubkoo/html-to-image) — PNG export

## Disclaimer

This is a **fan-made** site. Not affiliated with Roblox Corporation or the creators of Steal a Brainrot. All item values are community estimates and may not reflect actual in-game trading rates. Values can change at any time.
