import { OCCASION_LABELS } from '../../../outfits/constants/occasions';
import type { Outfit } from '../../../outfits/types/outfit';
import { OutfitImageButton } from '../../../outfits/components/OutfitCard/OutfitImageButton';
import { OutfitPieceThumbnail } from '../../../outfits/components/OutfitCard/OutfitPieceThumbnail';
import { OutfitHarmony } from '../../../outfits/components/OutfitHarmony/OutfitHarmony';
import type { WardrobeItem } from '../../../wardrobe/types/wardrobe';
import styles from './LookbookSpread.module.css';

interface LookbookSpreadProps {
  outfit: Outfit;
  outfitItems: readonly WardrobeItem[];
}

export function LookbookSpread({ outfit, outfitItems }: LookbookSpreadProps) {
  return (
    <article className={styles.spread} aria-label={outfit.name}>
      {outfit.occasion !== null && (
        <p className={styles.occasion}>{OCCASION_LABELS[outfit.occasion]}</p>
      )}
      <h2 className={styles.name}>{outfit.name}</h2>
      <ul className={styles.pieces}>
        {outfitItems.map((item) => (
          <li key={item.piece.id}>
            <OutfitPieceThumbnail item={item} />
          </li>
        ))}
      </ul>
      <OutfitHarmony items={outfitItems} />
      {outfit.note !== '' && <blockquote className={styles.note}>{outfit.note}</blockquote>}
      <div className={styles.actions}>
        <OutfitImageButton outfit={outfit} outfitItems={outfitItems} />
      </div>
    </article>
  );
}
