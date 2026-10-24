import { MAX_OUTFIT_SCORE, NO_SCORE, SCORE_VALUES } from '../../constants/outfits';
import { useOutfits } from '../../context/useOutfits';
import type { Outfit } from '../../types/outfit';
import styles from './OutfitNotes.module.css';

interface OutfitNotesProps {
  outfit: Outfit;
}

export function OutfitNotes({ outfit }: OutfitNotesProps) {
  const { updateOutfit } = useOutfits();

  function toggleScore(score: number) {
    updateOutfit({ ...outfit, score: score === outfit.score ? NO_SCORE : score });
  }

  return (
    <details className={styles.details}>
      <summary className={styles.summary}>
        Note et score {outfit.score > NO_SCORE && `${outfit.score}/${MAX_OUTFIT_SCORE}`}
      </summary>
      <div className={styles.stars} role="group" aria-label={`Score de ${outfit.name}`}>
        {SCORE_VALUES.map((score) => (
          <button
            key={score}
            type="button"
            className={styles.star}
            aria-label={`${score} sur ${MAX_OUTFIT_SCORE}`}
            aria-pressed={score <= outfit.score}
            onClick={() => toggleScore(score)}
          >
            {score <= outfit.score ? '★' : '☆'}
          </button>
        ))}
      </div>
      <label className={styles.label}>
        Note perso
        <textarea
          className={styles.note}
          rows={2}
          value={outfit.note}
          onChange={(event) => updateOutfit({ ...outfit, note: event.target.value })}
        />
      </label>
    </details>
  );
}
