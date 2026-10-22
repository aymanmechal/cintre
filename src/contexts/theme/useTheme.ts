import { useContext } from 'react';
import { ThemeContext, type ThemeValue } from './ThemeContext';

export function useTheme(): ThemeValue {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error('useTheme doit être utilisé dans <ThemeProvider>.');
  }

  return context;
}
