import { OWNERSHIP_STATUSES, type OwnershipStatus } from '../../../constants/wardrobe';
import { useWardrobe } from '../../../contexts/wardrobe/useWardrobe';
import { useWardrobeItem } from '../../../hooks/useWardrobeItem';
import type { Piece } from '../../../types/piece';
import { OwnershipPickerSize } from './ownershipPickerSize';
import { OwnershipStatusButton } from './OwnershipStatusButton';
import styles from './OwnershipPicker.module.css';

interface OwnershipPickerProps {
  piece: Piece;
  size?: OwnershipPickerSize;
}

export function OwnershipPicker({
  piece,
  size = OwnershipPickerSize.Regular,
}: OwnershipPickerProps) {
  const { savePiece, removePiece } = useWardrobe();
  const wardrobeItem = useWardrobeItem(piece.id);

  function toggleStatus(status: OwnershipStatus) {
    if (wardrobeItem?.status === status) {
      removePiece(piece.id);
    } else {
      savePiece(piece, status);
    }
  }

  return (
    <div className={`${styles.picker} ${styles[size]}`} role="group" aria-label="Ma garde - robe">
      {OWNERSHIP_STATUSES.map((status) => (
        <OwnershipStatusButton
          key={status}
          status={status}
          size={size}
          pieceTitle={piece.title}
          isSelected={wardrobeItem?.status === status}
          onToggle={toggleStatus}
        />
      ))}
    </div>
  );
}
