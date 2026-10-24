import { describe, expect, it } from 'vitest';
import { WEATHER_PLACE_STORAGE_KEY } from '../constants/weather';
import { loadWeatherPlace, parseWeatherPlace, roundCoordinate } from './weatherPlace';

describe('weatherPlace', () => {
  it('relit le lieu enregistré', () => {
    const place = { name: 'Lille', latitude: 50.63, longitude: 3.06 };
    localStorage.setItem(WEATHER_PLACE_STORAGE_KEY, JSON.stringify(place));
    expect(loadWeatherPlace()).toEqual(place);
  });

  it('ignore un lieu abîmé', () => {
    expect(parseWeatherPlace({ name: 'Lille', latitude: '50' })).toBeNull();
    expect(loadWeatherPlace()).toBeNull();
  });

  it('arrondit la position pour ne pas la donner au mètre près', () => {
    expect(roundCoordinate(48.856614)).toBe(48.86);
  });
});
