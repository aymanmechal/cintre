import { OWNERSHIP_STATUS_LABELS, OwnershipStatus } from '../../../constants/wardrobe';
import { useWardrobe } from '../../../contexts/wardrobe/useWardrobe';
import { useWardrobeItem } from '../../../hooks/useWardrobeItem';
import type { Piece } from '../../../types/piece';
import styles from './WardrobeToggleButton.module.css';

interface WardrobeToggleButtonProps {
  piece: Piece;
}

export function WardrobeToggleButton({ piece }: WardrobeToggleButtonProps) {
  const { savePiece, removePiece } = useWardrobe();
  const wardrobeItem = useWardrobeItem(piece.id);

  if (wardrobeItem) {
    return (
      <button
        type="button"
        className={`${styles.toggle} ${styles.saved}`}
        aria-label={`Retirer ${piece.title} de ma garde-robe`}
        onClick={() => removePiece(piece.id)}
      >
        ✓ {OWNERSHIP_STATUS_LABELS[wardrobeItem.status]}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={`Ajouter ${piece.title} à ma garde-robe`}
      onClick={() => savePiece(piece, OwnershipStatus.Owned)}
    >
      + Garde-robe
    </button>
  );
}
