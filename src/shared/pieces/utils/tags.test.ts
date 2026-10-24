import { describe, expect, it } from 'vitest';
import { formatTags, parseTags } from './tags';

describe('tags', () => {
  it('découpe, nettoie et supprime les doublons', () => {
    expect(parseTags(' Soirée, #vacances ,soiree,, ')).toEqual(['soiree', 'vacances']);
  });

  it('renvoie une liste vide pour un texte vide', () => {
    expect(parseTags('  ')).toEqual([]);
  });

  it('remet les tags dans un champ texte', () => {
    expect(formatTags(['soiree', 'vacances'])).toBe('soiree, vacances');
  });
});
