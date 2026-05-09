# Contributing

## Pre-commit checklist

Before opening a PR:

```
npm run typecheck   # must pass
npm run lint        # warnings ok, errors must be 0
npm run build       # must produce build/
```

`npm run format` is available but is not run automatically; do not reformat unrelated files in
the same PR.

## Coding rules

- No versioned imports. `import x from "package@1.2.3"` is a Figma Make codegen artifact and
  will break the build. Always use clean specifiers (`from "package"`).
- No Figma Make codegen artifacts in `src/`. The previous cleanup waves removed all of these;
  do not reintroduce them by pasting Figma exports.
- Prefer existing shadcn components in `src/components/ui/` (button, input, checkbox, label)
  over inline `@radix-ui/*` usage when adding new UI.
- Match the Prettier config (`.prettierrc`). Don't reformat existing files in unrelated PRs.

## Adding a new route

In `src/App.tsx`:

```tsx
<Route path="/your-path" element={<YourPage />} />
```

If the page is a legal/static page, wrap its content in `LandingLegalShell` so it inherits the
shared header + footer.

## Adding a shadcn component

Copy the component source from <https://ui.shadcn.com/> into `src/components/ui/`. Do not run
the shadcn CLI against this repo (it expects a `components.json` config and the standard
Tailwind source layout; this repo uses pre-compiled Tailwind). Use clean import specifiers and
adjust the existing `cn()` import path to `./utils`.
