import styles from './FieldError.module.css';

interface FieldErrorProps {
  id: string;
  message: string;
}

export function FieldError({ id, message }: FieldErrorProps) {
  return (
    <p id={id} className={styles.error}>
      {message}
    </p>
  );
}
