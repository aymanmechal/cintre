import styles from './SkipLink.module.css';

interface SkipLinkProps {
  targetId: string;
}

export function SkipLink({ targetId }: SkipLinkProps) {
  return (
    <a className={styles.skipLink} href={`#${targetId}`}>
      Aller au contenu
    </a>
  );
}
