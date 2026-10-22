export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export const THEMES = Object.values(Theme);

export const THEME_STORAGE_KEY = 'cintre.theme';

export const DARK_COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export const THEME_SWITCH_LABELS: Record<Theme, string> = {
  [Theme.Light]: 'Passer en mode sombre',
  [Theme.Dark]: 'Passer en mode clair',
};

export const THEME_SWITCH_ICONS: Record<Theme, string> = {
  [Theme.Light]: '☾',
  [Theme.Dark]: '☀',
};
