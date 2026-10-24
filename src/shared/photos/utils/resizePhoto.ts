import { PHOTO_MAX_SIZE, PHOTO_MIME_TYPE, PHOTO_QUALITY } from '../constants/photos';

interface Size {
  width: number;
  height: number;
}

export function fitWithin(size: Size, maxSize: number): Size {
  const scale = Math.min(1, maxSize / Math.max(size.width, size.height));
  return { width: Math.round(size.width * scale), height: Math.round(size.height * scale) };
}

export async function resizePhoto(file: Blob, mimeType = PHOTO_MIME_TYPE): Promise<string> {
  const image = await createImageBitmap(file);
  const { width, height } = fitWithin(image, PHOTO_MAX_SIZE);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d')?.drawImage(image, 0, 0, width, height);
  image.close();
  return canvas.toDataURL(mimeType, PHOTO_QUALITY);
}
