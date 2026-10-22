import { usePieceForm, type SavePieceForm } from '../../hooks/usePieceForm';
import type { PieceFormLabels, PieceFormValues } from '../../types/pieceForm';
import { PieceForm } from '../PieceForm/PieceForm';
import { PieceFormSidebar } from '../PieceFormSidebar/PieceFormSidebar';
import styles from './PieceFormWorkspace.module.css';

interface PieceFormWorkspaceProps {
  initialValues: PieceFormValues;
  labels: PieceFormLabels;
  onSave: SavePieceForm;
  shouldResetOnSuccess: boolean;
}

export function PieceFormWorkspace({
  initialValues,
  labels,
  onSave,
  shouldResetOnSuccess,
}: PieceFormWorkspaceProps) {
  const form = usePieceForm({ initialValues, onSave, shouldResetOnSuccess });

  return (
    <div className={styles.workspace}>
      <PieceForm form={form} labels={labels} />
      <PieceFormSidebar form={form} labels={labels} />
    </div>
  );
}
