import { SubmitStatus } from '../../../constants/pieceForm';
import type { PieceFormState } from '../../../hooks/usePieceForm';
import type { PieceFormLabels } from '../../../types/pieceForm';
import { PieceFormSubmitButton } from './PieceFormSubmitButton';
import { PieceIdentityFields } from './PieceIdentityFields';
import { PieceStorageFields } from './PieceStorageFields';
import styles from './PieceForm.module.css';

interface PieceFormProps {
  form: PieceFormState;
  labels: PieceFormLabels;
}

export function PieceForm({ form, labels }: PieceFormProps) {
  const { values, errors, submitStatus, changeField, submit } = form;

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
    </form>
  );
}
