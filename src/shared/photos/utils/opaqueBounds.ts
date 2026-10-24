export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ALPHA_THRESHOLD = 16;

export function findOpaqueBounds(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
): Bounds | null {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (pixels[(y * width + x) * 4 + 3] <= ALPHA_THRESHOLD) continue;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  if (maxX < 0) return null;
  return { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

export function addMargin(bounds: Bounds, margin: number, width: number, height: number): Bounds {
  const x = Math.max(0, bounds.x - margin);
  const y = Math.max(0, bounds.y - margin);
  return {
    x,
    y,
    width: Math.min(width, bounds.x + bounds.width + margin) - x,
    height: Math.min(height, bounds.y + bounds.height + margin) - y,
  };
}
