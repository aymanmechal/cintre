import { OUTFIT_SLOTS } from '../../../constants/outfits';
import type { OutfitBuilderState } from '../../../hooks/useOutfitBuilder';
import type { WardrobeItem } from '../../../../wardrobe/types/wardrobe';
import {
  canAddAnotherPiece,
  resolveSelectedItems,
  selectSlotItems,
  toPieceIds,
} from '../../../utils/outfits';
import { TextField } from '../../../../../shared/ui/Form/TextField';
import { OutfitHarmony } from '../../OutfitHarmony/OutfitHarmony';
import { OutfitIdeasZone } from './OutfitIdeasZone';
import { OutfitMoreOptions } from './OutfitMoreOptions';
import { OutfitSaveBar } from './OutfitSaveBar';
import { OutfitSelectionSummary } from './OutfitSelectionSummary';
import { OutfitSlotTile } from './OutfitSlotTile';
import styles from './OutfitPreview.module.css';

interface OutfitPreviewProps {
  items: readonly WardrobeItem[];
  builder: OutfitBuilderState;
}

export function OutfitPreview({ items, builder }: OutfitPreviewProps) {
  const selectedItems = resolveSelectedItems(builder.selection, items);

  return (
    <aside className={styles.preview} aria-labelledby="outfit-preview-title">
      <h2 id="outfit-preview-title" className={styles.title}>
        Ta tenue
      </h2>
      <OutfitIdeasZone
        pieceIds={toPieceIds(builder.selection)}
        hasNoRandomIdea={builder.hasNoRandomIdea}
        onRandom={builder.fillRandomOutfit}
      />
      <ul className={styles.slots}>
        {OUTFIT_SLOTS.map((slot) => (
          <OutfitSlotTile
            key={slot}
            slot={slot}
            items={selectSlotItems(builder.selection, slot, items)}
            isActive={slot === builder.activeSlot}
            onSelect={builder.selectSlot}
            canAddAnother={canAddAnotherPiece(builder.selection, slot)}
            onClear={builder.clearPiece}
          />
        ))}
      </ul>
      <OutfitSelectionSummary selectedItems={selectedItems} />
      <OutfitHarmony items={selectedItems} />
      <TextField
        id="outfit-name"
        label="Nom de la tenue"
        value={builder.name}
        placeholder={builder.defaultName}
        onChange={builder.changeName}
      />
      <OutfitMoreOptions occasion={builder.occasion} onChangeOccasion={builder.changeOccasion} />
      <OutfitSaveBar
        missingPieceCount={builder.missingPieceCount}
        isDuplicate={builder.isDuplicate}
        hasJustSaved={builder.hasJustSaved}
      />
    </aside>
  );
}
