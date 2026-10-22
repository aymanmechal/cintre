import { useToday } from '../../../hooks/useToday';
import type { WardrobeItem } from '../../../types/wardrobe';
import { isForgotten } from '../../../utils/wornDates';
import { LastWornText } from './LastWornText';
import { MarkWornButton } from './MarkWornButton';
import styles from './WornStatus.module.css';

interface WornStatusProps {
  item: WardrobeItem;
}

export function WornStatus({ item }: WornStatusProps) {
  const today = useToday();

  return (
    <div className={styles.status}>
      <LastWornText
        lastWornOn={item.lastWornOn}
        isForgotten={isForgotten(item, today)}
        today={today}
      />
      <MarkWornButton pieceId={item.piece.id} />
    </div>
  );
}
