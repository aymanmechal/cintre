import { describe, expect, it, vi } from 'vitest';
import { SaveStatus } from '../save/constants/save';
import { getSaveStatus } from '../save/utils/saveStatusStore';
import { readJsonFromStorage, writeJsonToStorage } from './storage';

describe('storage', () => {
  it('relit ce qui a été écrit', () => {
    writeJsonToStorage('cle', { a: 1, liste: [1, 2] });
    expect(readJsonFromStorage('cle')).toEqual({ a: 1, liste: [1, 2] });
  });

  it("signale quand l'écriture réussit puis quand elle échoue", () => {
    writeJsonToStorage('cle', 1);
    expect(getSaveStatus()).toBe(SaveStatus.Saved);

    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('plein', 'QuotaExceededError');
    });
    writeJsonToStorage('cle', 2);
    setItem.mockRestore();
    expect(getSaveStatus()).toBe(SaveStatus.Failed);
  });

  it("renvoie null quand la clé n'existe pas", () => {
    expect(readJsonFromStorage('absente')).toBeNull();
  });

  it("renvoie null quand le contenu n'est pas du JSON valide", () => {
    localStorage.setItem('casse', '{pas du json');
    expect(readJsonFromStorage('casse')).toBeNull();
  });
});
