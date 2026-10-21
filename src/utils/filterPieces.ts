import { categoryLabel, typeOfCategory } from '../constants/categories';
import type { CatalogFilters } from '../contexts/catalogFilters/catalogFiltersReducer';
import type { Piece } from '../types/piece';
import { normalizeText } from './text';

/** La recherche porte sur le titre, la marque et le type (ex. "chaussures"). */
function matchesQuery(piece: Piece, query: string): boolean {
  const search = normalizeText(query);
  if (search === '') return true;

  const haystack = normalizeText(
    [piece.title, piece.brand ?? '', categoryLabel(piece.category)].join(' '),
  );
  return haystack.includes(search);
}

function matchesType(piece: Piece, type: CatalogFilters['type']): boolean {
  return type === 'tous' || typeOfCategory(piece.category) === type;
}

/** Une pièce mixte apparaît aussi bien chez les hommes que chez les femmes. */
function matchesGender(piece: Piece, gender: CatalogFilters['gender']): boolean {
  return gender === 'tous' || piece.gender === gender || piece.gender === 'mixte';
}

/** Les 3 critères se combinent (ET logique). Fonction pure : facile à tester. */
export function filterPieces(pieces: readonly Piece[], filters: CatalogFilters): Piece[] {
  return pieces.filter(
    (piece) =>
      matchesQuery(piece, filters.query) &&
      matchesType(piece, filters.type) &&
      matchesGender(piece, filters.gender),
  );
}

export function hasActiveFilters(filters: CatalogFilters): boolean {
  return filters.query.trim() !== '' || filters.type !== 'tous' || filters.gender !== 'tous';
}
