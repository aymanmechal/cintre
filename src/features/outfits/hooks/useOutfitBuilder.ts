import { useState, type FormEvent } from 'react';
import { FIRST_OUTFIT_SLOT, type OutfitSlot } from '../constants/outfits';
import type { Occasion } from '../constants/occasions';
import { useOutfits } from '../context/useOutfits';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { pickRandomIdea } from '../utils/combinations';
import { readStoredTastes } from '../utils/tasteStorage';
import type { OutfitSelection } from '../types/outfit';
import {
  buildDefaultOutfitName,
  countMissingPieces,
  createEmptySelection,
  createOutfitId,
  findNextEmptySlot,
  hasSamePieces,
  isSingleSlot,
  removePieceFromSlot,
  selectionFromItems,
  toPieceIds,
  togglePieceInSlot,
} from '../utils/outfits';

export interface OutfitBuilderState {
  name: string;
  occasion: Occasion | null;
  selection: OutfitSelection;
  activeSlot: OutfitSlot;
  defaultName: string;
  missingPieceCount: number;
  isDuplicate: boolean;
  hasJustSaved: boolean;
  hasNoRandomIdea: boolean;
  changeName: (name: string) => void;
  changeOccasion: (occasion: Occasion | null) => void;
  selectSlot: (slot: OutfitSlot) => void;
  togglePiece: (pieceId: number) => void;
  clearPiece: (slot: OutfitSlot, pieceId: number) => void;
  fillRandomOutfit: () => void;
  save: (event: FormEvent<HTMLFormElement>) => void;
}

export function useOutfitBuilder(): OutfitBuilderState {
  const { items } = useWardrobe();
  const { outfits, createOutfit } = useOutfits();
  const [name, setName] = useState('');
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [selection, setSelection] = useState(createEmptySelection);
  const [activeSlot, setActiveSlot] = useState<OutfitSlot>(FIRST_OUTFIT_SLOT);
  const [hasJustSaved, setHasJustSaved] = useState(false);
  const [hasNoRandomIdea, setHasNoRandomIdea] = useState(false);

  const defaultName = buildDefaultOutfitName(outfits.length);
  const missingPieceCount = countMissingPieces(selection);
  const isDuplicate = missingPieceCount === 0 && hasSamePieces(outfits, toPieceIds(selection));

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

  function fillRandomOutfit() {
    const idea = pickRandomIdea(items, outfits, Math.random, readStoredTastes());
    setHasNoRandomIdea(idea === null);
    if (idea === null) return;
    updateSelection(selectionFromItems(idea.items));
  }

  function resetBuilder() {
    setName('');
    setOccasion(null);
    setSelection(createEmptySelection());
    setActiveSlot(FIRST_OUTFIT_SLOT);
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (missingPieceCount > 0 || isDuplicate) return;
    createOutfit({
      id: createOutfitId(),
      name: name.trim() || defaultName,
      pieceIds: toPieceIds(selection),
      note: '',
      score: 0,
      occasion,
    });
    resetBuilder();
    setHasJustSaved(true);
  }

  return {
    name,
    occasion,
    selection,
    activeSlot,
    defaultName,
    missingPieceCount,
    isDuplicate,
    hasJustSaved,
    hasNoRandomIdea,
    changeName: setName,
    changeOccasion: setOccasion,
    selectSlot: setActiveSlot,
    togglePiece,
    clearPiece,
    fillRandomOutfit,
    save,
  };
}
