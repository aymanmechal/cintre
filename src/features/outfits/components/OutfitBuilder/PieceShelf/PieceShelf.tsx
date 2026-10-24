import { OUTFIT_SLOT_PROMPTS, type OutfitSlot } from '../../../constants/outfits';
import type { WardrobeItem } from '../../../../wardrobe/types/wardrobe';
import { selectItemsForSlot, selectShelfItems } from '../../../utils/outfits';
import { EmptyShelf } from './EmptyShelf';
import { PieceOptions } from './PieceOptions';
import { SlotTabs } from './SlotTabs';
import styles from './PieceShelf.module.css';

interface PieceShelfProps {
  items: readonly WardrobeItem[];
  activeSlot: OutfitSlot;
  selectedPieceIds: readonly number[];
  onSelectSlot: (slot: OutfitSlot) => void;
  onToggle: (pieceId: number) => void;
}

export function PieceShelf({
  items,
  activeSlot,
  selectedPieceIds,
  onSelectSlot,
  onToggle,
}: PieceShelfProps) {
  const shelfItems = selectShelfItems(items, activeSlot);

  return (
    <section className={styles.shelf} aria-labelledby="piece-shelf-title">
      <h3 id="piece-shelf-title" className={styles.title}>
        {OUTFIT_SLOT_PROMPTS[activeSlot]}
      </h3>
      <SlotTabs
        activeSlot={activeSlot}
        countOfSlot={(slot) => selectItemsForSlot(items, slot).length}
        onSelect={onSelectSlot}
      />
      {shelfItems.length === 0 ? (
        <EmptyShelf slot={activeSlot} />
      ) : (
        <PieceOptions
          key={activeSlot}
          items={shelfItems}
          selectedPieceIds={selectedPieceIds}
          onToggle={onToggle}
        />
      )}
    </section>
  );
}
