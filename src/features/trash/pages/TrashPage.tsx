import { ROUTES } from '../../../shared/routes';
import { ButtonLink } from '../../../shared/ui/Button/ButtonLink';
import { EmptyState } from '../../../shared/ui/EmptyState/EmptyState';
import { PageHeader } from '../../../shared/ui/PageHeader/PageHeader';
import { formatPageTitle } from '../../../shared/utils/format';
import { TRASH_RETENTION_DAYS } from '../../wardrobe/constants/wardrobe';
import { EmptyTrashSection } from '../components/EmptyTrashSection/EmptyTrashSection';
import { TrashList } from '../components/TrashList/TrashList';
import { useTrash } from '../hooks/useTrash';

export function TrashPage() {
  const trashState = useTrash();

  return (
    <section>
      <title>{formatPageTitle('Corbeille')}</title>
      <PageHeader
        title="Corbeille"
        subtitle={`Les pièces retirées restent ici ${TRASH_RETENTION_DAYS} jours, le temps de changer d’avis.`}
      />
      {trashState.trash.length === 0 ? (
        <EmptyState
          title="Corbeille vide"
          message="Rien à restaurer pour l’instant."
          action={<ButtonLink to={ROUTES.wardrobe}>Retour à ma garde-robe</ButtonLink>}
        />
      ) : (
        <>
          <EmptyTrashSection
            isDialogOpen={trashState.isEmptyDialogOpen}
            onOpen={trashState.openEmptyDialog}
            onCancel={trashState.closeEmptyDialog}
            onConfirm={trashState.confirmEmptyTrash}
          />
          <TrashList
            trash={trashState.trash}
            today={trashState.today}
            onRestore={trashState.restorePiece}
          />
        </>
      )}
    </section>
  );
}
