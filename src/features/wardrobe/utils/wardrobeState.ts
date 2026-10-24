import {
  ARCHIVE_STORAGE_KEY,
  TRASH_STORAGE_KEY,
  WARDROBE_STORAGE_KEY,
} from '../constants/wardrobe';
import type { WardrobeState } from '../types/wardrobe';
import { removeExpiredItems } from './trash';
import { loadStoredArchive, loadStoredTrash, loadStoredWardrobe } from './wardrobeStorage';

export function loadWardrobeState(today: Date): WardrobeState {
  return {
    items: loadStoredWardrobe(WARDROBE_STORAGE_KEY),
    archive: loadStoredArchive(ARCHIVE_STORAGE_KEY),
    trash: removeExpiredItems(loadStoredTrash(TRASH_STORAGE_KEY), today),
  };
}
