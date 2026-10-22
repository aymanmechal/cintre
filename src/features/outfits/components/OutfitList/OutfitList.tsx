import { useOutfits } from '../../context/useOutfits';
import { useWardrobe } from '../../../wardrobe/context/useWardrobe';
import { resolveOutfitItems } from '../../utils/outfits';
import { NoOutfits } from '../NoOutfits/NoOutfits';
import { OutfitCard } from '../OutfitCard/OutfitCard';
import styles from './OutfitList.module.css';

export function OutfitList() {
  const { outfits } = useOutfits();
  const { items } = useWardrobe();

  if (outfits.length === 0) return <NoOutfits />;

  return (
    <section className={styles.section} aria-labelledby="outfit-list-title">
      <h2 id="outfit-list-title" className={styles.title}>
        Mes tenues ({outfits.length})
      </h2>
      <ul className={styles.grid}>
        {outfits.map((outfit) => (
          <li key={outfit.id}>
            <OutfitCard outfit={outfit} outfitItems={resolveOutfitItems(outfit, items)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
