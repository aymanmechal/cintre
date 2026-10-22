import { OUTFIT_SLOT_PROMPTS, type OutfitSlot } from '../../../../constants/outfits';
import type { WardrobeItem } from '../../../../types/wardrobe';
import { selectItemsForSlot, selectShelfItems } from '../../../../utils/outfits';
import { EmptyShelf } from './EmptyShelf';
import { PieceOptionGrid } from './PieceOptionGrid';
import { SlotTabs } from './SlotTabs';
import styles from './PieceShelf.module.css';

interface PieceShelfProps {
  items: readonly WardrobeItem[];
  activeSlot: OutfitSlot;
  selectedPieceId: number | null;
  onSelectSlot: (slot: OutfitSlot) => void;
  onToggle: (pieceId: number) => void;
}

export function PieceShelf({
  items,
  activeSlot,
  selectedPieceId,
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
        <PieceOptionGrid items={shelfItems} selectedPieceId={selectedPieceId} onToggle={onToggle} />
      )}
    </section>
  );
}
