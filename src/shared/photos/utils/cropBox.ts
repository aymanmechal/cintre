import type { CropBox, CropMargins } from '../types/cropMargins';

function percentOf(total: number, percent: number): number {
  return Math.round((total * percent) / 100);
}

export function computeCropBox(width: number, height: number, margins: CropMargins): CropBox {
  const x = percentOf(width, margins.left);
  const y = percentOf(height, margins.top);
  return {
    x,
    y,
    width: width - x - percentOf(width, margins.right),
    height: height - y - percentOf(height, margins.bottom),
  };
}

export function toClipPath(margins: CropMargins): string {
  const { top, right, bottom, left } = margins;
  return `inset(${top}% ${right}% ${bottom}% ${left}%)`;
}
