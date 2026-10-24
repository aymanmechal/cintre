import { describe, expect, it } from 'vitest';
import { WeatherFeel } from '../constants/weather';
import {
  buildWeatherIdeas,
  fitsWeather,
  isRainy,
  pickWeatherIdea,
  toWeatherFeel,
} from './weatherOutfit';
import { toIdeaPieceIds } from '../../outfits/utils/combinations';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { Season } from '../../../shared/pieces/constants/seasons';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';

const COLD_RAIN = { minTemperature: 5, maxTemperature: 10, rainProbability: 80 };
const MILD = { minTemperature: 12, maxTemperature: 18, rainProbability: 10 };
const HOT = { minTemperature: 20, maxTemperature: 30, rainProbability: 0 };

const SWEATER = makeWardrobeItem({ id: 1, pieceType: PieceType.Tops, season: Season.Winter });
const TANK_TOP = makeWardrobeItem({ id: 2, pieceType: PieceType.Tops, season: Season.Summer });
const JEANS = makeWardrobeItem({ id: 3, pieceType: PieceType.Bottoms });
const SANDALS = makeWardrobeItem({ id: 4, pieceType: PieceType.Shoes, season: Season.Summer });
const BOOTS = makeWardrobeItem({ id: 5, pieceType: PieceType.Shoes, season: Season.Winter });
const WARDROBE = [SWEATER, TANK_TOP, JEANS, SANDALS, BOOTS];

describe('toWeatherFeel', () => {
  it('se base sur la température moyenne de la journée', () => {
    expect(toWeatherFeel(COLD_RAIN)).toBe(WeatherFeel.Cold);
    expect(toWeatherFeel(MILD)).toBe(WeatherFeel.Mild);
    expect(toWeatherFeel(HOT)).toBe(WeatherFeel.Hot);
  });

  it('annonce la pluie à partir de 50 %', () => {
    expect(isRainy(COLD_RAIN)).toBe(true);
    expect(isRainy(MILD)).toBe(false);
  });
});

describe('fitsWeather', () => {
  it('écarte les pièces d’été quand il fait froid', () => {
    expect(fitsWeather(TANK_TOP, COLD_RAIN)).toBe(false);
    expect(fitsWeather(SWEATER, COLD_RAIN)).toBe(true);
  });

  it('écarte les pièces d’hiver quand il fait chaud', () => {
    expect(fitsWeather(SWEATER, HOT)).toBe(false);
    expect(fitsWeather(SANDALS, HOT)).toBe(true);
  });

  it('écarte les chaussures d’été sous la pluie', () => {
    const warmRain = { ...HOT, rainProbability: 90 };
    expect(fitsWeather(SANDALS, warmRain)).toBe(false);
  });

  it('garde tout quand il fait doux, même les pièces sans saison', () => {
    expect(WARDROBE.every((item) => fitsWeather(item, MILD))).toBe(true);
  });
});

describe('buildWeatherIdeas', () => {
  it('propose une tenue chaude par temps froid et pluvieux', () => {
    const ideas = buildWeatherIdeas(WARDROBE, [], COLD_RAIN);
    expect(ideas.map(toIdeaPieceIds)).toEqual([[1, 3, 5]]);
  });

  it('propose une tenue légère quand il fait chaud', () => {
    const ideas = buildWeatherIdeas(WARDROBE, [], HOT);
    expect(ideas.map(toIdeaPieceIds)).toEqual([[2, 3, 4]]);
  });

  it('donne une idée par haut quand il fait doux', () => {
    expect(buildWeatherIdeas(WARDROBE, [], MILD)).toHaveLength(2);
  });

  it('ne repropose pas une tenue déjà enregistrée', () => {
    const outfits = [makeOutfit({ pieceIds: [1, 3, 5] })];
    expect(buildWeatherIdeas([SWEATER, JEANS, BOOTS], outfits, COLD_RAIN)).toEqual([]);
  });
});

describe('pickWeatherIdea', () => {
  it('change d’idée à chaque tour', () => {
    const ideas = buildWeatherIdeas(WARDROBE, [], MILD);
    const today = new Date(2026, 2, 2);
    expect(pickWeatherIdea(ideas, today, 0)).not.toBe(pickWeatherIdea(ideas, today, 1));
    expect(pickWeatherIdea([], today, 0)).toBeNull();
  });
});
