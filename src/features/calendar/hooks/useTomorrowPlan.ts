import { useState } from 'react';
import { useOutfits } from '../../outfits/context/useOutfits';
import { addDays } from '../../suitcase/utils/tripDates';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { toIsoDate } from '../../wardrobe/utils/wornDates';
import { useWornLog } from '../context/useWornLog';
import type { TomorrowPlan } from '../types/tomorrowPlan';
import { buildTomorrowPlan } from '../utils/tomorrowPlan';

export interface TomorrowPlanState {
  tomorrow: string;
  plan: TomorrowPlan | null;
  isChecked: (pieceId: number) => boolean;
  toggle: (pieceId: number) => void;
}

export function useTomorrowPlan(today: Date): TomorrowPlanState {
  const { entries } = useWornLog();
  const { outfits } = useOutfits();
  const { items } = useWardrobe();
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const tomorrow = addDays(toIsoDate(today), 1);

  function toggle(pieceId: number) {
    setCheckedIds((ids) =>
      ids.includes(pieceId) ? ids.filter((id) => id !== pieceId) : [...ids, pieceId],
    );
  }

  return {
    tomorrow,
    plan: buildTomorrowPlan(entries, outfits, items, tomorrow),
    isChecked: (pieceId) => checkedIds.includes(pieceId),
    toggle,
  };
}
