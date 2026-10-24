import { formatOutfitCount } from '../../../outfits/utils/outfits';
import type { WardrobeItem } from '../../../wardrobe/types/wardrobe';
import { useBeforeBuying } from '../../hooks/useBeforeBuying';
import styles from './BeforeBuyingSection.module.css';

interface BeforeBuyingSectionProps {
  item: WardrobeItem;
}

function describeOutfits(count: number): string {
  if (count === 0) return 'Aucune tenue complète avec tes pièces actuelles.';
  return `Avec tes pièces, elle donnerait ${formatOutfitCount(count)}.`;
}

function describeSimilar(titles: readonly string[]): string {
  if (titles.length === 0) return 'Rien de similaire dans ton armoire : vraie nouveauté !';
  return `Tu as déjà quelque chose de proche : ${titles.join(', ')}.`;
}

export function BeforeBuyingSection({ item }: BeforeBuyingSectionProps) {
  const { similarTitles, outfitCount } = useBeforeBuying(item);

  return (
    <section className={styles.section} aria-labelledby="before-buying-title">
      <h2 id="before-buying-title" className={styles.title}>
        🛍️ Avant d’acheter
      </h2>
      <p>✨ {describeOutfits(outfitCount)}</p>
      <p className={styles.message}>👀 {describeSimilar(similarTitles)}</p>
    </section>
  );
}
