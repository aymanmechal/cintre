import { describe, expect, it } from 'vitest';
import { buildShopLogoUrl } from './shopLogo';

describe('buildShopLogoUrl', () => {
  it('demande l’icône du site de la boutique', () => {
    expect(buildShopLogoUrl('https://www.zara.com/fr/')).toBe(
      'https://www.google.com/s2/favicons?domain=zara.com&sz=128',
    );
    expect(buildShopLogoUrl('https://shop.mango.com/fr')).toContain('domain=mango.com');
    expect(buildShopLogoUrl('https://www2.hm.com/fr_fr/')).toContain('domain=hm.com');
  });
});
