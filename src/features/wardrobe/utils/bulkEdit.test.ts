import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { Availability, OwnershipStatus } from '../constants/wardrobe';
import type { WardrobeItem } from '../types/wardrobe';
import {
  areAllFavorites,
  formatSelectionCount,
  selectItemsByIds,
  toggleId,
  withAvailability,
  withFavorite,
  withStatus,
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

  it('applique un statut sans toucher au reste', () => {
    const wanted = makeWardrobeItem({ id: 5 }, { status: OwnershipStatus.Wanted });
    const item = withStatus(wanted, OwnershipStatus.Owned);
    expect(item.status).toBe(OwnershipStatus.Owned);
    expect(item.piece).toEqual(wanted.piece);
    expect(item.availability).toBe(wanted.availability);
    expect(item.location).toBe(wanted.location);
    expect(wanted.status).toBe(OwnershipStatus.Wanted);
  });

  it('applique un statut à toute une sélection', () => {
    const wishes = [1, 2, 3].map((id) =>
      makeWardrobeItem({ id }, { status: OwnershipStatus.Wanted }),
    );
    const updated = wishes.map((item) => withStatus(item, OwnershipStatus.Owned));
    expect(updated.map((item) => item.status)).toEqual([
      OwnershipStatus.Owned,
      OwnershipStatus.Owned,
      OwnershipStatus.Owned,
    ]);
    expect(updated.map((item) => item.piece.id)).toEqual([1, 2, 3]);
  });

  it('ne change rien pour une sélection vide', () => {
    const selection: WardrobeItem[] = [];
    expect(selection.map((item) => withStatus(item, OwnershipStatus.Owned))).toEqual([]);
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
