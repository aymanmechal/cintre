import { SubmitStatus } from '../../../constants/pieceForm';
import { useDeletePiece } from '../../../hooks/useDeletePiece';
import type { Piece } from '../../../types/piece';
import { Button } from '../../ui/Button/Button';
import { ButtonVariant } from '../../ui/Button/buttonVariant';
import { ConfirmDialog } from '../../ui/ConfirmDialog/ConfirmDialog';
import styles from './DeletePieceSection.module.css';

const DELETE_ERROR_MESSAGE = 'Impossible de supprimer la pièce. Réessaie dans un instant.';

interface DeletePieceSectionProps {
  piece: Piece;
}

export function DeletePieceSection({ piece }: DeletePieceSectionProps) {
  const { isDialogOpen, deleteStatus, openDialog, closeDialog, confirmDelete } =
    useDeletePiece(piece);
  const isDeleting = deleteStatus === SubmitStatus.Submitting;

  return (
    <section className={styles.section} aria-labelledby="delete-piece-title">
      <h2 id="delete-piece-title" className={styles.title}>
        Supprimer la pièce
      </h2>
      <p className={styles.message}>Elle disparaîtra de ta garde-robe.</p>
      <Button variant={ButtonVariant.Danger} onClick={openDialog}>
        Supprimer
      </Button>
      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Supprimer ?"
        message={`« ${piece.title} » sera retirée de ta garde-robe. Cette action est définitive.`}
        confirmLabel={isDeleting ? 'Suppression…' : 'Supprimer'}
        isConfirming={isDeleting}
        errorMessage={deleteStatus === SubmitStatus.Error ? DELETE_ERROR_MESSAGE : undefined}
        onConfirm={confirmDelete}
        onCancel={closeDialog}
      />
    </section>
  );
}
