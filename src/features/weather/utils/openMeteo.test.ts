import { describe, expect, it } from 'vitest';
import { buildForecastUrl, buildGeocodingUrl, toWeatherSummary, toWeatherPlace } from './openMeteo';

const LYON = { name: 'Lyon', latitude: 45.76, longitude: 4.84 };

describe('openMeteo', () => {
  it('demande les températures et la pluie du jour pour un lieu', () => {
    const url = new URL(buildForecastUrl(LYON, { startDate: '2026-03-12', endDate: '2026-03-14' }));
    expect(url.origin).toBe('https://api.open-meteo.com');
    expect(url.searchParams.get('latitude')).toBe('45.76');
    expect(url.searchParams.get('longitude')).toBe('4.84');
    expect(url.searchParams.get('start_date')).toBe('2026-03-12');
    expect(url.searchParams.get('end_date')).toBe('2026-03-14');
  });

  it('cherche une ville en français', () => {
    const url = new URL(buildGeocodingUrl('  Lyon '));
    expect(url.searchParams.get('name')).toBe('Lyon');
    expect(url.searchParams.get('language')).toBe('fr');
  });

  it('lit la météo du jour', () => {
    const json = {
      daily: {
        temperature_2m_min: [8.4],
        temperature_2m_max: [14.1],
        precipitation_probability_max: [70],
      },
    };
    expect(toWeatherSummary(json)).toEqual({
      minTemperature: 8.4,
      maxTemperature: 14.1,
      rainProbability: 70,
    });
  });

  it('résume plusieurs jours : le plus froid, le plus chaud et le plus pluvieux', () => {
    const json = {
      daily: {
        temperature_2m_min: [8, 3, 6],
        temperature_2m_max: [14, 10, 17],
        precipitation_probability_max: [10, 60, null],
      },
    };
    expect(toWeatherSummary(json)).toEqual({
      minTemperature: 3,
      maxTemperature: 17,
      rainProbability: 60,
    });
  });

  it('considère qu’il ne pleut pas sans probabilité', () => {
    const json = { daily: { temperature_2m_min: [8], temperature_2m_max: [14] } };
    expect(toWeatherSummary(json)?.rainProbability).toBe(0);
  });

  it('refuse une réponse incomplète', () => {
    expect(toWeatherSummary(null)).toBeNull();
    expect(toWeatherSummary({ daily: { temperature_2m_min: [] } })).toBeNull();
  });

  it('garde la première ville trouvée', () => {
    const json = { results: [{ ...LYON, country: 'France' }, { name: 'Autre' }] };
    expect(toWeatherPlace(json)).toEqual(LYON);
  });

  it('ne trouve rien quand la réponse est vide', () => {
    expect(toWeatherPlace({})).toBeNull();
    expect(toWeatherPlace({ results: [] })).toBeNull();
  });
});
