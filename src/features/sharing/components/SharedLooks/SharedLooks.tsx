import type { SharedLook } from '../../types/sharing';
import styles from './SharedLooks.module.css';

interface SharedLooksProps {
  looks: readonly SharedLook[];
}

export function SharedLooks({ looks }: SharedLooksProps) {
  return (
    <ul className={styles.looks}>
      {looks.map((look, index) => (
        <li key={index}>
          <figure className={styles.look}>
            <img className={styles.image} src={look.image} alt={`Tenue ${look.name}`} />
            <figcaption className={styles.caption}>{look.name}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
