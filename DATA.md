# How to Update Item Values

This guide explains how to add, edit, or remove items in the value list — no coding required.

## File Location

All item data lives in: `src/data/items.json`

## Item Schema

Each item follows this structure:

```json
{
  "id": "unique-slug-here",
  "name": "Display Name",
  "rarity": "Common",
  "value": 1000,
  "demand": 5,
  "trend": "stable",
  "obtainable": true,
  "image": "/images/items/filename.png",
  "notes": "Optional notes about the item's value source."
}
```

## Field Reference

| Field | Type | Options |
|-------|------|---------|
| `id` | string | Lowercase, hyphens only (e.g. `my-item-name`) — used in URL |
| `name` | string | Display name shown to users |
| `rarity` | string | `Common`, `Rare`, `Epic`, `Legendary`, `Mythic`, `Brainrot God`, `Secret` |
| `value` | number | Community consensus value (no currency, just a number) |
| `demand` | number | 1–10 scale (1 = very low demand, 10 = extremely high) |
| `trend` | string | `up`, `down`, or `stable` |
| `obtainable` | boolean | `true` if still obtainable in-game, `false` if limited/gone |
| `image` | string | Path to image file in `/public/images/items/` |
| `notes` | string | Source of value, caveats, or any extra info |

## Adding an Item

1. Open `src/data/items.json`
2. Add a new object to the array following the schema above
3. Add the item's image to `public/images/items/` (PNG or WebP, ideally 128×128px)
4. Commit and push — the site will auto-deploy

## Editing Values

1. Find the item by its `id` or `name`
2. Update the `value`, `demand`, and/or `trend` fields
3. Update `notes` to reflect where the new value came from (e.g. "Discord trading channel consensus, Jan 2025")
4. Commit and push

## Removing an Item

Simply delete its entry from the JSON array.

## Image Guidelines

- Place images in: `public/images/items/`
- Filename should match the item `id` (e.g. `tralalero-tralala.png`)
- Recommended size: 128×128px or 256×256px, square
- Format: PNG or WebP

## Value Source Guidance

⚠️ Values should reflect **community consensus**, not individual opinions. Good sources:
- Discord trading servers for Steal a Brainrot
- Trading community spreadsheets
- High-volume trader agreements

Always mark placeholder values in `notes` as `"PLACEHOLDER — replace with community consensus value."` until confirmed.
