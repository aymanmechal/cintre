import { describe, expect, it } from 'vitest';
import { addMargin, findOpaqueBounds } from './opaqueBounds';

function pixelsWithDot(width: number, height: number, dotX: number, dotY: number) {
  const pixels = new Uint8ClampedArray(width * height * 4);
  pixels[(dotY * width + dotX) * 4 + 3] = 255;
  return pixels;
}

describe('findOpaqueBounds', () => {
  it('trouve la zone visible', () => {
    expect(findOpaqueBounds(pixelsWithDot(10, 10, 3, 4), 10, 10)).toEqual({
      x: 3,
      y: 4,
      width: 1,
      height: 1,
    });
  });

  it('renvoie null pour une image vide', () => {
    expect(findOpaqueBounds(new Uint8ClampedArray(40), 5, 2)).toBeNull();
  });
});

describe('addMargin', () => {
  it('ajoute une marge sans sortir de l’image', () => {
    expect(addMargin({ x: 1, y: 5, width: 2, height: 4 }, 3, 10, 10)).toEqual({
      x: 0,
      y: 2,
      width: 6,
      height: 8,
    });
  });
});
