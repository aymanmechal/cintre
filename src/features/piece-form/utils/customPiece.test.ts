import { describe, expect, it } from 'vitest';
import { makeFormValues } from '../../../test/pieceFormValues';
import { buildCustomPiece } from './customPiece';

describe('buildCustomPiece', () => {
  it('crée une pièce avec un id négatif', () => {
    const piece = buildCustomPiece(makeFormValues());
    expect(piece.id).toBeLessThan(0);
  });

  it('reprend les champs du formulaire', () => {
    expect(buildCustomPiece(makeFormValues({ title: 'Veste', size: 'M' }))).toMatchObject({
      title: 'Veste',
      size: 'M',
    });
  });
});
