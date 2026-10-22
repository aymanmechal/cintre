import type { PieceType } from '../../../shared/pieces/constants/categories';
import type { OwnershipStatus, StorageLocation } from '../../wardrobe/constants/wardrobe';
import type { Piece } from '../../../shared/pieces/types/piece';

export interface PieceFormValues {
  title: string;
  brand: string;
  pieceType: PieceType;
  price: string;
  imageUrl: string;
  status: OwnershipStatus;
  location: StorageLocation;
}

export type PieceFormErrors = Partial<Record<keyof PieceFormValues, string>>;

export type ChangePieceFormField = <Field extends keyof PieceFormValues>(
  field: Field,
  value: PieceFormValues[Field],
) => void;

export interface PieceFormLabels {
  submit: string;
  submitting: string;
  success: string;
  error: string;
}

export interface SavedPiece {
  piece: Piece;
  apiProductId: number | null;
}
