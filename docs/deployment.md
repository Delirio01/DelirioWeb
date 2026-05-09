# Deployment

## Netlify

- Build command: `npm run build`
- Publish directory: `build/`
- Base directory: (none)

## `netlify.toml`

```
[[redirects]]
  from = "/terms"
  to = "/terms-of-service"
  status = 301
  force = true

[[redirects]]
  from = "/privacy"
  to = "/privacy-policy"
  status = 301
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Specific 301s come first so the SPA catch-all (`/*` → `/index.html`) doesn't swallow them.
Order in this file is significant — keep new specific redirects above the catch-all.

## Environment variables (set in Netlify UI)

- `VITE_CHAT_ENGINE_URL` — production chat engine URL (e.g. `https://chat-engine-production.up.railway.app`).
- `VITE_PIPECAT_BACKEND_URL` — production voice engine URL.
- `VITE_TRIGGER_API_KEY` — Pipecat trigger key.
- `VITE_TESTFLIGHT_URL` — public TestFlight invite URL.

Vite inlines `VITE_*` vars at build time, so changes require a redeploy (not just a restart).

## Deploy previews

Netlify auto-builds every PR at
`https://deploy-preview-N--<site>.netlify.app` where `N` is the PR number.

## Smart banner caveat

`index.html` line 7:

```html
<meta name="delirio-smart-banner-ios-app" content="app-id=delirio-testflight-beta" />
```

The `app-id` is a placeholder. The banner will not render in production until this is replaced
with the numeric App Store ID issued when the app ships to the public store.

## Smoke-test checklist

After each deploy, verify on the production URL:

- `/` renders the landing page (hero, wave background, contact capture).
- `/terms-of-service` and `/privacy-policy` render with header + footer (legal shell).
- `curl -I https://<site>/terms` returns `301` to `/terms-of-service`.
- `curl -I https://<site>/privacy` returns `301` to `/privacy-policy`.
- Chat input on `/` posts a message and receives a non-empty assistant reply.
- Voice "Call" button initiates a connection (browser will prompt for mic) and the bot greets.
