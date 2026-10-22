import { EmptyState } from '../../ui/EmptyState/EmptyState';

export function NoOutfits() {
  return (
    <EmptyState
      title="Aucune tenue pour l’instant"
      message="Choisis au moins deux pièces au-dessus pour créer ta première tenue."
    />
  );
}
