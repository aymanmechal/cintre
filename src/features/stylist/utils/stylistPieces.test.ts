import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { Season } from '../../../shared/pieces/constants/seasons';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import { toStylistPieces } from './stylistPieces';

describe('toStylistPieces', () => {
  it('décrit les pièces portables en clair, sans photo ni prix', () => {
    const items = [
      makeWardrobeItem({ id: 1, title: 'Pull', color: PieceColor.Blue, season: Season.Winter }),
      makeWardrobeItem({ id: 2 }, { status: OwnershipStatus.Wanted }),
    ];
    expect(toStylistPieces(items)).toEqual([
      {
        id: 1,
        name: 'Pull',
        type: 'Chemises',
        color: 'Bleu',
        season: 'Hiver',
        brand: 'Norse Projects',
        tags: [],
      },
    ]);
  });
});
