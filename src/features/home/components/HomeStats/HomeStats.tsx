import { OwnershipStatus } from '../../../wardrobe/constants/wardrobe';
import { useOutfits } from '../../../outfits/context/useOutfits';
import { useWardrobe } from '../../../wardrobe/context/useWardrobe';
import { ROUTES } from '../../../../shared/routes';
import { countItemsByStatus } from '../../../wardrobe/utils/wardrobe';
import { StatCard } from './StatCard';
import { StatTone } from './statTone';
import styles from './HomeStats.module.css';

export function HomeStats() {
  const { items } = useWardrobe();
  const { outfits } = useOutfits();

  return (
    <section className={styles.stats} aria-label="Ta garde-robe en chiffres">
      <StatCard
        value={countItemsByStatus(items, OwnershipStatus.Owned)}
        label="pièces dans ma garde-robe"
        to={ROUTES.wardrobe}
        tone={StatTone.Green}
      />
      <StatCard
        value={countItemsByStatus(items, OwnershipStatus.Wanted)}
        label="envies à réaliser"
        to={ROUTES.wardrobe}
        tone={StatTone.Pink}
      />
      <StatCard
        value={outfits.length}
        label="tenues composées"
        to={ROUTES.outfits}
        tone={StatTone.Blue}
      />
    </section>
  );
}
