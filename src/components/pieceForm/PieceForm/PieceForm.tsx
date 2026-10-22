import { SubmitStatus } from '../../../constants/pieceForm';
import { usePieceForm, type SavePieceForm } from '../../../hooks/usePieceForm';
import type { PieceFormLabels, PieceFormValues } from '../../../types/pieceForm';
import { PieceFormFeedback } from './PieceFormFeedback';
import { PieceFormSubmitButton } from './PieceFormSubmitButton';
import { PieceIdentityFields } from './PieceIdentityFields';
import { PieceStorageFields } from './PieceStorageFields';
import styles from './PieceForm.module.css';

interface PieceFormProps {
  initialValues: PieceFormValues;
  labels: PieceFormLabels;
  onSave: SavePieceForm;
  shouldResetOnSuccess: boolean;
}

export function PieceForm({ initialValues, labels, onSave, shouldResetOnSuccess }: PieceFormProps) {
  const { values, errors, submitStatus, savedPiece, changeField, submit } = usePieceForm({
    initialValues,
    onSave,
    shouldResetOnSuccess,
  });

  return (
    <form className={styles.form} noValidate onSubmit={submit}>
      <PieceIdentityFields values={values} errors={errors} onChange={changeField} />
      <PieceStorageFields values={values} onChange={changeField} />
      <p className={styles.requiredHint}>* champ obligatoire</p>
      <div className={styles.footer}>
        <PieceFormSubmitButton
          isSubmitting={submitStatus === SubmitStatus.Submitting}
          labels={labels}
        />
      </div>
      <PieceFormFeedback submitStatus={submitStatus} labels={labels} savedPiece={savedPiece} />
    </form>
  );
}
