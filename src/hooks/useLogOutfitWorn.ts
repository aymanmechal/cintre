import { useState, type FormEvent } from 'react';
import { FUTURE_DATE_MESSAGE } from '../constants/calendar';
import { useOutfits } from '../contexts/outfits/useOutfits';
import { useWardrobe } from '../contexts/wardrobe/useWardrobe';
import { useWornLog } from '../contexts/wornLog/useWornLog';
import { createWornEntryId } from '../utils/wornLog';
import { toIsoDate } from '../utils/wornDates';
import { useToday } from './useToday';

export interface LogOutfitWornState {
  date: string;
  outfitId: string;
  dateError: string | undefined;
  canSave: boolean;
  hasJustSaved: boolean;
  changeDate: (date: string) => void;
  changeOutfit: (outfitId: string) => void;
  save: (event: FormEvent<HTMLFormElement>) => void;
}

export function useLogOutfitWorn(): LogOutfitWornState {
  const { outfits } = useOutfits();
  const { markPiecesWorn } = useWardrobe();
  const { addEntry } = useWornLog();
  const todayIsoDate = toIsoDate(useToday());
  const [date, setDate] = useState(todayIsoDate);
  const [chosenOutfitId, setChosenOutfitId] = useState('');
  const [hasJustSaved, setHasJustSaved] = useState(false);

  const selectedOutfit = outfits.find((outfit) => outfit.id === chosenOutfitId) ?? outfits[0];
  const dateError = date > todayIsoDate ? FUTURE_DATE_MESSAGE : undefined;
  const canSave = selectedOutfit !== undefined && date !== '' && dateError === undefined;

  function changeDate(newDate: string) {
    setHasJustSaved(false);
    setDate(newDate);
  }

  function changeOutfit(outfitId: string) {
    setHasJustSaved(false);
    setChosenOutfitId(outfitId);
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSave) return;
    addEntry({ id: createWornEntryId(), date, outfitId: selectedOutfit.id });
    markPiecesWorn(selectedOutfit.pieceIds, date);
    setHasJustSaved(true);
  }

  return {
    date,
    outfitId: selectedOutfit?.id ?? '',
    dateError,
    canSave,
    hasJustSaved,
    changeDate,
    changeOutfit,
    save,
  };
}
