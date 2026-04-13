import {createContext, useContext, useState, type ReactNode} from 'react';
import {colors} from '../constants/tokens';

type ThemeMode = 'dark' | 'light';

interface Theme {
  mode: ThemeMode;
  colors: {
    background: string;
    text: string;
    textSecondary: string;
    accent: string;
    highlight: string;
  };
  toggle: () => void;
}

const darkTheme = {
  background: colors.dark,
  text: colors.cream,
  textSecondary: colors.sage,
  accent: colors.sage,
  highlight: colors.gold,
};

const lightTheme = {
  background: colors.cream,
  text: colors.ink,
  textSecondary: colors.sage,
  accent: colors.sage,
  highlight: colors.gold,
};

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({children}: {children: ReactNode}) {
  const [mode, setMode] = useState<ThemeMode>('dark');

  const theme: Theme = {
    mode,
    colors: mode === 'dark' ? darkTheme : lightTheme,
    toggle: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useTheme must be used within ThemeProvider');
  return theme;
}
