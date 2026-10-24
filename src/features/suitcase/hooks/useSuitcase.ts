import { useState } from 'react';
import { SUITCASE_STORAGE_KEY, TripError } from '../constants/suitcase';
import type { Suitcase, TripForm } from '../types/suitcase';
import { loadSuitcase, togglePackedPiece } from '../utils/suitcaseStorage';
import { parseDayCount, validateTripForm } from '../utils/tripForm';
import { searchWeatherPlace } from '../../weather/api/openMeteoApi';
import { useToday } from '../../../shared/hooks/useToday';
import { writeJsonToStorage } from '../../../shared/utils/storage';

export interface SuitcaseState {
  suitcase: Suitcase | null;
  error: TripError | null;
  isSearching: boolean;
  prepareTrip: (form: TripForm) => void;
  togglePacked: (pieceId: number) => void;
  resetSuitcase: () => void;
}

export function useSuitcase(): SuitcaseState {
  const today = useToday();
  const [suitcase, setSuitcase] = useState(loadSuitcase);
  const [error, setError] = useState<TripError | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  function storeSuitcase(newSuitcase: Suitcase | null) {
    writeJsonToStorage(SUITCASE_STORAGE_KEY, newSuitcase);
    setSuitcase(newSuitcase);
  }

  async function prepareTrip(form: TripForm) {
    const formError = validateTripForm(form, today);
    setError(formError);
    if (formError !== null) return;
    setIsSearching(true);
    const place = await searchWeatherPlace(form.city).catch(() => null);
    setIsSearching(false);
    if (place === null) {
      setError(TripError.PlaceNotFound);
      return;
    }
    const dayCount = parseDayCount(form.dayCount) ?? 0;
    storeSuitcase({ trip: { place, startDate: form.startDate, dayCount }, packedPieceIds: [] });
  }

  return {
    suitcase,
    error,
    isSearching,
    prepareTrip: (form) => void prepareTrip(form),
    togglePacked: (pieceId) => {
      if (suitcase !== null) storeSuitcase(togglePackedPiece(suitcase, pieceId));
    },
    resetSuitcase: () => storeSuitcase(null),
  };
}
