import { describe, expect, it } from 'vitest';
import { PieceType } from '../../../shared/pieces/constants/categories';
import { PieceColor } from '../../../shared/pieces/constants/colors';
import { Season } from '../../../shared/pieces/constants/seasons';
import { INITIAL_PIECE_FORM_VALUES } from '../constants/pieceForm';
import { parsePhotoRecognition, toRecognizedValues } from './photoRecognition';

const RECOGNITION = {
  title: 'Pull col roulé',
  pieceType: PieceType.Tops,
  color: PieceColor.Grey,
  season: Season.Winter,
};

describe('parsePhotoRecognition', () => {
  it('garde uniquement les valeurs connues', () => {
    expect(
      parsePhotoRecognition({ title: ' Pull ', pieceType: 'fusée', color: 'gris', season: 'été' }),
    ).toEqual({ title: 'Pull', pieceType: null, color: PieceColor.Grey, season: null });
  });

  it('ne produit jamais « multicolore » : la couleur devient null', () => {
    expect(parsePhotoRecognition({ title: 'Robe', color: 'multicolore' })).toEqual({
      title: 'Robe',
      pieceType: null,
      color: null,
      season: null,
    });
    expect(parsePhotoRecognition({ color: 'Multicolore' })).toBeNull();
  });

  it('reconnaît les nouvelles couleurs', () => {
    expect(parsePhotoRecognition({ color: 'bleu-marine' })?.color).toBe(PieceColor.Navy);
  });

  it('refuse une réponse vide ou illisible', () => {
    expect(parsePhotoRecognition({ pieceType: 'fusée' })).toBeNull();
    expect(parsePhotoRecognition('pull')).toBeNull();
  });
});

describe('toRecognizedValues', () => {
  it('remplit le nom seulement s’il est vide', () => {
    expect(toRecognizedValues(INITIAL_PIECE_FORM_VALUES, RECOGNITION)).toEqual({
      ...RECOGNITION,
      secondaryColor: null,
    });
    const typed = { ...INITIAL_PIECE_FORM_VALUES, title: 'Mon pull' };
    expect(toRecognizedValues(typed, RECOGNITION).title).toBe('Mon pull');
  });

  it('garde la couleur secondaire saisie', () => {
    const values = { ...INITIAL_PIECE_FORM_VALUES, secondaryColor: PieceColor.Beige };
    expect(toRecognizedValues(values, RECOGNITION).secondaryColor).toBe(PieceColor.Beige);
  });

  it('retire la couleur secondaire si la couleur reconnue est la même', () => {
    const values = { ...INITIAL_PIECE_FORM_VALUES, secondaryColor: PieceColor.Grey };
    expect(toRecognizedValues(values, RECOGNITION)).toMatchObject({
      color: PieceColor.Grey,
      secondaryColor: null,
    });
  });

  it('garde les valeurs actuelles pour ce qui n’est pas reconnu', () => {
    const values = { ...INITIAL_PIECE_FORM_VALUES, color: PieceColor.Red };
    const changes = toRecognizedValues(values, { ...RECOGNITION, color: null, pieceType: null });
    expect(changes.color).toBe(PieceColor.Red);
    expect(changes.pieceType).toBe(values.pieceType);
  });
});
