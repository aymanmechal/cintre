import {
  PIECE_COLOR_LABELS,
  PIECE_COLOR_SWATCHES,
  PIECE_COLORS,
  type PieceColor,
} from '../../../../shared/pieces/constants/colors';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
  label: string;
  value: PieceColor | null;
  disabledColor?: PieceColor | null;
  onChange: (color: PieceColor | null) => void;
}

export function ColorPicker({ label, value, disabledColor = null, onChange }: ColorPickerProps) {
  function toggleColor(color: PieceColor) {
    onChange(value === color ? null : color);
  }

  return (
    <div className={styles.field} role="group" aria-label={label}>
      <span className={styles.label}>{label}</span>
      <div className={styles.options}>
        {PIECE_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            className={styles.option}
            aria-pressed={value === color}
            disabled={disabledColor === color}
            onClick={() => toggleColor(color)}
          >
            <span
              className={styles.swatch}
              style={{ background: PIECE_COLOR_SWATCHES[color] }}
              aria-hidden="true"
            />
            <span className={styles.name}>{PIECE_COLOR_LABELS[color]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
