# Deploying LLAB to Railway

The portfolio site is a static React + Babel app. No build step — Railway just installs `serve` and points it at the portfolio folder.

## One-time setup

1. Push this project to GitHub (Railway pulls from a repo).
2. In Railway: **New Project → Deploy from GitHub repo → pick this repo**.
3. Railway auto-detects `package.json`, runs `npm install`, then `npm start`.
4. The service exposes whatever `$PORT` Railway provides; `serve` honors it.
5. In **Settings → Networking**, click **Generate Domain** for a public URL.

That's it — no env vars needed.

## What gets served

`serve -s ui_kits/portfolio_site` serves the portfolio site as the root. So `https://your-app.up.railway.app/` lands on the Gateway. The `-s` flag enables single-page-app fallback (any unmatched path serves `index.html`) — useful since the router is client-side.

## Heavy assets

- `assets/brave.mp4` and `assets/experimental-bg.mp4` are the largest files. They'll stream from Railway's CDN, but for production you may want to host them on Cloudflare R2 / S3 / Mux and rewrite the `<video src>` references.
- Fonts in `/fonts/` are served as-is.

## Local preview before deploy

```bash
npm install
npm start
# open http://localhost:3000
```

## Notes

- The site uses `<script type="text/babel">` for JSX. Babel transpiles in the browser — fine for prototypes and small-team marketing sites; for high-traffic production you'd want to pre-compile.
- React, ReactDOM, and Babel are pinned to specific versions with integrity hashes; CDN swaps won't break deployment.
- No backend, no database, no env secrets to configure.
