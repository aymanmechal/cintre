import {
  COLD_BELOW_TEMPERATURE,
  HOT_FROM_TEMPERATURE,
  RAINY_FROM_PROBABILITY,
  SEASON_SET_ASIDE_BY_FEEL,
  WeatherFeel,
} from '../constants/weather';
import type { WeatherSummary } from '../types/weather';
import { OUTFIT_SLOT_BY_PIECE_TYPE, OutfitSlot } from '../../outfits/constants/outfits';
import type { Outfit, OutfitIdea } from '../../outfits/types/outfit';
import { buildOutfitIdeas, isWearable } from '../../outfits/utils/combinations';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import { Season } from '../../../shared/pieces/constants/seasons';

export function toWeatherFeel(weather: WeatherSummary): WeatherFeel {
  const averageTemperature = (weather.minTemperature + weather.maxTemperature) / 2;
  if (averageTemperature >= HOT_FROM_TEMPERATURE) return WeatherFeel.Hot;
  if (averageTemperature < COLD_BELOW_TEMPERATURE) return WeatherFeel.Cold;
  return WeatherFeel.Mild;
}

export function isRainy(weather: WeatherSummary): boolean {
  return weather.rainProbability >= RAINY_FROM_PROBABILITY;
}

function slotOf(item: WardrobeItem): OutfitSlot {
  return OUTFIT_SLOT_BY_PIECE_TYPE[item.piece.pieceType];
}

function isSummerShoes(item: WardrobeItem): boolean {
  return slotOf(item) === OutfitSlot.Shoes && item.piece.season === Season.Summer;
}

function isSetAside(item: WardrobeItem, weather: WeatherSummary): boolean {
  const setAsideSeason = SEASON_SET_ASIDE_BY_FEEL[toWeatherFeel(weather)];
  return setAsideSeason !== null && item.piece.season === setAsideSeason;
}

export function fitsWeather(item: WardrobeItem, weather: WeatherSummary): boolean {
  if (isSetAside(item, weather)) return false;
  return !(isRainy(weather) && isSummerShoes(item));
}

export function buildWeatherIdeas(
  items: readonly WardrobeItem[],
  outfits: readonly Outfit[],
  weather: WeatherSummary,
): OutfitIdea[] {
  const suitableItems = items.filter((item) => fitsWeather(item, weather));
  return suitableItems
    .filter((item) => isWearable(item) && slotOf(item) === OutfitSlot.Top)
    .map((top) => buildOutfitIdeas([top], suitableItems, outfits)[0])
    .filter((idea) => idea !== undefined);
}

export function pickWeatherIdea(
  ideas: readonly OutfitIdea[],
  today: Date,
  shuffleCount: number,
): OutfitIdea | null {
  if (ideas.length === 0) return null;
  return ideas[(today.getDate() + shuffleCount) % ideas.length];
}
