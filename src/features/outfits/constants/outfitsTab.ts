export enum OutfitsTab {
  Create = 'creer',
  List = 'liste',
}

export const OUTFITS_TAB_LABELS: Record<OutfitsTab, string> = {
  [OutfitsTab.Create]: 'Créer',
  [OutfitsTab.List]: 'Mes tenues',
};

export const OUTFITS_TABS = Object.values(OutfitsTab);

export const DEFAULT_OUTFITS_TAB = OutfitsTab.Create;

export const OUTFITS_TABS_LABEL = 'Tenues';
