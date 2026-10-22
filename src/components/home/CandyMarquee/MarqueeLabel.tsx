import type { PieceType } from '../../../constants/categories';
import { PIECE_TYPE_LABELS } from '../../../constants/categories';
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
