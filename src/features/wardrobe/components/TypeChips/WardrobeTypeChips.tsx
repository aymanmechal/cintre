import {
  PIECE_TYPE_LABELS,
  PIECE_TYPES,
  type PieceType,
} from '../../../../shared/pieces/constants/categories';
import styles from './WardrobeTypeChips.module.css';

interface WardrobeTypeChipsProps {
  selectedTypes: readonly PieceType[];
  onToggle: (pieceType: PieceType) => void;
  onClear: () => void;
}

export function WardrobeTypeChips({ selectedTypes, onToggle, onClear }: WardrobeTypeChipsProps) {
  return (
    <div className={styles.chips} role="group" aria-label="Type de pièce">
      <button
        type="button"
        className={styles.chip}
        aria-pressed={selectedTypes.length === 0}
        onClick={onClear}
      >
        Tous
      </button>
      {PIECE_TYPES.map((pieceType) => (
        <button
          key={pieceType}
          type="button"
          className={styles.chip}
          aria-pressed={selectedTypes.includes(pieceType)}
          onClick={() => onToggle(pieceType)}
        >
          {PIECE_TYPE_LABELS[pieceType]}
        </button>
      ))}
    </div>
  );
}
