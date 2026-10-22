import { describe, expect, it } from 'vitest';
import { isCatalogPiece } from '../../../shared/pieces/utils/pieceOrigin';
import { makeFormValues } from '../../../test/pieceFormValues';
import { CUSTOM_PIECE_RATING, CUSTOM_PIECE_STOCK } from '../constants/pieceForm';
import { buildCustomPiece } from './customPiece';

describe('buildCustomPiece', () => {
  it('crée une pièce avec un id négatif, donc distincte du catalogue', () => {
    const piece = buildCustomPiece(makeFormValues());
    expect(piece.id).toBeLessThan(0);
    expect(isCatalogPiece(piece.id)).toBe(false);
  });

  it('reprend les champs du formulaire et met la note et le stock par défaut', () => {
    expect(buildCustomPiece(makeFormValues({ title: 'Veste' }))).toMatchObject({
      title: 'Veste',
      rating: CUSTOM_PIECE_RATING,
      stock: CUSTOM_PIECE_STOCK,
    });
  });
});
