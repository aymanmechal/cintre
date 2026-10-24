import { SEASONS, type Season } from '../constants/seasons';

export function toSeason(value: string): Season | null {
  return SEASONS.find((season) => season === value) ?? null;
}
