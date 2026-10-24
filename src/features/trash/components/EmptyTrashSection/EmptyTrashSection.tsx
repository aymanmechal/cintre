import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import { ConfirmDialog } from '../../../../shared/ui/ConfirmDialog/ConfirmDialog';
import styles from './EmptyTrashSection.module.css';

interface EmptyTrashSectionProps {
  isDialogOpen: boolean;
  onOpen: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function EmptyTrashSection({
  isDialogOpen,
  onOpen,
  onCancel,
  onConfirm,
}: EmptyTrashSectionProps) {
  return (
    <div className={styles.section}>
      <Button variant={ButtonVariant.Danger} onClick={onOpen}>
        Vider la corbeille
      </Button>
      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Vider la corbeille ?"
        message="Les pièces de la corbeille seront supprimées pour de bon. Cette action est définitive."
        confirmLabel="Vider"
        isConfirming={false}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </div>
  );
}
