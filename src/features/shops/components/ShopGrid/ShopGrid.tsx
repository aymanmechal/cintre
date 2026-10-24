import { SHOPS } from '../../constants/shops';
import { ShopCard } from '../ShopCard/ShopCard';
import styles from './ShopGrid.module.css';

export function ShopGrid() {
  return (
    <ul className={styles.grid}>
      {SHOPS.map((shop) => (
        <li key={shop.id}>
          <ShopCard shop={shop} />
        </li>
      ))}
    </ul>
  );
}
