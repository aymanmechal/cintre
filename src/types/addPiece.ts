import type { PieceType } from '../constants/categories';
import type { OwnershipStatus, StorageLocation } from '../constants/wardrobe';

export interface AddPieceFormValues {
  title: string;
  brand: string;
  pieceType: PieceType;
  price: string;
  imageUrl: string;
  status: OwnershipStatus;
  location: StorageLocation;
}

export type AddPieceFormErrors = Partial<Record<keyof AddPieceFormValues, string>>;

export type ChangeAddPieceField = <Field extends keyof AddPieceFormValues>(
  field: Field,
  value: AddPieceFormValues[Field],
) => void;
