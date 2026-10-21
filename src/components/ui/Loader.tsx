import styles from './Loader.module.css';

interface LoaderProps {
  label: string;
}

/** role="status" : le lecteur d'écran annonce le texte sans interrompre l'utilisateur. */
export function Loader({ label }: LoaderProps) {
  return (
    <div className={styles.loader} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
