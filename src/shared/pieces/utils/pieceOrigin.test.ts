import { describe, expect, it } from 'vitest';
import { isCatalogPiece } from './pieceOrigin';

describe('isCatalogPiece', () => {
  it('reconnaît une pièce du catalogue (id positif)', () => {
    expect(isCatalogPiece(42)).toBe(true);
  });

  it('reconnaît une pièce perso (id négatif)', () => {
    expect(isCatalogPiece(-1700000)).toBe(false);
  });
});
