import { NOT_ENOUGH_PIECES_MESSAGE } from '../../constants/suitcase';
import { useSuitcasePlan } from '../../hooks/useSuitcasePlan';
import type { Suitcase } from '../../types/suitcase';
import { formatTripTitle } from '../../utils/tripDates';
import { PackingList } from '../PackingList/PackingList';
import { TripDays } from '../TripDays/TripDays';
import { TripForecast } from '../TripForecast/TripForecast';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import styles from './TripContent.module.css';

interface TripContentProps {
  suitcase: Suitcase;
  onToggle: (pieceId: number) => void;
  onReset: () => void;
}

export function TripContent({ suitcase, onToggle, onReset }: TripContentProps) {
  const forecast = useSuitcasePlan(suitcase.trip);
  const { plan } = forecast;

  return (
    <div className={styles.content}>
      <div className={styles.trip}>
        <h2 className={styles.title}>{formatTripTitle(suitcase.trip)}</h2>
        <TripForecast trip={suitcase.trip} forecast={forecast} />
      </div>
      {plan !== null && (
        <>
          <PackingList plan={plan} packedPieceIds={suitcase.packedPieceIds} onToggle={onToggle} />
          <TripDays days={plan.days} />
        </>
      )}
      {plan === null && !forecast.isLoading && (
        <p className={styles.empty}>{NOT_ENOUGH_PIECES_MESSAGE}</p>
      )}
      <Button variant={ButtonVariant.Ghost} className={styles.reset} onClick={onReset}>
        Nouvelle valise
      </Button>
    </div>
  );
}
