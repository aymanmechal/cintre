import {
  MIN_PIECES_PER_OUTFIT,
  OUTFIT_SLOT_BY_PIECE_TYPE,
  OUTFIT_SLOT_CAPACITY,
  OUTFIT_SLOTS,
  OutfitReadiness,
  OutfitSlot,
} from '../constants/outfits';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import type { Outfit, OutfitSelection } from '../types/outfit';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { findWardrobeItem } from '../../wardrobe/utils/wardrobe';

export function createEmptySelection(): OutfitSelection {
  return {
    [OutfitSlot.Top]: [],
    [OutfitSlot.Bottom]: [],
    [OutfitSlot.Shoes]: [],
    [OutfitSlot.Accessory]: [],
  };
}

export function selectItemsForSlot(
  items: readonly WardrobeItem[],
  slot: OutfitSlot,
): WardrobeItem[] {
  return items.filter((item) => OUTFIT_SLOT_BY_PIECE_TYPE[item.piece.pieceType] === slot);
}

export function toPieceIds(selection: OutfitSelection): number[] {
  return OUTFIT_SLOTS.flatMap((slot) => selection[slot]);
}

export function formatPieceCount(count: number): string {
  return `${count} pièce${count > 1 ? 's' : ''}`;
}

export function countMissingPieces(selection: OutfitSelection): number {
  return Math.max(MIN_PIECES_PER_OUTFIT - toPieceIds(selection).length, 0);
}

export function buildMissingPiecesHint(missingPieceCount: number): string {
  return `Choisis encore ${formatPieceCount(missingPieceCount)} pour créer la tenue.`;
}

export function findNextEmptySlot(selection: OutfitSelection, currentSlot: OutfitSlot): OutfitSlot {
  const currentIndex = OUTFIT_SLOTS.indexOf(currentSlot);
  const slotsAfterCurrent = [
    ...OUTFIT_SLOTS.slice(currentIndex + 1),
    ...OUTFIT_SLOTS.slice(0, currentIndex),
  ];
  return slotsAfterCurrent.find((slot) => selection[slot].length === 0) ?? currentSlot;
}

function isWardrobeItem(item: WardrobeItem | undefined): item is WardrobeItem {
  return item !== undefined;
}

function resolvePieceIds(
  pieceIds: readonly number[],
  items: readonly WardrobeItem[],
): WardrobeItem[] {
  return pieceIds.map((pieceId) => findWardrobeItem(items, pieceId)).filter(isWardrobeItem);
}

export function resolveOutfitItems(outfit: Outfit, items: readonly WardrobeItem[]): WardrobeItem[] {
  return resolvePieceIds(outfit.pieceIds, items);
}

export function resolveSelectedItems(
  selection: OutfitSelection,
  items: readonly WardrobeItem[],
): WardrobeItem[] {
  return resolvePieceIds(toPieceIds(selection), items);
}

export function selectSlotItems(
  selection: OutfitSelection,
  slot: OutfitSlot,
  items: readonly WardrobeItem[],
): WardrobeItem[] {
  return resolvePieceIds(selection[slot], items);
}

export function isSingleSlot(slot: OutfitSlot): boolean {
  return OUTFIT_SLOT_CAPACITY[slot] === 1;
}

export function canAddAnotherPiece(selection: OutfitSelection, slot: OutfitSlot): boolean {
  const pieceCount = selection[slot].length;
  return pieceCount > 0 && pieceCount < OUTFIT_SLOT_CAPACITY[slot];
}

export function togglePieceInSlot(
  selection: OutfitSelection,
  slot: OutfitSlot,
  pieceId: number,
): OutfitSelection {
  const current = selection[slot];
  if (current.includes(pieceId)) {
    return { ...selection, [slot]: current.filter((id) => id !== pieceId) };
  }
  if (isSingleSlot(slot)) return { ...selection, [slot]: [pieceId] };
  if (current.length >= OUTFIT_SLOT_CAPACITY[slot]) return selection;
  return { ...selection, [slot]: [...current, pieceId] };
}

export function removePieceFromSlot(
  selection: OutfitSelection,
  slot: OutfitSlot,
  pieceId: number,
): OutfitSelection {
  return { ...selection, [slot]: selection[slot].filter((id) => id !== pieceId) };
}

function compareOwnedFirst(first: WardrobeItem, second: WardrobeItem): number {
  const isFirstWanted = Number(first.status === OwnershipStatus.Wanted);
  const isSecondWanted = Number(second.status === OwnershipStatus.Wanted);
  return isFirstWanted - isSecondWanted;
}

export function selectShelfItems(items: readonly WardrobeItem[], slot: OutfitSlot): WardrobeItem[] {
  return selectItemsForSlot(items, slot).sort(compareOwnedFirst);
}

export function selectMissingItems(outfitItems: readonly WardrobeItem[]): WardrobeItem[] {
  return outfitItems.filter((item) => item.status === OwnershipStatus.Wanted);
}

export function getOutfitReadiness(outfitItems: readonly WardrobeItem[]): OutfitReadiness {
  return selectMissingItems(outfitItems).length > 0 ? OutfitReadiness.Goal : OutfitReadiness.Ready;
}

export function sumPrices(outfitItems: readonly WardrobeItem[]): number {
  return outfitItems.reduce((total, item) => total + item.piece.price, 0);
}

export function createOutfitId(): string {
  return crypto.randomUUID();
}

export function buildDefaultOutfitName(outfitCount: number): string {
  return `Tenue n°${outfitCount + 1}`;
}
