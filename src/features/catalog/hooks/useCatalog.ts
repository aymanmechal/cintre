import { fetchCatalog } from '../../../shared/pieces/api/catalogApi';
import type { Piece } from '../../../shared/pieces/types/piece';
import { useAsync, type AsyncResult } from '../../../shared/hooks/useAsync';

export function useCatalog(): AsyncResult<Piece[]> {
  return useAsync(fetchCatalog);
}
