import { PIECE_SORT_ORDER_LABELS, PIECE_SORT_ORDERS } from '../../constants/sorting';
import { useCatalogFilters } from '../../context/useCatalogFilters';
import { toPieceSortOrder } from '../../utils/sortPieces';
import { SelectField } from '../../../../shared/ui/Form/SelectField';
import type { SelectOption } from '../../../../shared/ui/Form/selectOption';

const SORT_ORDER_OPTIONS: readonly SelectOption[] = PIECE_SORT_ORDERS.map((sortOrder) => ({
  value: sortOrder,
  label: PIECE_SORT_ORDER_LABELS[sortOrder],
}));

export function SortSelect() {
  const { filters, changeSortOrder } = useCatalogFilters();

  return (
    <SelectField
      id="catalog-sort-order"
      label="Trier"
      value={filters.sortOrder}
      options={SORT_ORDER_OPTIONS}
      onChange={(value) => changeSortOrder(toPieceSortOrder(value))}
    />
  );
}
