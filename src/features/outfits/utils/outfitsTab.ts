import type { OutfitsTab } from '../constants/outfitsTab';

export function toOutfitsTabId(tab: OutfitsTab): string {
  return `outfits-tab-${tab}`;
}

export function toOutfitsPanelId(tab: OutfitsTab): string {
  return `outfits-panel-${tab}`;
}
