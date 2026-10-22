import { SubmitStatus } from '../../../constants/addPiece';
import { useAddPieceForm } from '../../../hooks/useAddPieceForm';
import { AddPieceFeedback } from './AddPieceFeedback';
import { AddPieceSubmitButton } from './AddPieceSubmitButton';
import { PieceIdentityFields } from './PieceIdentityFields';
import { PieceStorageFields } from './PieceStorageFields';
import styles from './AddPieceForm.module.css';

export function AddPieceForm() {
  const { values, errors, submitStatus, changeField, submit } = useAddPieceForm();

  return (
    <form className={styles.form} noValidate onSubmit={submit}>
      <PieceIdentityFields values={values} errors={errors} onChange={changeField} />
      <PieceStorageFields values={values} onChange={changeField} />
      <p className={styles.requiredHint}>* champ obligatoire</p>
      <div className={styles.footer}>
        <AddPieceSubmitButton isSubmitting={submitStatus === SubmitStatus.Submitting} />
        <AddPieceFeedback submitStatus={submitStatus} />
      </div>
    </form>
  );
}
