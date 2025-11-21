# ShipFastCards - Holiday Card Mailing Service

## Quick Deploy
1. Fork/clone this repo.
2. Backend: [Deploy to Railway](https://railway.app/new) → Connect GitHub → Select `backend` folder.
3. Frontend: [Deploy to Vercel](https://vercel.com/new) → Import repo → Set root to `frontend`.
4. Env Vars (both deploys):
   - `DATABASE_URL`: (Auto-generated in Railway)
   - `REDIS_URL`: (Auto in Railway)
   - `JWT_SECRET`: Generate one (e.g., `openssl rand -hex 32`)
   - `COOKIE_SECRET`: Same as above
   - `STRIPE_API_KEY`: Your Stripe secret key
   - `FRONTEND_URL`: https://your-vercel-app.vercel.app
   - `UPLOADTHING_SECRET`: Get from uploadthing.com (free)
   - `UPLOADTHING_APP_ID`: Same
5. Seed Products: Run `medusa seed -f ./data/seed.json` in backend (after deploy).
6. Test: Visit frontend → Pick tier → Upload CSV/art → Checkout.

## Features
- Pre-made holiday designs (6 templates).
- CSV upload + validation (name, address, city, state, zip).
- Pricing: $1.50/card (100+), $1.20 (500+), $0.99 (1k+).
- 7-day fulfillment guarantee.
- Admin: Log in at /admin to view orders/files.

Built with ❤️ for solo founders. Questions? @grok on X.
