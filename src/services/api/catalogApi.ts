import { isClothingCategory } from '../../constants/categories';
import type { Piece, PieceDetail } from '../../types/piece';
import type { ApiProduct, ApiProductList } from './dummyjsonTypes';
import { fetchJson } from './http';
import { toPiece, toPieceDetail } from './pieceMapper';

const API_URL = 'https://dummyjson.com/products';
const CARD_FIELDS = 'title,brand,category,price,rating,stock,thumbnail';

/**
 * Charge tout le catalogue en UNE requête (limit=0), puis garde les vêtements.
 * Pourquoi tout charger ? L'API ne sait pas combiner recherche + catégorie :
 * on filtre et pagine donc côté navigateur (49 pièces, c'est léger).
 */
export async function fetchCatalog(signal?: AbortSignal): Promise<Piece[]> {
  const url = `${API_URL}?limit=0&select=${CARD_FIELDS}`;
  const list = await fetchJson<ApiProductList>(url, { signal });

  return list.products.filter((product) => isClothingCategory(product.category)).map(toPiece);
}

export async function fetchPieceById(id: number, signal?: AbortSignal): Promise<PieceDetail> {
  const product = await fetchJson<ApiProduct>(`${API_URL}/${id}`, { signal });

  return toPieceDetail(product);
}
