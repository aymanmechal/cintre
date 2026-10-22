import { afterEach, describe, expect, it, vi } from 'vitest';
import { Theme } from '../constants/theme';
import { applyThemeToDocument, getOppositeTheme, loadStoredTheme, saveTheme } from './theme';

const KEY = 'test.theme';

function mockSystemPrefersDark(prefersDark: boolean) {
  vi.stubGlobal('matchMedia', () => ({ matches: prefersDark }));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('loadStoredTheme', () => {
  it('reprend le thème sauvegardé', () => {
    mockSystemPrefersDark(false);
    saveTheme(KEY, Theme.Dark);
    expect(loadStoredTheme(KEY)).toBe(Theme.Dark);
  });

  it("suit le système quand rien n'est sauvegardé", () => {
    mockSystemPrefersDark(true);
    expect(loadStoredTheme(KEY)).toBe(Theme.Dark);
    mockSystemPrefersDark(false);
    expect(loadStoredTheme(KEY)).toBe(Theme.Light);
  });

  it('ignore une valeur sauvegardée invalide', () => {
    mockSystemPrefersDark(false);
    localStorage.setItem(KEY, JSON.stringify('violet'));
    expect(loadStoredTheme(KEY)).toBe(Theme.Light);
  });
});

describe('autres fonctions', () => {
  it('inverse le thème', () => {
    expect(getOppositeTheme(Theme.Light)).toBe(Theme.Dark);
    expect(getOppositeTheme(Theme.Dark)).toBe(Theme.Light);
  });

  it('applique le thème sur le document', () => {
    applyThemeToDocument(Theme.Dark);
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
