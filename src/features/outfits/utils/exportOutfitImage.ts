import { drawOutfitImage } from './outfitImageDraw';
import { buildOutfitImageFileName } from './outfitImageLayout';
import type { Outfit } from '../types/outfit';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { downloadBlob } from '../../../shared/utils/download';

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Image vide'))), 'image/png');
  });
}

export async function exportOutfitImage(
  outfit: Outfit,
  items: readonly WardrobeItem[],
): Promise<void> {
  const canvas = document.createElement('canvas');
  await drawOutfitImage(canvas, outfit, items);
  downloadBlob(buildOutfitImageFileName(outfit.name), await canvasToBlob(canvas));
}
