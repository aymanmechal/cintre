import { HOME_FORGOTTEN_LIMIT } from '../../constants/home';
import { useWardrobe } from '../../../wardrobe/context/useWardrobe';
import { useToday } from '../../../../shared/hooks/useToday';
import { ROUTES } from '../../../../shared/routes';
import { selectMostForgottenItems } from '../../../wardrobe/utils/wornDates';
import { ForgottenPieceCard } from './ForgottenPieceCard';
import styles from './ForgottenSpotlight.module.css';

export function ForgottenSpotlight() {
  const { items } = useWardrobe();
  const today = useToday();
  const forgottenItems = selectMostForgottenItems(items, today, HOME_FORGOTTEN_LIMIT);

  if (forgottenItems.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="forgotten-spotlight-title">
      <h2 id="forgotten-spotlight-title" className={styles.title}>
        À ressortir cette semaine
      </h2>
      <ul className={styles.grid}>
        {forgottenItems.map((item) => (
          <li key={item.piece.id}>
            <ForgottenPieceCard item={item} today={today} to={ROUTES.wardrobe} />
          </li>
        ))}
      </ul>
    </section>
  );
}
