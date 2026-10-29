import { describe, expect, it } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { makeWardrobeItem } from '../../../test/factories';
import { buildColorIdeas, listWearableColors } from './colorIdeas';

const redTop = makeWardrobeItem({ id: 1, pieceType: PieceType.Tops, color: PieceColor.Red });
const blackBottom = makeWardrobeItem({
  id: 2,
  pieceType: PieceType.Bottoms,
  color: PieceColor.Black,
});
const blueBottom = makeWardrobeItem({
  id: 3,
  pieceType: PieceType.Bottoms,
  color: PieceColor.Blue,
});

describe('listWearableColors', () => {
  it('liste les couleurs présentes, une fois chacune', () => {
    expect(listWearableColors([redTop, blackBottom, blueBottom, redTop])).toEqual([
      PieceColor.Black,
      PieceColor.Red,
      PieceColor.Blue,
    ]);
  });
});

describe('buildColorIdeas', () => {
  it('construit des tenues autour des pièces de la couleur', () => {
    const ideas = buildColorIdeas(PieceColor.Red, [redTop, blackBottom, blueBottom], []);
    expect(ideas.map((idea) => idea.key).sort()).toEqual(['1-2', '1-3']);
  });

  it('ne double pas une tenue qui contient deux pièces de la couleur', () => {
    const redBottom = makeWardrobeItem({
      id: 4,
      pieceType: PieceType.Bottoms,
      color: PieceColor.Red,
    });
    const ideas = buildColorIdeas(PieceColor.Red, [redTop, redBottom], []);
    expect(ideas).toHaveLength(1);
  });

  it('renvoie rien si aucune pièce n’a cette couleur', () => {
    expect(buildColorIdeas(PieceColor.Pink, [redTop, blackBottom], [])).toEqual([]);
  });
});
