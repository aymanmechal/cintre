import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { Availability } from '../constants/wardrobe';
import {
  areAllFavorites,
  formatSelectionCount,
  selectItemsByIds,
  toggleId,
  withAvailability,
  withFavorite,
  withTags,
} from './bulkEdit';

const ONE = makeWardrobeItem({ id: 1, tags: ['soiree'], isFavorite: true });
const TWO = makeWardrobeItem({ id: 2 });

describe('bulkEdit', () => {
  it('change la disponibilité sans toucher au reste', () => {
    const item = withAvailability(ONE, Availability.Dirty);
    expect(item.availability).toBe(Availability.Dirty);
    expect(item.piece).toEqual(ONE.piece);
  });

  it('met ou retire un favori', () => {
    expect(withFavorite(TWO, true).piece.isFavorite).toBe(true);
    expect(withFavorite(ONE, false).piece.isFavorite).toBe(false);
  });

  it('ajoute des tags sans doublon ni perte', () => {
    expect(withTags(ONE, 'Soirée, vacances, #été').piece.tags).toEqual([
      'soiree',
      'vacances',
      'ete',
    ]);
    expect(withTags(ONE, '  ,  ').piece.tags).toEqual(['soiree']);
  });

  it('sait si toute la sélection est en favoris', () => {
    expect(areAllFavorites([ONE])).toBe(true);
    expect(areAllFavorites([ONE, TWO])).toBe(false);
    expect(areAllFavorites([])).toBe(false);
  });

  it('retrouve les pièces sélectionnées', () => {
    expect(selectItemsByIds([ONE, TWO], [2, 9])).toEqual([TWO]);
  });

  it('coche et décoche un identifiant', () => {
    expect(toggleId([1], 2)).toEqual([1, 2]);
    expect(toggleId([1, 2], 1)).toEqual([2]);
  });

  it('écrit le nombre de pièces sélectionnées', () => {
    expect(formatSelectionCount(0)).toBe('Aucune pièce sélectionnée');
    expect(formatSelectionCount(1)).toBe('1 pièce sélectionnée');
    expect(formatSelectionCount(3)).toBe('3 pièces sélectionnées');
  });
});
