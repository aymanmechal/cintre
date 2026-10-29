import { ColorIdeasPicker } from '../../ColorIdeasPicker/ColorIdeasPicker';
import { KeepPiecesLink } from './KeepPiecesLink';
import { RandomOutfitButton } from './RandomOutfitButton';
import { StylistLink } from './StylistLink';
import styles from './OutfitIdeasZone.module.css';

interface OutfitIdeasZoneProps {
  pieceIds: readonly number[];
  hasNoRandomIdea: boolean;
  onRandom: () => void;
}

export function OutfitIdeasZone({ pieceIds, hasNoRandomIdea, onRandom }: OutfitIdeasZoneProps) {
  return (
    <section className={styles.zone} aria-labelledby="outfit-ideas-title">
      <h3 id="outfit-ideas-title" className={styles.title}>
        Besoin d’idées ?
      </h3>
      <RandomOutfitButton hasNoIdea={hasNoRandomIdea} onClick={onRandom} />
      <StylistLink />
      <KeepPiecesLink pieceIds={pieceIds} />
      <ColorIdeasPicker />
    </section>
  );
}
