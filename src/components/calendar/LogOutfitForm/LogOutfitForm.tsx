import { useLogOutfitWorn } from '../../../hooks/useLogOutfitWorn';
import { Button, ButtonVariant } from '../../ui/Button/Button';
import { TextField } from '../../ui/Form/TextField';
import { TextFieldType } from '../../ui/Form/textFieldType';
import { FormFeedback } from '../../ui/FormFeedback/FormFeedback';
import { FeedbackTone } from '../../ui/FormFeedback/feedbackTone';
import { OutfitSelect } from './OutfitSelect';
import styles from './LogOutfitForm.module.css';

export function LogOutfitForm() {
  const form = useLogOutfitWorn();

  return (
    <form className={styles.form} noValidate onSubmit={form.save}>
      <h2 className={styles.title}>Qu'as-tu porté ?</h2>
      <OutfitSelect value={form.outfitId} onChange={form.changeOutfit} />
      <TextField
        id="worn-date"
        label="Jour"
        type={TextFieldType.Date}
        value={form.date}
        error={form.dateError}
        onChange={form.changeDate}
      />
      <Button type="submit" variant={ButtonVariant.Action} disabled={!form.canSave}>
        Ajouter au calendrier
      </Button>
      {form.hasJustSaved && (
        <FormFeedback tone={FeedbackTone.Success}>Ajouté au calendrier.</FormFeedback>
      )}
    </form>
  );
}
