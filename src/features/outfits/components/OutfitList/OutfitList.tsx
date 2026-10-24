import { Pagination } from '../../../../shared/ui/Pagination/Pagination';
import { FieldLayout } from '../../../../shared/ui/Form/fieldLayout';
import { SelectField } from '../../../../shared/ui/Form/SelectField';
import { TextField } from '../../../../shared/ui/Form/TextField';
import { OCCASION_FILTER_OPTIONS } from '../../constants/occasions';
import { toOccasionFilter } from '../../utils/occasions';
import { formatNoOutfitMessage } from '../../utils/outfitSearch';
import { MIN_COMPARED_OUTFITS } from '../../constants/outfits';
import { useOutfitComparison } from '../../hooks/useOutfitComparison';
import { useOutfitList } from '../../hooks/useOutfitList';
import { resolveOutfitItems } from '../../utils/outfits';
import { NoOutfits } from '../NoOutfits/NoOutfits';
import { OutfitCard } from '../OutfitCard/OutfitCard';
import { OutfitComparison } from '../OutfitComparison/OutfitComparison';
import styles from './OutfitList.module.css';

export function OutfitList() {
  const list = useOutfitList();
  const comparison = useOutfitComparison(list.allOutfits);

  if (list.totalCount === 0) return <NoOutfits />;

  return (
    <>
      {comparison.comparedOutfits.length >= MIN_COMPARED_OUTFITS && (
        <OutfitComparison
          outfits={comparison.comparedOutfits}
          items={list.items}
          onClose={comparison.clearComparison}
        />
      )}
      <section className={styles.section} aria-labelledby="outfit-list-title">
        <div className={styles.header}>
          <h2 id="outfit-list-title" className={styles.title}>
            Mes tenues ({list.totalCount})
          </h2>
          <div className={styles.search}>
            <TextField
              id="outfit-search"
              label="Rechercher une tenue"
              placeholder="Nom, pièce, marque…"
              value={list.search}
              onChange={list.changeSearch}
            />
          </div>
          <SelectField
            id="outfit-occasion-filter"
            label="Occasion"
            layout={FieldLayout.Stacked}
            value={list.occasion}
            options={OCCASION_FILTER_OPTIONS}
            onChange={(value) => list.changeOccasion(toOccasionFilter(value))}
          />
        </div>
        {list.visibleOutfits.length === 0 ? (
          <p className={styles.empty}>{formatNoOutfitMessage(list.search)}</p>
        ) : (
          <ul className={styles.grid}>
            {list.visibleOutfits.map((outfit) => (
              <li key={outfit.id}>
                <OutfitCard
                  outfit={outfit}
                  outfitItems={resolveOutfitItems(outfit, list.items)}
                  isCompared={comparison.isCompared(outfit.id)}
                  canCompare={comparison.canCompareMore}
                  onToggleCompare={() => comparison.toggleCompared(outfit.id)}
                />
              </li>
            ))}
          </ul>
        )}
        <Pagination
          page={list.page}
          pageCount={list.pageCount}
          onPrevious={list.goToPreviousPage}
          onNext={list.goToNextPage}
        />
      </section>
    </>
  );
}
