import type { WeatherPlace } from '../../weather/types/weather';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

export interface Trip {
  place: WeatherPlace;
  startDate: string;
  dayCount: number;
}

export interface Suitcase {
  trip: Trip;
  packedPieceIds: number[];
}

export interface TripForm {
  city: string;
  startDate: string;
  dayCount: string;
}

export interface SuitcaseDay {
  isoDate: string;
  items: WardrobeItem[];
}

export interface SuitcasePlan {
  pieces: WardrobeItem[];
  days: SuitcaseDay[];
}
