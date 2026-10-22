import { PieceType } from '../shared/pieces/constants/categories';
import { INITIAL_PIECE_FORM_VALUES } from '../features/piece-form/constants/pieceForm';
import type { PieceFormValues } from '../features/piece-form/types/pieceForm';

export function makeFormValues(overrides: Partial<PieceFormValues> = {}): PieceFormValues {
  return {
    ...INITIAL_PIECE_FORM_VALUES,
    title: 'Veste en jean',
    brand: 'Levi',
    pieceType: PieceType.Tops,
    price: '89.9',
    imageUrl: 'https://images.test/veste.png',
    ...overrides,
  };
}
