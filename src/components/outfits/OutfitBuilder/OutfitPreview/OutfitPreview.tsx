import { OUTFIT_SLOTS } from '../../../../constants/outfits';
import type { OutfitBuilderState } from '../../../../hooks/useOutfitBuilder';
import type { WardrobeItem } from '../../../../types/wardrobe';
import { findSelectedItem, resolveSelectedItems } from '../../../../utils/outfits';
import { TextField } from '../../../ui/Form/TextField';
import { OutfitSaveBar } from './OutfitSaveBar';
import { OutfitSelectionSummary } from './OutfitSelectionSummary';
import { OutfitSlotTile } from './OutfitSlotTile';
import styles from './OutfitPreview.module.css';

interface OutfitPreviewProps {
  items: readonly WardrobeItem[];
  builder: OutfitBuilderState;
}

export function OutfitPreview({ items, builder }: OutfitPreviewProps) {
  return (
    <aside className={styles.preview} aria-labelledby="outfit-preview-title">
      <h2 id="outfit-preview-title" className={styles.title}>
        Ta tenue
      </h2>
      <ul className={styles.slots}>
        {OUTFIT_SLOTS.map((slot) => (
          <OutfitSlotTile
            key={slot}
            slot={slot}
            item={findSelectedItem(builder.selection, slot, items)}
            isActive={slot === builder.activeSlot}
            onSelect={builder.selectSlot}
            onClear={builder.clearSlot}
          />
        ))}
      </ul>
      <OutfitSelectionSummary selectedItems={resolveSelectedItems(builder.selection, items)} />
      <TextField
        id="outfit-name"
        label="Nom de la tenue"
        value={builder.name}
        placeholder={builder.defaultName}
        onChange={builder.changeName}
      />
      <OutfitSaveBar
        missingPieceCount={builder.missingPieceCount}
        hasJustSaved={builder.hasJustSaved}
      />
    </aside>
  );
}
