import { Link } from 'react-router';
import type { MeLinkView } from '../../types/me';
import styles from './MeLinkTile.module.css';

interface MeLinkTileProps {
  link: MeLinkView;
}

export function MeLinkTile({ link }: MeLinkTileProps) {
  return (
    <Link to={link.to} className={styles.tile}>
      <span className={styles.emoji} aria-hidden="true">
        {link.emoji}
      </span>
      <span className={styles.text}>
        <span className={styles.label}>
          {link.label}
          {link.count > 0 && <span className={styles.count}>{link.count}</span>}
        </span>
        <span className={styles.description}>{link.description}</span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        ›
      </span>
    </Link>
  );
}
