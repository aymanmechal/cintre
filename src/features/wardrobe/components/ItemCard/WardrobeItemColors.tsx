import {
  PIECE_COLOR_LABELS,
  PIECE_COLOR_SWATCHES,
} from '../../../../shared/pieces/constants/colors';
import type { Piece } from '../../../../shared/pieces/types/piece';
import styles from './WardrobeItemColors.module.css';

interface WardrobeItemColorsProps {
  piece: Piece;
}

export function WardrobeItemColors({ piece }: WardrobeItemColorsProps) {
  const { color, secondaryColor } = piece;
  if (color === null) return null;

  return (
    <span className={styles.colors}>
      <span
        className={styles.primary}
        style={{ background: PIECE_COLOR_SWATCHES[color] }}
        role="img"
        aria-label={PIECE_COLOR_LABELS[color]}
        title={PIECE_COLOR_LABELS[color]}
      />
      {secondaryColor !== null && (
        <span
          className={styles.secondary}
          style={{ background: PIECE_COLOR_SWATCHES[secondaryColor] }}
          role="img"
          aria-label={PIECE_COLOR_LABELS[secondaryColor]}
          title={PIECE_COLOR_LABELS[secondaryColor]}
        />
      )}
    </span>
  );
}
