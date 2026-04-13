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

### M4 — Årringer (Tree Rings) ✅ (committed: 391e5a8)
- [x] Install react-native-svg
- [x] ArringerScreen: concentric SVG rings, one per journal entry
- [x] Mood-based organic ring variation (width/color by weather)
- [x] Empty state: seed/pith with gentle message
- [x] Navigation route added to AppNavigator
- [x] Accessible from WriteScreen footer link

### M5 — Årringer Visual Upgrade (Skia + Reanimated)
- [ ] Install @shopify/react-native-skia and configure Expo config plugin
- [ ] Switch from Expo Go to development build (required by Skia)
- [ ] Rewrite ArringerScreen ring rendering from react-native-svg to Skia Canvas
- [ ] Add Perlin noise (FractalNoise) texture overlay on rings for organic wood-grain look
- [ ] Mood-based ring colors with SweepGradient/RadialGradient (richer than flat stroke colors)
- [ ] Soft glow effect on newest ring using Skia Shadow/Blur
- [ ] Animated ring growth on screen entry (Reanimated withTiming/withSpring on radius)
- [ ] Fade-in stagger for rings (oldest to newest)
- [ ] Heartwood center with radial gradient and subtle Perlin noise texture
- [ ] Pinch-to-zoom interaction (react-native-gesture-handler + Skia)
- [ ] Tap ring to show entry date/mood tooltip

### Future Milestones (scope may change)
- **M6**: Shopify integration bridge (connect to physical journal products)
  - NOTE: Physical journals may not exist yet. Ask before starting.
- **M7**: Premium features + monetization
- **M8**: Polish, widget, launch prep

### Blocked
(nothing currently)

### Notes for next session
- expo-sqlite does NOT work on web platform (WASM bundling issue). Test
  on iOS/Android only: `npx expo start --android` or `--ios`
- Use `--tunnel` flag for phone testing via Expo Go (`npx expo start --tunnel --no-web`)
- M4 (Årringer) complete — tree ring visualization built with react-native-svg
- Stillhet breathing loop fixed (6ae5c63) — was stuck on "hold", now uses useState
- WriteScreen has back + done buttons (6ae5c63)
- Årringer has "preview with demo data" button — seeds 60 entries for testing
- seedDemoEntries() in entries.ts is dev-only — remove before launch
- clearAllEntries() added to entries.ts — dev-only, wipes all entries
- Dev buttons ("+ add demo data" / "clear all") visible on Årringer when __DEV__ and entries > 0
- App WAS picking up changes via tunnel — the "old UI" was actually correct for 1 entry in DB
- Debug console.log in ArringerScreen confirms MAX_RADIUS value on load
- Shopify integration pushed to M6 — physical journals may not exist yet
- Folder was renamed from exitme-mobile/ → innerleaf-mobile/ on 2026-04-04
- Guardian workflow added (.github/workflows/guardian.yml) on 2026-04-04
- Branch is m1-m3-core-app, pushed to origin
- **M5 requires switching to development builds — no more Expo Go** (Skia uses native modules)
- Skia v2.6+ required for Expo SDK 53+
- react-native-reanimated >= 3.19.1 is a peer dependency of Skia
- The current SVG implementation in ArringerScreen.tsx is the baseline to replace
- Next logical work: M5 (Skia visual upgrade for Årringer)

### Done
- **M1**: Scaffolding — Expo init, tokens, fonts, navigation skeleton, theme provider, placeholder screens
- **M2**: Core screens — Stillhet breathing animation, immersive mood weather pager, Write with keyboard/safe areas
- **M3**: Data layer — SQLite via expo-sqlite, entries table, auto-save, resume today's entry
- **M4**: Årringer — Tree ring visualization, mood-based organic rings, react-native-svg

---

## Session Management

**These rules are non-negotiable. Follow them exactly.**

### On session start

1. Read the CLAUDE.md for ALL THREE repos (innerleaf-web, innerleaf-mobile, innerleaf-hub)
2. Print a cross-system status — one line per repo, like:
   ```
   innerleaf-web:    WIP theme variable migration (5 components), Phase 6 done
   innerleaf-mobile: M1-M3 complete, M4 paused — needs scoping
   innerleaf-hub:    Dashboard live, Scout daily schedule active
   ```
3. Then ask what to work on

### On session end (MANDATORY — do NOT ask, just do it)

When the session is wrapping up — Veer says "that's good for now", "let's stop",
"save progress", "I'm done", commits and seems done, or simply stops responding
with new tasks — **immediately update ALL relevant CLAUDE.md files. Do not ask.**

Update:
- Task Tracker: check off completed items, add notes on in-progress work
- Direction: remove scrapped features, add new ones Veer mentioned
- Notes for next session: anything the next Claude instance needs to know
- Move milestone markers forward if a milestone is complete
- If anything moved from Direction to Decided (or vice versa), update that too
- Commit the CLAUDE.md changes and push

**This is automatic. Never ask "want me to update?" — just do it.**
