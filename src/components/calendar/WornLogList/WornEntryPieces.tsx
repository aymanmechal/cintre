import type { WardrobeItem } from '../../../types/wardrobe';
import { OutfitPieceThumbnail } from '../../outfits/OutfitCard/OutfitPieceThumbnail';
import styles from './WornEntryPieces.module.css';

interface WornEntryPiecesProps {
  items: readonly WardrobeItem[];
}

export function WornEntryPieces({ items }: WornEntryPiecesProps) {
  return (
    <ul className={styles.pieces}>
      {items.map((item) => (
        <li key={item.piece.id}>
          <OutfitPieceThumbnail item={item} />
        </li>
      ))}
    </ul>
  );
}
