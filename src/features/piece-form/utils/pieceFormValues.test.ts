import { describe, expect, it } from 'vitest';
import { makePiece, makeWardrobeItem } from '../../../test/factories';
import { makeFormValues } from '../../../test/pieceFormValues';
import { OwnershipStatus, StorageLocation } from '../../wardrobe/constants/wardrobe';
import {
  applyPieceFormValues,
  buildWardrobeItem,
  toPieceFields,
  toPieceFormValues,
} from './pieceFormValues';

describe('toPieceFields', () => {
  it('nettoie les espaces et convertit le prix en nombre', () => {
    const fields = toPieceFields(makeFormValues({ title: '  Veste  ', price: '12.5' }));
    expect(fields).toMatchObject({ title: 'Veste', price: 12.5 });
  });

  it('met la marque à null quand elle est vide', () => {
    expect(toPieceFields(makeFormValues({ brand: '   ' })).brand).toBeNull();
  });

  it('met le prix à 0 quand il est vide', () => {
    expect(toPieceFields(makeFormValues({ price: '' })).price).toBe(0);
  });
});

describe('applyPieceFormValues', () => {
  it("garde l'id, la note et le stock de la pièce", () => {
    const piece = makePiece({ id: 12, rating: 4.2, stock: 9 });
    const edited = applyPieceFormValues(piece, makeFormValues({ title: 'Autre nom' }));
    expect(edited).toMatchObject({ id: 12, rating: 4.2, stock: 9, title: 'Autre nom' });
  });
});

describe('buildWardrobeItem', () => {
  it('reprend le statut et le rangement du formulaire', () => {
    const values = makeFormValues({
      status: OwnershipStatus.Wanted,
      location: StorageLocation.Drawer,
    });
    expect(buildWardrobeItem(makePiece(), values)).toMatchObject({
      status: OwnershipStatus.Wanted,
      location: StorageLocation.Drawer,
      lastWornOn: null,
    });
  });

  it('conserve la date de dernier port quand on modifie une pièce', () => {
    const item = buildWardrobeItem(makePiece(), makeFormValues(), '2025-03-01');
    expect(item.lastWornOn).toBe('2025-03-01');
  });
});

describe('toPieceFormValues', () => {
  it("remplit le formulaire à partir d'une pièce de la garde-robe", () => {
    const item = makeWardrobeItem({ title: 'Chemise', brand: null, price: 45 });
    expect(toPieceFormValues(item)).toMatchObject({ title: 'Chemise', brand: '', price: '45' });
  });
});
