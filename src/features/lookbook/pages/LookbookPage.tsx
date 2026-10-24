import { LookbookSpread } from '../components/LookbookSpread/LookbookSpread';
import { LOOKBOOK_EMPTY_MESSAGE } from '../constants/lookbook';
import { useLookbook } from '../hooks/useLookbook';
import { PageHeader } from '../../../shared/ui/PageHeader/PageHeader';
import { Pagination } from '../../../shared/ui/Pagination/Pagination';
import { formatPageTitle } from '../../../shared/utils/format';
import styles from './LookbookPage.module.css';

export function LookbookPage() {
  const lookbook = useLookbook();

  return (
    <section className={styles.page}>
      <title>{formatPageTitle('Mon lookbook')}</title>
      <PageHeader title="Mon lookbook" subtitle="Feuillette tes tenues comme un magazine." />
      {lookbook.outfit === null ? (
        <p className={styles.empty}>{LOOKBOOK_EMPTY_MESSAGE}</p>
      ) : (
        <LookbookSpread outfit={lookbook.outfit} outfitItems={lookbook.outfitItems} />
      )}
      <Pagination
        page={lookbook.page}
        pageCount={lookbook.pageCount}
        onPrevious={lookbook.goToPreviousPage}
        onNext={lookbook.goToNextPage}
      />
    </section>
  );
}
