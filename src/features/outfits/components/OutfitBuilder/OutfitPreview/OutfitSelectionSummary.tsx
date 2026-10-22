import type { WardrobeItem } from '../../../../wardrobe/types/wardrobe';
import { formatPrice } from '../../../../../shared/utils/format';
import {
  formatPieceCount,
  getOutfitReadiness,
  selectMissingItems,
  sumPrices,
} from '../../../utils/outfits';
import { OutfitReadinessBadge } from '../../OutfitReadinessBadge/OutfitReadinessBadge';
import styles from './OutfitSelectionSummary.module.css';

interface OutfitSelectionSummaryProps {
  selectedItems: readonly WardrobeItem[];
}

export function OutfitSelectionSummary({ selectedItems }: OutfitSelectionSummaryProps) {
  const missingItems = selectMissingItems(selectedItems);

  if (selectedItems.length === 0) {
    return <p className={styles.hint}>Clique sur une pièce à droite pour commencer.</p>;
  }

  return (
    <div className={styles.summary}>
      <OutfitReadinessBadge readiness={getOutfitReadiness(selectedItems)} />
      <span>{formatPieceCount(selectedItems.length)}</span>
      {missingItems.length > 0 && (
        <span className={styles.missing}>À obtenir : {formatPrice(sumPrices(missingItems))}</span>
      )}
    </div>
  );
}
