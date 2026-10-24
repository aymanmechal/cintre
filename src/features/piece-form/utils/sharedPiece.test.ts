import { describe, expect, it } from 'vitest';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import { isSharedPiece, toSharedPieceValues } from './sharedPiece';

function params(query: string): URLSearchParams {
  return new URLSearchParams(query);
}

describe('isSharedPiece', () => {
  it('détecte un partage', () => {
    expect(isSharedPiece(params('url=https://www.zara.com/x'))).toBe(true);
    expect(isSharedPiece(params(''))).toBe(false);
  });
});

describe('toSharedPieceValues', () => {
  it('prépare une envie avec le nom, le lien et la marque', () => {
    const values = toSharedPieceValues(
      params('title=Pantalon large&url=https://www.zara.com/fr/fr/pantalon-p01.html'),
    );
    expect(values).toMatchObject({
      status: OwnershipStatus.Wanted,
      title: 'Pantalon large',
      brand: 'Zara',
      productUrl: 'https://www.zara.com/fr/fr/pantalon-p01.html',
    });
  });

  it('retrouve le lien et le nom cachés dans le texte partagé', () => {
    const values = toSharedPieceValues(
      params('text=Regarde ce jean   https://www2.hm.com/fr_fr/productpage.123.html'),
    );
    expect(values).toMatchObject({
      title: 'Regarde ce jean',
      brand: 'H&M',
      productUrl: 'https://www2.hm.com/fr_fr/productpage.123.html',
    });
  });

  it('laisse la marque vide pour une boutique inconnue', () => {
    expect(toSharedPieceValues(params('url=https://exemple.fr/a')).brand).toBe('');
  });
});
