import {
  PIECE_COLOR_LABELS,
  PIECE_COLOR_SWATCHES,
  PIECE_COLORS,
  type PieceColor,
} from '../../../../shared/pieces/constants/colors';
import styles from './WardrobeColorFilter.module.css';

interface WardrobeColorFilterProps {
  selectedColors: readonly PieceColor[];
  onToggle: (color: PieceColor) => void;
}

export function WardrobeColorFilter({ selectedColors, onToggle }: WardrobeColorFilterProps) {
  return (
    <div className={styles.colors} role="group" aria-label="Couleur">
      {PIECE_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          className={styles.color}
          aria-pressed={selectedColors.includes(color)}
          onClick={() => onToggle(color)}
        >
          <span
            className={styles.swatch}
            style={{ background: PIECE_COLOR_SWATCHES[color] }}
            aria-hidden="true"
          />
          {PIECE_COLOR_LABELS[color]}
        </button>
      ))}
    </div>
  );
}
