import { NOT_ENOUGH_PIECES_MESSAGE, OUTFIT_SLOTS } from '../../../constants/outfits';
import { useWardrobe } from '../../../contexts/wardrobe/useWardrobe';
import { useOutfitBuilder } from '../../../hooks/useOutfitBuilder';
import { selectItemsForSlot } from '../../../utils/outfits';
import { Button } from '../../ui/Button/Button';
import { TextField } from '../../ui/Form/TextField';
import { FormFeedback } from '../../ui/FormFeedback/FormFeedback';
import { FeedbackTone } from '../../ui/FormFeedback/feedbackTone';
import { OutfitSlotPicker } from './OutfitSlotPicker';
import styles from './OutfitBuilder.module.css';

export function OutfitBuilder() {
  const { items } = useWardrobe();
  const builder = useOutfitBuilder();
  const shouldShowSelectionError = builder.hasTriedToSave && !builder.isSelectionValid;

  return (
    <form className={styles.builder} noValidate onSubmit={builder.save}>
      <h2 className={styles.title}>Composer une tenue</h2>
      <TextField
        id="outfit-name"
        label="Nom de la tenue"
        value={builder.name}
        placeholder={builder.defaultName}
        onChange={builder.changeName}
      />
      <div className={styles.slots}>
        {OUTFIT_SLOTS.map((slot) => (
          <OutfitSlotPicker
            key={slot}
            slot={slot}
            items={selectItemsForSlot(items, slot)}
            selectedPieceId={builder.selection[slot]}
            onToggle={builder.togglePiece}
          />
        ))}
      </div>
      <div className={styles.footer}>
        <Button type="submit">Créer la tenue</Button>
      </div>
      {shouldShowSelectionError && (
        <FormFeedback tone={FeedbackTone.Error}>{NOT_ENOUGH_PIECES_MESSAGE}</FormFeedback>
      )}
      {builder.hasJustSaved && (
        <FormFeedback tone={FeedbackTone.Success}>
          Tenue créée, elle est juste en dessous.
        </FormFeedback>
      )}
    </form>
  );
}
