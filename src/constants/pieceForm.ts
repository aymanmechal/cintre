import { DEFAULT_PIECE_TYPE } from './categories';
import { DEFAULT_STORAGE_LOCATION, OwnershipStatus } from './wardrobe';
import type { PieceFormLabels, PieceFormValues } from '../types/pieceForm';

export enum SubmitStatus {
  Idle = 'idle',
  Submitting = 'submitting',
  Success = 'success',
  Error = 'error',
}

export const TITLE_MIN_LENGTH = 2;
export const TITLE_MAX_LENGTH = 80;
export const MAX_PRICE = 100_000;
export const CUSTOM_PIECE_RATING = 0;
export const CUSTOM_PIECE_STOCK = 0;

export const INITIAL_PIECE_FORM_VALUES: PieceFormValues = {
  title: '',
  brand: '',
  pieceType: DEFAULT_PIECE_TYPE,
  price: '',
  imageUrl: '',
  status: OwnershipStatus.Owned,
  location: DEFAULT_STORAGE_LOCATION,
};

export const VALIDATION_MESSAGES = {
  titleTooShort: `Le nom doit faire au moins ${TITLE_MIN_LENGTH} caractères.`,
  titleTooLong: `Le nom doit faire au plus ${TITLE_MAX_LENGTH} caractères.`,
  invalidPrice: `Le prix doit être un nombre entre 0 et ${MAX_PRICE}.`,
  invalidImageUrl: 'L’adresse de l’image doit commencer par http:// ou https://.',
} as const;

export const ADD_PIECE_FORM_LABELS: PieceFormLabels = {
  submit: 'Ajouter la pièce',
  submitting: 'Ajout en cours…',
  success: 'Pièce ajoutée',
  error: 'Impossible d’ajouter la pièce. Vérifie ta connexion puis réessaie.',
};

export const EDIT_PIECE_FORM_LABELS: PieceFormLabels = {
  submit: 'Enregistrer',
  submitting: 'Enregistrement…',
  success: 'Modifications enregistrées',
  error: 'Impossible d’enregistrer. Vérifie ta connexion puis réessaie.',
};
