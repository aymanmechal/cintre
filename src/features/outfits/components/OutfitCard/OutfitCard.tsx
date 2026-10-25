import type { Outfit } from '../../types/outfit';
import type { WardrobeItem } from '../../../wardrobe/types/wardrobe';
import { getOutfitReadiness, selectMissingItems } from '../../utils/outfits';
import { DeleteOutfitButton } from './DeleteOutfitButton';
import { MissingPiecesList } from './MissingPiecesList';
import { CompareOutfitToggle } from './CompareOutfitToggle';
import { OutfitImageButton } from './OutfitImageButton';
import { OutfitNotes } from './OutfitNotes';
import { OutfitOccasionField } from './OutfitOccasionField';
import { OutfitPieceThumbnail } from './OutfitPieceThumbnail';
import { ReplacePieceButton } from './ReplacePieceButton';
import { OutfitHarmony } from '../OutfitHarmony/OutfitHarmony';
import { OutfitReadinessBadge } from '../OutfitReadinessBadge/OutfitReadinessBadge';
import { ShareOutfitsButton } from '../../../sharing/components/ShareOutfitsButton/ShareOutfitsButton';
import { useCanShare } from '../../../sharing/hooks/useCanShare';
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
  const canShare = useCanShare();

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
            <ReplacePieceButton outfit={outfit} item={item} />
          </li>
        ))}
      </ul>
      <OutfitOccasionField outfit={outfit} />
      <OutfitHarmony items={outfitItems} />
      {missingItems.length > 0 && <MissingPiecesList missingItems={missingItems} />}
      <OutfitNotes outfit={outfit} />
      <div className={styles.footer}>
        <OutfitImageButton outfit={outfit} outfitItems={outfitItems} />
        {canShare && (
          <ShareOutfitsButton
            entries={[{ outfit, items: outfitItems }]}
            label="Partager"
            accessibleLabel={`Partager la tenue ${outfit.name}`}
          />
        )}
        <CompareOutfitToggle
          outfit={outfit}
          isCompared={isCompared}
          canCompare={canCompare}
          onToggle={onToggleCompare}
        />
      </div>
    </article>
  );
}
