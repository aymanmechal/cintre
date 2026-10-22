import styles from './PaginationStepButton.module.css';

interface PaginationStepButtonProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
}

export function PaginationStepButton({ label, disabled, onClick }: PaginationStepButtonProps) {
  return (
    <button className={styles.stepButton} type="button" disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}
