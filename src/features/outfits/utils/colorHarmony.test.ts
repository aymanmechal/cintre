import { describe, expect, it } from 'vitest';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { makeWardrobeItem } from '../../../test/factories';
import { ColorHarmony } from '../constants/outfits';
import { describeHarmony, formatColorList, selectAccentColors, toHarmony } from './colorHarmony';

const BLACK = makeWardrobeItem({ id: 1, color: PieceColor.Black });
const WHITE = makeWardrobeItem({ id: 2, color: PieceColor.White });
const BLUE = makeWardrobeItem({ id: 3, color: PieceColor.Blue });
const PINK = makeWardrobeItem({ id: 4, color: PieceColor.Pink });
const NO_COLOR = makeWardrobeItem({ id: 5, color: null });

describe('colorHarmony', () => {
  it('ne garde que les couleurs vives, une seule fois chacune', () => {
    expect(selectAccentColors([BLACK, BLUE, BLUE, PINK, NO_COLOR])).toEqual([
      PieceColor.Blue,
      PieceColor.Pink,
    ]);
  });

  it("classe l'harmonie selon le nombre de couleurs vives", () => {
    expect(toHarmony(0)).toBe(ColorHarmony.Neutral);
    expect(toHarmony(1)).toBe(ColorHarmony.Accent);
    expect(toHarmony(3)).toBe(ColorHarmony.Bold);
  });

  it('écrit la liste des couleurs en français', () => {
    expect(formatColorList([])).toBe('');
    expect(formatColorList([PieceColor.Blue])).toBe('bleu');
    expect(formatColorList([PieceColor.Blue, PieceColor.Pink])).toBe('bleu et rose');
    expect(formatColorList([PieceColor.Blue, PieceColor.Pink, PieceColor.Red])).toBe(
      'bleu, rose et rouge',
    );
  });

  it('explique une tenue en neutres', () => {
    expect(describeHarmony([BLACK, WHITE])).toEqual({
      harmony: ColorHarmony.Neutral,
      explanation: 'Que des neutres : ça s’accorde toujours.',
    });
  });

  it('nomme la couleur qui ressort', () => {
    const description = describeHarmony([BLACK, BLUE]);
    expect(description?.harmony).toBe(ColorHarmony.Accent);
    expect(description?.explanation).toContain('bleu');
  });

  it('prévient quand il y a plusieurs couleurs vives', () => {
    const description = describeHarmony([BLUE, PINK, WHITE]);
    expect(description?.harmony).toBe(ColorHarmony.Bold);
    expect(description?.explanation).toContain('bleu et rose');
  });

  it('ne dit rien quand les couleurs ne sont pas connues', () => {
    expect(describeHarmony([BLUE, NO_COLOR])).toBeNull();
    expect(describeHarmony([BLUE])).toBeNull();
  });
});
