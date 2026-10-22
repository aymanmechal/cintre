import { createContext } from 'react';
import type { Theme } from '../constants/theme';

export interface ThemeValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeValue | null>(null);
