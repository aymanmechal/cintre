import type { Piece } from '../types/piece';
import type { ApiSavedProduct } from './dummyJsonTypes';
import { deleteJson, patchJson, postJson } from '../../api/http';

const PRODUCTS_URL = 'https://dummyjson.com/products';
const ADD_PRODUCT_URL = `${PRODUCTS_URL}/add`;

function buildProductUrl(pieceId: number): string {
  return `${PRODUCTS_URL}/${pieceId}`;
}

function toProductBody(piece: Piece) {
  return {
    title: piece.title,
    brand: piece.brand,
    category: piece.pieceType,
    price: piece.price,
    thumbnail: piece.thumbnail,
  };
}

export function createPiece(piece: Piece, signal?: AbortSignal): Promise<ApiSavedProduct> {
  return postJson<ApiSavedProduct>(ADD_PRODUCT_URL, toProductBody(piece), signal);
}

export function updatePiece(piece: Piece, signal?: AbortSignal): Promise<ApiSavedProduct> {
  return patchJson<ApiSavedProduct>(buildProductUrl(piece.id), toProductBody(piece), signal);
}

export function deletePiece(pieceId: number, signal?: AbortSignal): Promise<ApiSavedProduct> {
  return deleteJson<ApiSavedProduct>(buildProductUrl(pieceId), signal);
}
