import { useState, type FormEvent } from 'react';
import type { OutfitSlot } from '../constants/outfits';
import { useOutfits } from '../contexts/outfits/useOutfits';
import type { OutfitSelection } from '../types/outfit';
import {
  buildDefaultOutfitName,
  createEmptySelection,
  createOutfitId,
  hasEnoughPieces,
  toPieceIds,
} from '../utils/outfits';

export interface OutfitBuilderState {
  name: string;
  selection: OutfitSelection;
  defaultName: string;
  hasTriedToSave: boolean;
  isSelectionValid: boolean;
  hasJustSaved: boolean;
  changeName: (name: string) => void;
  togglePiece: (slot: OutfitSlot, pieceId: number) => void;
  save: (event: FormEvent<HTMLFormElement>) => void;
}

export function useOutfitBuilder(): OutfitBuilderState {
  const { outfits, createOutfit } = useOutfits();
  const [name, setName] = useState('');
  const [selection, setSelection] = useState(createEmptySelection);
  const [hasTriedToSave, setHasTriedToSave] = useState(false);
  const [hasJustSaved, setHasJustSaved] = useState(false);

  const defaultName = buildDefaultOutfitName(outfits.length);
  const isSelectionValid = hasEnoughPieces(selection);

  function togglePiece(slot: OutfitSlot, pieceId: number) {
    setHasJustSaved(false);
    setSelection((current) => ({ ...current, [slot]: current[slot] === pieceId ? null : pieceId }));
  }

  function resetBuilder() {
    setName('');
    setSelection(createEmptySelection());
    setHasTriedToSave(false);
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasTriedToSave(true);
    if (!isSelectionValid) return;
    createOutfit({
      id: createOutfitId(),
      name: name.trim() || defaultName,
      pieceIds: toPieceIds(selection),
    });
    resetBuilder();
    setHasJustSaved(true);
  }

  return {
    name,
    selection,
    defaultName,
    hasTriedToSave,
    isSelectionValid,
    hasJustSaved,
    changeName: setName,
    togglePiece,
    save,
  };
}
