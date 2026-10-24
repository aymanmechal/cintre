import { EssentialPieces } from '../components/EssentialPieces/EssentialPieces';
import { IsolatedPieces } from '../components/IsolatedPieces/IsolatedPieces';
import { PieceLinks } from '../components/PieceLinks/PieceLinks';
import { COMPATIBILITY_EMPTY_MESSAGE } from '../constants/compatibility';
import { useCompatibility } from '../hooks/useCompatibility';
import { PageHeader } from '../../../shared/ui/PageHeader/PageHeader';
import { formatPageTitle } from '../../../shared/utils/format';
import styles from './CompatibilityPage.module.css';

export function CompatibilityPage() {
  const compatibility = useCompatibility();

  return (
    <section className={styles.page}>
      <title>{formatPageTitle('Mes associations')}</title>
      <PageHeader
        title="Mes associations"
        subtitle="Les pièces qui vont avec tout, et celles qui restent seules."
      />
      {compatibility.chosenNode === null ? (
        <p className={styles.empty}>{COMPATIBILITY_EMPTY_MESSAGE}</p>
      ) : (
        <>
          {compatibility.essentialNodes.length > 0 && (
            <EssentialPieces
              nodes={compatibility.essentialNodes}
              chosenNode={compatibility.chosenNode}
              onChoose={compatibility.choosePiece}
            />
          )}
          <PieceLinks
            nodes={compatibility.nodes}
            chosenNode={compatibility.chosenNode}
            onChoose={compatibility.choosePiece}
          />
          <IsolatedPieces nodes={compatibility.isolatedNodes} />
        </>
      )}
    </section>
  );
}
