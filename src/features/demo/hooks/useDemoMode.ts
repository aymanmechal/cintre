import { useToday } from '../../../shared/hooks/useToday';
import { useOutfits } from '../../outfits/context/useOutfits';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import {
  buildDemoItems,
  buildDemoOutfits,
  hasDemoItems,
  removeDemoItems,
  removeDemoOutfits,
} from '../utils/demoData';

export interface DemoModeState {
  canStartDemo: boolean;
  isDemoActive: boolean;
  startDemo: () => void;
  stopDemo: () => void;
}

export function useDemoMode(): DemoModeState {
  const { items, trash, archive, replaceWardrobe } = useWardrobe();
  const { outfits, replaceOutfits } = useOutfits();
  const today = useToday();

  return {
    canStartDemo: items.length === 0 && trash.length === 0 && archive.length === 0,
    isDemoActive: hasDemoItems(items),
    startDemo: () => {
      replaceWardrobe({ items: buildDemoItems(today), trash, archive });
      replaceOutfits(buildDemoOutfits());
    },
    stopDemo: () => {
      replaceWardrobe({ items: removeDemoItems(items), trash, archive });
      replaceOutfits(removeDemoOutfits(outfits));
    },
  };
}
