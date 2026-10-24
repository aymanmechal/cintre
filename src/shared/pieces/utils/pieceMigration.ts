import { DEFAULT_PIECE_TYPE, PIECE_TYPES } from '../constants/categories';
import { PIECE_COLORS } from '../constants/colors';
import { MAX_EXTRA_PHOTOS } from '../constants/photos';
import { SEASONS } from '../constants/seasons';
import type { Piece } from '../types/piece';

type StoredPiece = Record<string, unknown>;

function readText(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function readNullableText(value: unknown): string | null {
  return typeof value === 'string' && value !== '' ? value : null;
}

function findAllowed<Value extends string>(
  allowed: readonly Value[],
  value: unknown,
): Value | null {
  return allowed.find((candidate) => candidate === value) ?? null;
}

function readTexts(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((tag) => typeof tag === 'string') : [];
}

export function toPiece(stored: StoredPiece): Piece {
  return {
    id: Number(stored.id),
    title: readText(stored.title),
    brand: readNullableText(stored.brand),
    pieceType: findAllowed(PIECE_TYPES, stored.pieceType) ?? DEFAULT_PIECE_TYPE,
    price: typeof stored.price === 'number' ? stored.price : 0,
    thumbnail: readText(stored.thumbnail),
    photoId: readNullableText(stored.photoId),
    extraPhotoIds: readTexts(stored.extraPhotoIds).slice(0, MAX_EXTRA_PHOTOS),
    color: findAllowed(PIECE_COLORS, stored.color),
    season: findAllowed(SEASONS, stored.season),
    size: readText(stored.size),
    material: readText(stored.material),
    boughtOn: readNullableText(stored.boughtOn),
    productUrl: readText(stored.productUrl),
    isFavorite: stored.isFavorite === true,
    tags: readTexts(stored.tags),
  };
}
