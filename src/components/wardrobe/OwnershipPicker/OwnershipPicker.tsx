import { OWNERSHIP_STATUSES, type OwnershipStatus } from '../../../constants/wardrobe';
import { useWardrobe } from '../../../contexts/wardrobe/useWardrobe';
import { useWardrobeItem } from '../../../hooks/useWardrobeItem';
import type { Piece } from '../../../types/piece';
import { RemoveFromWardrobeButton } from '../RemoveFromWardrobeButton/RemoveFromWardrobeButton';
import { OwnershipStatusButton } from './OwnershipStatusButton';
import styles from './OwnershipPicker.module.css';

interface OwnershipPickerProps {
  piece: Piece;
}

export function OwnershipPicker({ piece }: OwnershipPickerProps) {
  const { savePiece } = useWardrobe();
  const wardrobeItem = useWardrobeItem(piece.id);

  function selectStatus(status: OwnershipStatus) {
    savePiece(piece, status);
  }

  return (
    <div className={styles.picker} role="group" aria-label="Ma garde-robe">
      {OWNERSHIP_STATUSES.map((status) => (
        <OwnershipStatusButton
          key={status}
          status={status}
          isSelected={wardrobeItem?.status === status}
          onSelect={selectStatus}
        />
      ))}
      {wardrobeItem && <RemoveFromWardrobeButton pieceId={piece.id} pieceTitle={piece.title} />}
    </div>
  );
}
