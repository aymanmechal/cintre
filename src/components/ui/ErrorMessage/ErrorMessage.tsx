import { Button } from '../Button/Button';
import { ButtonVariant } from '../Button/buttonVariant';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ title, message, onRetry }: ErrorMessageProps) {
  return (
    <div className={styles.error} role="alert">
      <h2 className={styles.title}>{title}</h2>
      <p>{message}</p>
      {onRetry && (
        <Button variant={ButtonVariant.Action} onClick={onRetry}>
          Réessayer
        </Button>
      )}
    </div>
  );
}
