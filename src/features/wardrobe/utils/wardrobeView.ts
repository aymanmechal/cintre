import { PIECE_TYPE_LABELS, PIECE_TYPES } from '../../../shared/pieces/constants/categories';
import {
  STORAGE_LOCATION_LABELS,
  STORAGE_LOCATIONS,
  type OwnershipStatus,
} from '../constants/wardrobe';
import {
  GROUPINGS_BY_STATUS,
  UNGROUPED_ID,
  WARDROBE_GROUPINGS,
  WARDROBE_SORT_ORDERS,
  WardrobeGrouping,
  WardrobeSortOrder,
} from '../constants/wardrobeView';
import { ALL_PIECE_TYPES, type PieceTypeFilter } from '../../../shared/pieces/constants/categories';
import type { WardrobeItem } from '../types/wardrobe';
import type { WardrobeGroup, WardrobeView } from '../types/wardrobeView';
import { selectItemsByStatus } from './wardrobe';
import { compareByLeastRecentlyWorn } from './wornDates';

function compareByName(first: WardrobeItem, second: WardrobeItem): number {
  return first.piece.title.localeCompare(second.piece.title, 'fr');
}

function compareByPriceAscending(first: WardrobeItem, second: WardrobeItem): number {
  return first.piece.price - second.piece.price;
}

function compareByPriceDescending(first: WardrobeItem, second: WardrobeItem): number {
  return second.piece.price - first.piece.price;
}

function sortWardrobeItems(
  items: readonly WardrobeItem[],
  sortOrder: WardrobeSortOrder,
): WardrobeItem[] {
  switch (sortOrder) {
    case WardrobeSortOrder.Recent:
      return items.toReversed();
    case WardrobeSortOrder.NameAscending:
      return items.toSorted(compareByName);
    case WardrobeSortOrder.PriceAscending:
      return items.toSorted(compareByPriceAscending);
    case WardrobeSortOrder.PriceDescending:
      return items.toSorted(compareByPriceDescending);
    case WardrobeSortOrder.LeastRecentlyWorn:
      return items.toSorted(compareByLeastRecentlyWorn);
  }
}

function filterByPieceType(
  items: readonly WardrobeItem[],
  pieceType: PieceTypeFilter,
): WardrobeItem[] {
  return pieceType === ALL_PIECE_TYPES
    ? [...items]
    : items.filter((item) => item.piece.pieceType === pieceType);
}

function buildGroups<Key extends string>(
  keys: readonly Key[],
  labels: Record<Key, string>,
  getKey: (item: WardrobeItem) => Key,
  items: readonly WardrobeItem[],
): WardrobeGroup[] {
  return keys
    .map((key) => ({
      id: key,
      title: labels[key],
      items: items.filter((item) => getKey(item) === key),
    }))
    .filter((group) => group.items.length > 0);
}

function groupWardrobeItems(
  items: readonly WardrobeItem[],
  grouping: WardrobeGrouping,
): WardrobeGroup[] {
  switch (grouping) {
    case WardrobeGrouping.Location:
      return buildGroups(
        STORAGE_LOCATIONS,
        STORAGE_LOCATION_LABELS,
        (item) => item.location,
        items,
      );
    case WardrobeGrouping.PieceType:
      return buildGroups(PIECE_TYPES, PIECE_TYPE_LABELS, (item) => item.piece.pieceType, items);
    case WardrobeGrouping.None:
      return items.length > 0 ? [{ id: UNGROUPED_ID, title: null, items: [...items] }] : [];
  }
}

export function resolveGrouping(
  status: OwnershipStatus,
  grouping: WardrobeGrouping,
): WardrobeGrouping {
  const allowedGroupings = GROUPINGS_BY_STATUS[status];
  return allowedGroupings.includes(grouping) ? grouping : allowedGroupings[0];
}

export function buildWardrobeGroups(
  items: readonly WardrobeItem[],
  view: WardrobeView,
): WardrobeGroup[] {
  const itemsOfStatus = selectItemsByStatus(items, view.status);
  const matchingItems = filterByPieceType(itemsOfStatus, view.pieceType);
  const sortedItems = sortWardrobeItems(matchingItems, view.sortOrder);
  return groupWardrobeItems(sortedItems, resolveGrouping(view.status, view.grouping));
}

export function toWardrobeSortOrder(value: string): WardrobeSortOrder {
  return WARDROBE_SORT_ORDERS.find((sortOrder) => sortOrder === value) ?? WardrobeSortOrder.Recent;
}

export function toWardrobeGrouping(value: string): WardrobeGrouping {
  return WARDROBE_GROUPINGS.find((grouping) => grouping === value) ?? WardrobeGrouping.None;
}
