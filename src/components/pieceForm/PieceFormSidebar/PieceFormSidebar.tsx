import type { PieceFormState } from '../../../hooks/usePieceForm';
import type { PieceFormLabels } from '../../../types/pieceForm';
import { PiecePreview } from '../PiecePreview/PiecePreview';
import { SaveResult } from '../SaveResult/SaveResult';
import styles from './PieceFormSidebar.module.css';

interface PieceFormSidebarProps {
  form: PieceFormState;
  labels: PieceFormLabels;
}

export function PieceFormSidebar({ form, labels }: PieceFormSidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label="Aperçu et résultat">
      <SaveResult submitStatus={form.submitStatus} labels={labels} savedPiece={form.savedPiece} />
      <h2 className={styles.title}>Aperçu</h2>
      <PiecePreview values={form.values} />
    </aside>
  );
}
