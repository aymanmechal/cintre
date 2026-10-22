import styles from './IconButton.module.css';

interface IconButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

export function IconButton({ icon, label, onClick }: IconButtonProps) {
  return (
    <button
      className={`${styles.iconButton} ${styles.danger}`}
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}
