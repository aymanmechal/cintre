import { PERIOD_PREFIX_LENGTH, type WrappedPeriod } from '../constants/wrapped';
import type { Wrapped, WornOutfit, WornPiece } from '../types/wrapped';
import type { WornEntry } from '../../calendar/types/wornLog';
import { countWearsByPiece } from '../../calendar/utils/wearCounts';
import { OUTFIT_SLOT_BY_PIECE_TYPE, OutfitSlot } from '../../outfits/constants/outfits';
import type { Outfit } from '../../outfits/types/outfit';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { isFutureDate, toIsoDate } from '../../wardrobe/utils/wornDates';
import type { PieceColor } from '../../../shared/pieces/constants/colors';

export function toPeriodPrefix(period: WrappedPeriod, today: Date): string {
  return toIsoDate(today).slice(0, PERIOD_PREFIX_LENGTH[period]);
}

export function selectPeriodEntries(
  entries: readonly WornEntry[],
  prefix: string,
  today: Date,
): WornEntry[] {
  return entries.filter(
    (entry) => entry.date.startsWith(prefix) && !isFutureDate(entry.date, today),
  );
}

function pickMax<Value>(values: readonly Value[], toScore: (value: Value) => number): Value | null {
  return values.reduce<Value | null>(
    (best, value) => (best === null || toScore(value) > toScore(best) ? value : best),
    null,
  );
}

function selectTopPiece(owned: readonly WardrobeItem[], counts: ReadonlyMap<number, number>) {
  const wornPieces: WornPiece[] = owned
    .map((item) => ({ item, wearCount: counts.get(item.piece.id) ?? 0 }))
    .filter((wornPiece) => wornPiece.wearCount > 0);
  return pickMax(wornPieces, (wornPiece) => wornPiece.wearCount);
}

const CLOTHING_SLOTS: readonly OutfitSlot[] = [OutfitSlot.Top, OutfitSlot.Bottom];

export function isClothing(item: WardrobeItem): boolean {
  return CLOTHING_SLOTS.includes(OUTFIT_SLOT_BY_PIECE_TYPE[item.piece.pieceType]);
}

function selectTopOutfit(entries: readonly WornEntry[], outfits: readonly Outfit[]) {
  const wornOutfits: WornOutfit[] = outfits
    .map((outfit) => ({
      outfit,
      wearCount: entries.filter((entry) => entry.outfitId === outfit.id).length,
    }))
    .filter((wornOutfit) => wornOutfit.wearCount > 0);
  return pickMax(wornOutfits, (wornOutfit) => wornOutfit.wearCount);
}

function selectTopColor(
  owned: readonly WardrobeItem[],
  counts: ReadonlyMap<number, number>,
): PieceColor | null {
  const wearsByColor = new Map<PieceColor, number>();
  owned.forEach(({ piece }) => {
    if (piece.color === null) return;
    wearsByColor.set(
      piece.color,
      (wearsByColor.get(piece.color) ?? 0) + (counts.get(piece.id) ?? 0),
    );
  });
  const best = pickMax([...wearsByColor], ([, wearCount]) => wearCount);
  return best !== null && best[1] > 0 ? best[0] : null;
}

function selectPurchases(owned: readonly WardrobeItem[], prefix: string): WardrobeItem[] {
  return owned.filter((item) => item.piece.boughtOn?.startsWith(prefix));
}

export function buildWrapped(
  items: readonly WardrobeItem[],
  outfits: readonly Outfit[],
  entries: readonly WornEntry[],
  period: WrappedPeriod,
  today: Date,
): Wrapped {
  const prefix = toPeriodPrefix(period, today);
  const periodEntries = selectPeriodEntries(entries, prefix, today);
  const counts = countWearsByPiece(periodEntries, outfits, today);
  const owned = items.filter((item) => item.status === OwnershipStatus.Owned);
  const purchases = selectPurchases(owned, prefix);

  return {
    wornDayCount: new Set(periodEntries.map((entry) => entry.date)).size,
    topPiece: selectTopPiece(owned, counts),
    topClothing: selectTopPiece(owned.filter(isClothing), counts),
    topOutfit: selectTopOutfit(periodEntries, outfits),
    topColor: selectTopColor(owned, counts),
    forgottenCount: owned.filter((item) => !counts.has(item.piece.id)).length,
    purchaseCount: purchases.length,
    spent: purchases.reduce((total, item) => total + item.piece.price, 0),
  };
}

export function hasWornAnything(wrapped: Wrapped): boolean {
  return wrapped.wornDayCount > 0;
}
