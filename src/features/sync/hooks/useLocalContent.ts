import { useMemo } from 'react';
import { useWornLog } from '../../calendar/context/useWornLog';
import { useOutfits } from '../../outfits/context/useOutfits';
import { readStoredTastes, saveTastes } from '../../outfits/utils/tasteStorage';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import type { CloudContent } from '../types/sync';

export const EMPTY_CONTENT: CloudContent = {
  wardrobe: [],
  trash: [],
  archive: [],
  outfits: [],
  wornLog: [],
};

export interface LocalContent {
  content: CloudContent;
  applyCloudContent: (content: CloudContent) => void;
}

export function useLocalContent(): LocalContent {
  const { items, trash, archive, replaceWardrobe } = useWardrobe();
  const { outfits, replaceOutfits } = useOutfits();
  const { entries, replaceEntries } = useWornLog();

  const content = useMemo(
    () => ({
      wardrobe: items,
      trash,
      archive,
      outfits,
      wornLog: entries,
      tastes: readStoredTastes(),
    }),
    [items, trash, archive, outfits, entries],
  );

  const applyCloudContent = useMemo(
    () => (cloud: CloudContent) => {
      replaceWardrobe({ items: cloud.wardrobe, trash: cloud.trash, archive: cloud.archive });
      replaceOutfits(cloud.outfits);
      replaceEntries(cloud.wornLog);
      if (cloud.tastes) saveTastes(cloud.tastes);
    },
    [replaceWardrobe, replaceOutfits, replaceEntries],
  );

  return { content, applyCloudContent };
}
