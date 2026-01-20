# Scout Goat — Vercel Ready Website

This is a premium, conversion-focused Scout Goat site built for **Vercel + Next.js**.

## What’s better vs the single-file HTML
- **No browser webhook blocks**: leads + photos are sent from a secure **/api/lead** server route (so CORS won’t kill your conversions).
- **Webhook secret stays private** (env var on Vercel).
- **Fast, mobile-first** UI with clean SEO + sitemap + robots + JSON-LD.

## Quick Deploy (Vercel)
1. Upload this folder to a GitHub repo.
2. In Vercel: *Add New → Project → Import repo*.
3. Add Environment Variables:
   - `DISCORD_WEBHOOK_URL` = your real Discord webhook
   - `FORMSPREE_ENDPOINT` (optional backup)
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`
   - `NEXT_PUBLIC_BUSINESS_PHONE` = `(251) 289-0478` (or whatever)
   - `NEXT_PUBLIC_BUSINESS_EMAIL` (optional)
   - `NEXT_PUBLIC_CITY` = `Mobile, AL`
4. Deploy.

## Local dev
```bash
npm install
npm run dev
```
Then open http://localhost:3000

## Notes
- QuoteTool caps uploads to **6 photos** and ~8MB total to stay inside typical serverless limits.
- The estimate is still heuristic; true photo analysis would require a vision model.
