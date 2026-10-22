import { Spinner } from './Spinner';
import styles from './Loader.module.css';

interface LoaderProps {
  label: string;
}

export function Loader({ label }: LoaderProps) {
  return (
    <div className={styles.loader} role="status">
      <Spinner />
      <p>{label}</p>
    </div>
  );
}
