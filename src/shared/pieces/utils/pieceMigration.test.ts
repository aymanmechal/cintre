import { describe, expect, it } from 'vitest';
import { PieceType } from '../constants/categories';
import { PieceColor } from '../constants/colors';
import { Season } from '../constants/seasons';
import { toPiece } from './pieceMigration';

const OLD_PIECE = {
  id: 3,
  title: 'Pull',
  brand: 'Uniqlo',
  pieceType: PieceType.Tops,
  price: 30,
  rating: 4.5,
  stock: 12,
  thumbnail: 'https://images.test/pull.png',
};

describe('toPiece', () => {
  it('retire la note et le stock des anciennes pièces', () => {
    const piece = toPiece(OLD_PIECE);
    expect(piece).not.toHaveProperty('rating');
    expect(piece).not.toHaveProperty('stock');
  });

  it('donne des valeurs vides aux nouveaux champs', () => {
    expect(toPiece(OLD_PIECE)).toMatchObject({
      title: 'Pull',
      photoId: null,
      extraPhotoIds: [],
      color: null,
      season: null,
      size: '',
      material: '',
      boughtOn: null,
      productUrl: '',
      isFavorite: false,
      tags: [],
    });
  });

  it('garde les nouveaux champs valides', () => {
    const piece = toPiece({
      ...OLD_PIECE,
      color: PieceColor.Blue,
      season: Season.Winter,
      size: 'M',
    });
    expect(piece).toMatchObject({ color: PieceColor.Blue, season: Season.Winter, size: 'M' });
  });

  it('garde les favoris et les tags', () => {
    const piece = toPiece({ ...OLD_PIECE, isFavorite: true, tags: ['soirée', 3] });
    expect(piece).toMatchObject({ isFavorite: true, tags: ['soirée'] });
  });

  it('garde au plus trois photos supplémentaires valides', () => {
    const piece = toPiece({ ...OLD_PIECE, extraPhotoIds: ['a', 4, 'b', 'c', 'd'] });
    expect(piece.extraPhotoIds).toEqual(['a', 'b', 'c']);
  });

  it('ignore une couleur ou une saison inconnue', () => {
    const piece = toPiece({ ...OLD_PIECE, color: 'fluo', season: 'automne' });
    expect(piece).toMatchObject({ color: null, season: null });
  });
});
