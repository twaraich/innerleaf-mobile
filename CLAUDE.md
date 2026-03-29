# exitme-mobile — Spoke 1b: Inner Leaf Companion App

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
Same tokens as exitme-web:
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

### Current screen flow (subject to change)
1. **Arrive**: Warm landing. Time-aware greeting. Minimal.
2. **Mood Check-in**: Weather metaphors (sunny, cloudy, rainy, stormy, foggy).
   Single tap selection. No scales, no numbers shown to user.
3. **Still**: Breathing animation (4-7-8 pattern). Currently planned to
   auto-launch on app open, skippable with single tap. (Open question:
   should this be automatic or optional?)
4. **Write**: Distraction-free journaling. Minimal chrome. Auto-save.

### Current monetization thinking (v2, not v1)
- Freemium with QR codes in physical journals → unlock premium
- Premium: ~$4.99/month or $39/year
- Premium features: AI prompts, extended history, pattern insights

### Open design questions
- Should "Still" breathing screen auto-launch or be optional?
- What does the home/landing experience look like?
- Should there be any data visualization (mood patterns over time)?
- Widget design for home screen one-tap mood logging?

> **Note:** Screens, flow, and features may be added, removed, or completely
> redesigned. This list reflects current thinking, not a locked plan.

---

## Task Tracker

Update this section as work progresses. When switching away from this project,
leave clear notes on what's in progress so Claude Code can resume cleanly.

### Current Milestone: M1 — Scaffolding
- [x] Expo project initialized
- [x] Design tokens created (tokens.ts)
- [x] Fonts installed (Cormorant Garamond, DM Sans)
- [ ] Font loading in App.tsx with expo-font
- [ ] Navigation skeleton (placeholder screens, native stack)
- [ ] Global theme provider (dark theme as default)
- [ ] Basic Arrive screen — placeholder with time-aware greeting

### Future Milestones (scope may change)
- **M2**: Core screens — build whatever screens are defined in Direction
- **M3**: Data layer + persistence (SQLite)
- **M4**: Shopify integration bridge (connect to physical journal products)
- **M5**: Premium features + monetization
- **M6**: Polish, widget, launch prep

### Blocked
(nothing currently)

### Done
(nothing yet — project just scaffolded)

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
