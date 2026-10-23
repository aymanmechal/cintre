import type { Piece, PieceDetail } from '../types/piece';
import { ALL_PIECE_TYPES, type PieceType, type PieceTypeFilter } from '../constants/categories';
import { classifyPieceType, listCategorySlugsOfPieceType } from '../utils/categories';
import type { ApiProduct, ApiProductList } from './dummyJsonTypes';
import { NotFoundError } from '../../api/errors';
import { fetchJson } from '../../api/http';
import { mapApiProductToPiece, mapApiProductToPieceDetail } from './pieceMapper';

const PRODUCTS_URL = 'https://dummyjson.com/products';
const PIECE_CARD_FIELDS = 'title,brand,category,price,rating,stock,thumbnail';
const ALL_PRODUCTS_URL = `${PRODUCTS_URL}?limit=0&select=${PIECE_CARD_FIELDS}`;

function buildCategoryUrl(categorySlug: string): string {
  return `${PRODUCTS_URL}/category/${categorySlug}?limit=0&select=${PIECE_CARD_FIELDS}`;
}

function toClothingPiece(product: ApiProduct): Piece | null {
  const pieceType = classifyPieceType(product.title, product.category);
  return pieceType ? mapApiProductToPiece(product, pieceType) : null;
}

function isPiece(piece: Piece | null): piece is Piece {
  return piece !== null;
}

async function fetchPiecesFromUrl(url: string, signal?: AbortSignal): Promise<Piece[]> {
  const productList = await fetchJson<ApiProductList>(url, { signal });
  return productList.products.map(toClothingPiece).filter(isPiece);
}

async function fetchPiecesOfType(pieceType: PieceType, signal?: AbortSignal): Promise<Piece[]> {
  const categoryUrls = listCategorySlugsOfPieceType(pieceType).map(buildCategoryUrl);
  const piecesByCategory = await Promise.all(
    categoryUrls.map((url) => fetchPiecesFromUrl(url, signal)),
  );
  return piecesByCategory.flat().filter((piece) => piece.pieceType === pieceType);
}

export function fetchCatalog(
  pieceType: PieceTypeFilter = ALL_PIECE_TYPES,
  signal?: AbortSignal,
): Promise<Piece[]> {
  return pieceType === ALL_PIECE_TYPES
    ? fetchPiecesFromUrl(ALL_PRODUCTS_URL, signal)
    : fetchPiecesOfType(pieceType, signal);
}

export async function fetchPieceById(pieceId: number, signal?: AbortSignal): Promise<PieceDetail> {
  const product = await fetchJson<ApiProduct>(`${PRODUCTS_URL}/${pieceId}`, { signal });
  const pieceType = classifyPieceType(product.title, product.category);
  if (!pieceType) {
    throw new NotFoundError(`Pièce ${pieceId}`);
  }
  return mapApiProductToPieceDetail(product, pieceType);
}
