import { useWeatherOutfit } from '../../hooks/useWeatherOutfit';
import type { WeatherSummary } from '../../types/weather';
import { KeptOutfitMessage } from '../../../outfits/components/OutfitIdeas/KeptOutfitMessage';
import { OutfitHarmony } from '../../../outfits/components/OutfitHarmony/OutfitHarmony';
import { OutfitPieceThumbnail } from '../../../outfits/components/OutfitCard/OutfitPieceThumbnail';
import { Button, ButtonVariant } from '../../../../shared/ui/Button/Button';
import styles from './WeatherIdea.module.css';

interface WeatherIdeaProps {
  weather: WeatherSummary;
}

export function WeatherIdea({ weather }: WeatherIdeaProps) {
  const { idea, canShuffle, keptOutfitName, shuffle, keepIdea } = useWeatherOutfit(weather);

  return (
    <div className={styles.idea}>
      {idea === null && (
        <p className={styles.empty}>
          Pas de nouvelle tenue complète pour ce temps-là. Ajoute un haut et un bas de saison.
        </p>
      )}
      {idea !== null && (
        <article className={styles.card} aria-label="Tenue conseillée">
          <OutfitHarmony items={idea.items} />
          <ul className={styles.pieces}>
            {idea.items.map((item) => (
              <li key={item.piece.id}>
                <OutfitPieceThumbnail item={item} />
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button onClick={() => keepIdea(idea)}>Garder cette tenue</Button>
            {canShuffle && (
              <Button variant={ButtonVariant.Ghost} onClick={shuffle}>
                Une autre tenue
              </Button>
            )}
          </div>
        </article>
      )}
      <KeptOutfitMessage outfitName={keptOutfitName} />
    </div>
  );
}
