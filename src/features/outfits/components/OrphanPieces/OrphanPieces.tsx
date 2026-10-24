import { Link } from 'react-router';
import { useOutfits } from '../../context/useOutfits';
import { selectOrphanItems } from '../../utils/combinations';
import { useWardrobe } from '../../../wardrobe/context/useWardrobe';
import { buildOutfitIdeasUrl } from '../../../../shared/routes';
import styles from './OrphanPieces.module.css';

export function OrphanPieces() {
  const { items } = useWardrobe();
  const { outfits } = useOutfits();
  const orphanItems = selectOrphanItems(items, outfits);

  if (orphanItems.length === 0) return null;

  return (
    <details className={styles.details}>
      <summary className={styles.summary}>Pièces sans tenue ({orphanItems.length})</summary>
      <p className={styles.message}>Elles ne sont dans aucune tenue. Trouve-leur une idée !</p>
      <ul className={styles.list}>
        {orphanItems.map((item) => (
          <li key={item.piece.id}>
            <Link className={styles.link} to={buildOutfitIdeasUrl(item.piece.id)}>
              ✨ {item.piece.title}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
