import type { Outfit } from '../../types/outfit';
import type { WardrobeItem } from '../../../wardrobe/types/wardrobe';
import { getOutfitReadiness, selectMissingItems } from '../../utils/outfits';
import { MissingPiecesList } from './MissingPiecesList';
import { OutfitCardMenu } from './OutfitCardMenu';
import { OutfitPieceThumbnail } from './OutfitPieceThumbnail';
import { ReplacePieceButton } from './ReplacePieceButton';
import { OutfitHarmony } from '../OutfitHarmony/OutfitHarmony';
import { OutfitReadinessBadge } from '../OutfitReadinessBadge/OutfitReadinessBadge';
import styles from './OutfitCard.module.css';

interface OutfitCardProps {
  outfit: Outfit;
  outfitItems: readonly WardrobeItem[];
  isCompared: boolean;
  canCompare: boolean;
  onToggleCompare: () => void;
}

export function OutfitCard({
  outfit,
  outfitItems,
  isCompared,
  canCompare,
  onToggleCompare,
}: OutfitCardProps) {
  const missingItems = selectMissingItems(outfitItems);

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.name}>{outfit.name}</h3>
        <OutfitReadinessBadge readiness={getOutfitReadiness(outfitItems)} />
      </header>
      <ul className={styles.pieces}>
        {outfitItems.map((item) => (
          <li key={item.piece.id}>
            <OutfitPieceThumbnail item={item} />
            <ReplacePieceButton outfit={outfit} item={item} />
          </li>
        ))}
      </ul>
      <OutfitHarmony items={outfitItems} />
      {missingItems.length > 0 && <MissingPiecesList missingItems={missingItems} />}
      <OutfitCardMenu
        outfit={outfit}
        outfitItems={outfitItems}
        isCompared={isCompared}
        canCompare={canCompare}
        onToggleCompare={onToggleCompare}
      />
    </article>
  );
}
