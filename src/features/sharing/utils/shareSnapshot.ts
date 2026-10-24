import { SHARE_IMAGE_MAX_WIDTH, SHARE_IMAGE_QUALITY } from '../constants/sharing';
import type { SharedLook, ShareEntry } from '../types/sharing';
import { drawOutfitImage } from '../../outfits/utils/outfitImageDraw';

function shrinkCanvas(source: HTMLCanvasElement): HTMLCanvasElement {
  const scale = Math.min(1, SHARE_IMAGE_MAX_WIDTH / source.width);
  const target = document.createElement('canvas');
  target.width = Math.round(source.width * scale);
  target.height = Math.round(source.height * scale);
  target.getContext('2d')?.drawImage(source, 0, 0, target.width, target.height);
  return target;
}

export async function renderSharedLook({ outfit, items }: ShareEntry): Promise<SharedLook> {
  const canvas = document.createElement('canvas');
  await drawOutfitImage(canvas, outfit, items);
  const image = shrinkCanvas(canvas).toDataURL('image/jpeg', SHARE_IMAGE_QUALITY);
  return { name: outfit.name, image };
}
