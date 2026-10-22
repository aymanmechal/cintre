import { useCallback } from 'react';
import { fetchPieceById } from '../services/api/catalogApi';
import type { PieceDetail } from '../types/piece';
import { useAsync, type AsyncResult } from './useAsync';

export function usePieceDetail(pieceId: number): AsyncResult<PieceDetail> {
  const loadPiece = useCallback(
    (signal: AbortSignal) => fetchPieceById(pieceId, signal),
    [pieceId],
  );
  return useAsync(loadPiece);
}
