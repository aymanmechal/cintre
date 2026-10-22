import { OwnershipStatus } from '../../../constants/wardrobe';
import type { WardrobeItem } from '../../../types/wardrobe';
import { RemoveFromWardrobeButton } from '../RemoveFromWardrobeButton/RemoveFromWardrobeButton';
import { LocationSelect } from './LocationSelect';
import { StatusSelect } from './StatusSelect';
import styles from './WardrobeItemControls.module.css';

interface WardrobeItemControlsProps {
  item: WardrobeItem;
}

export function WardrobeItemControls({ item }: WardrobeItemControlsProps) {
  return (
    <div className={styles.controls}>
      <StatusSelect item={item} />
      {item.status === OwnershipStatus.Owned && <LocationSelect item={item} />}
      <RemoveFromWardrobeButton pieceId={item.piece.id} pieceTitle={item.piece.title} />
    </div>
  );
}
