import { useOutfits } from '../../../contexts/outfits/useOutfits';
import { useWardrobe } from '../../../contexts/wardrobe/useWardrobe';
import type { WornEntry } from '../../../types/wornLog';
import { resolveOutfitItems } from '../../../utils/outfits';
import { findOutfit } from '../../../utils/wornLog';
import { NoWornEntries } from './NoWornEntries';
import { WornLogEntryCard } from './WornLogEntryCard';
import styles from './WornLogList.module.css';

interface WornLogListProps {
  entries: readonly WornEntry[];
  today: Date;
}

export function WornLogList({ entries, today }: WornLogListProps) {
  const { outfits } = useOutfits();
  const { items } = useWardrobe();

  if (entries.length === 0) return <NoWornEntries />;

  return (
    <ul className={styles.list}>
      {entries.map((entry) => {
        const outfit = findOutfit(outfits, entry.outfitId);
        return (
          <li key={entry.id}>
            <WornLogEntryCard
              entry={entry}
              outfit={outfit}
              outfitItems={outfit ? resolveOutfitItems(outfit, items) : []}
              today={today}
            />
          </li>
        );
      })}
    </ul>
  );
}
