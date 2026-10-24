import { PHOTO_MIME_TYPE, PHOTO_QUALITY } from '../constants/photos';
import type { CropMargins } from '../types/cropMargins';
import { computeCropBox } from './cropBox';
import { dataUrlToBlob } from './photoDataUrl';

export async function cropPhoto(photoDataUrl: string, margins: CropMargins): Promise<string> {
  const image = await createImageBitmap(await dataUrlToBlob(photoDataUrl));
  const box = computeCropBox(image.width, image.height, margins);
  const canvas = document.createElement('canvas');
  canvas.width = box.width;
  canvas.height = box.height;
  canvas
    .getContext('2d')
    ?.drawImage(image, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height);
  image.close();
  return canvas.toDataURL(PHOTO_MIME_TYPE, PHOTO_QUALITY);
}
