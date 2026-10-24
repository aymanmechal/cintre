import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { MAX_COMPARED_OUTFITS } from '../../constants/outfits';
import type { Outfit } from '../../types/outfit';
import type { WardrobeItem } from '../../../wardrobe/types/wardrobe';
import { buildComparedOutfit } from '../../utils/outfitComparison';
import { ComparedOutfitColumn } from './ComparedOutfitColumn';
import { ShareOutfitsButton } from '../../../sharing/components/ShareOutfitsButton/ShareOutfitsButton';
import { useCanShare } from '../../../sharing/hooks/useCanShare';
import styles from './OutfitComparison.module.css';

interface OutfitComparisonProps {
  outfits: readonly Outfit[];
  items: readonly WardrobeItem[];
  onClose: () => void;
}

export function OutfitComparison({ outfits, items, onClose }: OutfitComparisonProps) {
  const canShare = useCanShare();
  const comparedOutfits = outfits.map((outfit) => buildComparedOutfit(outfit, items));

  return (
    <section className={styles.comparison} aria-labelledby="outfit-comparison-title">
      <div className={styles.header}>
        <h2 id="outfit-comparison-title" className={styles.title}>
          Comparer mes tenues
        </h2>
        <p className={styles.hint}>{MAX_COMPARED_OUTFITS} tenues maximum</p>
        {canShare && comparedOutfits.length > 1 && (
          <ShareOutfitsButton
            entries={comparedOutfits}
            label="🗳️ Demander l’avis"
            accessibleLabel="Demander l’avis de mes amis sur ces tenues"
          />
        )}
        <Button variant={ButtonVariant.Ghost} onClick={onClose}>
          Fermer la comparaison
        </Button>
      </div>
      <ul className={styles.columns}>
        {comparedOutfits.map((compared) => (
          <li key={compared.outfit.id}>
            <ComparedOutfitColumn compared={compared} />
          </li>
        ))}
      </ul>
    </section>
  );
}
