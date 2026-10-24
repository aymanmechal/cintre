import { describe, expect, it } from 'vitest';
import { ALL_PIECE_TYPES, PieceType } from '../constants/categories';
import { toPieceType, toPieceTypeFilter } from './categories';

describe('conversion de valeurs de select', () => {
  it('toPieceType reconnaît une valeur valide', () => {
    expect(toPieceType('chaussures')).toBe(PieceType.Shoes);
  });

  it('toPieceType retombe sur le type par défaut', () => {
    expect(toPieceType('inconnu')).toBe(PieceType.Tops);
  });

  it('toPieceTypeFilter retombe sur « tous »', () => {
    expect(toPieceTypeFilter('inconnu')).toBe(ALL_PIECE_TYPES);
  });
});
