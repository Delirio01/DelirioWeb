# Delirio Web

Marketing landing page for Delirio, an AI fitness coaching iOS app. The site demonstrates the
voice and text coaching experience via Pipecat, hosts the legal pages, and points users to the
TestFlight beta.

## Stack

- React 18 + TypeScript (strict)
- Vite 6 (`@vitejs/plugin-react-swc`)
- Tailwind v4 — pre-compiled stylesheet checked in at `src/index.css`; no PostCSS or runtime config
- `react-router-dom` v7 for client-side routing
- `@pipecat-ai/client-js` + `@pipecat-ai/daily-transport` for voice; REST POST for text chat
- Netlify hosting (build dir `build/`)

## Entry chain

```
index.html → src/main.tsx → src/App.tsx → src/pages/Landing.tsx
```

Legal routes wrap their content in `src/components/LandingLegalShell.tsx`, which renders
`LandingSiteHeader` + `LandingSiteFooter` around the page body.

## Routes

- `/` — Landing
- `/terms-of-service` — Terms (legal shell)
- `/privacy-policy` — Privacy policy (legal shell)
- `/terms` and `/privacy` 301-redirect to the new paths via `netlify.toml`.

## Commands

```
npm run dev         # vite dev server on :3000
npm run build       # vite build → build/
npm run preview     # serve build/
npm run typecheck   # tsc --noEmit (strict)
npm run lint        # eslint src
npm run format      # prettier --write src
```

There is no unit-test runner configured (no vitest/jest). Code-correctness checks are
`typecheck` + `lint`; feature correctness comes from browser-testing — see below.

## Verifying changes

Before reporting any code change as done:

1. `npm run typecheck` — must pass.
2. `npm run lint` — must not introduce new errors. Existing warning count is in **Lint state**
   below; don't increase it without reason.
3. **Browser-test the change.** Start `npm run dev` and use the `playwright-cli` skill
   (defined at `.claude/skills/playwright-cli/`) to drive a real browser against
   `http://localhost:3000`. Visit the affected route, exercise the changed flow end-to-end,
   and check the console (`playwright-cli console`) for new errors or warnings. Typecheck and
   lint confirm code correctness; only the browser confirms feature correctness. If you
   genuinely cannot exercise the flow in a browser (e.g. it depends on a backend you can't
   reach), say so explicitly rather than claiming success.
4. **Test mobile first.** This is a marketing site for an iOS app — the majority of real
   traffic will land on a phone. Any UI change must be checked at a phone viewport before
   it's reported as done; desktop alone is not enough. Sanity-check at least these two
   viewports, and add a tablet width if the change touches a breakpoint:
   ```
   playwright-cli resize 390 844    # iPhone-class — REQUIRED for any UI change
   playwright-cli resize 1440 900   # desktop
   playwright-cli resize 820 1180   # iPad-class — when touching responsive breakpoints
   ```
   Watch for: text overflow, tap targets <44px, horizontal scroll, content hidden behind the
   smart banner, hero/section padding collapsing, image mockups overlapping copy.

### playwright-cli artifacts

All `playwright-cli` output — screenshots, PDFs, traces, videos, snapshot YAMLs, console
logs — must land inside `.playwright-cli/` (gitignored). Auto-named files (snapshots,
console logs) already go there; for screenshots and PDFs you **must** pass the path
explicitly or they fall into the repo root:

```
playwright-cli screenshot --filename=.playwright-cli/hero.png
playwright-cli screenshot e5 --filename=.playwright-cli/hero-cta.png
playwright-cli pdf --filename=.playwright-cli/page.pdf
```

Never write playwright artifacts to the repo root or anywhere else under version control.

### Session hygiene

- Always run `playwright-cli close` when done — don't leave headless browsers around.
- Stop the dev server when done (kill the background `vite` process you started).
- Don't reuse a stale browser session across unrelated tasks. If `playwright-cli` returns
  "browser is not open," start fresh with `playwright-cli open <url>` rather than guessing.

## Environment variables

```
VITE_CHAT_ENGINE_URL       # Pipecat chat backend (default: chat-engine-staging.up.railway.app)
VITE_PIPECAT_BACKEND_URL   # Pipecat voice backend (default: voice-engine-staging.up.railway.app)
VITE_TRIGGER_API_KEY       # Pipecat backend trigger key (default: "password")
VITE_TESTFLIGHT_URL        # TestFlight redirect URL (default: https://testflight.apple.com/)
```

Defaults live in `src/utils/pipecatConfig.ts` and `src/components/LandingLegalShell.tsx`.

## Non-obvious things

- Tailwind v4 zero-config: `src/index.css` is the **pre-compiled** Tailwind output (the file
  starts with `/*! tailwindcss v4.1.3 ... */`). Tailwind itself is not in `package.json`. To
  regenerate, install `tailwindcss` and rebuild upstream of this repo, or hand-edit `index.css`.
- Tokens (colors, spacing, typography) live in the `@layer theme` block at the top of
  `src/index.css`. Custom utilities are in `@layer utilities`.
- Smart-banner meta in `index.html` uses `app-id=delirio-testflight-beta` — placeholder; the
  banner will not render in production until replaced with a numeric App Store ID.
- `useTextChat` uses Vite proxy `/api/chat` in dev (configured in `vite.config.ts`) and
  `${VITE_CHAT_ENGINE_URL}/chat` in production.
- `LandingBackgroundLines.tsx` runs a wave RAF loop. Cleanup is colocated with the start effect
  and runs whenever `waveBehaviour` toggles or the component unmounts.
- MUI icons (`@mui/icons-material`) appear in 7 places in `Landing.tsx` for call/mic UI; they
  drag in `@mui/material` + `@emotion/*`. Candidate for a future swap to `lucide-react`.
- shadcn UI components live under `src/components/ui/` (button, input, checkbox, label, utils).
  Add more from the shadcn registry — never via Figma codegen, never with versioned imports.

## Lint state

46 warnings remaining as of 2026-05-09 (mix of `no-explicit-any` in chat/voice payload
narrowing, two `react-hooks/set-state-in-effect` patterns in `Landing.tsx`, and unescaped
quotes in legal copy). 0 errors.
