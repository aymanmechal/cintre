import { useCallback, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { THEME_STORAGE_KEY } from '../../constants/theme';
import {
  applyThemeToDocument,
  getOppositeTheme,
  loadStoredTheme,
  saveTheme,
} from '../../utils/theme';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(() => loadStoredTheme(THEME_STORAGE_KEY));

  useLayoutEffect(() => {
    applyThemeToDocument(theme);
    saveTheme(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(getOppositeTheme), []);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
