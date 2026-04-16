# Delirio Landing Page UI Design Contract v2

**Date**: 2026-04-16
**Target Audience**: White-collar workers (30-50, busy pros seeking efficient/aspirational fitness via AI coach).
**Trends**: Fashion/beauty-inspired minimalism (2026): bold sans-serif (Inter system), subtle navy-teal-emerald gradients, glassmorphism cards (backdrop-blur), micro-animations (hover lift/scroll reveal via Tailwind/Framer), dark/light toggle, perf-first (lazy particles).
**Business Alignment**: Approachable AI (Reed/Iris coaches), highlight SMS/voice/chat/schedules/progress sharing.
**Audit Baseline**: 20/24 pillars (strong Tailwind/colors; fix states/monolith/resp/mobile perf).
**Framework**: Keep React/Tailwind/shadcn/Radix; add Framer Motion for anims (`npm i framer-motion`).

## Design Tokens (src/index.css updates)

```
--primary-gradient: linear-gradient(135deg, hsl(203 69% 20%) 0%, hsl(162 73% 45%) 50%, hsl(162 73% 65%) 100%);
--glass-bg: hsla(var(--slate-12), 0.6) backdrop-blur-md border-slate-200/50;
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--text-primary: hsl(var(--slate-12));
--text-secondary: hsl(var(--slate-11));
```

- **Colors**: Navy/teal primary (pro/calm/energy), emerald accents (fitness growth), slate neutrals. No hardcodes.
- **Typography**: Inter (system) body/heading (font-bold), Manrope display only. Scales: text-xl to 7xl resp.
- **Spacing**: Tailwind default + custom --pad-20 (5rem), --gap-lg (3rem).
- **Radius**: md (0.5rem) cards/buttons, xl hero.
- **Shadows**: Subtle neumorph (inset/outset light/dark).

## Layout & Sections (Mobile-first grid/flex)

| Section | Layout | Key Elements | Anim | States |
|---------|--------|--------------|------|--------|
| Hero | Full-bleed h-screen flex center | Coach mock (3D particle opt-in), tagline "AI Coach for Busy Pros", CTAs (Trial/Chat Demo), scroll ↓ | Parallax coach, fade-in CTA | Loading skeleton, error retry |
| Features | 1-col mob → 2/3-col desk grid | 6 cards: Feedback, Chat (SMS/Voice), Schedules, Progress Share, Voice Anywhere, Custom Plans | Hover scale 1.05, stagger reveal | Skeleton cards |
| HowItWorks | Zigzag 3-step | Icons + text (Signup → Schedule → Crush) | Step counter anim | N/A |
| Testimonials | Embla carousel | 4 quotes w/ avatars (pro personas) | Auto-slide, swipe mob | Loading dots |
| Waitlist | Centered form + badges | Email/Phone, "Join 10k+" | Submit pulse | Success toast, error inline |
| Footer | Flex cols | Links, social (Insta/TikTok), © | N/A | N/A |

## Interactions & States
- **Loading**: shadcn Skeleton for hero/features/form (1-2s delay sim).
- **Error**: Global ErrorBoundary (`src/ErrorBoundary.tsx`), friendly "Refresh for coach" + retry btn.
- **Accessibility**: ARIA-live chat demo, focus-visible, reduced-motion respect.
- **Perf**: Lazy <ParticleVisual /> (IntersectionObserver), optional 3D (prefers-reduced-motion false).
- **Resp Breakpoints**: sm (640px mob), md (768 tab), lg (1024 desk), xl (1280 wide). Touch 48px min.

## Implementation Rules
- Extract from `Landing.tsx`: Hero.tsx, Features.tsx, etc. to `src/components/landing/`.
- Inline styles → Tailwind/CSS vars.
- Add theme toggle (next-themes).
- Test: `npm run dev` + Lighthouse 90+ perf/access.

**Verdict**: PASS if audit →24/24 post-changes. BLOCK if perf drops/mobile breaks.
