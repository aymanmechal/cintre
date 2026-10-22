import { useLogOutfitWorn } from '../../hooks/useLogOutfitWorn';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { FormFeedback } from '../../../../shared/ui/FormFeedback/FormFeedback';
import { FeedbackTone } from '../../../../shared/ui/FormFeedback/feedbackTone';
import { OutfitSelect } from './OutfitSelect';
import styles from './LogOutfitForm.module.css';

interface LogOutfitFormProps {
  date: string;
}

export function LogOutfitForm({ date }: LogOutfitFormProps) {
  const form = useLogOutfitWorn(date);

  return (
    <form className={styles.form} noValidate onSubmit={form.save}>
      <h3 className={styles.title}>{form.isPlanning ? 'Que prévois-tu ?' : "Qu'as-tu porté ?"}</h3>
      <OutfitSelect value={form.outfitId} onChange={form.changeOutfit} />
      <Button type="submit" variant={ButtonVariant.Action}>
        {form.isPlanning ? 'Prévoir cette tenue' : 'Ajouter au calendrier'}
      </Button>
      {form.hasJustSaved && (
        <FormFeedback tone={FeedbackTone.Success}>Ajouté au calendrier.</FormFeedback>
      )}
    </form>
  );
}
