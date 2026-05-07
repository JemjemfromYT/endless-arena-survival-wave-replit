# Endless Arena — Frontend

  Hosted on Vercel. Backend (API + Colyseus multiplayer) runs on Replit.

  ## Setup after first deploy on Vercel

  1. Find your Replit deployed backend URL (e.g. `https://endless-arena.replit.app`)
  2. Edit **`game/config.js`** — set `window.BACKEND_URL` to your Replit backend URL
  3. Edit **`vercel.json`** — replace both `REPLIT_BACKEND_URL` placeholders with your actual URL
  4. Commit & push — Vercel redeploys automatically

  ## Architecture

  - **Frontend** (this repo → Vercel): game HTML/JS, zero "Made with Replit" branding
  - **Backend** (Replit deployed): Express API, Colyseus multiplayer, PayMongo payments
  - Hero images & sounds are proxied through Vercel rewrites to the Replit backend
  - API calls go directly to the Replit backend (CORS enabled)
  - Colyseus WebSocket connects directly to the Replit backend
  