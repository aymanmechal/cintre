import type { Piece, PieceDetail } from '../types/piece';
import { classifyPieceType } from '../utils/categories';
import type { ApiProduct, ApiProductList } from './dummyJsonTypes';
import { NotFoundError } from '../../api/errors';
import { fetchJson } from '../../api/http';
import { mapApiProductToPiece, mapApiProductToPieceDetail } from './pieceMapper';

const PRODUCTS_URL = 'https://dummyjson.com/products';
const PIECE_CARD_FIELDS = 'title,brand,category,price,rating,stock,thumbnail';
const ALL_PRODUCTS_URL = `${PRODUCTS_URL}?limit=0&select=${PIECE_CARD_FIELDS}`;

function toClothingPiece(product: ApiProduct): Piece | null {
  const pieceType = classifyPieceType(product.title, product.category);
  return pieceType ? mapApiProductToPiece(product, pieceType) : null;
}

function isPiece(piece: Piece | null): piece is Piece {
  return piece !== null;
}

export async function fetchCatalog(signal?: AbortSignal): Promise<Piece[]> {
  const productList = await fetchJson<ApiProductList>(ALL_PRODUCTS_URL, { signal });
  return productList.products.map(toClothingPiece).filter(isPiece);
}

export async function fetchPieceById(pieceId: number, signal?: AbortSignal): Promise<PieceDetail> {
  const product = await fetchJson<ApiProduct>(`${PRODUCTS_URL}/${pieceId}`, { signal });
  const pieceType = classifyPieceType(product.title, product.category);
  if (!pieceType) {
    throw new NotFoundError(`Pièce ${pieceId}`);
  }
  return mapApiProductToPieceDetail(product, pieceType);
}
