import {
  MIN_PIECES_PER_OUTFIT,
  OUTFIT_SLOT_BY_PIECE_TYPE,
  OUTFIT_SLOTS,
  OutfitReadiness,
  type OutfitSlot,
} from '../constants/outfits';
import { OwnershipStatus } from '../constants/wardrobe';
import type { Outfit, OutfitSelection } from '../types/outfit';
import type { WardrobeItem } from '../types/wardrobe';
import { findWardrobeItem } from './wardrobe';

export function createEmptySelection(): OutfitSelection {
  return Object.fromEntries(OUTFIT_SLOTS.map((slot) => [slot, null])) as OutfitSelection;
}

export function selectItemsForSlot(
  items: readonly WardrobeItem[],
  slot: OutfitSlot,
): WardrobeItem[] {
  return items.filter((item) => OUTFIT_SLOT_BY_PIECE_TYPE[item.piece.pieceType] === slot);
}

export function toPieceIds(selection: OutfitSelection): number[] {
  return OUTFIT_SLOTS.map((slot) => selection[slot]).filter((pieceId) => pieceId !== null);
}

export function hasEnoughPieces(selection: OutfitSelection): boolean {
  return toPieceIds(selection).length >= MIN_PIECES_PER_OUTFIT;
}

function isWardrobeItem(item: WardrobeItem | undefined): item is WardrobeItem {
  return item !== undefined;
}

export function resolveOutfitItems(outfit: Outfit, items: readonly WardrobeItem[]): WardrobeItem[] {
  return outfit.pieceIds.map((pieceId) => findWardrobeItem(items, pieceId)).filter(isWardrobeItem);
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
