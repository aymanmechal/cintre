import { GEOLOCATION_TIMEOUT_MS, MY_POSITION_NAME } from '../constants/weather';
import type { WeatherPlace } from '../types/weather';
import { roundCoordinate } from '../utils/weatherPlace';

export function locateDevice(): Promise<WeatherPlace> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Géolocalisation indisponible'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        resolve({
          name: MY_POSITION_NAME,
          latitude: roundCoordinate(coords.latitude),
          longitude: roundCoordinate(coords.longitude),
        }),
      reject,
      { timeout: GEOLOCATION_TIMEOUT_MS },
    );
  });
}
