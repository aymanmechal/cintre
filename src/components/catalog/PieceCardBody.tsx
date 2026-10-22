import { Link } from 'react-router';
import styles from './PieceCardBody.module.css';

interface PieceCardBodyProps {
  brand: string;
  title: string;
  price: string;
  detailUrl: string;
}

export function PieceCardBody({ brand, title, price, detailUrl }: PieceCardBodyProps) {
  return (
    <div className={styles.body}>
      <p className={styles.brand}>{brand}</p>
      <h2 className={styles.title}>
        <Link className={styles.stretchedLink} to={detailUrl}>
          {title}
        </Link>
      </h2>
      <p className={styles.price}>{price}</p>
    </div>
  );
}
