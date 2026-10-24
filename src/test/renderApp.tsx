import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { AppProviders } from '../app/AppProviders';
import { AppRoutes } from '../app/AppRoutes';
import { OUTFITS_STORAGE_KEY } from '../features/outfits/constants/outfits';
import type { Outfit } from '../features/outfits/types/outfit';
import { WORN_LOG_STORAGE_KEY } from '../features/calendar/constants/calendar';
import type { WornEntry } from '../features/calendar/types/wornLog';
import {
  ARCHIVE_STORAGE_KEY,
  TRASH_STORAGE_KEY,
  WARDROBE_STORAGE_KEY,
} from '../features/wardrobe/constants/wardrobe';
import type { ArchivedItem, TrashedItem, WardrobeItem } from '../features/wardrobe/types/wardrobe';

export interface StoredData {
  wardrobe?: WardrobeItem[];
  outfits?: Outfit[];
  wornLog?: WornEntry[];
  trash?: TrashedItem[];
  archive?: ArchivedItem[];
}

function seedStorage({ wardrobe, outfits, wornLog, trash, archive }: StoredData): void {
  if (wardrobe) localStorage.setItem(WARDROBE_STORAGE_KEY, JSON.stringify(wardrobe));
  if (outfits) localStorage.setItem(OUTFITS_STORAGE_KEY, JSON.stringify(outfits));
  if (wornLog) localStorage.setItem(WORN_LOG_STORAGE_KEY, JSON.stringify(wornLog));
  if (archive) localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(archive));
  if (trash) localStorage.setItem(TRASH_STORAGE_KEY, JSON.stringify(trash));
}

function readStorage<T>(key: string): T {
  return JSON.parse(localStorage.getItem(key) ?? '[]') as T;
}

export function readStoredWardrobe(): WardrobeItem[] {
  return readStorage<WardrobeItem[]>(WARDROBE_STORAGE_KEY);
}

export function readStoredOutfits(): Outfit[] {
  return readStorage<Outfit[]>(OUTFITS_STORAGE_KEY);
}

export function readStoredWornLog(): WornEntry[] {
  return readStorage<WornEntry[]>(WORN_LOG_STORAGE_KEY);
}

export function readStoredTrash(): TrashedItem[] {
  return readStorage<TrashedItem[]>(TRASH_STORAGE_KEY);
}

export function readStoredArchive(): ArchivedItem[] {
  return readStorage<ArchivedItem[]>(ARCHIVE_STORAGE_KEY);
}

export function renderApp(route: string, storedData: StoredData = {}) {
  seedStorage(storedData);
  const user = userEvent.setup();
  render(
    <AppProviders>
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>
    </AppProviders>,
  );
  return { user };
}
