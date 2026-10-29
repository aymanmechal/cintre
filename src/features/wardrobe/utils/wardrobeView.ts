import {
  PIECE_TYPE_LABELS,
  PIECE_TYPES,
  type PieceType,
} from '../../../shared/pieces/constants/categories';
import { PIECE_COLOR_LABELS, type PieceColor } from '../../../shared/pieces/constants/colors';
import { normalizeForSearch } from '../../../shared/utils/text';
import { Availability, type OwnershipStatus } from '../constants/wardrobe';
import {
  GROUPINGS_BY_STATUS,
  UNGROUPED_ID,
  WARDROBE_GROUPINGS,
  WARDROBE_SORT_ORDERS,
  WardrobeGrouping,
  WardrobeSortOrder,
} from '../constants/wardrobeView';
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

function matchesPieceTypes(item: WardrobeItem, pieceTypes: readonly PieceType[]): boolean {
  return pieceTypes.length === 0 || pieceTypes.includes(item.piece.pieceType);
}

function listPieceColors(item: WardrobeItem): PieceColor[] {
  const { color, secondaryColor } = item.piece;
  return [color, secondaryColor].filter((pieceColor) => pieceColor !== null);
}

function matchesColors(item: WardrobeItem, colors: readonly PieceColor[]): boolean {
  return colors.length === 0 || listPieceColors(item).some((color) => colors.includes(color));
}

export function matchesSearch(item: WardrobeItem, search: string): boolean {
  const { title, brand, size, tags, pieceType } = item.piece;
  const colorLabels = listPieceColors(item).map((color) => PIECE_COLOR_LABELS[color]);
  const words = [
    title,
    brand ?? '',
    size,
    ...colorLabels,
    PIECE_TYPE_LABELS[pieceType],
    ...tags,
  ].join(' ');
  return normalizeForSearch(words).includes(normalizeForSearch(search));
}

function matchesView(item: WardrobeItem, view: WardrobeView): boolean {
  const { piece } = item;
  return (
    matchesPieceTypes(item, view.pieceTypes) &&
    matchesColors(item, view.colors) &&
    matchesSearch(item, view.search) &&
    (view.season === null || piece.season === view.season) &&
    (view.tag === null || piece.tags.includes(view.tag)) &&
    (!view.onlyFavorites || piece.isFavorite) &&
    (!view.onlyAvailable || item.availability === Availability.Available)
  );
}

export function hasActiveFilters(view: WardrobeView): boolean {
  return (
    view.search.trim() !== '' ||
    view.pieceTypes.length > 0 ||
    view.colors.length > 0 ||
    view.season !== null ||
    view.tag !== null ||
    view.onlyFavorites ||
    view.onlyAvailable
  );
}

export function toggleValue<Value>(values: readonly Value[], value: Value): Value[] {
  return values.includes(value)
    ? values.filter((current) => current !== value)
    : [...values, value];
}

export function countActiveFilters(view: WardrobeView): number {
  const activeFilters = [
    view.colors.length > 0,
    view.season !== null,
    view.tag !== null,
    view.onlyFavorites,
    view.onlyAvailable,
  ];
  return activeFilters.filter(Boolean).length;
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
  const matchingItems = itemsOfStatus.filter((item) => matchesView(item, view));
  const sortedItems = sortWardrobeItems(matchingItems, view.sortOrder);
  return groupWardrobeItems(sortedItems, resolveGrouping(view.status, view.grouping));
}

export function toWardrobeSortOrder(value: string): WardrobeSortOrder {
  return WARDROBE_SORT_ORDERS.find((sortOrder) => sortOrder === value) ?? WardrobeSortOrder.Recent;
}

export function toWardrobeGrouping(value: string): WardrobeGrouping {
  return WARDROBE_GROUPINGS.find((grouping) => grouping === value) ?? WardrobeGrouping.None;
}
