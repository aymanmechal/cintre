import { describe, expect, it } from 'vitest';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { makeWardrobeItem } from '../../../test/factories';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import { countOutfitsWithWanted, findSimilarOwned } from './beforeBuying';

const wanted = makeWardrobeItem(
  { id: 9, pieceType: PieceType.Tops, color: PieceColor.Black },
  { status: OwnershipStatus.Wanted },
);
const blackTop = makeWardrobeItem({ id: 1, pieceType: PieceType.Tops, color: PieceColor.Black });
const redTop = makeWardrobeItem({ id: 2, pieceType: PieceType.Tops, color: PieceColor.Red });
const jeans = makeWardrobeItem({ id: 3, pieceType: PieceType.Bottoms });
const otherJeans = makeWardrobeItem({ id: 4, pieceType: PieceType.Bottoms });

describe('avant d’acheter', () => {
  it('trouve les pièces du même type et de la même couleur', () => {
    expect(findSimilarOwned([blackTop, redTop, jeans, wanted], wanted)).toEqual([blackTop]);
  });

  it('compte les tenues que la pièce rendrait possibles', () => {
    expect(countOutfitsWithWanted([blackTop, jeans, otherJeans, wanted], wanted)).toBe(2);
  });
});
