import type { Outfit } from '../../types/outfit';
import type { WardrobeItem } from '../../../wardrobe/types/wardrobe';
import { getOutfitReadiness, selectMissingItems } from '../../utils/outfits';
import { DeleteOutfitButton } from './DeleteOutfitButton';
import { MissingPiecesList } from './MissingPiecesList';
import { OutfitPieceThumbnail } from './OutfitPieceThumbnail';
import { OutfitReadinessBadge } from '../OutfitReadinessBadge/OutfitReadinessBadge';
import styles from './OutfitCard.module.css';

interface OutfitCardProps {
  outfit: Outfit;
  outfitItems: readonly WardrobeItem[];
}

export function OutfitCard({ outfit, outfitItems }: OutfitCardProps) {
  const missingItems = selectMissingItems(outfitItems);

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.name}>{outfit.name}</h3>
        <OutfitReadinessBadge readiness={getOutfitReadiness(outfitItems)} />
        <DeleteOutfitButton outfitId={outfit.id} outfitName={outfit.name} />
      </header>
      <ul className={styles.pieces}>
        {outfitItems.map((item) => (
          <li key={item.piece.id}>
            <OutfitPieceThumbnail item={item} />
          </li>
        ))}
      </ul>
      {missingItems.length > 0 && <MissingPiecesList missingItems={missingItems} />}
    </article>
  );
}
