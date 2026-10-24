import { describe, expect, it } from 'vitest';
import { RAIN_TIP } from '../constants/weather';
import {
  buildWeatherTips,
  formatRainChance,
  formatTemperatureRange,
  formatWeatherFeel,
} from './weatherMessages';

const RAINY_DAY = { minTemperature: 8.6, maxTemperature: 13.2, rainProbability: 70 };

describe('weatherMessages', () => {
  it('résume la journée', () => {
    expect(formatTemperatureRange(RAINY_DAY)).toBe('9 à 13 °C');
    expect(formatRainChance(RAINY_DAY)).toBe('70 % de risque de pluie');
    expect(formatWeatherFeel(RAINY_DAY)).toBe('Il fait froid');
  });

  it('ajoute le conseil pluie seulement quand il risque de pleuvoir', () => {
    expect(buildWeatherTips(RAINY_DAY)).toContain(RAIN_TIP);
    expect(buildWeatherTips({ ...RAINY_DAY, rainProbability: 0 })).not.toContain(RAIN_TIP);
  });
});
