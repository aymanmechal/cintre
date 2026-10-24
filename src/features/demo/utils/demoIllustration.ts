import type { PieceType } from '../../../shared/pieces/constants/categories';
import type { PieceColor } from '../../../shared/pieces/constants/colors';
import {
  ILLUSTRATION_BACKGROUND,
  ILLUSTRATION_COLORS,
  ILLUSTRATION_SHAPES,
  ILLUSTRATION_STROKE,
} from '../constants/demoIllustrations';

export function buildDemoIllustration(pieceType: PieceType, color: PieceColor): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">` +
    `<rect width="300" height="300" fill="${ILLUSTRATION_BACKGROUND}"/>` +
    `<g fill="${ILLUSTRATION_COLORS[color]}" stroke="${ILLUSTRATION_STROKE}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">` +
    `${ILLUSTRATION_SHAPES[pieceType]}</g></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
