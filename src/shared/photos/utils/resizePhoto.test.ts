import { describe, expect, it } from 'vitest';
import { fitWithin } from './resizePhoto';

describe('fitWithin', () => {
  it('réduit la plus grande dimension à la taille maximale', () => {
    expect(fitWithin({ width: 4000, height: 3000 }, 800)).toEqual({ width: 800, height: 600 });
    expect(fitWithin({ width: 1000, height: 2000 }, 800)).toEqual({ width: 400, height: 800 });
  });

  it("n'agrandit jamais une petite photo", () => {
    expect(fitWithin({ width: 300, height: 200 }, 800)).toEqual({ width: 300, height: 200 });
  });
});
