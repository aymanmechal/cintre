import { CUSTOM_PIECE_RATING, CUSTOM_PIECE_STOCK } from '../constants/addPiece';
import type { AddPieceFormValues } from '../types/addPiece';
import type { Piece } from '../types/piece';
import type { WardrobeItem } from '../types/wardrobe';

function createCustomPieceId(): number {
  return -Date.now();
}

function parseOptionalPrice(price: string): number {
  return price.trim() === '' ? 0 : Number(price);
}

export function isCatalogPiece(pieceId: number): boolean {
  return pieceId > 0;
}

export function buildCustomPiece(values: AddPieceFormValues): Piece {
  return {
    id: createCustomPieceId(),
    title: values.title.trim(),
    brand: values.brand.trim() || null,
    pieceType: values.pieceType,
    price: parseOptionalPrice(values.price),
    rating: CUSTOM_PIECE_RATING,
    stock: CUSTOM_PIECE_STOCK,
    thumbnail: values.imageUrl.trim(),
  };
}

export function buildWardrobeItem(piece: Piece, values: AddPieceFormValues): WardrobeItem {
  return { piece, status: values.status, location: values.location };
}
