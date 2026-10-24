import { TextField } from '../../../../../shared/ui/Form/TextField';
import { Pagination } from '../../../../../shared/ui/Pagination/Pagination';
import type { WardrobeItem } from '../../../../wardrobe/types/wardrobe';
import { usePieceShelfList } from '../../../hooks/usePieceShelfList';
import { PieceOptionGrid } from './PieceOptionGrid';
import styles from './PieceOptions.module.css';

interface PieceOptionsProps {
  items: readonly WardrobeItem[];
  selectedPieceIds: readonly number[];
  onToggle: (pieceId: number) => void;
}

export function PieceOptions({ items, selectedPieceIds, onToggle }: PieceOptionsProps) {
  const list = usePieceShelfList(items);

  return (
    <>
      <div className={styles.search}>
        <TextField
          id="piece-shelf-search"
          label="Rechercher une pièce"
          placeholder="Nom, marque, tag…"
          value={list.search}
          onChange={list.changeSearch}
        />
      </div>
      {list.visibleItems.length === 0 ? (
        <p className={styles.empty}>Aucune pièce ne correspond à « {list.search} ».</p>
      ) : (
        <PieceOptionGrid
          items={list.visibleItems}
          selectedPieceIds={selectedPieceIds}
          onToggle={onToggle}
        />
      )}
      <Pagination
        page={list.page}
        pageCount={list.pageCount}
        onPrevious={list.goToPreviousPage}
        onNext={list.goToNextPage}
      />
    </>
  );
}
