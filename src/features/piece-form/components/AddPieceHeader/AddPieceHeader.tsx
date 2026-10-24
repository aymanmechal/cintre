import { PageHeader } from '../../../../shared/ui/PageHeader/PageHeader';

const DEFAULT_SUBTITLE = 'Décris ta pièce et range-la directement dans ta garde-robe.';
const SHARED_SUBTITLE = 'Article reçu ! Vérifie les infos, il sera rangé dans tes envies.';

interface AddPieceHeaderProps {
  isShared: boolean;
}

export function AddPieceHeader({ isShared }: AddPieceHeaderProps) {
  return (
    <PageHeader
      title="Ajouter une pièce"
      subtitle={isShared ? SHARED_SUBTITLE : DEFAULT_SUBTITLE}
    />
  );
}
