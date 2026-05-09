# Architecture

## Live import graph

### `src/pages/Landing.tsx` (1330 lines)

Composes the entire `/` page. Direct imports:

- `react` — `useEffect`, `useRef`, `useState`, `CSSProperties`, `FormEvent`.
- `lucide-react` — `ChevronLeft`, `ChevronRight`, `MessageCircle`, `MoveRight`, `Smartphone` icons.
- `@mui/icons-material/*` — 7 phone/mic icons (`CallRounded`, `CallEndRounded`, `MicRounded`, `MicOffRounded`, `SendRounded`, `VolumeUpRounded`, `VolumeOffRounded`). Pulls in `@mui/material` + `@emotion/*`.
- `../components/logo` — `Logo` SVG component.
- `../components/LandingSiteHeader` — top nav bar (sticky, scroll-aware, exposes section nav callbacks).
- `../components/LandingSiteFooter` — footer with social icons + legal links.
- `../components/LandingBackgroundLines` — animated SVG wave background.
- `../images/**/*.{png,webp}` — TestFlight badge, Iris/Reed emoji frames, iMessage mocks, feedback mocks.
- `../hooks/useTextChat` — text chat integration.
- `../hooks/useVoiceSession` — voice session integration.
- `../utils/pipecatConfig` — `generateDiscoveryId()` helper.
- `../styles/landing-redesign.css` — Landing-specific CSS.

### Legal page graph

`src/components/PrivacyPolicy.tsx` and `src/components/TermsServices.tsx` each render their copy
inside `LandingLegalShell` (`src/components/LandingLegalShell.tsx`), which composes
`LandingSiteHeader` + `LandingSiteFooter` and applies the `landing-redesign.css` styles.

## Hooks

### `src/hooks/useVoiceSession.ts`

Wraps `@pipecat-ai/client-js` `PipecatClient` with a `DailyTransport`. Owns:

- Session state machine: `idle | connecting | connected | error`.
- Mic + speaker mute toggles, transcript stream parsing (LLM + TTS streams deduped, inline
  markup like `<...>` stripped chunkwise across boundaries).
- Connection retry with exponential backoff (max 3 attempts; retries on `503`, `502`, network,
  timeout errors).
- `startBotAndConnect` POST against `${VITE_PIPECAT_BACKEND_URL}/connect` with
  `{ user_id, personality, context }`; an `llm.messages` system-prompt override is passed via
  `config` (typed-optional in the SDK, runtime-supported).
- Audio element lifecycle: a single `Audio` is created on first connect, attached to the remote
  audio track via `MediaStream`, primed inside the click handler so autoplay isn't blocked.

### `src/hooks/useTextChat.ts`

REST POST to the chat engine. Endpoint is `/api/chat` (Vite proxy) in dev and
`${VITE_CHAT_ENGINE_URL}/chat` in production. POST body:
`{ userId, personality, context, interface: "web_chat", message }`.

Response handling is defensive: the body is `JSON.parse`'d, then deep-parsed (recursive
re-parse of any string that itself looks like JSON, since the engine sometimes double-encodes),
then assistant turns are extracted from `messages[].role !== "user"` with fallbacks to
`response | reply | answer | content | text` keys, and a final fallback to the raw body. If a
reply parses back into an object, it's replaced with `"Please respond without special
characters"` so users never see raw JSON.

`AbortController` is used so `clearMessages()` cancels any in-flight request.

## Animations

### `src/components/LandingBackgroundLines.tsx`

SVG with two `<path>` elements (blue + pink) inside a `viewBox="0 0 1920 1000"`. Three RAF
loops:

- **Blue path morph** — animates `bluePath` prop changes via cubic-eased number interpolation
  on the path's numeric tokens.
- **Pink path morph** — same, for `pinkPath`.
- **Wave** — when `waveBehaviour` is true, samples each path into ~48 points per cubic segment
  and applies a traveling-sine warp (with an envelope that breathes over `waveEnvelopeCycleMs`)
  on every frame. `travelBlue` / `travelPink` boost the per-channel strength when sections are
  active. Respects `prefers-reduced-motion`. Cleanup is colocated with the start effect, so
  toggling `waveBehaviour` false truly stops the loop.

No anime.js (the `src/types/animejs.d.ts` shim is vestigial).

## Tailwind v4 setup

The project uses Tailwind v4 in zero-config mode but `src/index.css` is the **pre-compiled**
output rather than a source file with `@import "tailwindcss"`. Tailwind itself is not in
`package.json`. Tokens (color, spacing, typography) live in the `@layer theme { :root, :host { ... } }`
block at the top of `index.css`. Custom utilities live in `@layer utilities`. To extend, edit
`index.css` directly, or regenerate from a Tailwind source upstream of this repo.

## State management

React local state only. No Redux, Zustand, or context providers. Cross-component
synchronization is handled by lifting state into `Landing.tsx` and passing callbacks down.
