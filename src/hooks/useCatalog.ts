import { fetchCatalog } from '../services/api/catalogApi';
import type { Piece } from '../types/piece';
import { useAsync, type AsyncResult } from './useAsync';

/** Le catalogue complet + son état de chargement. fetchCatalog est stable (fonction du module). */
export function useCatalog(): AsyncResult<Piece[]> {
  return useAsync(fetchCatalog);
}
