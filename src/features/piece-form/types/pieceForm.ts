import type { PieceType } from '../../../shared/pieces/constants/categories';
import type { PieceColor } from '../../../shared/pieces/constants/colors';
import type { Season } from '../../../shared/pieces/constants/seasons';
import type {
  Availability,
  OwnershipStatus,
  StorageLocation,
} from '../../wardrobe/constants/wardrobe';

export interface PieceFormValues {
  title: string;
  brand: string;
  pieceType: PieceType;
  price: string;
  imageUrl: string;
  photoId: string | null;
  extraPhotoIds: string[];
  status: OwnershipStatus;
  location: StorageLocation;
  availability: Availability;
  color: PieceColor | null;
  season: Season | null;
  size: string;
  material: string;
  boughtOn: string;
  productUrl: string;
  tags: string;
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
