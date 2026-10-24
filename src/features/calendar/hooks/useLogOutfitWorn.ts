import { useState, type FormEvent } from 'react';
import { useOutfits } from '../../outfits/context/useOutfits';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { useWornLog } from '../context/useWornLog';
import { isFutureDate } from '../../wardrobe/utils/wornDates';
import { findRepeatedPieceIds } from '../utils/repeatedPieces';
import { createWornEntryId } from '../utils/wornLog';
import { useToday } from '../../../shared/hooks/useToday';

export interface LogOutfitWornState {
  outfitId: string;
  isPlanning: boolean;
  hasJustSaved: boolean;
  repeatedTitles: string[];
  changeOutfit: (outfitId: string) => void;
  save: (event: FormEvent<HTMLFormElement>) => void;
}

export function useLogOutfitWorn(date: string): LogOutfitWornState {
  const { outfits } = useOutfits();
  const { items, markPiecesWorn } = useWardrobe();
  const { entries, addEntry } = useWornLog();
  const today = useToday();
  const [chosenOutfitId, setChosenOutfitId] = useState('');
  const [hasJustSaved, setHasJustSaved] = useState(false);

  const selectedOutfit = outfits.find((outfit) => outfit.id === chosenOutfitId) ?? outfits[0];
  const isPlanning = isFutureDate(date, today);

  const repeatedPieceIds = selectedOutfit
    ? findRepeatedPieceIds(entries, outfits, date, selectedOutfit)
    : [];
  const repeatedTitles = items
    .filter((item) => repeatedPieceIds.includes(item.piece.id))
    .map((item) => item.piece.title);

  function changeOutfit(outfitId: string) {
    setHasJustSaved(false);
    setChosenOutfitId(outfitId);
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedOutfit === undefined) return;
    addEntry({ id: createWornEntryId(), date, outfitId: selectedOutfit.id });
    if (!isPlanning) markPiecesWorn(selectedOutfit.pieceIds, date);
    setHasJustSaved(true);
  }

  return {
    outfitId: selectedOutfit?.id ?? '',
    isPlanning,
    hasJustSaved,
    repeatedTitles,
    changeOutfit,
    save,
  };
}
