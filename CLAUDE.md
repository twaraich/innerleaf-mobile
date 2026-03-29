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

## Design System
Same tokens as exitme-web:
- Dark: #011f20 | Sage: #5b7a74 | Cream: #F5F1E8 | Gold: #C9A227
- Headings: Cormorant Garamond | Body: DM Sans
- Philosophy: "Design for the disengaged user"
- Target: feels like a calm ritual, not a productivity app

## App Architecture

### Core Flow
Arrive → Mood Check-in → Still (breathing) → Write

### Screen Details
1. **Arrive**: Warm landing. Time-aware greeting. Minimal.
2. **Mood Check-in**: Weather metaphors (sunny, cloudy, rainy, stormy, foggy).
   Single tap selection. No scales, no numbers shown to user.
3. **Still**: Breathing animation. Auto-launches on app open but skippable
   with a single tap anywhere. 4-7-8 breathing pattern.
4. **Write**: Distraction-free journaling. Minimal chrome. Auto-save.

### Data Model
- Journal entries: { id, mood, text, timestamp, tags? }
- Mood stored as weather enum internally, displayed as metaphor
- Missing days are meaningful signal, not gaps — no streak mechanics
- All data local-first (SQLite), no cloud sync in v1

### Monetization (v2)
- Freemium with QR codes in physical journals → unlock premium
- Premium: ~$4.99/month or $39/year
- Premium features: AI prompts, extended history, pattern insights

## Development Phases
- [ ] M1: Scaffolding, design tokens, navigation skeleton
- [ ] M2: Core screens (Arrive, Mood, Still, Write)
- [ ] M3: Data layer + persistence (SQLite)
- [ ] M4: Shopify integration bridge
- [ ] M5: Premium features + monetization
- [ ] M6: Polish, widget, launch prep

## Commands
- npx expo start — dev server
- npx expo start --ios — iOS simulator
- npx expo start --android — Android emulator
- eas build --platform ios — production build

## Rules
- No streak-based guilt mechanics, ever
- Missing data = signal, not failure
- Animations must be subtle, not attention-grabbing
- Every screen must be usable in a low-energy state
- Brand language: "notice your patterns" not "track your mood"
