import type { PieceFormValues } from '../types/pieceForm';
import type { Piece } from '../types/piece';
import type { WardrobeItem } from '../types/wardrobe';

type PieceFormFields = Pick<Piece, 'title' | 'brand' | 'pieceType' | 'price' | 'thumbnail'>;

function parseOptionalPrice(price: string): number {
  return price.trim() === '' ? 0 : Number(price);
}

export function toPieceFields(values: PieceFormValues): PieceFormFields {
  return {
    title: values.title.trim(),
    brand: values.brand.trim() || null,
    pieceType: values.pieceType,
    price: parseOptionalPrice(values.price),
    thumbnail: values.imageUrl.trim(),
  };
}

export function applyPieceFormValues(piece: Piece, values: PieceFormValues): Piece {
  return { ...piece, ...toPieceFields(values) };
}

export function buildWardrobeItem(
  piece: Piece,
  values: PieceFormValues,
  lastWornOn: string | null = null,
): WardrobeItem {
  return { piece, status: values.status, location: values.location, lastWornOn };
}

export function toPieceFormValues(item: WardrobeItem): PieceFormValues {
  const { piece } = item;
  return {
    title: piece.title,
    brand: piece.brand ?? '',
    pieceType: piece.pieceType,
    price: String(piece.price),
    imageUrl: piece.thumbnail,
    status: item.status,
    location: item.location,
  };
}
