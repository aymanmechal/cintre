import { describe, expect, it } from 'vitest';
import { parseSuitcase, togglePackedPiece } from './suitcaseStorage';

const SUITCASE = {
  trip: {
    place: { name: 'Lyon', latitude: 45.76, longitude: 4.84 },
    startDate: '2026-03-10',
    dayCount: 3,
  },
  packedPieceIds: [1],
};

describe('suitcaseStorage', () => {
  it('relit une valise enregistrée', () => {
    expect(parseSuitcase(SUITCASE)).toEqual(SUITCASE);
  });

  it('ignore une valise abîmée', () => {
    expect(parseSuitcase(null)).toBeNull();
    expect(parseSuitcase({ ...SUITCASE, trip: { ...SUITCASE.trip, dayCount: 40 } })).toBeNull();
    expect(parseSuitcase({ ...SUITCASE, packedPieceIds: 'x' })?.packedPieceIds).toEqual([]);
  });

  it('coche puis décoche une pièce', () => {
    const packed = togglePackedPiece(SUITCASE, 2);
    expect(packed.packedPieceIds).toEqual([1, 2]);
    expect(togglePackedPiece(packed, 1).packedPieceIds).toEqual([2]);
  });
});
