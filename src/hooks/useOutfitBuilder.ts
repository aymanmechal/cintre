import { useState, type FormEvent } from 'react';
import { FIRST_OUTFIT_SLOT, type OutfitSlot } from '../constants/outfits';
import { useOutfits } from '../contexts/outfits/useOutfits';
import type { OutfitSelection } from '../types/outfit';
import {
  buildDefaultOutfitName,
  countMissingPieces,
  createEmptySelection,
  createOutfitId,
  findNextEmptySlot,
  isSingleSlot,
  removePieceFromSlot,
  toPieceIds,
  togglePieceInSlot,
} from '../utils/outfits';

export interface OutfitBuilderState {
  name: string;
  selection: OutfitSelection;
  activeSlot: OutfitSlot;
  defaultName: string;
  missingPieceCount: number;
  hasJustSaved: boolean;
  changeName: (name: string) => void;
  selectSlot: (slot: OutfitSlot) => void;
  togglePiece: (pieceId: number) => void;
  clearPiece: (slot: OutfitSlot, pieceId: number) => void;
  save: (event: FormEvent<HTMLFormElement>) => void;
}

export function useOutfitBuilder(): OutfitBuilderState {
  const { outfits, createOutfit } = useOutfits();
  const [name, setName] = useState('');
  const [selection, setSelection] = useState(createEmptySelection);
  const [activeSlot, setActiveSlot] = useState<OutfitSlot>(FIRST_OUTFIT_SLOT);
  const [hasJustSaved, setHasJustSaved] = useState(false);

  const defaultName = buildDefaultOutfitName(outfits.length);
  const missingPieceCount = countMissingPieces(selection);

  function updateSelection(nextSelection: OutfitSelection) {
    setHasJustSaved(false);
    setSelection(nextSelection);
  }

  function togglePiece(pieceId: number) {
    const nextSelection = togglePieceInSlot(selection, activeSlot, pieceId);
    updateSelection(nextSelection);
    const wasAdded = nextSelection[activeSlot].includes(pieceId);
    if (wasAdded && isSingleSlot(activeSlot)) {
      setActiveSlot(findNextEmptySlot(nextSelection, activeSlot));
    }
  }

  function clearPiece(slot: OutfitSlot, pieceId: number) {
    updateSelection(removePieceFromSlot(selection, slot, pieceId));
    setActiveSlot(slot);
  }

  function resetBuilder() {
    setName('');
    setSelection(createEmptySelection());
    setActiveSlot(FIRST_OUTFIT_SLOT);
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (missingPieceCount > 0) return;
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
    activeSlot,
    defaultName,
    missingPieceCount,
    hasJustSaved,
    changeName: setName,
    selectSlot: setActiveSlot,
    togglePiece,
    clearPiece,
    save,
  };
}
