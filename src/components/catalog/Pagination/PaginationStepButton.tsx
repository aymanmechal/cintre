import { PAGINATION_STEP_ICONS, PAGINATION_STEP_LABELS, PaginationStep } from './paginationStep';
import styles from './PaginationStepButton.module.css';

interface PaginationStepButtonProps {
  step: PaginationStep;
  disabled: boolean;
  onClick: () => void;
}

export function PaginationStepButton({ step, disabled, onClick }: PaginationStepButtonProps) {
  return (
    <button
      className={`${styles.stepButton} ${styles[step]}`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <span aria-hidden="true">{PAGINATION_STEP_ICONS[step]}</span>
      {PAGINATION_STEP_LABELS[step]}
    </button>
  );
}
