# Styling

## Tailwind v4 (zero-config, pre-compiled)

The project uses Tailwind v4. Importantly, `src/index.css` is the **pre-compiled** Tailwind
output rather than a source stylesheet — the file begins with `/*! tailwindcss v4.1.3 ... */`
and Tailwind itself is not in `package.json`. There is no PostCSS step; Vite imports
`src/index.css` from `src/main.tsx` and serves it as-is.

The compiled CSS is split into the standard Tailwind layers:

- `@layer properties` — CSS custom property defaults
- `@layer theme` — design tokens (`--color-*`, `--font-*`, `--spacing`, `--container-*`,
  `--text-*` etc.) declared on `:root, :host`
- `@layer base` — element resets and base styles
- `@layer utilities` — generated utility classes (`.flex`, `.gap-4`, etc.)

To regenerate, install `tailwindcss` upstream of this repo or run a Tailwind v4 build against
a small source file like `@import "tailwindcss";` and replace `src/index.css`.

## Custom CSS files

- `src/index.css` — compiled Tailwind output (don't hand-edit utilities; you can extend tokens
  in the `@layer theme` block).
- `src/styles/landing-redesign.css` — Landing-specific layout, animations, custom selectors
  (`.landing-shell`, `.landing-background-lines`, `.landing-wave-track`, etc.).

## Design tokens

Defined in the `@layer theme { :root, :host { ... } }` block in `src/index.css`. Examples:

- Color: `--color-black`, `--color-white`, `--color-green-{50,200,500,800}`.
- Spacing: `--spacing` (base unit, used by `--spacing` calc() utilities).
- Typography: `--font-sans`, `--font-mono`, `--text-{xs,sm,base,...}` plus matching
  `--text-*--line-height` pairs.
- Containers: `--container-{2xl,3xl,4xl,7xl}`.

## Adding a component

1. Compose with existing Tailwind utility classes.
2. For conditional class merging, use the `cn()` helper from `src/components/ui/utils.ts`
   (wraps `clsx` + `tailwind-merge`).
3. To add a new shadcn primitive, copy the source from the shadcn-ui registry into
   `src/components/ui/`. Never use versioned imports (`from "package@1.2.3"`) and never run
   the Figma Make codegen — both produce artifacts incompatible with this build.
