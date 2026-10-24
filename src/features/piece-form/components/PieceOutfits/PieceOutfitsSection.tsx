import { usePieceOutfitStats } from '../../../outfits/hooks/usePieceOutfitStats';
import { formatIdeaCount, formatOutfitCount } from '../../../outfits/utils/outfits';
import type { WardrobeItem } from '../../../wardrobe/types/wardrobe';
import { buildOutfitIdeasUrl } from '../../../../shared/routes';
import { ButtonLink } from '../../../../shared/ui/Button/ButtonLink';
import styles from './PieceOutfitsSection.module.css';

interface PieceOutfitsSectionProps {
  item: WardrobeItem;
}

export function PieceOutfitsSection({ item }: PieceOutfitsSectionProps) {
  const { outfitCount, ideaCount } = usePieceOutfitStats(item);

  return (
    <section className={styles.section} aria-labelledby="piece-outfits-title">
      <h2 id="piece-outfits-title" className={styles.title}>
        Tes tenues avec cette pièce
      </h2>
      <p className={styles.message}>
        Dans {formatOutfitCount(outfitCount)}. Encore {formatIdeaCount(ideaCount)} avec ce que tu
        as.
      </p>
      {ideaCount > 0 && (
        <ButtonLink to={buildOutfitIdeasUrl(item.piece.id)}>✨ Voir les idées</ButtonLink>
      )}
    </section>
  );
}
