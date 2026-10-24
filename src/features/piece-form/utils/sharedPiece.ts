import { INITIAL_PIECE_FORM_VALUES, TITLE_MAX_LENGTH } from '../constants/pieceForm';
import type { PieceFormValues } from '../types/pieceForm';
import { findShopByUrl } from '../../shops/utils/shops';
import { OwnershipStatus } from '../../wardrobe/constants/wardrobe';

const URL_PATTERN = /https?:\/\/\S+/;

function findUrl(params: URLSearchParams): string {
  return params.get('url') || params.get('text')?.match(URL_PATTERN)?.[0] || '';
}

function findTitle(params: URLSearchParams): string {
  const text = params.get('text')?.replace(URL_PATTERN, '') ?? '';
  const title = params.get('title') || text;
  return title.replace(/\s+/g, ' ').trim().slice(0, TITLE_MAX_LENGTH);
}

export function isSharedPiece(params: URLSearchParams): boolean {
  return ['title', 'text', 'url'].some((key) => params.has(key));
}

export function toSharedPieceValues(params: URLSearchParams): PieceFormValues {
  const productUrl = findUrl(params);
  return {
    ...INITIAL_PIECE_FORM_VALUES,
    status: OwnershipStatus.Wanted,
    title: findTitle(params),
    brand: findShopByUrl(productUrl)?.name ?? '',
    productUrl,
  };
}
