import { BrandSelect } from './BrandSelect';
import { PieceTypeSelect } from './PieceTypeSelect';
import { SearchBar } from './SearchBar';
import { SortSelect } from './SortSelect';
import styles from './CatalogToolbar.module.css';

interface CatalogToolbarProps {
  brands: readonly string[];
}

export function CatalogToolbar({ brands }: CatalogToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <SearchBar />
      <PieceTypeSelect />
      <BrandSelect brands={brands} />
      <SortSelect />
    </div>
  );
}
