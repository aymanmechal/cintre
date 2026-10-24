import {
  PIECE_COLOR_LABELS,
  PIECE_COLOR_SWATCHES,
  PIECE_COLORS,
  type PieceColor,
} from '../../../../shared/pieces/constants/colors';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
  value: PieceColor | null;
  onChange: (color: PieceColor | null) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  function toggleColor(color: PieceColor) {
    onChange(value === color ? null : color);
  }

  return (
    <div className={styles.field} role="group" aria-label="Couleur">
      <span className={styles.label}>Couleur</span>
      <div className={styles.swatches}>
        {PIECE_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            className={styles.swatch}
            style={{ background: PIECE_COLOR_SWATCHES[color] }}
            aria-label={PIECE_COLOR_LABELS[color]}
            aria-pressed={value === color}
            title={PIECE_COLOR_LABELS[color]}
            onClick={() => toggleColor(color)}
          />
        ))}
      </div>
    </div>
  );
}
