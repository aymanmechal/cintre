import { useState } from 'react';
import { DEFAULT_OUTFITS_TAB, type OutfitsTab } from '../constants/outfitsTab';

export interface OutfitsTabState {
  activeTab: OutfitsTab;
  selectTab: (tab: OutfitsTab) => void;
}

export function useOutfitsTab(): OutfitsTabState {
  const [activeTab, setActiveTab] = useState(DEFAULT_OUTFITS_TAB);

  return { activeTab, selectTab: setActiveTab };
}
