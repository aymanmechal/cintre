import { OUTFIT_READINESS_LABELS, type OutfitReadiness } from '../../constants/outfits';
import styles from './OutfitReadinessBadge.module.css';

interface OutfitReadinessBadgeProps {
  readiness: OutfitReadiness;
}

export function OutfitReadinessBadge({ readiness }: OutfitReadinessBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[readiness]}`}>
      {OUTFIT_READINESS_LABELS[readiness]}
    </span>
  );
}
