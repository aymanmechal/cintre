import { useSearchParams } from 'react-router';
import { INITIAL_PIECE_FORM_VALUES } from '../constants/pieceForm';
import type { PieceFormValues } from '../types/pieceForm';
import { isSharedPiece, toSharedPieceValues } from '../utils/sharedPiece';

export interface AddPieceInitialValues {
  initialValues: PieceFormValues;
  isShared: boolean;
  formKey: string;
}

export function useAddPieceInitialValues(): AddPieceInitialValues {
  const [searchParams] = useSearchParams();
  const isShared = isSharedPiece(searchParams);

  return {
    initialValues: isShared ? toSharedPieceValues(searchParams) : INITIAL_PIECE_FORM_VALUES,
    isShared,
    formKey: searchParams.toString(),
  };
}
