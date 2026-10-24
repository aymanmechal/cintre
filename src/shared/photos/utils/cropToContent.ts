import { addMargin, findOpaqueBounds } from './opaqueBounds';

const CONTENT_MARGIN_RATIO = 0.04;

export function cropToContent(source: HTMLCanvasElement): HTMLCanvasElement {
  const context = source.getContext('2d');
  if (context === null) return source;
  const { width, height } = source;
  const bounds = findOpaqueBounds(context.getImageData(0, 0, width, height).data, width, height);
  if (bounds === null) return source;
  const margin = Math.round(Math.max(bounds.width, bounds.height) * CONTENT_MARGIN_RATIO);
  const box = addMargin(bounds, margin, width, height);
  const target = document.createElement('canvas');
  target.width = box.width;
  target.height = box.height;
  target
    .getContext('2d')
    ?.drawImage(source, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height);
  return target;
}
