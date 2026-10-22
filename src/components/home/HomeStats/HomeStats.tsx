import { OwnershipStatus } from '../../../constants/wardrobe';
import { useOutfits } from '../../../contexts/outfits/useOutfits';
import { useWardrobe } from '../../../contexts/wardrobe/useWardrobe';
import { ROUTES } from '../../../routes';
import { countItemsByStatus } from '../../../utils/wardrobe';
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
