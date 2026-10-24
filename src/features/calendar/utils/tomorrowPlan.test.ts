import { describe, expect, it } from 'vitest';
import { makeOutfit, makeWardrobeItem } from '../../../test/factories';
import { Availability } from '../../wardrobe/constants/wardrobe';
import { buildTomorrowPlan } from './tomorrowPlan';

const clean = makeWardrobeItem({ id: 1 });
const dirty = makeWardrobeItem({ id: 2 }, { availability: Availability.Dirty });
const outfit = makeOutfit({ id: 'o', name: 'Brunch', pieceIds: [1, 2] });
const entries = [{ id: 'e', date: '2025-05-11', outfitId: 'o' }];

describe('buildTomorrowPlan', () => {
  it('liste les pièces à préparer et celles à laver', () => {
    const plan = buildTomorrowPlan(entries, [outfit], [clean, dirty], '2025-05-11');
    expect(plan?.outfitName).toBe('Brunch');
    expect(plan?.items).toHaveLength(2);
    expect(plan?.unavailableItems).toEqual([dirty]);
  });

  it('renvoie null quand rien n’est prévu', () => {
    expect(buildTomorrowPlan(entries, [outfit], [clean, dirty], '2025-05-12')).toBeNull();
  });
});
