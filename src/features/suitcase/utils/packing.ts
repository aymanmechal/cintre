import { DAYS_PER_BOTTOM, DAYS_PER_TOP, SHOES_PER_TRIP } from '../constants/suitcase';
import type { SuitcaseDay, SuitcasePlan } from '../types/suitcase';
import {
  NEUTRAL_COLORS,
  OUTFIT_SLOT_BY_PIECE_TYPE,
  OutfitSlot,
} from '../../outfits/constants/outfits';
import { isWearable } from '../../outfits/utils/combinations';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import type { WeatherSummary } from '../../weather/types/weather';
import { fitsWeather } from '../../weather/utils/weatherOutfit';
import { PieceType } from '../../../shared/pieces/constants/categories';

function isDress(item: WardrobeItem): boolean {
  return item.piece.pieceType === PieceType.Dresses;
}

function isNeutral(item: WardrobeItem): boolean {
  return item.piece.color !== null && NEUTRAL_COLORS.includes(item.piece.color);
}

function compareForTrip(first: WardrobeItem, second: WardrobeItem): number {
  const favoriteOrder = Number(second.piece.isFavorite) - Number(first.piece.isFavorite);
  return favoriteOrder || Number(isNeutral(second)) - Number(isNeutral(first));
}

function selectCandidates(
  items: readonly WardrobeItem[],
  slot: OutfitSlot,
  weather: WeatherSummary | null,
): WardrobeItem[] {
  return items
    .filter((item) => isWearable(item) && OUTFIT_SLOT_BY_PIECE_TYPE[item.piece.pieceType] === slot)
    .filter((item) => weather === null || fitsWeather(item, weather))
    .sort(compareForTrip);
}

function takeForDays(
  candidates: readonly WardrobeItem[],
  dayCount: number,
  daysPerPiece: number,
): WardrobeItem[] {
  return candidates.slice(0, Math.ceil(dayCount / daysPerPiece));
}

function countBottomDaysBefore(dayTops: readonly WardrobeItem[], dayIndex: number): number {
  return dayTops.slice(0, dayIndex).filter((top) => !isDress(top)).length;
}

function buildDays(
  dates: readonly string[],
  dayTops: readonly WardrobeItem[],
  bottoms: readonly WardrobeItem[],
  shoes: readonly WardrobeItem[],
): SuitcaseDay[] {
  return dates.map((isoDate, index) => {
    const top = dayTops[index];
    const bottom = bottoms[countBottomDaysBefore(dayTops, index) % bottoms.length];
    const items = isDress(top) ? [top, ...shoes] : [top, bottom, ...shoes];
    return { isoDate, items };
  });
}

export function buildSuitcasePlan(
  items: readonly WardrobeItem[],
  dates: readonly string[],
  weather: WeatherSummary | null,
): SuitcasePlan | null {
  const bottoms = selectCandidates(items, OutfitSlot.Bottom, weather);
  const allTops = selectCandidates(items, OutfitSlot.Top, weather);
  const tops = bottoms.length > 0 ? allTops : allTops.filter(isDress);
  if (tops.length === 0 || dates.length === 0) return null;

  const packedTops = takeForDays(tops, dates.length, DAYS_PER_TOP);
  const dayTops = dates.map((_, index) => packedTops[index % packedTops.length]);
  const bottomDayCount = countBottomDaysBefore(dayTops, dayTops.length);
  const packedBottoms = takeForDays(bottoms, bottomDayCount, DAYS_PER_BOTTOM);
  const packedShoes = selectCandidates(items, OutfitSlot.Shoes, weather).slice(0, SHOES_PER_TRIP);

  return {
    pieces: [...packedTops, ...packedBottoms, ...packedShoes],
    days: buildDays(dates, dayTops, packedBottoms, packedShoes),
  };
}

export function countPackedPieces(plan: SuitcasePlan, packedPieceIds: readonly number[]): number {
  return plan.pieces.filter((item) => packedPieceIds.includes(item.piece.id)).length;
}
