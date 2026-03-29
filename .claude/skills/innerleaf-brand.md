# Inner Leaf Brand Rules — Claude Code Skill

## When to Apply
Apply these rules whenever generating UI code, components, styles, or
copy for any Inner Leaf project (exitme-web or exitme-mobile).

## Visual Rules
- ALWAYS use CSS custom properties for colors, never hardcoded hex values
- ALWAYS use Cormorant Garamond for headings, DM Sans for body text
- NEVER use generic fonts (Inter, Roboto, Arial, system fonts) as primary
- Dark theme default: #011f20 background, #F5F1E8 text
- Light theme: #F5F1E8 background, #1A1A1A text
- Gold (#C9A227) for accents and separators ONLY — never as primary color
- Sage (#5b7a74) for interactive elements and secondary accents

## Animation Rules
- Animations must feel organic and calm, never attention-grabbing
- Preferred: slow fades (800ms+), gentle slides, breathing rhythms
- Avoid: bouncing, shaking, rapid transitions, particle effects
- GSAP for web, React Native Animated/Reanimated for mobile
- Every animation must have a purpose — decorative motion is noise

## UX Rules
- Design for the disengaged user — assume low energy state
- Maximum 1 action per screen for critical flows
- No streak mechanics, no guilt-based engagement patterns
- Missing data = meaningful signal, never a failure state
- Brand language: "notice" not "track", "patterns" not "data"

## Copy Rules
- Tone: warm, quiet, unhurried
- Never use exclamation marks in UI copy
- Prefer sentence case over title case
- Keep microcopy under 8 words where possible
- Scandinavian sensibility: understated, honest, no hype
