import { useCallback } from 'react';
import { fetchPieceById } from '../../../shared/pieces/api/catalogApi';
import type { PieceDetail } from '../../../shared/pieces/types/piece';
import { useAsync, type AsyncResult } from '../../../shared/hooks/useAsync';

export function usePieceDetail(pieceId: number): AsyncResult<PieceDetail> {
  const loadPiece = useCallback(
    (signal: AbortSignal) => fetchPieceById(pieceId, signal),
    [pieceId],
  );
  return useAsync(loadPiece);
}
