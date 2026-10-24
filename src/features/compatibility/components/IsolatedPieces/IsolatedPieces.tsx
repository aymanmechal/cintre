import { Link } from 'react-router';
import { ISOLATED_HINT, NO_ISOLATED_MESSAGE } from '../../constants/compatibility';
import type { CompatibilityNode } from '../../types/compatibility';
import { buildEditPieceUrl } from '../../../../shared/routes';
import styles from './IsolatedPieces.module.css';

interface IsolatedPiecesProps {
  nodes: readonly CompatibilityNode[];
}

export function IsolatedPieces({ nodes }: IsolatedPiecesProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Tes pièces isolées</h2>
      {nodes.length === 0 ? (
        <p className={styles.hint}>{NO_ISOLATED_MESSAGE}</p>
      ) : (
        <>
          <p className={styles.hint}>{ISOLATED_HINT}</p>
          <ul className={styles.list}>
            {nodes.map((node) => (
              <li key={node.item.piece.id}>
                <Link className={styles.link} to={buildEditPieceUrl(node.item.piece.id)}>
                  {node.item.piece.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
