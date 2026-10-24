import { describe, expect, it } from 'vitest';
import { findShopByUrl } from './shops';

describe('findShopByUrl', () => {
  it('reconnaît la boutique depuis le lien d’un article', () => {
    expect(findShopByUrl('https://www.zara.com/fr/fr/pantalon-p0123.html')?.name).toBe('Zara');
    expect(findShopByUrl('https://shop.mango.com/fr/femme/jean')?.name).toBe('Mango');
  });

  it('ne trouve rien pour un autre site ou un lien invalide', () => {
    expect(findShopByUrl('https://exemple.fr/article')).toBeUndefined();
    expect(findShopByUrl('pas un lien')).toBeUndefined();
  });
});
