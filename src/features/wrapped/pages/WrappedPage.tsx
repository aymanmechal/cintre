import { WrappedCards } from '../components/WrappedCards/WrappedCards';
import { WrappedPeriodSwitch } from '../components/WrappedPeriodSwitch/WrappedPeriodSwitch';
import { NOTHING_WORN_MESSAGE } from '../constants/wrapped';
import { useWrapped } from '../hooks/useWrapped';
import { hasWornAnything } from '../utils/wrapped';
import { EmptyWardrobe } from '../../wardrobe/components/EmptyWardrobe/EmptyWardrobe';
import { useWardrobe } from '../../wardrobe/context/useWardrobe';
import { PageHeader } from '../../../shared/ui/PageHeader/PageHeader';
import { formatPageTitle } from '../../../shared/utils/format';
import styles from './WrappedPage.module.css';

export function WrappedPage() {
  const { items } = useWardrobe();
  const { period, wrapped, changePeriod } = useWrapped();

  return (
    <section className={styles.page}>
      <title>{formatPageTitle('Mon bilan')}</title>
      <PageHeader title="Mon bilan" subtitle="Ton dressing en un coup d’œil, mois par mois." />
      {items.length === 0 && <EmptyWardrobe />}
      {items.length > 0 && (
        <>
          <WrappedPeriodSwitch period={period} onChange={changePeriod} />
          {hasWornAnything(wrapped) ? (
            <WrappedCards wrapped={wrapped} />
          ) : (
            <p className={styles.empty}>{NOTHING_WORN_MESSAGE}</p>
          )}
        </>
      )}
    </section>
  );
}
