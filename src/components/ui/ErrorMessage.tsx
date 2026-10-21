import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

/** role="alert" : annoncé immédiatement par les lecteurs d'écran. */
export function ErrorMessage({ title, message, onRetry }: ErrorMessageProps) {
  return (
    <div className={styles.error} role="alert">
      <h2 className={styles.title}>{title}</h2>
      <p>{message}</p>
      {onRetry && (
        <button className={styles.retry} type="button" onClick={onRetry}>
          Réessayer
        </button>
      )}
    </div>
  );
}
