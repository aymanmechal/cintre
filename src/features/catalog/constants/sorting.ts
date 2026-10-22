export enum PieceSortOrder {
  Default = 'defaut',
  PriceAscending = 'prix-croissant',
  PriceDescending = 'prix-decroissant',
}

export const PIECE_SORT_ORDER_LABELS: Record<PieceSortOrder, string> = {
  [PieceSortOrder.Default]: 'Par défaut',
  [PieceSortOrder.PriceAscending]: 'Prix croissant',
  [PieceSortOrder.PriceDescending]: 'Prix décroissant',
};

export const PIECE_SORT_ORDERS = Object.values(PieceSortOrder);
