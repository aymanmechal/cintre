import { MAX_TRIP_DAYS, MIN_TRIP_DAYS, SUITCASE_STORAGE_KEY } from '../constants/suitcase';
import type { Suitcase, Trip } from '../types/suitcase';
import { parseWeatherPlace } from '../../weather/utils/weatherPlace';
import { isRecord } from '../../../shared/utils/isRecord';
import { readJsonFromStorage } from '../../../shared/utils/storage';

function isValidDayCount(value: unknown): value is number {
  return (
    Number.isInteger(value) && Number(value) >= MIN_TRIP_DAYS && Number(value) <= MAX_TRIP_DAYS
  );
}

function parseTrip(value: unknown): Trip | null {
  if (!isRecord(value)) return null;
  const place = parseWeatherPlace(value.place);
  const { startDate, dayCount } = value;
  if (place === null || typeof startDate !== 'string' || !isValidDayCount(dayCount)) return null;
  return { place, startDate, dayCount };
}

function parsePieceIds(value: unknown): number[] {
  return Array.isArray(value) ? value.filter((id) => typeof id === 'number') : [];
}

export function parseSuitcase(value: unknown): Suitcase | null {
  if (!isRecord(value)) return null;
  const trip = parseTrip(value.trip);
  return trip === null ? null : { trip, packedPieceIds: parsePieceIds(value.packedPieceIds) };
}

export function loadSuitcase(): Suitcase | null {
  return parseSuitcase(readJsonFromStorage(SUITCASE_STORAGE_KEY));
}

export function togglePackedPiece(suitcase: Suitcase, pieceId: number): Suitcase {
  const { packedPieceIds } = suitcase;
  const isPacked = packedPieceIds.includes(pieceId);
  return {
    ...suitcase,
    packedPieceIds: isPacked
      ? packedPieceIds.filter((id) => id !== pieceId)
      : [...packedPieceIds, pieceId],
  };
}
