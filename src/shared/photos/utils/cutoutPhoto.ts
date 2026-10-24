import { CUTOUT_MIME_TYPE, PHOTO_MAX_SIZE, PHOTO_QUALITY } from '../constants/photos';
import { cropToContent } from './cropToContent';
import { dataUrlToBlob } from './photoDataUrl';
import { fitWithin } from './resizePhoto';

async function drawOnCanvas(blob: Blob): Promise<HTMLCanvasElement> {
  const image = await createImageBitmap(blob);
  const { width, height } = fitWithin(image, PHOTO_MAX_SIZE);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d')?.drawImage(image, 0, 0, width, height);
  image.close();
  return canvas;
}

export async function cutoutPhoto(photoDataUrl: string): Promise<string> {
  const { removeBackground } = await import('@imgly/background-removal');
  const cutout = await removeBackground(await dataUrlToBlob(photoDataUrl), {
    model: 'isnet_fp16',
    output: { format: 'image/png' },
  });
  return cropToContent(await drawOnCanvas(cutout)).toDataURL(CUTOUT_MIME_TYPE, PHOTO_QUALITY);
}
