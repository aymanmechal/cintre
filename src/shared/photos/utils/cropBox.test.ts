import { describe, expect, it } from 'vitest';
import { NO_CROP } from '../constants/crop';
import { computeCropBox, toClipPath } from './cropBox';

describe('computeCropBox', () => {
  it('garde toute l’image sans marge', () => {
    expect(computeCropBox(800, 600, NO_CROP)).toEqual({ x: 0, y: 0, width: 800, height: 600 });
  });

  it('retire les marges en pourcentage', () => {
    const margins = { top: 10, right: 25, bottom: 0, left: 50 };
    expect(computeCropBox(800, 600, margins)).toEqual({ x: 400, y: 60, width: 200, height: 540 });
  });
});

describe('toClipPath', () => {
  it('décrit la zone gardée pour l’aperçu', () => {
    expect(toClipPath({ top: 1, right: 2, bottom: 3, left: 4 })).toBe('inset(1% 2% 3% 4%)');
  });
});
