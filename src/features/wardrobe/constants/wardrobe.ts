export enum OwnershipStatus {
  Owned = 'owned',
  Wanted = 'wanted',
}

export const OWNERSHIP_STATUS_LABELS: Record<OwnershipStatus, string> = {
  [OwnershipStatus.Owned]: "Je l'ai",
  [OwnershipStatus.Wanted]: 'Envie',
};

export const OWNERSHIP_STATUS_ICONS: Record<OwnershipStatus, string> = {
  [OwnershipStatus.Owned]: '✓',
  [OwnershipStatus.Wanted]: '♡',
};

export const OWNERSHIP_SECTION_TITLES: Record<OwnershipStatus, string> = {
  [OwnershipStatus.Owned]: 'Mes pièces',
  [OwnershipStatus.Wanted]: 'Mes envies',
};

export const OWNERSHIP_STATUSES = Object.values(OwnershipStatus);

export enum StorageLocation {
  Wardrobe = 'armoire',
  Dresser = 'commode',
  Drawer = 'tiroir',
  Suitcase = 'valise',
  ParentsHome = 'chez-mes-parents',
  Other = 'autre',
}

export const STORAGE_LOCATION_LABELS: Record<StorageLocation, string> = {
  [StorageLocation.Wardrobe]: 'Armoire',
  [StorageLocation.Dresser]: 'Commode',
  [StorageLocation.Drawer]: 'Tiroir',
  [StorageLocation.Suitcase]: 'Valise',
  [StorageLocation.ParentsHome]: 'Chez mes parents',
  [StorageLocation.Other]: 'Autre',
};

export const STORAGE_LOCATIONS = Object.values(StorageLocation);

export const DEFAULT_STORAGE_LOCATION = StorageLocation.Wardrobe;

export const FORGOTTEN_AFTER_DAYS = 30;

export const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export const WARDROBE_STORAGE_KEY = 'cintre.wardrobe';
