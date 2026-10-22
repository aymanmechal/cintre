import type { Piece } from '../../../../shared/pieces/types/piece';
import { EditPieceLink } from '../EditPieceLink/EditPieceLink';
import { OwnershipPicker } from '../OwnershipPicker/OwnershipPicker';
import { OwnershipPickerSize } from '../OwnershipPicker/ownershipPickerSize';
import { RemoveFromWardrobeButton } from '../RemoveFromWardrobeButton/RemoveFromWardrobeButton';
import styles from './ItemEditTools.module.css';

interface ItemEditToolsProps {
  piece: Piece;
}

export function ItemEditTools({ piece }: ItemEditToolsProps) {
  return (
    <>
      <div className={styles.actionsPosition}>
        <EditPieceLink pieceId={piece.id} pieceTitle={piece.title} />
        <RemoveFromWardrobeButton pieceId={piece.id} pieceTitle={piece.title} />
      </div>
      <div className={styles.pickerPosition}>
        <OwnershipPicker piece={piece} size={OwnershipPickerSize.Compact} />
      </div>
    </>
  );
}
