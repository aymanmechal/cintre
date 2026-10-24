import { describe, expect, it } from 'vitest';
import { Season } from '../constants/seasons';
import { toSeason } from './seasons';

describe('toSeason', () => {
  it('convertit une valeur de select en saison, ou null', () => {
    expect(toSeason('hiver')).toBe(Season.Winter);
    expect(toSeason('')).toBeNull();
  });
});
