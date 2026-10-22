import type { Piece } from '../../types/piece';
import type { ApiProduct } from './dummyJsonTypes';
import { postJson } from './http';

const ADD_PRODUCT_URL = 'https://dummyjson.com/products/add';

function toNewProductBody(piece: Piece) {
  return {
    title: piece.title,
    brand: piece.brand,
    category: piece.pieceType,
    price: piece.price,
    thumbnail: piece.thumbnail,
  };
}

export function createPiece(piece: Piece, signal?: AbortSignal): Promise<ApiProduct> {
  return postJson<ApiProduct>(ADD_PRODUCT_URL, toNewProductBody(piece), signal);
}
