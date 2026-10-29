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
      secondaryColor: null,
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

  it('transforme « multicolore » en aucune couleur, sans erreur', () => {
    expect(() => toPiece({ ...OLD_PIECE, color: 'multicolore' })).not.toThrow();
    expect(toPiece({ ...OLD_PIECE, color: 'multicolore' }).color).toBeNull();
    expect(toPiece({ ...OLD_PIECE, secondaryColor: 'multicolore' }).secondaryColor).toBeNull();
  });

  it('transforme toute couleur inconnue ou illisible en aucune couleur', () => {
    for (const color of ['fluo', 'Noir', 42, {}, [], true, '']) {
      expect(toPiece({ ...OLD_PIECE, color, secondaryColor: color })).toMatchObject({
        color: null,
        secondaryColor: null,
      });
    }
  });

  it('garde les anciennes couleurs avec leur valeur de stockage', () => {
    const stored = [
      'noir',
      'blanc',
      'gris',
      'beige',
      'marron',
      'bleu',
      'vert',
      'rouge',
      'rose',
      'jaune',
      'violet',
    ];
    for (const color of stored) {
      expect(toPiece({ ...OLD_PIECE, color }).color).toBe(color);
    }
  });

  it('lit une couleur secondaire valide', () => {
    const piece = toPiece({ ...OLD_PIECE, color: 'bleu', secondaryColor: 'bleu-marine' });
    expect(piece).toMatchObject({ color: PieceColor.Blue, secondaryColor: PieceColor.Navy });
  });

  it('ne garde pas de doublon entre couleur principale et secondaire', () => {
    const piece = toPiece({ ...OLD_PIECE, color: 'bleu', secondaryColor: 'bleu' });
    expect(piece).toMatchObject({ color: PieceColor.Blue, secondaryColor: null });
  });

  it('promeut une couleur secondaire sans principale en principale', () => {
    const piece = toPiece({ ...OLD_PIECE, secondaryColor: 'beige' });
    expect(piece).toMatchObject({ color: PieceColor.Beige, secondaryColor: null });
  });

  it('ignore un champ location stocké sur la pièce', () => {
    expect(toPiece({ ...OLD_PIECE, location: 'tiroir' })).not.toHaveProperty('location');
  });

  it('ignore une couleur ou une saison inconnue', () => {
    const piece = toPiece({ ...OLD_PIECE, color: 'fluo', season: 'automne' });
    expect(piece).toMatchObject({ color: null, season: null });
  });
});
