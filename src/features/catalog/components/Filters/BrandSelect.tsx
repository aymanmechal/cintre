import { ALL_BRANDS } from '../../constants/catalog';
import { useCatalogFilters } from '../../context/useCatalogFilters';
import { SelectField } from '../../../../shared/ui/Form/SelectField';
import type { SelectOption } from '../../../../shared/ui/Form/selectOption';

interface BrandSelectProps {
  brands: readonly string[];
}

export function BrandSelect({ brands }: BrandSelectProps) {
  const { filters, changeBrand } = useCatalogFilters();
  const options: readonly SelectOption[] = [
    { value: ALL_BRANDS, label: 'Toutes les marques' },
    ...brands.map((brand) => ({ value: brand, label: brand })),
  ];

  return (
    <SelectField
      id="catalog-brand"
      label="Marque"
      value={filters.brand}
      options={options}
      onChange={changeBrand}
    />
  );
}
