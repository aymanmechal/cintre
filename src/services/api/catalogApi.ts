import type { Piece, PieceDetail } from '../../types/piece';
import { isClothingCategory } from '../../utils/categories';
import type { ApiProduct, ApiProductList } from './dummyJsonTypes';
import { fetchJson } from './http';
import { mapApiProductToPiece, mapApiProductToPieceDetail } from './pieceMapper';

const PRODUCTS_URL = 'https://dummyjson.com/products';
const PIECE_CARD_FIELDS = 'title,brand,category,price,rating,stock,thumbnail';
const ALL_PRODUCTS_URL = `${PRODUCTS_URL}?limit=0&select=${PIECE_CARD_FIELDS}`;

function keepClothingProducts(products: readonly ApiProduct[]): ApiProduct[] {
  return products.filter((product) => isClothingCategory(product.category));
}

export async function fetchCatalog(signal?: AbortSignal): Promise<Piece[]> {
  const productList = await fetchJson<ApiProductList>(ALL_PRODUCTS_URL, { signal });
  return keepClothingProducts(productList.products).map(mapApiProductToPiece);
}

export async function fetchPieceById(pieceId: number, signal?: AbortSignal): Promise<PieceDetail> {
  const product = await fetchJson<ApiProduct>(`${PRODUCTS_URL}/${pieceId}`, { signal });
  return mapApiProductToPieceDetail(product);
}
