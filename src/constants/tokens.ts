export const colors = {
  dark: '#011f20',
  sage: '#5b7a74',
  cream: '#F5F1E8',
  gold: '#C9A227',
  ink: '#1A1A1A',
  white: '#FFFFFF',
  // Semantic aliases
  background: '#F5F1E8',
  backgroundDark: '#011f20',
  textPrimary: '#1A1A1A',
  textSecondary: '#5b7a74',
  textOnDark: '#F5F1E8',
  accent: '#5b7a74',
  highlight: '#C9A227',
} as const;

export const fonts = {
  heading: 'CormorantGaramond_400Regular',
  headingMedium: 'CormorantGaramond_500Medium',
  headingSemiBold: 'CormorantGaramond_600SemiBold',
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodySemiBold: 'DMSans_600SemiBold',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const mood = {
  sunny: {label: 'Sunny', emoji: '☀️', value: 5},
  cloudy: {label: 'Cloudy', emoji: '☁️', value: 3},
  rainy: {label: 'Rainy', emoji: '🌧️', value: 2},
  stormy: {label: 'Stormy', emoji: '⛈️', value: 1},
  foggy: {label: 'Foggy', emoji: '🌫️', value: 4},
} as const;

export type MoodType = keyof typeof mood;
