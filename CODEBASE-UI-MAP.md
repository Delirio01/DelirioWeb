# DelirioWeb UI Codebase Map

## Project Setup
- **Framework**: React 18 + Vite (vite.config.ts: esnext build target, aliases for shadcn/ui deps).
- **Styling**: Tailwind CSS v4.1.3 (src/index.css), no custom tailwind.config.*; Google Fonts (Manrope 500-800, Source Sans 3 400-700).
- **UI Primitives**: shadcn/ui (Radix UI heavy: dialog, popover, tabs, etc.), MUI icons/material.
- **Routing**: react-router-dom in App.tsx (/, /terms, /privacy, /sms-signup).
- **Entry**: public/index.html → src/main.tsx → App.tsx → src/pages/Landing.tsx (main landing).
- **Build/Deploy**: Netlify (netlify.toml, public/_redirects), proxy /api/chat to external.

## Page Flow (Landing at /)
- **App.tsx**: Routes to Landing.tsx.
- **Landing.tsx** (~63KB): Composes fitness-themed sections (imports FitnessHeader, FitnessHeroWithScroll, FitnessFeatures, HowItWorks, Testimonials, FitnessWaitlist, Footer).
- **Other Routes**:
  - /sms-signup → MessagingOptIn.tsx (form-heavy).
  - /terms → TermsServices.tsx.
  - /privacy → PrivacyPolicy.tsx.

## Key Components (src/components/)
| Category | Files | Purpose |
|----------|--------|---------|
| Landing Core | FitnessHeader.tsx, FitnessHeroWithScroll.tsx (hero + scroll), FitnessFeatures.tsx, HowItWorks.tsx, Testimonials.tsx, FitnessWaitlist.tsx, Footer.tsx | Hero, features, CTA sections. |
| Visuals/Effects | ParticleVisual3D.tsx (~23KB), ParticleVisualCanvas2D.tsx (~8KB), LandingBackgroundLines.tsx (~14KB), ScrollingAdvantages.tsx | Particles, animations, backgrounds. |
| Forms/UI | Waitlist.tsx, WaitlistForm.tsx, MessagingOptIn.tsx (~12KB), TrustBadges.tsx | Signup, opt-in, badges. |
| Static | Header.tsx, Footer.tsx, PrivacyPolicy.tsx, TermsServices.tsx | Shared/legal. |
| UI Primitives | ui/ (50+ files), logo.tsx, figma/ | shadcn/ui components. |

## Styles (src/)
- **Global**: src/index.css (54KB Tailwind base + custom vars: green palette --color-green-50 to -800, black/white, spacing/text scales).
- **Themed**: src/styles/landing-redesign.css (87KB redesign), globals.css, fitness-*.css (fades/animations).
- **Custom**: src/components/ inline styles (e.g., FitnessHeroWithScroll has scroll triggers).

## Assets (Images/Icons)
- **Public**: logo.png (468B), faviocn.svg (814B favicon).
- **src/images/**: 
  - emojis/ (Reed/Iris: mic states, speaking, connecting PNGs).
  - iMocksImages/ (13 dirs: app mocks?).
  - appleOfficialBadges/ (App Store badges).
- **Other**: node_modules icons (date-fns SVGs).

## Visual Elements & Design Summary
- **Color Scheme**: Tailwind defaults + green accents (oklch greens 50-800 for fitness/energy), black (#000)/white (#fff) contrast. Modern, clean, energetic.
- **Typography**: Manrope (headings/bold), Source Sans 3 (body). Responsive scales (--text-xs to -7xl).
- **Layout**: Full-bleed hero with particles/3D canvas, scrolling sections (parallax/advantages), grid/flex features. Mobile-first Tailwind (responsive utils implied).
- **Responsiveness**: Tailwind breakpoints (sm/md/lg/...), viewport meta, no explicit issues noted. Particles/scroll effects adapt via hooks (useIsMobile.ts empty).
- **Animations**: Anime.js, particles (3D/2D canvas), scroll-triggered fades (Fitness* components).
- **Trends**: Modern (shadcn/Radix primitives, Tailwind v4), fitness-landing vibe (hero CTAs, testimonials, waitlist), but particle-heavy (perf?).

## Relevant UI Files (Changed/Active)
- **Core**: src/pages/Landing.tsx, src/App.tsx, src/main.tsx.
- **Components**: All Fitness*.tsx, Particle*.tsx, Waitlist*.tsx, ui/*.
- **Styles**: src/index.css, src/styles/landing-redesign.css.
- **Public/Assets**: public/{logo.png, faviocn.svg, _redirects}, src/images/*.

**Notes**: Heavy on visual effects (particles ~40KB code); redesign CSS suggests iteration. No tests/formatter visible. Ready for audit/improvements.
