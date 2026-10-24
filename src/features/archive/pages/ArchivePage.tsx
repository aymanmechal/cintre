import { ROUTES } from '../../../shared/routes';
import { ButtonLink } from '../../../shared/ui/Button/ButtonLink';
import { EmptyState } from '../../../shared/ui/EmptyState/EmptyState';
import { PageHeader } from '../../../shared/ui/PageHeader/PageHeader';
import { formatPageTitle } from '../../../shared/utils/format';
import { ArchivedItemCard } from '../components/ArchivedItemCard/ArchivedItemCard';
import { useArchive } from '../hooks/useArchive';
import styles from './ArchivePage.module.css';

export function ArchivePage() {
  const { archive, today, unarchivePiece } = useArchive();

  return (
    <section>
      <title>{formatPageTitle('Archives')}</title>
      <PageHeader
        title="Archives"
        subtitle="Les pièces vendues ou données, au cas où tu en aurais besoin."
      />
      {archive.length === 0 ? (
        <EmptyState
          title="Rien d’archivé"
          message="Quand tu vends ou donnes une pièce, elle atterrit ici."
          action={<ButtonLink to={ROUTES.wardrobe}>Retour à ma garde-robe</ButtonLink>}
        />
      ) : (
        <ul className={styles.grid}>
          {archive.map((archivedItem) => (
            <li key={archivedItem.item.piece.id}>
              <ArchivedItemCard
                archivedItem={archivedItem}
                today={today}
                onUnarchive={unarchivePiece}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
