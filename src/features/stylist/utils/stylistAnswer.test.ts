import { describe, expect, it } from 'vitest';
import { makeWardrobeItem } from '../../../test/factories';
import { Availability, OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { parseStylistAnswer, toStylistSuggestion } from './stylistAnswer';

const TOP = makeWardrobeItem({ id: 1, pieceType: PieceType.Tops });
const JEANS = makeWardrobeItem({ id: 2, pieceType: PieceType.Bottoms });
const DIRTY = makeWardrobeItem(
  { id: 3, pieceType: PieceType.Shoes },
  { availability: Availability.Dirty },
);
const WISHED = makeWardrobeItem({ id: 4 }, { status: OwnershipStatus.Wanted });
const ITEMS = [TOP, JEANS, DIRTY, WISHED];

describe('parseStylistAnswer', () => {
  it('garde les ids entiers et l’explication', () => {
    expect(parseStylistAnswer({ pieceIds: [1, '2', 2.5, 3], explanation: ' Joli ' })).toEqual({
      pieceIds: [1, 3],
      explanation: 'Joli',
    });
  });

  it('refuse une réponse sans liste', () => {
    expect(parseStylistAnswer({ explanation: 'x' })).toBeNull();
    expect(parseStylistAnswer('texte')).toBeNull();
  });
});

describe('toStylistSuggestion', () => {
  it('ne garde que des pièces possédées et disponibles, jamais inventées', () => {
    const suggestion = toStylistSuggestion({ pieceIds: [2, 1, 3, 4, 99], explanation: '' }, ITEMS);
    expect(suggestion?.idea.items.map((item) => item.piece.id)).toEqual([1, 2]);
  });

  it('ne propose rien si aucune pièce n’est valable', () => {
    expect(toStylistSuggestion({ pieceIds: [99], explanation: '' }, ITEMS)).toBeNull();
  });
});
