export enum OwnershipStatus {
  Owned = 'possedee',
  Wanted = 'souhaitee',
}

export const OWNERSHIP_STATUS_LABELS: Record<OwnershipStatus, string> = {
  [OwnershipStatus.Owned]: "Je l'ai",
  [OwnershipStatus.Wanted]: 'Je la veux',
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

export const WARDROBE_STORAGE_KEY = 'cintre.wardrobe';
