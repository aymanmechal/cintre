import { describe, expect, it } from 'vitest';
import { parsePieceId, parseWardrobePieceId, parseWardrobePieceIds } from './pieceId';

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

describe('parseWardrobePieceIds', () => {
  it('lit une ou plusieurs pièces séparées par des virgules', () => {
    expect(parseWardrobePieceIds('7')).toEqual([7]);
    expect(parseWardrobePieceIds('1,-5,3')).toEqual([1, -5, 3]);
  });

  it('retire les doublons', () => {
    expect(parseWardrobePieceIds('2,2,3')).toEqual([2, 3]);
  });

  it.each(['', '1,abc', '0,2', ','])('refuse %j', (rawIds) => {
    expect(parseWardrobePieceIds(rawIds)).toEqual([]);
  });

  it('refuse une valeur absente', () => {
    expect(parseWardrobePieceIds(undefined)).toEqual([]);
  });
});
