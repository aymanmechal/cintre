import { useState } from 'react';
import { WrappedPeriod } from '../constants/wrapped';
import type { Wrapped } from '../types/wrapped';
import { buildWrapped } from '../utils/wrapped';
import { useWornLog } from '../../calendar/context/useWornLog';
import { useOutfits } from '../../outfits/context/useOutfits';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { useToday } from '../../../shared/hooks/useToday';

export interface WrappedState {
  period: WrappedPeriod;
  wrapped: Wrapped;
  changePeriod: (period: WrappedPeriod) => void;
}

export function useWrapped(): WrappedState {
  const { items } = useWardrobe();
  const { outfits } = useOutfits();
  const { entries } = useWornLog();
  const today = useToday();
  const [period, setPeriod] = useState(WrappedPeriod.Month);

  return {
    period,
    wrapped: buildWrapped(items, outfits, entries, period, today),
    changePeriod: setPeriod,
  };
}
