import { PACKING_RULE } from '../../constants/suitcase';
import type { SuitcasePlan } from '../../types/suitcase';
import { countPackedPieces } from '../../utils/packing';
import { formatPieceCount } from '../../../../shared/utils/format';
import { CheckboxField } from '../../../../shared/ui/Form/CheckboxField';
import styles from './PackingList.module.css';

interface PackingListProps {
  plan: SuitcasePlan;
  packedPieceIds: readonly number[];
  onToggle: (pieceId: number) => void;
}

export function PackingList({ plan, packedPieceIds, onToggle }: PackingListProps) {
  const packedCount = countPackedPieces(plan, packedPieceIds);
  const isDone = packedCount === plan.pieces.length;

  return (
    <section className={styles.list} aria-labelledby="packing-list-title">
      <h2 id="packing-list-title" className={styles.title}>
        À emporter : {formatPieceCount(plan.pieces.length)}
      </h2>
      <p className={styles.rule}>{PACKING_RULE}</p>
      <ul className={styles.pieces}>
        {plan.pieces.map((item) => (
          <li key={item.piece.id}>
            <CheckboxField
              id={`packed-${item.piece.id}`}
              label={item.piece.title}
              isChecked={packedPieceIds.includes(item.piece.id)}
              onChange={() => onToggle(item.piece.id)}
            />
          </li>
        ))}
      </ul>
      <p className={styles.progress} aria-live="polite">
        {isDone ? 'Valise bouclée ! 🎉' : `${packedCount} / ${plan.pieces.length} dans la valise`}
      </p>
    </section>
  );
}
