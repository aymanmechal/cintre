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
      <div className={styles.text}>
        <p className={styles.brand}>{brand}</p>
        <h2 className={styles.title}>
          <Link className={styles.stretchedLink} to={detailUrl}>
            {title}
          </Link>
        </h2>
      </div>
      <p className={styles.price}>{price}</p>
    </div>
  );
}
