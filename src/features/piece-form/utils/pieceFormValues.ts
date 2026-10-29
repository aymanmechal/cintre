import { normalizePieceColors } from '../../../shared/pieces/utils/colors';
import { formatTags, parseTags } from '../../../shared/pieces/utils/tags';
import type { PieceFormValues } from '../types/pieceForm';
import type { Piece } from '../../../shared/pieces/types/piece';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

type PieceFormFields = Omit<Piece, 'id' | 'isFavorite'>;

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
    photoId: values.photoId,
    extraPhotoIds: values.extraPhotoIds,
    ...normalizePieceColors(values.color, values.secondaryColor),
    season: values.season,
    size: values.size.trim(),
    material: values.material.trim(),
    boughtOn: values.boughtOn || null,
    productUrl: values.productUrl.trim(),
    tags: parseTags(values.tags),
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
  return {
    piece,
    status: values.status,
    availability: values.availability,
    lastWornOn,
  };
}

export function toPieceFormValues(item: WardrobeItem): PieceFormValues {
  const { piece } = item;
  return {
    title: piece.title,
    brand: piece.brand ?? '',
    pieceType: piece.pieceType,
    price: String(piece.price),
    imageUrl: piece.thumbnail,
    photoId: piece.photoId,
    extraPhotoIds: piece.extraPhotoIds,
    status: item.status,
    availability: item.availability,
    color: piece.color,
    secondaryColor: piece.secondaryColor,
    season: piece.season,
    size: piece.size,
    material: piece.material,
    boughtOn: piece.boughtOn ?? '',
    productUrl: piece.productUrl,
    tags: formatTags(piece.tags),
  };
}
