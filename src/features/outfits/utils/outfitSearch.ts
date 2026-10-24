import { normalizeForSearch } from '../../../shared/utils/text';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';
import type { Outfit } from '../types/outfit';
import { resolveOutfitItems } from './outfits';

function buildSearchText(outfit: Outfit, items: readonly WardrobeItem[]): string {
  const pieceTexts = resolveOutfitItems(outfit, items).flatMap(({ piece }) => [
    piece.title,
    piece.brand ?? '',
  ]);
  return normalizeForSearch([outfit.name, ...pieceTexts].join(' '));
}

export function filterOutfitsBySearch(
  outfits: readonly Outfit[],
  items: readonly WardrobeItem[],
  search: string,
): Outfit[] {
  const query = normalizeForSearch(search);
  return outfits.filter((outfit) => buildSearchText(outfit, items).includes(query));
}

export function formatNoOutfitMessage(search: string): string {
  return search.trim() === ''
    ? 'Aucune tenue ne correspond à cette occasion.'
    : `Aucune tenue ne correspond à « ${search} ».`;
}
