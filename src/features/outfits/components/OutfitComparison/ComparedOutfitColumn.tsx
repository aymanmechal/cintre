import { OCCASION_LABELS } from '../../constants/occasions';
import { OUTFIT_READINESS_LABELS } from '../../constants/outfits';
import { formatPrice } from '../../../../shared/utils/format';
import { formatOutfitScore, type ComparedOutfit } from '../../utils/outfitComparison';
import { formatPieceCount } from '../../utils/outfits';
import { OutfitPieceThumbnail } from '../OutfitCard/OutfitPieceThumbnail';
import { OutfitHarmony } from '../OutfitHarmony/OutfitHarmony';
import styles from './ComparedOutfitColumn.module.css';

interface ComparedOutfitColumnProps {
  compared: ComparedOutfit;
}

export function ComparedOutfitColumn({ compared }: ComparedOutfitColumnProps) {
  const { outfit, items, totalPrice, readiness } = compared;

  return (
    <article className={styles.column} aria-label={`Comparaison : ${outfit.name}`}>
      <h3 className={styles.name}>{outfit.name}</h3>
      <ul className={styles.pieces}>
        {items.map((item) => (
          <li key={item.piece.id}>
            <OutfitPieceThumbnail item={item} />
          </li>
        ))}
      </ul>
      <dl className={styles.facts}>
        <dt>Occasion</dt>
        <dd>{outfit.occasion ? OCCASION_LABELS[outfit.occasion] : '—'}</dd>
        <dt>Pièces</dt>
        <dd>{formatPieceCount(items.length)}</dd>
        <dt>Prix total</dt>
        <dd>{formatPrice(totalPrice)}</dd>
        <dt>État</dt>
        <dd>{OUTFIT_READINESS_LABELS[readiness]}</dd>
        <dt>Ma note</dt>
        <dd>{formatOutfitScore(outfit.score)}</dd>
      </dl>
      <OutfitHarmony items={items} />
    </article>
  );
}
