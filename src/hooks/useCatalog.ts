import { fetchCatalog } from '../services/api/catalogApi';
import type { Piece } from '../types/piece';
import { useAsync, type AsyncResult } from './useAsync';

export function useCatalog(): AsyncResult<Piece[]> {
  return useAsync(fetchCatalog);
}
