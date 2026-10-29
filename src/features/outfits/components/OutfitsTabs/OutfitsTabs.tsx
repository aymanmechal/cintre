import {
  OUTFITS_TABS,
  OUTFITS_TAB_LABELS,
  OUTFITS_TABS_LABEL,
  type OutfitsTab,
} from '../../constants/outfitsTab';
import { toOutfitsPanelId, toOutfitsTabId } from '../../utils/outfitsTab';
import styles from './OutfitsTabs.module.css';

interface OutfitsTabsProps {
  activeTab: OutfitsTab;
  onSelect: (tab: OutfitsTab) => void;
}

export function OutfitsTabs({ activeTab, onSelect }: OutfitsTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label={OUTFITS_TABS_LABEL}>
      {OUTFITS_TABS.map((tab) => (
        <button
          key={tab}
          id={toOutfitsTabId(tab)}
          type="button"
          role="tab"
          className={styles.tab}
          aria-selected={tab === activeTab}
          aria-controls={toOutfitsPanelId(tab)}
          onClick={() => onSelect(tab)}
        >
          {OUTFITS_TAB_LABELS[tab]}
        </button>
      ))}
    </div>
  );
}
