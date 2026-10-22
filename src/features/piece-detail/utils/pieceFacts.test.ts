import { describe, expect, it } from 'vitest';
import { makePiece } from '../../../test/factories';
import type { PieceDetail } from '../../../shared/pieces/types/piece';
import { buildPieceFacts } from './pieceFacts';

function makeDetail(changes: Partial<PieceDetail> = {}): PieceDetail {
  return {
    ...makePiece({ stock: 3 }),
    description: '',
    images: [],
    warrantyInformation: '1 an',
    shippingInformation: '2 jours',
    returnPolicy: '30 jours',
    ...changes,
  };
}

describe('buildPieceFacts', () => {
  it('liste les quatre informations quand elles existent', () => {
    expect(buildPieceFacts(makeDetail()).map((fact) => fact.label)).toEqual([
      'Disponibilité',
      'Livraison',
      'Garantie',
      'Retours',
    ]);
  });

  it('retire les informations vides', () => {
    const facts = buildPieceFacts(makeDetail({ warrantyInformation: '', returnPolicy: '' }));
    expect(facts.map((fact) => fact.label)).toEqual(['Disponibilité', 'Livraison']);
  });

  it('indique la rupture de stock', () => {
    expect(buildPieceFacts(makeDetail({ stock: 0 }))[0].value).toBe('Rupture de stock');
  });
});
