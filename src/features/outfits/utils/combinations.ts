import {
  IDEA_SLOTS,
  OPPOSITE_SEASON,
  OUTFIT_SLOT_BY_PIECE_TYPE,
  OUTFIT_SLOT_CAPACITY,
  OUTFIT_SLOTS,
  OutfitSlot,
} from '../constants/outfits';
import { Availability, OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import type { Outfit, OutfitIdea } from '../types/outfit';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { selectAccentColors, toHarmony } from './colorHarmony';
import { EMPTY_TASTES } from '../constants/tastes';
import type { Tastes } from '../types/tastes';
import { buildPieceAffinity, scoreAffinity, withoutDisliked } from './tastes';

type Combination = WardrobeItem[];

function slotOf(item: WardrobeItem): OutfitSlot {
  return OUTFIT_SLOT_BY_PIECE_TYPE[item.piece.pieceType];
}

function isDress(item: WardrobeItem): boolean {
  return item.piece.pieceType === PieceType.Dresses;
}

function hasSlot(combination: Combination, slot: OutfitSlot): boolean {
  return combination.some((item) => slotOf(item) === slot);
}

export function isWearable(item: WardrobeItem): boolean {
  return item.status === OwnershipStatus.Owned && item.availability === Availability.Available;
}

function areSeasonsCompatible(first: WardrobeItem, second: WardrobeItem): boolean {
  if (first.piece.season === null || second.piece.season === null) return true;
  return OPPOSITE_SEASON[first.piece.season] !== second.piece.season;
}

function isDressConflict(item: WardrobeItem, combination: Combination): boolean {
  if (isDress(item)) return hasSlot(combination, OutfitSlot.Bottom);
  return slotOf(item) === OutfitSlot.Bottom && combination.some(isDress);
}

function fitsCombination(item: WardrobeItem, combination: Combination): boolean {
  if (isDressConflict(item, combination)) return false;
  return combination.every((other) => areSeasonsCompatible(item, other));
}

function extendCombination(combination: Combination, candidates: WardrobeItem[]): Combination[] {
  const extensions = candidates
    .filter((candidate) => fitsCombination(candidate, combination))
    .map((candidate) => [...combination, candidate]);
  return extensions.length > 0 ? extensions : [combination];
}

function countInSlot(items: readonly WardrobeItem[], slot: OutfitSlot): number {
  return items.filter((item) => slotOf(item) === slot).length;
}

export function canKeepTogether(anchors: readonly WardrobeItem[]): boolean {
  const fitsCapacity = OUTFIT_SLOTS.every(
    (slot) => countInSlot(anchors, slot) <= OUTFIT_SLOT_CAPACITY[slot],
  );
  return (
    fitsCapacity &&
    anchors.every((anchor, index) => fitsCombination(anchor, anchors.slice(0, index)))
  );
}

function buildCombinations(
  anchors: readonly WardrobeItem[],
  wearableItems: WardrobeItem[],
): Combination[] {
  const slotsToFill = IDEA_SLOTS.filter((slot) => countInSlot(anchors, slot) === 0);
  return slotsToFill.reduce<Combination[]>(
    (combinations, slot) => {
      const candidates = wearableItems.filter((item) => slotOf(item) === slot);
      return combinations.flatMap((combination) => extendCombination(combination, candidates));
    },
    [[...anchors]],
  );
}

function isCompleteOutfit(combination: Combination): boolean {
  const hasBottom = hasSlot(combination, OutfitSlot.Bottom) || combination.some(isDress);
  return hasSlot(combination, OutfitSlot.Top) && hasBottom;
}

function countFavorites(combination: Combination): number {
  return combination.filter((item) => item.piece.isFavorite).length;
}

function scoreCombination(combination: Combination, affinity: ReadonlyMap<number, number>): number {
  const extraAccentColors = Math.max(selectAccentColors(combination).length - 1, 0);
  const pieceIds = combination.map((item) => item.piece.id);
  return countFavorites(combination) - extraAccentColors * 2 + scoreAffinity(pieceIds, affinity);
}

function sortBySlot(combination: Combination): WardrobeItem[] {
  const slotIndex = (item: WardrobeItem) => OUTFIT_SLOTS.indexOf(slotOf(item));
  return [...combination].sort((first, second) => slotIndex(first) - slotIndex(second));
}

export function buildOutfitKey(pieceIds: readonly number[]): string {
  return [...pieceIds].sort((first, second) => first - second).join('-');
}

export function toIdea(combination: Combination): OutfitIdea {
  const items = sortBySlot(combination);
  return {
    key: buildOutfitKey(items.map((item) => item.piece.id)),
    items,
    harmony: toHarmony(selectAccentColors(combination).length),
  };
}

export function buildOutfitIdeas(
  anchors: readonly WardrobeItem[],
  items: readonly WardrobeItem[],
  outfits: readonly Outfit[],
  tastes: Tastes = EMPTY_TASTES,
): OutfitIdea[] {
  if (anchors.length === 0 || !canKeepTogether(anchors)) return [];
  const savedKeys = new Set(outfits.map((outfit) => buildOutfitKey(outfit.pieceIds)));
  const affinity = buildPieceAffinity(tastes, outfits);
  const ideas = buildCombinations(anchors, items.filter(isWearable))
    .filter(isCompleteOutfit)
    .sort((first, second) => scoreCombination(second, affinity) - scoreCombination(first, affinity))
    .map(toIdea)
    .filter((idea) => !savedKeys.has(idea.key));
  return withoutDisliked(ideas, tastes);
}

export function pickRandomIdea(
  items: readonly WardrobeItem[],
  outfits: readonly Outfit[],
  random: () => number = Math.random,
  tastes: Tastes = EMPTY_TASTES,
): OutfitIdea | null {
  const anchors = items.filter(isWearable).filter((item) => IDEA_SLOTS.includes(slotOf(item)));
  const ideas = anchors.flatMap((anchor) => buildOutfitIdeas([anchor], items, outfits, tastes));
  return ideas[Math.floor(random() * ideas.length)] ?? null;
}

export function toIdeaPieceIds(idea: OutfitIdea): number[] {
  return idea.items.map((item) => item.piece.id);
}

export function countOutfitsWithPiece(outfits: readonly Outfit[], pieceId: number): number {
  return outfits.filter((outfit) => outfit.pieceIds.includes(pieceId)).length;
}

export function selectOrphanItems(
  items: readonly WardrobeItem[],
  outfits: readonly Outfit[],
): WardrobeItem[] {
  const usedPieceIds = new Set(outfits.flatMap((outfit) => outfit.pieceIds));
  return items.filter(
    (item) => item.status === OwnershipStatus.Owned && !usedPieceIds.has(item.piece.id),
  );
}
