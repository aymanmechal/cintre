import { COLOR_HARMONY_LABELS } from '../../constants/outfits';
import type { WardrobeItem } from '../../../wardrobe/types/wardrobe';
import { describeHarmony } from '../../utils/colorHarmony';
import styles from './OutfitHarmony.module.css';

interface OutfitHarmonyProps {
  items: readonly WardrobeItem[];
}

export function OutfitHarmony({ items }: OutfitHarmonyProps) {
  const description = describeHarmony(items);

  if (description === null) return null;

  return (
    <div className={styles.harmony}>
      <span className={styles.badge} data-harmony={description.harmony}>
        {COLOR_HARMONY_LABELS[description.harmony]}
      </span>
      <p className={styles.explanation}>{description.explanation}</p>
    </div>
  );
}
