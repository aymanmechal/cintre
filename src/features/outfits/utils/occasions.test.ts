import { describe, expect, it } from 'vitest';
import { makeOutfit } from '../../../test/factories';
import { ALL_OCCASIONS, Occasion } from '../constants/occasions';
import { filterOutfitsByOccasion, toOccasion, toOccasionFilter } from './occasions';

const WORK = makeOutfit({ id: 'a', occasion: Occasion.Work });
const PARTY = makeOutfit({ id: 'b', occasion: Occasion.Party });
const NONE = makeOutfit({ id: 'c', occasion: null });

describe('occasions', () => {
  it('reconnaît une occasion et refuse le reste', () => {
    expect(toOccasion('mariage')).toBe(Occasion.Wedding);
    expect(toOccasion('bal')).toBeNull();
    expect(toOccasion('')).toBeNull();
    expect(toOccasion(3)).toBeNull();
  });

  it('retombe sur « toutes » pour un filtre inconnu', () => {
    expect(toOccasionFilter('sport')).toBe(Occasion.Sport);
    expect(toOccasionFilter('n’importe quoi')).toBe(ALL_OCCASIONS);
  });

  it('garde tout avec « toutes les occasions »', () => {
    expect(filterOutfitsByOccasion([WORK, PARTY, NONE], ALL_OCCASIONS)).toEqual([
      WORK,
      PARTY,
      NONE,
    ]);
  });

  it('ne garde que les tenues de l’occasion', () => {
    expect(filterOutfitsByOccasion([WORK, PARTY, NONE], Occasion.Party)).toEqual([PARTY]);
  });
});
