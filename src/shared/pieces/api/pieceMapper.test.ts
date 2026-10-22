import { describe, expect, it } from 'vitest';
import { PieceType } from '../constants/categories';
import { makePiece } from '../../../test/factories';
import type { ApiProduct } from './dummyJsonTypes';
import { mapApiProductToPiece, mapApiProductToPieceDetail, mergeSavedProduct } from './pieceMapper';

const PRODUCT: ApiProduct = {
  id: 7,
  title: 'Rolex',
  category: 'mens-watches',
  price: 900,
  rating: 4.8,
  stock: 2,
  thumbnail: 'https://images.test/rolex.png',
};

describe('mapApiProductToPiece', () => {
  it('copie les champs et met null quand la marque manque', () => {
    expect(mapApiProductToPiece(PRODUCT, PieceType.Watches)).toEqual({
      id: 7,
      title: 'Rolex',
      brand: null,
      pieceType: PieceType.Watches,
      price: 900,
      rating: 4.8,
      stock: 2,
      thumbnail: 'https://images.test/rolex.png',
    });
  });
});

describe('mapApiProductToPieceDetail', () => {
  it('remplit des valeurs par défaut pour les champs absents', () => {
    const detail = mapApiProductToPieceDetail(PRODUCT, PieceType.Watches);
    expect(detail.description).toBe('');
    expect(detail.images).toEqual(['https://images.test/rolex.png']);
    expect(detail.returnPolicy).toBe('');
  });
});

describe('mergeSavedProduct', () => {
  it("garde la pièce quand la réponse de l'API est vide", () => {
    const piece = makePiece();
    expect(mergeSavedProduct(piece, { id: 195 })).toEqual(piece);
  });

  it("prend les valeurs renvoyées par l'API quand elles existent", () => {
    const merged = mergeSavedProduct(makePiece(), { id: 195, title: 'Nouveau', price: 5 });
    expect(merged.title).toBe('Nouveau');
    expect(merged.price).toBe(5);
  });
});
