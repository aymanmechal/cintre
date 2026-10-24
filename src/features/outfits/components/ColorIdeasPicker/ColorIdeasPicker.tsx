import { Link } from 'react-router';
import {
  PIECE_COLOR_LABELS,
  PIECE_COLOR_SWATCHES,
} from '../../../../shared/pieces/constants/colors';
import { buildColorIdeasUrl } from '../../../../shared/routes';
import { useWardrobe } from '../../../wardrobe/context/useWardrobe';
import { listWearableColors } from '../../utils/colorIdeas';
import styles from './ColorIdeasPicker.module.css';

export function ColorIdeasPicker() {
  const { items } = useWardrobe();
  const colors = listWearableColors(items);
  if (colors.length === 0) return null;

  return (
    <details className={styles.picker}>
      <summary className={styles.summary}>🎨 Une tenue autour d’une couleur</summary>
      <ul className={styles.colors}>
        {colors.map((color) => (
          <li key={color}>
            <Link className={styles.color} to={buildColorIdeasUrl(color)}>
              <span
                className={styles.swatch}
                style={{ background: PIECE_COLOR_SWATCHES[color] }}
                aria-hidden="true"
              />
              {PIECE_COLOR_LABELS[color]}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
