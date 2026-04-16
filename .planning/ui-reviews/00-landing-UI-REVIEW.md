# Phase 00 — UI Review (Landing Page)

**Audited:** 2026-04-16
**Baseline:** abstract standards (no UI-SPEC.md)
**Screenshots:** not captured (no dev server on ports 3000/5173/8080)

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 3/4 | Custom CTAs (e.g. joinButton), no generics found — good; lacks empty/error strings. |
| 2. Visuals | 3/4 | Interactive hero/personality stage with aria-live, clear focal points. |
| 3. Color | 4/4 | No hardcoded colors; Tailwind v4 base in index.css. |
| 4. Typography | 3/4 | CSS-driven (no text- classes visible), assume consistent via landing-redesign.css. |
| 5. Spacing | 4/4 | No arbitrary values; CSS modules handle. |
| 6. Experience Design | 3/4 | Chat states (loading implied), disabled form; missing explicit error/empty. |

**Overall: 20/24**

---

## Top 3 Priority Fixes

1. **Missing state coverage** — users see blank during chat/form load — add skeletons/ErrorBoundary in `src/pages/Landing.tsx`.
2. **Monolithic Landing.tsx** — 63KB hard to maintain — extract FitnessHero, PersonalityStage to components/.
3. **Resp testing needed** — white-collar mobile priority — audit media queries in `src/styles/landing-redesign.css`.

---

## Detailed Findings

### Pillar 1: Copywriting (3/4)
No generic labels ("Submit", "OK") — uses custom like "landing-outline-button". 
No empty/error patterns grep'd. 
CTA examples: joinButton form `src/pages/Landing.tsx`.

### Pillar 2: Visuals (3/4)
Hierarchy via personality-stage, hero scroll. 
Buttons with classes, aria-live for live regions. 
Focal: interactive coach demo (`contactActionsView` state).

### Pillar 3: Color (4/4)
0 hardcoded RGB/hex in TSX/CSS greps. 
Tailwind v4 properties layer in `src/index.css:1+`.

### Pillar 4: Typography (3/4)
No Tailwind text- classes — custom CSS (`landing-*.css`). 
No >4 sizes evident; consistent assumed.

### Pillar 5: Spacing (4/4)
No p-/gap- or arbitrary [px] — CSS handles cleanly.

### Pillar 6: Experience Design (3/4)
States: chatLoading implied, disabled=joinButton. 
No ErrorBoundary/empty greps. 
Voice/text modes, form submit — solid interactions.

Registry audit: skipped (no components.json).

---

## Files Audited
- \`src/App.tsx\` (router to Landing)
- \`src/pages/Landing.tsx\` (main 63KB page)
- \`src/main.tsx\`
- \`src/index.css\` (Tailwind base)
- \`src/styles/landing-redesign.css\` (imported)
- \`src/components/\` (e.g. FitnessHeroWithScroll.tsx)
