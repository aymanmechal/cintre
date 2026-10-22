import { describe, expect, it } from 'vitest';
import { makePiece, makeWardrobeItem } from '../../../test/factories';
import { OwnershipStatus, StorageLocation } from '../constants/wardrobe';
import {
  countItemsByStatus,
  findWardrobeItem,
  selectItemsByStatus,
  toOwnershipStatus,
  toPieceSnapshot,
  toStorageLocation,
} from './wardrobe';

const OWNED = makeWardrobeItem({ id: 1 });
const WANTED = makeWardrobeItem({ id: 2 }, { status: OwnershipStatus.Wanted });
const ITEMS = [OWNED, WANTED];

describe('wardrobe utils', () => {
  it('retrouve une pièce par son id', () => {
    expect(findWardrobeItem(ITEMS, 2)).toBe(WANTED);
    expect(findWardrobeItem(ITEMS, 99)).toBeUndefined();
  });

  it('compte et sélectionne par statut', () => {
    expect(countItemsByStatus(ITEMS, OwnershipStatus.Owned)).toBe(1);
    expect(selectItemsByStatus(ITEMS, OwnershipStatus.Wanted)).toEqual([WANTED]);
  });

  it('convertit les valeurs de select avec une valeur de secours', () => {
    expect(toOwnershipStatus('wanted')).toBe(OwnershipStatus.Wanted);
    expect(toOwnershipStatus('?')).toBe(OwnershipStatus.Owned);
    expect(toStorageLocation('tiroir')).toBe(StorageLocation.Drawer);
    expect(toStorageLocation('?')).toBe(StorageLocation.Wardrobe);
  });

  it('ne garde que les champs utiles dans la copie de la pièce', () => {
    const detailed = { ...makePiece(), description: 'longue description' };
    expect(toPieceSnapshot(detailed)).not.toHaveProperty('description');
    expect(toPieceSnapshot(detailed)).toEqual(makePiece());
  });
});
