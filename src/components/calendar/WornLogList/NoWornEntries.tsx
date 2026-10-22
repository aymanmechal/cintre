import { EmptyState } from '../../ui/EmptyState/EmptyState';

export function NoWornEntries() {
  return (
    <EmptyState
      title="Calendrier vide"
      message="Ajoute ta première tenue portée avec le formulaire."
    />
  );
}
