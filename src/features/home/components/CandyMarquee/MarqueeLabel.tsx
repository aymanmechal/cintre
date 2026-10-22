import { type PieceType, PIECE_TYPE_LABELS } from '../../../../shared/pieces/constants/categories';
import styles from './MarqueeLabel.module.css';

interface MarqueeLabelProps {
  pieceType: PieceType;
}

export function MarqueeLabel({ pieceType }: MarqueeLabelProps) {
  return (
    <li className={styles.label} data-piece-type={pieceType}>
      {PIECE_TYPE_LABELS[pieceType]}
    </li>
  );
}
