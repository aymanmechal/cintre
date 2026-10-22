import { useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import { ButtonVariant } from '../Button/buttonVariant';
import { FeedbackTone } from '../FormFeedback/feedbackTone';
import { FormFeedback } from '../FormFeedback/FormFeedback';
import styles from './ConfirmDialog.module.css';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  isConfirming: boolean;
  errorMessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel,
  isConfirming,
  errorMessage,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="confirm-dialog-title"
      onClose={onCancel}
    >
      <h2 id="confirm-dialog-title" className={styles.title}>
        {title}
      </h2>
      <p className={styles.message}>{message}</p>
      {errorMessage && <FormFeedback tone={FeedbackTone.Error}>{errorMessage}</FormFeedback>}
      <div className={styles.actions}>
        <Button variant={ButtonVariant.Ghost} onClick={onCancel} disabled={isConfirming}>
          Annuler
        </Button>
        <Button variant={ButtonVariant.Danger} onClick={onConfirm} disabled={isConfirming}>
          {confirmLabel}
        </Button>
      </div>
    </dialog>
  );
}
