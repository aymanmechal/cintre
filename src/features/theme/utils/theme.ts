import { DARK_COLOR_SCHEME_QUERY, Theme, THEMES } from '../constants/theme';
import { readJsonFromStorage, writeJsonToStorage } from '../../../shared/utils/storage';

function isTheme(value: unknown): value is Theme {
  return THEMES.some((theme) => theme === value);
}

function getSystemTheme(): Theme {
  return window.matchMedia(DARK_COLOR_SCHEME_QUERY).matches ? Theme.Dark : Theme.Light;
}

export function loadStoredTheme(storageKey: string): Theme {
  const storedTheme = readJsonFromStorage(storageKey);
  return isTheme(storedTheme) ? storedTheme : getSystemTheme();
}

export function saveTheme(storageKey: string, theme: Theme): void {
  writeJsonToStorage(storageKey, theme);
}

export function applyThemeToDocument(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

export function getOppositeTheme(theme: Theme): Theme {
  return theme === Theme.Light ? Theme.Dark : Theme.Light;
}
