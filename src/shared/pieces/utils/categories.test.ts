import { describe, expect, it } from 'vitest';
import { ALL_PIECE_TYPES, PieceType } from '../constants/categories';
import { classifyPieceType, toPieceType, toPieceTypeFilter } from './categories';

describe('classifyPieceType', () => {
  it('utilise la catégorie DummyJSON par défaut', () => {
    expect(classifyPieceType('Blue Check Shirt', 'mens-shirts')).toBe(PieceType.Shirts);
  });

  it("range un tshirt dans les hauts même s'il est dans la catégorie chemises", () => {
    expect(classifyPieceType('Gigabyte Aorus Men Tshirt', 'mens-shirts')).toBe(PieceType.Tops);
  });

  it('range une robe dans les robes même dans la catégorie tops', () => {
    expect(classifyPieceType('Summer Dress', 'tops')).toBe(PieceType.Dresses);
  });

  it('ignore les produits qui ne sont pas des vêtements', () => {
    expect(classifyPieceType('Gaming Laptop', 'laptops')).toBeUndefined();
  });
});

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
