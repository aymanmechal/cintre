import type { WardrobeItem } from '../../../wardrobe/types/wardrobe';
import { formatPrice } from '../../../../shared/utils/format';
import { sumPrices } from '../../utils/outfits';
import styles from './MissingPiecesList.module.css';

interface MissingPiecesListProps {
  missingItems: readonly WardrobeItem[];
}

export function MissingPiecesList({ missingItems }: MissingPiecesListProps) {
  return (
    <div className={styles.missing}>
      <p className={styles.label}>À obtenir · {formatPrice(sumPrices(missingItems))}</p>
      <ul className={styles.list}>
        {missingItems.map((item) => (
          <li key={item.piece.id}>{item.piece.title}</li>
        ))}
      </ul>
    </div>
  );
}
