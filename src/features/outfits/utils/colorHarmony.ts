import { ColorHarmony, NEUTRAL_COLORS } from '../constants/outfits';
import { PIECE_COLOR_LABELS, type PieceColor } from '../../../shared/pieces/constants/colors';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

const MIN_COLORED_PIECES = 2;

export interface HarmonyDescription {
  harmony: ColorHarmony;
  explanation: string;
}

function isAccentColor(color: PieceColor | null): color is PieceColor {
  return color !== null && !NEUTRAL_COLORS.includes(color);
}

export function selectAccentColors(items: readonly WardrobeItem[]): PieceColor[] {
  const accentColors = items.map((item) => item.piece.color).filter(isAccentColor);
  return [...new Set(accentColors)];
}

export function toHarmony(accentColorCount: number): ColorHarmony {
  if (accentColorCount === 0) return ColorHarmony.Neutral;
  if (accentColorCount === 1) return ColorHarmony.Accent;
  return ColorHarmony.Bold;
}

export function formatColorList(colors: readonly PieceColor[]): string {
  const names = colors.map((color) => PIECE_COLOR_LABELS[color].toLowerCase());
  if (names.length <= 1) return names.join('');
  return `${names.slice(0, -1).join(', ')} et ${names[names.length - 1]}`;
}

function explainHarmony(harmony: ColorHarmony, accentColors: readonly PieceColor[]): string {
  const colors = formatColorList(accentColors);
  switch (harmony) {
    case ColorHarmony.Neutral:
      return 'Que des neutres : ça s’accorde toujours.';
    case ColorHarmony.Accent:
      return `Une seule couleur vive (${colors}), le reste est calme : elle ressort sans jurer.`;
    case ColorHarmony.Bold:
      return `Plusieurs couleurs vives (${colors}) : un look osé. Un peu de neutre calme le tout.`;
  }
}

export function describeHarmony(items: readonly WardrobeItem[]): HarmonyDescription | null {
  const coloredCount = items.filter((item) => item.piece.color !== null).length;
  if (coloredCount < MIN_COLORED_PIECES) return null;
  const accentColors = selectAccentColors(items);
  const harmony = toHarmony(accentColors.length);
  return { harmony, explanation: explainHarmony(harmony, accentColors) };
}
