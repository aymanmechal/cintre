import { buildOutfitIdeas } from '../../outfits/utils/combinations';
import { Availability, OwnershipStatus } from '../../wardrobe/constants/wardrobe';
import type { WardrobeItem } from '../../wardrobe/types/wardrobe';

function isSimilar(owned: WardrobeItem, wanted: WardrobeItem): boolean {
  const sameType = owned.piece.pieceType === wanted.piece.pieceType;
  const sameColor = wanted.piece.color === null || owned.piece.color === wanted.piece.color;
  return sameType && sameColor;
}

export function findSimilarOwned(
  items: readonly WardrobeItem[],
  wanted: WardrobeItem,
): WardrobeItem[] {
  return items.filter(
    (item) =>
      item.status === OwnershipStatus.Owned &&
      item.piece.id !== wanted.piece.id &&
      isSimilar(item, wanted),
  );
}

export function countOutfitsWithWanted(
  items: readonly WardrobeItem[],
  wanted: WardrobeItem,
): number {
  const asIfOwned = {
    ...wanted,
    status: OwnershipStatus.Owned,
    availability: Availability.Available,
  };
  return buildOutfitIdeas([asIfOwned], items, []).length;
}
