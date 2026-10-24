import type { ChangeEvent } from 'react';
import styles from './ImportBackupButton.module.css';

interface ImportBackupButtonProps {
  isDisabled: boolean;
  onPick: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function ImportBackupButton({ isDisabled, onPick }: ImportBackupButtonProps) {
  return (
    <label className={styles.button} data-disabled={isDisabled}>
      Choisir un fichier
      <input
        className={styles.input}
        type="file"
        accept="application/json,.json"
        data-testid="backup-file"
        disabled={isDisabled}
        onChange={onPick}
      />
    </label>
  );
}
