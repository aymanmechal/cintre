import type { WornEntry } from '../../calendar/types/wornLog';
import type { Tastes } from '../../outfits/types/tastes';
import type { Outfit } from '../../outfits/types/outfit';
import type { ArchivedItem, TrashedItem, WardrobeItem } from '../../wardrobe/types/wardrobe';

export type PhotoDataUrls = Record<string, string>;

export interface Backup {
  version: number;
  exportedOn: string;
  wardrobe: WardrobeItem[];
  trash: TrashedItem[];
  archive: ArchivedItem[];
  outfits: Outfit[];
  wornLog: WornEntry[];
  photos: PhotoDataUrls;
  tastes?: Tastes;
}

export type BackupContent = Omit<Backup, 'version' | 'exportedOn'>;
