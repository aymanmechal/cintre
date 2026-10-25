import { OUTFIT_SLOTS } from '../../../constants/outfits';
import type { OutfitBuilderState } from '../../../hooks/useOutfitBuilder';
import type { WardrobeItem } from '../../../../wardrobe/types/wardrobe';
import {
  canAddAnotherPiece,
  resolveSelectedItems,
  selectSlotItems,
  toPieceIds,
} from '../../../utils/outfits';
import { FieldLayout } from '../../../../../shared/ui/Form/fieldLayout';
import { SelectField } from '../../../../../shared/ui/Form/SelectField';
import { TextField } from '../../../../../shared/ui/Form/TextField';
import { NO_OCCASION, OCCASION_OPTIONS } from '../../../constants/occasions';
import { toOccasion } from '../../../utils/occasions';
import { OutfitHarmony } from '../../OutfitHarmony/OutfitHarmony';
import { KeepPiecesLink } from './KeepPiecesLink';
import { StylistLink } from './StylistLink';
import { RandomOutfitButton } from './RandomOutfitButton';
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
      <RandomOutfitButton hasNoIdea={builder.hasNoRandomIdea} onClick={builder.fillRandomOutfit} />
      <StylistLink />
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
      <KeepPiecesLink pieceIds={toPieceIds(builder.selection)} />
      <TextField
        id="outfit-name"
        label="Nom de la tenue"
        value={builder.name}
        placeholder={builder.defaultName}
        onChange={builder.changeName}
      />
      <SelectField
        id="outfit-occasion"
        label="Occasion (facultatif)"
        layout={FieldLayout.Stacked}
        value={builder.occasion ?? NO_OCCASION}
        options={OCCASION_OPTIONS}
        onChange={(value) => builder.changeOccasion(toOccasion(value))}
      />
      <OutfitSaveBar
        missingPieceCount={builder.missingPieceCount}
        isDuplicate={builder.isDuplicate}
        hasJustSaved={builder.hasJustSaved}
      />
    </aside>
  );
}
