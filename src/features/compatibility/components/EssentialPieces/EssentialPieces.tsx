import type { CompatibilityNode } from '../../types/compatibility';
import { formatPossibleOutfits } from '../../utils/compatibility';
import styles from './EssentialPieces.module.css';

interface EssentialPiecesProps {
  nodes: readonly CompatibilityNode[];
  chosenNode: CompatibilityNode | null;
  onChoose: (pieceId: number) => void;
}

export function EssentialPieces({ nodes, chosenNode, onChoose }: EssentialPiecesProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Tes pièces indispensables</h2>
      <ol className={styles.list}>
        {nodes.map((node, index) => (
          <li key={node.item.piece.id}>
            <button
              type="button"
              className={styles.row}
              aria-pressed={node === chosenNode}
              onClick={() => onChoose(node.item.piece.id)}
            >
              <span className={styles.rank}>{index + 1}</span>
              <span className={styles.name}>{node.item.piece.title}</span>
              <span className={styles.detail}>{formatPossibleOutfits(node.outfitCount)}</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
