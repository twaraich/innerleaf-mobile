# innerleaf-mobile — Spoke 1b: Inner Leaf Companion App

## Identity
This is **Spoke 1b (Product-Mobile)** in the Inner Leaf multi-spoke architecture.
See ../ARCHITECTURE.md for the full system overview.

## Tech Stack
- React Native + Expo (managed workflow)
- TypeScript
- Expo SQLite (local-first data)
- React Navigation (native stack)
- Expo Font (Cormorant Garamond + DM Sans)

---

## Decided (non-negotiable)

These are load-bearing walls. Don't change without explicit instruction.

### Brand & Design System
Same tokens as innerleaf-web:
- Dark: #011f20 | Sage: #5b7a74 | Cream: #F5F1E8 | Gold: #C9A227
- Headings: Cormorant Garamond | Body: DM Sans
- Philosophy: "Design for the disengaged user"
- Target: feels like a calm ritual, not a productivity app

### UX Principles
- No streak mechanics, no guilt-based engagement patterns, ever
- Missing data = meaningful signal, never a failure state
- Every screen must be usable in a low-energy state
- Maximum 1 primary action per screen for critical flows
- Animations must be subtle, not attention-grabbing
- Brand language: "notice your patterns" not "track your mood"

### Data Principles
- All data local-first (SQLite), no cloud sync in v1
- Mood stored as weather enum internally
- Journal entries: { id, mood, text, timestamp, tags? }

### Commands
- npx expo start — dev server
- npx expo start --ios — iOS simulator
- npx expo start --android — Android emulator
- eas build --platform ios — production build

---

## Direction (current plan — may change)

These represent current thinking. Screens, flow, features, and even the
core concept may evolve. If Veer says to change direction, update this
section and adjust tasks accordingly. Don't push back on pivots — adapt.

### Current app concept
A mindful journaling companion. The app is a ritual, not a productivity tool.
Bilingual NO/EN — Norwegian as primary language. Norwegian brand vocabulary
(Stillhet, Årringer, Mønster) used as feature names even in English mode.

### Current screen flow (subject to change)
1. **Stillhet (Stillness)**: Breathing animation. Auto-plays on app open.
   This IS the app's first impression — no splash screen, no onboarding
   before it. Single tap anywhere skips to next screen.
2. **Mood Check-in**: Full-screen weather scene (sunny, cloudy, rainy,
   stormy, foggy). Single tap to select. Not an emoji grid — immersive
   weather visuals.
3. **Write**: Distraction-free journaling. Minimal chrome. Auto-save.

### Future feature concepts (not M1)
- **Årringer (Tree Rings)**: Entry visualization as tree cross-section rings.
  Mood affects ring texture. Not gamified — thin and thick rings are equally
  valid. A record of presence, not performance.
- **Mønster (Patterns)**: Quiet text observations about journaling habits.
  Stated as noticing, not judgment. Appears after 2+ weeks of data.
  Example: "You've written more on cloudy days lately."

### Current monetization thinking (v2, not v1)
- Freemium with QR codes in physical journals → unlock premium
- Premium: ~$4.99/month or $39/year
- Premium features: AI prompts, extended history, pattern insights

### Open design questions
- Should Stillhet have ambient sound or be silent?
- Should mood check-in be skippable (go straight to Write)?
- What does the Write screen show for first-time users with no entries?
- Widget design for home screen one-tap mood logging?

> **Note:** Screens, flow, and features may be added, removed, or completely
> redesigned. This list reflects current thinking, not a locked plan.

---

## Task Tracker

Update this section as work progresses. When switching away from this project,
leave clear notes on what's in progress so Claude Code can resume cleanly.

### M1 — Scaffolding ✅ (committed: 4dd4ca0)
- [x] Expo project initialized
- [x] Design tokens created (tokens.ts)
- [x] Fonts installed (Cormorant Garamond, DM Sans)
- [x] Font loading in App.tsx with expo-font
- [x] Navigation skeleton: Stillhet → Mood → Write (3 screens, native stack)
- [x] Global theme provider (dark theme as default)
- [x] Placeholder Stillhet screen
- [x] Placeholder Mood screen
- [x] Placeholder Write screen

### M2 — Core Screens ✅ (committed: 4dd4ca0)
- [x] Stillhet: 4-7-8 breathing animation (expanding/contracting circle)
- [x] Mood: full-screen weather scenes with immersive gradients (horizontal pager)
- [x] Write: keyboard handling, safe areas, word count
- [x] Pass mood selection through navigation to Write screen

### M3 — Data Layer + Persistence ✅ (committed: 4dd4ca0)
- [x] SQLite database init (expo-sqlite SQLiteProvider)
- [x] Journal entries table schema + migration
- [x] Entry CRUD operations (create, read, update, getAll, getToday)
- [x] Auto-save on Write screen (debounced 1s via useAutoSave hook)
- [x] Load today's entry if one exists (resume writing)
- [x] Database provider in App.tsx (innerleaf.db)

### Future Milestones (scope may change)
- **M4**: Shopify integration bridge (connect to physical journal products)
  - NOTE: Veer paused before starting M4. Needs scoping — physical journals
    may not exist yet. Ask before starting: redefine M4, skip to M5/M6,
    or switch to innerleaf-web WIP?
- **M5**: Premium features + monetization
- **M6**: Polish, widget, launch prep

### Blocked
(nothing currently)

### Notes for next session
- expo-sqlite does NOT work on web platform (WASM bundling issue). Test
  on iOS/Android only: `npx expo start --android` or `--ios`
- M4 (Shopify integration) is PAUSED — ask before starting
- Next logical work: either redefine M4, or switch to innerleaf-web WIP

### Done
- **M1**: Scaffolding — Expo init, tokens, fonts, navigation skeleton, theme provider, placeholder screens
- **M2**: Core screens — Stillhet breathing animation, immersive mood weather pager, Write with keyboard/safe areas
- **M3**: Data layer — SQLite via expo-sqlite, entries table, auto-save, resume today's entry

---

## Session Management

**READ this section at the start of every session. FOLLOW it at the end.**

### On session start
1. Read the Task Tracker above — that's where the last session left off
2. Check Direction for any changes Veer may have made manually
3. Ask: "Last session left off at [X]. Want to continue there or work on something else?"

### On session end (IMPORTANT)
When you detect the session is wrapping up — Veer says things like "that's good
for now", "I'm switching to web", "let's stop here", "save progress", or
commits and seems done — **proactively ask:**

> "Want me to update CLAUDE.md before you go? I'll save what's done,
> what's in progress, and anything that changed direction."

Then update:
- Task Tracker: check off completed items, add notes on in-progress work
- Direction: remove scrapped features, add new ones Veer mentioned
- Move milestone markers forward if a milestone is complete
- If anything moved from Direction to Decided (or vice versa), update that too

**Never let a session end without offering to save state.**
