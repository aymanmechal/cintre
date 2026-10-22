import { describe, expect, it } from 'vitest';
import { readJsonFromStorage, writeJsonToStorage } from './storage';

describe('storage', () => {
  it('relit ce qui a été écrit', () => {
    writeJsonToStorage('cle', { a: 1, liste: [1, 2] });
    expect(readJsonFromStorage('cle')).toEqual({ a: 1, liste: [1, 2] });
  });

  it("renvoie null quand la clé n'existe pas", () => {
    expect(readJsonFromStorage('absente')).toBeNull();
  });

  it("renvoie null quand le contenu n'est pas du JSON valide", () => {
    localStorage.setItem('casse', '{pas du json');
    expect(readJsonFromStorage('casse')).toBeNull();
  });
});
