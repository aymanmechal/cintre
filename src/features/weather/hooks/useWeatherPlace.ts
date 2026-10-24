import { useState } from 'react';
import { locateDevice } from '../api/geolocation';
import { searchWeatherPlace } from '../api/openMeteoApi';
import { WEATHER_PLACE_STORAGE_KEY, WeatherError } from '../constants/weather';
import type { WeatherPlace } from '../types/weather';
import { loadWeatherPlace } from '../utils/weatherPlace';
import { writeJsonToStorage } from '../../../shared/utils/storage';

export interface WeatherPlaceState {
  place: WeatherPlace | null;
  error: WeatherError | null;
  isSearching: boolean;
  locate: () => void;
  searchCity: (city: string) => void;
  forgetPlace: () => void;
}

export function useWeatherPlace(): WeatherPlaceState {
  const [place, setPlace] = useState(loadWeatherPlace);
  const [error, setError] = useState<WeatherError | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  function storePlace(newPlace: WeatherPlace | null) {
    writeJsonToStorage(WEATHER_PLACE_STORAGE_KEY, newPlace);
    setPlace(newPlace);
  }

  async function findPlace(search: () => Promise<WeatherPlace | null>, failure: WeatherError) {
    setIsSearching(true);
    setError(null);
    const foundPlace = await search().catch(() => null);
    setIsSearching(false);
    if (foundPlace === null) setError(failure);
    else storePlace(foundPlace);
  }

  return {
    place,
    error,
    isSearching,
    locate: () => void findPlace(locateDevice, WeatherError.LocationDenied),
    searchCity: (city) =>
      void findPlace(() => searchWeatherPlace(city), WeatherError.PlaceNotFound),
    forgetPlace: () => {
      setError(null);
      storePlace(null);
    },
  };
}
