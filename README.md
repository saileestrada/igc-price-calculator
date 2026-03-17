# Tany Foods — IGC Promo Price Calculator 2026

Scenario calculator for the IGC vendor incentive. Models margin across regular and promotional cost windows for the flour and Maltin Polar lines.

## What it does

- Shows regular vs. promo IGC cost side by side for each SKU
- Editable "New price" field to model pricing scenarios
- Freight per case input that updates landed cost in both scenarios
- Margin badges (red < 15%, yellow 15–20%, green 20%+)
- Price @ target: minimum case sell price to hit your margin goal
- TRP reference: manufacturer promotional target retail per unit
- Lift column: margin pp gain from promo cost over regular

All data is entered in-browser. Nothing is stored or transmitted.

## Deploy

Push to GitHub, then go to **Settings → Pages → Source → GitHub Actions**. The workflow auto-deploys on every push to `main`.

## Local dev

```bash
npm install
npm run dev
```
