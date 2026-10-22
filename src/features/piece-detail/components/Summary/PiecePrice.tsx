import { formatPrice } from '../../../../shared/utils/format';
import styles from './PiecePrice.module.css';

interface PiecePriceProps {
  price: number;
}

export function PiecePrice({ price }: PiecePriceProps) {
  return <p className={styles.price}>{formatPrice(price)}</p>;
}
