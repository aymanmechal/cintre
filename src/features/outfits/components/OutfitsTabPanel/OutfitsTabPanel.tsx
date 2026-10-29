import type { ReactNode } from 'react';
import type { OutfitsTab } from '../../constants/outfitsTab';
import { toOutfitsPanelId, toOutfitsTabId } from '../../utils/outfitsTab';
import styles from './OutfitsTabPanel.module.css';

interface OutfitsTabPanelProps {
  tab: OutfitsTab;
  activeTab: OutfitsTab;
  children: ReactNode;
}

export function OutfitsTabPanel({ tab, activeTab, children }: OutfitsTabPanelProps) {
  return (
    <div
      id={toOutfitsPanelId(tab)}
      role="tabpanel"
      className={styles.panel}
      aria-labelledby={toOutfitsTabId(tab)}
      hidden={tab !== activeTab}
    >
      {children}
    </div>
  );
}
