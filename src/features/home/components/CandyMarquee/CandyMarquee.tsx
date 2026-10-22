import { PIECE_TYPES } from '../../../../shared/pieces/constants/categories';
import { MarqueeLabel } from './MarqueeLabel';
import styles from './CandyMarquee.module.css';

export function CandyMarquee() {
  return (
    <div className={styles.marquee} aria-hidden="true">
      <ul className={styles.track}>
        {[...PIECE_TYPES, ...PIECE_TYPES].map((pieceType, index) => (
          <MarqueeLabel key={`${pieceType}-${index}`} pieceType={pieceType} />
        ))}
      </ul>
    </div>
  );
}
