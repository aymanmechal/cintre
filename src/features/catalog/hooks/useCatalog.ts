import { useCallback } from 'react';
import { fetchCatalog } from '../../../shared/pieces/api/catalogApi';
import type { PieceTypeFilter } from '../../../shared/pieces/constants/categories';
import type { Piece } from '../../../shared/pieces/types/piece';
import { useAsync, type AsyncResult } from '../../../shared/hooks/useAsync';

export function useCatalog(pieceType: PieceTypeFilter): AsyncResult<Piece[]> {
  const loadCatalog = useCallback(
    (signal: AbortSignal) => fetchCatalog(pieceType, signal),
    [pieceType],
  );
  return useAsync(loadCatalog);
}
