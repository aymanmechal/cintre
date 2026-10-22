import styles from './SaveErrorCard.module.css';

interface SaveErrorCardProps {
  message: string;
}

export function SaveErrorCard({ message }: SaveErrorCardProps) {
  return (
    <p className={styles.card} role="alert">
      {message}
    </p>
  );
}
