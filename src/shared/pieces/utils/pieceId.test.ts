import { describe, expect, it } from 'vitest';
import { parsePieceId, parseWardrobePieceId } from './pieceId';

describe('parsePieceId', () => {
  it('accepte un entier positif', () => {
    expect(parsePieceId('12')).toBe(12);
  });

  it.each(['0', '-3', 'abc', '1.5', ''])('refuse %j', (rawId) => {
    expect(parsePieceId(rawId)).toBeNull();
  });

  it('refuse une valeur absente', () => {
    expect(parsePieceId(undefined)).toBeNull();
  });
});

describe('parseWardrobePieceId', () => {
  it('accepte aussi les identifiants négatifs des pièces perso', () => {
    expect(parseWardrobePieceId('-1700000')).toBe(-1700000);
  });

  it.each(['0', 'abc', '2.5'])('refuse %j', (rawId) => {
    expect(parseWardrobePieceId(rawId)).toBeNull();
  });
});
